interface IconProps {
  className?: string
}

const base = 'inline-block h-[18px] w-[18px] align-middle'

export function LinkedInIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-3.8c0-1.3.9-2.2 2.2-2.2S16.5 12 16.5 13.2V17" strokeLinecap="round" />
    </svg>
  )
}

export function GithubIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="M9 19c-4 1.3-4-2.2-6-2.5M15 21v-3.3c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.8 11.8 0 0 0-6.2 0C6.5 3 5.5 3.3 5.5 3.3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.7c0 4.6 2.7 5.7 5.5 6-.5.5-.5 1-.5 2V21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MailIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExternalIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="M14 5h5v5M19 5l-8 8M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowLeftIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.1" strokeLinecap="round" strokeWidth="2.2" />
    </svg>
  )
}

export function PinterestIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.4 17.5c.4-1.8 1-4.4 1-4.4m.6-5.6c-1.5 0-2.6 1.2-2.6 2.5 0 .8.3 1.3.8 1.6m1.8-4.1c1.7 0 2.8 1.1 2.8 2.6 0 1.9-1 3.4-2.6 3.4-.8 0-1.4-.4-1.6-1" strokeLinecap="round" />
    </svg>
  )
}

export function PenIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 7 3 3" strokeLinecap="round" />
    </svg>
  )
}

export function MusicIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
