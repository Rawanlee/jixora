import { Check, ShieldCheck, X } from 'lucide-react'
import { Card, SectionHeading } from './section-heading'

export function Safety() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Safety"
          title="Fitness guidance with sensible boundaries."
          description="Before JiXora creates a program, you answer a short readiness questionnaire. If your answers suggest professional guidance may be appropriate, JiXora recommends consulting a healthcare professional first."
        />
        <div className="flex flex-col gap-4">
          <Card className="flex gap-4">
            <ShieldCheck aria-hidden="true" className="size-6 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed">
              During workouts: stop exercising and seek medical attention if you
              experience chest pain, fainting or unusual severe shortness of
              breath.
            </p>
          </Card>
          <Card className="flex flex-col gap-4">
            <div className="flex items-start gap-3 text-sm">
              <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-destructive" />
              <p className="text-muted-foreground line-through">
                {'"You will lose 15 kg in 90 days."'}
              </p>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <p>
                {"\"We'll build a 90-day plan around your goal and track your progress along the way.\""}
              </p>
            </div>
          </Card>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Not designed for professional athletes, rehabilitation,
            pregnancy-specific training, treatment of obesity or eating
            disorders, or medical exercise prescription.
          </p>
        </div>
      </div>
    </section>
  )
}
