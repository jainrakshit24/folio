/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/toy";

export function Marquee({ items, tilt = -2 }: { items: string[]; tilt?: number }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(prefersReducedMotion()), []);
  const run = [...items, ...items];

  return (
    <div
      data-cursor-dark
      className="marquee relative w-screen max-w-none overflow-hidden border-y-2 border-ink bg-ink py-3"
      style={{ transform: `rotate(${tilt}deg)`, marginLeft: "calc(50% - 50vw)" }}
      aria-hidden="true"
    >
      <div className={reduce ? "flex gap-8 px-4" : "marquee-track flex w-max gap-8"}>
        {(reduce ? items : run).map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="num shrink-0 text-[13px] uppercase tracking-[0.22em] text-cream"
          >
            {item}
            <span className="px-4 text-sunny">✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}
