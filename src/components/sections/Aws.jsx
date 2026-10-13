import { UserRoundCheck, Database, Workflow, BrainCircuit, LayoutDashboard } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { awsIntro, awsPipeline, awsServices } from '../../data/content.js'

const stageIcons = [UserRoundCheck, Database, Workflow, BrainCircuit, LayoutDashboard]

export function Aws() {
  return (
    <section id="technology" aria-labelledby="aws-title" className="border-y border-line bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="aws-title" eyebrow="Technology" title="How We Use Amazon Web Services" description={awsIntro} />

        <ol className="mt-14 grid gap-3 md:grid-cols-5" aria-label="JiXora architecture pipeline">
          {awsPipeline.map((s, i) => {
            const Icon = stageIcons[i]
            return (
              <li key={s.stage} data-reveal className="relative flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={`flex h-full flex-col rounded-card border p-5 ${i === 3 ? 'dark-surface border-ink bg-ink text-paper' : 'border-line bg-paper'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`flex size-10 items-center justify-center rounded-xl ${i === 3 ? 'bg-volt text-ink' : 'bg-white text-moss'}`}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className={`font-mono text-xs ${i === 3 ? 'text-pine-300' : 'text-ink-3'}`}>0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.stage}</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {s.services.map((svc) => (
                      <li key={svc} className={`rounded-md px-2 py-0.5 font-mono text-[0.68rem] ${i === 3 ? 'bg-white/10 text-volt' : 'bg-white text-moss'}`}>{svc}</li>
                    ))}
                  </ul>
                  <p className={`mt-3 text-sm leading-relaxed ${i === 3 ? 'text-pine-200' : 'text-ink-2'}`}>{s.role}</p>
                </div>
                {i < awsPipeline.length - 1 && (
                  <span aria-hidden="true" className="mx-auto h-3 w-px bg-line md:absolute md:-right-3 md:top-1/2 md:mx-0 md:h-px md:w-3" />
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <h3 className="text-2xl font-semibold">Services and their role in the product</h3>
            <p className="mt-3 leading-relaxed text-ink-2">
              Each service has a single responsibility in the member loop. Personal fitness information stays in the
              workspace that collected it, and AI-drafted changes are always held for a coach decision before they reach a member.
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {awsServices.map((s) => (
              <li key={s.name} data-reveal className="border-t border-line py-4">
                <p className="text-[0.95rem] leading-relaxed text-ink-2">
                  <strong className="font-semibold text-ink">{s.name}:</strong> {s.purpose}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
