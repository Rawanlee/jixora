import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { programs, STATUSES } from '../../data/demo.js'
import { StatusPill } from '../ui/StatusPill.jsx'

const COLUMNS = [
  { key: 'name', label: 'Member' },
  { key: 'programName', label: 'Program', hideSm: true },
  { key: 'day', label: 'Day', numeric: true },
  { key: 'adherence', label: 'Adherence', numeric: true },
  { key: 'lastCheckIn', label: 'Last check-in', hideSm: true, sortable: false },
  { key: 'status', label: 'Status', sortable: false },
]

export function MembersView({ members, query, setQuery, onOpenMember }) {
  const [status, setStatus] = useState('All')
  const [program, setProgram] = useState('all')
  const [sort, setSort] = useState({ key: 'adherence', dir: 'asc' })

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return members
      .filter((m) => (status === 'All' ? true : m.status === status))
      .filter((m) => (program === 'all' ? true : m.program === program))
      .filter((m) => !q || m.name.toLowerCase().includes(q) || m.programName.toLowerCase().includes(q) || m.coach.toLowerCase().includes(q))
      .sort((a, b) => {
        const av = a[sort.key]
        const bv = b[sort.key]
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
        return sort.dir === 'asc' ? cmp : -cmp
      })
  }, [members, status, program, query, sort])

  const counts = useMemo(() => {
    const c = { All: members.length }
    STATUSES.forEach((s) => (c[s] = members.filter((m) => m.status === s).length))
    return c
  }, [members])

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))

  const filtered = status !== 'All' || program !== 'all' || query

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                status === s ? 'border-volt/50 bg-volt/10 text-volt' : 'border-white/10 text-pine-300 hover:text-paper'
              }`}
            >
              {s} <span className="font-mono opacity-70">{counts[s]}</span>
            </button>
          ))}
        </div>
        <label className="ml-auto">
          <span className="sr-only">Filter by program</span>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="h-8 rounded-lg border border-white/10 bg-pine-850 px-2 text-xs text-paper focus:border-volt/60 focus:outline-none"
          >
            <option value="all">All programs</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="scrollbar-thin overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[460px] text-left text-sm">
          <caption className="sr-only">Members, sortable by column. Select a member to open details.</caption>
          <thead className="bg-white/[0.03] text-[0.7rem] uppercase tracking-wider text-pine-300">
            <tr>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={sort.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                  className={`px-3 py-2.5 font-medium ${c.hideSm ? 'hidden lg:table-cell' : ''}`}
                >
                  {c.sortable === false ? (
                    c.label
                  ) : (
                    <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 uppercase hover:text-paper">
                      {c.label}
                      {sort.key === c.key &&
                        (sort.dir === 'asc' ? <ArrowUp className="size-3" aria-hidden="true" /> : <ArrowDown className="size-3" aria-hidden="true" />)}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-white/5 transition-colors hover:bg-white/[0.04]">
                <td className="px-3 py-2.5">
                  <button type="button" onClick={() => onOpenMember(m.id)} className="text-left font-medium hover:text-volt">
                    {m.name}
                    <span className="block text-[0.7rem] font-normal text-pine-300">{m.coach}</span>
                  </button>
                </td>
                <td className="hidden px-3 py-2.5 text-pine-200 lg:table-cell">{m.programName}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-pine-200">{m.day}/90</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-12 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`block h-full rounded-full ${m.adherence >= 75 ? 'bg-ontrack' : m.adherence >= 50 ? 'bg-slipping' : 'bg-atrisk'}`}
                        style={{ width: `${m.adherence}%` }}
                      />
                    </span>
                    <span className="font-mono text-xs">{m.adherence}%</span>
                  </div>
                </td>
                <td className="hidden px-3 py-2.5 text-xs text-pine-300 lg:table-cell">{m.lastCheckIn}</td>
                <td className="px-3 py-2.5"><StatusPill status={m.status} /></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-10 text-center text-sm text-pine-300">
                  No members match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-pine-300">
        <p>{rows.length} of {members.length} members</p>
        {filtered && (
          <button
            type="button"
            onClick={() => { setStatus('All'); setProgram('all'); setQuery('') }}
            className="inline-flex items-center gap-1 hover:text-paper"
          >
            <X className="size-3" aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
