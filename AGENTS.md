# AGENTS.md

Portfolio site for Rakshit Jain. React 19 + Vite 8 + TanStack Start, SSR'd onto
Cloudflare Workers. `README.md` holds the design system and the original build
brief; read it before changing anything visual.

## Toolchain

Bun only. The lockfile is `bun.lock` and `npm install` fails on this dependency
graph, so use `bun install` / `bun add` / `bun remove`. Running the app works
either way once `node_modules` exists.

```sh
bun install
bun run dev      # port 8080
bun run build    # -> .output/
bunx tsc --noEmit
bun run lint
```

## Before you call a change done

1. `bunx tsc --noEmit`: must stay clean, it is clean today.
2. `bun run build`: must exit 0.
3. Hit the routes you touched on the dev server; SSR errors return a 500 HTML page
   rather than crashing the process, so a passing build is not proof a page renders.

## Rules

- **Never run `bun run format` as part of another change.** ~310 Prettier violations
  are outstanding, so it rewrites nearly every file and makes the real diff
  unreviewable. Format only what you touched; a whole-repo format is its own commit.
- **Never edit `src/routeTree.gen.ts`** , generated from `src/routes/`.
- **`vite.config.ts` plugin order is load-bearing.** `viteReact()` after
  `tanstackStart()`; `nitro()` build-only. Verify a bundle change by diffing chunk
  names and sizes in `.output/public/assets/` against the previous build; the
  content hashes should only move for code you actually changed.
- **Don't regress the 3D fallback.** `FactoryCanvas` renders a flat SVG when WebGL
  is absent or `prefers-reduced-motion` is set. Both paths must keep working.
- **Don't add CDN assets.** Everything is self-contained except the Google Fonts
  stylesheet in `src/routes/__root.tsx`.
- Design tokens live in `src/styles.css` under `@theme`. Use them; don't hardcode
  hex values or invent new shadows.

## Known issues

- `bun run preview` is broken. TanStack's preview plugin expects
  `dist/server/server.js` but nitro builds `.output/`. Use Wrangler; the exact
  commands are in `.output/nitro.json`.
- `twitter:card` is set to `summary_large_image` but no `og:image` exists anywhere,
  so social shares render an empty card.
- The results numbers on the two Careers360 case studies in `src/lib/projects.ts`
  are structural facts, not measured impact. Replace them with real figures before
  treating that page as finished.
