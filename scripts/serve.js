// Minimal static server for previewing the production build locally. It
// resolves routes the same way static hosts (Vercel, Netlify, Amplify, S3 +
// CloudFront) do: /privacy → dist/privacy/index.html, unknown paths → 404.html.
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const port = Number(process.env.PORT) || 4173
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
  '.json': 'application/json', '.ico': 'image/x-icon',
}

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const candidates = [path.join(dist, clean), path.join(dist, clean, 'index.html'), path.join(dist, `${clean}.html`)]
  return candidates.find((f) => f.startsWith(dist) && fs.existsSync(f) && fs.statSync(f).isFile())
}

http
  .createServer((req, res) => {
    const file = resolve(req.url)
    const target = file || path.join(dist, '404.html')
    res.writeHead(file ? 200 : 404, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' })
    fs.createReadStream(target).pipe(res)
  })
  .listen(port, () => console.log(`Serving dist/ on http://localhost:${port}`))
