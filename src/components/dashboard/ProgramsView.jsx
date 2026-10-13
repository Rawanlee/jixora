import { useState } from 'react'
import { FileText, Download, Clock, MapPin } from 'lucide-react'
import { programs, programDocument as doc } from '../../data/demo.js'

export function ProgramsView({ members }) {
  const [selected, setSelected] = useState('strength')
  const program = programs.find((p) => p.id === selected)
  const enrolled = members.filter((m) => m.program === selected)

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,15rem)_1fr]">
      <ul className="flex flex-col gap-2" aria-label="Program templates">
        {programs.map((p) => {
          const count = members.filter((m) => m.program === p.id).length
          return (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={selected === p.id}
                onClick={() => setSelected(p.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  selected === p.id ? 'border-volt/40 bg-volt/[0.06]' : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <span className="block text-sm font-semibold">{p.name}</span>
                <span className="block text-[0.7rem] text-pine-300">{p.focus} · {p.weeks} weeks · {count} members</span>
              </button>
            </li>
          )
        })}
      </ul>

      {selected === 'strength' ? (
        <article className="overflow-hidden rounded-xl border border-white/10 bg-paper text-ink" aria-label="Program document preview">
          <header className="flex flex-wrap items-center gap-3 border-b border-line bg-paper-2 px-4 py-3">
            <FileText className="size-4 text-moss" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{doc.program} — Week {doc.week}, {doc.session}</p>
              <p className="text-[0.7rem] text-ink-3">Personalised for {doc.member} · generated from the program template</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[0.68rem] text-ink-3">
              <Download className="size-3" aria-hidden="true" /> PDF export
            </span>
          </header>
          <div className="p-4">
            <div className="flex flex-wrap gap-3 text-[0.72rem] text-ink-3">
              <span className="inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{doc.duration}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden="true" />{doc.location}</span>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-[0.8rem]">
                <thead className="text-[0.65rem] uppercase tracking-wider text-ink-3">
                  <tr><th className="py-1.5 font-medium">Exercise</th><th className="font-medium">Sets</th><th className="font-medium">Load</th><th className="font-medium">Effort</th><th className="font-medium">Note</th></tr>
                </thead>
                <tbody>
                  {doc.blocks.map((b) => (
                    <tr key={b.name} className="border-t border-line">
                      <td className="py-2 font-medium">{b.name}</td>
                      <td className="font-mono text-xs">{b.sets}</td>
                      <td className="font-mono text-xs">{b.load}</td>
                      <td className="text-xs">{b.rpe}</td>
                      <td className="text-xs text-ink-3">{b.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 rounded-lg bg-moss-50 p-3 text-[0.78rem] leading-relaxed text-ink-2"><span className="font-semibold text-moss">Coach note · </span>{doc.coachNote}</p>
            <p className="mt-2 text-[0.72rem] text-ink-3">{doc.checkIn}</p>
          </div>
        </article>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm font-semibold">{program.name}</p>
          <p className="text-xs text-pine-300">{program.focus} · {program.weeks}-week template · {enrolled.length} members enrolled</p>
          <ol className="mt-4 grid grid-cols-13 gap-1" aria-label="Program weeks">
            {Array.from({ length: program.weeks }, (_, i) => (
              <li key={i} className={`flex h-10 items-end justify-center rounded-md pb-1 font-mono text-[0.6rem] ${i < 2 ? 'bg-moss/40' : i < 6 ? 'bg-moss/60' : i < 10 ? 'bg-moss/80' : 'bg-volt/70 text-ink'}`}>
                {i + 1}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-[0.7rem] text-pine-300">Foundation → build → progression → day-90 review</p>
          <ul className="mt-4 flex flex-col">
            {enrolled.map((m) => (
              <li key={m.id} className="flex justify-between border-t border-white/5 py-2 text-sm">
                <span>{m.name}</span>
                <span className="font-mono text-xs text-pine-300">Week {m.week}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.7rem] text-pine-300">Select Strength Base to preview a generated session document.</p>
        </div>
      )}
    </div>
  )
}
