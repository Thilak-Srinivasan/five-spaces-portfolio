import { useCallback, useEffect, useState } from 'react'
import { PERSONAS, PERSONA_ORDER } from '../theme/personas'
import type { PersonaId } from '../theme/personas'
import { usePersona } from '../state/PersonaContext'

/** ⌘K / Ctrl+K fast travel between spaces. */
export function CommandOverlay() {
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const { enter, exit } = usePersona()

  const items: Array<{ id: PersonaId | 'home'; label: string; hint: string }> = [
    { id: 'home', label: 'Home', hint: 'all five dimensions' },
    ...PERSONA_ORDER.map((id) => ({ id, label: PERSONAS[id].title, hint: PERSONAS[id].tagline })),
  ]

  const go = useCallback(
    (id: PersonaId | 'home') => {
      setOpen(false)
      if (id === 'home') exit()
      else enter(id)
    },
    [enter, exit],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setCursor(0)
      } else if (open) {
        if (e.key === 'Escape') setOpen(false)
        if (e.key === 'ArrowDown') setCursor((c) => (c + 1) % items.length)
        if (e.key === 'ArrowUp') setCursor((c) => (c - 1 + items.length) % items.length)
        if (e.key === 'Enter') go(items[cursor].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, cursor, go, items])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center bg-black/70 pt-[20vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-md border border-[var(--ink-dim)]/30 bg-[var(--bg-soft)] p-2 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <p className="px-3 py-2 font-mono text-[10px] tracking-widest text-[var(--ink-dim)]">FAST TRAVEL — ↑↓ · enter · esc</p>
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => go(it.id)}
            onMouseEnter={() => setCursor(i)}
            className={`flex w-full items-baseline justify-between px-3 py-2.5 text-left font-grotesk transition-colors ${
              i === cursor ? 'bg-[var(--accent)]/15 text-[var(--ink)]' : 'text-[var(--ink-dim)]'
            }`}
          >
            <span>{it.label}</span>
            <span className="font-serif text-sm italic opacity-60">{it.hint}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
