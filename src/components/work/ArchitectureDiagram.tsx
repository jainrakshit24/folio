/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Arrow } from "@/components/site/Doodles";

/**
 * Embeds a pre-rendered architecture diagram from /public/diagrams.
 *
 * The diagram is its own static document rather than inline SVG: it carries
 * ~190 kB of its own styling, which has no business in the app bundle. The
 * iframe is lazy, so a visitor who never scrolls this far pays nothing, and the
 * caption link still works if the frame is blocked.
 */
export function ArchitectureDiagram({ src, title }: { src: string; title: string }) {
  return (
    <figure className="mt-16">
      <div className="ink-border hard overflow-hidden rounded-3xl bg-paper">
        <iframe
          src={src}
          title={`Architecture diagram: ${title}`}
          loading="lazy"
          className="block h-[460px] w-full border-0 sm:h-[560px] lg:h-[640px]"
        />
      </div>
      <figcaption className="num mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>Architecture · {title}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="OPEN"
          className="group inline-flex items-center gap-2 font-bold text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sunny"
        >
          Open full size
          <Arrow
            aria-hidden="true"
            className="h-3 w-5 transition-transform group-hover:translate-x-1"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
