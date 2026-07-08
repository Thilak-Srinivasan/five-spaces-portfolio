import { useRef, useState } from 'react'
import gsap from 'gsap'
import { LINKS } from '../content/links'
import { C137_NOTE } from '../content/easterEggs'
import { MilesModal } from './MilesModal'
import { GithubIcon, InstagramIcon, LinkedInIcon, MailIcon, PinterestIcon, SpotifyIcon, SubstackIcon } from './Icons'

export function Footer() {
  const [milesOpen, setMilesOpen] = useState(false)
  const [portalNote, setPortalNote] = useState(false)
  const flickerRef = useRef<HTMLDivElement>(null)

  const firePortal = () => {
    const el = flickerRef.current!
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 0.55,
        duration: 0.08,
        repeat: 5,
        yoyo: true,
        ease: 'none',
        onComplete: () => {
          gsap.set(el, { opacity: 0 })
          setPortalNote(true)
          setTimeout(() => setPortalNote(false), 3000)
        },
      },
    )
  }

  return (
    <footer className="relative border-t border-[var(--ink-dim)]/20 px-6 py-12">
      <div
        ref={flickerRef}
        className="pointer-events-none fixed inset-0 z-[85] opacity-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(80, 255, 130, 0.5), rgba(20, 120, 60, 0.3))' }}
        aria-hidden
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        <div className="flex items-center gap-6 text-[var(--ink-dim)]">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" data-magnetic aria-label="LinkedIn" className="transition-colors hover:text-[var(--accent)]">
            <LinkedInIcon />
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" data-magnetic aria-label="GitHub" className="transition-colors hover:text-[var(--accent)]">
            <GithubIcon />
          </a>
          <a href={LINKS.email} data-magnetic aria-label="Email" className="transition-colors hover:text-[var(--accent)]">
            <MailIcon />
          </a>
          <a href={LINKS.spotify} target="_blank" rel="noreferrer" data-magnetic aria-label="Spotify" className="transition-colors hover:text-[var(--accent)]">
            <SpotifyIcon />
          </a>
          <a href={LINKS.instagramPoetry.url} target="_blank" rel="noreferrer" data-magnetic aria-label="Instagram poetry — @whispers._in._ink" className="transition-colors hover:text-[var(--accent)]">
            <InstagramIcon />
          </a>
          <a href={LINKS.substack.url} target="_blank" rel="noreferrer" data-magnetic aria-label="Substack — @keeperofquiethearts" className="transition-colors hover:text-[var(--accent)]">
            <SubstackIcon />
          </a>
          <a href={LINKS.pinterest} target="_blank" rel="noreferrer" data-magnetic aria-label="Pinterest" className="transition-colors hover:text-[var(--accent)]">
            <PinterestIcon />
          </a>
        </div>
        <p className="max-w-md text-center font-serif text-sm italic leading-relaxed text-[var(--ink-dim)]">
          “We only attract what we subconsciously believe we are worthy of receiving.”
        </p>
        <div className="flex items-center gap-5 font-mono text-[10px] tracking-widest text-[var(--ink-dim)]/60">
          <span>© {new Date().getFullYear()} THILAK S</span>
          <button onClick={firePortal} data-magnetic className="transition-colors hover:text-[#50ff82]" title="don't">
            dimension C-137
          </button>
          <button onClick={() => setMilesOpen(true)} data-magnetic className="glitch-text transition-colors hover:text-[#ff4fa3]">
            anomaly?
          </button>
        </div>
        {portalNote && <p className="font-mono text-[10px] text-[#50ff82]">{C137_NOTE}</p>}
      </div>
      {milesOpen && <MilesModal onClose={() => setMilesOpen(false)} />}
    </footer>
  )
}
