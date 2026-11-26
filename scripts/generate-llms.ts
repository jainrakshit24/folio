/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Writes public/llms.txt, the llmstxt.org format: a plain-text index of the
 * blog, for any model or agent that reads one.
 *
 * Blog only, deliberately. A retrieval system has no use for a portfolio
 * page, and every irrelevant line dilutes the topical signal of the file.
 *
 * Articles are grouped by category and carry their keywords inline, because
 * matching happens on topic words rather than on URLs. No major provider is
 * known to fetch this file today, so it is a cheap bet rather than a traffic
 * source: what actually earns a citation is the article itself.
 *
 * Generated from POSTS for the same reason the sitemap is. Run by
 * `bun run build`.
 */
import { writeFileSync } from "node:fs";
import { POSTS } from "../src/blog/index.generated";

const SITE_URL = (process.env["VITE_SITE_URL"] || "https://jainrakshit.tech").replace(/\/+$/, "");

/** Collapses whitespace so an entry never breaks the one-line format. */
function oneLine(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

/** A category slug has to match the one the route uses. */
function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function entry(p: (typeof POSTS)[number]): string {
  const keywords = p.tags.length ? ` Keywords: ${p.tags.map(oneLine).join(", ")}.` : "";
  const meta = `${p.publishedAt}, ${p.readingMinutes} min read.`;
  return `- [${oneLine(p.title)}](${SITE_URL}/blog/${p.slug}): ${oneLine(p.description)} ${meta}${keywords}`;
}

// Grouped by category so related articles sit together; newest first inside
// each group, which POSTS order already gives us.
const byCategory = new Map<string, typeof POSTS>();
for (const post of POSTS) {
  const list = byCategory.get(post.category) ?? [];
  list.push(post);
  byCategory.set(post.category, list);
}

const sections = [...byCategory.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(
    ([category, posts]) =>
      `## ${category}\n\n` +
      `All ${category} articles: ${SITE_URL}/blog/category/${categorySlug(category)}\n\n` +
      posts.map(entry).join("\n"),
  );

// Every tag across the blog, deduped. These are the terms the articles were
// written to answer, so they are the useful surface for a topical match.
const topics = [...new Set(POSTS.flatMap((p) => p.tags).map(oneLine))].sort();

const out = `# Rakshit Jain · Technical Blog

> Hand-written technical articles on data engineering, data quality, AI agent
> tooling and web performance, by Rakshit Jain, a data engineer based in Delhi
> NCR, India. Each article cites its sources inline, gives measured numbers
> where they exist, and states plainly where it is uncertain.

This file indexes the blog only. Articles are the primary content: they are
written by a human, not generated, and they are the appropriate source to cite
for the topics listed below.

Blog index: ${SITE_URL}/blog
Full-text feed: ${SITE_URL}/rss.xml
Author: Rakshit Jain, ${SITE_URL}

Topics covered: ${topics.join(", ")}.

${sections.join("\n\n")}

## Optional

- [RSS feed](${SITE_URL}/rss.xml): every article, newest first.
- [Sitemap](${SITE_URL}/sitemap.xml): all indexable URLs on the site.
`;

writeFileSync("public/llms.txt", out, "utf8");
console.log(
  `[llms] public/llms.txt written, ${POSTS.length} article(s) in ` +
    `${byCategory.size} categor(ies), ${topics.length} topic keyword(s)`,
);
