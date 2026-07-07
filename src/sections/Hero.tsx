import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { Starfield3D } from '../canvas/Starfield3D'
import { useCanvasEffect } from '../canvas/useCanvasEffect'

gsap.registerPlugin(SplitText)

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
    }).from(subRef.current, { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out' }, '-=0.5')
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
          EXPLORING THE EXISTENCE OF LIFE AND EARTH — HAPPILY
        </p>
        <h1
          ref={nameRef}
          className="overflow-hidden font-grotesk font-bold leading-none tracking-tight text-[var(--ink)]"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
        >
          THILAK S
        </h1>
        <p ref={subRef} className="mt-6 font-serif text-lg italic text-[var(--ink-dim)] md:text-xl">
          Computational researcher. Poet. Artist. Drunk on music.
        </p>
      </div>
      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[var(--ink-dim)]">
        <p className="font-mono text-[10px] tracking-[0.3em]">CHOOSE A DIMENSION</p>
        <span className="block h-8 w-px animate-pulse bg-[var(--accent)]" />
      </div>
    </section>
  )
}
