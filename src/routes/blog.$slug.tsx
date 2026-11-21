/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * One article. The body arrives as finished HTML compiled by
 * scripts/build-blog.ts, so this route ships no markdown parser and no
 * syntax highlighter - only its own article's chunk.
 */
import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { seo, SITE_URL, absoluteUrl } from "@/lib/seo";
import { AdSlot, adsenseScripts } from "@/components/blog/AdSlot";
import {
  formatDate,
  categorySlug,
  getPost,
  loadBody,
  relatedPosts,
  type TocEntry,
} from "@/lib/blog";
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

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = getPost(params.slug);
    const body = post ? await loadBody(params.slug) : null;
    if (!post || !body) throw notFound();
    return { post, html: body.html, toc: body.toc };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
      ...withFeed(
        seo({
          path: `/blog/${post.slug}`,
          type: "article",
          // Google truncates around 60 characters, so the site suffix is only
          // worth adding when the headline leaves room for it.
          title: post.title.length > 48 ? post.title : `${post.title} | Rakshit Jain`,
          description: post.description,
          ogTitle: post.title,
          ogDescription: post.description,
          ...(post.cover ? { image: post.cover } : {}),
        }),
        [...post.tags, post.category, "Rakshit Jain"],
      ),
      scripts: [
        ...adsenseScripts(),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            wordCount: post.words,
            keywords: post.tags.join(", "),
            articleSection: post.category,
            inLanguage: "en",
            ...(post.cover ? { image: absoluteUrl(post.cover) } : {}),
            author: { "@type": "Person", name: post.author, url: SITE_URL },
            publisher: { "@type": "Person", name: "Rakshit Jain", url: SITE_URL },
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
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: Article,
});

function Toc({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 3) return null;
  return (
    <nav aria-label="On this page" className="toy-card mb-8 bg-sand/40 px-5 py-5">
      <h2 className="num mb-3 text-[11px] uppercase tracking-[0.2em] text-ink/55">On this page</h2>
      <ol className="space-y-1">
        {toc.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-[14px] text-ink/75 underline-offset-4 hover:text-ink hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Article() {
  const { post, html, toc } = Route.useLoaderData();
  const related = relatedPosts(post.slug);
  const [copied, setCopied] = useState("");

  // One delegated listener for every code block. The build already wrote the
  // raw source into data-code, so nothing has to be re-parsed to copy it.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const button = (e.target as HTMLElement).closest<HTMLElement>("[data-copy]");
      if (!button) return;
      const code = button.closest<HTMLElement>(".code-block")?.dataset["code"];
      if (!code) return;
      // Absent on insecure origins, and rejects when the user denies the
      // permission. Neither should surface as an unhandled rejection.
      if (!navigator.clipboard?.writeText) return;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopied(code.slice(0, 24));
          setTimeout(() => setCopied(""), 1600);
        })
        .catch(() => setCopied(""));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // The copy button is added here rather than in the generated HTML so the
  // markup stays useful with JavaScript switched off.
  useEffect(() => {
    for (const block of document.querySelectorAll<HTMLElement>(".code-block")) {
      if (block.querySelector("[data-copy]")) continue;
      const b = document.createElement("button");
      b.type = "button";
      b.dataset["copy"] = "1";
      b.textContent = "Copy";
      b.className =
        "num absolute right-2 top-1 z-10 rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink/70 hover:bg-sunny";
      block.appendChild(b);
    }
  }, [html]);

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <main id="main" className="relative min-h-screen bg-cream pb-24 pt-32">
      <div className="mx-auto w-full max-w-[44rem] px-5 sm:px-8">
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
          <Link
            to="/blog/category/$slug"
            params={{ slug: categorySlug(post.category) }}
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            {post.category}
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[3rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink/75">{post.description}</p>
          <div className="num mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-y-2 border-ink py-3 text-[11px] uppercase tracking-[0.14em] text-ink/60">
            <span className="font-bold text-ink">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        {post.cover && (
          <img
            src={post.cover}
            alt=""
            width={1200}
            height={630}
            className="toy-card mb-8 w-full"
            loading="eager"
            decoding="async"
          />
        )}

        <Toc toc={toc} />

        <div className="toy-card px-5 py-8 sm:px-9 sm:py-10">
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <AdSlot height={280} />

        <footer className="mt-12 border-t-2 border-ink pt-6">
          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <span className="num text-[11px] uppercase tracking-[0.16em] text-ink/55">Share</span>
            <a
              className="label-pill bg-paper hard-sm hover:-translate-y-px hover:bg-sunny"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              className="label-pill bg-paper hard-sm hover:-translate-y-px hover:bg-sunny"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="label-pill bg-paper hard-sm hover:-translate-y-px hover:bg-sunny"
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} ${url}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            {copied && (
              <span className="num text-[11px] uppercase tracking-[0.16em] text-mint-foreground text-ink/60">
                Code copied
              </span>
            )}
          </div>

          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="num mb-4 text-[11px] uppercase tracking-[0.2em] text-ink/55">
                Related
              </h2>
              <ul className="space-y-5">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: r.slug }}
                      className="font-display font-extrabold decoration-coral decoration-2 underline-offset-4 hover:underline"
                    >
                      {r.title}
                    </Link>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/65">{r.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Link
            to="/blog"
            className="hard mt-10 inline-block rounded-full border-2 border-ink bg-paper px-5 py-2.5 font-display text-[13px] font-extrabold uppercase tracking-[0.1em] transition-transform hover:-translate-y-0.5 hover:bg-sunny"
          >
            ← All articles
          </Link>
        </footer>
      </div>
    </main>
  );
}
