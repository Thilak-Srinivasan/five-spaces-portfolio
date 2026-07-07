import { useEffect } from 'react'
import { MILES_JOURNAL } from '../content/easterEggs'

export function MilesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Anomaly journal entry"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-[#ff4fa3]/40 bg-[#0b0812] p-8 shadow-[0_0_60px_rgba(255,79,163,0.15)] md:p-12"
      >
        <p className="chromatic font-mono text-xs tracking-[0.3em] text-[#37f5c8]">{MILES_JOURNAL.title}</p>
        <h2 className="chromatic mt-2 font-grotesk text-2xl font-bold text-[#f2eefa]">
          the anomaly refuses the canon
        </h2>
        <p className="mt-1 font-mono text-[11px] text-[#6b6478]">{MILES_JOURNAL.subtitle}</p>
        <div className="mt-6 space-y-4 font-serif text-[17px] leading-relaxed text-[#dde3ee]">
          {MILES_JOURNAL.body.split('\n\n').map((para, i) => (
            <p key={i} className={para.trim() === 'I refused.' ? 'chromatic font-grotesk text-xl font-bold' : ''}>
              {para}
            </p>
          ))}
        </div>
        <button
          onClick={onClose}
          data-magnetic
          className="mt-8 border border-[#6b6478]/50 px-4 py-2 font-mono text-xs text-[#6b6478] transition-colors hover:border-[#ff4fa3] hover:text-[#ff4fa3]"
        >
          close portal · esc
        </button>
      </article>
    </div>
  )
}
