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
  'psychology, time travel, quantum physics, multiverses, paradoxes, the occasional conspiracy theory, formula 1 at 350 km/h, and a cinema habit that refuses genre — this dimension archives the obsessions, current and incoming.'

export const CINEMA_NOTE = 'no genres, no rankings, no order but the mood. click a frame — the projector does the rest.'

/** Rabbit hole 2 — the corkboard: theories & paradoxes, pinned and strung. */
export interface Theory {
  title: string
  tag: string // one-word classification stamp
  line: string
  url: string // rabbit-hole entry point
}

export const THEORIES: Theory[] = [
  { title: 'The Simulation Theory', url: 'https://en.wikipedia.org/wiki/Simulation_hypothesis', tag: 'UNFALSIFIABLE', line: 'if we’re rendered, someone is ignoring the bug reports.' },
  { title: 'Many Worlds', url: 'https://en.wikipedia.org/wiki/Many-worlds_interpretation', tag: 'BRANCHING', line: 'somewhere, a version of me submitted everything early. we don’t talk about him.' },
  { title: 'The Fermi Paradox', url: 'https://en.wikipedia.org/wiki/Fermi_paradox', tag: 'UNANSWERED', line: 'the universe’s loudest silence — everyone’s invited, nobody’s home.' },
  { title: 'White Holes', url: 'https://en.wikipedia.org/wiki/White_hole', tag: 'THEORETICAL', line: 'black holes played in reverse. the universe’s undo button, allegedly.' },
  { title: 'The Ekpyrotic Universe', url: 'https://en.wikipedia.org/wiki/Ekpyrotic_universe', tag: 'PRE-BANG', line: 'creation as a fender-bender between two higher-dimensional membranes.' },
  { title: 'The Holographic Universe', url: 'https://en.wikipedia.org/wiki/Holographic_principle', tag: 'PROJECTED', line: 'all of this might be a 2D surface with exceptional marketing.' },
  { title: 'Black-Hole Nurseries', url: 'https://en.wikipedia.org/wiki/Cosmological_natural_selection', tag: 'RECURSIVE', line: 'every black hole a delivery room for a new universe. we might be someone’s singularity.' },
  { title: 'Quantum Entanglement', url: 'https://en.wikipedia.org/wiki/Quantum_entanglement', tag: 'SPOOKY', line: 'two particles, one mood. distance not included.' },
  { title: 'Time Crystals', url: 'https://en.wikipedia.org/wiki/Time_crystal', tag: 'PERPETUAL', line: 'matter that ticks forever without energy — perpetual motion’s legal loophole.' },
  { title: 'Panspermia', url: 'https://en.wikipedia.org/wiki/Panspermia', tag: 'HITCHHIKED', line: 'life didn’t start here; it caught a ride. we are all immigrants of the cosmos.' },
  { title: 'The Boltzmann Brain', url: 'https://en.wikipedia.org/wiki/Boltzmann_brain', tag: 'UNSETTLING', line: 'you — memories included — may have condensed out of the void five minutes ago.' },
  { title: 'Retroactive Precognition', url: 'https://en.wikipedia.org/wiki/Feeling_the_Future', tag: 'DÉJÀ VU', line: 'remembering the future, technically. déjà vu with a physics degree.' },
  { title: 'The Heat Death', url: 'https://en.wikipedia.org/wiki/Heat_death_of_the_universe', tag: 'EVENTUAL', line: 'the universe’s final state: perfectly tidy, perfectly cold, nobody left to complain.' },
  { title: 'Quantum Immortality', url: 'https://en.wikipedia.org/wiki/Quantum_suicide_and_immortality', tag: 'BRANCHING', line: 'in some branch, you always survive. the multiverse’s strangest gift.' },
]

export const CORKBOARD_NOTE = 'pinned, strung, and argued with at 2 a.m. none of these are proven. that’s the point.'

/** Rabbit hole 3 — field notes on being a person. */
export const FIELD_NOTES: string[] = [
  'the most magnetic people are never bored. they are busy becoming.',
  'we all have multitudes — with a firm base, good sense, and imagination, a person can change with the slightest of events.',
  'a human lives three lives: the first ends with the loss of naïveté, the second with the loss of innocence, the third with life itself. the trick is enjoying all three syllabi.',
  'to know the true meaning of life, you must first live a life full of meaning.',
  'the ways of the heart cannot be explained. it wants what it wants — peer review pending.',
  'what do you need? — someone who stays when the humor stops.',
  'the mind, when burdened beyond measure, often seeks refuge in absence rather than endure further folly. (rest is a valid control strategy.)',
  '“beer and juleps cannot fill the void left by love. only wine can — but it is famously costly, which is why sadness is among the most recurrent issues facing the poor.” — filed under: economics of the heart.',
]

export const FIELD_NOTES_INTRO =
  'the psychology shelf — observations collected on being a person, annotated by someone who studies flows for a living.'

/** Rabbit hole 4 — papers that will never survive peer review. */
export interface FakePaper {
  id: string
  title: string
  abstract: string
  fig?: string // drop an image into src/assets/papers/ and it appears as Fig. 1
  basedOn?: { label: string; url: string } // the real science behind the gag
}

export const PAPERS: FakePaper[] = [
  {
    id: 'arXiv:never.0001',
    basedOn: { label: 'ERGODICITY', url: 'https://en.wikipedia.org/wiki/Ergodicity' },
    fig: new URL('../assets/papers/never-0001.jpg', import.meta.url).href,
    title: 'Ergodic Lagrangian Dynamics in a Superhero Universe',
    abstract: 'we derive the equations of motion for a web-slinger under Manhattan boundary conditions. energy is not conserved; drama is.',
  },
  {
    id: 'arXiv:never.0002',
    basedOn: { label: 'DERIVATIVE-FREE OPTIMIZATION', url: 'https://en.wikipedia.org/wiki/Derivative-free_optimization' },
    fig: new URL('../assets/papers/never-0002.jpg', import.meta.url).href,
    title: 'Black-Box Optimization of a Life, N = 1',
    abstract: 'unknown objective function, noisy feedback, no gradient access. we keep sampling anyway. convergence not guaranteed; character development observed.',
  },
  {
    id: 'arXiv:never.0003',
    basedOn: { label: 'THE PARETO PRINCIPLE', url: 'https://en.wikipedia.org/wiki/Pareto_principle' },
    fig: new URL('../assets/papers/never-0003.jpg', import.meta.url).href,
    title: 'A Pareto Analysis of Overthinking',
    abstract: '80% of the damage comes from 20% of the thoughts, usually after 1 a.m. we propose an early-stopping criterion. we do not follow it.',
  },
  {
    id: 'arXiv:never.0004',
    basedOn: { label: 'THE BUTTERFLY EFFECT', url: 'https://en.wikipedia.org/wiki/Butterfly_effect' },
    fig: new URL('../assets/papers/never-0004.jpg', import.meta.url).href,
    title: 'Chaos Theory and the Butterfly That Rerouted My Week',
    abstract: 'sensitive dependence on initial conditions, demonstrated via one unread message. lyapunov exponents of a tuesday.',
  },
  {
    id: 'arXiv:never.0005',
    basedOn: { label: 'PANPSYCHISM', url: 'https://en.wikipedia.org/wiki/Panpsychism' },
    fig: new URL('../assets/papers/never-0005.jpg', import.meta.url).href,
    title: 'On the Aeroacoustics of a Conscious Cosmos',
    abstract: 'if the universe is a mind, what does it hear? we present the first (and last) study of cosmic tinnitus, with implications for string theory — the vibrating kind.',
  },
]

export const PAPERS_INTRO = 'submitted to the journal of ideas i think about in the shower. rejection pending.'

export const PADDOCK = {
  label: 'THE PADDOCK · HOME RACE OF ALL THE OBSESSIONS',
  headline: 'Formula 1',
  body: 'the rabbit hole that became a career plan. every other obsession meets here: engineering at 350 km/h, poetry in the team radio, art on the liveries, sound you feel in your ribs, and lore deeper than any anime. one day the pit wall; for now, the telemetry overlays.',
  image: new URL('../assets/extras/paddock.jpg', import.meta.url).href, // drop paddock.jpg into src/assets/extras/
  links: [
    { label: 'DRIVERS & TEAMS', url: 'https://www.formula1.com/en/drivers' },
    { label: 'THE 2026 CALENDAR', url: 'https://www.formula1.com/en/racing/2026' },
    { label: 'EVERYTHING F1', url: 'https://www.formula1.com/' },
  ],
}
