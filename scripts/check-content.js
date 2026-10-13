// Pre-deploy content check on the built site (run after `npm run build`).
// Fails if placeholder text leaks into the output or if core company facts
// are missing from the prerendered homepage.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const pages = ['index.html', 'privacy/index.html', 'terms/index.html', '404.html']
const banned = [/lorem ipsum/i, /\bTODO\b/, /\bTBD\b/, /placeholder text/i, /\[(company|business) name\]/i, /your company name/i, /example\.com/i, /v0\.app/i]
const required = ['JiXora', 'rasheed@jixora.space', 'How We Use Amazon Web Services', 'The Team Behind JiXora', 'Rasheed Qodus', '© 2026 JiXora', 'https://www.jixora.space/']

let failed = false
for (const page of pages) {
  const file = path.join(dist, page)
  if (!fs.existsSync(file)) {
    console.error(`✖ missing ${page} — run npm run build first`)
    failed = true
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  for (const re of banned) {
    if (re.test(html)) {
      console.error(`✖ ${page}: contains ${re}`)
      failed = true
    }
  }
}
const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
for (const s of required) {
  if (!home.includes(s)) {
    console.error(`✖ index.html: missing "${s}"`)
    failed = true
  }
}
if (failed) process.exit(1)
console.log(`✔ content check passed (${pages.length} pages)`)
