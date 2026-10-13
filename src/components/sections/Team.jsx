import { Mail } from 'lucide-react'
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { team, company } from '../../data/site.js'

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="border-t border-line py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading
          id="team-title"
          eyebrow="Team"
          title={`The Team Behind ${company.name}`}
          description="JiXora is an early-stage company founded in 2026. The team is deliberately small and works directly with the coaches and fitness businesses who join the early-access program."
        />
        <ul className="grid gap-4">
          {team.map((p) => (
            <li key={p.name} data-reveal className="flex flex-col gap-5 rounded-[1.5rem] border border-line bg-white p-6 sm:flex-row sm:p-8">
              <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-ink" aria-hidden="true">
                <span className="grid-texture-dark absolute inset-0" />
                <span className="relative font-display text-3xl font-semibold text-volt">{p.initials}</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-moss">{p.title}, {company.name}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{p.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium hover:border-ink/40"
                    >
                      <LinkedInIcon className="size-4 text-[#0a66c2]" /> LinkedIn<span className="sr-only"> profile of {p.name}</span>
                    </a>
                  )}
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium hover:border-ink/40">
                    <Mail className="size-4 text-moss" aria-hidden="true" /> {company.email}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
