/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Everything the blog routes read. Article metadata is compiled into
 * src/blog/index.generated.ts at build time; article bodies live in one file
 * each and are pulled in on demand, so opening /blog never downloads an
 * article and opening an article never downloads its neighbours.
 */
import { POSTS } from "@/blog/index.generated";
import type { PostMeta, TocEntry } from "@/blog/types";

export type { PostMeta, TocEntry };
export { POSTS };

/**
 * Lazy handles, one per article. Vite turns each into its own chunk, which is
 * the whole reason the listing stays the same weight as the blog grows.
 */
const BODIES = import.meta.glob<{ html: string; toc: TocEntry[] }>("../blog/posts/*.generated.ts");

export async function loadBody(slug: string): Promise<{ html: string; toc: TocEntry[] } | null> {
  const load = BODIES[`../blog/posts/${slug}.generated.ts`];
  if (!load) return null;
  return await load();
}

export function getPost(slug: string): PostMeta | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** The newest article flagged `featured`, else simply the newest. */
export function featuredPost(): PostMeta | undefined {
  return POSTS.find((p) => p.featured) ?? POSTS[0];
}

/** "Data Engineering" -> "data-engineering", for category URLs. */
export function categorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): string | undefined {
  return CATEGORY_COUNTS.find((c) => c.slug === slug)?.name;
}

/** Only categories that actually have an article, newest-first order preserved. */
export const CATEGORY_COUNTS: { name: string; slug: string; count: number }[] = (() => {
  const counts = new Map<string, number>();
  for (const p of POSTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: categorySlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
})();

export const ALL_TAGS: string[] = [...new Set(POSTS.flatMap((p) => p.tags))].sort();

export function postsInCategory(name: string): PostMeta[] {
  return POSTS.filter((p) => p.category === name);
}

/**
 * Same category first, then anything sharing a tag. Keeps a reader moving
 * without a recommendation engine.
 */
export function relatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPost(slug);
  if (!post) return [];
  const scored = POSTS.filter((p) => p.slug !== slug).map((p) => ({
    post: p,
    score:
      (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
  }));
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/** Substring match over the fields a reader would actually type. */
export function searchPosts(query: string, within: PostMeta[] = POSTS): PostMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return within;
  return within.filter((p) =>
    `${p.title} ${p.description} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q),
  );
}

/** "2026-11-21" -> "21 November 2026". Fixed locale: the date must not shift per visitor. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
