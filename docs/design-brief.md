# Design brief

> The original build brief for the site — design tokens, 3D concept, page-by-page
> intent. Kept as reference for anyone changing the visual system.

## The brief

Build a playful, 3D-driven personal portfolio for Rakshit Jain, a Data Engineer & Analytics
professional from Delhi NCR, India. Think of it as an interactive toy that happens to be a resume —
bright, tactile, full of little rewards for touching things — but engineered with real craft. The
polish bar is https://threejs.paris (persistent WebGL world, choreographed transitions, nothing
default). The MOOD is the opposite of that site: warm, sunny, hand-made, fun.

It must never look like a generic Tailwind/shadcn template or a dark neon "cyber" portfolio.

## TECH STACK

- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui (restyle completely — no default shadcn look anywhere)
- react-router-dom for real multi-page routing (not a single scroll page)
- framer-motion for all UI motion and page transitions
- @react-three/fiber + @react-three/drei for the 3D layer
- @react-three/rapier for physics on the playground/contact page
- lenis for smooth scrolling
- canvas-confetti for celebration moments
- Everything self-contained, no external CDN assets

## DESIGN SYSTEM — use these exact tokens

Colors — light, warm, candy-bright:
--cream: #FFF6EC /* page background, warm paper _/
--paper: #FFFFFF /_ cards _/
--ink: #171512 /_ all text and every border — near-black, warm _/
--coral: #FF5A36 /_ PRIMARY accent — CTAs, highlights _/
--sunny: #FFC531 /_ SECONDARY — badges, hover fills, the fun colour _/
--mint: #23D5A0 /_ TERTIARY — success, data/pipeline motifs _/
--sky: #3D6DFF /_ QUATERNARY — links, info _/
--grape: #8B5CF6 /_ accent, used sparingly _/
--sand: #EFE3D3 /_ muted surfaces, dividers */

Style rules — this is a "friendly neo-brutalist toy" system:

- Every card, button, badge and input has a solid 2px --ink border and a hard offset shadow
  (box-shadow: 4px 4px 0 var(--ink)) — NO soft blurry drop shadows, NO glassmorphism.
- Corners are generously rounded: 16–24px on cards, fully pill-shaped buttons.
- Colour blocking: big flat fills of coral / sunny / mint / sky. Sections alternate background
  colours so scrolling feels like flipping through a picture book.
- Add a subtle paper-grain noise overlay across the whole site at ~4% opacity so flat colours
  don't feel sterile.
- Sprinkle small decorative doodles as inline SVG — stars, sparkles, squiggly underlines, arrows,
  dots — that float gently on a loop. Keep them decorative (aria-hidden).

Typography:

- Display: a chunky rounded geometric — "Clash Display" or "Cabinet Grotesk" (fallback: Poppins),
  weight 700–800, tight tracking. Huge: clamp(2.75rem, 10vw, 8rem).
- Body: "General Sans" or "Inter", 17px, line-height 1.7, max-width 62ch.
- Mono: "JetBrains Mono" for numbers, tech tags, section labels and anything readout-like.
  tabular-nums on every animating number.
- Section labels: mono, uppercase, 11px, 0.2em tracking, sitting inside a small pill with an
  --ink border, e.g. "( 02 ) WORK".
- Load from Google Fonts with real fallback stacks.

## THE 3D CENTREPIECE — "THE DATA FACTORY"

One persistent

mounted at the app root that survives route changes (must NOT unmount on
navigation). It renders a low-poly, isometric, toy-like DIORAMA that sits on a floating island —
imagine a Nintendo-styled miniature factory made of chunky rounded shapes with flat matte colours,
soft ambient occlusion, and one warm key light casting soft shadows onto the island.

What the machine does (this is the whole personality of the site — build it literally):

- Messy multi-coloured cubes ("raw data") tumble out of a chute at the top and drop into a funnel.
- They travel along a little conveyor belt with rollers that actually rotate.
- Halfway along, a stamping arm bops down on each cube — the cube squashes, flashes white, and
  comes out CLEAN: uniform, glossy, one of the palette colours. That's the transformation step.
- A sorting gate splits the stream into three lanes.
- At the end, the cubes stack themselves into a tiny 3D bar chart that grows, then resets and starts
  over on a loop.
- A few cubes occasionally fall off the belt and bounce on the island floor — the pipeline is never
  quite perfect, and that's the joke.
- Small floating labels above each stage in mono: INGEST → TRANSFORM → VALIDATE → LOAD.

Interaction:

- Drag to orbit the island (damped, with limits — never let the user get lost or see under it).
- Scroll wheel gently dollies the camera.
- Hovering any machine part makes it pop up 0.1 units and tint --sunny, with the cursor showing
  a label.
- Clicking a stage navigates to a related page (the chart at the end → /work, the stamping arm →
  /skills, the island's little signpost → /about).
- Idle: the whole island bobs on a slow sine wave, like it's floating on water.

Per-route camera and scene states (animate over ~1.2s, easeInOutCubic, never cut):
/ → wide hero shot of the whole island, machine running at full speed
/about → camera pushes in on a tiny desk on the island (laptop, mug, plant)
/work → the output bar chart fills the frame, bars labelled with project numbers
/skills → the machine's parts detach and orbit slowly around the island like a toolbox exploded
/experience → the island stretches into three connected islands, one per job, linked by bridges
/education → a small graduation cap sits on the island, everything else slows to a crawl
/contact → the island tilts and all the cubes slide toward a mailbox, piling up around it
/playground → physics ON: cubes become draggable and throwable

Fallbacks (required):

- No WebGL, prefers-reduced-motion, or a low-end device → replace the canvas with a flat illustrated
  SVG scene of the same factory, animated only with gentle CSS. The site must be fully usable and
  still charming with zero 3D.
- Mobile: simplify the diorama, drop shadow quality, cap DPR at 2, and disable orbit-drag in favour
  of a slow auto-rotate.

## PRELOADER (make it fun, cap it at ~2s, first visit only via sessionStorage)

Full-screen --sunny panel. In the centre, a chunky rounded loading bar with a 2px --ink border, and
inside it a little cube that rolls left to right, squashing on each bounce. Above: "LOADING THE
FACTORY" in display type. Below: a mono percentage counting 0 → 100 with each digit on its own
rolling strip (tabular-nums so nothing jitters). At 100 the cube does a happy hop, and the panel
splits horizontally into two halves that slide off the top and bottom edges over 0.9s with
cubic-bezier(0.76, 0, 0.24, 1), revealing the hero already animating underneath.

## PAGE TRANSITIONS

On every route change: three coloured panels (--coral, --sunny, --mint) sweep across the screen in
sequence, 80ms apart, each with a slight rounded leading edge; the incoming route's name flashes on
the middle panel in display type; then they sweep off, and the new content springs in with a stagger
(y: 30px → 0, scale 0.96 → 1, 60ms apart). The 3D island morphs to its new state IN PARALLEL —
it never blanks. Total under 1.2s. Scroll resets to top.

## PLAYFUL MOTION RULES (this is what makes or breaks it)

- Springs, not linear tweens: framer-motion spring with stiffness ~260, damping ~20 for anything
  interactive. Entrances use cubic-bezier(0.22, 1, 0.36, 1); exits cubic-bezier(0.76, 0, 0.24, 1).
- Every button squishes on press (scale 0.94) and springs back — it must feel physically clickable.
- Magnetic hover on buttons and nav items: they lean ~8px toward the cursor and spring back.
- Cards tilt in 3D toward the cursor (subtle, max 8deg) with the hard shadow shifting to match,
  so the light source stays consistent.
- Headings reveal per-word: each word rises out of a clip-path slit with a tiny overshoot, 50ms apart.
- Every number counts up from 0 when scrolled into view, in mono tabular-nums.
- Custom cursor: a chunky --ink-outlined circle that trails with lag; it grows and fills --sunny over
  links, shows text labels over cards ("PEEK →", "DRAG ME", "SAY HI"), and leaves a short fading trail
  of small dots. Hidden on touch devices, native cursor restored.
- Confetti bursts (canvas-confetti, palette colours only) on: successful form submit, and the first
  time a visitor finds the easter egg.
- Sound: a tiny, tasteful click/pop on button presses, OFF by default, with a clearly visible
  speaker toggle in the nav. Never autoplay audio.
- prefers-reduced-motion: disable lenis, tilt, parallax, cursor trail, counters, confetti and the
  factory animation; keep simple opacity fades. Test this path.

## EASTER EGGS (small, don't overdo it)

- Konami code → all the cubes in the 3D scene turn into tiny rubber ducks and rain down.
- Clicking the wordmark 5 times → the whole site tilts 2 degrees for a few seconds, then rights itself.
- The 404 page is a full mini-game (see PROMPT 8).

## NAVIGATION

- Floating pill-shaped nav bar with a 2px --ink border and hard shadow, centred at the top and
  slightly detached from the edge. It shrinks and tucks upward as you scroll down, reappears on
  scroll up.
- Left: wordmark "RAKSHIT ✱" in display type. Right: a sound toggle and a menu button.
- Active route: its pill fills --coral with --cream text.
- Mobile: the menu button opens a full-screen --sunny panel; nav items are enormous display type,
  each springing in 80ms apart, each with a doodle beside it.
