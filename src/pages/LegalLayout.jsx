import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'

export function LegalLayout({ title, updated, intro, sections }) {
  return (
    <article className="container-x py-16 lg:py-24">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
      </Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-[15rem_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-24 flex flex-col gap-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-3 hover:text-ink">{i + 1}. {s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold sm:text-5xl">{title}</h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-3">Last updated {updated}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-2">{intro}</p>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mt-12">
              <h2 className="text-2xl font-semibold">{i + 1}. {s.title}</h2>
              <div className="mt-4 flex flex-col gap-4 leading-relaxed text-ink-2 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:text-ink [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_a]:text-moss [&_a]:underline">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
