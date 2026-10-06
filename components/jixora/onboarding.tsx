'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChoiceGroup } from './choice-group'
import { SectionHeading } from './section-heading'

const stats = [
  { label: 'Age', value: '24' },
  { label: 'Height', value: '178 cm' },
  { label: 'Weight', value: '84 kg' },
  { label: 'Activity', value: 'Moderate' },
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">{label}</p>
      {children}
    </div>
  )
}

export function Onboarding() {
  const [days, setDays] = useState(4)

  return (
    <section id="start" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Start with you"
            title="Tell JiXora where you're starting."
            description="Onboarding feels like talking to a personal coach. A short readiness questionnaire comes first, so your plan starts at the right intensity."
          />
          <dl className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form
          className="flex flex-col gap-7 rounded-3xl border border-border bg-card p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Field label="What's your goal?">
            <ChoiceGroup
              label="Goal"
              defaultValue="Lose body fat"
              options={[
                'Lose body fat',
                'Build muscle',
                'Improve fitness',
                'Get stronger',
                'Build consistency',
                'Maintain weight',
              ]}
            />
          </Field>
          <div className="grid gap-7 sm:grid-cols-2">
            <Field label="Where will you train?">
              <ChoiceGroup
                label="Training location"
                defaultValue="Gym"
                options={['Gym', 'Home', 'Both']}
              />
            </Field>
            <Field label="Your experience">
              <ChoiceGroup
                label="Experience"
                defaultValue="Beginner"
                options={['Beginner', 'Intermediate', 'Experienced']}
              />
            </Field>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label htmlFor="days" className="text-sm font-medium">
                How often can you train?
              </label>
              <span className="font-display text-lg font-semibold text-primary">
                {days} days / week
              </span>
            </div>
            <input
              id="days"
              type="range"
              min={2}
              max={6}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </div>
          <Field label="Typical workout time">
            <ChoiceGroup
              label="Workout time"
              defaultValue="45–60 min"
              options={['20–30 min', '30–45 min', '45–60 min', '60+ min']}
            />
          </Field>
          <Button type="submit" size="lg" className="h-12 rounded-full text-base">
            Build my 90-day plan
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>
      </div>
    </section>
  )
}
