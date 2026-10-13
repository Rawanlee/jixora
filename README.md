# JiXora — website

Official website for **JiXora** (https://www.jixora.space): AI program delivery and
member accountability software for coaches, gyms and wellness programs.

JiXora turns a member intake into a personalised 90-day training plan, runs
automated daily check-ins, drafts plan adjustments for coach approval and flags
members at risk of dropping off.

Built with **Vite + React + JavaScript + Tailwind CSS + Lucide icons**, statically
prerendered so every marketing section is present in the HTML that search engines crawl.

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173
```

Production build and local preview:

```bash
npm run build          # client build → SSR build → prerender every route into dist/
npm run preview        # serves dist/ like a static host (http://localhost:4173)
npm run lint:content   # checks the built pages for placeholders and core company facts
```

Requires **Node.js 20.19 or newer**.

## Scripts

| Script | What it does |
| --- | --- |
| `dev` | Vite dev server with hot reload (client-rendered) |
| `build` | `vite build`, then an SSR build of `src/entry-server.jsx`, then `scripts/prerender.js` writes `dist/index.html`, `dist/privacy/index.html`, `dist/terms/index.html`, `dist/404.html`, `sitemap.xml` and `robots.txt` |
| `preview` | `scripts/serve.js` — static server with the same routing rules as Vercel/Netlify/S3 |
| `brand:render` | Re-renders PNG brand assets (favicons, OG image, LinkedIn logo and banner) from SVG sources with `sharp` |
| `lint:content` | Fails the build output if placeholder text appears or company facts are missing |

## Environment variables

Copy `.env.example` to `.env.local`. All `VITE_` variables are embedded in public
JavaScript at build time — **never put secrets in them**.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_FORMS_ENDPOINT` | For live forms | HTTPS endpoint that receives form JSON (the Lambda in `aws/lead-intake`, or a Formspree URL). Without it, forms validate input and then show an honest “not sent” message with a pre-filled email link. |
| `VITE_SITE_URL` | No | Canonical origin for SEO tags and sitemap. Default `https://www.jixora.space`. |
| `VITE_LINKEDIN_COMPANY_URL` | No | Overrides the LinkedIn company page URL. Default `https://www.linkedin.com/company/jixora.site/`. |

## Project structure

```
├── public/                 favicon.svg, favicon-32.png, apple-touch-icon.png, brand/ (logos, OG image)
├── brand-src/              SVG sources for the OG image and LinkedIn banner
├── src/
│   ├── components/
│   │   ├── layout/         Header (responsive nav + mobile menu), Footer
│   │   ├── sections/       Hero, Highlights, Problem, Features, HowItWorks, Showcase,
│   │   │                   Audiences, Aws, Pricing, EarlyAccess (lead form), Team, Contact
│   │   ├── dashboard/      Interactive coach console (sample data): overview, members,
│   │   │                   review queue, programs, activity, member drawer, chart
│   │   └── ui/             Button, Logo, SectionHeading, FormField, StatusPill, …
│   ├── pages/              Home, Privacy, Terms, NotFound
│   ├── data/               site.js (company facts), content.js (copy), demo.js (sample data)
│   ├── hooks/              useForm, useReveal, useScrollManager, useDocumentMeta
│   ├── lib/                forms.js (validation + submission), routes-meta.js (SEO)
│   ├── styles/index.css    Tailwind v4 theme tokens
│   ├── App.jsx  main.jsx  entry-server.jsx
├── scripts/                prerender.js, serve.js, render-brand-assets.js, check-content.js
├── aws/lead-intake/        AWS Lambda + Amazon SES form backend (SAM template + tests)
├── docs/                   LinkedIn kit, banner spec + artwork, brand guide, deployment checklist
├── vercel.json  netlify.toml  amplify.yml
```

**Single source of truth:** company name, email, founder, LinkedIn links and
positioning live in `src/data/site.js`; section copy, AWS services and pricing tiers
live in `src/data/content.js`. The prerenderer's structured data reads from the same
modules, so the site, SEO metadata and docs cannot drift apart silently.

## Forms

Both forms (Request early access, Contact) share `useForm` + `lib/forms.js`:

- Required-field and email validation with inline, accessible error messages; focus moves to the first invalid field
- Loading state on submit, success confirmation, and server/network error messages
- A hidden honeypot field for basic bot filtering
- `POST` JSON to `VITE_FORMS_ENDPOINT` with a 15-second timeout

**Recommended backend:** `aws/lead-intake` — an AWS Lambda function behind a Function
URL that validates submissions and emails them via Amazon SES. See
[`aws/lead-intake/README.md`](aws/lead-intake/README.md) for deployment.

**Alternative:** any JSON form service. For Formspree, create a form and set
`VITE_FORMS_ENDPOINT=https://formspree.io/f/<form-id>`.

## Deployment

The output in `dist/` is fully static.

**Vercel** — import the repo; `vercel.json` sets the build command and output. Add
`VITE_FORMS_ENDPOINT` under Project → Settings → Environment Variables.

**Netlify** — `netlify.toml` is included. Add environment variables under Site
configuration → Environment variables.

**AWS Amplify Hosting** — `amplify.yml` is included; add the 404 rewrite rule
described at the top of that file.

**S3 + CloudFront** — upload `dist/`, set the default root object to `index.html`,
use a CloudFront Function (or S3 website hosting) to map `/privacy` → `/privacy/index.html`,
and configure `404.html` as the custom error response for 404s.

After changing any `VITE_` variable, **rebuild** — values are compiled in.

Point `www.jixora.space` at the host, redirect the apex `jixora.space` to `www`, and
work through [`docs/deployment-checklist.md`](docs/deployment-checklist.md).

## SEO

- Unique `<title>`, description, canonical URL, Open Graph and Twitter card tags per route (written into the static HTML by `scripts/prerender.js`)
- JSON-LD: `Organization` (with founder and LinkedIn), `WebSite`, `SoftwareApplication`
- `sitemap.xml` and `robots.txt` generated from `VITE_SITE_URL`; the 404 page is `noindex`
- Open Graph image: `public/brand/og-image.png` (1200 × 630)

## AWS architecture (as described on the site)

The **How We Use Amazon Web Services** section describes JiXora's serverless
architecture as components of the platform design:

| Stage | Services |
| --- | --- |
| Member intake | Amazon Cognito, Amazon API Gateway |
| Secure storage | Amazon DynamoDB, Amazon S3 |
| Scheduling & processing | Amazon EventBridge Scheduler, AWS Lambda |
| AI intelligence | Amazon Bedrock |
| Coach & member experience | Amazon SES, Amazon CloudWatch |

The only AWS code in this repository is `aws/lead-intake` (Lambda + SES for the website
forms). The section copy, this table and `src/data/content.js` must stay in agreement —
edit the data file and this README together.

## Interactive demo and sample data

The coach console on the homepage runs entirely in the browser on fictional data from
`src/data/demo.js` (workspace “Northside Strength Co.”). It is labelled **Sample data**
in the UI and does not represent JiXora customers, members or results.

## Accessibility

Semantic landmarks and headings, skip link, visible focus styles, keyboard-operable
menu, tabs (arrow keys), dialog (Esc to close, focus returns) and sortable table with
`aria-sort`; status is never conveyed by colour alone; `prefers-reduced-motion` respected.

## Browser support

Current and previous major versions of Chrome, Edge, Firefox and Safari (desktop and
iOS/Android). Built to `es2020`. Uses CSS features supported by those browsers
(`backdrop-filter`, `text-wrap: balance`, `dvh`), each degrading gracefully.

## Brand assets

- Logo: `public/brand/logo.svg`, `logo-on-dark.svg`, `logo-512.png`; mark: `public/favicon.svg`
- LinkedIn: `docs/linkedin/jixora-linkedin-logo-400.png`, `docs/linkedin/jixora-linkedin-banner-1584x396.png`
- Guide: [`docs/brand-guide.md`](docs/brand-guide.md)

## LinkedIn

Company profile copy, specialties and a consistency checklist are in
[`docs/linkedin-profile.md`](docs/linkedin-profile.md); banner layout in
[`docs/linkedin-banner.md`](docs/linkedin-banner.md).

## Remaining dependencies before launch

1. Deploy a form backend and set `VITE_FORMS_ENDPOINT` (forms are honest but offline until then)
2. Confirm founder name spelling, title, headcount and headquarters
3. Legal review of the Privacy Policy and Terms (open items listed in the checklist)

© 2026 JiXora
