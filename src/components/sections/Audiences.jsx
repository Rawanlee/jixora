import { useState } from 'react'
import { Dumbbell, Building2, Briefcase, MonitorSmartphone } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { audiences } from '../../data/content.js'

const icons = { coaches: Dumbbell, gyms: Building2, wellness: Briefcase, programs: MonitorSmartphone }

export function Audiences() {
  const [active, setActive] = useState(audiences[0].id)
  const a = audiences.find((x) => x.id === active)
  const Icon = icons[a.id]

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="container-x py-24 lg:py-32">
      <SectionHeading
        id="solutions-title"
        eyebrow="Who it’s for"
        title="Built for the people responsible for members’ results."
        description="Different businesses, the same gap: structured programs that need daily follow-up nobody has time to give."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div role="tablist" aria-label="Customer segments" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {audiences.map((x) => {
            const I = icons[x.id]
            const selected = x.id === active
            return (
              <button
                key={x.id}
                id={`tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${x.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(x.id)}
                onKeyDown={(e) => {
                  const i = audiences.findIndex((y) => y.id === active)
                  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
                    e.preventDefault()
                    const next = audiences[(i + 1) % audiences.length].id
                    setActive(next)
                    document.getElementById(`tab-${next}`)?.focus()
                  } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
                    e.preventDefault()
                    const prev = audiences[(i - 1 + audiences.length) % audiences.length].id
                    setActive(prev)
                    document.getElementById(`tab-${prev}`)?.focus()
                  }
                }}
                className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                  selected ? 'border-ink bg-ink text-paper' : 'border-line bg-white/60 text-ink hover:bg-white'
                }`}
              >
                <I className={`size-5 ${selected ? 'text-volt' : 'text-moss'}`} aria-hidden="true" />
                <span className="font-medium">{x.name}</span>
              </button>
            )
          })}
        </div>

        <div id={`panel-${a.id}`} role="tabpanel" aria-labelledby={`tab-${a.id}`} className="rounded-[1.5rem] border border-line bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-moss-50 text-moss">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-2xl font-semibold">{a.name}</h3>
          </div>
          <p className="mt-3 text-ink-2">{a.who}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['The problem', a.problem],
              ['How they use JiXora', a.use],
              ['The result', a.benefit],
            ].map(([t, d], i) => (
              <div key={t} className={`rounded-xl p-4 ${i === 2 ? 'bg-ink text-paper' : 'bg-paper'}`}>
                <dt className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] ${i === 2 ? 'text-volt' : 'text-ink-3'}`}>{t}</dt>
                <dd className={`mt-2 text-[0.95rem] leading-relaxed ${i === 2 ? 'text-paper' : 'text-ink-2'}`}>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {/* All segments in crawlable form for search engines and no-JS visitors */}
      <ul className="sr-only">
        {audiences.map((x) => (
          <li key={x.id}>{x.name}: {x.who} {x.problem} {x.use} {x.benefit}</li>
        ))}
      </ul>
    </section>
  )
}
