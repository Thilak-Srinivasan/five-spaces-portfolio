export interface CanvasEffect {
  mount(canvas: HTMLCanvasElement): void
  resize(w: number, h: number): void
  destroy(): void
  setRunning(running: boolean): void
  setPointer?(x: number, y: number): void
  setScrollVelocity?(v: number): void
  setBoundaries?(rects: DOMRect[]): void
}

/** Shared rAF loop scaffolding for 2D canvas effects. */
export abstract class BaseEffect2D implements CanvasEffect {
  protected canvas!: HTMLCanvasElement
  protected ctx!: CanvasRenderingContext2D
  protected w = 0
  protected h = 0
  protected dpr = Math.min(window.devicePixelRatio || 1, 2)
  private raf = 0
  private running = false
  private last = 0

  mount(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.setRunning(true)
  }

  resize(w: number, h: number) {
    this.w = w
    this.h = h
    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr
    this.canvas.style.width = `${w}px`
    this.canvas.style.height = `${h}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.onResize()
  }

  setRunning(running: boolean) {
    if (running === this.running) return
    this.running = running
    if (running) {
      this.last = performance.now()
      const loop = (t: number) => {
        if (!this.running) return
        const dt = Math.min((t - this.last) / 1000, 0.05)
        this.last = t
        this.tick(dt)
        this.raf = requestAnimationFrame(loop)
      }
      this.raf = requestAnimationFrame(loop)
    } else {
      cancelAnimationFrame(this.raf)
    }
  }

  destroy() {
    this.setRunning(false)
  }

  protected onResize() {}
  protected abstract tick(dt: number): void
}
