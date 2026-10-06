import { AiCoach } from '@/components/jixora/ai-coach'
import { Architecture } from '@/components/jixora/architecture'
import { FinalCta } from '@/components/jixora/final-cta'
import { FollowUp } from '@/components/jixora/follow-up'
import { Hero } from '@/components/jixora/hero'
import { HowItWorks } from '@/components/jixora/how-it-works'
import { Nutrition } from '@/components/jixora/nutrition'
import { Onboarding } from '@/components/jixora/onboarding'
import { PlanPreview } from '@/components/jixora/plan-preview'
import { Problem } from '@/components/jixora/problem'
import { Progress } from '@/components/jixora/progress'
import { Safety } from '@/components/jixora/safety'
import { SiteHeader } from '@/components/jixora/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <Onboarding />
        <PlanPreview />
        <FollowUp />
        <Nutrition />
        <Progress />
        <AiCoach />
        <HowItWorks />
        <Safety />
        <Architecture />
        <FinalCta />
      </main>
    </>
  )
}
