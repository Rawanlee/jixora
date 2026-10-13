import { SectionHeading } from '../ui/SectionHeading.jsx'
import { features } from '../../data/content.js'
import { featureVisuals } from './FeatureVisuals.jsx'

const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="bg-paper-2/60 py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="features-title"
            eyebrow="Features"
            title="One platform for the whole 90-day loop."
            description="Each capability covers one step in a member’s program — from the first intake question to the day-90 review — and feeds the next."
          />
          <ol data-reveal className="flex flex-wrap gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-ink-3" aria-label="Workflow stages">
            {['Intake', 'Plan', 'Follow up', 'Adapt', 'Review'].map((s, i) => (
              <li key={s} className="rounded-full border border-line bg-white px-2.5 py-1">{i + 1}. {s}</li>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((f, i) => {
            const Visual = featureVisuals[f.visual]
            return (
              <article
                key={f.id}
                data-reveal
                className={`group flex flex-col gap-5 rounded-card border border-line bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(13_22_19/0.3)] ${spans[i]} ${i === features.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <Visual />
                <div className="flex flex-1 flex-col">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-moss">Stage · {f.stage}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{f.name}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{f.body}</p>
                  <p className="mt-auto border-t border-line pt-3 text-sm font-medium text-ink">
                    <span className="text-moss">Why it matters: </span>
                    {f.benefit}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
