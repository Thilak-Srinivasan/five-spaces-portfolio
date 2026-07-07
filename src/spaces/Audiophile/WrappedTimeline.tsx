import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { JUMP_NOTE, WRAPPED } from '../../content/audiophile'
import { prefersReducedMotion } from '../../canvas/useCanvasEffect'

gsap.registerPlugin(ScrollTrigger)

const BAND_COLORS = ['#c8ff3e', '#ff4fa3', '#7c3aed']

function CountUp({ value, approx }: { value: number; approx?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (prefersReducedMotion()) {
      el.textContent = value.toLocaleString('en-IN')
      return
    }
    const counter = { v: 0 }
    const tween = gsap.to(counter, {
      v: value,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = Math.round(counter.v).toLocaleString('en-IN')
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  return (
    <span>
      {approx && <span className="mr-1 align-top font-mono text-xl text-[var(--ink-dim)]">~</span>}
      <span ref={ref}>0</span>
    </span>
  )
}

export function WrappedTimeline() {
  return (
    <div className="space-y-24">
      {WRAPPED.map((w, i) => (
        <div key={w.year}>
          {i === 1 && (
            <p className="mb-10 text-center font-mono text-[11px] tracking-[0.3em] text-[var(--accent2)]">
              ↓ {JUMP_NOTE} ↓
            </p>
          )}
          <div className="flex flex-col items-center">
            <p className="font-mono text-xs tracking-[0.5em] text-[var(--ink-dim)]">{w.year}</p>
            {/* repeat-number Wrapped styling: number echoed in stacked color bands */}
            <div className="mt-3 w-full max-w-lg overflow-hidden text-center leading-[0.92]">
              {BAND_COLORS.map((c, bi) => (
                <p
                  key={bi}
                  className="select-none font-grotesk font-bold tracking-tight"
                  style={{
                    fontSize: 'clamp(3rem, 9vw, 6rem)',
                    color: bi === 1 ? 'var(--ink)' : c,
                    opacity: bi === 1 ? 1 : 0.5,
                    marginTop: bi ? '-0.16em' : 0,
                  }}
                  aria-hidden={bi !== 1}
                >
                  <CountUp value={w.minutes} approx={w.approx} />
                </p>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-[var(--ink-dim)]">minutes listened · {w.note}</p>
            {w.peak && <p className="mt-1 font-mono text-[11px] text-[var(--accent)]">{w.peak}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
