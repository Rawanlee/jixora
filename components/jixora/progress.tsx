import { ArrowUp, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, SectionHeading } from './section-heading'

const stats = [
  { label: 'Workouts', value: '14', note: 'completed' },
  { label: 'Consistency', value: '82%', note: 'overall' },
  { label: 'Active minutes', value: '620', note: 'min' },
  { label: 'Weight trend', value: '82.8', note: 'from 84 kg' },
  { label: 'Strength', value: '+8%', note: 'progress' },
  { label: 'Streak', value: '6', note: 'days' },
]

const review = [
  { label: 'Current weight', value: '82.8 kg' },
  { label: 'Starting weight', value: '84 kg' },
  { label: 'Energy', value: 'Good' },
  { label: 'Difficulty', value: 'Moderate' },
  { label: 'Nutrition', value: '5 / 7 days' },
]

const milestones = [
  { name: 'First 7 days', done: true },
  { name: '10 workouts completed', done: true },
  { name: '30-day commitment', done: false },
  { name: '75% workout consistency', done: false },
  { name: 'Personal strength record', done: false },
  { name: '60-day commitment', done: false },
  { name: '90-day commitment', done: false },
  { name: 'Goal milestone', done: false },
]

const journey = ['Day 1', 'Day 30', 'Day 60', 'Day 90']

export function Progress() {
  return (
    <section id="progress" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="Progress & weekly review"
        title="See what consistency is doing."
        description="Every seven days, JiXora learns from your progress and suggests changes. You decide whether to accept them."
      />

      <Card className="mt-12 p-6 md:p-8">
        <div className="flex items-center justify-between text-sm">
          <span className="font-display text-lg font-semibold">90-day journey</span>
          <span className="font-mono text-muted-foreground">18 / 90 days</span>
        </div>
        <div className="relative mt-6">
          <div className="h-1.5 rounded-full bg-muted">
            <div className="h-full w-1/5 rounded-full bg-primary" />
          </div>
          <ol className="mt-3 flex justify-between font-mono text-xs text-muted-foreground">
            {journey.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ol>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 bg-card p-4">
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold">{s.value}</dd>
              <dd className="text-xs text-muted-foreground">{s.note}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-6 p-6 md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Week 3 review
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Workout completion
              </p>
              <p className="font-display text-5xl font-semibold">83%</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
              <ArrowUp aria-hidden="true" className="size-3.5" />9% vs last week
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {review.map((r) => (
              <div key={r.label}>
                <dt className="text-muted-foreground">{r.label}</dt>
                <dd className="font-medium">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-xl border border-border bg-secondary p-4">
            <p className="text-xs font-medium text-primary">JiXora insight</p>
            <p className="mt-2 text-sm leading-relaxed">
              {"Your workout consistency improved this week. You've reported that lower-body sessions feel increasingly manageable. Next week's plan can progress gradually while keeping your current schedule."}
            </p>
          </div>
          <Button variant="outline" className="h-11 w-fit rounded-full bg-transparent px-5">
            Review next week
          </Button>
        </Card>

        <Card className="flex flex-col gap-5 p-6 md:p-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Milestones
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-balance">
              Celebrate consistency, not just the scale.
            </h3>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {milestones.map((m) => (
              <li
                key={m.name}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-3 py-3 text-sm',
                  m.done
                    ? 'border-primary/40 bg-primary/10'
                    : 'border-border bg-secondary text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full',
                    m.done ? 'bg-primary text-primary-foreground' : 'bg-muted',
                  )}
                >
                  {m.done ? (
                    <Check aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Lock aria-hidden="true" className="size-3" />
                  )}
                </span>
                <span className={m.done ? 'text-foreground' : undefined}>
                  {m.name}
                </span>
                <span className="sr-only">{m.done ? '(achieved)' : '(locked)'}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
