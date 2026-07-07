import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { PERSONAS, PERSONA_ORDER } from '../theme/personas'
import type { PersonaId } from '../theme/personas'
import { usePersona } from '../state/PersonaContext'
import { Footer } from './Footer'
import { ArrowLeftIcon } from './Icons'

/** Chrome around each space: top bar, entry wipe, footer. */
export function SpaceShell({ id, children }: { id: PersonaId; children: ReactNode }) {
  const wipe = useRef<HTMLDivElement>(null)
  const { enter, exit } = usePersona()
  const t = PERSONAS[id]

  useEffect(() => {
    gsap.fromTo(
      wipe.current,
      { clipPath: 'inset(0 0 0 0)' },
      { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'power4.inOut', delay: 0.05 },
    )
  }, [id])

  return (
    <div className="relative min-h-screen">
      <div ref={wipe} className="pointer-events-none fixed inset-0 z-[80]" style={{ background: t.accent }} aria-hidden />
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 backdrop-blur-[2px] md:px-8">
        <button
          onClick={exit}
          data-magnetic
          className="flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--ink-dim)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeftIcon /> ALL SPACES
        </button>
        <p className="font-mono text-xs tracking-[0.3em] text-[var(--ink-dim)]">
          <span style={{ color: t.accent }}>{t.index}</span> · {t.title.toUpperCase()}
        </p>
        <nav className="flex items-center gap-2.5" aria-label="Other spaces">
          {PERSONA_ORDER.map((pid) => (
            <button
              key={pid}
              onClick={() => enter(pid)}
              data-magnetic
              aria-label={PERSONAS[pid].title}
              title={PERSONAS[pid].title}
              className="h-2.5 w-2.5 rounded-full transition-transform hover:scale-150"
              style={{
                background: pid === id ? PERSONAS[pid].accent : 'transparent',
                border: `1px solid ${pid === id ? PERSONAS[pid].accent : 'var(--ink-dim)'}`,
              }}
            />
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}
