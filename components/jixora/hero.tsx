import Image from 'next/image'
import { ArrowRight, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 md:pt-24 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <p className="w-fit rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            AI fitness · 90-day accountability
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance md:text-7xl">
            Your goal. Your plan.{' '}
            <span className="text-primary">Your next 90 days.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Tell JiXora about your body, fitness level, equipment and goal. It
            builds a personalized routine, keeps you on schedule, checks in on
            your habits and adapts as you progress.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
              <a href="#start">
                Start my 90-day plan
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-border bg-transparent px-6 text-base"
            >
              <a href="#how-it-works">See how JiXora works</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Your plan evolves with your progress.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/hero-training.png"
              alt="Man performing a goblet squat with a kettlebell in a minimal gym"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <div className="absolute -left-4 bottom-8 w-64 rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur md:-left-10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Day 18 of 90</span>
              <span>20%</span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={20}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="90-day plan progress"
            >
              <div className="h-full w-1/5 rounded-full bg-primary" />
            </div>
            <p className="mt-3 font-display text-base font-semibold">
              Today: Lower Body
            </p>
            <p className="text-xs text-muted-foreground">48 min · Moderate</p>
          </div>

          <div className="absolute -right-2 top-8 flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 text-sm shadow-xl backdrop-blur md:-right-6">
            <Flame aria-hidden="true" className="size-4 text-primary" />
            <span className="font-medium">6-day streak</span>
          </div>
        </div>
      </div>
    </section>
  )
}
