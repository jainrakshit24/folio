---
title: "This Blog Ships Zero Markdown Parser to Your Browser"
description: "Most markdown blogs make the reader's phone do work the build server already did. Moving parsing and syntax highlighting to build time costs nothing and removes both."
slug: "blog-with-no-markdown-parser"
category: "Web Development"
tags:
  - markdown blog
  - build time rendering
  - static site performance
  - syntax highlighting
  - Core Web Vitals
author: "Rakshit Jain"
publishedAt: "2026-11-21"
updatedAt: ""
cover: ""
published: true
featured: false
---

When I added this blog, the first decision was where markdown turns into HTML. I know it sounds like an implementation detail. It isn't. It decides how fast your site is on a cheap phone, and whether article number 300 slows down article number 1.

## The default, and why it costs you

Reach for the obvious setup and you get something like this: you import the markdown files, parse them in a component, highlight the code blocks, render.

It works immediately. It also means every reader downloads a markdown parser and a syntax highlighter, then runs both, just to see text that was identical for every one of them. The build server already knew the answer. It just declined to write it down.

A parser is maybe 12 KB gzipped. A good highlighter is a lot more. On your laptop you'll never notice. On a mid-range Android on a weak connection, that's the difference between text appearing and a spinner.

## Moving the work backwards

So I moved it. The build step reads `content/blog/*.md`, parses the frontmatter, converts the body, highlights every fence, and writes TypeScript modules. By the time a browser is involved there's no markdown left anywhere, only finished HTML.

```ts
const html = await marked.parse(body, { renderer, gfm: true });

writeFileSync(
  join(POSTS_DIR, `${slug}.generated.ts`),
  `export const html = ${JSON.stringify(html)};\n` +
  `export const toc = ${JSON.stringify(headings)};\n`,
);
```

Both dependencies sit in `devDependencies`. They run on the build machine and are never part of a bundle. The highlighter can be the expensive, accurate one, because its cost is paid once by a server instead of once per reader.

## The split that actually matters

Here's the part I'd have got wrong a year ago, and it's expensive to fix once you have fifty posts.

If every article compiles into one module, the listing page imports all of them. At ten articles nobody notices. At three hundred, opening `/blog` downloads every word you've ever written, just to show a list of titles.

So the build writes two kinds of file:

```text
src/blog/index.generated.ts          metadata only - title, date, tags
src/blog/posts/<slug>.generated.ts   one article's HTML
```

The listing imports the first. An article route imports only its own file, through a dynamic lookup the bundler splits automatically. Reading one article downloads one article.

That's a ten-line difference in my build script, and it's the only reason I can publish daily without rewriting this in March.

## What still runs in the browser

Almost nothing. One small handler for copy-to-clipboard on code blocks, which works because the build already wrote the raw source into a data attribute:

```ts
const block = (e.target as HTMLElement).closest(".code-block");
navigator.clipboard.writeText(block.dataset.code ?? "");
```

No parsing, no re-highlighting, no second copy of the source in a JavaScript array. The HTML already had it.

## Validation belongs in the build too

Once compilation is a build step, it can refuse to build. This one fails on a missing required field, a slug that's not URL-safe, a duplicate slug, a category that's not on the list, or a date that's not `YYYY-MM-DD`.

I'm not after strictness for its own sake. I want my typo to become a build error with a filename attached, rather than a page that renders with an empty title and quietly tells Google nothing.

Drafts fall out of the same mechanism. `published: false` and the file is skipped, absent from the listing, the feed, the sitemap and the routes. Not hidden by CSS. Not present and unlinked. Not built.

## The honest trade-off

Editing a markdown file doesn't hot-reload. My generator runs when the dev server starts, so I restart once after editing.

For how I actually write, that's a fine trade: write the file, restart once, check it, push. If I were editing posts fifty times an hour I'd call it wrong, and I'd add a Vite plugin watching the content directory instead.

Either way, you should know which trade you're making before a Lighthouse report tells you.

---

**Sources**

- [marked, markdown parser](https://marked.js.org/)
- [Shiki, syntax highlighter](https://shiki.style/)
- [Vite: features and static asset handling](https://vite.dev/guide/features.html)
