# The Four Spaces — Experiential Portfolio for Thilak S

**Date:** 2026-07-07
**Status:** Approved design (v1)

## Purpose

A cinematic, immersive single-page portfolio that presents four facets of one identity — The Engineer, The Poet, The Artist, The Audiophile — with Awwwards-grade motion design. Deep-space matte black / midnight slate base, electric blue + telemetry red accents. Built locally; deployment decided later.

## Stack & Architecture

- **Vite + React 18 + Tailwind CSS** (static SPA, no backend).
- **GSAP 3** (ScrollTrigger, SplitText) for kinetic typography and scene transitions; **Lenis** for inertial smooth scroll; **Three.js** for the landing starfield only. Persona-specific effects are hand-rolled Canvas 2D classes.
- **State:** `PersonaContext` holding `null | engineer | poet | artist | audiophile`. Persona switch morphs CSS custom properties (background, accent, fonts, cursor, selection color) via a full-screen GSAP wipe. Hash sync (`#/engineer`) for deep links; no router.
- **Typography:** Space Grotesk (technical sans), Cormorant Garamond (poetic serif), JetBrains Mono (telemetry micro-labels). Google Fonts.
- **Module layout:**
  - `src/spaces/{Engineer,Poet,Artist,Audiophile}/` — one folder per space
  - `src/canvas/` — isolated effect classes (`mount/resize/destroy` interface): `Starfield3D`, `WindTunnel`, `RainDrift`, `GraphiteTrail`, `Waveform`
  - `src/theme/personas.ts` — single source of truth for per-persona colors/fonts/cursor
  - `src/content/*.ts` — all copy, project data, quotes, Wrapped stats as typed content files
  - `src/components/` — shared: `MagneticCursor`, `QuoteDivider`, `Preloader`, `CommandOverlay`, `Footer`

## Entry Sequence

1. **Preloader:** solver-log styled progress (`initializing mesh… loading personas…`) + rotating quote ("Oh boy, the paradox of choice.").
2. **Hero:** Three.js starfield with mouse parallax; name revealed via SplitText; subheading "Computational researcher. Poet. Artist. Drunk on music."
3. **Four Panels:** full-viewport vertical split — 01 Engineer / 02 Poet / 03 Artist / 04 Audiophile. Panels expand magnetically on hover with a cheap canvas teaser (particles / rain / sketch-lines / waveform). Click → panel swallows screen → theme morph → space mounts.

## The Four Spaces

### 1. The Engineer (electric blue #2E6FFF + telemetry red #FF2A3C on matte black)
- **Wind-tunnel canvas:** particle streamlines deflecting around section headings and project cards as boundaries; velocity-colored particles, red recirculation zones behind cards; recomputes on scroll.
- **F1 telemetry HUD framing:** mono readouts, lap-delta section numbers.
- **Content** (from thilak-srinivasan.github.io):
  - Dual Degree: Integrated M.Sc. Mathematics + B.E. Mechanical, BITS Pilani (2022–2027), Finance minor.
  - Summer Research Fellow, IIT Madras × Intel — non-conventional blower CFD, aeroacoustics, 15–65 W thermal.
  - Experience: IGCAR Kalpakkam (dynamics/control), Ganpat U (bipedal robotics, PyBullet/ZMP), Lurnable, Finlatics.
  - 9-project grid filterable by CFD / Thermal / AI-ML / Robotics / Finance (three-phase VOF+AMR, compressible N-S solver, livestock shelter PCM, capsule endoscopy multiphysics, EV battery thermal, AI predictive maintenance, TCS time series, nonlinear regression, V6 piston assembly).
  - Skills strip: Python, C/C++, MATLAB, Basilisk C, ANSYS Fluent, COMSOL, FVM/VOF/AMR, PyBullet…
  - Publication: LEAD 2025 SCM paper; certifications (IISc CeNSE distinction, COMSOL battery).

### 2. The Poet (midnight slate, ultra-spacious, serif)
- Hard cut to near-empty space: slow rain-grain drift (petrichor), lines typing themselves into whitespace on scroll.
- **Voice** (distilled from pieces Thilak resonates with — Dostoevsky's furnace of doubt, "no feeling is final," amor fati / paradox of infinite options, the slow burn of becoming, the art of being unreachable, love as chosen madness, unrot your brain, mythology-as-lens; influences: Roxie Nafousi, Sylvia Plath): nostalgic, tender-but-defiant, faith clawed from doubt, finding beauty in the ache. Bio written in this register — nostalgia for high school, petrichor as muse, black/blue as identity.
- **Poem interludes:** 3–4 short original-feeling verse fragments in this voice presented as scroll-typed lines (final poem texts to be replaced by Thilak's own when he supplies them; placeholders clearly marked in `content/poet.ts`).
- **Links:** *Daydreaming* anthology ("All I Ever Wrote", Jan 2025), Instagram @whispers._in._ink, Substack @keeperofquiethearts ("art | poetry | life").

### 3. The Artist (charcoal, paper-grain texture)
- Masonry sketchbook gallery; images render as pencil-outline (grayscale/contrast/invert filter mix) until hover → dissolve to full resolution; graphite-smudge cursor trail.
- **Assets:** the portrait study and the Shigaraki piece (image files to be dropped into `src/assets/sketches/`; gallery reads a manifest so adding files is trivial). Styled placeholder frames for future work.
- Pinterest (in.pinterest.com/sthilak2004) as a "reference board" card.

### 4. The Audiophile (black, neon Wrapped palette)
- Continuous background waveform canvas reacting to scroll velocity + cursor.
- **Wrapped timeline** (animated counters, repeat-number Wrapped styling):
  - 2022 — 15,716 min · top 6% India
  - 2023 — 76,130 min · top 2% worldwide · peak July 9: 827 min
  - 2024 — ~74–76k min (steady era)
  - 2025 — 75,309 min · top 2% worldwide · peak Oct 5: 796 min
- **AI listening-day card:** May 24 2025 — "a bedroom pop labyrinth… 12 hours of gentle loops" — 753 min, 231 tracks, 102 artists (Strawberry Guy → Men I Trust → Beach House → Billie Eilish → Tamil/Malayalam/Hindi pop → XXXTENTACION).
- **Top artists constellation:** Joji (dominant), Cigarettes After Sex, Weyes Blood, Lithe, OXYBUZ, Tame Impala, Yuvan Shankar Raja, Anirudh Ravichander.
- **Listening personality:** "The Adventurer" / ENVU card.
- **Easter egg:** first day on Spotify — April 13 2021, first stream "Black Swan" (BTS), 20,993 songs by 2021.
- Screenshot story-strip (swipeable) once image files are provided; Spotify profile link.

## Connective Tissue & Easter Eggs

- Magnetic cursor with per-space personality (telemetry crosshair / ink dot / graphite / pulse ring).
- Quote dividers cycling the 10 supplied quotes.
- Rick nod: clicking a "C-137" footnote triggers a portal-green screen flicker.
- ⌘K command overlay for fast travel between spaces.
- Footer: LinkedIn, GitHub, email, "We only attract what we subconsciously believe we are worthy of receiving."

## Non-functional

- `prefers-reduced-motion` → canvas effects replaced by static gradients.
- Effects pause when their space is inactive; images lazy-load.
- Responsive: 4-panel split becomes stacked horizontal bands on mobile.
- Verification: `npm run build` clean + browser walkthrough of all spaces at desktop/mobile widths.

## Out of scope (v1)

- Deployment/CI, CMS, real audio playback, Spotify API integration, blog engine.
