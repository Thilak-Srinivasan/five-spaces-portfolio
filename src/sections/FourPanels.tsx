import { useRef } from 'react'
import gsap from 'gsap'
import { PERSONAS, PERSONA_ORDER } from '../theme/personas'
import type { PersonaId, PersonaTheme } from '../theme/personas'
import { usePersona } from '../state/PersonaContext'

/** Per-panel cheap CSS teaser. */
function Teaser({ t }: { t: PersonaTheme }) {
  if (t.id === 'engineer') {
    return (
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30" aria-hidden>
        {[...Array(7)].map((_, i) => (
          <span
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${12 + i * 12}%`,
              background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
              animation: `marquee ${5 + i * 1.3}s linear infinite`,
            }}
          />
        ))}
      </div>
    )
  }
  if (t.id === 'poet') {
    return (
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 22px, ${t.accent}22 22px 23px)`,
          backgroundSize: '3px 240px',
          animation: 'grainfall 7s linear infinite',
        }}
      />
    )
  }
  if (t.id === 'artist') {
    return (
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${t.accent}33 0 1px, transparent 1px 7px), repeating-linear-gradient(-45deg, ${t.accent}22 0 1px, transparent 1px 9px)`,
        }}
      />
    )
  }
  if (t.id === 'geek') {
    // drifting film-strip sprockets
    return (
      <div className="absolute inset-x-0 bottom-8 h-24 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-50" aria-hidden>
        {[0, 1].map((row) => (
          <div
            key={row}
            className="absolute left-0 h-3 w-[200%]"
            style={{
              top: row ? '70%' : '15%',
              backgroundImage: `repeating-linear-gradient(90deg, ${t.accent}55 0 9px, transparent 9px 24px)`,
              animation: `wavedrift ${row ? 9 : 6}s linear infinite${row ? ' reverse' : ''}`,
            }}
          />
        ))}
        <div className="absolute inset-x-0 top-[34%] h-[28%] border-y" style={{ borderColor: `${t.accent}33` }} />
      </div>
    )
  }
  // smooth sound waves drifting across the panel foot
  return (
    <div className="absolute inset-x-0 bottom-8 h-28 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-60" aria-hidden>
      <svg
        className="absolute left-0 top-0 h-full"
        style={{ width: '200%', animation: 'wavedrift 7s linear infinite' }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 Q75 22 150 50 T300 50 T450 50 T600 50 T750 50 T900 50 T1050 50 T1200 50"
          fill="none"
          stroke={t.accent}
          strokeWidth="1.5"
          opacity="0.9"
        />
        <path
          d="M0 50 Q75 74 150 50 T300 50 T450 50 T600 50 T750 50 T900 50 T1050 50 T1200 50"
          fill="none"
          stroke={t.accent2}
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>
      <svg
        className="absolute left-0 top-2 h-full"
        style={{ width: '200%', animation: 'wavedrift 11s linear infinite reverse' }}
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 Q75 34 150 50 T300 50 T450 50 T600 50 T750 50 T900 50 T1050 50 T1200 50"
          fill="none"
          stroke={t.accent}
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}

export function FourPanels() {
  const { enter } = usePersona()
  const rootRef = useRef<HTMLDivElement>(null)

  const open = (id: PersonaId, el: HTMLElement) => {
    const t = PERSONAS[id]
    const overlay = document.createElement('div')
    overlay.style.cssText = `position:fixed;inset:0;z-index:79;background:${t.bg};opacity:0;pointer-events:none;`
    document.body.appendChild(overlay)
    const rect = el.getBoundingClientRect()
    gsap
      .timeline({
        onComplete: () => {
          enter(id)
          setTimeout(() => overlay.remove(), 400)
        },
      })
      .to(el, {
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        duration: 0,
      })
      .to(el, { left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 60, duration: 0.55, ease: 'power4.inOut' })
      .to(overlay, { opacity: 1, duration: 0.3 }, '-=0.15')
  }

  return (
    <section ref={rootRef} id="spaces" className="flex h-screen w-full flex-col md:flex-row">
      {PERSONA_ORDER.map((id) => {
        const t = PERSONAS[id]
        return (
          <button
            key={id}
            data-magnetic
            onClick={(e) => open(id, e.currentTarget)}
            className="group relative flex-1 overflow-hidden border-b border-[var(--ink-dim)]/15 text-left transition-[flex-grow] duration-500 ease-out hover:flex-grow-[2.2] md:border-b-0 md:border-r"
            style={{ background: t.bgSoft }}
            aria-label={`Enter ${t.title}`}
          >
            <span
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 120px -60px ${t.accent}` }}
              aria-hidden
            />
            <Teaser t={t} />
            <span className="relative z-10 flex h-full flex-row items-center gap-4 p-6 md:flex-col md:items-start md:justify-between md:p-8">
              <span className="font-mono text-xs tracking-[0.35em]" style={{ color: t.accent }}>
                {t.index}
              </span>
              <span
                className="font-grotesk text-2xl font-bold text-[var(--ink)] md:text-3xl md:[writing-mode:vertical-rl] lg:text-4xl"
                style={{ fontFamily: t.headingFont }}
              >
                {t.title}
              </span>
              <span className="ml-auto font-serif text-sm italic text-[var(--ink-dim)] opacity-0 transition-opacity delay-150 duration-500 group-hover:opacity-100 md:ml-0">
                {t.tagline}
              </span>
            </span>
          </button>
        )
      })}
    </section>
  )
}
