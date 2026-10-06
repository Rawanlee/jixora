import { Check, Flame, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Card, SectionHeading } from './section-heading'

type Status = 'done' | 'today' | 'scheduled' | 'rest'

const week: { day: string; name: string; status: Status }[] = [
  { day: 'Mon', name: 'Upper Body', status: 'done' },
  { day: 'Tue', name: '30-min Walk', status: 'done' },
  { day: 'Wed', name: 'Lower Body', status: 'today' },
  { day: 'Thu', name: 'Recovery', status: 'scheduled' },
  { day: 'Fri', name: 'Full Body', status: 'scheduled' },
  { day: 'Sat', name: 'Cardio', status: 'scheduled' },
  { day: 'Sun', name: 'Rest', status: 'rest' },
]

const statusLabel: Record<Status, string> = {
  done: 'Completed',
  today: 'Today',
  scheduled: 'Scheduled',
  rest: 'Rest',
}

const workout = [
  { name: 'Warm-up', detail: '5 min' },
  { name: 'Goblet Squat', detail: '3 × 10' },
  { name: 'Romanian Deadlift', detail: '3 × 10' },
  { name: 'Walking Lunges', detail: '3 × 12' },
  { name: 'Leg Curl', detail: '3 × 12' },
  { name: 'Calf Raises', detail: '3 × 15' },
  { name: 'Cooldown', detail: '5 min' },
]

export function PlanPreview() {
  return (
    <section id="plan" className="scroll-mt-20 border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <SectionHeading
          eyebrow="Meet your 90-day plan"
          title="One goal. Broken into achievable weeks."
          description="After onboarding, JiXora creates a personalized schedule, so you never have to decide what to train today."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="flex flex-col gap-6 p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Your goal
                </p>
                <p className="mt-1 font-display text-xl font-semibold">
                  Improve fitness & reduce body fat
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-semibold">
                  Day 18<span className="text-muted-foreground"> / 90</span>
                </p>
                <p className="text-sm text-muted-foreground">72 days remaining</p>
              </div>
            </div>

            <div
              className="flex gap-1"
              role="img"
              aria-label="Week 3 of 13 in progress"
            >
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-2 flex-1 rounded-full',
                    i < 2 ? 'bg-primary' : i === 2 ? 'bg-primary/50' : 'bg-muted',
                  )}
                />
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
              {week.map((item) => (
                <li
                  key={item.day}
                  className={cn(
                    'flex flex-col gap-2 rounded-xl border p-3',
                    item.status === 'today'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-secondary',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-widest',
                      item.status === 'today'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.day}
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {item.name}
                  </span>
                  <span
                    className={cn(
                      'mt-auto flex items-center gap-1 text-[11px]',
                      item.status === 'done' && 'text-primary',
                      item.status === 'scheduled' && 'text-muted-foreground',
                      item.status === 'rest' && 'text-muted-foreground',
                    )}
                  >
                    {item.status === 'done' ? (
                      <Check aria-hidden="true" className="size-3" />
                    ) : null}
                    {statusLabel[item.status]}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm">
              <span className="text-muted-foreground">
                Weekly consistency:{' '}
                <span className="font-medium text-foreground">
                  4 / 5 activities
                </span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Flame aria-hidden="true" className="size-4 text-primary" />
                6-day consistency streak
              </span>
            </div>
          </Card>

          <Card className="flex flex-col gap-5 p-6 md:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {"Today's workout"}
              </p>
              <p className="mt-1 font-display text-xl font-semibold">
                Wednesday · Lower Body
              </p>
              <p className="text-sm text-muted-foreground">
                48 min · Moderate
              </p>
            </div>
            <ol className="flex flex-col divide-y divide-border">
              {workout.map((exercise, i) => (
                <li
                  key={exercise.name}
                  className="flex items-center justify-between py-2.5 text-sm"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {exercise.name}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {exercise.detail}
                  </span>
                </li>
              ))}
            </ol>
            <Button className="mt-auto h-11 rounded-full">
              <Play aria-hidden="true" />
              Start workout
            </Button>
          </Card>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {"Illustrative plan. Actual recommendations depend on the user's information and fitness level."}
        </p>
      </div>
    </section>
  )
}
