# The Four Spaces — Thilak S

Experiential portfolio: **The Engineer · The Poet · The Artist · The Audiophile**.
Vite + React + Tailwind, GSAP (ScrollTrigger/SplitText), Lenis smooth scroll, Three.js starfield, hand-rolled canvas effects (wind tunnel, rain drift, graphite trail, waveform).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Deep links: `#/engineer` `#/poet` `#/artist` `#/audiophile`. Press **⌘K / Ctrl+K** for fast travel.

## Dropping in real assets

The site works with styled placeholders until files exist — missing images degrade gracefully.

1. **Sketches** → put image files in `src/assets/sketches/` and edit the manifest in
   [`src/content/artist.ts`](src/content/artist.ts) (`src`, `caption`, `story` per sketch).
   Current expected filenames: `portrait-study.jpg`, `shigaraki.jpg`.
2. **Spotify Wrapped screenshots** → put files in `src/assets/wrapped/` and edit
   [`src/content/audiophile.ts`](src/content/audiophile.ts) (`WRAPPED_SHOTS`).
   Expected: `2022-minutes.jpg`, `2023-minutes.jpg`, `2025-minutes.jpg`, `adventurer.jpg`, `listening-day.jpg`.
3. **Poems** → replace the placeholder verses in `INTERLUDES` inside
   [`src/content/poet.ts`](src/content/poet.ts) with published lines.

All copy, project data, links, quotes and easter-egg text live in `src/content/` — edit text there without touching components.

## Easter eggs

- Footer `dimension C-137` → portal flicker.
- Footer `anomaly?` → the Miles Morales journal modal.
- Audiophile: tap the `first day on spotify` chip.
