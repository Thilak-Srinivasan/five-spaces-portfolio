import { BaseEffect2D } from './CanvasEffect'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Wind-tunnel streamlines: particles stream left→right and deflect around
 * boundary rects (the section's cards/headings). Velocity-colored; a red
 * recirculation tint appears in the wake band behind each obstacle.
 */
export class WindTunnel extends BaseEffect2D {
  private particles: Particle[] = []
  private boundaries: DOMRect[] = []
  private readonly U0 = 90 // free-stream px/s
  private readonly N = 700

  setBoundaries(rects: DOMRect[]) {
    this.boundaries = rects
  }

  protected onResize() {
    this.particles = Array.from({ length: this.N }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: this.U0 * (0.7 + Math.random() * 0.6),
      vy: 0,
    }))
  }

  protected tick(dt: number) {
    const { ctx } = this
    ctx.fillStyle = 'rgba(7, 8, 12, 0.28)'
    ctx.fillRect(0, 0, this.w, this.h)

    const pad = 30
    for (const p of this.particles) {
      // relax toward free stream
      p.vx += (this.U0 * 1.1 - p.vx) * 0.8 * dt
      p.vy += -p.vy * 0.8 * dt

      let inWake = false
      for (const b of this.boundaries) {
        const bx = b.x - pad
        const by = b.y - pad
        const bw = b.width + pad * 2
        const bh = b.height + pad * 2
        const cx = bx + bw / 2
        const cy = by + bh / 2

        // influence zone: expanded rect
        const zone = 70
        if (p.x > bx - zone && p.x < bx + bw + zone && p.y > by - zone && p.y < by + bh + zone) {
          // nearest point on the padded rect
          const nx = Math.max(bx, Math.min(p.x, bx + bw))
          const ny = Math.max(by, Math.min(p.y, by + bh))
          let dx = p.x - nx
          let dy = p.y - ny
          let d = Math.hypot(dx, dy)
          if (d < 1) {
            // inside: push out along vector from center
            dx = p.x - cx
            dy = p.y - cy
            d = Math.hypot(dx, dy) || 1
          }
          const inv = 1 / d
          const strength = 5200 / (d * d + 40)
          p.vx += dx * inv * strength * dt * 60
          p.vy += dy * inv * strength * dt * 60
          // tangential slip: encourage flow around, biased by which side of center
          const side = p.y < cy ? -1 : 1
          p.vy += side * (900 / (d + 12)) * dt * 60 * 0.15
        }
        // wake band behind obstacle
        if (p.x > bx + bw && p.x < bx + bw + 90 && p.y > by && p.y < by + bh) inWake = true
      }

      const speed = Math.hypot(p.vx, p.vy)
      const max = this.U0 * 2.4
      if (speed > max) {
        p.vx = (p.vx / speed) * max
        p.vy = (p.vy / speed) * max
      }

      const px = p.x
      const py = p.y
      p.x += p.vx * dt
      p.y += p.vy * dt

      if (p.x > this.w + 4 || p.y < -4 || p.y > this.h + 4) {
        p.x = -2
        p.y = Math.random() * this.h
        p.vx = this.U0 * (0.7 + Math.random() * 0.6)
        p.vy = 0
        continue
      }

      // color by speed (slow deep blue → fast bright blue), red tint in wake
      const t = Math.min(speed / max, 1)
      const alpha = 0.25 + t * 0.5
      ctx.strokeStyle = inWake
        ? `rgba(255, 42, 60, ${alpha * 0.8})`
        : `rgba(${Math.round(46 + t * 100)}, ${Math.round(80 + t * 88)}, 255, ${alpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(px, py)
      ctx.lineTo(p.x, p.y)
      ctx.stroke()
    }
  }
}
