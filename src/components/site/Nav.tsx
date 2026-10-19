/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { EASE_IN, isSoundEnabled, pop, ROUTES, setSoundEnabled, spring } from "@/lib/toy";
import { useMagnetic } from "./ToyButton";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(false);
  const [clicks, setClicks] = useState(0);
  const magnetic = useMagnetic(6);

  useEffect(() => {
    const on = isSoundEnabled();
    setSound(on);
    setSoundEnabled(on);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 120 && y > prev);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (clicks < 5) return;
    document.documentElement.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    document.documentElement.style.transform = "rotate(2deg)";
    const t = setTimeout(() => {
      document.documentElement.style.transform = "";
      setClicks(0);
    }, 2600);
    return () => clearTimeout(t);
  }, [clicks]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    setSoundEnabled(next);
    if (next) pop(680);
  };

  return (
    <>
      <motion.header
        className="fixed left-1/2 top-4 z-[75] w-[min(1080px,calc(100vw-1.5rem))] -translate-x-1/2"
        animate={{ y: hidden ? -110 : 0, scale: hidden ? 0.96 : 1 }}
        transition={spring}
      >
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-3 rounded-full border-2 border-ink bg-paper px-3 py-2 hard"
        >
          <motion.button
            {...magnetic}
            onClick={() => {
              setClicks((c) => c + 1);
              pop(440);
            }}
            className="rounded-full px-3 py-1 font-display text-lg font-extrabold tracking-tight"
            data-cursor="TILT ME"
            aria-label="Rakshit Jain wordmark"
          >
            RAKSHIT <span className="text-coral">✱</span>
          </motion.button>

          <ul className="hidden items-center gap-1 lg:flex">
            {ROUTES.map((r) => {
              const active = r.to === "/" ? pathname === "/" : pathname.startsWith(r.to);
              return (
                <li key={r.to}>
                  <Link
                    to={r.to}
                    onClick={() => pop()}
                    className={cn(
                      "num rounded-full border-2 border-transparent px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
                      active ? "border-ink bg-coral text-cream" : "hover:border-ink hover:bg-sunny",
                    )}
                  >
                    {r.full ? <span title={r.full} aria-label={r.full}>{r.label}</span> : r.label}
                    {r.isNew && <span aria-label="new" className="ml-1 inline-block h-1.5 w-1.5 -translate-y-1.5 rounded-full bg-coral ring-1 ring-ink" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              aria-pressed={sound}
              aria-label={sound ? "Turn sound off" : "Turn sound on"}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-ink bg-cream p-2 hard-sm"
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => {
                setOpen((o) => !o);
                pop();
              }}
              aria-expanded={open}
              aria-label="Open menu"
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-ink bg-sunny p-2 hard-sm lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[74] overflow-y-auto bg-sunny px-6 pb-16 pt-28 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE_IN }}
          >
            <ul className="flex flex-col gap-2">
              {ROUTES.map((r, i) => (
                <motion.li
                  key={r.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, ...spring }}
                >
                  <Link
                    to={r.to}
                    className="flex min-h-11 items-center gap-4 py-0.5 font-display text-3xl font-extrabold uppercase sm:text-4xl"
                  >
                    <span
                      aria-hidden="true"
                      className="w-6 shrink-0 text-center text-xl text-coral sm:w-7 sm:text-2xl"
                    >
                      {r.doodle}
                    </span>
                    <span>{r.full ?? r.label}</span>
                    {r.isNew && <span aria-label="new" className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
