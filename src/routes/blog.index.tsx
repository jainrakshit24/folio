/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { seo, SITE_URL } from "@/lib/seo";
import { adsenseScripts } from "@/components/blog/AdSlot";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ALL_TAGS, CATEGORY_COUNTS, featuredPost, POSTS, searchPosts } from "@/lib/blog";
import "@/styles/blog.css";

const PAGE = 8;

/**
 * seo() builds the meta and link lists; this appends the feed link and, when
 * given tags, a keywords meta.
 *
 * Google has ignored meta keywords since 2009, so this is not what makes an
 * article rank - the terms in the title, the headings and the opening
 * paragraph are. Bing and Yandex still read it, and it costs one tag.
 */
function withFeed<T extends { links: Record<string, string>[]; meta: Record<string, string>[] }>(
  head: T,
  keywords?: string[],
): T {
  return {
    ...head,
    meta: keywords?.length
      ? [...head.meta, { name: "keywords", content: keywords.join(", ") }]
      : head.meta,
    links: [
      ...head.links,
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Rakshit Jain \u00b7 Blog",
        href: `${SITE_URL}/rss.xml`,
      },
    ],
  };
}

export const Route = createFileRoute("/blog/")({
  head: () => ({
    ...withFeed(
      seo({
        path: "/blog",
        title: "Blog | Data Engineering, AI and Software | Rakshit Jain",
        description:
          "Notes on data engineering, AI agents, data quality and web performance, written from production work rather than press releases.",
        ogTitle: "Blog | Rakshit Jain",
        ogDescription: "Data engineering, AI agents and the unglamorous layer underneath both.",
      }),
      [...CATEGORY_COUNTS.map((c) => c.name), ...ALL_TAGS],
    ),
    scripts: [
      ...adsenseScripts(),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "Rakshit Jain · Blog",
          url: `${SITE_URL}/blog`,
          description: "Notes on data engineering, AI agents, data quality and web performance.",
          author: { "@type": "Person", name: "Rakshit Jain", url: SITE_URL },
          blogPost: POSTS.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.publishedAt,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const featured = featuredPost();
  const results = useMemo(() => searchPosts(query), [query]);
  // The featured article is only pulled out of the list when nothing is being
  // searched for; during a search every match should stay visible.
  const rest = query ? results : results.filter((p) => p.slug !== featured?.slug);
  const visible = rest.slice(0, shown);

  return (
    <main id="main" className="relative min-h-screen bg-cream pb-24 pt-32">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <header>
          <span className="label-pill bg-paper">( 10 ) BLOG</span>
          <h1 className="mt-5 font-display text-[2.75rem] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-[4rem]">
            NOTES FROM
            <br />
            THE PIPELINE.
          </h1>
          <p className="prose-measure mt-5 text-[1.05rem] leading-relaxed text-ink/75">
            Data engineering, AI agents, data quality and the web. Written from work I have actually
            done, with the sources attached.
          </p>
        </header>

        <div className="mt-10 border-t-2 border-ink pt-6">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Search articles, tags or categories"
            className="hard-sm w-full rounded-full border-2 border-ink bg-paper px-5 py-3 text-[15px] outline-none placeholder:text-ink/40 focus:bg-sunny/20"
          />
        </div>

        <nav aria-label="Categories" className="mt-4 flex flex-wrap gap-2">
          {CATEGORY_COUNTS.map((c) => (
            <Link
              key={c.slug}
              to="/blog/category/$slug"
              params={{ slug: c.slug }}
              className="label-pill bg-paper hard-sm hover:-translate-y-px hover:bg-sunny"
            >
              {c.name}
              <span className="num text-ink/45">{c.count}</span>
            </Link>
          ))}
        </nav>

        {featured && !query && (
          <section aria-labelledby="featured-heading" className="mt-12">
            <h2
              id="featured-heading"
              className="num mb-4 text-[11px] uppercase tracking-[0.22em] text-ink/50"
            >
              ✦ Featured
            </h2>
            <ArticleCard post={featured} featured />
          </section>
        )}

        <section aria-labelledby="latest-heading" className="mt-12">
          <h2
            id="latest-heading"
            className="num mb-4 text-[11px] uppercase tracking-[0.22em] text-ink/50"
          >
            {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "✱ Latest"}
          </h2>

          {query && visible.length === 0 ? (
            <p className="toy-card p-6 text-[15px] text-ink/70">
              Nothing matches “{query}”. Try a category name or a tag.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {visible.map((p) => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          )}

          {rest.length > shown && (
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="hard mt-8 w-full rounded-full border-2 border-ink bg-sunny py-3 font-display text-[14px] font-extrabold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5"
            >
              Load more ({rest.length - shown} left)
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
