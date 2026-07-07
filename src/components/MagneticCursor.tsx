import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Custom cursor: a dot that tracks instantly + a lagging ring.
 * Variant comes from `data-cursor` on <html>; magnetic pull toward
 * [data-magnetic] elements. Renders nothing on coarse pointers.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = dotRef.current!
    const ring = ringRef.current!
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      let tx = e.clientX
      let ty = e.clientY
      const el = (e.target as HTMLElement | null)?.closest?.('[data-magnetic]') as HTMLElement | null
      if (el) {
        const r = el.getBoundingClientRect()
        const cx = r.x + r.width / 2
        const cy = r.y + r.height / 2
        if (Math.hypot(cx - tx, cy - ty) < 80) {
          tx += (cx - tx) * 0.35
          ty += (cy - ty) * 0.35
        }
        gsap.to(ring, { scale: 1.7, duration: 0.3 })
      } else {
        gsap.to(ring, { scale: 1, duration: 0.3 })
      }
      dotX(tx)
      dotY(ty)
      ringX(tx)
      ringY(ty)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90]"
        aria-hidden
      />
      <style>{`
        .cursor-dot { width: 6px; height: 6px; border-radius: 9999px; background: var(--accent); margin-left: -3px; margin-top: -3px; }
        .cursor-ring { width: 34px; height: 34px; margin-left: -17px; margin-top: -17px; border-radius: 9999px; border: 1px solid color-mix(in srgb, var(--accent) 60%, transparent); }
        html[data-cursor='crosshair-telemetry'] .cursor-ring { border-radius: 0; }
        html[data-cursor='crosshair-telemetry'] .cursor-ring::before,
        html[data-cursor='crosshair-telemetry'] .cursor-ring::after {
          content: ''; position: absolute; background: color-mix(in srgb, var(--accent) 70%, transparent);
        }
        html[data-cursor='crosshair-telemetry'] .cursor-ring::before { left: 50%; top: -6px; bottom: -6px; width: 1px; }
        html[data-cursor='crosshair-telemetry'] .cursor-ring::after { top: 50%; left: -6px; right: -6px; height: 1px; }
        html[data-cursor='ink-dot'] .cursor-ring { border-style: dotted; opacity: .7; }
        html[data-cursor='ink-dot'] .cursor-dot { width: 8px; height: 8px; margin-left: -4px; margin-top: -4px; }
        html[data-cursor='graphite'] .cursor-dot { border-radius: 2px; filter: blur(1px); width: 9px; height: 9px; margin-left: -4px; margin-top: -4px; background: var(--ink); }
        html[data-cursor='graphite'] .cursor-ring { border-radius: 4px; border-color: color-mix(in srgb, var(--ink) 35%, transparent); }
        html[data-cursor='pulse-ring'] .cursor-ring { animation: cursorpulse 1.6s ease-in-out infinite; }
        @keyframes cursorpulse { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent2) 35%, transparent); } 50% { box-shadow: 0 0 0 8px transparent; } }
        @media (prefers-reduced-motion: reduce) { html[data-cursor='pulse-ring'] .cursor-ring { animation: none; } }
      `}</style>
    </>
  )
}
