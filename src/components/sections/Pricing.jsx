import { Check, ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { pricing } from '../../data/content.js'

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="container-x py-24 lg:py-32">
      <SectionHeading
        id="pricing-title"
        eyebrow="Pricing"
        title="Plans that match how you coach."
        description="Pricing is set with each early-access partner based on team size and the number of active members. Tell us about your business and we’ll send a quote."
        align="center"
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {pricing.map((tier) => (
          <article
            key={tier.id}
            data-reveal
            className={`flex flex-col rounded-[1.5rem] border p-7 ${tier.featured ? 'dark-surface border-ink bg-ink text-paper lg:-my-3 lg:py-10' : 'border-line bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{tier.id}</h3>
              {tier.featured && <span className="rounded-full bg-volt px-2.5 py-0.5 text-xs font-semibold text-ink">For teams</span>}
            </div>
            <p className={`mt-1 text-sm ${tier.featured ? 'text-pine-200' : 'text-ink-3'}`}>{tier.audience}</p>
            <p className="mt-6 font-display text-3xl font-semibold">Custom quote</p>
            <p className={`text-sm ${tier.featured ? 'text-pine-300' : 'text-ink-3'}`}>Based on coaches and active members</p>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((f) => (
                <li key={f} className={`flex gap-2.5 text-[0.95rem] ${tier.featured ? 'text-pine-200' : 'text-ink-2'}`}>
                  <Check className={`mt-0.5 size-4 shrink-0 ${tier.featured ? 'text-volt' : 'text-moss'}`} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink
              to={`/?plan=${tier.id}#early-access`}
              variant={tier.featured ? 'volt' : 'outline'}
              size="lg"
              className="mt-8 w-full"
              aria-label={`Request pricing for the ${tier.id} plan`}
            >
              {tier.id === 'Enterprise' ? 'Contact sales' : 'Request pricing'} <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  )
}
