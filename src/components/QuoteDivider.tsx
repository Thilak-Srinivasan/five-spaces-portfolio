import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { QUOTES } from '../content/quotes'

gsap.registerPlugin(ScrollTrigger)

/** Serif-italic quote between sections; index into the 10 supplied quotes. */
export function QuoteDivider({ index }: { index: number }) {
  const ref = useRef<HTMLQuoteElement>(null)
  const quote = QUOTES[index % QUOTES.length]

  useEffect(() => {
    const el = ref.current!
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="mx-auto my-28 flex max-w-2xl items-center gap-6 px-6">
      <span className="h-px flex-1 bg-[var(--ink-dim)] opacity-30" />
      <blockquote ref={ref} className="max-w-md text-center font-serif text-lg italic leading-relaxed text-[var(--ink-dim)]">
        “{quote}”
      </blockquote>
      <span className="h-px flex-1 bg-[var(--ink-dim)] opacity-30" />
    </div>
  )
}
