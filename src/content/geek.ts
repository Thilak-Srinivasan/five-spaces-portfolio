// Dimension 05 — The Geek. Cinema is the first rabbit hole; more sections
// (psychology, multiverses, paradoxes…) to be added later — leave room.

export interface CinemaEntry {
  slug: string
  title: string
  kind: 'film' | 'series' | 'anime'
  line: string // a quote/dialogue (in quotes) or a short nerdy blurb
  poster?: string // drop poster into src/assets/posters/<slug>.jpg
}

const poster = (href: string) => href

// Deliberately mixed — no genre grouping. The order is the mood.
export const CINEMA: CinemaEntry[] = [
  { slug: 'interstellar', title: 'Interstellar', kind: 'film', poster: poster(new URL('../assets/posters/interstellar.jpg', import.meta.url).href), line: '“Love is the one thing that transcends time and space.” — and the docking scene. obviously the docking scene.' },
  { slug: 'attack-on-titan', title: 'Attack on Titan', kind: 'anime', poster: poster(new URL('../assets/posters/attack-on-titan.jpg', import.meta.url).href), line: 'the walls kept out the titans. they never kept out the truth.' },
  { slug: 'dark', title: 'Dark', kind: 'series', poster: poster(new URL('../assets/posters/dark.jpg', import.meta.url).href), line: 'sic mundus creatus est. a knot of time you will want to untangle twice — with a corkboard and string.' },
  { slug: 'pulp-fiction', title: 'Pulp Fiction', kind: 'film', poster: poster(new URL('../assets/posters/pulp-fiction.jpg', import.meta.url).href), line: '“Say ‘what’ again.”' },
  { slug: 'arcane', title: 'Arcane', kind: 'anime', poster: poster(new URL('../assets/posters/arcane.jpg', import.meta.url).href), line: 'two sisters, two cities, and the prettiest tragedy ever animated.' },
  { slug: 'shutter-island', title: 'Shutter Island', kind: 'film', poster: poster(new URL('../assets/posters/shutter-island.jpg', import.meta.url).href), line: '“Which would be worse — to live as a monster, or to die as a good man?”' },
  { slug: 'breaking-bad', title: 'Breaking Bad', kind: 'series', poster: poster(new URL('../assets/posters/breaking-bad.jpg', import.meta.url).href), line: '“I am the one who knocks.”' },
  { slug: 'suzume', title: 'Suzume', kind: 'anime', poster: poster(new URL('../assets/posters/suzume.jpg', import.meta.url).href), line: 'a door left open, a country’s grief, and a chair with three legs that runs anyway.' },
  { slug: 'the-dark-knight', title: 'The Dark Knight', kind: 'film', poster: poster(new URL('../assets/posters/the-dark-knight.jpg', import.meta.url).href), line: '“Why so serious?”' },
  { slug: 'normal-people', title: 'Normal People', kind: 'series', poster: poster(new URL('../assets/posters/normal-people.jpg', import.meta.url).href), line: 'two people who understand each other perfectly — except out loud. (yes, i relate to connell. no, i don’t want to talk about it.)' },
  { slug: 'jujutsu-kaisen', title: 'Jujutsu Kaisen', kind: 'anime', poster: poster(new URL('../assets/posters/jujutsu-kaisen.jpg', import.meta.url).href), line: '“Throughout heaven and earth, I alone am the honored one.”' },
  { slug: 'inception', title: 'Inception', kind: 'film', poster: poster(new URL('../assets/posters/inception.jpg', import.meta.url).href), line: 'the top is still spinning. do not check.' },
  { slug: 'severance', title: 'Severance', kind: 'series', poster: poster(new URL('../assets/posters/severance.jpg', import.meta.url).href), line: 'work-life balance, surgically enforced. praise kier.' },
  { slug: 'death-note', title: 'Death Note', kind: 'anime', poster: poster(new URL('../assets/posters/death-note.jpg', import.meta.url).href), line: '“I’ll take a potato chip… and eat it.” — chess, but both players think they’re god.' },
  { slug: 'the-matrix', title: 'The Matrix', kind: 'film', poster: poster(new URL('../assets/posters/the-matrix.jpg', import.meta.url).href), line: 'there is no spoon.' },
  { slug: 'spider-verse', title: 'Into / Across the Spider-Verse', kind: 'anime', poster: poster(new URL('../assets/posters/spider-verse.jpg', import.meta.url).href), line: 'anyone can wear the mask. the anomaly in the footer agrees.' },
  { slug: 'fight-club', title: 'Fight Club', kind: 'film', poster: poster(new URL('../assets/posters/fight-club.jpg', import.meta.url).href), line: 'the first rule is that you already know the first rule.' },
  { slug: 'game-of-thrones', title: 'Game of Thrones', kind: 'series', poster: poster(new URL('../assets/posters/game-of-thrones.jpg', import.meta.url).href), line: '“Chaos isn’t a pit. Chaos is a ladder.”' },
  { slug: 'cyberpunk-edgerunners', title: 'Cyberpunk: Edgerunners', kind: 'anime', poster: poster(new URL('../assets/posters/cyberpunk-edgerunners.jpg', import.meta.url).href), line: 'neon grief in ten episodes — a story about how far a dream can carry you before it drops you.' },
  { slug: 'parasite', title: 'Parasite', kind: 'film', poster: poster(new URL('../assets/posters/parasite.jpg', import.meta.url).href), line: '“You know what kind of plan never fails? No plan.” — also: peaches.' },
  { slug: 'peaky-blinders', title: 'Peaky Blinders', kind: 'series', poster: poster(new URL('../assets/posters/peaky-blinders.jpg', import.meta.url).href), line: '“By order of the Peaky Blinders.”' },
  { slug: 'solo-leveling', title: 'Solo Leveling', kind: 'anime', poster: poster(new URL('../assets/posters/solo-leveling.jpg', import.meta.url).href), line: '“ARISE.” — the most satisfying grind in fiction.' },
  { slug: 'the-godfather', title: 'The Godfather', kind: 'film', poster: poster(new URL('../assets/posters/the-godfather.jpg', import.meta.url).href), line: '“I’m gonna make him an offer he can’t refuse.”' },
  { slug: 'black-mirror', title: 'Black Mirror', kind: 'series', poster: poster(new URL('../assets/posters/black-mirror.jpg', import.meta.url).href), line: 'the future, five minutes from now, slightly worse.' },
  { slug: 'chainsaw-man', title: 'Chainsaw Man', kind: 'anime', poster: poster(new URL('../assets/posters/chainsaw-man.jpg', import.meta.url).href), line: 'denji wants breakfast, love, and a normal life. the chainsaw is negotiable.' },
  { slug: 'tenet', title: 'Tenet', kind: 'film', poster: poster(new URL('../assets/posters/tenet.jpg', import.meta.url).href), line: '“Don’t try to understand it. Feel it.”' },
  { slug: 'the-penguin', title: 'The Penguin', kind: 'series', poster: poster(new URL('../assets/posters/the-penguin.jpg', import.meta.url).href), line: 'gotham’s ugliest ladder, climbed rung by rung.' },
  { slug: 'blue-eye-samurai', title: 'Blue Eye Samurai', kind: 'anime', poster: poster(new URL('../assets/posters/blue-eye-samurai.jpg', import.meta.url).href), line: 'revenge, folded and hammered like a blade.' },
  { slug: 'django-unchained', title: 'Django Unchained', kind: 'film', poster: poster(new URL('../assets/posters/django-unchained.jpg', import.meta.url).href), line: '“The D is silent.”' },
  { slug: 'rick-and-morty', title: 'Rick and Morty', kind: 'series', poster: poster(new URL('../assets/posters/rick-and-morty.jpg', import.meta.url).href), line: '“Wubba lubba dub dub.” — C-137 checks in. (the footer knows.)' },
  { slug: 'takopi', title: 'Takopi’s Original Sin', kind: 'anime', poster: poster(new URL('../assets/posters/takopi.jpg', import.meta.url).href), line: 'a happy alien, an unhappy child, and the heaviest few episodes of the decade.' },
  { slug: 'donnie-darko', title: 'Donnie Darko', kind: 'film', poster: poster(new URL('../assets/posters/donnie-darko.jpg', import.meta.url).href), line: '28 days, 6 hours, 42 minutes, 12 seconds. wake up.' },
  { slug: 'sinners', title: 'Sinners', kind: 'film', poster: poster(new URL('../assets/posters/sinners.jpg', import.meta.url).href), line: 'blues, blood, and one long unbroken night.' },
  { slug: 'se7en', title: 'Se7en', kind: 'film', poster: poster(new URL('../assets/posters/se7en.jpg', import.meta.url).href), line: '“What’s in the box?”' },
  { slug: 'project-hail-mary', title: 'Project Hail Mary', kind: 'film', poster: poster(new URL('../assets/posters/project-hail-mary.jpg', import.meta.url).href), line: 'a lone science teacher, an alien buddy, and the friendliest first contact ever written. amaze. question.' },
  { slug: 'obsession', title: 'Obsession', kind: 'film', poster: poster(new URL('../assets/posters/obsession.jpg', import.meta.url).href), line: 'the kind of horror that follows you home and waits politely.' },
]

export const GEEK_INTRO =
  'psychology, time travel, quantum physics, multiverses, paradoxes, the occasional conspiracy — and the stories that made all of it personal. this dimension archives the obsessions.'

export const CINEMA_NOTE = 'no genres, no rankings, no order but the mood. click a frame — the projector does the rest.'

export const COMING_SOON = [
  'paradoxes & thought experiments',
  'the psychology shelf',
  'multiverse theory, argued badly at 2 a.m.',
]
