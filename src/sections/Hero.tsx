import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { Starfield3D } from '../canvas/Starfield3D'
import { useCanvasEffect, prefersReducedMotion } from '../canvas/useCanvasEffect'
import introImg from '../assets/extras/intro-page.jpg'

gsap.registerPlugin(SplitText)

const ORBIT_LINES = [
  '“we only attract what we subconsciously believe we are worthy of receiving.”',
  'solves Navier–Stokes by day. loses arguments with metaphors by night.',
  '“oh boy, the paradox of choice.”',
  'fluent in shock waves, ink, graphite, and 76,130 minutes of music.',
  '“no feeling is final.” — not even turbulence.',
]

/** One quiet line at a time, cross-fading beneath the name. */
function OrbitingLine() {
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      gsap.to(ref.current, {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          setIdx((i) => (i + 1) % ORBIT_LINES.length)
          gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        },
      })
    }, 4200)
    return () => clearInterval(id)
  }, [])

  return (
    <p ref={ref} className="mx-auto mt-8 min-h-[3.5rem] max-w-md font-serif text-sm italic leading-relaxed text-[var(--ink-dim)]/80">
      {ORBIT_LINES[idx]}
    </p>
  )
}

export function Hero() {
  const { ref, reduced } = useCanvasEffect(() => new Starfield3D(), { trackPointer: true })
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (reduced) return
    const split = new SplitText(nameRef.current, { type: 'chars' })
    const tl = gsap.timeline()
    tl.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.045,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2,
    }).fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
    return () => {
      tl.kill()
      split.revert()
    }
  }, [reduced])

  return (
    <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <canvas ref={ref} className={`absolute inset-0 ${reduced ? 'hidden' : ''}`} aria-hidden />
      {reduced && <div className="canvas-fallback absolute inset-0" aria-hidden />}
      <div className="relative z-10 px-6 text-center">
        <p className="mb-4 font-mono text-[11px] tracking-[0.4em] text-[var(--ink-dim)]">
          FOUR DIMENSIONS · ONE OBSERVER
        </p>
        <h1
          ref={nameRef}
          className="overflow-hidden font-grotesk font-bold leading-none tracking-tight text-[var(--ink)]"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
        >
          THILAK S
        </h1>
        <p ref={subRef} className="mt-6 font-serif text-lg italic text-[var(--ink-dim)] md:text-xl">
          Computational researcher. Poet. Artist. Music aficionado.
        </p>
        <OrbitingLine />
        <img
          src={introImg}
          alt="Thilak S"
          className="mx-auto mt-8 max-h-56 w-auto max-w-[85vw] rounded-md border border-[var(--accent)]/40 object-contain shadow-[0_0_50px_-10px_rgba(46,111,255,0.45)] md:max-h-64"
        />
      </div>
      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[var(--ink-dim)]">
        <p className="font-mono text-[10px] tracking-[0.3em]">CHOOSE A DIMENSION</p>
        <span className="block h-8 w-px animate-pulse bg-[var(--accent)]" />
      </div>
    </section>
  )
}
