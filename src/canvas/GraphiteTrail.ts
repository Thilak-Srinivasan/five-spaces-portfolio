import { BaseEffect2D } from './CanvasEffect'

interface Smudge {
  x: number
  y: number
  r: number
  life: number
}

/** Charcoal smudge particles trailing the pointer. */
export class GraphiteTrail extends BaseEffect2D {
  private smudges: Smudge[] = []
  private px = -100
  private py = -100

  setPointer(x: number, y: number) {
    const dx = x - this.px
    const dy = y - this.py
    const dist = Math.hypot(dx, dy)
    if (dist > 4 && this.px > -50) {
      const steps = Math.min(Math.floor(dist / 6) + 1, 5)
      for (let i = 0; i < steps; i++) {
        const t = i / steps
        this.smudges.push({
          x: this.px + dx * t + (Math.random() - 0.5) * 5,
          y: this.py + dy * t + (Math.random() - 0.5) * 5,
          r: 1.5 + Math.random() * 3.5,
          life: 0.8,
        })
      }
      if (this.smudges.length > 260) this.smudges.splice(0, this.smudges.length - 260)
    }
    this.px = x
    this.py = y
  }

  protected tick(dt: number) {
    const { ctx } = this
    ctx.clearRect(0, 0, this.w, this.h)
    this.smudges = this.smudges.filter((s) => s.life > 0)
    for (const s of this.smudges) {
      s.life -= dt
      const a = Math.max(s.life / 0.8, 0) * 0.22
      ctx.fillStyle = `rgba(201, 196, 184, ${a})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}
