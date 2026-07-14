import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../canvas/useCanvasEffect'
import type { PersonaId } from '../theme/personas'

/**
 * A little doodle that lives at the foot of the page and travels with the
 * scroll — seesaw.website-style. Flips to face the direction of travel,
 * bobs while moving, rests when you rest.
 */
export function ScrollCompanion({ persona }: { persona: PersonaId }) {
  const ref = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current!
    const face = inner.current!
    let raf = 0
    let lastY = window.scrollY
    let facing = 1
    let idleTimer: ReturnType<typeof setTimeout> | null = null

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = Math.max(doc.scrollHeight - innerHeight, 1)
      const p = Math.min(Math.max(window.scrollY / max, 0), 1)
      const w = Math.min(innerWidth * 0.86, innerWidth - 110)
      el.style.transform = `translateX(${8 + p * w}px)`
      const dy = window.scrollY - lastY
      if (Math.abs(dy) > 2) {
        const dir = dy > 0 ? 1 : -1
        if (dir !== facing) {
          facing = dir
          face.style.transform = `scaleX(${facing})`
        }
        el.classList.add('companion-moving')
        if (idleTimer) clearTimeout(idleTimer)
        idleTimer = setTimeout(() => el.classList.remove('companion-moving'), 260)
      }
      lastY = window.scrollY
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      if (idleTimer) clearTimeout(idleTimer)
    }
  }, [])

  if (typeof window !== 'undefined' && prefersReducedMotion()) return null

  return (
    <div ref={ref} className="companion pointer-events-none fixed bottom-2 left-0 z-[65]" aria-hidden>
      <div ref={inner} className="companion-face">
        <Doodle persona={persona} />
      </div>
    </div>
  )
}

function Doodle({ persona }: { persona: PersonaId }) {
  switch (persona) {
    case 'engineer':
      return <RaceCar />
    case 'poet':
      return <PaperBoat />
    case 'artist':
      return <PencilPal />
    case 'audiophile':
      return <CassetteWalker />
    case 'geek':
      return <LilUfo />
  }
}

/* 01 — a doodle F1 car; wheels spin while moving */
function RaceCar() {
  return (
    <svg width="86" height="46" viewBox="0 0 86 46" fill="none" className="companion-bob">
      {/* body */}
      <path
        d="M4 32 L16 32 C18 24 24 20 32 20 L44 20 C50 12 60 12 64 18 L74 20 C80 21 82 26 82 32 L78 32"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* halo + driver */}
      <path d="M46 20 C46 14 56 14 56 20" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="51" cy="17" r="2.6" fill="var(--accent2)" />
      {/* rear wing */}
      <path d="M8 20 L18 20 M13 20 L13 31" stroke="var(--accent2)" strokeWidth="2" strokeLinecap="round" />
      {/* wheels */}
      <g className="companion-wheel" style={{ transformOrigin: '25px 34px' }}>
        <circle cx="25" cy="34" r="8" stroke="var(--ink)" strokeWidth="2" />
        <path d="M25 28 v12 M19 34 h12" stroke="var(--ink)" strokeWidth="1.4" />
      </g>
      <g className="companion-wheel" style={{ transformOrigin: '65px 34px' }}>
        <circle cx="65" cy="34" r="8" stroke="var(--ink)" strokeWidth="2" />
        <path d="M65 28 v12 M59 34 h12" stroke="var(--ink)" strokeWidth="1.4" />
      </g>
      {/* speed lines */}
      <path className="companion-speed" d="M2 16 h8 M0 22 h6" stroke="var(--ink-dim)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* 02 — a paper boat with a tiny pennant, riding a squiggle of water */
function PaperBoat() {
  return (
    <svg width="74" height="52" viewBox="0 0 74 52" fill="none" className="companion-sway">
      <path d="M18 30 L56 30 L48 40 L26 40 Z" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M37 30 L37 12 L52 30 M37 12 L37 8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37 8 L45 11 L37 14 Z" fill="var(--accent2)" />
      {/* eyes on the hull */}
      <circle cx="33" cy="35" r="1.4" fill="var(--ink)" />
      <circle cx="41" cy="35" r="1.4" fill="var(--ink)" />
      {/* water */}
      <path
        d="M4 46 Q10 42 16 46 T28 46 T40 46 T52 46 T64 46 T76 46"
        stroke="var(--ink-dim)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

/* 03 — a pencil with a face, leaving a graphite squiggle */
function PencilPal() {
  return (
    <svg width="84" height="52" viewBox="0 0 84 52" fill="none" className="companion-bob">
      {/* squiggle it draws */}
      <path className="companion-speed" d="M2 44 Q10 38 18 44 T34 44" stroke="var(--ink-dim)" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      {/* pencil body, tilted like it's writing */}
      <g transform="rotate(-32 56 30)">
        <rect x="44" y="18" width="34" height="12" rx="2" stroke="var(--ink)" strokeWidth="2" />
        <path d="M44 18 L36 24 L44 30" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M39.5 21.5 L36 24 L39.5 26.5 Z" fill="var(--ink)" />
        <path d="M78 18 h5 a2 2 0 0 1 0 12 h-5" stroke="var(--accent2)" strokeWidth="2" />
        {/* face */}
        <circle cx="56" cy="22.5" r="1.4" fill="var(--ink)" />
        <circle cx="63" cy="22.5" r="1.4" fill="var(--ink)" />
        <path d="M57 26.5 q2.5 2 5 0" stroke="var(--ink)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* 04 — a cassette on little legs, bouncing to a beat */
function CassetteWalker() {
  return (
    <svg width="76" height="56" viewBox="0 0 76 56" fill="none" className="companion-bounce">
      <rect x="14" y="8" width="48" height="30" rx="4" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="28" cy="23" r="5" stroke="var(--ink)" strokeWidth="1.8" className="companion-wheel" style={{ transformOrigin: '28px 23px' }} />
      <circle cx="48" cy="23" r="5" stroke="var(--ink)" strokeWidth="1.8" className="companion-wheel" style={{ transformOrigin: '48px 23px' }} />
      <path d="M33 23 h10" stroke="var(--ink-dim)" strokeWidth="1.6" />
      {/* face */}
      <circle cx="34" cy="14.5" r="1.3" fill="var(--ink)" />
      <circle cx="42" cy="14.5" r="1.3" fill="var(--ink)" />
      <path d="M35 17.5 q3 2.2 6 0" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
      {/* legs */}
      <path className="companion-leg-l" d="M28 38 L26 48 M26 48 h6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      <path className="companion-leg-r" d="M48 38 L50 48 M50 48 h6" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
      {/* notes */}
      <path className="companion-note" d="M66 14 v-7 l5 -2 v7" stroke="var(--accent2)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="64.5" cy="14" r="2" fill="var(--accent2)" />
      <circle cx="69.5" cy="12" r="2" fill="var(--accent2)" />
    </svg>
  )
}

/* 05 — a lil UFO with one very sincere alien */
function LilUfo() {
  return (
    <svg width="78" height="58" viewBox="0 0 78 58" fill="none" className="companion-hover">
      {/* beam */}
      <path d="M32 34 L24 54 L54 54 L46 34" fill="var(--accent)" opacity="0.12" />
      {/* saucer */}
      <ellipse cx="39" cy="30" rx="24" ry="8" stroke="var(--accent)" strokeWidth="2" />
      <path d="M24 26 C26 16 52 16 54 26" stroke="var(--accent)" strokeWidth="2" />
      {/* alien peeking */}
      <circle cx="39" cy="19" r="5" stroke="var(--accent2)" strokeWidth="1.8" />
      <circle cx="37.4" cy="18.4" r="1.1" fill="var(--accent2)" />
      <circle cx="40.6" cy="18.4" r="1.1" fill="var(--accent2)" />
      <path d="M39 14 L39 10 M39 10 l2.5 -1.5" stroke="var(--accent2)" strokeWidth="1.5" strokeLinecap="round" />
      {/* lights */}
      <circle className="companion-light" cx="27" cy="31" r="1.6" fill="var(--accent2)" />
      <circle className="companion-light" cx="39" cy="33" r="1.6" fill="var(--accent2)" style={{ animationDelay: '0.3s' }} />
      <circle className="companion-light" cx="51" cy="31" r="1.6" fill="var(--accent2)" style={{ animationDelay: '0.6s' }} />
    </svg>
  )
}
