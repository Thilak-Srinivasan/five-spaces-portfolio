import { useState } from 'react'
import type { ReactNode } from 'react'

/** Polaroid-framed photo with washi tape and a handwritten caption. */
export function Polaroid({ src, alt, caption, tilt = -1.5 }: { src: string; alt: string; caption: string; tilt?: number }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <figure
      className="relative mx-auto w-fit max-w-sm bg-[#f2efe6] p-3 pb-2 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className="tape" aria-hidden />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="block w-full object-cover"
      />
      <figcaption className="px-1 pb-1 pt-3 text-center font-hand text-xl leading-snug text-[#3a3630]">
        {caption}
      </figcaption>
    </figure>
  )
}

/** A black taped note, like a thought pinned to the page. */
export function TapedNote({ children, tilt = 1 }: { children: ReactNode; tilt?: number }) {
  return (
    <div
      className="relative mx-auto max-w-xs bg-[#101318] px-7 py-8 shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className="tape" aria-hidden />
      <p className="text-center font-hand text-2xl leading-relaxed text-[#e8e4da]">{children}</p>
    </div>
  )
}

/** A handwritten margin note — small, tilted, human. */
export function MarginNote({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-hand text-xl leading-snug text-[var(--ink-dim)] ${className}`} style={{ transform: 'rotate(-1.2deg)' }}>
      {children}
    </p>
  )
}

/** A cinema ticket stub. */
export function TicketStub({ top, main, sub, tilt = -1 }: { top: string; main: string; sub?: string; tilt?: number }) {
  return (
    <div
      className="relative mx-auto w-fit border border-dashed border-[var(--ink-dim)]/50 bg-[#efe9dc] px-6 py-4 text-[#2b2620] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className="tape" aria-hidden />
      <p className="font-mono text-[9px] tracking-[0.4em] text-[#8a8071]">{top}</p>
      <p className="mt-1 font-grotesk text-lg font-bold tracking-wide">{main}</p>
      {sub && <p className="mt-0.5 font-hand text-lg text-[#5c5346]">{sub}</p>}
    </div>
  )
}
