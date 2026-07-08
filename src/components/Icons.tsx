interface IconProps {
  className?: string
}

const base = 'inline-block h-[18px] w-[18px] align-middle'

/* Brand icons use the official Simple Icons glyphs (24×24 grid, fill).
   Substack's glyph spans the full grid, so its viewBox is padded to keep
   all logos optically the same size. */

export function LinkedInIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-1 -1 26 26" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

export function GithubIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-1 -1 26 26" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-1 -1 26 26" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export function PinterestIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-1 -1 26 26" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
    </svg>
  )
}

export function SpotifyIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-1 -1 26 26" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.502 17.308c-.214.353-.675.464-1.027.25-2.813-1.72-6.353-2.108-10.523-1.156-.402.093-.803-.16-.895-.562-.093-.402.16-.803.562-.895 4.564-1.043 8.48-.594 11.633 1.336.353.214.464.674.25 1.027zm1.468-3.267c-.27.44-.845.578-1.284.308-3.22-1.98-8.13-2.554-11.94-1.397-.494.15-1.016-.129-1.166-.623-.149-.494.13-1.016.624-1.165 4.35-1.32 9.759-.68 13.458 1.593.44.27.578.845.308 1.284zm.126-3.403C15.24 8.35 8.82 8.14 5.14 9.256c-.59.18-1.213-.154-1.392-.744-.18-.59.153-1.213.744-1.392 4.226-1.283 11.25-1.035 15.68 1.595.53.315.705 1 .39 1.53-.314.53-1 .705-1.53.39z" />
    </svg>
  )
}

export function SubstackIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="-3 -3 30 30" fill="currentColor" className={`${base} ${className}`} aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
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

export function MusicIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={`${base} ${className}`} aria-hidden>
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
