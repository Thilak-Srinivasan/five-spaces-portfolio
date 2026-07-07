import { BaseEffect2D } from './CanvasEffect'

/**
 * Three layered waveform ribbons; amplitude eases toward a target driven by
 * scroll velocity and pointer proximity to the vertical center.
 */
export class Waveform extends BaseEffect2D {
  private t = 0
  private amp = 0.2
  private targetAmp = 0.2
  private pointerBoost = 0

  setScrollVelocity(v: number) {
    this.targetAmp = 0.2 + Math.min(v * 0.5, 1.2)
  }

  setPointer(_x: number, y: number) {
    const centerDist = Math.abs(y - this.h / 2) / Math.max(this.h / 2, 1)
    this.pointerBoost = (1 - Math.min(centerDist, 1)) * 0.5
  }

  protected tick(dt: number) {
    const { ctx } = this
    ctx.clearRect(0, 0, this.w, this.h)
    this.t += dt
    this.targetAmp = Math.max(this.targetAmp * (1 - 1.2 * dt), 0.2)
    this.amp += (this.targetAmp + this.pointerBoost - this.amp) * 2.5 * dt

    const layers = [
      { color: 'rgba(200, 255, 62, 0.20)', f: 0.9, speed: 0.7, phase: 0 },
      { color: 'rgba(255, 79, 163, 0.16)', f: 1.4, speed: -0.5, phase: 2.1 },
      { color: 'rgba(242, 238, 250, 0.08)', f: 2.2, speed: 1.1, phase: 4.2 },
    ]
    const mid = this.h / 2
    const base = Math.min(this.h * 0.16, 120)

    for (const L of layers) {
      ctx.strokeStyle = L.color
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let x = 0; x <= this.w; x += 5) {
        const u = x / this.w
        const envelope = Math.sin(u * Math.PI) // fade at edges
        const y =
          mid +
          envelope *
            base *
            this.amp *
            (Math.sin(u * Math.PI * 2 * L.f * 2 + this.t * L.speed * 2 + L.phase) +
              0.4 * Math.sin(u * Math.PI * 2 * L.f * 5 + this.t * L.speed * 3.7))
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  }
}
