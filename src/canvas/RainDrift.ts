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

/** Sparse, calm rain grain with occasional slow ripples. Petrichor, rendered. */
export class RainDrift extends BaseEffect2D {
  private streaks: Streak[] = []
  private ripples: Ripple[] = []
  private rippleTimer = 0

  protected onResize() {
    const n = Math.floor(this.w / 26) // very low density
    this.streaks = Array.from({ length: n }, () => this.spawn(true))
  }

  private spawn(anywhere = false): Streak {
    return {
      x: Math.random() * this.w,
      y: anywhere ? Math.random() * this.h : -20,
      speed: 30 + Math.random() * 55,
      len: 8 + Math.random() * 18,
      alpha: 0.04 + Math.random() * 0.1,
    }
  }

  protected tick(dt: number) {
    const { ctx } = this
    ctx.clearRect(0, 0, this.w, this.h)

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
      this.ripples.push({ x: Math.random() * this.w, y: this.h * (0.55 + Math.random() * 0.4), r: 2, alpha: 0.14 })
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
