/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT, prefersReducedMotion } from "@/lib/toy";

export function Preloader({ onDone }: { onDone: () => void }) {
  // Starts true so the overlay ships inside the SSR HTML and paints on the very
  // first frame; otherwise it cannot appear until hydration, by which point the
  // visitor has already been looking at the page it is meant to be covering.
  // Repeat visits and reduced-motion never flash it: the inline script in
  // __root.tsx sets data-preloader="skip" on <html> before first paint, and CSS
  // hides it. This effect then unmounts it for real.
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("rj-preloaded") === "1";
    } catch {
      // private mode / blocked storage: treat as a first visit
    }
    if (seen || prefersReducedMotion()) {
      setShow(false);
      onDone();
      return;
    }
    const start = performance.now();
    const dur = 1900;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem("rj-preloaded", "1");
        } catch {
          // non-fatal: the next visit just plays the preloader again
        }
        setTimeout(() => setSplit(true), 220);
        setTimeout(() => {
          setShow(false);
          onDone();
        }, 1150);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <div id="preloader" className="preloader-failsafe fixed inset-0 z-[90]" aria-hidden="true">
          {(["top", "bottom"] as const).map((half) => (
            <motion.div
              key={half}
              className="absolute left-0 h-1/2 w-full overflow-hidden bg-sunny"
              style={{ [half]: 0 }}
              animate={split ? { y: half === "top" ? "-100%" : "100%" } : { y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              <div
                className="absolute left-0 w-full"
                style={{ height: "200%", top: half === "top" ? 0 : "-100%" }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
                  <p className="display-xl text-center text-ink" style={{ fontSize: "clamp(1.8rem,6vw,4rem)" }}>
                    LOADING THE FACTORY
                  </p>
                  <div className="relative h-12 w-[min(520px,80vw)] rounded-full border-2 border-ink bg-cream hard">
                    <motion.div
                      className="absolute top-1/2 h-8 w-8 rounded-[10px] border-2 border-ink bg-coral"
                      style={{ marginTop: -16 }}
                      animate={{
                        left: `calc(${pct}% - ${pct * 0.36}px)`,
                        rotate: pct * 3.6,
                        scaleY: 1 + 0.12 * Math.sin(pct * 0.9),
                      }}
                      transition={{ type: "tween", duration: 0.12 }}
                    />
                  </div>
                  <p className="num text-2xl font-bold tabular-nums text-ink">
                    {String(pct).padStart(3, "0")}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
