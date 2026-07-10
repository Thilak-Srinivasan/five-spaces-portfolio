import { BaseEffect2D } from './CanvasEffect'

interface Mote {
  u: number // 0..1 position across the beam
  y: number
  r: number
  vy: number
  drift: number
  alpha: number
}

/**
 * A projector beam falling from the top of the frame: dust motes tumbling
 * through the light cone, gentle beam flicker, and the rare film scratch.
 */
export class ProjectorDust extends BaseEffect2D {
  private motes: Mote[] = []
  private t = 0
  private flicker = 1
  private scratchTimer = 3
  private scratchX = 0
  private scratchLife = 0

  protected onResize() {
    const n = Math.floor(this.w / 14)
    this.motes = Array.from({ length: n }, () => this.spawn(true))
  }

  private spawn(anywhere = false): Mote {
    return {
      u: Math.random(),
      y: anywhere ? Math.random() * this.h : -6,
      r: 0.5 + Math.random() * 1.6,
      vy: 8 + Math.random() * 18,
      drift: (Math.random() - 0.5) * 10,
      alpha: 0.08 + Math.random() * 0.2,
    }
  }

  /** beam half-width at a given height */
  private beamHalf(y: number) {
    return this.w * 0.06 + (y / this.h) * this.w * 0.34
  }

  protected tick(dt: number) {
    const { ctx } = this
    this.t += dt
    ctx.clearRect(0, 0, this.w, this.h)

    // beam flicker — slow breathing with tiny jitter
    this.flicker += ((0.9 + Math.sin(this.t * 1.7) * 0.08 + Math.random() * 0.06) - this.flicker) * 0.1
    const cx = this.w / 2

    // the cone of light
    const grad = ctx.createLinearGradient(0, 0, 0, this.h)
    grad.addColorStop(0, `rgba(179, 136, 255, ${0.10 * this.flicker})`)
    grad.addColorStop(0.7, `rgba(179, 136, 255, ${0.028 * this.flicker})`)
    grad.addColorStop(1, 'rgba(179, 136, 255, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.moveTo(cx - this.beamHalf(0), 0)
    ctx.lineTo(cx + this.beamHalf(0), 0)
    ctx.lineTo(cx + this.beamHalf(this.h), this.h)
    ctx.lineTo(cx - this.beamHalf(this.h), this.h)
    ctx.closePath()
    ctx.fill()

    // dust in the beam
    for (let i = 0; i < this.motes.length; i++) {
      const m = this.motes[i]
      m.y += m.vy * dt
      m.u += (m.drift * dt) / this.w
      if (m.y > this.h + 6 || m.u < 0 || m.u > 1) {
        this.motes[i] = this.spawn()
        continue
      }
      const half = this.beamHalf(m.y)
      const x = cx - half + m.u * half * 2
      // brightest near the beam center line
      const centered = 1 - Math.abs(m.u - 0.5) * 2
      ctx.fillStyle = `rgba(220, 205, 255, ${m.alpha * (0.35 + centered * 0.65) * this.flicker})`
      ctx.beginPath()
      ctx.arc(x, m.y, m.r, 0, Math.PI * 2)
      ctx.fill()
    }

    // the rare film scratch — a hairline that blinks through
    this.scratchTimer -= dt
    if (this.scratchTimer <= 0) {
      this.scratchTimer = 4 + Math.random() * 7
      this.scratchX = cx + (Math.random() - 0.5) * this.beamHalf(this.h)
      this.scratchLife = 0.18
    }
    if (this.scratchLife > 0) {
      this.scratchLife -= dt
      ctx.strokeStyle = `rgba(239, 234, 248, ${0.07 * (this.scratchLife / 0.18)})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(this.scratchX, 0)
      ctx.lineTo(this.scratchX + 3, this.h)
      ctx.stroke()
    }
  }
}
