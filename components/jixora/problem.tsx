import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './section-heading'

const oldLoop = ['Find workout', 'Try it', 'Miss several days', 'Stop']
const newLoop = [
  'Set goal',
  'Get plan',
  'Train',
  'Check in',
  'Track',
  'Adjust',
  'Keep going',
]

function Loop({ steps, highlight }: { steps: string[]; highlight?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={
              highlight
                ? 'rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground'
                : 'rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground line-through decoration-muted-foreground/40'
            }
          >
            {step}
          </span>
          {i < steps.length - 1 ? (
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-muted-foreground"
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}

export function Problem() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
        <SectionHeading
          eyebrow="The problem"
          title="Starting isn't the hardest part. Staying consistent is."
          description="Generic routines don't know your fitness level, equipment, schedule or goals. And after the first burst of motivation fades, nobody follows up. JiXora combines personalized planning, daily accountability and progress tracking."
        />
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Instead of
            </p>
            <Loop steps={oldLoop} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              JiXora becomes
            </p>
            <Loop steps={newLoop} highlight />
          </div>
        </div>
      </div>
    </section>
  )
}
