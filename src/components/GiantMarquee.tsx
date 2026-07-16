import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../canvas/useCanvasEffect'

interface GiantMarqueeProps {
  text: string
  /** 'outline' = hollow grotesk caps; 'serif' = filled italic serif */
  variant?: 'outline' | 'serif'
  /** drift direction */
  reverse?: boolean
}

/**
 * An oversized text strip drifting sideways between sections; scrolling
 * faster makes it hurry, resting lets it breathe.
 */
export function GiantMarquee({ text, variant = 'outline', reverse = false }: GiantMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const track = trackRef.current!
    let x = 0
    let vel = 0
    let lastY = window.scrollY
    let raf = 0

    const onScroll = () => {
      vel += Math.abs(window.scrollY - lastY) * 0.06
      lastY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const loop = () => {
      vel *= 0.92 // decay the scroll boost
      const speed = (0.6 + Math.min(vel, 14)) * (reverse ? 1 : -1)
      x += speed
      const half = track.scrollWidth / 2
      if (x <= -half) x += half
      if (x >= 0) x -= half
      track.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reverse])

  const chunk = `${text} `
  return (
    <div className="pointer-events-none my-20 overflow-hidden whitespace-nowrap" aria-hidden>
      <div ref={trackRef} className="inline-block will-change-transform">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={
              variant === 'serif'
                ? 'font-serif italic text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-[var(--ink-dim)]/45'
                : 'giant-outline font-grotesk font-bold uppercase leading-none tracking-tight text-[clamp(3.5rem,9vw,7.5rem)]'
            }
          >
            {chunk.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  )
}
