import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LOG_LINES = [
  'initializing mesh…',
  'resolving boundary layers…',
  'calibrating nostalgia…',
  'loading personas [4/4]…',
  'convergence reached.',
]

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>([])
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const lineTimers = LOG_LINES.map((line, i) =>
      setTimeout(() => setLines((l) => [...l, line]), 220 + i * 340),
    )
    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    })
    const exit = setTimeout(() => {
      gsap.to(root.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: onDone,
      })
    }, 2300)
    return () => {
      lineTimers.forEach(clearTimeout)
      clearTimeout(exit)
      tween.kill()
    }
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080c]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <p className="mb-10 max-w-xs text-center font-serif text-lg italic text-[#8fa8d8]">
        “Oh boy, the paradox of choice.”
      </p>
      <div className="w-64 font-mono text-[11px] leading-6 text-[#66707f]">
        {lines.map((l) => (
          <p key={l}>
            <span className="text-[#2e6fff]">▸</span> {l}
          </p>
        ))}
      </div>
      <p className="mt-8 font-mono text-2xl text-[#e8ecf4]">{pct}%</p>
    </div>
  )
}
