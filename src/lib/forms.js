// Form validation and submission. Submissions are POSTed as JSON to
// VITE_FORMS_ENDPOINT (see .env.example and aws/lead-intake). When no endpoint
// is configured we never pretend the message was sent.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(values, rules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const value = String(values[field] ?? '').trim()
    if (rule.required && !value) errors[field] = rule.requiredMessage || 'This field is required.'
    else if (rule.email && value && !EMAIL_RE.test(value)) errors[field] = 'Enter a valid email address, like name@company.com.'
    else if (rule.max && value.length > rule.max) errors[field] = `Keep this under ${rule.max} characters.`
  }
  return errors
}

export class FormConfigError extends Error {}

export const formsEndpoint = (import.meta.env?.VITE_FORMS_ENDPOINT || '').trim()

export async function submitForm(formType, values) {
  if (!formsEndpoint) {
    throw new FormConfigError('Online submissions are not configured for this deployment.')
  }
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(formsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ formType, ...values, page: window.location.pathname, submittedAt: new Date().toISOString() }),
      signal: controller.signal,
    })
    if (!res.ok) {
      let detail = ''
      try {
        detail = (await res.json())?.error || ''
      } catch {
        /* response had no JSON body */
      }
      throw new Error(detail || `The server responded with status ${res.status}.`)
    }
    return true
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out. Please try again.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}
