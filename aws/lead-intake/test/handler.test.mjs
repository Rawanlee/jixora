import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../src/handler.mjs'

process.env.ALLOWED_ORIGINS = 'https://www.jixora.space'
process.env.FROM_EMAIL = 'no-reply@jixora.space'
process.env.TO_EMAIL = 'rasheed@jixora.space'

const evt = (body, origin = 'https://www.jixora.space', method = 'POST') => ({
  requestContext: { http: { method } },
  headers: { origin },
  body: typeof body === 'string' ? body : JSON.stringify(body),
})

const valid = { formType: 'early-access', fullName: 'Test Coach', email: 'coach@example.com', company: 'Example Studio', companySize: '2–10 people', useCase: 'Personal training clients', message: 'Hello' }

test('sends a valid early-access request via SES', async () => {
  const sent = []
  const res = await createHandler({ send: async (cmd) => sent.push(cmd.input) })(evt(valid))
  assert.equal(res.statusCode, 200)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].Destination.ToAddresses[0], 'rasheed@jixora.space')
  assert.equal(sent[0].ReplyToAddresses[0], 'coach@example.com')
  assert.match(sent[0].Content.Simple.Subject.Data, /Example Studio/)
  assert.equal(res.headers['Access-Control-Allow-Origin'], 'https://www.jixora.space')
})

test('rejects missing fields, bad email, honeypot and unknown origins', async () => {
  const h = createHandler({ send: async () => assert.fail('should not send') })
  assert.equal((await h(evt({ ...valid, company: '' }))).statusCode, 400)
  assert.equal((await h(evt({ ...valid, email: 'nope' }))).statusCode, 400)
  assert.equal((await h(evt({ ...valid, company_website: 'spam' }))).statusCode, 400)
  assert.equal((await h(evt('not json'))).statusCode, 400)
  assert.equal((await h(evt(valid, 'https://evil.example'))).statusCode, 403)
  assert.equal((await h(evt(valid, undefined, 'GET'))).statusCode, 405)
})

test('reports delivery failure instead of success', async () => {
  const res = await createHandler({ send: async () => { throw new Error('SES down') } })(evt({ formType: 'contact', name: 'A', email: 'a@example.com', topic: 'Pricing', message: 'Hi' }))
  assert.equal(res.statusCode, 502)
})

test('answers CORS preflight for allowed origins only', async () => {
  const h = createHandler({ send: async () => {} })
  assert.equal((await h(evt('', 'https://www.jixora.space', 'OPTIONS'))).statusCode, 204)
  assert.equal((await h(evt('', 'https://evil.example', 'OPTIONS'))).statusCode, 403)
})
