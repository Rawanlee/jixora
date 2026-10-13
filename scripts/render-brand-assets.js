// Renders raster brand assets (favicons, OG image, LinkedIn artwork) from the
// SVG sources in brand-src/ and public/. Run with `npm run brand:render`.
// Outputs are committed, so this only needs re-running after design changes.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const p = (...s) => path.join(root, ...s)
const mark = fs.readFileSync(p('public/favicon.svg'))

const jobs = [
  [mark, 32, 32, 'public/favicon-32.png'],
  [mark, 180, 180, 'public/apple-touch-icon.png'],
  [mark, 512, 512, 'public/brand/logo-512.png'],
  [mark, 400, 400, 'docs/linkedin/jixora-linkedin-logo-400.png'],
  [fs.readFileSync(p('brand-src/og-image.svg')), 1200, 630, 'public/brand/og-image.png'],
  [fs.readFileSync(p('brand-src/linkedin-banner.svg')), 1584, 396, 'docs/linkedin/jixora-linkedin-banner-1584x396.png'],
]

for (const [svg, w, h, out] of jobs) {
  fs.mkdirSync(path.dirname(p(out)), { recursive: true })
  await sharp(svg, { density: 300 }).resize(w, h).png({ compressionLevel: 9 }).toFile(p(out))
  console.log(`rendered ${out} (${w}×${h})`)
}
fs.copyFileSync(p('brand-src/linkedin-banner.svg'), p('docs/linkedin/jixora-linkedin-banner-1584x396.svg'))
