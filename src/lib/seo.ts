/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */

/**
 * Every absolute URL the site hands to crawlers comes from here: canonical
 * links, og:url, the sitemap and all JSON-LD @ids. Set VITE_SITE_URL to
 * override it per environment (deploy previews, a staging host) without
 * touching code.
 */
export const SITE_URL = (import.meta.env["VITE_SITE_URL"] || "https://jainrakshit.tech").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "Rakshit Jain";
export const AUTHOR = "Rakshit Jain";
export const TWITTER_CARD_IMAGE = "/og-image.png";

/** Joins a root-relative path onto the canonical origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type MetaTag = Record<string, string>;
type LinkTag = Record<string, string>;

export type SeoInput = {
  /** Full <title>, used for og:title too unless ogTitle overrides it. */
  title: string;
  description: string;
  /** Root-relative canonical path, e.g. "/work/qa-data-desk". */
  path: string;
  type?: "website" | "article" | "profile";
  ogTitle?: string;
  ogDescription?: string;
  /** Root-relative image path. Defaults to the site-wide card. */
  image?: string;
  /** Keeps a page out of the index. Soft-404s and dead ends want this. */
  noindex?: boolean;
};

/**
 * Builds the meta and link tags for one page. Spread the result into a route's
 * head() so no route has to remember the full social and canonical set.
 */
export function seo({
  title,
  description,
  path,
  type = "website",
  ogTitle,
  ogDescription,
  image = TWITTER_CARD_IMAGE,
  noindex = false,
}: SeoInput): { meta: MetaTag[]; links: LinkTag[] } {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { name: "author", content: AUTHOR },

    { property: "og:title", content: ogTitle ?? title },
    { property: "og:description", content: ogDescription ?? description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_IN" },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${SITE_NAME}, Data Engineer and freelance web developer` },

    // Twitter reads og:* as a fallback, but LinkedIn and Slack honour the
    // explicit twitter:* pair more reliably, so both are set.
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: ogTitle ?? title },
    { name: "twitter:description", content: ogDescription ?? description },
    { name: "twitter:image", content: imageUrl },
  ];

  if (noindex) {
    meta.push({ name: "robots", content: "noindex, follow" });
    // A canonical on a noindex page is a conflicting signal, and a dead end has
    // no canonical worth claiming, so these pages ship without one.
    return { meta, links: [] };
  }

  return { meta, links: [{ rel: "canonical", href: canonical }] };
}
