// Static prerendering: renders every route to HTML after `vite build` so that
// all marketing content is present in the initial HTML for crawlers.
// Also writes route-specific <head> tags, JSON-LD, sitemap.xml and robots.txt.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const { render, metaFor, routesMeta, company, team, SITE_URL } = await import(pathToFileURL(ssrEntry).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/brand/logo-512.png`,
    email: company.email,
    foundingDate: String(company.founded),
    description: company.positioning,
    founder: team.map((p) => ({ '@type': 'Person', name: p.name, jobTitle: p.title, ...(p.linkedin ? { sameAs: p.linkedin } : {}) })),
    ...(company.linkedinUrl ? { sameAs: [company.linkedinUrl] } : {}),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: `${SITE_URL}/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: company.name,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Fitness coaching and member accountability software',
    operatingSystem: 'Web',
    url: `${SITE_URL}/`,
    description: company.shortDescription,
    publisher: { '@type': 'Organization', name: company.name },
  },
]

function head(route) {
  const m = metaFor(route)
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    m.noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="index, follow" />',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(m.siteName)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:image" content="${esc(m.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="JiXora — personalised 90-day programs and automated member check-ins" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.image)}" />`,
  ]
  if (route === '/') {
    tags.push(`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`)
  }
  return tags.join('\n    ')
}

const routes = Object.keys(routesMeta) // '/', '/privacy', '/terms', '/404'
for (const route of routes) {
  const html = template.replace('<!--app-head-->', head(route)).replace('<!--app-html-->', render(route === '/404' ? '/__not-found__' : route))
  const out = route === '/' ? 'index.html' : route === '/404' ? '404.html' : path.join(route.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(path.join(dist, out)), { recursive: true })
  fs.writeFileSync(path.join(dist, out), html)
  console.log(`prerendered ${route.padEnd(9)} → dist/${out}`)
}

const today = new Date().toISOString().slice(0, 10)
const indexable = routes.filter((r) => !routesMeta[r].noindex)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : '0.3'}</priority></url>`).join('\n')}
</urlset>
`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('wrote sitemap.xml and robots.txt')
