import { CharcoalDust } from '../../canvas/CharcoalDust'
import { GraphiteTrail } from '../../canvas/GraphiteTrail'
import { useCanvasEffect } from '../../canvas/useCanvasEffect'
import { QuoteDivider } from '../../components/QuoteDivider'
import { ExternalIcon } from '../../components/Icons'
import { ARTIST_INTRO, PRACTICE, SKETCHES, TOOLS_LINE } from '../../content/artist'
import { LINKS } from '../../content/links'
import { SketchTile } from './SketchTile'
import { MarginNote } from '../../components/Collage'
import theEye from '../../assets/extras/the-eye.jpg'

export function ArtistSpace() {
  const { ref, reduced } = useCanvasEffect(() => new GraphiteTrail(), { trackPointer: true })
  const dust = useCanvasEffect(() => new CharcoalDust())

  return (
    <div className="paper-grain relative min-h-screen">
      <div className="fixed inset-0" aria-hidden>
        {dust.reduced ? <div className="canvas-fallback h-full w-full" /> : <canvas ref={dust.ref} className="h-full w-full" />}
      </div>
      {!reduced && <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden />}

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-32">
        <section className="mb-16 max-w-lg">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[var(--accent2)]">DIMENSION 03 · FIELD NOTES, GRAPHITE</p>
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

        {/* graphite swatches — the palette */}
        <section className="mb-16">
          <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">THE PALETTE — ALL SIX OF IT</p>
          <div className="flex max-w-md overflow-hidden rounded-sm border border-[var(--ink-dim)]/30">
            {[
              ['2H', '#b9b5ac'],
              ['HB', '#96928a'],
              ['2B', '#726e67'],
              ['4B', '#514e49'],
              ['6B', '#33312e'],
              ['8B', '#191817'],
            ].map(([grade, hex]) => (
              <div key={grade} className="group/swatch flex-1 py-5 text-center transition-transform hover:-translate-y-1" style={{ background: hex }}>
                <span className={"font-mono text-[10px] font-bold tracking-widest " + (grade === '2H' || grade === 'HB' ? 'text-[#26241f]' : 'text-[#d8d4cb]')}>{grade}</span>
              </div>
            ))}
          </div>
          <MarginNote className="mt-3">who needs color when you have six kinds of dark?</MarginNote>
        </section>

        {/* masonry */}
        <section>
          <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-[var(--ink-dim)]">THE PAGES</p>
          <MarginNote className="-mt-2 mb-6">always the eyes first. if the eyes are wrong, nothing else matters.</MarginNote>
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
