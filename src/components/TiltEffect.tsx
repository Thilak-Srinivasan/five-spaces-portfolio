import { useEffect } from 'react'
import { prefersReducedMotion } from '../canvas/useCanvasEffect'

/**
 * Delegated 3D tilt: any element with [data-tilt] leans toward the cursor.
 * One listener for the whole app; renders nothing.
 */
export function TiltEffect() {
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return

    const MAX = 7 // degrees

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tilt]') as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.classList.add('tilting')
      el.style.transform = `perspective(800px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-3px)`
    }

    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('[data-tilt]') as HTMLElement | null
      if (!el) return
      const to = e.relatedTarget as HTMLElement | null
      if (to && el.contains(to)) return
      el.style.transform = ''
      el.classList.remove('tilting')
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
    }
  }, [])

  return null
}
