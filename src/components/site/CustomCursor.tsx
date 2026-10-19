/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/toy";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement[]>([]);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");
    const reduced = prefersReducedMotion();

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const trailPos = Array.from({ length: 5 }, () => ({ ...target }));
    let raf = 0;

    let visible = false;
    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      if (root.current) root.current.style.opacity = v ? "1" : "0";
    };
    const hitTest = () => {
      const under = document.elementFromPoint(target.x, target.y) as HTMLElement | null;
      const el = under?.closest?.("[data-cursor],a,button,select,label") as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset?.["cursor"] ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
      // An ink cursor disappears over the ink-filled bands. Sections opt in with
      // data-cursor-dark rather than this sniffing background colours, which
      // would mean walking the tree for the first non-transparent ancestor.
      setOnDark(!!under?.closest?.("[data-cursor-dark]"));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        pos.x = target.x;
        pos.y = target.y;
        trailPos.forEach((p) => { p.x = target.x; p.y = target.y; });
      }
      setVisible(true);
      hitTest();
    };
    const onLeave = () => setVisible(false);
    const onScroll = () => { if (visible) hitTest(); };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.45;
      pos.y += (target.y - pos.y) * 0.45;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (!reduced) {
        let prev = pos;
        trailPos.forEach((p, i) => {
          p.x += (prev.x - p.x) * 0.35;
          p.y += (prev.y - p.y) * 0.35;
          const node = trail.current[i];
          if (node) node.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
          prev = p;
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2147483647] opacity-0 transition-opacity duration-150">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(n) => {
            if (n) trail.current[i] = n;
          }}
          className={cn("absolute left-0 top-0 rounded-full", onDark ? "bg-cream" : "bg-ink")}
          style={{ width: 6 - i, height: 6 - i, opacity: 0.35 - i * 0.06 }}
        />
      ))}
      <div
        ref={dot}
        className={cn(
            "absolute left-0 top-0 flex items-center justify-center rounded-full border-2 transition-[width,height,background-color,border-color] duration-200",
            onDark && !active && !label ? "border-cream" : "border-ink",
          )}
        style={{
          width: label ? 92 : active ? 44 : 26,
          height: label ? 92 : active ? 44 : 26,
          backgroundColor: active || label ? "var(--sunny)" : "transparent",
        }}
      >
        {label ? (
          <span className="num text-[10px] font-bold uppercase tracking-[0.15em] text-ink">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
