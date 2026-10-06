import { SectionHeading } from './section-heading'

const steps = [
  {
    title: 'Tell us about yourself',
    body: 'Basic information, activity level, experience, equipment, schedule and fitness goal.',
  },
  {
    title: 'Get your plan',
    body: 'An initial 90-day schedule with workouts, recovery days and progressive milestones.',
  },
  {
    title: 'Show up',
    body: "Open JiXora and see exactly what you're scheduled to do today.",
  },
  {
    title: 'Check in',
    body: 'Log simple information about workout difficulty, eating habits and progress.',
  },
  {
    title: 'Adapt',
    body: 'Your feedback and completed sessions shape suggested adjustments to upcoming weeks.',
  },
  {
    title: 'Reach milestones',
    body: 'Watch consistency, fitness indicators and personal goals progress over 90 days.',
  },
]

const audiences = [
  "Beginners who don't know how to structure workouts",
  'Busy professionals who need accountability',
  'Gym members who struggle with consistency',
  'Home-workout users who need a structured routine',
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="How JiXora works"
        title="Six steps. Repeated for 90 days."
      />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 bg-background p-6 md:p-8">
            <span className="font-mono text-sm text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-xl font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <h3 className="font-display text-2xl font-semibold md:text-3xl">
          {"Who it's for"}
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {audiences.map((a) => (
            <li
              key={a}
              className="rounded-xl border border-border bg-card px-4 py-4 text-sm"
            >
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
