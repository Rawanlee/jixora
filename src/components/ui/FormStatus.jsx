import { CircleCheck, TriangleAlert, LoaderCircle } from 'lucide-react'
import { company } from '../../data/site.js'

export function SubmitLabel({ status, children }) {
  return status === 'submitting' ? (
    <>
      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
    </>
  ) : (
    children
  )
}

/** Error / not-configured feedback. Success is rendered by each form. */
export function FormAlert({ status, message, mailSubject, mailBody }) {
  if (status !== 'error' && status !== 'unconfigured') return null
  const href = `mailto:${company.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-atrisk/30 bg-atrisk/5 p-4 text-sm text-ink-2">
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-atrisk" aria-hidden="true" />
      <div>
        <p className="font-semibold text-ink">
          {status === 'unconfigured' ? 'Your message was not sent.' : 'Something went wrong — your message was not sent.'}
        </p>
        <p className="mt-1">
          {status === 'unconfigured' ? 'Online submissions are not available on this deployment yet. ' : `${message} `}
          Please email us directly at{' '}
          <a href={href} className="font-medium text-moss underline underline-offset-2">{company.email}</a>
          {status === 'unconfigured' ? ' — your details are pre-filled in the email.' : ' or try again.'}
        </p>
      </div>
    </div>
  )
}

export function FormSuccess({ title, children, onReset }) {
  return (
    <div role="status" className="flex flex-col items-start gap-3 rounded-2xl border border-ontrack/30 bg-ontrack/5 p-6">
      <CircleCheck className="size-7 text-ontrack" aria-hidden="true" />
      <p className="font-display text-xl font-semibold">{title}</p>
      <p className="text-ink-2">{children}</p>
      <button type="button" onClick={onReset} className="text-sm font-medium text-moss underline underline-offset-2">
        Send another message
      </button>
    </div>
  )
}

export function Honeypot({ id, value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="company_website" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
    </div>
  )
}
