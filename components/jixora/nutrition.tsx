import Image from 'next/image'
import { ChoiceGroup } from './choice-group'
import { Card, SectionHeading } from './section-heading'

const habits = [
  { label: 'Water', value: '6 / 8 glasses', pct: 75 },
  { label: 'Fruit & vegetables', value: 'Logged', pct: 100 },
  { label: 'Protein-rich meals', value: '2 / 3', pct: 66 },
  { label: 'Processed / snack foods', value: '1 logged', pct: 20 },
]

export function Nutrition() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Nutrition check-ins"
            title="Your workouts are only part of the picture."
            description="JiXora isn't a medical nutritionist. It helps you notice general eating habits, hydration and consistency, without judgement."
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/healthy-meal.png"
              alt="Balanced meal bowl with chicken, quinoa, avocado and greens"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:justify-end">
          <Card className="flex flex-col gap-5 p-6 md:p-8">
            <p className="font-display text-lg font-semibold">{"Today's habits"}</p>
            <ul className="flex flex-col gap-4">
              {habits.map((habit) => (
                <li key={habit.label} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{habit.label}</span>
                    <span className="font-mono text-muted-foreground">
                      {habit.value}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${habit.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="flex flex-col gap-4 p-6 md:p-8">
            <p className="font-display text-lg font-semibold">
              {"How would you describe today's eating?"}
            </p>
            <ChoiceGroup
              label="Today's eating"
              defaultValue="Mixed"
              options={['On track', 'Mostly balanced', 'Mixed', 'Off track']}
            />
            <p className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-relaxed">
              {"One difficult day doesn't erase your progress. Tomorrow, let's focus on your planned meals and hydration."}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
