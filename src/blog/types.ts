/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Shape of one article's metadata. `index.generated.ts` is written against
 * this by scripts/build-blog.ts, so a frontmatter change that breaks the
 * contract fails `tsc` rather than the page.
 */

/** Categories the blog advertises. Mirrors CATEGORIES in scripts/build-blog.ts. */
export const CATEGORIES = [
  "Artificial Intelligence",
  "Data Engineering",
  "Data Science",
  "Software Development",
  "Web Development",
  "Cloud Computing",
  "Cybersecurity",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  /** ISO date, YYYY-MM-DD. */
  publishedAt: string;
  /** ISO date, or "" when the article has never been revised. */
  updatedAt: string;
  /** Root-relative image path, or "" when the article has no cover. */
  cover: string;
  featured: boolean;
  readingMinutes: number;
  words: number;
};

/** One entry in an article's table of contents. */
export type TocEntry = { id: string; text: string; level: number };
