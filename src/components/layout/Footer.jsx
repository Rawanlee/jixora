import { Link } from 'react-router'
import { Mail } from 'lucide-react'
import { Logo } from '../ui/Logo.jsx'
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx'
import { company } from '../../data/site.js'

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Product overview', to: '/#product' },
      { label: 'Features', to: '/#features' },
      { label: 'Coach console demo', to: '/#demo' },
      { label: 'Pricing', to: '/#pricing' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Independent coaches', to: '/#solutions' },
      { label: 'Gyms & studios', to: '/#solutions' },
      { label: 'Corporate wellness', to: '/#solutions' },
      { label: 'How it works', to: '/#how-it-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Technology', to: '/#technology' },
      { label: 'Team', to: '/#team' },
      { label: 'Early access', to: '/#early-access' },
      { label: 'Contact', to: '/#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="dark-surface bg-pine-950 text-pine-200">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div className="flex max-w-sm flex-col gap-5">
          <Link to="/" aria-label="JiXora home">
            <Logo dark />
          </Link>
          <p className="text-sm leading-relaxed text-pine-300">{company.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm text-paper hover:border-white/30"
            >
              <Mail className="size-4" aria-hidden="true" />
              {company.email}
            </a>
            {company.linkedinUrl && (
              <a
                href={company.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JiXora on LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-paper hover:border-white/30"
              >
                <LinkedInIcon />
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-pine-300">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-pine-200 transition-colors hover:text-volt">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-pine-300 sm:flex-row sm:items-center sm:justify-between">
          <p>{`© 2026 ${company.name}. All rights reserved.`}</p>
          <p>JiXora provides general fitness programming and is not a medical service.</p>
        </div>
      </div>
    </footer>
  )
}
