import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { LANDING_DEFAULTS, PERSONAS } from '../theme/personas'
import type { PersonaId } from '../theme/personas'

interface PersonaState {
  active: PersonaId | null
  enter: (id: PersonaId) => void
  exit: () => void
}

const PersonaCtx = createContext<PersonaState>({ active: null, enter: () => {}, exit: () => {} })

function readHash(): PersonaId | null {
  const h = location.hash.replace('#/', '')
  return h in PERSONAS ? (h as PersonaId) : null
}

function applyTheme(id: PersonaId | null) {
  const t = id ? PERSONAS[id] : LANDING_DEFAULTS
  const root = document.documentElement
  root.style.setProperty('--bg', t.bg)
  root.style.setProperty('--bg-soft', t.bgSoft)
  root.style.setProperty('--accent', t.accent)
  root.style.setProperty('--accent2', t.accent2)
  root.style.setProperty('--ink', t.ink)
  root.style.setProperty('--ink-dim', t.inkDim)
  root.style.setProperty('--heading-font', t.headingFont)
  root.style.setProperty('--body-font', t.bodyFont)
  if (id) root.setAttribute('data-cursor', PERSONAS[id].cursor)
  else root.setAttribute('data-cursor', 'crosshair-telemetry')
}

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<PersonaId | null>(readHash)

  const enter = useCallback((id: PersonaId) => {
    history.pushState(null, '', `#/${id}`)
    setActive(id)
  }, [])

  const exit = useCallback(() => {
    history.pushState(null, '', '#')
    setActive(null)
  }, [])

  useEffect(() => {
    const onHash = () => setActive(readHash())
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onHash)
    }
  }, [])

  useEffect(() => {
    applyTheme(active)
    window.scrollTo(0, 0)
  }, [active])

  return <PersonaCtx.Provider value={{ active, enter, exit }}>{children}</PersonaCtx.Provider>
}

export function usePersona() {
  return useContext(PersonaCtx)
}
