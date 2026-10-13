import { useCallback, useMemo, useReducer, useState } from 'react'
import {
  LayoutDashboard,
  Users,
  ListChecks,
  FileText,
  Activity as ActivityIcon,
  Search,
  ChevronDown,
} from 'lucide-react'
import { members as seedMembers, reviewQueue as seedQueue, initialActivity, workspace } from '../../data/demo.js'
import { SampleDataTag } from '../ui/StatusPill.jsx'
import { OverviewView } from './OverviewView.jsx'
import { MembersView } from './MembersView.jsx'
import { ReviewView } from './ReviewView.jsx'
import { ProgramsView } from './ProgramsView.jsx'
import { ActivityFeed } from './ActivityFeed.jsx'
import { MemberDialog } from './MemberDialog.jsx'
import { Toast } from './Toast.jsx'

let activitySeq = 100
const nowLabel = () => {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function reducer(state, action) {
  const log = (kind, text) => [{ id: `a${++activitySeq}`, time: nowLabel(), kind, text }, ...state.activity]
  switch (action.type) {
    case 'nudge': {
      const m = state.members.find((x) => x.id === action.id)
      return {
        ...state,
        members: state.members.map((x) => (x.id === action.id ? { ...x, nudged: true } : x)),
        activity: log('coach', `Nudge sent to ${m.name}: “${action.message}”`),
      }
    }
    case 'togglePause': {
      const m = state.members.find((x) => x.id === action.id)
      const pausing = m.status !== 'Paused'
      return {
        ...state,
        members: state.members.map((x) =>
          x.id === action.id
            ? { ...x, status: pausing ? 'Paused' : x.previousStatus || 'On track', previousStatus: pausing ? x.status : undefined }
            : x,
        ),
        activity: log('coach', `${m.name}’s program was ${pausing ? 'paused — check-ins stop until resumed' : 'resumed — check-ins restart tomorrow'}.`),
      }
    }
    case 'markReviewed': {
      const m = state.members.find((x) => x.id === action.id)
      return {
        ...state,
        members: state.members.map((x) => (x.id === action.id ? { ...x, reviewed: true } : x)),
        activity: log('coach', `${m.name} marked as reviewed by ${workspace.coaches[0]}.`),
      }
    }
    case 'resolveReview': {
      const item = state.queue.find((q) => q.id === action.id)
      const m = state.members.find((x) => x.id === item.memberId)
      const verb = action.decision === 'approve' ? 'Approved' : 'Dismissed'
      return {
        ...state,
        queue: state.queue.filter((q) => q.id !== action.id),
        resolved: [{ ...item, decision: action.decision, note: action.note }, ...state.resolved],
        activity: log(
          action.decision === 'approve' ? 'ai' : 'coach',
          `${verb}: ${item.type.toLowerCase()} for ${m.name}${action.note ? ` — “${action.note}”` : ''}.`,
        ),
      }
    }
    case 'undoReview': {
      const item = state.resolved.find((q) => q.id === action.id)
      const { decision, note, ...rest } = item
      return {
        ...state,
        queue: [rest, ...state.queue],
        resolved: state.resolved.filter((q) => q.id !== action.id),
        activity: log('coach', `Decision undone for ${rest.type.toLowerCase()} — returned to the review queue.`),
      }
    }
    default:
      return state
  }
}

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'review', label: 'Review queue', icon: ListChecks },
  { id: 'programs', label: 'Programs', icon: FileText },
  { id: 'activity', label: 'Activity', icon: ActivityIcon },
]

export function CoachConsole() {
  const [state, dispatch] = useReducer(reducer, {
    members: seedMembers,
    queue: seedQueue,
    resolved: [],
    activity: initialActivity,
  })
  const [view, setView] = useState('overview')
  const [query, setQuery] = useState('')
  const [openMemberId, setOpenMemberId] = useState(null)
  const [toast, setToast] = useState(null)

  const notify = useCallback((message) => setToast({ message, key: Date.now() }), [])

  const act = useCallback(
    (action, message) => {
      dispatch(action)
      if (message) notify(message)
    },
    [notify],
  )

  const openMember = useMemo(() => state.members.find((m) => m.id === openMemberId) ?? null, [state.members, openMemberId])

  const onSearch = (value) => {
    setQuery(value)
    if (value && view !== 'members') setView('members')
  }

  return (
    <div className="dark-surface relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-pine-900 text-paper shadow-[0_40px_80px_-30px_rgb(8_17_14/0.55)]">
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-pine-950/60 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <p className="truncate font-mono text-[0.7rem] text-pine-300">Coach console · {workspace.name}</p>
        <SampleDataTag className="ml-auto" />
      </div>

      <div className="grid min-h-[640px] grid-cols-1 md:grid-cols-[208px_minmax(0,1fr)]">
        {/* Sidebar / workspace navigation */}
        <aside className="border-b border-white/10 bg-pine-950/40 md:border-b-0 md:border-r">
          <div className="hidden items-center gap-2 px-4 pb-2 pt-4 md:flex">
            <span className="flex size-7 items-center justify-center rounded-md bg-moss font-display text-xs font-bold">NS</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{workspace.name}</p>
              <p className="text-[0.7rem] text-pine-300">{workspace.plan} workspace</p>
            </div>
            <ChevronDown className="ml-auto size-4 text-pine-300" aria-hidden="true" />
          </div>
          <nav aria-label="Console sections" className="scrollbar-thin flex gap-1 overflow-x-auto p-2 md:flex-col md:p-3">
            {NAV.map(({ id, label, icon: Icon }) => {
              const active = view === id
              const count = id === 'review' ? state.queue.length : null
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    active ? 'bg-white/10 text-paper' : 'text-pine-300 hover:bg-white/5 hover:text-paper'
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                  {count > 0 && (
                    <span className="ml-auto rounded-full bg-volt px-1.5 text-[0.65rem] font-bold text-ink">{count}</span>
                  )}
                </button>
              )
            })}
          </nav>
          <div className="hidden px-4 pb-4 pt-6 md:block">
            <p className="font-mono text-[0.62rem] uppercase tracking-widest text-pine-300">Coaches</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {workspace.coaches.map((c) => (
                <li key={c} className="flex items-center gap-2 text-xs text-pine-200">
                  <span className="size-1.5 rounded-full bg-ontrack" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div>
              <h3 className="font-display text-lg font-semibold">{NAV.find((n) => n.id === view).label}</h3>
              <p className="text-xs text-pine-300">{workspace.sampleDate} · Week view</p>
            </div>
            <label className="relative ml-auto w-full sm:w-64">
              <span className="sr-only">Search members</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-pine-300" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search members"
                className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-paper placeholder:text-pine-300 focus:border-volt/60 focus:outline-none"
              />
            </label>
          </div>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            {view === 'overview' && (
              <OverviewView state={state} onOpenMember={setOpenMemberId} onGo={setView} />
            )}
            {view === 'members' && (
              <MembersView members={state.members} query={query} setQuery={setQuery} onOpenMember={setOpenMemberId} />
            )}
            {view === 'review' && (
              <ReviewView state={state} act={act} onOpenMember={setOpenMemberId} />
            )}
            {view === 'programs' && <ProgramsView members={state.members} />}
            {view === 'activity' && <ActivityFeed items={state.activity} full />}
          </div>
        </div>
      </div>

      <MemberDialog member={openMember} onClose={() => setOpenMemberId(null)} act={act} queue={state.queue} onGoReview={() => { setOpenMemberId(null); setView('review') }} />
      <Toast toast={toast} onDone={() => setToast(null)} />
    </div>
  )
}
