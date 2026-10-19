/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useState, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";
import { PageTransition } from "./PageTransition";
import { SmoothScroll } from "./SmoothScroll";
import { FactoryCanvas } from "@/components/factory/FactoryCanvas";
import { Toaster } from "@/components/ui/sonner";

export function SiteShell({ children }: { children: ReactNode }) {
  // Flips once the preloader has finished (or decided to skip itself), which
  // gates the WebGL chunk so it never competes with the preloader animation.
  const [ready, setReady] = useState(false);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-sunny focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <FactoryCanvas active={ready} />
      <Nav />
      <div className="relative z-10">{children}</div>
      <Footer />
      <PageTransition />
      <CustomCursor />
      <Toaster position="bottom-center" />
      <div className="grain-overlay" aria-hidden="true" />
      <Preloader onDone={() => setReady(true)} />
    </>
  );
}
