/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { pop, spring } from "@/lib/toy";
import { cn } from "@/lib/utils";

type Tone = "coral" | "sunny" | "mint" | "sky" | "paper";

const tones: Record<Tone, string> = {
  coral: "bg-coral text-cream",
  sunny: "bg-sunny text-ink",
  mint: "bg-mint text-ink",
  sky: "bg-sky text-cream",
  paper: "bg-paper text-ink",
};

function useMagnetic(strength = 8) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return { style: { x: sx, y: sy }, onPointerMove: onMove, onPointerLeave: reset };
}

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  download?: string;
  tone?: Tone;
  className?: string;
  cursorLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function ToyButton({
  children,
  to,
  href,
  download,
  tone = "coral",
  className,
  cursorLabel,
  onClick,
  type = "button",
}: Props) {
  const magnetic = useMagnetic();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wide hard",
    tones[tone],
    className,
  );

  const motionProps = {
    ...magnetic,
    whileTap: { scale: 0.94 },
    transition: spring,
    onClick: () => {
      pop();
      onClick?.();
    },
    "data-cursor": cursorLabel,
    className: classes,
  };

  if (href) {
    return (
      <motion.div {...magnetic} className="inline-block">
        <a
          href={href}
          download={download}
          onClick={() => {
            pop();
            onClick?.();
          }}
          data-cursor={cursorLabel}
          className={classes}
        >
          {children}
        </a>
      </motion.div>
    );
  }

  if (to) {
    return (
      <motion.div {...magnetic} className="inline-block">
        <Link to={to} onClick={() => pop()} data-cursor={cursorLabel} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} type={type}>
      {children}
    </motion.button>
  );
}

export { useMagnetic };
