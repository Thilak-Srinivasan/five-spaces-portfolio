import { useEffect, useRef, useState } from 'react'
import { WindTunnel } from '../../canvas/WindTunnel'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { CountUp } from '../../components/CountUp'
import { GiantMarquee } from '../../components/GiantMarquee'
import { ExternalIcon, GithubIcon } from '../../components/Icons'
import { CERTS, CV_URL, EDUCATION, EXPERIENCE, PROJECTS, PUBLICATION, SKILLS, STATS } from '../../content/engineer'
import type { ProjectTag } from '../../content/engineer'
import researcherImg from '../../assets/extras/researcher.jpg'

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
        <section className="grid min-h-[55vh] items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent)]">DIMENSION 01 · TELEMETRY Δ −0.042</p>
          <h1 data-obstacle className="mt-4 inline-block font-grotesk font-bold leading-[0.95] text-[var(--ink)]" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
            PERFORMANCE,
            <br />
            ENGINEERED.
          </h1>
          <p className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-[var(--ink-dim)]">
            aspiring performance engineer · computational fluid dynamics · aeroacoustics · the kind of person who
            watches an F1 onboard for the telemetry overlay
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="bg-[var(--accent)] px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-[var(--bg)] transition-transform hover:scale-105"
            >
              DOWNLOAD CV ↓
            </a>
            <a
              href="https://github.com/Thilak-Srinivasan"
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className="flex items-center gap-2 border border-[var(--ink-dim)]/40 px-6 py-2.5 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <GithubIcon /> GITHUB
            </a>
          </div>
          </div>

          {/* the natural habitat */}
          <figure data-obstacle data-tilt className="mx-auto w-56 max-w-full md:w-64 lg:w-72">
            <div className="relative border border-[var(--accent)]/35 bg-[var(--bg-soft)]/80 p-1.5 shadow-[0_24px_70px_-24px_rgba(46,111,255,0.45)]">
              {/* corner brackets */}
              <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-[var(--accent)]" aria-hidden />
              <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-[var(--accent)]" aria-hidden />
              <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-[var(--accent)]" aria-hidden />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-[var(--accent)]" aria-hidden />
              <img src={researcherImg} alt="The researcher at his station, solver running" loading="lazy" className="block w-full" />
            </div>
            <figcaption className="mt-2 text-center font-mono text-[9px] tracking-[0.25em] text-[var(--ink-dim)]">
              FIG. 0 — SOLVER RUNNING
            </figcaption>
          </figure>
        </section>

        {/* wrapped-style stat band */}
        <section className="mt-8 grid gap-10 border-y border-[var(--ink-dim)]/20 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-grotesk font-bold leading-none text-[var(--ink)]" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)' }}>
                {s.prefix && <span className="text-[0.5em] text-[var(--accent2)]">{s.prefix}</span>}
                <CountUp value={s.value} decimals={s.decimals} />
                {s.suffix && <span className="text-[0.55em] text-[var(--accent)]">{s.suffix}</span>}
              </p>
              <p className="mx-auto mt-3 max-w-[210px] font-mono text-[11px] leading-relaxed text-[var(--ink-dim)]">{s.label}</p>
            </div>
          ))}
        </section>

        <GiantMarquee text="SIM TO GRID ·" />

        {/* education + current lap */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div data-obstacle className="border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6 backdrop-blur-sm">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]">EDUCATION</p>
            <h2 className="mt-3 font-grotesk text-xl font-bold text-[var(--ink)]">{EDUCATION.degree}</h2>
            <p className="mt-2 text-sm text-[var(--ink-dim)]">
              {EDUCATION.school} · {EDUCATION.years}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--accent)]">{EDUCATION.minor}</p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--ink-dim)]">
              Five years, two degrees, one obsession: the mathematics is not a side quest — it is why the solvers converge.
            </p>
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
                  <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-dim)]">{e.detail}</p>
                  {e.report && (
                    <a href={e.report} target="_blank" rel="noreferrer" data-magnetic className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-[var(--accent)] hover:underline">
                      READ REPORT <ExternalIcon className="!h-3 !w-3" />
                    </a>
                  )}
                </div>
                <span className="ml-auto shrink-0 font-mono text-[11px] text-[var(--ink-dim)]/70">{e.dates}</span>
              </div>
            ))}
          </div>
        </section>

        {/* projects */}
        <section className="mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className="font-grotesk text-3xl font-bold text-[var(--ink)]">THE GRID</h2>
              <p className="mt-2 max-w-md font-mono text-xs leading-relaxed text-[var(--ink-dim)]">
                nine projects, each with the receipts attached — click through to the code or the paper.
              </p>
            </div>
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
                data-tilt
                className="group flex flex-col border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent2)]">{p.tag}</span>
                  {p.metric && <span className="text-right font-mono text-[10px] text-[var(--ink-dim)]">{p.metric}</span>}
                </div>
                <h3 className="mt-3 font-grotesk text-lg font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--accent)]">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-dim)]">{p.blurb}</p>
                <div className="mt-4 flex gap-3 border-t border-[var(--ink-dim)]/15 pt-3">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      data-magnetic
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
                    >
                      <GithubIcon className="!h-3.5 !w-3.5" /> CODE
                    </a>
                  )}
                  {p.paper && (
                    <a
                      href={p.paper}
                      target="_blank"
                      rel="noreferrer"
                      data-magnetic
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--accent)]"
                    >
                      <ExternalIcon className="!h-3.5 !w-3.5" /> PAPER
                    </a>
                  )}
                  {!p.github && !p.paper && (
                    <span className="font-mono text-[10px] tracking-widest text-[var(--ink-dim)]/50">HANDS-ON — NO REPO, ONLY CHIPS</span>
                  )}
                </div>
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
          <a
            href={PUBLICATION.link}
            target="_blank"
            rel="noreferrer"
            data-obstacle
            data-magnetic
            className="group block border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/80 p-6 transition-colors hover:border-[var(--accent)]"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent)]">CONFERENCE PAPER · READ IT</p>
            <h3 className="mt-3 font-grotesk font-bold text-[var(--ink)] group-hover:text-[var(--accent)]">
              {PUBLICATION.title} <ExternalIcon className="ml-1 opacity-50" />
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--ink-dim)]">{PUBLICATION.venue}</p>
          </a>
          <div className="p-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--ink-dim)]">TELEMETRY LOG — VERIFIED</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-dim)]">
              {CERTS.map((c) => (
                <li key={c.label}>
                  <span className="text-[var(--accent)]">▸</span>{' '}
                  {c.link ? (
                    <a href={c.link} target="_blank" rel="noreferrer" data-magnetic className="transition-colors hover:text-[var(--accent)] hover:underline">
                      {c.label}
                    </a>
                  ) : (
                    c.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
