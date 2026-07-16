import { useState } from 'react'
import { ProjectorDust } from '../../canvas/ProjectorDust'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { TicketStub, MarginNote, TapedNote } from '../../components/Collage'
import { ExternalIcon } from '../../components/Icons'
import { GiantMarquee } from '../../components/GiantMarquee'
import { ScrubText } from '../../components/ScrubText'
import { CINEMA, CINEMA_NOTE, CORKBOARD_NOTE, FIELD_NOTES, FIELD_NOTES_INTRO, GEEK_INTRO, PADDOCK, PAPERS, PAPERS_INTRO, THEORIES } from '../../content/geek'
import type { CinemaEntry } from '../../content/geek'

const KIND_COLOR: Record<CinemaEntry['kind'], string> = {
  film: 'var(--accent)',
  series: 'var(--accent2)',
  anime: '#37f5c8',
}

/** One frame of the film strip. */
function Frame({ entry, active, onSelect }: { entry: CinemaEntry; active: boolean; onSelect: () => void }) {
  const [failed, setFailed] = useState(false)
  return (
    <button
      onClick={onSelect}
      data-magnetic
      className={`group w-32 shrink-0 snap-center text-left transition-transform duration-300 md:w-36 ${
        active ? '-translate-y-1.5' : 'hover:-translate-y-1'
      }`}
      aria-label={`Show ${entry.title} on the projector`}
    >
      <div
        className={`overflow-hidden border bg-[var(--bg-soft)] transition-colors ${
          active ? 'border-[var(--accent)]' : 'border-[var(--ink-dim)]/25 group-hover:border-[var(--ink-dim)]/60'
        }`}
        style={{ aspectRatio: '2/3' }}
      >
        {failed || !entry.poster ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center" style={{ background: 'radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 10%, transparent), transparent)' }}>
            <span className="font-grotesk text-xl font-bold leading-tight text-[var(--ink-dim)]">{entry.title}</span>
            <span className="font-mono text-[8px] tracking-[0.3em] text-[var(--ink-dim)]/60">POSTER PENDING</span>
          </div>
        ) : (
          <img
            src={entry.poster}
            alt={`${entry.title} poster`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <p className={`mt-2 truncate font-mono text-[10px] tracking-wider ${active ? 'text-[var(--accent)]' : 'text-[var(--ink-dim)]'}`}>
        {entry.title.toUpperCase()}
      </p>
      <p className="font-mono text-[8px] tracking-[0.3em]" style={{ color: KIND_COLOR[entry.kind] }}>
        {entry.kind.toUpperCase()}
      </p>
    </button>
  )
}

/** Sprocket-hole bar for the film strip. */
function Sprockets() {
  return (
    <div
      className="h-4 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, color-mix(in srgb, var(--ink-dim) 45%, transparent) 0 10px, transparent 10px 26px)',
        maskImage: 'linear-gradient(180deg, transparent 0 3px, black 3px 13px, transparent 13px)',
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0 3px, black 3px 13px, transparent 13px)',
      }}
      aria-hidden
    />
  )
}

function Projector() {
  const [idx, setIdx] = useState(0)
  const [posterFailed, setPosterFailed] = useState<Set<number>>(new Set())
  const entry = CINEMA[idx]

  return (
    <div>
      {/* NOW SHOWING board */}
      <div className="mx-auto max-w-2xl border border-[var(--ink-dim)]/30 bg-[#0d0a13] p-1">
        <div className="border border-[var(--ink-dim)]/20 px-6 py-8 md:px-10" style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 0%, color-mix(in srgb, var(--accent) 7%, transparent), transparent)' }}>
          <p className="text-center font-mono text-[10px] tracking-[0.5em] text-[var(--accent)]">● NOW SHOWING ●</p>
          <div className="mt-6 flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="w-28 shrink-0 overflow-hidden border border-[var(--ink-dim)]/30" style={{ aspectRatio: '2/3' }}>
              {posterFailed.has(idx) || !entry.poster ? (
                <div className="flex h-full items-center justify-center p-2 text-center font-grotesk text-sm font-bold text-[var(--ink-dim)]">
                  {entry.title}
                </div>
              ) : (
                <img
                  src={entry.poster}
                  alt={`${entry.title} poster`}
                  onError={() => setPosterFailed((f) => new Set(f).add(idx))}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="font-mono text-[9px] tracking-[0.35em]" style={{ color: KIND_COLOR[entry.kind] }}>
                {entry.kind.toUpperCase()} · REEL {String(idx + 1).padStart(2, '0')}/{CINEMA.length}
              </p>
              <h3 className="mt-2 font-grotesk text-2xl font-bold text-[var(--ink)] md:text-3xl">{entry.title}</h3>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-[var(--ink-dim)]">{entry.line}</p>
            </div>
          </div>
        </div>
      </div>

      {/* two counter-rotating reels — hover pauses, click projects */}
      <div className="mt-10 bg-[#0d0a13]/80 py-1">
        <Sprockets />
        {[0, 1].map((row) => {
          const items = CINEMA.filter((_, i) => i % 2 === row)
          const doubled = [...items, ...items]
          return (
            <div key={row} className="film-row-wrap overflow-hidden py-3">
              <div
                className="film-row flex w-max gap-4 px-4"
                style={{ animationDuration: row ? '80s' : '65s', animationDirection: row ? 'reverse' : 'normal' }}
              >
                {doubled.map((e, i) => (
                  <Frame
                    key={`${e.slug}-${i}`}
                    entry={e}
                    active={CINEMA[idx].slug === e.slug}
                    onSelect={() => setIdx(CINEMA.findIndex((c) => c.slug === e.slug))}
                  />
                ))}
              </div>
            </div>
          )
        })}
        <Sprockets />
      </div>
      <p className="mt-3 text-center font-mono text-[9px] tracking-[0.3em] text-[var(--ink-dim)]/50">
        THE REELS DRIFT — HOVER TO PAUSE · CLICK TO PROJECT
      </p>
    </div>
  )
}

/** Fig. slot for a fake paper — hidden until the image file exists. */
function PaperFig({ src, n }: { src?: string; n: number }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <figure className="w-24 shrink-0 md:w-28">
      <img
        src={src}
        alt={`Figure ${n}`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-sm border border-[var(--ink-dim)]/30 object-cover"
      />
      <figcaption className="mt-1 text-center font-mono text-[8px] tracking-[0.25em] text-[var(--ink-dim)]/60">FIG. {n}</figcaption>
    </figure>
  )
}

/** Paddock photo — polaroid-taped, hidden until paddock.jpg exists. */
function PaddockImage() {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="relative w-full max-w-[260px] shrink-0 -rotate-2 bg-[#efe9dc] p-2 pb-6 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)]">
      <span className="tape" aria-hidden />
      <img
        src={PADDOCK.image}
        alt="Formula 1 paddock"
        loading="lazy"
        onError={() => setFailed(true)}
        className="block w-full object-cover"
      />
      <p className="absolute bottom-1 left-0 right-0 text-center font-hand text-base text-[#5c5346]">one day, the pit wall.</p>
    </div>
  )
}

export function GeekSpace() {
  const { ref, reduced } = useCanvasEffect(() => new ProjectorDust())

  return (
    <div className="relative">
      {/* projector beam + dust */}
      <div className="fixed inset-0" aria-hidden>
        {reduced ? (
          <div
            className="canvas-fallback h-full w-full"
            style={{
              background:
                'radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent)',
            }}
          />
        ) : (
          <canvas ref={ref} className="h-full w-full" />
        )}
      </div>
      <div
        className="paper-grain pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 40% at 85% 90%, color-mix(in srgb, var(--accent2) 5%, transparent), transparent)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* hero */}
        <section className="text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] text-[var(--accent)]">DIMENSION 05 · ARCHIVE OF OBSESSIONS</p>
          <h1 className="mt-4 font-grotesk font-bold leading-none text-[var(--ink)]" style={{ fontSize: 'clamp(3rem, 9vw, 6.5rem)' }}>
            THE GEEK.
          </h1>
          <ScrubText text={GEEK_INTRO} className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-[var(--ink)]" />
          <div className="mt-10">
            <TicketStub top="CINEMA · NO REFUNDS" main="ADMIT ONE" sub="to every universe i refuse to leave quietly" />
          </div>
        </section>

        {/* cinema — the projector room */}
        <section className="mt-24">
          <p className="mb-3 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">— THE PROJECTOR ROOM —</p>
          <p className="mx-auto mb-10 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">{CINEMA_NOTE}</p>
          <Projector />
          <MarginNote className="mx-auto mt-8 w-fit">
            each of these rewired something. a few rewired the whole timeline.
          </MarginNote>
        </section>

        {/* cinema-quote divider */}
        <div className="mx-auto my-28 flex max-w-2xl items-center gap-6 px-6">
          <span className="h-px flex-1 bg-[var(--ink-dim)] opacity-30" />
          <blockquote className="max-w-md text-center">
            <p className="font-serif text-lg italic leading-relaxed text-[var(--ink-dim)]">
              “We’ve always defined ourselves by the ability to overcome the impossible. Perhaps we’ve just forgotten that we are still pioneers.”
            </p>
            <cite className="mt-2 block font-mono text-[9px] not-italic tracking-[0.35em] text-[var(--accent)]/70">— INTERSTELLAR</cite>
          </blockquote>
          <span className="h-px flex-1 bg-[var(--ink-dim)] opacity-30" />
        </div>

        <GiantMarquee text="WHAT IF · WHY NOT ·" />

        {/* rabbit hole 2 — the corkboard */}
        <section className="relative mt-2">
          <p className="mb-3 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">— THE CORKBOARD · THEORIES & PARADOXES —</p>
          <p className="mx-auto mb-12 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">{CORKBOARD_NOTE}</p>
          {/* the red string, meandering behind the pins */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-24 h-[calc(100%-6rem)] w-full opacity-25"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <path
              d="M8 6 C 30 18, 70 2, 92 14 S 60 38, 30 32 S 10 60, 50 58 S 90 52, 88 74 S 40 92, 12 86"
              fill="none"
              stroke="var(--accent2)"
              strokeWidth="0.35"
            />
          </svg>
          <div className="relative grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {THEORIES.map((th, i) => (
              <a
                key={th.title}
                href={th.url}
                target="_blank"
                rel="noreferrer"
                data-magnetic
                data-tilt
                className="group relative block border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/90 p-5 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
                style={{ transform: `rotate(${((i % 5) - 2) * 0.9}deg)` }}
              >
                {/* the pin */}
                <span
                  className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-black/40 shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  style={{ background: 'var(--accent2)' }}
                  aria-hidden
                />
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-grotesk font-bold leading-snug text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                    {th.title}
                  </h3>
                  <span className="shrink-0 border border-[var(--accent2)]/50 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-[var(--accent2)]/90">
                    {th.tag}
                  </span>
                </div>
                <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-[var(--ink-dim)]">{th.line}</p>
                <p className="mt-3 font-mono text-[8px] tracking-[0.3em] text-[var(--ink-dim)]/0 transition-colors group-hover:text-[var(--accent)]/80">
                  FOLLOW THE STRING ↗
                </p>
              </a>
            ))}
          </div>
          <MarginNote className="mx-auto mt-8 w-fit">the string connects everything. that’s the whole theory.</MarginNote>
        </section>

        {/* rabbit hole 3 — field notes on being a person */}
        <section className="mt-28">
          <p className="mb-3 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">— FIELD NOTES ON BEING A PERSON —</p>
          <p className="mx-auto mb-12 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">{FIELD_NOTES_INTRO}</p>
          <div className="grid items-start gap-5 sm:grid-cols-2">
            {FIELD_NOTES.map((note, i) => (
              <div key={i} className="group relative bg-[#14101c] px-6 py-6 shadow-[0_10px_28px_-12px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:bg-[#1a1426]" style={{ transform: `rotate(${((i % 3) - 1) * 0.8}deg)` }}>
                <span className="tape" aria-hidden />
                <p className="font-mono text-[8px] tracking-[0.35em] text-[var(--ink-dim)]/50">FIELD NOTE № {String(i + 1).padStart(2, '0')}</p>
                <p className="mt-3 font-hand text-xl leading-relaxed text-[#e6e0f0]/70 transition-colors duration-300 group-hover:text-[#f2eefa]">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* rabbit hole 4 — papers i'll never write */}
        <section className="mt-28">
          <p className="mb-3 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">— PAPERS I’LL NEVER WRITE —</p>
          <p className="mx-auto mb-10 max-w-md text-center font-serif italic leading-relaxed text-[var(--ink-dim)]">{PAPERS_INTRO}</p>
          <div className="mx-auto max-w-2xl space-y-3">
            {PAPERS.map((paper, i) => (
              <article key={paper.id} className="border border-[var(--ink-dim)]/20 bg-[var(--bg-soft)]/70 p-5 transition-colors hover:border-[var(--accent)]/50">
                <div className="flex items-start gap-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] tracking-[0.25em] text-[var(--accent)]/80">{paper.id} · [rejected]</p>
                    <h3 className="mt-1.5 font-serif text-lg italic text-[var(--ink)]">{paper.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">
                      <span className="font-mono text-[10px] tracking-widest text-[var(--ink-dim)]/60">ABSTRACT — </span>
                      {paper.abstract}
                    </p>
                    {paper.basedOn && (
                      <a
                        href={paper.basedOn.url}
                        target="_blank"
                        rel="noreferrer"
                        data-magnetic
                        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] text-[var(--ink-dim)]/60 transition-colors hover:text-[var(--accent)]"
                      >
                        BASED ON REAL PHYSICS: {paper.basedOn.label} <ExternalIcon className="!h-3 !w-3" />
                      </a>
                    )}
                  </div>
                  <PaperFig src={paper.fig} n={i + 1} />
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* the paddock — home race of all the obsessions */}
        <section className="mt-28">
          <p className="mb-8 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--accent2)]">— {PADDOCK.label} —</p>
          <div className="mx-auto max-w-3xl border border-[var(--accent2)]/40 bg-[var(--bg-soft)]/90 p-8 md:p-10">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
              <PaddockImage />
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-grotesk text-3xl font-bold text-[var(--ink)] md:text-4xl">
                  {PADDOCK.headline}
                  <span className="text-[var(--accent2)]">.</span>
                </h3>
                <p className="mt-4 font-serif text-[17px] italic leading-relaxed text-[var(--ink-dim)]">{PADDOCK.body}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-2.5 md:justify-start">
                  {PADDOCK.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      data-magnetic
                      className="inline-flex items-center gap-1.5 border border-[var(--accent2)]/50 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-[var(--accent2)] transition-colors hover:bg-[var(--accent2)] hover:text-[var(--bg)]"
                    >
                      {l.label} <ExternalIcon className="!h-3 !w-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* sign-off */}
        <section className="mt-24">
          <TapedNote tilt={-1}>
            every rabbit hole here is still open. that’s not a warning — it’s an invitation.
          </TapedNote>
        </section>
      </div>
    </div>
  )
}
