import * as THREE from 'three'
import type { CanvasEffect } from './CanvasEffect'

/** Deep-space starfield with slow drift and mouse parallax. */
export class Starfield3D implements CanvasEffect {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private points!: THREE.Points
  private geometry!: THREE.BufferGeometry
  private material!: THREE.PointsMaterial
  private raf = 0
  private running = false
  private target = new THREE.Vector2()

  mount(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
    this.camera.position.z = 6

    const N = 2500
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    const blue = new THREE.Color('#7aa5ff')
    const white = new THREE.Color('#e8ecf4')
    for (let i = 0; i < N; i++) {
      // uniform-ish shell distribution
      const r = 4 + Math.random() * 14
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      pos[i * 3 + 2] = -Math.random() * 40
      const c = Math.random() < 0.3 ? blue : white
      const dim = 0.4 + Math.random() * 0.6
      col[i * 3] = c.r * dim
      col[i * 3 + 1] = c.g * dim
      col[i * 3 + 2] = c.b * dim
    }
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(col, 3))
    this.material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
    this.setRunning(true)
  }

  resize(w: number, h: number) {
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / Math.max(h, 1)
    this.camera.updateProjectionMatrix()
  }

  setPointer(x: number, y: number) {
    const r = this.renderer.domElement.getBoundingClientRect()
    this.target.set((x / Math.max(r.width, 1)) - 0.5, (y / Math.max(r.height, 1)) - 0.5)
  }

  setRunning(running: boolean) {
    if (running === this.running) return
    this.running = running
    if (running) {
      const loop = () => {
        if (!this.running) return
        const p = this.geometry.getAttribute('position') as THREE.BufferAttribute
        for (let i = 0; i < p.count; i++) {
          let z = p.getZ(i) + 0.012
          if (z > 6) z = -40
          p.setZ(i, z)
        }
        p.needsUpdate = true
        this.camera.position.x += (this.target.x * 1.2 - this.camera.position.x) * 0.04
        this.camera.position.y += (-this.target.y * 0.8 - this.camera.position.y) * 0.04
        this.camera.lookAt(0, 0, -10)
        this.renderer.render(this.scene, this.camera)
        this.raf = requestAnimationFrame(loop)
      }
      this.raf = requestAnimationFrame(loop)
    } else {
      cancelAnimationFrame(this.raf)
    }
  }

  destroy() {
    this.setRunning(false)
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }
}
