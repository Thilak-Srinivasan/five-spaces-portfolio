import { GraphiteTrail } from '../../canvas/GraphiteTrail'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { ExternalIcon } from '../../components/Icons'
import { ARTIST_INTRO, PRACTICE, SKETCHES, TOOLS_LINE } from '../../content/artist'
import { LINKS } from '../../content/links'
import { SketchTile } from './SketchTile'
import theEye from '../../assets/extras/the-eye.jpg'

export function ArtistSpace() {
  const { ref, reduced } = useCanvasEffect(() => new GraphiteTrail(), { trackPointer: true })

  return (
    <div className="paper-grain relative min-h-screen">
      {!reduced && <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden />}

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        <section className="mb-16 max-w-lg">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent2)]">FIELD NOTES · GRAPHITE</p>
          <h1 className="mt-4 font-grotesk text-5xl font-bold text-[var(--ink)] md:text-6xl">THE EYE</h1>
          <p className="mt-5 font-serif text-lg italic leading-relaxed text-[var(--ink-dim)]">{ARTIST_INTRO}</p>
          <p className="mt-3 font-mono text-[10px] tracking-widest text-[var(--ink-dim)]/60">
            hover to develop · pencil first, always
          </p>
        </section>

        {/* the practice — why and how */}
        <section className="mb-20 grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            {PRACTICE.map((para, i) => (
              <p key={i} className="font-serif text-[17px] leading-[1.9] text-[var(--ink-dim)]">
                {para}
              </p>
            ))}
          </div>
          <div className="flex flex-col justify-between border border-[var(--ink-dim)]/25 bg-[var(--bg-soft)]/60 p-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">THE KIT</p>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-[var(--ink)]">{TOOLS_LINE}</p>
            </div>
            <img
              src={theEye}
              alt="The artist's desk — pencils, eraser, paper"
              loading="lazy"
              className="my-6 w-full rounded-sm border border-[var(--ink-dim)]/25 object-cover opacity-90 grayscale-[0.3] transition-all duration-700 hover:opacity-100 hover:grayscale-0"
            />
            <p className="font-mono text-[10px] leading-relaxed tracking-widest text-[var(--ink-dim)]/60">
              LIGHT OVER A CHEEKBONE
              <br />
              IS JUST ANOTHER
              <br />
              BOUNDARY LAYER.
            </p>
          </div>
        </section>

        {/* masonry */}
        <section>
          <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">THE PAGES</p>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {SKETCHES.map((s) => (
              <SketchTile key={s.caption} sketch={s} />
            ))}
          </div>
        </section>

        <QuoteDivider index={4} />

        {/* pinterest reference board */}
        <section className="mx-auto max-w-md">
          <a
            href={LINKS.pinterestSketches}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="group block border border-[var(--ink-dim)]/30 bg-[var(--bg-soft)]/80 p-8 text-center transition-colors hover:border-[var(--accent)]"
          >
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">THE REFERENCE BOARD</p>
            <p className="mt-3 font-serif text-xl italic text-[var(--ink)]">
              where the chaos gets curated <ExternalIcon className="ml-1 opacity-60 group-hover:opacity-100" />
            </p>
            <p className="mt-2 font-mono text-[11px] text-[var(--ink-dim)]">pinterest / sthilak2004</p>
          </a>
        </section>
      </div>
    </div>
  )
}
