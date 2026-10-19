# Roadmap

What I want to get to next, roughly in the order it bothers me.

## Content

- [ ] Real numbers on the two Careers360 case studies. The figures there now
      describe the shape of the work, not its measured impact.
- [ ] An `og:image`. `twitter:card` already claims `summary_large_image`, so
      every shared link currently renders an empty card.
- [ ] A portrait on `/about` instead of the placeholder.
- [ ] Screenshots for the four freelance builds, and architecture sketches for
      the remaining data projects.

## Performance

First load is ~201 kB gzip after moving three.js and the physics engine off the
critical path. The rest of the list:

- [ ] Prerender the static routes. Every page is server-rendered per request
      today, which the content does not need.
- [ ] `defaultPreload: "intent"` on the router so hovering a link warms it.
- [ ] The custom cursor calls `elementFromPoint` on every pointer move and every
      scroll, which forces layout. Coalesce it into one rAF.
- [ ] Three separate rAF loops run at once (Lenis, the cursor, react-three-fiber).
      They should share a ticker.
- [ ] The main canvas never pauses. `/playground` already gates its frameloop on
      visibility; the root canvas should do the same.
- [ ] Trim the Google Fonts request. Ten weights load, nowhere near that many
      get used.

## Someday

- [ ] Swap the full framer-motion import for `LazyMotion`, worth roughly 15 kB
      gzip off the critical path.
- [ ] Fix `bun run preview` so previewing a production build does not need
      Wrangler by hand.
