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

// PLACEHOLDER — replace with Thilak's published lines when supplied.
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
      'i keep a museum of almosts:',
      'ticket stubs, half-hellos,',
      'the version of me from senior year',
      'still waving from the corridor.',
    ],
  },
  {
    lines: [
      'you have not met yourself, not yet —',
      'not until the room goes quiet',
      'and no one else is writing your lines.',
    ],
  },
  {
    lines: [
      'if it must ache, let it ache forward.',
      'no feeling is final.',
      'not even this one.',
    ],
  },
]

export const CREDIT = {
  title: 'All I Ever Wrote',
  anthology: 'Daydreaming (anthology)',
  date: 'January 2025',
  note: 'published poet, occasionally in print, permanently in margins.',
}

export const READING_NOTE =
  'mostly, I read. the liked posts are the diary — essays on the paradox of infinite options, on being unreachable, on losing faith in love and finding it in strawberries.'
