# Pre-deployment Checklist

Work through this list before pointing `www.jixora.space` at a new build.

## 1. Facts to confirm (owner)

- [ ] **Founder name spelling.** The site shows “Rasheed Qodus” (as supplied). The LinkedIn profile URL reads `abdulrasheed-qudus`. Confirm the preferred public spelling and update `src/data/site.js` + `docs/linkedin-profile.md` if needed.
- [ ] **Founder title.** Shown as “Founder”. Change `team[0].title` in `src/data/site.js` if a different title (e.g. Founder & CEO) is preferred.
- [ ] **Headcount** for LinkedIn (2–10 vs 0–1).
- [ ] **Headquarters.** Not shown anywhere yet. Add to the Contact section and LinkedIn only once confirmed.
- [ ] **LinkedIn company URL.** Supplied as `linkedin.com/company/jixora.site/`; consider a slug that matches `jixora.space`.
- [ ] **AWS architecture wording.** The Technology section describes the platform's AWS architecture as designed components, not as live production operations. If any service is not part of the plan, remove it from `awsPipeline`/`awsServices` in `src/data/content.js` so the site, README and AWS application stay identical.

## 2. Legal review (decisions flagged, not invented)

- [ ] Legal entity name and registered address for the Privacy Policy and Terms (currently “JiXora”).
- [ ] Governing law / jurisdiction clause for the Terms (intentionally omitted until decided).
- [ ] Controller vs processor role for member data, and whether a Data Processing Agreement is offered to customers.
- [ ] Retention periods (enquiries: 24 months after last contact — confirm).
- [ ] Minimum member age (policy states 16+ — confirm for target markets).
- [ ] Commitment that customer/member data is not used to train third-party foundation models (true of Amazon Bedrock by default — confirm this stays the product policy).
- [ ] Health-related data handling for target markets (e.g. GDPR special-category data, US state health-privacy laws). The site makes no HIPAA/GDPR/SOC 2 compliance claims; keep it that way until verified.

## 3. Forms

- [ ] Deploy `aws/lead-intake` (see its README) or create a Formspree form.
- [ ] Verify the sender identity in Amazon SES and move the account out of the SES sandbox (or verify the recipient address).
- [ ] Set `VITE_FORMS_ENDPOINT` in the hosting provider's environment variables and **rebuild**.
- [ ] Set `ALLOWED_ORIGINS` on the Lambda to the production origins.
- [ ] Submit both forms on the live site and confirm the email arrives at rasheed@jixora.space.
- [ ] Without the endpoint the forms show “Your message was not sent” with a pre-filled email link — they never fake success.

## 4. Build & hosting

- [ ] `npm ci && npm run build` succeeds on Node 20.19+.
- [ ] `npm run lint:content` passes.
- [ ] `/`, `/privacy`, `/terms` return 200; an unknown path returns the 404 page with status 404.
- [ ] `VITE_SITE_URL` matches the canonical host (`https://www.jixora.space`) and the apex domain redirects to it.
- [ ] HTTPS certificate active for both `jixora.space` and `www.jixora.space`.

## 5. SEO & sharing

- [ ] View source on `/` — headline, features, AWS section and team are in the HTML.
- [ ] `https://www.jixora.space/sitemap.xml` and `/robots.txt` load.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Check the Open Graph preview with LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/).
- [ ] Validate structured data with the Rich Results Test.

## 6. Final review

- [ ] Click every nav item, CTA and footer link on desktop and mobile.
- [ ] Walk through the coach console demo: search, filters, member drawer, review queue approve/dismiss/undo.
- [ ] Keyboard-only pass: skip link, menu, tabs, dialog (Esc closes), forms.
- [ ] No traction, customer, partner or certification claims added without evidence.
