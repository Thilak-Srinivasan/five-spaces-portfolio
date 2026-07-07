import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { POEMS } from '../../content/poems'
import { prefersReducedMotion } from '../../canvas/useCanvasEffect'

/**
 * A paper notebook in the middle of the poet space. Click the right edge to
 * turn forward, the left edge to turn back; arrow keys work while hovered.
 */
export function PoetryNotebook() {
  const [page, setPage] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)
  const hovering = useRef(false)
  const lastDir = useRef<1 | -1>(1)
  const firstRender = useRef(true)

  const turn = useCallback((dir: 1 | -1) => {
    lastDir.current = dir
    setPage((p) => Math.min(Math.max(p + dir, 0), POEMS.length - 1))
  }, [])

  // page-turn animation, run after the page actually changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = pageRef.current
    if (!el || prefersReducedMotion()) return
    const tween = gsap.fromTo(
      el,
      { rotateY: lastDir.current * 12, x: lastDir.current * 36, opacity: 0, transformPerspective: 900 },
      { rotateY: 0, x: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
    )
    return () => {
      tween.kill()
    }
  }, [page])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hovering.current) return
      if (e.key === 'ArrowRight') turn(1)
      if (e.key === 'ArrowLeft') turn(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn])

  const poem = POEMS[page]
  const isProse = poem.kind === 'prose'

  return (
    <div
      className="relative mx-auto max-w-lg select-none"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* stacked-pages illusion */}
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-[var(--ink-dim)]/20 bg-[var(--bg-soft)]" aria-hidden />
      <div className="absolute inset-0 translate-x-3 translate-y-3 border border-[var(--ink-dim)]/10 bg-[var(--bg-soft)]/60" aria-hidden />

      <div className="relative overflow-hidden border border-[var(--ink-dim)]/30 bg-[#11141d]">
        {/* faint ruled lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 27px, var(--accent) 27px 28px)' }}
          aria-hidden
        />

        <div ref={pageRef} className="relative flex min-h-[430px] flex-col px-9 py-10 md:min-h-[460px] md:px-12">
          <p className="font-mono text-[9px] tracking-[0.4em] text-[var(--ink-dim)]/60">
            {poem.kind.toUpperCase()} · PAGE {String(page + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-4 font-serif text-2xl italic text-[var(--ink)]">{poem.title}</h3>
          <div className={`mt-6 flex-1 ${isProse ? 'space-y-5' : 'space-y-1.5'}`}>
            {poem.lines.map((line, i) =>
              line === '' ? (
                <div key={i} className="h-4" aria-hidden />
              ) : (
                <p
                  key={i}
                  className={`font-serif leading-relaxed text-[var(--ink-dim)] ${
                    isProse ? 'text-[16px] leading-[1.95]' : 'text-[17px]'
                  }`}
                >
                  {line}
                </p>
              ),
            )}
          </div>
          <p className="mt-8 text-right font-mono text-[9px] tracking-[0.35em] text-[var(--ink-dim)]/40">
            — keeper of quiet hearts
          </p>
        </div>

        {/* click zones: left = back, right = forward */}
        <button
          onClick={() => turn(-1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="group absolute inset-y-0 left-0 w-1/4 disabled:cursor-default"
        >
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 font-serif text-2xl transition-opacity ${
              page === 0 ? 'opacity-0' : 'opacity-25 group-hover:opacity-90'
            } text-[var(--accent)]`}
          >
            ‹
          </span>
        </button>
        <button
          onClick={() => turn(1)}
          disabled={page === POEMS.length - 1}
          aria-label="Next page"
          className="group absolute inset-y-0 right-0 w-1/4 disabled:cursor-default"
        >
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 font-serif text-2xl transition-opacity ${
              page === POEMS.length - 1 ? 'opacity-0' : 'opacity-25 group-hover:opacity-90'
            } text-[var(--accent)]`}
          >
            ›
          </span>
          {/* subtle dog-ear hint on the forward corner */}
          {page < POEMS.length - 1 && (
            <span
              className="absolute bottom-0 right-0 h-6 w-6 opacity-30 transition-opacity group-hover:opacity-70"
              style={{ background: 'linear-gradient(315deg, var(--accent) 0%, var(--accent) 48%, transparent 50%)' }}
              aria-hidden
            />
          )}
        </button>
      </div>

      {/* progress dots */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
        {POEMS.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setPage(i)}
            aria-label={`Page ${i + 1}: ${p.title}`}
            title={p.title}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === page ? 18 : 6,
              background: i === page ? 'var(--accent)' : 'color-mix(in srgb, var(--ink-dim) 45%, transparent)',
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[9px] tracking-[0.3em] text-[var(--ink-dim)]/50">
        {page + 1} / {POEMS.length}
      </p>
    </div>
  )
}
