import { BaseEffect2D } from './CanvasEffect'

interface Mote {
  x: number
  y: number
  r: number
  vy: number
  sway: number
  phase: number
  alpha: number
}

/**
 * Studio air: graphite dust motes drifting slowly upward through a soft
 * top-light, with a few faint hatch strokes ghosting in the depth.
 */
export class CharcoalDust extends BaseEffect2D {
  private motes: Mote[] = []
  private t = 0

  protected onResize() {
    const n = Math.floor((this.w * this.h) / 13000)
    this.motes = Array.from({ length: n }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      r: 0.9 + Math.random() * 2.4,
      vy: -(4 + Math.random() * 9),
      sway: 6 + Math.random() * 14,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.16 + Math.random() * 0.26,
    }))
  }

  protected tick(dt: number) {
    const { ctx } = this
    this.t += dt
    ctx.clearRect(0, 0, this.w, this.h)

    // soft light falling from the upper left — the drawing-desk lamp
    const g = ctx.createRadialGradient(this.w * 0.28, -this.h * 0.1, 0, this.w * 0.28, -this.h * 0.1, this.h * 0.9)
    g.addColorStop(0, 'rgba(201, 196, 184, 0.04)')
    g.addColorStop(1, 'rgba(201, 196, 184, 0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, this.w, this.h)

    for (const m of this.motes) {
      m.y += m.vy * dt
      const x = m.x + Math.sin(this.t * 0.6 + m.phase) * m.sway
      if (m.y < -4) {
        m.y = this.h + 4
        m.x = Math.random() * this.w
      }
      // motes glow slightly brighter inside the lamp light
      const lift = Math.max(0, 1 - Math.hypot(x - this.w * 0.28, m.y) / (this.h * 0.9)) * 0.15
      ctx.fillStyle = `rgba(201, 196, 184, ${m.alpha + lift})`
      ctx.beginPath()
      ctx.arc(x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
