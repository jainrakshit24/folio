/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * One article in a listing. Uses the site's own vocabulary - toy-card, ink
 * borders, hard offset shadows, display type - so the blog reads as part of
 * this site rather than a template dropped into it. The restraint Medium gets
 * right lives in the body copy and the measure, not in the chrome.
 */
import { Link } from "@tanstack/react-router";
import { categorySlug, formatDate, type PostMeta } from "@/lib/blog";

const TONES = [
  "bg-coral text-cream",
  "bg-sunny text-ink",
  "bg-mint text-ink",
  "bg-sky text-cream",
  "bg-grape text-cream",
];

/** Stable colour per category, so a category looks the same everywhere. */
function toneFor(category: string): string {
  let h = 0;
  for (const ch of category) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return TONES[h % TONES.length]!;
}

export function ArticleCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? "toy-card p-6 transition-transform hover:-translate-y-0.5 sm:p-8"
          : "toy-card p-5 transition-transform hover:-translate-y-0.5 sm:p-6"
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          to="/blog/category/$slug"
          params={{ slug: categorySlug(post.category) }}
          className={`label-pill ${toneFor(post.category)} hard-sm hover:-translate-y-px`}
        >
          {post.category}
        </Link>
        <span className="num text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {" · "}
          {post.readingMinutes} min
        </span>
      </div>

      <h2
        className={
          featured
            ? "font-display text-[1.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-[2.25rem]"
            : "font-display text-[1.35rem] font-extrabold leading-[1.1] tracking-tight sm:text-[1.6rem]"
        }
      >
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="decoration-coral decoration-[3px] underline-offset-[6px] hover:underline"
        >
          {post.title}
        </Link>
      </h2>

      <p className="prose-measure mt-3 text-[15px] leading-relaxed text-ink/75">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <li
              key={t}
              className="num rounded-full border-2 border-ink-line px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-ink/60"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
