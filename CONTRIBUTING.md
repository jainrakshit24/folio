# Working on this site

Notes to myself, and to anyone poking at the code. Most of these are things I
got wrong once and would rather not get wrong again.

## Toolchain

Bun only. The lockfile is `bun.lock` and `npm install` fails outright on this
dependency graph, so dependencies go through Bun.

```sh
bun install
bun run dev      # port 8080
bun run build    # -> .output/
bunx tsc --noEmit
bun run lint
```

Running the app works either way once `node_modules` exists, so `npm run dev` is
fine. Anything that touches dependencies is not.

## Before calling a change done

1. `bunx tsc --noEmit` stays clean. It is clean today.
2. `bun run build` exits 0.
3. Open the routes actually touched. SSR errors return a 500 HTML page instead of
   crashing the process, so a green build is not proof a page renders.

## Things that bite

- **Don't run `bun run format` as part of another change.** There are a couple of
  hundred outstanding Prettier violations, so it rewrites nearly every file and
  buries the real diff. Format what you touched; a whole-repo format deserves its
  own commit.
- **`src/routeTree.gen.ts` is generated** from `src/routes/`. Editing it by hand
  is always wrong.
- **Plugin order in `vite.config.ts` is load-bearing.** `viteReact()` has to come
  after `tanstackStart()`, and `nitro()` is build-only. After a bundling change,
  diff the chunk names and sizes in `.output/public/assets/` against the previous
  build: content hashes should only move for code that actually changed.
- **The 3D has two paths.** `FactoryCanvas` falls back to a flat SVG when WebGL is
  missing or the visitor prefers reduced motion. Both have to keep working.
- **No CDN assets.** Everything is self-contained except the Google Fonts
  stylesheet in `src/routes/__root.tsx`.
- Design tokens live in `src/styles.css` under `@theme`. Use them rather than
  hardcoding hex values or inventing new shadows.

## Known rough edges

- `bun run preview` is broken: TanStack's preview plugin expects
  `dist/server/server.js`, but nitro builds to `.output/`. Use Wrangler instead;
  `.output/nitro.json` carries the exact commands.
- `twitter:card` is set to `summary_large_image` but there is no `og:image` yet,
  so shared links render an empty card.
- The results figures on the two Careers360 case studies describe the shape of
  the work rather than measured impact. They want replacing with real numbers.
