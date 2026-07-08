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

export function SpotifyIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.308c-.214.353-.675.464-1.027.25-2.813-1.72-6.353-2.108-10.523-1.156-.402.093-.803-.16-.895-.562-.093-.402.16-.803.562-.895 4.564-1.043 8.48-.594 11.633 1.336.353.214.464.674.25 1.027zm1.468-3.267c-.27.44-.845.578-1.284.308-3.22-1.98-8.13-2.554-11.94-1.397-.494.15-1.016-.129-1.166-.623-.149-.494.13-1.016.624-1.165 4.35-1.32 9.759-.68 13.458 1.593.44.27.578.845.308 1.284zm.126-3.403C15.24 8.35 8.82 8.14 5.14 9.256c-.59.18-1.213-.154-1.392-.744-.18-.59.153-1.213.744-1.392 4.226-1.283 11.25-1.035 15.68 1.595.53.315.705 1 .39 1.53-.314.53-1 .705-1.53.39z" />
    </svg>
  )
}

export function SubstackIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
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
