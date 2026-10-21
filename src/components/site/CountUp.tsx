/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/toy";

/**
 * Counts up to `value` once the number scrolls into view.
 *
 * Renders the real figure on the server and on first client paint, then rewinds
 * to 0 and animates. Starting the state at 0 instead meant the SSR HTML, and
 * anyone without JS, read "0 automated tests" — a wrong number is worse than a
 * number that does not animate.
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1200,
  className,
  format,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Formats the running number, e.g. for thousands separators. */
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (prefersReducedMotion() || value === 0) {
      setShown(value);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setShown(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  // One node, not a visible copy plus an sr-only one: without aria-live nothing
  // re-announces a silent text change, so assistive tech reads whatever is here
  // when it reaches the number, and a crawler reading textContent sees "384"
  // rather than "384384".
  return (
    <span ref={ref} className={className}>
      {prefix}
      {format ? format(shown) : shown}
      {suffix}
    </span>
  );
}
