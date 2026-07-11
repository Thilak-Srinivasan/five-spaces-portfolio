export interface WrappedYear {
  year: number
  minutes: number
  approx?: boolean
  note: string
  peak?: string
}

export const WRAPPED: WrappedYear[] = [
  { year: 2022, minutes: 15716, note: 'more than 94% of listeners in India' },
  { year: 2023, minutes: 76130, note: 'top 2% of listeners worldwide', peak: 'peak: July 9 · 827 minutes' },
  { year: 2024, minutes: 75309, note: 'top 2% of listeners worldwide', peak: 'peak: October 5 · 796 minutes' },
  { year: 2025, minutes: 74121, note: 'that’s 51 days — the ear never left' },
]

export const JUMP_NOTE = 'the year everything got louder — ×4.8'

export const LISTENING_DAY = {
  date: 'May 24, 2025',
  headline: 'The day you built a bedroom pop labyrinth and wandered through 12 hours of gentle loops',
  body: 'From late night into sunrise: Strawberry Guy, Men I Trust, Beach House on an endless radio loop. By morning, Billie Eilish took the reins; afternoon brought a genre switch — Tamil, Malayalam, Hindi pop — with XXXTENTACION and indie soul closing out the night.',
  stats: '753 minutes · 231 tracks · 102 artists',
  filedUnder: 'Filed under: overnight immersion, dream pop marathon',
}

export interface TopArtist {
  name: string
  weight: number // 0..1 relative size
}

export const TOP_ARTISTS: TopArtist[] = [
  { name: 'Joji', weight: 1 },
  { name: 'Cigarettes After Sex', weight: 0.5 },
  { name: 'Weyes Blood', weight: 0.45 },
  { name: 'Lithe', weight: 0.42 },
  { name: 'OXYBUZ', weight: 0.38 },
  { name: 'Tame Impala', weight: 0.38 },
  { name: 'april27', weight: 0.34 },
  { name: 'Billie Eilish', weight: 0.34 },
  { name: 'The Neighbourhood', weight: 0.32 },
  { name: 'Asal', weight: 0.3 },
  { name: 'Crystal Castles', weight: 0.3 },
  { name: 'mehro', weight: 0.28 },
  { name: 'Yuvan Shankar Raja', weight: 0.4 },
  { name: 'Anirudh Ravichander', weight: 0.36 },
]

export const PERSONALITY = {
  name: 'The Adventurer',
  code: 'ENVU',
  legend: 'Exploration · Newness · Variety · Uniqueness',
  line: 'a seeker of sound — fresher artists, deeper cuts, newer tracks, gems yet to be found.',
}

export const FIRST_DAY = {
  date: 'April 13, 2021',
  firstStream: 'Black Swan — BTS',
  note: '20,993 songs by the end of that first year.',
}

/** The silent player — Joji on repeat, audio not included. */
export interface SilentTrack {
  title: string
  artist: string
  duration: number // seconds
  scene: string // backdrop image — drop into src/assets/extras/
}

// each scene hand-matched to its song's vibe:
// 1 mountain leap → Let It Happen (surrender, vastness)
// 2 window light, waiting → Andromeda (cosmic longing)
// 3 train platform, red → Die For You (locked by request — it fits)
// 4 two lit windows apart → K. (love across a distance)
// 5 clock in low light → prayer1 (late-night, time passing)
// 6 turntable + headphones → Headache (drown it in music)
export const SILENT_TRACKS: SilentTrack[] = [
  { title: 'Let It Happen', artist: 'Tame Impala', duration: 467, scene: new URL('../assets/extras/transcend-1.jpg', import.meta.url).href },
  { title: 'Andromeda', artist: 'Weyes Blood', duration: 279, scene: new URL('../assets/extras/transcend-2.jpg', import.meta.url).href },
  { title: 'Die For You', artist: 'Joji', duration: 210, scene: new URL('../assets/extras/transcend-3.jpg', import.meta.url).href },
  { title: 'K.', artist: 'Cigarettes After Sex', duration: 307, scene: new URL('../assets/extras/transcend-4.jpg', import.meta.url).href },
  { title: 'prayer1', artist: 'april27', duration: 156, scene: new URL('../assets/extras/transcend-5.jpg', import.meta.url).href },
  { title: 'Headache', artist: 'Asal', duration: 168, scene: new URL('../assets/extras/transcend-6.jpg', import.meta.url).href },
]

export const SILENT_PLAYER_NOTE = 'transcending time and space — audio not included.'

export interface WrappedShot {
  src?: string
  alt: string
  placeholder?: boolean
}

// Drop screenshots into src/assets/wrapped/ and update paths here.
export const WRAPPED_SHOTS: WrappedShot[] = [
  { src: new URL('../assets/wrapped/2022-minutes.jpg', import.meta.url).href, alt: '2022 Wrapped — 15,716 minutes' },
  { src: new URL('../assets/wrapped/2023-minutes.jpg', import.meta.url).href, alt: '2023 Wrapped — 76,130 minutes, top 2% worldwide' },
  { src: new URL('../assets/wrapped/2024-minutes.jpg', import.meta.url).href, alt: '2024 Wrapped — 75,309 minutes, top 2% worldwide' },
  { src: new URL('../assets/wrapped/2025-minutes.jpg', import.meta.url).href, alt: '2025 Wrapped — 74,121 minutes, 51 days of music' },
  { src: new URL('../assets/wrapped/adventurer.jpg', import.meta.url).href, alt: 'Listening personality — The Adventurer' },
  { src: new URL('../assets/wrapped/listening-day.jpg', import.meta.url).href, alt: 'Biggest listening day — May 24, 2025' },
]
