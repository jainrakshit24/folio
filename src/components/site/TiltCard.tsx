/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { prefersReducedMotion, spring } from "@/lib/toy";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  rest = 0,
  cursorLabel,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  /** resting rotation in degrees, straightens on hover */
  rest?: number;
  cursorLabel?: string;
  max?: number;
}) {
  const reduce = prefersReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, spring);
  const sry = useSpring(ry, spring);
  const shadow = useTransform(
    [srx, sry],
    ([a, b]: number[]) => `${4 - (b ?? 0) * 0.4}px ${4 + (a ?? 0) * 0.4}px 0 var(--ink)`,
  );

  return (
    <motion.div
      className={cn("rounded-3xl border-2 border-ink", className)}
      data-cursor={cursorLabel}
      initial={false}
      animate={{ rotate: rest }}
      whileHover={reduce ? {} : { rotate: 0, y: -4 }}
      transition={spring}
      style={{
        transformPerspective: 800,
        rotateX: reduce ? 0 : srx,
        rotateY: reduce ? 0 : sry,
        boxShadow: reduce ? "4px 4px 0 var(--ink)" : shadow,
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * max);
        rx.set(((r.top + r.height / 2 - e.clientY) / (r.height / 2)) * max);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
