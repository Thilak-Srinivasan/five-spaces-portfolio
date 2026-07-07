import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../canvas/useCanvasEffect'

gsap.registerPlugin(ScrollTrigger)

/** A line that types itself into the whitespace as you scroll into it. */
export function TypeLine({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (prefersReducedMotion()) {
      el.style.opacity = '1'
      return
    }
    const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-ch]'))
    const caret = el.querySelector<HTMLElement>('[data-caret]')
    gsap.set(chars, { opacity: 0 })
    const tween = gsap.to(chars, {
      opacity: 1,
      stagger: 0.6 / Math.max(chars.length, 1),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 78%',
        end: 'top 38%',
        scrub: 0.5,
      },
      onComplete: () => caret && gsap.to(caret, { opacity: 0, duration: 0.5 }),
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text])

  return (
    <p ref={ref} className={className} style={{ opacity: 1 }}>
      {text.split('').map((ch, i) => (
        <span key={i} data-ch>
          {ch}
        </span>
      ))}
      <span data-caret className="ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] animate-pulse bg-[var(--accent)]" aria-hidden />
    </p>
  )
}
