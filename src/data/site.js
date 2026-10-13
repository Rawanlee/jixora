// Single source of truth for company facts. The website, SEO metadata,
// structured data and docs/linkedin-profile.md must all agree with this file.

const env = import.meta.env ?? {}

export const SITE_URL = (env.VITE_SITE_URL || 'https://www.jixora.space').replace(/\/$/, '')

export const company = {
  name: 'JiXora',
  legalName: 'JiXora',
  domain: 'jixora.space',
  url: SITE_URL,
  email: 'rasheed@jixora.space',
  founded: 2026,
  stage: 'Building — early access',
  tagline: 'Personalised 90-day programs and automated member check-ins for fitness businesses.',
  positioning:
    'JiXora is AI program delivery and accountability software for coaches, gyms and wellness programs. It turns a member intake into a personalised 90-day plan, follows up with every member automatically, and shows coaches who needs attention before they drop off.',
  shortDescription:
    'AI software that builds personalised 90-day training plans, runs automated member check-ins and flags drop-off risk so coaches can step in early.',
  // Company page supplied by the founder. Override with VITE_LINKEDIN_COMPANY_URL.
  linkedinUrl: env.VITE_LINKEDIN_COMPANY_URL || 'https://www.linkedin.com/company/jixora.site/',
}

export const team = [
  {
    name: 'Rasheed Qodus',
    title: 'Founder',
    initials: 'RQ',
    bio: 'Rasheed founded JiXora in 2026 to give fitness businesses a dependable way to keep members engaged after sign-up. Rasheed leads product and company direction, from the member intake and 90-day program engine to the coach console and early-access program.',
    linkedin: 'https://www.linkedin.com/in/abdulrasheed-qudus/',
  },
]

export const navLinks = [
  { label: 'Product', href: '/#product' },
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Technology', href: '/#technology' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Team', href: '/#team' },
]
