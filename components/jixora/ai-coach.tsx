import Image from 'next/image'
import { Card, SectionHeading } from './section-heading'

const conversations = [
  {
    user: "I'm travelling tomorrow and won't have access to a gym.",
    reply:
      "I can switch tomorrow's gym session to a bodyweight session and keep Friday's workout unchanged.",
    action: 'Update tomorrow',
  },
  {
    user: 'I only have 20 minutes today.',
    reply:
      'Your scheduled session is 45 minutes. I can create a shorter version focusing on the main movements.',
    action: 'Give me the 20-minute workout',
  },
  {
    user: 'Why am I doing squats today?',
    reply:
      'Squats train your legs and core together. They build the lower-body strength your plan progresses toward in weeks 4–6.',
    action: 'Show form tips',
  },
]

export function AiCoach() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="AI coach"
            title="Ask JiXora."
            description="A conversational coach that knows your plan, so it can actually change it, not just chat about fitness."
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/home-workout.png"
              alt="Woman doing a bodyweight lunge on a mat at home"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Card className="flex flex-col gap-8 p-6 md:p-8">
          {conversations.map((c) => (
            <div key={c.user} className="flex flex-col gap-3">
              <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                {c.user}
              </p>
              <div className="flex max-w-[90%] gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary font-display text-xs font-bold text-primary"
                >
                  J
                </span>
                <div className="flex flex-col gap-2">
                  <p className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm leading-relaxed">
                    {c.reply}
                  </p>
                  <button
                    type="button"
                    className="w-fit rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {c.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
