import { useEffect, useRef, useState } from 'react'
import { X, Send, Pause, Play, CheckCheck, Sparkles, MapPin, Target } from 'lucide-react'
import { StatusPill, SampleDataTag } from '../ui/StatusPill.jsx'

const DAYS = ['Mon', 'Wed', 'Fri', 'Sat']

function insightFor(m) {
  if (m.status === 'Paused') return 'Program paused. Check-ins resume automatically when you resume the plan.'
  if (m.status === 'At risk') return `${m.name.split(' ')[0]} has gone quiet. A short, personal message from the coach usually works better than another automated reminder at this point.`
  if (/sore|pain|injur/i.test(m.reply)) return `Pain reported in recent check-ins: “${m.reply}” Progression is held until a coach reviews it. If it continues, recommend ${m.name.split(' ')[0]} sees a physiotherapist or GP.`
  if (m.status === 'Slipping') return `Missed sessions follow a pattern: “${m.reply}” Consider a schedule or session-length change rather than more volume.`
  if (m.adherence >= 90) return `Consistently completing sessions with low reported effort. A candidate for earlier progression.`
  return 'Steady progress. No changes suggested this week.'
}

export function MemberDialog({ member, onClose, act, queue, onGoReview }) {
  const closeRef = useRef(null)
  const lastFocus = useRef(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!member) return
    lastFocus.current = document.activeElement
    setMessage(`Hi ${member.name.split(' ')[0]}, checking in from ${member.coach}. How are you feeling about this week’s sessions?`)
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [member?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!member) return null
  const pending = queue.filter((q) => q.memberId === member.id)
  const firstName = member.name.split(' ')[0]

  return (
    <div className="dark-surface fixed inset-0 z-[60] flex justify-end bg-pine-950/70 text-paper backdrop-blur-[2px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-dialog-title"
        className="animate-rise scrollbar-thin flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-white/10 bg-pine-900 p-5"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-moss font-display font-semibold">
            {member.name.split(' ').map((p) => p[0]).join('')}
          </span>
          <div className="min-w-0 flex-1">
            <h4 id="member-dialog-title" className="font-display text-lg font-semibold">{member.name}</h4>
            <p className="text-xs text-pine-300">{member.programName} · {member.coach}</p>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close member details" className="rounded-full p-1.5 text-pine-300 hover:bg-white/10 hover:text-paper">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusPill status={member.status} />
          <span className="inline-flex items-center gap-1 text-xs text-pine-300"><Target className="size-3.5" aria-hidden="true" />{member.goal}</span>
          <span className="inline-flex items-center gap-1 text-xs text-pine-300"><MapPin className="size-3.5" aria-hidden="true" />{member.location}</span>
          {member.reviewed && <span className="text-xs text-ontrack">Reviewed</span>}
          <SampleDataTag className="ml-auto" />
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-end justify-between">
            <p className="text-xs text-pine-300">90-day program</p>
            <p className="font-mono text-xs">Day {member.day} · Week {member.week}</p>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-label="Program progress" aria-valuemin={0} aria-valuemax={90} aria-valuenow={member.day}>
            <div className="h-full rounded-full bg-volt" style={{ width: `${(member.day / 90) * 100}%` }} />
          </div>
          <p className="mt-4 text-xs text-pine-300">This week’s sessions</p>
          <ul className="mt-2 grid grid-cols-4 gap-2">
            {member.sessions.map((done, i) => (
              <li key={DAYS[i]} className={`rounded-lg border px-2 py-2 text-center text-xs ${done ? 'border-ontrack/30 bg-ontrack/10 text-ontrack' : 'border-white/10 text-pine-300'}`}>
                {DAYS[i]}
                <span className="block text-[0.65rem]">{done ? 'Done' : 'Missed'}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-pine-300">Latest reply · {member.lastCheckIn}</p>
          <p className="mt-1 rounded-lg rounded-tl-sm bg-white/5 px-3 py-2 text-sm">{member.reply}</p>
        </div>

        <div className="mt-4 rounded-xl border border-volt/25 bg-volt/[0.06] p-4">
          <p className="flex items-center gap-2 text-xs font-semibold text-volt"><Sparkles className="size-3.5" aria-hidden="true" />Suggested next step</p>
          <p className="mt-1.5 text-[0.82rem] leading-relaxed text-pine-200">{insightFor(member)}</p>
          {pending.length > 0 && (
            <button type="button" onClick={onGoReview} className="mt-2 text-xs font-semibold text-volt hover:underline">
              {pending.length} drafted change{pending.length > 1 ? 's' : ''} waiting in the review queue →
            </button>
          )}
        </div>

        <form
          className="mt-4 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!message.trim()) return
            act({ type: 'nudge', id: member.id, message: message.trim() }, `Message queued for ${firstName}`)
          }}
        >
          <label htmlFor="nudge" className="text-xs text-pine-300">Message {firstName}</label>
          <textarea
            id="nudge"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={member.status === 'Paused'}
            className="w-full rounded-lg border border-white/10 bg-pine-950/60 p-2.5 text-sm text-paper focus:border-volt/60 focus:outline-none disabled:opacity-50"
          />
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={member.status === 'Paused' || !message.trim()} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-volt px-4 text-xs font-semibold text-ink hover:bg-volt-600 disabled:opacity-50">
              <Send className="size-3.5" aria-hidden="true" /> {member.nudged ? 'Send another' : 'Send message'}
            </button>
            <button
              type="button"
              onClick={() => act({ type: 'togglePause', id: member.id }, member.status === 'Paused' ? `${firstName}’s program resumed` : `${firstName}’s program paused`)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs hover:border-white/40"
            >
              {member.status === 'Paused' ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
              {member.status === 'Paused' ? 'Resume program' : 'Pause program'}
            </button>
            <button
              type="button"
              disabled={member.reviewed}
              onClick={() => act({ type: 'markReviewed', id: member.id }, `${firstName} marked as reviewed`)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs text-pine-300 hover:text-paper disabled:opacity-50"
            >
              <CheckCheck className="size-3.5" aria-hidden="true" /> {member.reviewed ? 'Reviewed' : 'Mark reviewed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
