/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * The 404 body, shared by the splat route and the router's notFoundComponent
 * so that a missing article and a missing page look the same - and so that
 * neither falls back to the unstyled default.
 */
import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SectionLabel, WordReveal } from "@/components/site/PageShell";
import { EASE_IN } from "@/lib/toy";

export function NotFound() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <main
      id="main"
      className="mx-auto flex min-h-[85dvh] max-w-6xl flex-col items-start justify-center px-5 pb-20 pt-32 sm:px-8"
    >
      <SectionLabel index="404">Not found</SectionLabel>
      <h1 className="display-xl mt-6 text-ink" style={{ fontSize: "clamp(2.6rem, 9vw, 8rem)" }}>
        <WordReveal text="QUERY RETURNED" />
        <br />
        <span className="relative inline-block">
          <span
            className="absolute inset-x-[-0.1em] bottom-[0.08em] top-[0.3em] -z-10 -rotate-1 bg-sunny"
            aria-hidden
          />
          <WordReveal text="0 ROWS." />
        </span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_IN, delay: 0.4 }}
        className="ink-border hard-sm mt-8 max-w-3xl break-words rounded-2xl bg-paper px-5 py-4 font-mono text-sm text-ink sm:text-base"
      >
        SELECT * FROM pages WHERE url = &apos;
        <span className="font-bold text-coral">{path}</span>&apos; returned 0 rows.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_IN, delay: 0.55 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <Link
          to="/"
          className="ink-border hard inline-flex min-h-11 items-center rounded-full bg-coral px-7 py-3 font-mono text-sm font-bold text-cream transition-transform active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/50"
        >
          BACK TO HOME
        </Link>
        <Link
          to="/blog"
          className="ink-border hard inline-flex min-h-11 items-center rounded-full bg-paper px-7 py-3 font-mono text-sm font-bold text-ink transition-transform active:translate-x-[2px] active:translate-y-[2px] hover:bg-sunny focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral/50"
        >
          READ THE BLOG
        </Link>
      </motion.div>
    </main>
  );
}
