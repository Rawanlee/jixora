import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './site-header'

export function FinalCta() {
  return (
    <>
      <section className="px-5 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground md:py-24">
          <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-balance md:text-6xl">
            90 days. One commitment. Built around you.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-primary-foreground/75 text-pretty md:text-lg">
            JiXora gives you the plan, tracks the work, follows up when
            motivation drops and helps you build sustainable fitness habits.
          </p>
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-primary-foreground px-6 text-base text-primary hover:bg-primary-foreground/90"
          >
            <a href="#start">
              Build my 90-day plan
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
            JiXora provides general fitness and wellness guidance and is not a
            substitute for professional medical advice.
          </p>
          <p className="text-xs text-muted-foreground">
            {'© 2026 JiXora'}
          </p>
        </div>
      </footer>
    </>
  )
}
