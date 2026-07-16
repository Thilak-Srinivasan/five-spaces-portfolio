import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { Starfield3D } from '../canvas/Starfield3D'
import { useCanvasEffect, prefersReducedMotion } from '../canvas/useCanvasEffect'
import introImg from '../assets/extras/intro-page.jpg'
import fallbackA from '../assets/extras/transcend-1.jpg'
import fallbackB from '../assets/extras/kristin-thilak.jpg'

// preferred hero weave photos — drop hero-1.jpg / hero-2.jpg into src/assets/extras/
// to replace the fallbacks
const heroA = new URL('../assets/extras/hero-1.jpg', import.meta.url).href
const heroB = new URL('../assets/extras/hero-2.jpg', import.meta.url).href

gsap.registerPlugin(SplitText)

// lines carried over from the commonplace wall
const ORBIT_LINES = [
  '“what we want is a little more reality and a little less rhetoric.”',
  '“who are we underneath all the constant consumption and borrowed opinions?”',
  '“you have not met yourself until you have sat alone in silence, without a script written by another.”',
  '“either increase your sacrifice, or limit your desires.”',
  '“everything that kills me makes me feel alive.”',
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

/** photos woven through the hero type, drifting apart as you scroll */
function WeaveImages() {
  const a = useRef<HTMLImageElement>(null)
  const b = useRef<HTMLImageElement>(null)
  const [srcA, setSrcA] = useState(heroA)
  const [srcB, setSrcB] = useState(heroB)
  useEffect(() => {
    if (prefersReducedMotion()) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        if (a.current) a.current.style.transform = `translateY(${y * -0.12}px) rotate(-4deg)`
        if (b.current) b.current.style.transform = `translateY(${y * 0.18}px) rotate(3deg)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <>
      <img
        ref={a}
        src={srcA}
        onError={() => srcA !== fallbackA && setSrcA(fallbackA)}
        alt=""
        aria-hidden
        className="absolute -top-10 right-[-2%] z-0 w-20 rotate-[-4deg] rounded-md border border-[var(--accent)]/30 opacity-75 shadow-[0_18px_50px_-18px_rgba(46,111,255,0.5)] sm:-top-12 sm:w-28 lg:w-40"
      />
      <img
        ref={b}
        src={srcB}
        onError={() => srcB !== fallbackB && setSrcB(fallbackB)}
        alt=""
        aria-hidden
        className="absolute -bottom-2 left-[-4%] z-0 w-16 rotate-[3deg] rounded-md border border-[var(--ink-dim)]/40 opacity-85 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)] sm:w-24 lg:w-32"
      />
    </>
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
        <p className="relative z-10 mb-4 font-mono text-[11px] tracking-[0.4em] text-[#cfd6e4] mix-blend-difference">
          FIVE DIMENSIONS · ONE OBSERVER
        </p>
        <div className="relative">
          <WeaveImages />
          <h1
            ref={nameRef}
          className="relative z-10 overflow-hidden font-grotesk font-bold leading-none tracking-tight text-[#e8ecf4] mix-blend-difference"
          style={{ fontSize: 'clamp(4rem, 14vw, 12rem)' }}
        >
            THILAK S
          </h1>
        </div>
        <p ref={subRef} className="relative z-10 mt-6 font-serif text-lg italic text-[#c3cadb] mix-blend-difference md:text-xl">
          Computational researcher. Poet. Artist. Music aficionado. Geek.
        </p>
        <OrbitingLine />
        <div
          data-tilt
          className="mx-auto mt-8 w-fit overflow-hidden rounded-md border border-[var(--accent)]/40 shadow-[0_0_50px_-10px_rgba(46,111,255,0.45)]"
        >
          <img
            src={introImg}
            alt="Thilak S"
            className="kenburns max-h-56 w-auto max-w-[85vw] object-contain md:max-h-64"
          />
        </div>
      </div>
      <div className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-[var(--ink-dim)]">
        <p className="font-mono text-[10px] tracking-[0.3em]">CHOOSE A DIMENSION</p>
        <span className="block h-8 w-px animate-pulse bg-[var(--accent)]" />
      </div>
    </section>
  )
}
