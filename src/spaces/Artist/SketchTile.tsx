import { useState } from 'react'
import type { Sketch } from '../../content/artist'

/**
 * Image renders as a pencil-outline (filter mix) until hover/tap, where it
 * dissolves into full resolution. Missing files degrade to placeholder frames.
 */
export function SketchTile({ sketch }: { sketch: Sketch }) {
  const [failed, setFailed] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const isPlaceholder = sketch.placeholder || failed

  return (
    <figure className="group mb-5 break-inside-avoid" onTouchStart={() => setRevealed((r) => !r)}>
      <div
        data-magnetic
        className="relative overflow-hidden border border-[var(--ink-dim)]/30 bg-[var(--bg-soft)]"
        style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.35)' }}
      >
        {isPlaceholder ? (
          <div
            className="flex aspect-[3/4] items-center justify-center p-6"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(201,196,184,0.06) 0 1px, transparent 1px 8px), repeating-linear-gradient(-45deg, rgba(201,196,184,0.04) 0 1px, transparent 1px 10px)',
            }}
          >
            <p className="text-center font-serif text-sm italic text-[var(--ink-dim)]">{sketch.caption}</p>
          </div>
        ) : (
          <img
            src={sketch.src}
            alt={sketch.alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`block w-full transition-all duration-700 ease-out ${
              revealed
                ? ''
                : 'grayscale contrast-[1.55] brightness-110 invert-[0.06] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:invert-0'
            }`}
          />
        )}
      </div>
      {!isPlaceholder && (
        <figcaption className="mt-2 font-mono text-[10px] tracking-[0.25em] text-[var(--ink-dim)]">
          {sketch.caption}
        </figcaption>
      )}
    </figure>
  )
}
