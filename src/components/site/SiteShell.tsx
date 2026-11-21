/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";
import { PageTransition } from "./PageTransition";
import { SmoothScroll } from "./SmoothScroll";
import { FactoryCanvas } from "@/components/factory/FactoryCanvas";
import { Toaster } from "@/components/ui/sonner";
import { usePageViewTracking } from "@/lib/analytics";

export function SiteShell({ children }: { children: ReactNode }) {
  // Flips once the preloader has finished (or decided to skip itself), which
  // gates the WebGL chunk so it never competes with the preloader animation.
  const [ready, setReady] = useState(false);

  // The GoatCounter script only sees the first load; every client-side route
  // change after that has to be reported by hand.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  usePageViewTracking(pathname);

  // The blog is a reading surface, and a reader usually arrives cold from
  // search. It keeps the nav and the footer so the rest of the site stays
  // reachable, and drops everything that costs time before the text appears:
  // the ~3s preloader, the WebGL island, smooth scroll, the custom cursor.
  // Leaving FactoryCanvas unmounted is what keeps rapier and drei out of an
  // article - its scene is lazy, so those chunks are never requested at all.
  const isBlog = pathname === "/blog" || pathname.startsWith("/blog/");

  // One tree, with the extras switched off on the blog, rather than two trees.
  // A `false` still occupies its slot in the children array, so Nav, Footer and
  // Toaster keep their position and survive a blog-to-site navigation instead
  // of remounting (which would reset nav state and refetch the visitor count).
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-sunny focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      {!isBlog && <SmoothScroll />}
      {!isBlog && <FactoryCanvas active={ready} />}
      <Nav />
      <div className="relative z-10">{children}</div>
      <Footer />
      {!isBlog && <PageTransition />}
      {!isBlog && <CustomCursor />}
      <Toaster position="bottom-center" />
      {!isBlog && <div className="grain-overlay" aria-hidden="true" />}
      {!isBlog && <Preloader onDone={() => setReady(true)} />}
    </>
  );
}
