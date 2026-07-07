import { useEffect, useRef, useState } from 'react'
import type { CanvasEffect } from './CanvasEffect'

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Mounts a CanvasEffect on the returned canvas ref.
 * Handles resize, visibility pausing, pointer + scroll-velocity wiring,
 * and reduced-motion (effect not mounted; `reduced` returned so the
 * component can render its static fallback instead).
 */
export function useCanvasEffect(factory: () => CanvasEffect, opts?: { trackPointer?: boolean; trackScroll?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [reduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reduced) return

    const effect = factory()
    effect.mount(canvas)

    const parent = canvas.parentElement ?? canvas
    const doResize = () => {
      const r = parent.getBoundingClientRect()
      effect.resize(r.width, r.height)
    }
    doResize()
    const ro = new ResizeObserver(doResize)
    ro.observe(parent)

    const io = new IntersectionObserver(([e]) => effect.setRunning(e.isIntersecting), { threshold: 0 })
    io.observe(canvas)

    let onMove: ((e: PointerEvent) => void) | null = null
    if (opts?.trackPointer && effect.setPointer) {
      onMove = (e) => {
        const r = canvas.getBoundingClientRect()
        effect.setPointer!(e.clientX - r.left, e.clientY - r.top)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    let onScroll: (() => void) | null = null
    if (opts?.trackScroll && effect.setScrollVelocity) {
      let lastY = window.scrollY
      let lastT = performance.now()
      onScroll = () => {
        const now = performance.now()
        const v = Math.abs(window.scrollY - lastY) / Math.max(now - lastT, 1)
        lastY = window.scrollY
        lastT = now
        effect.setScrollVelocity!(Math.min(v, 5))
      }
      window.addEventListener('scroll', onScroll, { passive: true })
    }

    return () => {
      ro.disconnect()
      io.disconnect()
      if (onMove) window.removeEventListener('pointermove', onMove)
      if (onScroll) window.removeEventListener('scroll', onScroll)
      effect.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return { ref, reduced }
}
