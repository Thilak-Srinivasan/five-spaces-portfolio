import { RainDrift } from '../../canvas/RainDrift'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { ExternalIcon } from '../../components/Icons'
import { BIO, CREDIT, INTERLUDES, OPENING, READING_NOTE } from '../../content/poet'
import { LINKS } from '../../content/links'
import { TypeLine } from './TypeLine'

export function PoetSpace() {
  const { ref, reduced } = useCanvasEffect(() => new RainDrift())

  return (
    <div className="relative">
      <div className="fixed inset-0" aria-hidden>
        {reduced ? <div className="canvas-fallback h-full w-full" /> : <canvas ref={ref} className="h-full w-full" />}
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-6 pb-32 pt-48">
        {/* opening — vast emptiness first */}
        <section className="flex min-h-[60vh] items-center justify-center">
          <TypeLine text={OPENING} className="text-center font-serif text-3xl italic text-[var(--ink)] md:text-4xl" />
        </section>

        {/* bio */}
        <section className="mt-24 space-y-12">
          {BIO.map((para, i) => (
            <p key={i} className="font-serif text-lg leading-[2] text-[var(--ink-dim)] first-letter:text-[var(--ink)]">
              {para}
            </p>
          ))}
        </section>

        <QuoteDivider index={5} />

        {/* interludes — verses typed into whitespace */}
        {INTERLUDES.map((interlude, i) => (
          <section key={i} className="my-[45vh]">
            <div className="space-y-3">
              {interlude.lines.map((line, j) => (
                <TypeLine key={j} text={line} className="font-serif text-xl leading-relaxed text-[var(--ink)] md:text-2xl" />
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]/50">
              № {String(i + 1).padStart(2, '0')}
            </p>
          </section>
        ))}

        <QuoteDivider index={9} />

        {/* credits + links */}
        <section className="mt-24 space-y-8">
          <div className="border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/70 p-8 text-center">
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--accent)]">IN PRINT</p>
            <h2 className="mt-4 font-serif text-2xl italic text-[var(--ink)]">“{CREDIT.title}”</h2>
            <p className="mt-2 font-serif text-sm text-[var(--ink-dim)]">
              {CREDIT.anthology} · {CREDIT.date}
            </p>
            <p className="mt-4 font-serif text-sm italic text-[var(--ink-dim)]/80">{CREDIT.note}</p>
          </div>

          <p className="text-center font-serif text-sm italic leading-relaxed text-[var(--ink-dim)]">{READING_NOTE}</p>

          <div className="flex flex-col items-center gap-3">
            <a
              href={LINKS.instagramPoetry.url}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
            >
              {LINKS.instagramPoetry.label} <ExternalIcon className="opacity-50 group-hover:opacity-100" />
            </a>
            <a
              href={LINKS.substack.url}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
            >
              {LINKS.substack.label} <ExternalIcon className="opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
