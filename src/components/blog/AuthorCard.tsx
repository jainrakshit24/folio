/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * The "written by" block under every article. Rendered once in the article
 * route, so a new post picks it up without anyone remembering to add it.
 *
 * Laid out like Medium's author card - avatar on top, centred, stacked
 * actions - but wearing this site's ink borders, hard shadows and display
 * type. No image and no hooks: the avatar is a styled span, so the card adds
 * no request and cannot shift the layout.
 */
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { POSTS } from "@/lib/blog";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/jainrakshit24", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/jainrakshit24", Icon: Linkedin },
  { label: "Email", href: "mailto:itsrakshitjain@gmail.com", Icon: Mail },
];

export function AuthorCard() {
  return (
    <aside className="toy-card mt-12 px-5 py-9 sm:px-8 sm:py-10" aria-label="About the author">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="ink-border hard flex h-20 w-20 items-center justify-center rounded-full bg-coral font-display text-3xl font-extrabold text-cream"
        >
          R
        </span>

        <p className="num mt-5 text-[11px] uppercase tracking-[0.2em] text-ink/55">Written by</p>
        <h2 className="font-display text-[1.7rem] font-extrabold leading-tight tracking-tight">
          Rakshit Jain
        </h2>

        {/* Stands where Medium puts follower counts. Real numbers only. */}
        <p className="num mt-1.5 text-[11px] uppercase tracking-[0.14em] text-ink/55">
          {POSTS.length} articles · Delhi NCR
        </p>

        <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
          Data Engineer at Careers360. I work in the layer nobody screenshots: the pipeline, the
          validation, the query that has to come back in under a second.
        </p>

        <div className="mt-7 flex w-full flex-col gap-2.5">
          <Link
            to="/blog"
            className="ink-border hard inline-flex min-h-11 items-center justify-center rounded-full bg-sunny px-6 py-2.5 font-display text-[13px] font-extrabold uppercase tracking-[0.1em] text-ink transition-transform hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px]"
          >
            Read more articles
          </Link>
          <Link
            to="/work"
            className="ink-border hard-sm inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-6 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-sand"
          >
            Things I've built
          </Link>
          <Link
            to="/services"
            className="ink-border hard-sm inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-6 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-sand"
          >
            Freelance work
          </Link>
          {/* The footer already jokes about coffee; this is the same joke, paid. */}
          <a
            href="https://buymeacoffee.com/jainrakshit"
            target="_blank"
            rel="noopener noreferrer"
            className="ink-border hard-sm inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-paper px-6 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-sunny"
          >
            Buy me a coffee
            <span aria-hidden="true">☕</span>
          </a>
        </div>

        <Link
          to="/about"
          className="num mt-6 text-[11px] uppercase tracking-[0.16em] text-ink/60 underline-offset-4 hover:text-ink hover:underline"
        >
          More about me
        </Link>

        <ul className="mt-4 flex items-center gap-2.5">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="ink-border hard-sm flex h-10 w-10 items-center justify-center rounded-full bg-paper transition-transform hover:-translate-y-0.5 hover:bg-sunny"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
