import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../canvas/useCanvasEffect'

gsap.registerPlugin(ScrollTrigger)

interface CountUpProps {
  value: number
  decimals?: number
  approx?: boolean
  locale?: string
}

/** Number that counts up when scrolled into view. */
export function CountUp({ value, decimals = 0, approx, locale = 'en-IN' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current!
    const fmt = (v: number) => v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    if (prefersReducedMotion()) {
      el.textContent = fmt(value)
      return
    }
    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: value,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = fmt(counter.v)
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value, decimals, locale])

  return (
    <span>
      {approx && <span className="mr-1 align-top font-mono text-[0.4em] text-[var(--ink-dim)]">~</span>}
      <span ref={ref}>0</span>
    </span>
  )
}
