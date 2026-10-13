import { useState } from 'react'
import { Sparkles, MessageCircle, BellRing, TriangleAlert, UserRound } from 'lucide-react'

const kinds = {
  checkin: { icon: MessageCircle, label: 'Check-in', tone: 'text-ontrack bg-ontrack/15' },
  ai: { icon: Sparkles, label: 'AI', tone: 'text-volt bg-volt/10' },
  system: { icon: BellRing, label: 'System', tone: 'text-pine-200 bg-white/10' },
  alert: { icon: TriangleAlert, label: 'Alert', tone: 'text-atrisk bg-atrisk/15' },
  coach: { icon: UserRound, label: 'Coach', tone: 'text-slipping bg-slipping/15' },
}

export function ActivityFeed({ items, full = false, limit = 5 }) {
  const [filter, setFilter] = useState('all')
  const list = (filter === 'all' ? items : items.filter((i) => i.kind === filter)).slice(0, full ? undefined : limit)

  return (
    <div className="flex flex-col gap-3">
      {full && (
        <div role="group" aria-label="Filter activity" className="flex flex-wrap gap-1.5">
          {['all', ...Object.keys(kinds)].map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={filter === k}
              onClick={() => setFilter(k)}
              className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
                filter === k ? 'border-volt/50 bg-volt/10 text-volt' : 'border-white/10 text-pine-300 hover:text-paper'
              }`}
            >
              {k === 'all' ? 'All' : kinds[k].label}
            </button>
          ))}
        </div>
      )}
      <ol className="flex flex-col">
        {list.map((item) => {
          const k = kinds[item.kind] ?? kinds.system
          const Icon = k.icon
          return (
            <li key={item.id} className="flex gap-3 border-b border-white/5 py-2.5 last:border-0">
              <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md ${k.tone}`}>
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <p className="min-w-0 flex-1 text-[0.8rem] leading-snug text-pine-200">{item.text}</p>
              <time className="shrink-0 font-mono text-[0.68rem] text-pine-300">{item.time}</time>
            </li>
          )
        })}
        {list.length === 0 && <li className="py-6 text-center text-sm text-pine-300">No activity of this type yet.</li>}
      </ol>
    </div>
  )
}
