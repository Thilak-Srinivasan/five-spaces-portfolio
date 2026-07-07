import { useEffect, useRef, useState } from 'react'
import { WindTunnel } from '../../canvas/WindTunnel'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { CERTS, EDUCATION, EXPERIENCE, PROJECTS, PUBLICATION, SKILLS } from '../../content/engineer'
import type { ProjectTag } from '../../content/engineer'

const TAGS: Array<ProjectTag | 'ALL'> = ['ALL', 'CFD', 'Thermal', 'AI/ML', 'Robotics', 'Finance', 'Manufacturing']

export function EngineerSpace() {
  const effectRef = useRef<WindTunnel | null>(null)
  const { ref, reduced } = useCanvasEffect(() => {
    const e = new WindTunnel()
    effectRef.current = e
    return e
  })
  const [filter, setFilter] = useState<ProjectTag | 'ALL'>('ALL')

  // feed obstacle rects (viewport coords) to the wind tunnel on scroll/resize
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const update = () => {
      raf = 0
      const rects = Array.from(document.querySelectorAll('[data-obstacle]'))
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < innerHeight)
      effectRef.current?.setBoundaries(rects)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const interval = setInterval(schedule, 800) // catch layout shifts (filtering)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      clearInterval(interval)
      cancelAnimationFrame(raf)
    }
  }, [reduced, filter])

  const projects = filter === 'ALL' ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)

  return (
    <div className="relative">
      {/* fixed wind tunnel behind everything */}
      <div className="fixed inset-0" aria-hidden>
        {reduced ? <div className="canvas-fallback h-full w-full" /> : <canvas ref={ref} className="h-full w-full" />}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        {/* hero */}
        <section className="min-h-[55vh]">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)]">SECTOR 01 · Δ −0.042</p>
          <h1 data-obstacle className="mt-4 inline-block font-grotesk font-bold leading-[0.95] text-[var(--ink)]" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
            I MAKE AIR
            <br />
            BEHAVE.
          </h1>
          <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-[var(--ink-dim)]">
            aspiring performance engineer · computational fluid dynamics · aeroacoustics · the kind of person who
            watches an F1 onboard for the telemetry overlay
          </p>
        </section>

        {/* education */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div data-obstacle className="border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6 backdrop-blur-sm">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]">EDUCATION</p>
            <h2 className="mt-3 font-grotesk text-xl font-bold text-[var(--ink)]">{EDUCATION.degree}</h2>
            <p className="mt-2 text-sm text-[var(--ink-dim)]">
              {EDUCATION.school} · {EDUCATION.years}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--accent)]">{EDUCATION.minor}</p>
          </div>
          <div data-obstacle className="border border-[var(--accent)]/40 bg-[var(--bg-soft)]/80 p-6 backdrop-blur-sm">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">CURRENT LAP</p>
            <h2 className="mt-3 font-grotesk text-xl font-bold text-[var(--ink)]">{EXPERIENCE[0].role}</h2>
            <p className="mt-1 font-mono text-xs text-[var(--accent2)]">{EXPERIENCE[0].org} · {EXPERIENCE[0].dates}</p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-dim)]">{EXPERIENCE[0].detail}</p>
          </div>
        </section>

        <QuoteDivider index={2} />

        {/* experience laps */}
        <section>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]">STINT HISTORY</p>
          <div className="mt-6 space-y-4">
            {EXPERIENCE.slice(1).map((e, i) => (
              <div key={e.org} data-obstacle className="group flex flex-col gap-1 border-l-2 border-[var(--ink-dim)]/30 py-2 pl-5 transition-colors hover:border-[var(--accent)] md:flex-row md:items-baseline md:gap-6">
                <span className="w-16 shrink-0 font-mono text-xs text-[var(--accent)]">LAP {String(i + 2).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-grotesk font-bold text-[var(--ink)]">
                    {e.role} <span className="font-normal text-[var(--ink-dim)]">— {e.org}</span>
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--ink-dim)]">{e.detail}</p>
                </div>
                <span className="ml-auto shrink-0 font-mono text-[11px] text-[var(--ink-dim)]/70">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>

        {/* projects */}
        <section className="mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-grotesk text-3xl font-bold text-[var(--ink)]">THE GRID</h2>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  data-magnetic
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1 font-mono text-[11px] tracking-widest transition-colors ${
                    filter === t
                      ? 'bg-[var(--accent)] text-[var(--bg)]'
                      : 'border border-[var(--ink-dim)]/40 text-[var(--ink-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                data-obstacle
                data-magnetic
                className="group border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent2)]">{p.tag}</span>
                  {p.metric && <span className="font-mono text-[10px] text-[var(--ink-dim)]">{p.metric}</span>}
                </div>
                <h3 className="mt-3 font-grotesk text-lg font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-dim)]">{p.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* skills ticker */}
        <section className="mt-24 overflow-hidden border-y border-[var(--ink-dim)]/20 py-4" aria-label="Skills">
          <div className="animate-marquee flex w-max gap-8 font-mono text-xs tracking-widest text-[var(--ink-dim)]">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i}>
                {s} <span className="text-[var(--accent)]">·</span>
              </span>
            ))}
          </div>
        </section>

        {/* publication + certs */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div data-obstacle className="border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">PUBLISHED</p>
            <h3 className="mt-3 font-grotesk font-bold text-[var(--ink)]">{PUBLICATION.title}</h3>
            <p className="mt-1 font-mono text-xs text-[var(--ink-dim)]">{PUBLICATION.venue}</p>
          </div>
          <div className="p-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]">TELEMETRY LOG</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-dim)]">
              {CERTS.map((c) => (
                <li key={c}>
                  <span className="text-[var(--accent)]">▸</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
