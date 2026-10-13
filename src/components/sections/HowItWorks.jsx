import { SectionHeading } from '../ui/SectionHeading.jsx'
import { steps } from '../../data/content.js'

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="container-x py-24 lg:py-32">
      <SectionHeading
        id="how-title"
        eyebrow="How it works"
        title="Set it up once. JiXora runs the daily follow-up."
        description="Coaches stay responsible for programming and decisions. JiXora handles the repetition in between."
      />
      <ol className="relative mt-14 grid gap-4 md:grid-cols-5 md:gap-3">
        <span aria-hidden="true" className="absolute left-[1.35rem] top-6 bottom-6 w-px bg-line md:left-6 md:right-6 md:top-[1.35rem] md:bottom-auto md:h-px md:w-auto" />
        {steps.map((s, i) => (
          <li key={s.title} data-reveal className="relative flex gap-4 md:flex-col" style={{ transitionDelay: `${i * 90}ms` }}>
            <span className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-base font-semibold ${i === 2 ? 'border-ink bg-volt text-ink' : 'border-line bg-paper text-ink'}`}>
              {i + 1}
            </span>
            <div className="rounded-card border border-line bg-white p-5 md:min-h-[15rem]">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-3">{s.tag}</p>
              <h3 className="mt-2 text-lg font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
