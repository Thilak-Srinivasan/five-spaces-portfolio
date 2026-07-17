export interface Sketch {
  src?: string
  alt: string
  caption: string
  story?: string
  placeholder?: boolean
}

// Drop image files into src/assets/sketches/ and update src paths here.
export const SKETCHES: Sketch[] = [
  {
    src: new URL('../assets/sketches/portrait-study.jpg', import.meta.url).href,
    alt: 'Pencil portrait study of a young man, loose expressive strokes',
    caption: 'portrait study · graphite',
    story: 'loose strokes on purpose — a face is a weather system, not a diagram.',
  },
  {
    src: new URL('../assets/sketches/shigaraki.jpg', import.meta.url).href,
    alt: 'Pencil drawing of Tomura Shigaraki with hands over his face',
    caption: 'shigaraki · graphite on paper',
    story: 'drawn for the hands, stayed for the horror — grief rendered as texture.',
  },
  {
    src: new URL('../assets/sketches/jimin.jpg', import.meta.url).href,
    alt: 'Pencil sketch of Jimin of BTS wearing round sunglasses, head tilted, sparkles beside him',
    caption: 'jimin · graphite on paper',
    story: 'park ji-min, sunglasses indoors — a study in effortless. the sparkles are canon.',
  },
  {
    src: new URL('../assets/sketches/girl.jpg', import.meta.url).href,
    alt: 'Pencil portrait of a girl, half her face hidden, one wide eye looking through wind-blown hair',
    caption: 'the gaze · graphite on paper',
    story: 'half in shadow, hair mid-storm — drawn for the one eye that watches you back.',
  },
  {
    src: new URL('../assets/sketches/kris.jpg', import.meta.url).href,
    alt: 'Pencil sketch of a girl taking a mirror photo with a camera, hand behind her neck',
    caption: 'kris · graphite on paper',
    story: 'the art herself.',
  },
  { placeholder: true, alt: 'placeholder frame', caption: 'next page intentionally left blank' },
  { placeholder: true, alt: 'placeholder frame', caption: 'in progress — the eye is patient' },
  { placeholder: true, alt: 'placeholder frame', caption: 'reference found, courage pending' },
  { placeholder: true, alt: 'placeholder frame', caption: 'petrichor, if it had a face' },
]

export const ARTIST_INTRO =
  'a high-end sketchbook — slightly chaotic, fully curated. graphite first, opinions later.'

export const PRACTICE: string[] = [
  'Paul Klee called a drawing a line going for a walk. Most of these pages are exactly that — a dot that left home at midnight and came back, hours later, as a face.',
  'Matisse said creativity takes courage; Rothko said silence is so accurate. Everything here was drawn somewhere between those two sentences — brave enough to start, quiet enough to know when to stop.',
  'And Picasso’s old warning hangs over all of it: every child is an artist; the problem is remaining one once you grow up. This sketchbook is my ongoing argument that you can — that between the derivations and the deadlines, the kid with the pencil is still in here, drawing his heroes.',
]

export const TOOLS_LINE = 'graphite, every grade · one loyal eraser · whatever paper is nearest · patience, intermittently'
