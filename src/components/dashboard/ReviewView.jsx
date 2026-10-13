import { useState } from 'react'
import { Check, X, Pencil, ShieldAlert, Undo2, Sparkles } from 'lucide-react'

function ReviewCard({ item, member, act, onOpenMember }) {
  const [editing, setEditing] = useState(false)
  const [note, setNote] = useState('')

  const resolve = (decision) =>
    act(
      { type: 'resolveReview', id: item.id, decision, note: note.trim() },
      decision === 'approve' ? `Change approved — ${member.name}’s plan updated` : `Suggestion dismissed for ${member.name}`,
    )

  return (
    <li className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-pine-200">{item.type}</span>
        <button type="button" onClick={() => onOpenMember(member.id)} className="text-xs text-pine-300 hover:text-volt">
          {member.name} · Day {member.day}/90
        </button>
        <span className={`ml-auto text-[0.68rem] ${item.safety ? 'text-slipping' : 'text-pine-300'}`}>Confidence: {item.confidence}</span>
      </div>
      <p className="mt-2.5 text-sm font-semibold leading-snug">{item.title}</p>
      <p className="mt-1.5 flex gap-1.5 text-[0.8rem] leading-relaxed text-pine-300">
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-volt" aria-hidden="true" />
        {item.reason}
      </p>
      <ul className="mt-3 flex flex-col gap-1 border-l border-white/10 pl-3">
        {item.detail.map((d) => (
          <li key={d} className="text-[0.78rem] text-pine-200">{d}</li>
        ))}
      </ul>
      {item.safety && (
        <p className="mt-3 flex gap-2 rounded-lg bg-slipping/10 p-2.5 text-[0.75rem] leading-relaxed text-slipping">
          <ShieldAlert className="size-4 shrink-0" aria-hidden="true" />
          Pain was reported. JiXora never progresses load automatically here — a coach must decide.
        </p>
      )}
      {editing && (
        <label className="mt-3 block">
          <span className="text-xs text-pine-300">Note to attach to this decision</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-white/10 bg-pine-950/60 p-2 text-sm text-paper focus:border-volt/60 focus:outline-none"
            placeholder="e.g. Keep step-ups below knee height"
          />
        </label>
      )}
      <div className="mt-3.5 flex flex-wrap gap-2">
        <button type="button" onClick={() => resolve('approve')} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-volt px-3.5 text-xs font-semibold text-ink hover:bg-volt-600">
          <Check className="size-3.5" aria-hidden="true" /> Approve
        </button>
        <button
          type="button"
          aria-expanded={editing}
          onClick={() => setEditing((v) => !v)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-xs text-paper hover:border-white/40"
        >
          <Pencil className="size-3.5" aria-hidden="true" /> {editing ? 'Hide note' : 'Add note'}
        </button>
        <button type="button" onClick={() => resolve('dismiss')} className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-pine-300 hover:text-paper">
          <X className="size-3.5" aria-hidden="true" /> Dismiss
        </button>
      </div>
    </li>
  )
}

export function ReviewView({ state, act, onOpenMember }) {
  const byId = Object.fromEntries(state.members.map((m) => [m.id, m]))
  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <section aria-label="Pending changes">
        <p className="mb-3 text-xs text-pine-300">
          JiXora drafts plan changes from member replies. Nothing reaches a member until a coach approves it.
        </p>
        {state.queue.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/15 p-10 text-center">
            <Check className="mx-auto size-6 text-volt" aria-hidden="true" />
            <p className="mt-2 text-sm font-semibold">Queue clear</p>
            <p className="text-xs text-pine-300">New suggestions appear here after the next round of check-ins.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {state.queue.map((item) => (
              <ReviewCard key={item.id} item={item} member={byId[item.memberId]} act={act} onOpenMember={onOpenMember} />
            ))}
          </ul>
        )}
      </section>
      <section aria-label="Decisions this session" className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm font-semibold">Decided this session</p>
        {state.resolved.length === 0 ? (
          <p className="mt-2 text-xs text-pine-300">Approved and dismissed changes show here, with undo.</p>
        ) : (
          <ul className="mt-2 flex flex-col">
            {state.resolved.map((r) => (
              <li key={r.id} className="flex items-start gap-2 border-b border-white/5 py-2.5 last:border-0">
                <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${r.decision === 'approve' ? 'bg-ontrack/20 text-ontrack' : 'bg-white/10 text-pine-300'}`}>
                  {r.decision === 'approve' ? <Check className="size-3" aria-hidden="true" /> : <X className="size-3" aria-hidden="true" />}
                </span>
                <p className="min-w-0 flex-1 text-[0.78rem] text-pine-200">
                  <span className="font-medium text-paper">{byId[r.memberId].name}</span> — {r.type}
                  {r.note && <span className="block text-pine-300">Note: {r.note}</span>}
                </p>
                <button
                  type="button"
                  onClick={() => act({ type: 'undoReview', id: r.id }, 'Returned to the review queue')}
                  className="inline-flex items-center gap-1 text-[0.7rem] text-pine-300 hover:text-paper"
                >
                  <Undo2 className="size-3" aria-hidden="true" /> Undo
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
