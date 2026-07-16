import { useEffect, useState } from 'react'
import { Waveform } from '../../canvas/Waveform'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { ExternalIcon, SpotifyIcon } from '../../components/Icons'
import { FIRST_DAY, LISTENING_DAY, PERSONALITY, SILENT_PLAYER_NOTE, SILENT_TRACKS, WRAPPED_SHOTS } from '../../content/audiophile'
import { LINKS } from '../../content/links'
import { TapedNote } from '../../components/Collage'
import { GiantMarquee } from '../../components/GiantMarquee'
import { WrappedTimeline } from './WrappedTimeline'
import { ArtistConstellation } from './ArtistConstellation'
import jojiThilak from '../../assets/extras/joji-thilak.jpg'

function WrappedStrip() {
  const [failed, setFailed] = useState<Set<number>>(new Set())
  // strip is doubled so the leftward loop is seamless; hovering the strip
  // pauses it and the hovered card pops forward
  const doubled = [...WRAPPED_SHOTS, ...WRAPPED_SHOTS]
  return (
    <div className="wrapped-marquee-wrap overflow-hidden py-6">
      <div className="wrapped-marquee flex w-max gap-4">
        {doubled.map((shot, i) => {
          const key = i % WRAPPED_SHOTS.length
          return (
            <div
              key={i}
              aria-hidden={i >= WRAPPED_SHOTS.length}
              className="w-52 shrink-0 overflow-hidden rounded-lg border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)] transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-110 hover:border-[var(--accent)]/60 hover:shadow-[0_18px_50px_-12px_rgba(200,255,62,0.35)]"
              style={{ aspectRatio: '9/16' }}
            >
              {failed.has(key) ? (
                <div className="flex h-full items-center justify-center p-4 text-center">
                  <p className="font-mono text-[10px] leading-relaxed text-[var(--ink-dim)]">{shot.alt}</p>
                </div>
              ) : (
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  onError={() => setFailed((f) => new Set(f).add(key))}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )
        })}
      </div>
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

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const ss = Math.floor(sec % 60)
  return `${m}:${String(ss).padStart(2, '0')}`
}

/** A Spotify-style player that "plays" in silence — the scene breathes, the bar moves. */
function SilentPlayer() {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [shuffle, setShuffle] = useState(false)
  const [repeatOne, setRepeatOne] = useState(false)
  const [elapsed, setElapsed] = useState(74) // start mid-song, like a memory
  const [sceneFailed, setSceneFailed] = useState<Set<number>>(new Set())
  const track = SILENT_TRACKS[idx]

  const nextIndex = (from: number) => {
    if (shuffle) {
      let n = from
      while (n === from) n = Math.floor(Math.random() * SILENT_TRACKS.length)
      return n
    }
    return (from + 1) % SILENT_TRACKS.length
  }

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= track.duration) {
          if (!repeatOne) setIdx((i) => nextIndex(i))
          return 0
        }
        return e + 1
      })
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, track.duration, repeatOne, shuffle])

  const go = (dir: 1 | -1) => {
    setIdx((i) => (dir === 1 ? nextIndex(i) : (i - 1 + SILENT_TRACKS.length) % SILENT_TRACKS.length))
    setElapsed(0)
  }

  const progress = Math.min(elapsed / track.duration, 1) * 100

  return (
    <div className="mx-auto max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--ink-dim)]/30 shadow-[0_24px_70px_-24px_rgba(200,255,62,0.25)]" style={{ aspectRatio: '4/5' }}>
        {/* the scene */}
        {sceneFailed.has(idx) ? (
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 20%, color-mix(in srgb, var(--accent) 14%, transparent), var(--bg-soft))' }} />
        ) : (
          <img
            src={track.scene}
            alt="A quiet scene the song is scoring"
            onError={() => setSceneFailed((f) => new Set(f).add(idx))}
            className={`kenburns absolute inset-0 h-full w-full object-cover ${playing ? '' : 'kenburns-paused'}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" aria-hidden />

        {/* the player */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="truncate font-grotesk text-xl font-bold text-white">{track.title}</p>
          <p className="mt-0.5 font-mono text-[11px] tracking-wider text-white/60">{track.artist}</p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] text-white/50">
            <span>{fmt(elapsed)}</span>
            <span>-{fmt(track.duration - elapsed)}</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-7">
            {/* shuffle */}
            <button
              onClick={() => setShuffle((v) => !v)}
              data-magnetic
              aria-label={shuffle ? 'Shuffle on' : 'Shuffle off'}
              className={`relative transition-all ${shuffle ? 'text-[var(--accent)]' : 'text-white/45 hover:text-white/80'}`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {shuffle && <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)]" />}
            </button>
            <button onClick={() => go(-1)} data-magnetic aria-label="Previous track" className="text-white/85 transition-transform hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M6 5h2v14H6zM20 5v14l-11-7z" /></svg>
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              data-magnetic
              aria-label={playing ? 'Pause' : 'Play'}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden><path d="M7 4v16l13-8z" /></svg>
              )}
            </button>
            <button onClick={() => go(1)} data-magnetic aria-label="Next track" className="text-white/85 transition-transform hover:scale-110">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M16 5h2v14h-2zM4 5v14l11-7z" /></svg>
            </button>
            {/* repeat one */}
            <button
              onClick={() => setRepeatOne((v) => !v)}
              data-magnetic
              aria-label={repeatOne ? 'Repeat one on' : 'Repeat off'}
              className={`relative transition-all ${repeatOne ? 'text-[var(--accent)]' : 'text-white/45 hover:text-white/80'}`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M17 2v4M7 22v-4M21 11a8 8 0 0 0-14-5M3 13a8 8 0 0 0 14 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {repeatOne && (
                <>
                  <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 font-mono text-[7px] font-bold">1</span>
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-hand text-xl text-[var(--ink-dim)]">{SILENT_PLAYER_NOTE}</p>
    </div>
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
          <p className="font-mono text-[11px] tracking-[0.4em] text-[var(--accent2)]">DIMENSION 04 · VOLUME: PERSONALITY</p>
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
          <figure className="relative rotate-[-1.5deg]">
            {/* the record, peeking out of the sleeve */}
            <div
              className="vinyl-disc absolute -right-14 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full sm:block"
              aria-hidden
            >
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#08070b]" />
            </div>
            {/* the sleeve */}
            <div className="relative rounded-sm border border-[var(--ink-dim)]/30 bg-[#111016] p-2 shadow-[0_20px_60px_-20px_rgba(200,255,62,0.25)]">
              <span className="tape z-10" aria-hidden />
              <img
                src={jojiThilak}
                alt="Thilak at a Joji show"
                loading="lazy"
                className="max-h-[400px] w-auto max-w-full rounded-[2px] object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center font-hand text-xl text-[var(--ink-dim)]">
              the night the algorithm finally got it right.
            </figcaption>
          </figure>
        </section>

        {/* wrapped timeline */}
        <section className="mt-16">
          <p className="mb-12 text-center font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">
            THE WRAPPED YEARS
          </p>
          <WrappedTimeline />
          <div className="mt-16">
            <TapedNote tilt={-1.2}>
              small talk optional — press shuffle on my library instead. everything you’d ask is already in there.
            </TapedNote>
          </div>
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

        <GiantMarquee text="ON REPEAT ·" reverse />

        {/* constellation */}
        <section className="mt-12">
          <p className="mb-8 text-center font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">
            THE CONSTELLATION · TOP ARTISTS
          </p>
          <ArtistConstellation />
        </section>

        {/* the silent player */}
        <section className="mt-24">
          <p className="mb-8 text-center font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">
            NOW PLAYING
          </p>
          <SilentPlayer />
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
