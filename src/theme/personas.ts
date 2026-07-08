export type PersonaId = 'engineer' | 'poet' | 'artist' | 'audiophile'

export type CursorVariant = 'crosshair-telemetry' | 'ink-dot' | 'graphite' | 'pulse-ring'

export interface PersonaTheme {
  id: PersonaId
  index: string
  title: string
  tagline: string
  bg: string
  bgSoft: string
  accent: string
  accent2: string
  ink: string
  inkDim: string
  headingFont: string
  bodyFont: string
  cursor: CursorVariant
}

export const PERSONAS: Record<PersonaId, PersonaTheme> = {
  engineer: {
    id: 'engineer',
    index: '01',
    title: 'The Engineer',
    tagline: 'flow, resolved.',
    bg: '#07080c',
    bgSoft: '#0c0f16',
    accent: '#2e6fff',
    accent2: '#ff2a3c',
    ink: '#e8ecf4',
    inkDim: '#66707f',
    headingFont: 'var(--font-grotesk)',
    bodyFont: 'var(--font-grotesk)',
    cursor: 'crosshair-telemetry',
  },
  poet: {
    id: 'poet',
    index: '02',
    title: 'The Poet',
    tagline: 'petrichor, in writing.',
    bg: '#0a0d14',
    bgSoft: '#0e1220',
    accent: '#8fa8d8',
    accent2: '#3d5a80',
    ink: '#dde3ee',
    inkDim: '#5c6577',
    headingFont: 'var(--font-serif)',
    bodyFont: 'var(--font-serif)',
    cursor: 'ink-dot',
  },
  artist: {
    id: 'artist',
    index: '03',
    title: 'The Artist',
    tagline: 'graphite over silence.',
    bg: '#0d0d0f',
    bgSoft: '#131316',
    accent: '#c9c4b8',
    accent2: '#8a8478',
    ink: '#eceae4',
    inkDim: '#6e6a61',
    headingFont: 'var(--font-serif)',
    bodyFont: 'var(--font-serif)',
    cursor: 'graphite',
  },
  audiophile: {
    id: 'audiophile',
    index: '04',
    title: 'The Music Aficionado',
    tagline: 'fluent in frequencies.',
    bg: '#08070b',
    bgSoft: '#100c16',
    accent: '#c8ff3e',
    accent2: '#ff4fa3',
    ink: '#f2eefa',
    inkDim: '#6b6478',
    headingFont: 'var(--font-grotesk)',
    bodyFont: 'var(--font-grotesk)',
    cursor: 'pulse-ring',
  },
}

export const PERSONA_ORDER: PersonaId[] = ['engineer', 'poet', 'artist', 'audiophile']

export const LANDING_DEFAULTS = {
  bg: '#07080c',
  bgSoft: '#0c0f16',
  accent: '#2e6fff',
  accent2: '#ff2a3c',
  ink: '#e8ecf4',
  inkDim: '#66707f',
  headingFont: 'var(--font-grotesk)',
  bodyFont: 'var(--font-grotesk)',
}
