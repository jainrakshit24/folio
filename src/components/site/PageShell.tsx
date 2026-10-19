/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_IN } from "@/lib/toy";
import { Squiggle } from "./Doodles";

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <span className="label-pill bg-paper">
      ( {index} ) {children}
    </span>
  );
}

export function WordReveal({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.7, ease: EASE_IN }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function PageShell({
  index,
  label,
  title,
  intro,
  tone = "cream",
  children,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  tone?: "cream" | "sunny" | "mint" | "sky" | "sand";
  children?: ReactNode;
}) {
  const wash = {
    cream: "var(--cream)",
    sunny: "var(--sunny)",
    mint: "var(--mint)",
    sky: "var(--sky)",
    sand: "var(--sand)",
  }[tone];

  return (
    <main
      id="main"
      className="relative min-h-screen px-5 pb-24 pt-32 sm:px-8"
      style={{ background: `color-mix(in oklab, ${wash} 78%, transparent)` }}
    >
      <motion.div
        className="mx-auto w-full max-w-5xl"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.6, ease: EASE_IN }}
        >
          <SectionLabel index={index}>{label}</SectionLabel>
        </motion.div>

        <h1 className="display-xl mt-6">
          <WordReveal text={title} />
        </h1>

        <Squiggle aria-hidden="true" className="mt-3 h-3 w-40 text-coral" />

        {intro && (
          <motion.p
            className="prose-measure mt-6 text-lg"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE_IN }}
          >
            {intro}
          </motion.p>
        )}

        <motion.div
          className="mt-12"
          variants={{ hidden: { opacity: 0, y: 30, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
          transition={{ duration: 0.6, ease: EASE_IN }}
        >
          {children}
        </motion.div>
      </motion.div>
    </main>
  );
}

export function PlaceholderCard({ note }: { note: string }) {
  return (
    <div className="toy-card p-6">
      <p className="num text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Coming next</p>
      <p className="mt-2 text-base">{note}</p>
    </div>
  );
}
