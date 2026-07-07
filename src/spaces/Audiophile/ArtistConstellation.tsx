import { TOP_ARTISTS } from '../../content/audiophile'

/**
 * Artists floating as a constellation — Joji dominant at center,
 * deterministic pseudo-random layout. Falls back to a tag cloud on mobile.
 */
export function ArtistConstellation() {
  // deterministic angular spiral around center
  const placed = TOP_ARTISTS.map((a, i) => {
    if (i === 0) return { ...a, x: 50, y: 46 }
    const angle = i * 2.39996 // golden angle
    const radius = 16 + (i % 4) * 9 + i * 1.2
    return {
      ...a,
      x: 50 + Math.cos(angle) * radius,
      y: 47 + Math.sin(angle) * radius * 0.62,
    }
  })

  return (
    <>
      {/* desktop constellation */}
      <div className="relative mx-auto hidden h-[460px] max-w-3xl md:block">
        {placed.map((a, i) => (
          <span
            key={a.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-grotesk font-bold transition-all duration-300 hover:scale-110"
            data-magnetic
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              fontSize: `${0.8 + a.weight * 2.6}rem`,
              color: i === 0 ? 'var(--accent)' : 'var(--ink)',
              opacity: 0.35 + a.weight * 0.65,
              textShadow: i === 0 ? '0 0 40px color-mix(in srgb, var(--accent) 50%, transparent)' : undefined,
              animation: `floaty ${6 + (i % 5)}s ease-in-out ${i * 0.4}s infinite`,
            }}
          >
            {a.name}
          </span>
        ))}
        <style>{`
          @keyframes floaty { 0%,100% { transform: translate(-50%,-50%) translateY(0); } 50% { transform: translate(-50%,-50%) translateY(-8px); } }
          @media (prefers-reduced-motion: reduce) { [style*='floaty'] { animation: none !important; } }
        `}</style>
      </div>
      {/* mobile tag cloud */}
      <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 md:hidden">
        {TOP_ARTISTS.map((a, i) => (
          <span
            key={a.name}
            className="font-grotesk font-bold"
            style={{
              fontSize: `${0.8 + a.weight * 1.4}rem`,
              color: i === 0 ? 'var(--accent)' : 'var(--ink)',
              opacity: 0.4 + a.weight * 0.6,
            }}
          >
            {a.name}
          </span>
        ))}
      </div>
    </>
  )
}
