# The Four Spaces Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved "Four Spaces" experiential portfolio (spec: `docs/superpowers/specs/2026-07-07-four-spaces-portfolio-design.md`) as a polished Vite + React + Tailwind SPA.

**Architecture:** Single-page app. A `PersonaContext` drives CSS custom properties and mounts one of four space components over a shared shell (preloader → starfield hero → four-panel landing). All canvas effects are isolated classes implementing a common `CanvasEffect` interface, mounted via one hook. All copy/data live in typed files under `src/content/`.

**Tech Stack:** Vite (React + TS), Tailwind CSS v3, GSAP 3 (ScrollTrigger, SplitText), Lenis, Three.js.

**Verification model:** This is a visual/creative build with no business logic to unit-test; each task's test is `npm run build` passing clean plus a Preview-browser check of the described behavior. Commit after every task.

---

### Task 1: Scaffold project

**Files:** Create Vite app in repo root (`four-spaces-portfolio/`), add deps, Tailwind config, fonts.

- [ ] `npm create vite@latest . -- --template react-ts` (into existing repo root; keep `docs/` and `.git`)
- [ ] `npm i gsap lenis three && npm i -D tailwindcss@3 postcss autoprefixer @types/three && npx tailwindcss init -p`
- [ ] `tailwind.config.js` content: `["./index.html", "./src/**/*.{ts,tsx}"]`; extend fonts:
  ```js
  fontFamily: {
    grotesk: ['"Space Grotesk"', 'sans-serif'],
    serif: ['"Cormorant Garamond"', 'serif'],
    mono: ['"JetBrains Mono"', 'monospace'],
  }
  ```
- [ ] `index.html`: title "Thilak S — The Four Spaces", Google Fonts link for Space Grotesk (400/500/700), Cormorant Garamond (400/500 italic), JetBrains Mono (400/500), `<body class="bg-[#07080c]">`.
- [ ] `src/index.css`: Tailwind directives + base CSS variables (see Task 2) + `html { scrollbar-width: thin }`, `::selection` using `var(--accent)`.
- [ ] Verify: `npm run build` passes. Commit: `chore: scaffold vite react-ts + tailwind + gsap/lenis/three`.

### Task 2: Theme system & PersonaContext

**Files:**
- Create: `src/theme/personas.ts`, `src/state/PersonaContext.tsx`

- [ ] `src/theme/personas.ts` — single source of truth:
  ```ts
  export type PersonaId = 'engineer' | 'poet' | 'artist' | 'audiophile';
  export interface PersonaTheme {
    id: PersonaId; index: string; title: string; tagline: string;
    bg: string; bgSoft: string; accent: string; accent2: string;
    ink: string; inkDim: string; headingFont: string; bodyFont: string;
    cursor: 'crosshair-telemetry' | 'ink-dot' | 'graphite' | 'pulse-ring';
  }
  export const PERSONAS: Record<PersonaId, PersonaTheme> = {
    engineer:   { id:'engineer', index:'01', title:'The Engineer', tagline:'flow, resolved.',
      bg:'#07080c', bgSoft:'#0c0f16', accent:'#2e6fff', accent2:'#ff2a3c',
      ink:'#e8ecf4', inkDim:'#66707f', headingFont:'var(--font-grotesk)', bodyFont:'var(--font-grotesk)', cursor:'crosshair-telemetry' },
    poet:       { id:'poet', index:'02', title:'The Poet', tagline:'petrichor, in writing.',
      bg:'#0a0d14', bgSoft:'#0e1220', accent:'#8fa8d8', accent2:'#3d5a80',
      ink:'#dde3ee', inkDim:'#5c6577', headingFont:'var(--font-serif)', bodyFont:'var(--font-serif)', cursor:'ink-dot' },
    artist:     { id:'artist', index:'03', title:'The Artist', tagline:'graphite over silence.',
      bg:'#0d0d0f', bgSoft:'#131316', accent:'#c9c4b8', accent2:'#8a8478',
      ink:'#eceae4', inkDim:'#6e6a61', headingFont:'var(--font-grotesk)', bodyFont:'var(--font-serif)', cursor:'graphite' },
    audiophile: { id:'audiophile', index:'04', title:'The Audiophile', tagline:'drunk on music.',
      bg:'#08070b', bgSoft:'#100c16', accent:'#c8ff3e', accent2:'#ff4fa3',
      ink:'#f2eefa', inkDim:'#6b6478', headingFont:'var(--font-grotesk)', bodyFont:'var(--font-grotesk)', cursor:'pulse-ring' },
  };
  ```
- [ ] `PersonaContext.tsx`: `{ active: PersonaId | null, enter(id), exit() }`. `enter/exit` write `location.hash` (`#/engineer` etc.); a `hashchange` listener + init-read make deep links work. On change, set CSS vars on `document.documentElement` (`--bg --bg-soft --accent --accent2 --ink --ink-dim --heading-font --body-font`) from the persona (or landing defaults when `null`), and set `data-cursor` attribute on `<html>`.
- [ ] Landing defaults in `src/index.css` `:root`: bg `#07080c`, accent `#2e6fff`, ink `#e8ecf4`, dim `#66707f`, heading grotesk, body grotesk; also `--font-grotesk/--font-serif/--font-mono` literals.
- [ ] Verify build. Commit: `feat: persona theme system with css-variable morphing and hash deep links`.

### Task 3: Content files

**Files:** Create `src/content/engineer.ts`, `poet.ts`, `artist.ts`, `audiophile.ts`, `quotes.ts`, `easterEggs.ts`, `links.ts`.

- [ ] `links.ts`: linkedin, github, email, portfolio, instagramPoetry (`https://www.instagram.com/whispers._in._ink` label `@whispers._in._ink`), substack (`https://substack.com/@keeperofquiethearts`), pinterest (`https://in.pinterest.com/sthilak2004/`), spotify profile URL from spec.
- [ ] `quotes.ts`: the 10 supplied quotes as `string[]` in spec order.
- [ ] `engineer.ts`: education (dual degree, finance minor), `experience[]` (IITM×Intel fellow, IGCAR, Ganpat U robotics, Lurnable, Finlatics — dates + 1-line detail each from spec), `projects[]` with `{title, tag: 'CFD'|'Thermal'|'AI/ML'|'Robotics'|'Finance'|'Manufacturing', blurb, metrics?}` — all 9 projects, `skills[]` strip, `publication`, `certs[]`.
- [ ] `poet.ts`: `bio` paragraphs in the distilled register (nostalgia, petrichor, black/blue, quiet-Connell duality, furnace-of-doubt faith, "no feeling is final"), `interludes[]` = 4 short verse fragments (marked `// PLACEHOLDER — replace with Thilak's published lines`), `credits` (Daydreaming anthology "All I Ever Wrote", Jan 2025), links.
- [ ] `artist.ts`: `sketches[]` manifest `{src, alt, caption, w, h}` referencing `src/assets/sketches/portrait-study.jpg` and `shigaraki.jpg` plus 4 placeholder frames `{placeholder:true, caption}`.
- [ ] `audiophile.ts`: `wrapped[]` = `{year, minutes, note, peak?}` for 2022 (15716, top 6% India), 2023 (76130, top 2% worldwide, peak 'July 9 · 827 min'), 2024 (~75000, 'the steady era'), 2025 (75309, top 2% worldwide, peak 'October 5 · 796 min'); `listeningDay` (May 24 2025 card text, 753 min / 231 tracks / 102 artists, artist chain); `topArtists[]` ordered: Joji, Cigarettes After Sex, Weyes Blood, Lithe, OXYBUZ, Tame Impala, april27, Billie Eilish, The Neighbourhood, Asal, Crystal Castles, mehro, Yuvan Shankar Raja, Anirudh Ravichander (Joji `weight: 1`, others 0.2–0.5); `personality` (The Adventurer / ENVU line); `firstDay` (April 13 2021, Black Swan — BTS, 20,993 songs by 2021).
- [ ] `easterEggs.ts`: `milesJournal` = user's verbatim journal text (multi-line string), `c137` flicker copy.
- [ ] Verify build. Commit: `feat: typed content files for all four spaces`.

### Task 4: Canvas infrastructure

**Files:** Create `src/canvas/CanvasEffect.ts`, `src/canvas/useCanvasEffect.ts`.

- [ ] Interface + hook:
  ```ts
  export interface CanvasEffect {
    mount(canvas: HTMLCanvasElement): void;
    resize(w: number, h: number): void;
    destroy(): void;
    setPointer?(x: number, y: number): void;
    setScrollVelocity?(v: number): void;
    setBoundaries?(rects: DOMRect[]): void;
  }
  ```
  `useCanvasEffect(factory)` returns a `ref`; it instantiates on mount, wires `ResizeObserver` + rAF-safe teardown, respects `matchMedia('(prefers-reduced-motion: reduce)')` by not mounting (component shows its static-gradient fallback class instead), and pauses via `IntersectionObserver` (effects only tick while visible; each effect keeps its own rAF loop and exposes internal `running` flag toggled by the hook).
- [ ] Verify build. Commit: `feat: canvas effect interface + mounting hook with reduced-motion and visibility handling`.

### Task 5: Preloader + Lenis + app shell

**Files:** Create `src/components/Preloader.tsx`, modify `src/App.tsx`, `src/main.tsx`.

- [ ] `Preloader`: fixed matte-black overlay; JetBrains Mono lines appended on a timer (`initializing mesh…`, `resolving boundary layers…`, `loading personas…`, `convergence reached.`) with a percentage counter; centered italic quote "Oh boy, the paradox of choice."; GSAP fade+clip-path exit after ~2.2 s, then calls `onDone`.
- [ ] `App.tsx`: `<PersonaProvider>` wrapping `{loading ? <Preloader/> : active ? <SpaceRoot/> : <Landing/>}`; init Lenis once with `lerp: 0.08`, connect to GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`.
- [ ] Verify in Preview: preloader plays then reveals empty landing stub. Commit: `feat: preloader with solver-log entrance and lenis smooth scroll`.

### Task 6: Starfield hero + four-panel landing

**Files:** Create `src/canvas/Starfield3D.ts`, `src/sections/Hero.tsx`, `src/sections/FourPanels.tsx`, `src/sections/Landing.tsx`.

- [ ] `Starfield3D` (Three.js): ~2500 `THREE.Points` in a sphere, additive blending, two hues (blue/white), slow z-drift + mouse-parallax camera offset (`setPointer`), fully disposed in `destroy()`.
- [ ] `Hero`: full-viewport starfield canvas; name "THILAK S" oversized (clamp 4rem–12rem) revealed with SplitText chars stagger; sub-line "Computational researcher. Poet. Artist. Drunk on music."; mono micro-copy "exploring the existence of life and Earth — happily"; scroll cue arrow.
- [ ] `FourPanels`: `h-screen flex` (mobile: `flex-col`), one panel per persona from `PERSONAS`. Panel: dark slice, accent edge-glow (`box-shadow inset`), index + title (vertical writing-mode on desktop), tagline appears on hover; hover flex-grow 1 → 2.2 via GSAP; per-panel cheap CSS/canvas teaser: engineer = animated streamline lines (CSS gradient animation), poet = falling-grain overlay, artist = crosshatch texture, audiophile = equalizer bars (CSS keyframes). Click → GSAP: panel scales to fill viewport, overlay fades to persona `bg`, then `enter(id)`.
- [ ] Verify in Preview: hero type reveal, parallax, panel hover/click transition. Commit: `feat: starfield hero and four-panel landing with morph transition`.

### Task 7: Space shell, magnetic cursor, quote dividers, footer, ⌘K overlay

**Files:** Create `src/components/SpaceShell.tsx`, `MagneticCursor.tsx`, `QuoteDivider.tsx`, `Footer.tsx`, `CommandOverlay.tsx`, `src/sections/SpaceRoot.tsx`.

- [ ] `SpaceShell`: top bar (back "← all spaces" → `exit()`, persona index/title in mono, other-space dots), children, `Footer`. Entry animation: full-screen accent wipe (GSAP clip-path) on persona change.
- [ ] `MagneticCursor`: fixed dot + lagging ring (`gsap.quickTo`), variant from `data-cursor` attr (crosshair renders two hairlines + ring; ink-dot small filled; graphite slightly blurred square; pulse-ring animated scale). Magnetic attraction to `[data-magnetic]` elements (translate toward center within 60 px). Hidden on touch devices (`pointer: coarse`).
- [ ] `QuoteDivider`: `{index}` prop → quote from `quotes.ts`, serif italic, SplitText line reveal on ScrollTrigger, hairline rules.
- [ ] `Footer`: links from `links.ts` (Lucide-style inline SVG icons — hand-drawn minimal set in one `Icons.tsx`), worthiness quote, and a mono footnote `dimension C-137` that on click flickers the screen portal-green (GSAP overlay, 0.6 s) — plus a small `anomaly?` glitch-text button that opens the Miles journal modal (Task 11 wires modal; here render stub button).
- [ ] `CommandOverlay`: `⌘K`/`ctrl+K`/`?` opens dim overlay listing the four spaces + "home"; arrow/enter or click navigates; ESC closes.
- [ ] `SpaceRoot`: reads `active`, renders matching space inside `SpaceShell`.
- [ ] Verify in Preview: cursor variants, ⌘K travel, back button. Commit: `feat: space shell, magnetic cursor, dividers, footer, command overlay`.

### Task 8: The Engineer space + WindTunnel canvas

**Files:** Create `src/canvas/WindTunnel.ts`, `src/spaces/Engineer/EngineerSpace.tsx` (+ small `ProjectCard.tsx`, `TelemetryStat.tsx` in same folder).

- [ ] `WindTunnel` core (Canvas 2D, ~700 particles):
  ```ts
  // per frame: p.x += vx*dt; steady left→right field u0;
  // for each boundary rect (inflated 30px, rounded), if particle inside influence zone,
  // add tangential deflection: compute nearest point on rect, normal n, distance d;
  // v += n * k / (d*d) (repulsion) + tangent * k2/d (slip), clamp speed;
  // color by speed: slow = #1b3a8f → fast = #6ea8ff; particles behind rect within wake
  // band get accent2 red tint (recirculation); respawn at x<0 with jittered y.
  ```
  `setBoundaries(rects)` called by the space on scroll/resize with `getBoundingClientRect()` of `[data-obstacle]` elements (throttled via rAF).
- [ ] `EngineerSpace` sections, wind-tunnel canvas fixed behind content: hero ("I make air behave." + mono sub "aspiring performance engineer · CFD · aeroacoustics"), education block, experience timeline styled as telemetry laps (mono labels `LAP 01…`, delta-styled dates), current-work highlight card (IIT Madras × Intel blower/aeroacoustics), filterable project grid (`useState<tag|'ALL'>`, cards are `[data-obstacle] [data-magnetic]`, hover lifts + red wake intensifies), skills ticker strip (marquee), publication + certs list. `QuoteDivider` 3 ("a little more reality…") mid-page.
- [ ] Verify in Preview: particles deflect around cards while scrolling, filter works. Commit: `feat: engineer space with interactive wind-tunnel canvas and telemetry UI`.

### Task 9: The Poet space + RainDrift + scroll-typing engine

**Files:** Create `src/canvas/RainDrift.ts`, `src/spaces/Poet/PoetSpace.tsx`, `src/spaces/Poet/TypeLine.tsx`.

- [ ] `RainDrift`: sparse vertical grain streaks (2px, low alpha slate-blue) drifting down at varied speeds + occasional slow "droplet" ripple circle; extremely low density (calm, not busy).
- [ ] `TypeLine`: given `text`, uses ScrollTrigger scrub to reveal characters progressively (typewriter caret while in-progress, caret fades when complete). Implementation: split into spans, `gsap.to` stagger with `scrollTrigger: {scrub: 0.5, start: 'top 75%', end: 'top 35%'}`.
- [ ] `PoetSpace`: vast whitespace layout (max-w-xl centered, huge vertical gaps); opening line "somewhere it has just rained."; bio paragraphs (serif, generous leading) — includes the quiet-Connell duality line; 4 interludes as `TypeLine` verses separated by whitespace; credits card (Daydreaming anthology); links row (Instagram poetry, Substack — "mostly, I read. the liked posts are the diary."); Roxie Nafousi + Plath nod in microcopy ("raised on Nafousi's worth and Plath's exactness"). QuoteDividers 6 and 10.
- [ ] Verify in Preview: lines type themselves as you scroll into whitespace; rain is subtle. Commit: `feat: poet space with rain drift and scroll-typing verse engine`.

### Task 10: The Artist space + sketch-reveal masonry + GraphiteTrail

**Files:** Create `src/canvas/GraphiteTrail.ts`, `src/spaces/Artist/ArtistSpace.tsx`, `src/spaces/Artist/SketchTile.tsx`, `src/assets/sketches/.gitkeep`.

- [ ] `GraphiteTrail`: pointer-following particles — short-lived charcoal smudge dots with slight blur, spawned along pointer velocity vector, fading in 0.8 s.
- [ ] `SketchTile`: figure with the image twice — base `filter: grayscale(1) contrast(1.6) invert(0.08) brightness(1.1)` + `mix-blend-mode` trick approximating pencil outline; hover (or tap) crossfades to unfiltered via GSAP; caption in mono below. If `placeholder: true` render textured empty frame with caption ("next page intentionally left blank", etc.). Missing image file → `onError` swaps tile into placeholder mode (so site works before assets are dropped in).
- [ ] `ArtistSpace`: paper-grain background (SVG feTurbulence data-URI overlay), intro ("a high-end sketchbook, slightly chaotic, fully curated"), CSS columns masonry (`columns-1 sm:columns-2 lg:columns-3`) of `sketches[]`, Pinterest "reference board" card (`[data-magnetic]`), QuoteDivider 5.
- [ ] Verify in Preview: placeholder behavior without real images, hover reveal on placeholders' frames. Commit: `feat: artist space with sketch-reveal masonry and graphite cursor trail`.

### Task 11: The Audiophile space + Waveform + Wrapped content + Miles modal

**Files:** Create `src/canvas/Waveform.ts`, `src/spaces/Audiophile/AudiophileSpace.tsx`, `WrappedTimeline.tsx`, `ArtistConstellation.tsx`, `src/components/MilesModal.tsx`; modify `Footer.tsx` (wire modal).

- [ ] `Waveform`: 3 layered sine/noise ribbons across full width; amplitude eased toward `baseAmp + scrollVelocity*k + pointerProximity*k2`; hues from persona accent/accent2 at low alpha.
- [ ] `WrappedTimeline`: one row per `wrapped[]` year — huge repeat-number styling (the number echoed in 3 stacked color bands like the 2022 Wrapped card), animated count-up on ScrollTrigger enter, note + peak line in mono. 2022→2023 jump annotated "the year everything got louder (×4.8)".
- [ ] `ArtistConstellation`: absolutely-positioned artist names sized by `weight` (Joji dominant center), slow float animation, hover glow; deterministic pseudo-random layout from index (no collisions at desktop widths; mobile falls back to a wrapped flex tag cloud).
- [ ] `AudiophileSpace`: waveform fixed behind; hero "drunk on music."; WrappedTimeline; listening-day card styled like the AI report (paper card, mono "Filed under: overnight immersion, dream pop marathon"); personality card (The Adventurer / +ENVU+ chip); constellation; first-day easter egg — small "Apr 13, 2021" chip that flips to reveal "first stream: Black Swan — BTS · 20,993 songs later"; screenshot story-strip: horizontal scroll-snap row reading `src/assets/wrapped/` manifest (same onError→placeholder pattern as sketches); Spotify profile CTA. QuoteDividers 8 and "Everything that kills me…" (10).
- [ ] `MilesModal`: full-screen dim, Spider-Verse-styled card (chromatic-aberration text-shadow on the title "ANOMALY // e-1610"), the verbatim journal text in mono/serif mix, close on ESC/backdrop. Wire to Footer `anomaly?` button.
- [ ] Verify in Preview: counters animate, wave reacts to scroll, modal opens. Commit: `feat: audiophile space with reactive waveform, wrapped timeline, constellation, miles modal`.

### Task 12: Responsive + reduced-motion + polish pass

**Files:** Modify all spaces/components as found.

- [ ] Walk mobile (375px), tablet (768px), desktop (1280px) in Preview: panels stack as horizontal bands on mobile with tap-to-enter; heroes clamp; grids collapse; cursor hidden on touch; constellation → tag cloud.
- [ ] Emulate `prefers-reduced-motion`: every canvas replaced by its gradient fallback class; SplitText reveals become simple fades (`gsap.matchMedia`).
- [ ] Lighthouse-ish sanity: images `loading="lazy"`, fonts `display=swap`, no console errors.
- [ ] Commit: `fix: responsive + reduced-motion pass`.

### Task 13: Final verification

- [ ] `npm run build` clean; `npm run preview` walkthrough: preloader → hero → each of the 4 spaces via panels, hash deep-link `#/poet` direct load, ⌘K travel, C-137 flicker, anomaly modal, Spotify/Instagram/Pinterest/Substack links correct.
- [ ] Write `README.md`: how to run, where to drop real assets (`src/assets/sketches/`, `src/assets/wrapped/` + manifest edits in `src/content/`), where to replace placeholder poems.
- [ ] Commit: `docs: readme with asset drop-in instructions`.
