import { Mail, Send } from 'lucide-react'
import { LinkedInIcon } from '../ui/LinkedInIcon.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { FormField } from '../ui/FormField.jsx'
import { Button } from '../ui/Button.jsx'
import { FormAlert, FormSuccess, Honeypot, SubmitLabel } from '../ui/FormStatus.jsx'
import { useForm } from '../../hooks/useForm.js'
import { company } from '../../data/site.js'

const TOPICS = ['Product demo', 'Pricing', 'Partnership', 'Press or media', 'Privacy or data request', 'Other']

const rules = {
  name: { required: true, requiredMessage: 'Enter your name.', max: 120 },
  email: { required: true, email: true, requiredMessage: 'Enter your email address.' },
  topic: { required: true, requiredMessage: 'Choose what your enquiry is about.' },
  message: { required: true, requiredMessage: 'Write a short message.', max: 2000 },
}

export function Contact() {
  const form = useForm({
    formType: 'contact',
    rules,
    initial: { name: '', email: '', company: '', topic: '', message: '', company_website: '' },
  })
  const { values, errors, status, onChange, onSubmit, formRef } = form

  return (
    <section id="contact" aria-labelledby="contact-title" className="dark-surface bg-pine-900 py-24 text-paper lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            dark
            id="contact-title"
            eyebrow="Contact"
            title="Talk to JiXora."
            description="Questions about the product, pricing, partnerships or your data — send a message or email us directly."
          />
          <ul data-reveal className="flex flex-col gap-3">
            <li>
              <a href={`mailto:${company.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 p-4 hover:border-white/30">
                <span className="flex size-10 items-center justify-center rounded-xl bg-volt text-ink"><Mail className="size-5" aria-hidden="true" /></span>
                <span>
                  <span className="block text-xs text-pine-300">Email</span>
                  <span className="block font-medium group-hover:text-volt">{company.email}</span>
                </span>
              </a>
            </li>
            {company.linkedinUrl && (
              <li>
                <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 p-4 hover:border-white/30">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-paper"><LinkedInIcon className="size-5" /></span>
                  <span>
                    <span className="block text-xs text-pine-300">LinkedIn</span>
                    <span className="block font-medium group-hover:text-volt">Follow JiXora on LinkedIn</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div data-reveal className="self-start rounded-[1.5rem] bg-paper p-6 text-ink sm:p-8">
          {status === 'success' ? (
            <FormSuccess title="Message sent" onReset={form.reset}>
              Thanks for getting in touch. We’ll reply to {values.email}.
            </FormSuccess>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5" aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="contact-name" name="name" label="Name" required autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
                <FormField id="contact-email" name="email" label="Email" type="email" required autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
                <FormField id="contact-company" name="company" label="Company" autoComplete="organization" value={values.company} onChange={onChange} />
                <FormField id="contact-topic" name="topic" as="select" label="Topic" required options={TOPICS} value={values.topic} onChange={onChange} error={errors.topic} />
              </div>
              <FormField id="contact-message" name="message" as="textarea" label="Message" required value={values.message} onChange={onChange} error={errors.message} />
              <Honeypot id="contact-hp" value={values.company_website} onChange={onChange} />
              <FormAlert status={status} message={form.message} mailSubject={`${values.topic || 'Enquiry'} — ${values.name}`} mailBody={`${values.message}\n\n${values.name}${values.company ? `, ${values.company}` : ''}`} />
              <Button type="submit" size="lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'} className="self-start">
                <SubmitLabel status={status}>
                  Send message <Send className="size-4" aria-hidden="true" />
                </SubmitLabel>
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
