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
  { placeholder: true, alt: 'placeholder frame', caption: 'next page intentionally left blank' },
  { placeholder: true, alt: 'placeholder frame', caption: 'in progress — the eye is patient' },
  { placeholder: true, alt: 'placeholder frame', caption: 'reference found, courage pending' },
  { placeholder: true, alt: 'placeholder frame', caption: 'petrichor, if it had a face' },
]

export const ARTIST_INTRO =
  'a high-end sketchbook — slightly chaotic, fully curated. graphite first, opinions later.'

export const PRACTICE: string[] = [
  'I draw in pencil because pencil forgives. Every sketch here survived an eraser fight — and the eraser is a collaborator, not a correction.',
  'Portraits mostly: faces from film stills, anime frames that hit harder than they had any right to, strangers with good bone structure. The subject matters less than the shadow map — I am, at heart, someone who studies how things flow, and light over a cheekbone is just another boundary layer.',
  'The process is the same as the engineering: reference, rough pass, refinement, and knowing when to stop before you polish the life out of it.',
]

export const TOOLS_LINE = 'graphite, every grade · one loyal eraser · whatever paper is nearest · patience, intermittently'
