import { ArrowUpRight, Sparkles, Users, CalendarCheck, MessageSquareText, TriangleAlert } from 'lucide-react'
import { responseRate } from '../../data/demo.js'
import { StatusPill } from '../ui/StatusPill.jsx'
import { AdherenceChart } from './AdherenceChart.jsx'
import { ActivityFeed } from './ActivityFeed.jsx'

function Stat({ icon: Icon, label, value, sub, tone = 'text-pine-300' }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
      <div className="flex items-center gap-2 text-[0.72rem] text-pine-300">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
      <p className={`mt-0.5 text-[0.7rem] ${tone}`}>{sub}</p>
    </div>
  )
}

export function OverviewView({ state, onOpenMember, onGo }) {
  const active = state.members.filter((m) => m.status !== 'Paused')
  const avg = Math.round(active.reduce((s, m) => s + m.adherence, 0) / active.length)
  const attention = state.members.filter((m) => m.status === 'At risk' || m.status === 'Slipping')
  const sorted = [...attention].sort((a, b) => a.adherence - b.adherence).slice(0, 4)

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat icon={Users} label="Active members" value={active.length} sub={`${state.members.length - active.length} paused`} />
        <Stat icon={CalendarCheck} label="Avg. adherence" value={`${avg}%`} sub="This week, active members" />
        <Stat icon={MessageSquareText} label="Check-in replies" value={`${responseRate.current}%`} sub={`+${responseRate.current - responseRate.previous} pts vs last week`} tone="text-ontrack" />
        <Stat icon={TriangleAlert} label="Need attention" value={attention.length} sub={`${state.queue.length} changes awaiting review`} tone="text-slipping" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <AdherenceChart />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-volt/25 bg-volt/[0.06] p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-volt">
              <Sparkles className="size-4" aria-hidden="true" /> AI insight
            </p>
            <p className="mt-2 text-[0.82rem] leading-relaxed text-pine-200">
              Adherence in this workspace dips in weeks 3–5. Four of the six members flagged today are in that window,
              and three of them cite time or schedule conflicts rather than workout difficulty.
            </p>
            <button
              type="button"
              onClick={() => onGo('review')}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-volt hover:underline"
            >
              Review {state.queue.length} suggested changes <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold">Needs attention</p>
            <ul className="mt-2 flex flex-col">
              {sorted.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => onOpenMember(m.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-1.5 py-2 text-left hover:bg-white/5"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm">{m.name}</span>
                      <span className="block text-[0.7rem] text-pine-300">Day {m.day}/90 · {m.adherence}% adherence</span>
                    </span>
                    <StatusPill status={m.status} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Recent activity</p>
          <button type="button" onClick={() => onGo('activity')} className="text-xs text-pine-300 hover:text-paper">
            View all
          </button>
        </div>
        <ActivityFeed items={state.activity} limit={4} />
      </div>
    </div>
  )
}
