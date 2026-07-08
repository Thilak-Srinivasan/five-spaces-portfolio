// The Poet — voice: nostalgic, tender-but-defiant, faith clawed from doubt.
// Register distilled from what Thilak reads and keeps: Dostoevsky's furnace of
// doubt, "no feeling is final", amor fati, the slow burn of becoming,
// Nafousi's worth, Plath's exactness.

export const OPENING = 'somewhere, it has just rained.'

export const BIO: string[] = [
  'I write the way rain arrives — late, all at once, and mostly at night. Petrichor is to my nose what a muse is to a poet, which is convenient, because I am trying to be one.',
  'On paper I am articulate; in rooms I am quiet. The distance between those two people is where most of my poems come from. I keep wanting to travel back to high school — not to change anything, just to sit in it once more with the volume up.',
  'My faith in things — people, physics, myself — is not a child’s faith. It has been clawed at, bruised, argued with. My hosanna, too, was forged in a furnace of doubt. I believe suffering is not a detour from a meaningful life but part of its proof, and that no feeling — none — is final.',
  'If I were a color I would be black, or blue, depending on the hour. I was raised on Nafousi’s worth and Plath’s exactness, and I am still learning the slow burn of becoming whoever this is.',
]

export interface Interlude {
  lines: string[]
}

// Scroll-typed verses; the rest of the poems live in poems.ts (the notebook).
export const INTERLUDES: Interlude[] = [
  {
    lines: [
      'the sky forgot to grieve today,',
      'so the soil did it for her —',
      'that smell after rain is just the earth',
      'remembering everything at once.',
    ],
  },
  {
    lines: [
      'i am learning to let things end',
      'without auditing what they owed me —',
      'to hold the ache the way the sky holds weather:',
      'completely, and then not at all.',
      'no feeling is final. not even this one.',
    ],
  },
]

/** The shelf — pieces Thilak keeps returning to. Each links to the original. */
export interface ShelfPiece {
  title: string
  source: string
  url: string
  thumb?: string // cover image in src/assets/shelf/ — card hides it gracefully if missing
  line: string // the line that stays
  note: string // why it stays, in Thilak's register
}

export const SHELF: ShelfPiece[] = [
  {
    title: 'Dostoevsky Was Right',
    source: 'yearly blues · Substack',
    url: 'https://yearlyblues.substack.com/p/dostoevsky-was-right',
    thumb: new URL('../assets/shelf/dostoevsky-was-right.jpg', import.meta.url).href,
    line: '“My hosanna is born of a furnace of doubt.”',
    note: 'real faith isn’t certainty — it’s surviving enough grief to still kneel at something. and believing, against evidence, that no feeling is final.',
  },
  {
    title: 'The Pain of Infinite Options',
    source: 'for the record · Substack',
    url: 'https://fortherecordink.substack.com/p/the-pain-of-infinite-options',
    thumb: new URL('../assets/shelf/pain-of-infinite-options.jpg', import.meta.url).href,
    line: '“It’s not choosing that exhausts us. It’s imagining every life we didn’t choose.”',
    note: 'oh boy, the paradox of choice. we only need to be one person — I re-learn this monthly.',
  },
  {
    title: 'The Art of Being Unreachable',
    source: 'the muse and the melody · Substack',
    url: 'https://themuseandthemelody.substack.com/p/the-art-of-being-unreachable',
    thumb: new URL('../assets/shelf/art-of-being-unreachable.jpg', import.meta.url).href,
    line: '“Seduction is not about being seen. It is about being felt after you leave.”',
    note: 'a rich inner life is the only magnetism that doesn’t expire.',
  },
  {
    title: 'The Slow Burn of Becoming Yourself',
    source: 'janelle dodo · Substack',
    url: 'https://janelledodo.substack.com/p/the-slow-burn-of-becoming-yourself',
    thumb: new URL('../assets/shelf/slow-burn-of-becoming.jpg', import.meta.url).href,
    line: '“The river does not stop to ask what it is; it just flows.”',
    note: 'identity as a process, not a verdict. the questioning is the point.',
  },
  {
    title: 'The Paradox of Craving to Be Seen',
    source: 'cupidity · Substack',
    url: 'https://cupidity.substack.com/p/the-paradox-of-craving-to-be-seen',
    thumb: new URL('../assets/shelf/craving-to-be-seen.jpg', import.meta.url).href,
    line: 'wanting to be witnessed, and hiding from the witness.',
    note: 'the quiet-person dilemma, written down by someone braver.',
  },
  {
    title: 'When I Lost Faith in Love',
    source: 'with love, anonymous · Substack',
    url: 'https://withloveanonymousxx.substack.com/p/when-i-lost-faith-in-love',
    thumb: new URL('../assets/shelf/lost-faith-in-love.jpg', import.meta.url).href,
    line: '“I didn’t lose a thing. I lost myself. Or maybe I became someone new.”',
    note: 'heartbreak isn’t just breaking — it’s building something new out of what’s left.',
  },
  {
    title: 'America Was the Loss of My Life',
    source: 'with love, anonymous · Substack',
    url: 'https://withloveanonymousxx.substack.com/p/america-was-the-loss-of-my-life',
    thumb: new URL('../assets/shelf/america-loss-of-my-life.jpg', import.meta.url).href,
    line: '“Life doesn’t always have to get better, but it does have to go on.”',
    note: 'two slips of paper against fourteen years of work — and persistence anyway.',
  },
  {
    title: 'love as a form of madness i keep choosing',
    source: 'blank space poet · Substack',
    url: 'https://blankspacepoet.substack.com/p/love-as-a-form-of-madness-i-keep',
    thumb: new URL('../assets/shelf/love-as-madness.jpg', import.meta.url).href,
    line: '“if it hurts, then it must be real” — the distortion, named.',
    note: 'intensity is not intimacy. I underline this and forget it, in that order.',
  },
  {
    title: 'Unrot Your Brain',
    source: 'plum pits · Substack',
    url: 'https://plumpits.substack.com/p/unrot-your-brain',
    thumb: new URL('../assets/shelf/unrot-your-brain.jpg', import.meta.url).href,
    line: '“No one warns you how easy it is to slip from rest into rot.”',
    note: 'who are we underneath all the constant consumption and borrowed opinions? your brain is still yours.',
  },
  {
    title: 'The Divine Scar',
    source: 'not an echo, but a voice · WordPress',
    url: 'https://notanechobutavoice.wordpress.com/',
    thumb: new URL('../assets/shelf/divine-scar.jpg', import.meta.url).href,
    line: '“Be you in this world of echoes.”',
    note: 'poetry that treats mythology as a lens for grief — autumn into winter into spring.',
  },
]

/** The commonplace wall — lines carried around like keys. */
export const WALL_TITLE = 'the commonplace wall'
export const WALL_NOTE = 'lines I carry around like keys — some found, some earned.'

export const CREDIT = {
  title: 'All I Ever Wrote',
  anthology: 'Daydreaming (anthology)',
  date: 'January 2025',
  note: 'published poet, occasionally in print, permanently in margins.',
  link: 'https://writerspocket.com/shop/5a3f137c-8d5a-4cb8-9291-485b39392f56',
}

export const INFLUENCES = {
  title: 'raised on',
  entries: [
    { name: 'Roxie Nafousi', why: 'for worth — we only attract what we subconsciously believe we deserve.' },
    { name: 'Sylvia Plath', why: 'for exactness — the courage to write the wound without anesthesia.' },
    { name: 'Fyodor Dostoevsky', why: 'for doubt — the furnace every real hosanna is born of.' },
  ],
}

export const READING_NOTE =
  'mostly, I read. the liked posts are the diary — essays on the paradox of infinite options, on being unreachable, on losing faith in love and finding it in strawberries.'
