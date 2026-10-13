// JiXora website form intake — AWS Lambda (Node.js 20+) behind a Lambda
// Function URL or API Gateway HTTP API. Validates the JSON body sent by the
// website's early-access and contact forms and emails it to the team via
// Amazon SES. No data is stored by this function.
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const ses = new SESv2Client({})
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_BODY = 10_000

const FORMS = {
  'early-access': { required: ['fullName', 'email', 'company', 'companySize', 'useCase'], subject: (b) => `Early access request — ${b.company}` },
  contact: { required: ['name', 'email', 'topic', 'message'], subject: (b) => `Website enquiry (${b.topic}) — ${b.name}` },
}

const LABELS = {
  fullName: 'Full name', name: 'Name', email: 'Email', company: 'Company', companySize: 'Company size',
  useCase: 'Primary use case', plan: 'Plan of interest', topic: 'Topic', message: 'Message', page: 'Page', submittedAt: 'Submitted at',
}

function allowedOrigin(origin) {
  const list = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
  return list.includes(origin) ? origin : null
}

function respond(statusCode, body, origin) {
  const headers = { 'Content-Type': 'application/json' }
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
    headers.Vary = 'Origin'
  }
  return { statusCode, headers, body: body ? JSON.stringify(body) : '' }
}

export function validate(body) {
  const form = FORMS[body?.formType]
  if (!form) return 'Unknown form.'
  if (body.company_website) return 'Rejected.'
  for (const field of form.required) {
    if (!String(body[field] ?? '').trim()) return `Missing required field: ${LABELS[field] || field}.`
  }
  if (!EMAIL_RE.test(String(body.email).trim())) return 'Invalid email address.'
  for (const [k, v] of Object.entries(body)) {
    if (typeof v !== 'string') return `Invalid value for ${k}.`
    if (v.length > 2000) return `${LABELS[k] || k} is too long.`
  }
  return null
}

export function formatEmail(body) {
  const lines = Object.keys(LABELS)
    .filter((k) => body[k])
    .map((k) => `${LABELS[k]}: ${String(body[k]).trim()}`)
  return { subject: FORMS[body.formType].subject(body), text: lines.join('\n') }
}

export function createHandler({ send = (cmd) => ses.send(cmd) } = {}) {
  return async (event) => {
    const method = event.requestContext?.http?.method || event.httpMethod
    const origin = allowedOrigin(event.headers?.origin || event.headers?.Origin || '')

    if (method === 'OPTIONS') return respond(origin ? 204 : 403, null, origin)
    if (method !== 'POST') return respond(405, { error: 'Method not allowed.' }, origin)
    if (!origin) return respond(403, { error: 'Origin not allowed.' }, null)

    const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body || ''
    if (raw.length > MAX_BODY) return respond(413, { error: 'Request too large.' }, origin)

    let body
    try {
      body = JSON.parse(raw)
    } catch {
      return respond(400, { error: 'Invalid JSON.' }, origin)
    }

    const problem = validate(body)
    if (problem) return respond(400, { error: problem }, origin)

    const { subject, text } = formatEmail(body)
    try {
      await send(
        new SendEmailCommand({
          FromEmailAddress: process.env.FROM_EMAIL,
          Destination: { ToAddresses: [process.env.TO_EMAIL] },
          ReplyToAddresses: [String(body.email).trim()],
          Content: { Simple: { Subject: { Data: subject }, Body: { Text: { Data: text } } } },
        }),
      )
    } catch (err) {
      console.error('SES send failed', err)
      return respond(502, { error: 'Could not deliver your message. Please email us directly.' }, origin)
    }
    return respond(200, { ok: true }, origin)
  }
}

export const handler = createHandler()
