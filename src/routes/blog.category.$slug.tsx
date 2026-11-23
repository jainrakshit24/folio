/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo, SITE_URL } from "@/lib/seo";
import { adsenseScripts } from "@/components/blog/AdSlot";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { CATEGORY_COUNTS, categoryFromSlug, postsInCategory } from "@/lib/blog";
import "@/styles/blog.css";

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

export const Route = createFileRoute("/blog/category/$slug")({
  loader: ({ params }) => {
    const name = categoryFromSlug(params.slug);
    // An empty category is a dead end for a reader and a thin page for a
    // crawler, so only categories with articles resolve at all.
    if (!name) throw notFound();
    return { name, posts: postsInCategory(name) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    return {
      ...withFeed(
        seo({
          path: `/blog/category/${params.slug}`,
          title: `${loaderData.name} | Blog | Rakshit Jain`,
          description: `Every article on ${loaderData.name.toLowerCase()} from Rakshit Jain's blog: ${loaderData.posts.length} written from production work, each one with its sources attached.`,
          ogTitle: `${loaderData.name} articles`,
          ogDescription: `Everything on the blog filed under ${loaderData.name}.`,
        }),
        [loaderData.name, ...new Set(loaderData.posts.flatMap((p) => p.tags))],
      ),
      scripts: [
        ...adsenseScripts(),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${loaderData.name} articles`,
            url: `${SITE_URL}/blog/category/${params.slug}`,
            isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog` },
            hasPart: loaderData.posts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `${SITE_URL}/blog/${p.slug}`,
              datePublished: p.publishedAt,
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              {
                "@type": "ListItem",
                position: 3,
                name: loaderData.name,
                item: `${SITE_URL}/blog/category/${params.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { name, posts } = Route.useLoaderData();

  return (
    <main id="main" className="relative min-h-screen bg-cream pb-24 pt-32">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="num mb-6 text-[11px] uppercase tracking-[0.16em] text-ink/55"
        >
          <Link to="/blog" className="underline-offset-4 hover:text-ink hover:underline">
            Blog
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span>{name}</span>
        </nav>

        <header className="border-b-2 border-ink pb-6">
          <h1 className="font-display text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[3.5rem]">
            {name}
          </h1>
          <p className="num mt-3 text-[11px] uppercase tracking-[0.18em] text-ink/55">
            {posts.length} article{posts.length === 1 ? "" : "s"}
          </p>
        </header>

        <nav aria-label="Other categories" className="flex flex-wrap gap-2 py-5">
          {CATEGORY_COUNTS.filter((c) => c.name !== name).map((c) => (
            <Link
              key={c.slug}
              to="/blog/category/$slug"
              params={{ slug: c.slug }}
              className="label-pill bg-paper hard-sm hover:-translate-y-px hover:bg-sunny"
            >
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="grid gap-5 pt-2 sm:grid-cols-2">
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
