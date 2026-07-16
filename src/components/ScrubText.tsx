import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../canvas/useCanvasEffect'

gsap.registerPlugin(ScrollTrigger)

/**
 * A paragraph whose words brighten one by one as you scroll through it —
 * the page reads along with you.
 */
export function ScrubText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>('[data-w]').forEach((w) => (w.style.opacity = '1'))
      return
    }
    const words = el.querySelectorAll('[data-w]')
    gsap.set(words, { opacity: 0.22 })
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.6 / Math.max(words.length, 1),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        end: 'bottom 45%',
        scrub: 0.4,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [text])

  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-w className="transition-none">
          {w}{' '}
        </span>
      ))}
    </p>
  )
}
