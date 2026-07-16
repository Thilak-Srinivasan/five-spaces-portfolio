import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { PersonaProvider, usePersona } from './state/PersonaContext'
import { Preloader } from './components/Preloader'
import { MagneticCursor } from './components/MagneticCursor'
import { TiltEffect } from './components/TiltEffect'
import { CommandOverlay } from './components/CommandOverlay'
import { Landing } from './sections/Landing'
import { SpaceRoot } from './sections/SpaceRoot'
import { prefersReducedMotion } from './canvas/useCanvasEffect'

gsap.registerPlugin(ScrollTrigger)

function Stage() {
  const { active } = usePersona()
  return active ? <SpaceRoot id={active} /> : <Landing />
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.08 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <PersonaProvider>
      <MagneticCursor />
      <TiltEffect />
      <CommandOverlay />
      {loading ? <Preloader onDone={() => setLoading(false)} /> : <Stage />}
    </PersonaProvider>
  )
}

export default App
