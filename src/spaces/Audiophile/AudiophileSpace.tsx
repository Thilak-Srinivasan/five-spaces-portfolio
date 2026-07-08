import { useState } from 'react'
import { Waveform } from '../../canvas/Waveform'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { ExternalIcon, SpotifyIcon } from '../../components/Icons'
import { FIRST_DAY, LISTENING_DAY, PERSONALITY, WRAPPED_SHOTS } from '../../content/audiophile'
import { LINKS } from '../../content/links'
import { WrappedTimeline } from './WrappedTimeline'
import { ArtistConstellation } from './ArtistConstellation'
import jojiThilak from '../../assets/extras/joji-thilak.jpg'

function WrappedStrip() {
  const [failed, setFailed] = useState<Set<number>>(new Set())
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
      {WRAPPED_SHOTS.map((shot, i) => (
        <div
          key={i}
          className="w-52 shrink-0 snap-center overflow-hidden rounded-lg border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]"
          style={{ aspectRatio: '9/16' }}
        >
          {failed.has(i) ? (
            <div className="flex h-full items-center justify-center p-4 text-center">
              <p className="font-mono text-[10px] leading-relaxed text-[var(--ink-dim)]">{shot.alt}</p>
            </div>
          ) : (
            <img
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              onError={() => setFailed((f) => new Set(f).add(i))}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}

function FirstDayChip() {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      data-magnetic
      onClick={() => setFlipped((f) => !f)}
      className="border border-[var(--ink-dim)]/30 bg-[var(--bg-soft)]/80 px-5 py-3 font-mono text-xs text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)]"
    >
      {flipped ? (
        <span>
          first stream: <span className="text-[var(--accent)]">{FIRST_DAY.firstStream}</span> · {FIRST_DAY.note}
        </span>
      ) : (
        <span>
          first day on spotify: <span className="text-[var(--accent2)]">{FIRST_DAY.date}</span> — tap
        </span>
      )}
    </button>
  )
}

export function AudiophileSpace() {
  const { ref, reduced } = useCanvasEffect(() => new Waveform(), { trackPointer: true, trackScroll: true })

  return (
    <div className="relative">
      <div className="fixed inset-0" aria-hidden>
        {reduced ? <div className="canvas-fallback h-full w-full" /> : <canvas ref={ref} className="h-full w-full" />}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
        {/* hero */}
        <section className="text-center">
          <p className="font-mono text-[11px] tracking-[0.4em] text-[var(--accent2)]">VOLUME: PERSONALITY</p>
          <h1 className="mt-4 font-grotesk font-bold leading-none text-[var(--ink)]" style={{ fontSize: 'clamp(3.2rem, 10vw, 7rem)' }}>
            DRUNK ON
            <br />
            <span className="text-[var(--accent)]">MUSIC.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md font-serif text-lg italic text-[var(--ink-dim)]">
            heavy listener, casual singer, professional last-song-repeater.
          </p>
        </section>

        {/* the listener, in person */}
        <section className="mt-12 flex justify-center">
          <img
            src={jojiThilak}
            alt="Thilak at a Joji show"
            loading="lazy"
            className="max-h-[420px] w-auto max-w-full rotate-[-1.5deg] rounded-md border border-[var(--ink-dim)]/30 object-contain shadow-[0_20px_60px_-20px_rgba(200,255,62,0.25)]"
          />
        </section>

        {/* wrapped timeline */}
        <section className="mt-16">
          <p className="mb-12 text-center font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">
            THE WRAPPED YEARS
          </p>
          <WrappedTimeline />
        </section>

        <QuoteDivider index={7} />

        {/* biggest listening day — AI report card */}
        <section className="mx-auto max-w-lg">
          <article className="rounded-sm border border-[var(--ink-dim)]/30 bg-[#f0ede4] p-8 text-[#16141a] shadow-[0_0_60px_rgba(200,255,62,0.07)]">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#16141a]/60">● BIGGEST MUSIC LISTENING DAY</p>
            <p className="mt-3 font-grotesk text-2xl font-bold">{LISTENING_DAY.date}</p>
            <h2 className="mt-4 font-grotesk text-xl font-bold leading-snug">{LISTENING_DAY.headline}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#16141a]/80">{LISTENING_DAY.body}</p>
            <p className="mt-4 font-mono text-xs font-bold">{LISTENING_DAY.stats}</p>
            <p className="mt-3 font-mono text-[10px] text-[#16141a]/60">{LISTENING_DAY.filedUnder}</p>
          </article>
        </section>

        {/* personality */}
        <section className="mt-24 text-center">
          <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">LISTENING PERSONALITY</p>
          <h2 className="mt-4 font-grotesk text-4xl font-bold text-[var(--ink)]">{PERSONALITY.name}</h2>
          <p className="mx-auto mt-3 max-w-sm font-serif italic text-[var(--ink-dim)]">{PERSONALITY.line}</p>
          <span className="mt-5 inline-block rounded-full border border-[var(--accent)] px-5 py-1.5 font-mono text-sm font-bold tracking-[0.3em] text-[var(--accent)]">
            + {PERSONALITY.code} +
          </span>
          <p className="mt-2 font-mono text-[10px] text-[var(--ink-dim)]">{PERSONALITY.legend}</p>
        </section>

        {/* constellation */}
        <section className="mt-28">
          <p className="mb-8 text-center font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">
            THE CONSTELLATION · TOP ARTISTS
          </p>
          <ArtistConstellation />
        </section>

        <QuoteDivider index={9} />

        {/* wrapped screenshots strip */}
        <section className="mt-8">
          <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">RECEIPTS — WRAPPED ARCHIVE</p>
          <WrappedStrip />
        </section>

        {/* first day + spotify */}
        <section className="mt-16 flex flex-col items-center gap-6">
          <FirstDayChip />
          <a
            href={LINKS.spotify}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="group flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-3 font-grotesk font-bold text-[var(--bg)] transition-transform hover:scale-105"
          >
            <SpotifyIcon /> follow the sound <ExternalIcon />
          </a>
        </section>
      </div>
    </div>
  )
}
