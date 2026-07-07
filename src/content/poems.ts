// The notebook — original pieces in Thilak's register: lowercase, conversational
// & serene, the soft reminder. Themes: eyes as galaxies, almost-love, "funny
// how", love as safety, broken trust, dancing in the storm, petrichor,
// high-school nostalgia, every shade of blue.

export interface Poem {
  title: string
  kind: 'stanza' | 'prose' | 'fragment'
  lines: string[] // for prose, each entry is a paragraph; for stanza/fragment, a line
}

export const POEMS: Poem[] = [
  {
    title: 'the color of her looking',
    kind: 'stanza',
    lines: [
      'her eyes — like yours, like mine —',
      'carry tides and stars, dreams and their shadows.',
      'whole galaxies filed under an ordinary tuesday,',
      'refusing, politely, to fade.',
      '',
      'some seconds the universe forgets to be vast',
      'and fits, entirely, in the way she looks up.',
    ],
  },
  {
    title: 'dusk, kept',
    kind: 'prose',
    lines: [
      'life isn’t lived so much as felt in fragments — in hues, in moments that stay long after they’ve technically ended. the quiet warmth of dusk is one of them: that hour when the sky lowers its voice and everything ordinary becomes briefly cosmic.',
      'i keep those pieces. i don’t know where else they would go.',
    ],
  },
  {
    title: 'almost',
    kind: 'stanza',
    lines: [
      'in the quiet aftermath of almost-love',
      'we carry the echoes of what could have been —',
      'tender receipts, unstamped letters,',
      'a door held open in a house never built.',
      '',
      'even unfinished stories leave their ink on the heart.',
      'especially those.',
    ],
  },
  {
    title: 'funny how',
    kind: 'stanza',
    lines: [
      'funny how the songs forget us first,',
      'how a chorus we bled to becomes furniture.',
      'funny how promises weigh nothing until they break,',
      'then weigh everything, everywhere, at once.',
      '',
      'funny how far i bent to keep you comfortable',
      'and called the ache posture.',
      '',
      'funny how things change —',
      'and funnier, quieter: how i did.',
    ],
  },
  {
    title: 'the soft reminder',
    kind: 'prose',
    lines: [
      'it’s in the quiet moments — the way they hold you without needing words, the way their presence feels like a room you already know in the dark — that you learn love was never supposed to be an audition.',
      'it isn’t pain. it isn’t proving. it’s being safe, completely understood, eternally at peace with the volume low.',
      'some people teach you that love can be soft. when you find them, hold on. gently. that’s the whole instruction.',
    ],
  },
  {
    title: 'what you did with my voice',
    kind: 'stanza',
    lines: [
      'once, trust was the ground floor of us —',
      'secrets kept like houseplants, watered, alive.',
      'then my vulnerability came back to me',
      'wearing your laughter, retold at a table i wasn’t at.',
      '',
      'what i confided became your currency.',
      'what i cherished, your punchline.',
      '',
      'i have all this heat now, and nowhere holy to put it —',
      'a reminder, burning evenly,',
      'of the lies i once called a friend.',
    ],
  },
  {
    title: 'storm etiquette',
    kind: 'fragment',
    lines: [
      'in the midst of the storm, find your rhythm and dance.',
      'life was never a canvas of endless sunshine —',
      'it is a tapestry, and the rain is also thread.',
    ],
  },
  {
    title: 'a word for us',
    kind: 'prose',
    lines: [
      'there is a word for us, i know it. i’ve been trying to remember it like a dream i half-lived. maybe it was winter. maybe it was return. maybe it was the shape of stillness between laughter.',
      'you once said we were so similar it scared you, and i said yeah, we mirror each other — but what i should have said is: you are the only person who ever felt like home without asking me to leave anything at the door.',
    ],
  },
  {
    title: 'polaroid, undeveloped',
    kind: 'stanza',
    lines: [
      'there is a polaroid of us somewhere in my mind —',
      'fuzzy, beautiful, not quite developed.',
      'and though it fades, though you are fading,',
      'i still carry it.',
      '',
      'like a prayer. like a wound.',
      'like a promise i never made but kept anyway.',
    ],
  },
  {
    title: 'time travel, gently',
    kind: 'prose',
    lines: [
      'i wish i could believe in time travel — not to change anything, i’m not greedy. just to sit next to you one last time in silence and feel that wordless understanding bloom again, like it never learned how to end.',
      'physics says no. the heart files an appeal every morning.',
    ],
  },
  {
    title: 'april, golden',
    kind: 'stanza',
    lines: [
      'you should’ve been there in april',
      'when the sky kissed itself golden,',
      'when the air smelled like ice cream trucks and childhood —',
      'you would’ve known what to name that color.',
      '',
      'i took a picture anyway. not of the sky —',
      'of the empty space beside me,',
      'in case you appeared in the edges.',
    ],
  },
  {
    title: 'eight slices',
    kind: 'fragment',
    lines: [
      'you cut apples into eight slices, smiling,',
      '“this is enough. it always was.”',
      'and i, who had been pricing the whole orchard,',
      'finally believed you.',
    ],
  },
  {
    title: 'every shade but yours',
    kind: 'stanza',
    lines: [
      'i speak to you with my desperation',
      'hanging on my tongue, well-dressed as small talk.',
      'i ask how you’ve been',
      'when all i wanted to say was',
      'i would trade this whole blue —',
      'the one stuck under my fingernails,',
      'the one i answer to —',
      'for the ordinary weather of having you.',
      '',
      'don’t want no other shade of blue. just you.',
    ],
  },
  {
    title: 'the sound of my silences',
    kind: 'prose',
    lines: [
      'some people come into your life like a poem you didn’t know was already written inside you. you were that. someone reading me back to myself, out loud, for the first time — you knew where my voice caught between joke and truth, could trace the map of my thoughts before i named the city.',
      'we laughed too much, you and i. even at the end. especially at the end. grins on our faces like we weren’t breaking, like we didn’t know this was the last echo of something holy.',
    ],
  },
  {
    title: 'corridor',
    kind: 'stanza',
    lines: [
      'i keep a museum of almosts:',
      'ticket stubs, half-hellos,',
      'the version of me from senior year',
      'still waving from the corridor.',
      '',
      'i don’t want to change a thing back there.',
      'i just want to sit in it once more',
      'with the volume up.',
    ],
  },
  {
    title: 'pocket cosmology',
    kind: 'prose',
    lines: [
      'this was never just about her eyes. it’s about the universes we all carry — the colors that stay lit after the world dims, the infinite folded quietly into a person’s way of turning around.',
      'we are small, and we are carrying galaxies, and somehow both facts are true before breakfast.',
    ],
  },
  {
    title: 'meeting yourself',
    kind: 'fragment',
    lines: [
      'you have not met yourself, not yet —',
      'not until the room goes quiet',
      'and no one else is writing your lines.',
    ],
  },
]

export const NOTEBOOK_TITLE = 'the notebook'
export const NOTEBOOK_NOTE = 'pieces written in fragments, in hues. click the edges — it turns.'
