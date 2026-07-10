import { useState } from 'react'
import { TicketStub, MarginNote } from '../../components/Collage'
import { CINEMA, CINEMA_NOTE, COMING_SOON, GEEK_INTRO } from '../../content/geek'
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

export function GeekSpace() {
  return (
    <div className="relative">
      {/* faint projector-light backdrop */}
      <div
        className="paper-grain fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent), radial-gradient(ellipse 55% 40% at 85% 90%, color-mix(in srgb, var(--accent2) 5%, transparent), transparent)',
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
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-[var(--ink-dim)]">{GEEK_INTRO}</p>
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
              “We used to look up at the sky and wonder at our place in the stars. Now we just look down, and worry about our place in the dirt.”
            </p>
            <cite className="mt-2 block font-mono text-[9px] not-italic tracking-[0.35em] text-[var(--accent)]/70">— INTERSTELLAR</cite>
          </blockquote>
          <span className="h-px flex-1 bg-[var(--ink-dim)] opacity-30" />
        </div>

        {/* room for the next obsessions */}
        <section className="mt-8">
          <p className="mb-8 text-center font-mono text-[10px] tracking-[0.4em] text-[var(--ink-dim)]/70">— NEXT RABBIT HOLES · UNDER EXCAVATION —</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {COMING_SOON.map((label) => (
              <div key={label} className="border border-dashed border-[var(--ink-dim)]/30 p-6 text-center">
                <p className="font-serif italic text-[var(--ink-dim)]">{label}</p>
                <p className="mt-3 font-mono text-[8px] tracking-[0.35em] text-[var(--ink-dim)]/50">REEL LOADING…</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
