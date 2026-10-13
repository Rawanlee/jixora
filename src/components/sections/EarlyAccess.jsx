import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowRight, Check } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { FormField } from '../ui/FormField.jsx'
import { Button } from '../ui/Button.jsx'
import { FormAlert, FormSuccess, Honeypot, SubmitLabel } from '../ui/FormStatus.jsx'
import { useForm } from '../../hooks/useForm.js'
import { earlyAccess, pricing } from '../../data/content.js'

const SIZES = ['Just me', '2–10 people', '11–50 people', '51–200 people', '200+ people']
const USE_CASES = [
  'Personal training clients',
  'Gym or studio member onboarding',
  'Group challenges and cohorts',
  'Corporate wellness program',
  'Selling a digital fitness program',
  'Something else',
]
const PLANS = pricing.map((p) => p.id)

const rules = {
  fullName: { required: true, requiredMessage: 'Enter your full name.', max: 120 },
  email: { required: true, email: true, requiredMessage: 'Enter your business email.' },
  company: { required: true, requiredMessage: 'Enter your company or business name.', max: 160 },
  companySize: { required: true, requiredMessage: 'Select your company size.' },
  useCase: { required: true, requiredMessage: 'Select your primary use case.' },
  message: { max: 2000 },
}

export function EarlyAccess() {
  const { search } = useLocation()
  const form = useForm({
    formType: 'early-access',
    rules,
    initial: { fullName: '', email: '', company: '', companySize: '', useCase: '', plan: '', message: '', company_website: '' },
  })
  const { values, errors, status, onChange, onSubmit, formRef, setValues } = form

  // Pricing CTAs link here with ?plan=<tier>; preselect it.
  useEffect(() => {
    const plan = new URLSearchParams(search).get('plan')
    if (plan && PLANS.includes(plan)) setValues((v) => ({ ...v, plan }))
  }, [search, setValues])

  const body = `Name: ${values.fullName}\nCompany: ${values.company}\nCompany size: ${values.companySize}\nUse case: ${values.useCase}\nPlan of interest: ${values.plan}\n\n${values.message}`

  return (
    <section id="early-access" aria-labelledby="ea-title" className="bg-paper-2/60 py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="ea-title"
            eyebrow="Business progress & early access"
            title="JiXora is in early access."
            description="We are building JiXora alongside the coaches and fitness businesses who will use it. Early-access partners help decide what ships first and get set up personally."
          />
          <dl data-reveal className="grid grid-cols-3 overflow-hidden rounded-card border border-line bg-white">
            {earlyAccess.status.map((s) => (
              <div key={s.label} className="border-r border-line p-4 last:border-0">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-3">{s.label}</dt>
                <dd className="mt-1 font-display text-lg font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal>
            <p className="font-semibold">What early-access partners get</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {earlyAccess.offer.map((o) => (
                <li key={o} className="flex gap-3 text-ink-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-moss text-paper">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="self-start rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgb(13_22_19/0.4)] sm:p-8">
          {status === 'success' ? (
            <FormSuccess title="Request received" onReset={form.reset}>
              Thanks, {values.fullName.split(' ')[0]}. We’ll reply to {values.email} to arrange a walkthrough.
            </FormSuccess>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-labelledby="ea-form-title">
              <div>
                <h3 id="ea-form-title" className="text-xl font-semibold">Request early access</h3>
                <p className="mt-1 text-sm text-ink-3">Tell us about your business and how you run programs today.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="fullName" label="Full name" required autoComplete="name" value={values.fullName} onChange={onChange} error={errors.fullName} />
                <FormField id="email" label="Business email" type="email" required autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
                <FormField id="company" label="Company" required autoComplete="organization" value={values.company} onChange={onChange} error={errors.company} />
                <FormField id="companySize" as="select" label="Company size" required options={SIZES} value={values.companySize} onChange={onChange} error={errors.companySize} />
                <FormField id="useCase" as="select" label="Primary use case" required options={USE_CASES} value={values.useCase} onChange={onChange} error={errors.useCase} />
                <FormField id="plan" as="select" label="Plan of interest" options={PLANS} value={values.plan} onChange={onChange} />
              </div>
              <FormField id="message" as="textarea" label="Message" value={values.message} onChange={onChange} error={errors.message} placeholder="How many members or clients do you coach, and how do you follow up with them today?" />
              <Honeypot id="ea-hp" value={values.company_website} onChange={onChange} />
              <FormAlert status={status} message={form.message} mailSubject={`Early access request — ${values.company}`} mailBody={body} />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                  <SubmitLabel status={status}>
                    Request early access <ArrowRight className="size-4" aria-hidden="true" />
                  </SubmitLabel>
                </Button>
                <p className="text-xs text-ink-3">
                  We use these details only to respond to your request. See our <Link to="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
