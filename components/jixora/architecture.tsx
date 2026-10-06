import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './section-heading'

const services = [
  { name: 'Amazon Cognito', role: 'Account creation, authentication and user access.' },
  { name: 'Amazon DynamoDB', role: 'Schedules, check-ins, progress events, preferences and habit records.' },
  { name: 'Amazon S3', role: 'Exercise media, progress assets and application content.' },
  { name: 'AWS Lambda', role: 'Plan generation, completion processing and progress calculations.' },
  { name: 'Amazon EventBridge', role: 'Workout reminders, weekly reviews and milestone checks.' },
  { name: 'Amazon Bedrock', role: 'Plan generation, conversational coaching and adjustment suggestions.' },
  { name: 'Amazon API Gateway', role: 'APIs connecting the app with serverless services.' },
  { name: 'Amazon CloudWatch', role: 'Monitoring, logs and operational visibility.' },
]

const flow = [
  'Profile + goal',
  'Plan engine',
  '90-day schedule',
  'Daily workout',
  'Check-in',
  'Progress data',
  'AI review',
  'Plan adjustment',
]

export function Architecture() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <SectionHeading
        eyebrow="Built on AWS"
        title="A real recurring workload, running serverless."
        description="Every cloud service directly supports the daily loop of planning, training, checking in and adapting."
      />

      <ol className="mt-12 flex flex-wrap items-center gap-2" aria-label="Data flow">
        {flow.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-card px-3 py-2 font-mono text-xs">
              {step}
            </span>
            <ArrowRight
              aria-hidden="true"
              className={
                i === flow.length - 1
                  ? 'size-4 text-primary'
                  : 'size-4 text-muted-foreground'
              }
            />
          </li>
        ))}
        <li>
          <span className="rounded-lg bg-primary px-3 py-2 font-mono text-xs text-primary-foreground">
            Next workout
          </span>
        </li>
      </ol>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <li key={s.name} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-base font-semibold">{s.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {s.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
