import { TrendingDown, Clock, FileX2, ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { problem } from '../../data/content.js'

const icons = [Clock, FileX2, TrendingDown]

export function Problem() {
  return (
    <section aria-labelledby="problem-title" className="container-x py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="problem-title"
            eyebrow="The problem"
            title="Members don’t quit on day one. They fade out in week four."
            description="Fitness businesses are good at getting people started. What breaks is the daily follow-up that keeps a new habit alive — and it breaks because it depends on coaches finding hours they don’t have."
          />
          <figure data-reveal className="rounded-card border border-line bg-white p-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-3">A familiar scenario</p>
            <blockquote className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{problem.example}</blockquote>
          </figure>
        </div>

        <div className="flex flex-col gap-4">
          {problem.points.map((p, i) => {
            const Icon = icons[i]
            return (
              <article key={p.title} data-reveal className="flex gap-5 rounded-card border border-line bg-white/70 p-6 transition-colors hover:bg-white" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-paper text-atrisk">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{p.body}</p>
                </div>
              </article>
            )
          })}
          <div data-reveal className="dark-surface rounded-card bg-ink p-6 text-paper">
            <p className="text-sm font-semibold text-volt">What it costs</p>
            <ul className="mt-3 flex flex-col gap-2">
              {problem.consequences.map((c) => (
                <li key={c} className="flex gap-2.5 text-[0.95rem] text-pine-200">
                  <ArrowRight className="mt-1 size-4 shrink-0 text-volt" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-white/10 pt-5 text-[0.95rem] leading-relaxed">
              <span className="font-semibold">The JiXora approach:</span>{' '}
              <span className="text-pine-200">
                automate the daily follow-up, keep every plan current with what members report, and give coaches a short,
                prioritised list of who needs a human response.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
