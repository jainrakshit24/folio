/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { hasWebGL, prefersReducedMotion } from "@/lib/toy";
import { SvgFactory } from "./SvgFactory";

// three + drei live behind this boundary so they stay out of the entry chunk.
const FactoryScene = lazy(() => import("./FactoryScene"));

/**
 * Persistent WebGL world. Mounted once in __root and never unmounted on
 * navigation; only the scene state morphs per route.
 */
export function FactoryCanvas({ active = true }: { active?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mode, setMode] = useState<"pending" | "3d" | "flat">("pending");
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [ducks, setDucks] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const small = window.matchMedia("(max-width: 900px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    setQuality(small || weak ? "low" : "high");
    setMode(!hasWebGL() || reduced ? "flat" : "3d");
  }, []);

  // Konami code → rubber ducks
  useEffect(() => {
    const seq = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a",
    ];
    let i = 0;
    const onKey = async (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === seq[i]?.toLowerCase()) {
        i += 1;
        if (i === seq.length) {
          i = 0;
          setDucks(true);
          if (!prefersReducedMotion()) {
            const confetti = (await import("canvas-confetti")).default;
            confetti({ particleCount: 120, spread: 90, colors: ["#FF5A36", "#FFC531", "#23D5A0", "#3D6DFF"] });
          }
          setTimeout(() => setDucks(false), 12000);
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (mode === "pending") return <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;

  if (mode === "flat") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <SvgFactory />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Held back until the preloader is done. The canvas sits behind that
          full-screen overlay anyway, so nothing is visible any earlier, and
          keeping three off the main thread is what stops the progress bar
          from stuttering. Fallback is null because the canvas clears to the
          same cream as the page. */}
      {active && (
        <Suspense fallback={null}>
          <FactoryScene pathname={pathname} quality={quality} ducks={ducks} />
        </Suspense>
      )}
    </div>
  );
}
