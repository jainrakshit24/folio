/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { EASE_IN, EASE_OUT, prefersReducedMotion, ROUTES } from "@/lib/toy";

const PANELS = ["var(--coral)", "var(--sunny)", "var(--mint)"];

function labelFor(path: string) {
  const match = ROUTES.find((r) => r.to === path);
  if (match) return match.label.toUpperCase();
  if (path.startsWith("/work/")) return "PROJECT";
  return "LOST?";
}

export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sweeping, setSweeping] = useState(false);
  const [label, setLabel] = useState("");
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    setLabel(labelFor(pathname));
    setSweeping(true);
    window.scrollTo({ top: 0, behavior: "auto" });
    const t = setTimeout(() => setSweeping(false), 620);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {sweeping && (
        <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
          {PANELS.map((color, i) => (
            <motion.div
              key={color}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: color, borderTopRightRadius: 120, borderBottomRightRadius: 120 }}
              initial={{ x: "-105%" }}
              animate={{ x: "0%" }}
              exit={{ x: "105%" }}
              transition={{
                duration: 0.5,
                ease: sweeping ? EASE_IN : EASE_OUT,
                delay: i * 0.08,
              }}
            >
              {i === 1 && (
                <span className="display-xl text-ink" style={{ fontSize: "clamp(2rem,8vw,6rem)" }}>
                  {label}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
