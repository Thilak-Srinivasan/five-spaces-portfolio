export interface Sketch {
  src?: string
  alt: string
  caption: string
  placeholder?: boolean
}

// Drop image files into src/assets/sketches/ and update src paths here.
export const SKETCHES: Sketch[] = [
  {
    src: new URL('../assets/sketches/portrait-study.jpg', import.meta.url).href,
    alt: 'Pencil portrait study of a young man, loose expressive strokes',
    caption: 'portrait study · graphite',
  },
  {
    src: new URL('../assets/sketches/shigaraki.jpg', import.meta.url).href,
    alt: 'Pencil drawing of Tomura Shigaraki with hands over his face',
    caption: 'shigaraki · graphite on paper',
  },
  { placeholder: true, alt: 'placeholder frame', caption: 'next page intentionally left blank' },
  { placeholder: true, alt: 'placeholder frame', caption: 'in progress — the eye is patient' },
  { placeholder: true, alt: 'placeholder frame', caption: 'reference found, courage pending' },
  { placeholder: true, alt: 'placeholder frame', caption: 'petrichor, if it had a face' },
]

export const ARTIST_INTRO =
  'a high-end sketchbook — slightly chaotic, fully curated. graphite first, opinions later.'
