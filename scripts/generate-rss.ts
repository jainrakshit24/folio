/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Writes public/rss.xml from the compiled article index. Drafts never reach
 * the index, so they cannot reach the feed either. Run by `bun run build`
 * after the blog has been compiled.
 */
import { writeFileSync } from "node:fs";
import { POSTS } from "../src/blog/index.generated";

const SITE_URL = (process.env["VITE_SITE_URL"] || "https://jainrakshit.tech").replace(/\/+$/, "");
const AUTHOR = "Rakshit Jain";
const EMAIL = "itsrakshitjain@gmail.com";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RFC 822, which is what RSS readers expect. Noon UTC avoids date rollover. */
function rfc822(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12)).toUTCString();
}

const items = POSTS.map(
  (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <description>${escape(p.description)}</description>
      <category>${escape(p.category)}</category>
      <dc:creator>${escape(p.author)}</dc:creator>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
    </item>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Rakshit Jain · Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes on data engineering, AI agents, data quality and the web.</description>
    <language>en</language>
    <managingEditor>${EMAIL} (${AUTHOR})</managingEditor>
    <lastBuildDate>${POSTS[0] ? rfc822(POSTS[0].publishedAt) : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

writeFileSync("public/rss.xml", xml, "utf8");
console.log(`[rss] public/rss.xml written with ${POSTS.length} item(s)`);
