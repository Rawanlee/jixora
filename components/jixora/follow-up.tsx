import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { ChoiceGroup } from './choice-group'
import { Card, SectionHeading } from './section-heading'

function Message({
  time,
  text,
  label,
  options,
}: {
  time: string
  text: string
  label: string
  options: string[]
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {time}
      </p>
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-foreground"
        >
          J
        </span>
        <div className="flex flex-col gap-3">
          <p className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-relaxed">
            {text}
          </p>
          <ChoiceGroup label={label} options={options} size="sm" />
        </div>
      </div>
    </div>
  )
}

const reschedule = [
  { day: 'Tuesday', note: 'Workout missed', muted: true },
  { day: 'Wednesday', note: 'Recovery' },
  { day: 'Thursday', note: 'Upper Body rescheduled', accent: true },
  { day: 'Plan updated', note: 'Recovery periods respected' },
]

export function FollowUp() {
  return (
    <section id="follow-up" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="Automatic follow-up"
        title="JiXora doesn't disappear after creating your plan."
        description="It checks in throughout your 90-day commitment, supportive, never shaming. One meal or one missed day is never a failure."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-7 p-6 md:p-8">
          <Message
            time="7:30 AM"
            label="Morning reply"
            text="Morning, David. Lower Body is scheduled today. You've completed 6 workouts in a row. Ready to keep it going?"
            options={["I'm ready", 'Move workout']}
          />
          <Message
            time="After workout"
            label="Workout difficulty"
            text="How did today's workout feel?"
            options={['Too easy', 'Just right', 'Difficult']}
          />
          <Message
            time="Evening"
            label="Eating check-in"
            text="Quick check-in: how did eating go today?"
            options={['On plan', 'Mostly good', 'Could be better', 'Log my meals']}
          />
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-5 p-6 md:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Smart scheduling
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-balance">
                {"Missed today? Your plan isn't ruined."}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {"Looks like today's workout wasn't completed. What happened?"}
              </p>
            </div>
            <ChoiceGroup
              label="Missed workout reason"
              size="sm"
              options={[
                "Didn't have time",
                "Wasn't feeling well",
                'Too tired',
                "I'll do it later",
                'Reschedule',
              ]}
            />
            <ol className="flex flex-col gap-1">
              {reschedule.map((step, i) => (
                <li key={step.day} className="flex flex-col items-start gap-1">
                  <div
                    className={
                      step.accent
                        ? 'flex w-full items-center justify-between rounded-lg bg-primary px-4 py-2.5 text-sm text-primary-foreground'
                        : 'flex w-full items-center justify-between rounded-lg bg-secondary px-4 py-2.5 text-sm'
                    }
                  >
                    <span className="font-medium">{step.day}</span>
                    <span
                      className={
                        step.accent
                          ? 'text-primary-foreground/80'
                          : step.muted
                            ? 'text-muted-foreground line-through'
                            : 'text-muted-foreground'
                      }
                    >
                      {step.note}
                    </span>
                  </div>
                  {i < reschedule.length - 1 ? (
                    <ArrowDown
                      aria-hidden="true"
                      className="ml-4 size-3.5 text-muted-foreground"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </Card>

          <div className="relative min-h-56 flex-1 overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/morning-run.png"
              alt="Person jogging on a riverside path at sunrise"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
