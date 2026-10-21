/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { useVisitorCount } from "@/lib/analytics";
import { EASE_IN } from "@/lib/toy";

const withSeparators = (n: number) => n.toLocaleString("en-IN");

/**
 * Live page-view badge for the footer. Renders nothing until the count loads,
 * so there is no layout jump and no server/client mismatch, and nothing at all
 * while the number is still too small to be worth showing.
 */
export function VisitorCount() {
  const stats = useVisitorCount();
  if (!stats) return null;

  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: EASE_IN }}
      className="counter-halo inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-sunny px-4 py-2 hard-sm"
    >
      <span className="pulse-dot" aria-hidden="true" />
      <span className="num flex items-baseline gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
        <CountUp
          value={stats.count}
          format={withSeparators}
          duration={1600}
          className="font-display text-base font-extrabold tracking-normal"
        />
        page views
      </span>
    </motion.span>
  );
}
