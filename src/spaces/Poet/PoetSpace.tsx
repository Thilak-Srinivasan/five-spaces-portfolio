import { useState } from 'react'
import { RainDrift } from '../../canvas/RainDrift'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { ExternalIcon } from '../../components/Icons'
import { QUOTES } from '../../content/quotes'
import { BIO, CREDIT, INFLUENCES, INTERLUDES, OPENING, READING_NOTE, SHELF, WALL_NOTE, WALL_TITLE } from '../../content/poet'
import { NOTEBOOK_NOTE, NOTEBOOK_TITLE } from '../../content/poems'
import { LINKS } from '../../content/links'
import { TypeLine } from './TypeLine'
import { PoetryNotebook } from './PoetryNotebook'

/** Shelf cover thumbnail; renders nothing until the image file exists. */
function ShelfThumb({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <img
      src={src}
      alt={`Cover — ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-20 w-20 shrink-0 rounded-sm border border-[var(--ink-dim)]/25 object-cover opacity-80 grayscale-[0.4] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:h-24 md:w-24"
    />
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-10 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">
      — {children} —
    </p>
  )
}

export function PoetSpace() {
  const { ref, reduced } = useCanvasEffect(() => new RainDrift())

  return (
    <div className="relative">
      <div className="fixed inset-0" aria-hidden>
        {reduced ? <div className="canvas-fallback h-full w-full" /> : <canvas ref={ref} className="h-full w-full" />}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-32 pt-48">
        {/* opening — vast emptiness first */}
        <section className="flex min-h-[55vh] items-center justify-center">
          <TypeLine text={OPENING} className="text-center font-serif text-3xl italic text-[var(--ink)] md:text-4xl" />
        </section>

        {/* bio */}
        <section className="mx-auto mt-16 max-w-xl space-y-12">
          <SectionLabel>the person</SectionLabel>
          {BIO.map((para, i) => (
            <p key={i} className="font-serif text-lg leading-[2] text-[var(--ink-dim)] first-letter:text-[var(--ink)]">
              {para}
            </p>
          ))}
        </section>

        {/* interludes — verses typed into whitespace */}
        <div className="mt-32">
          <SectionLabel>interludes</SectionLabel>
          {INTERLUDES.map((interlude, i) => (
            <section key={i} className="mx-auto my-[35vh] max-w-xl">
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
        </div>

        {/* the notebook — click the edges, it turns */}
        <section className="mt-24">
          <SectionLabel>{NOTEBOOK_TITLE}</SectionLabel>
          <p className="mx-auto mb-12 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">
            {NOTEBOOK_NOTE}
          </p>
          <PoetryNotebook />
        </section>

        {/* the shelf — curated readings, all linked */}
        <section className="mt-32">
          <SectionLabel>the shelf</SectionLabel>
          <p className="mx-auto mb-12 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">
            {READING_NOTE}
          </p>
          <div className="space-y-4">
            {SHELF.map((piece) => (
              <a
                key={piece.title}
                href={piece.url}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="group block border border-[var(--ink-dim)]/20 bg-[var(--bg-soft)]/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/60"
              >
                <div className="flex items-start gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-xl italic text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                        {piece.title}
                      </h3>
                      <ExternalIcon className="shrink-0 text-[var(--ink-dim)] opacity-40 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.25em] text-[var(--ink-dim)]/70">{piece.source}</p>
                    <p className="mt-4 font-serif text-[17px] leading-relaxed text-[var(--ink)]/90">{piece.line}</p>
                    <p className="mt-2 font-serif text-sm italic leading-relaxed text-[var(--ink-dim)]">{piece.note}</p>
                  </div>
                  <ShelfThumb src={piece.thumb} title={piece.title} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* the commonplace wall — the ten quotes, properly displayed */}
        <section className="mt-32">
          <SectionLabel>{WALL_TITLE}</SectionLabel>
          <p className="mx-auto mb-12 max-w-md text-center font-serif italic text-[var(--ink-dim)]">{WALL_NOTE}</p>
          <div className="columns-1 gap-4 sm:columns-2">
            {QUOTES.map((q, i) => (
              <blockquote
                key={i}
                className="mb-4 break-inside-avoid border-l border-[var(--accent)]/40 bg-[var(--bg-soft)]/50 py-4 pl-5 pr-4 font-serif italic leading-relaxed text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
              >
                “{q}”
                <span className="mt-2 block font-mono text-[9px] not-italic tracking-[0.3em] text-[var(--ink-dim)]/50">
                  № {String(i + 1).padStart(2, '0')}
                </span>
              </blockquote>
            ))}
          </div>
        </section>

        {/* influences */}
        <section className="mt-32">
          <SectionLabel>{INFLUENCES.title}</SectionLabel>
          <div className="space-y-6">
            {INFLUENCES.entries.map((inf) => (
              <div key={inf.name} className="text-center">
                <p className="font-serif text-2xl italic text-[var(--ink)]">{inf.name}</p>
                <p className="mt-1 font-serif text-sm text-[var(--ink-dim)]">{inf.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* credits + links */}
        <section className="mt-32 space-y-8">
          <SectionLabel>in print</SectionLabel>
          <a
            href={CREDIT.link}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="group block border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/70 p-8 text-center transition-colors hover:border-[var(--accent)]"
          >
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--accent)]">PUBLISHED · READ IT</p>
            <h2 className="mt-4 font-serif text-2xl italic text-[var(--ink)] group-hover:text-[var(--accent)]">
              “{CREDIT.title}” <ExternalIcon className="ml-1 opacity-50" />
            </h2>
            <p className="mt-2 font-serif text-sm text-[var(--ink-dim)]">
              {CREDIT.anthology} · {CREDIT.date}
            </p>
            <p className="mt-4 font-serif text-sm italic text-[var(--ink-dim)]/80">{CREDIT.note}</p>
          </a>

          <div className="flex flex-col items-center gap-3">
            <a
              href={LINKS.instagramPoetry.url}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
            >
              instagram · {LINKS.instagramPoetry.label} <ExternalIcon className="opacity-50 group-hover:opacity-100" />
            </a>
            <a
              href={LINKS.substack.url}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
            >
              substack · {LINKS.substack.label} <ExternalIcon className="opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
