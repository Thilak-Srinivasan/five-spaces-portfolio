import { BaseEffect2D } from './CanvasEffect'

interface Streak {
  x: number
  y: number
  speed: number
  len: number
  alpha: number
}

interface Ripple {
  x: number
  y: number
  r: number
  alpha: number
}

interface Mist {
  x: number
  y: number
  r: number
  vx: number
  alpha: number
}

/** Sparse, calm rain grain with occasional slow ripples and drifting mist. */
export class RainDrift extends BaseEffect2D {
  private streaks: Streak[] = []
  private ripples: Ripple[] = []
  private mists: Mist[] = []
  private rippleTimer = 0

  protected onResize() {
    const n = Math.floor(this.w / 12)
    this.streaks = Array.from({ length: n }, () => this.spawn(true))
    // slow fog banks, barely there
    this.mists = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * this.w,
      y: this.h * (0.15 + i * 0.18),
      r: 220 + Math.random() * 300,
      vx: (Math.random() < 0.5 ? -1 : 1) * (3 + Math.random() * 5),
      alpha: 0.03 + Math.random() * 0.025,
    }))
  }

  private spawn(anywhere = false): Streak {
    return {
      x: Math.random() * this.w,
      y: anywhere ? Math.random() * this.h : -20,
      speed: 40 + Math.random() * 70,
      len: 8 + Math.random() * 18,
      alpha: 0.12 + Math.random() * 0.18,
    }
  }

  protected tick(dt: number) {
    const { ctx } = this
    ctx.clearRect(0, 0, this.w, this.h)

    // mist banks drift sideways, wrapping around
    for (const m of this.mists) {
      m.x += m.vx * dt
      if (m.x - m.r > this.w) m.x = -m.r
      if (m.x + m.r < 0) m.x = this.w + m.r
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r)
      g.addColorStop(0, `rgba(143, 168, 216, ${m.alpha})`)
      g.addColorStop(1, 'rgba(143, 168, 216, 0)')
      ctx.fillStyle = g
      ctx.fillRect(m.x - m.r, m.y - m.r, m.r * 2, m.r * 2)
    }

    for (let i = 0; i < this.streaks.length; i++) {
      const s = this.streaks[i]
      s.y += s.speed * dt
      if (s.y > this.h + 20) this.streaks[i] = this.spawn()
      ctx.strokeStyle = `rgba(143, 168, 216, ${s.alpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x + 1.5, s.y + s.len)
      ctx.stroke()
    }

    this.rippleTimer -= dt
    if (this.rippleTimer <= 0) {
      this.rippleTimer = 2.5 + Math.random() * 4
      this.ripples.push({ x: Math.random() * this.w, y: this.h * (0.55 + Math.random() * 0.4), r: 2, alpha: 0.25 })
    }
    this.ripples = this.ripples.filter((r) => r.alpha > 0.004)
    for (const r of this.ripples) {
      r.r += 18 * dt
      r.alpha *= 1 - 0.6 * dt
      ctx.strokeStyle = `rgba(143, 168, 216, ${r.alpha})`
      ctx.beginPath()
      ctx.ellipse(r.x, r.y, r.r, r.r * 0.32, 0, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
}
