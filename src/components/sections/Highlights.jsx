import { CalendarRange, MessageSquareText, ShieldCheck, Radar } from 'lucide-react'
import { highlights } from '../../data/content.js'

const icons = [CalendarRange, MessageSquareText, ShieldCheck, Radar]

export function Highlights() {
  return (
    <section aria-label="Product highlights" className="border-y border-line bg-white/50">
      <ul className="container-x grid divide-line sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
        {highlights.map((h, i) => {
          const Icon = icons[i]
          return (
            <li key={h.title} data-reveal className="flex gap-4 py-7 lg:px-6 lg:first:pl-0 lg:last:pr-0" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-volt">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold">{h.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-3">{h.body}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
