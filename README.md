<div align="center">

# 🏭 Rakshit Jain · Portfolio

### *I build machines that turn data into decisions.*

A playful, 3D-driven personal portfolio for a **Data Engineer** from Delhi NCR.
Not a template. Not a dark neon cyber-site. A warm, sunny, hand-made toy that happens to be a résumé.

<br/>

![React](https://img.shields.io/badge/React_19-FF5A36?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3D6DFF?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-FFC531?style=for-the-badge&logo=vite&logoColor=171512)
![Three.js](https://img.shields.io/badge/Three.js-171512?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_v4-23D5A0?style=for-the-badge&logo=tailwindcss&logoColor=171512)
![TanStack](https://img.shields.io/badge/TanStack_Start-8B5CF6?style=for-the-badge&logo=reactquery&logoColor=white)

![Bun](https://img.shields.io/badge/built_with-Bun-EFE3D3?style=flat-square&logo=bun&logoColor=171512)
![Cloudflare](https://img.shields.io/badge/deploys_to-Cloudflare_Workers-FF5A36?style=flat-square&logo=cloudflare&logoColor=white)
![SSR](https://img.shields.io/badge/rendering-SSR-3D6DFF?style=flat-square)
![Playful](https://img.shields.io/badge/vibe-neo--brutalist_toy-FFC531?style=flat-square&logoColor=171512)

</div>

---

## 🎨 What makes it different

| | |
|---|---|
| 🏭 **A persistent 3D factory** | One WebGL world mounted at the app root that **survives every route change**. It morphs per page instead of remounting. Drag it, poke it, watch the conveyor run. |
| 🧱 **Friendly neo-brutalism** | Every card, button and badge gets a solid 2px ink border and a hard offset shadow. No glassmorphism, no blurry drop shadows, no default shadcn anywhere. |
| 🎪 **A physics playground** | `/playground` is a genuinely playable toy box: grab, throw and shake my skills as chunky cubes, powered by Rapier. |
| 📄 **Real multi-page routing** | Nine routes with choreographed page transitions, not one long scroll page. |
| ♿ **Degrades honestly** | No WebGL or `prefers-reduced-motion`? You get a hand-drawn flat SVG factory instead, and every animation stands down. |
| ⚡ **~201 kB gzip first load** | three.js and the physics engine are lazy, so visitors who never see the 3D never download it. |

---

## 🌈 The palette

The whole site is built on seven tokens. Sections alternate fills so scrolling feels like flipping through a picture book.

| | Token | Hex | Job |
|---|---|---|---|
| 🟧 | `--coral` | `#FF5A36` | Primary: CTAs, highlights |
| 🟨 | `--sunny` | `#FFC531` | Secondary: badges, the fun colour |
| 🟩 | `--mint` | `#23D5A0` | Tertiary: success, pipeline motifs |
| 🟦 | `--sky` | `#3D6DFF` | Links, info |
| 🟪 | `--grape` | `#8B5CF6` | Accent, used sparingly |
| ⬜ | `--cream` | `#FFF6EC` | Page background, warm paper |
| ⬛ | `--ink` | `#171512` | All text and every single border |

Type: **Poppins** (display, 700–800) · **Inter** (body) · **JetBrains Mono** (numbers, tags, labels).
A paper-grain noise overlay sits over everything at 4% so the flat colours never feel sterile.

---

## 🗺️ The pages

```
/                 the factory, the pitch, the numbers
/about            who I am, the short version
/work             everything I've shipped
/work/:slug       one project, properly explained
/services         freelance web development
/skills           what I actually know
/experience       the timeline
/education        where it started
/playground       🧊 throw my skills around
/contact          say hello
```

---

## 🚀 Run it locally

> **Bun only.** The lockfile is `bun.lock` and `npm install` fails on this dependency graph.

```bash
git clone https://github.com/jainrakshit24/folio.git
cd folio

bun install
bun run dev          # → http://localhost:8080
```

Once `node_modules` exists, `npm run dev` works too, it just launches Vite. But anything that
touches dependencies goes through Bun:

```bash
bun add <pkg>
bun remove <pkg>
```

### Scripts

| Script | What it does |
|---|---|
| `bun run dev` | Vite dev server on port **8080** |
| `bun run build` | Production build → `.output/` (nitro, `cloudflare-module`) |
| `bun run build:dev` | Same, unminified, for digging through the bundle |
| `bun run lint` | ESLint |
| `bun run format` | Prettier · ⚠️ see below |

> ⚠️ **Don't run `bun run format` casually.** There are ~420 outstanding Prettier violations, so it
> rewrites nearly every file and buries whatever you actually changed. Format the files you touched,
> or do a whole-repo format as its own standalone commit.

> ℹ️ `bun run preview` is currently broken. TanStack's preview plugin looks for `dist/server/server.js`
> but nitro builds to `.output/`. Preview the real build with Wrangler; `.output/nitro.json` has the
> exact commands.

---

## 🧰 Under the hood

```
src/
├── routes/              file-based routes (routeTree.gen.ts is generated, never edit)
├── components/
│   ├── factory/         🏭 the persistent 3D world + its flat SVG fallback
│   ├── playground/      🧊 Rapier physics sandbox
│   ├── site/            nav, footer, cursor, preloader, page transitions
│   ├── work/            case-study layouts
│   └── ui/              shadcn, restyled past recognition
├── lib/                 project data, helpers, error handling
└── styles.css           design tokens + every custom utility
```

**Stack:** React 19 · TypeScript · Vite 8 · TanStack Start (SSR) · Tailwind v4 ·
Framer Motion · React Three Fiber + Drei · Rapier · Lenis · Bun · Cloudflare Workers

Design tokens and the full visual brief live in [`docs/design-brief.md`](docs/design-brief.md).

---

## 📬 Say hello

<div align="center">

[![Email](https://img.shields.io/badge/itsrakshitjain@gmail.com-FF5A36?style=for-the-badge&logo=gmail&logoColor=white)](mailto:itsrakshitjain@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-3D6DFF?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/jainrakshit24)
[![GitHub](https://img.shields.io/badge/GitHub-171512?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jainrakshit24)

**Delhi NCR, India** · Open for freelance projects

<br/>

*Built with too much coffee ☕*

</div>
