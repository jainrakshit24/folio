/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { SectionLabel, WordReveal } from "@/components/site/PageShell";
import { DoodleArrow, Sparkle, Star } from "@/components/site/Doodles";
import { CONFETTI_COLORS, hasWebGL, prefersReducedMotion } from "@/lib/toy";
import { cn } from "@/lib/utils";
import type { SandboxHandle } from "@/components/playground/Sandbox";
import { seo } from "@/lib/seo";

const Sandbox = lazy(() => import("@/components/playground/Sandbox"));

const DESC = "A genuinely playable physics toy box: grab, throw and shake Rakshit Jain's skills as chunky cubes.";

export const Route = createFileRoute("/playground")({
  head: () =>
    seo({
      path: "/playground",
      title: "Playground: Go On, Break Something | Rakshit Jain",
      description: DESC,
      ogTitle: "Playground: Go On, Break Something",
    }),
  component: PlaygroundPage,
});

const SKILL_PREVIEW = [
  "PYTHON", "SQL", "ETL", "PANDAS", "NUMPY", "POWER BI", "POSTGRESQL", "MYSQL", "XGBOOST", "SCIKIT-LEARN",
  "OPTUNA", "SHAP", "LIME", "STREAMLIT", "PLAYWRIGHT", "PYTEST", "POSTMAN", "JENKINS", "GITHUB ACTIONS", "JIRA",
  "GIT", "MATPLOTLIB", "SEABORN", "EXCEL", "C++", "JAVASCRIPT", "DATA QUALITY", "INDEXING", "PARTITIONING", "EDA",
];
const BGS = ["bg-coral", "bg-sunny", "bg-mint", "bg-sky", "bg-grape"];

class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function StaticCubes({ note }: { note?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <div className="flex max-w-4xl flex-wrap justify-center gap-2">
        {SKILL_PREVIEW.map((s, i) => (
          <span key={s} style={{ rotate: `${((i * 37) % 11) - 5}deg` }}
            className={cn("ink-border hard-sm rounded-lg px-3 py-2 font-mono text-xs font-bold text-ink", BGS[i % 5])}>
            {s}
          </span>
        ))}
      </div>
      {note && <p className="font-mono text-xs text-ink/70">your browser skipped the fun part. the cubes send their regards.</p>}
    </div>
  );
}

function rewardToast(msg: ReactNode) {
  toast.custom(() => (
    <div className="ink-border hard rounded-2xl bg-paper px-5 py-4 font-mono text-sm text-ink">{msg}</div>
  ), { duration: 4000, position: "bottom-right" });
}

function PlaygroundPage() {
  const [mode, setMode] = useState<"loading" | "live" | "static" | "nogl">("loading");
  const [lowEnd, setLowEnd] = useState(false);
  const [gravityOff, setGravityOff] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [thrown, setThrown] = useState(0);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const [shaking, setShaking] = useState(false);
  const [announce, setAnnounce] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const sandbox = useRef<SandboxHandle>(null);
  const seen = useRef(new Set<number>());

  useEffect(() => {
    if (prefersReducedMotion()) return setMode("static");
    if (!hasWebGL()) return setMode("nogl");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setLowEnd(coarse || (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 768);
    setMode("live");
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const el = boxRef.current;
    const io = el ? new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.05 }) : null;
    if (el && io) io.observe(el);
    return () => { document.removeEventListener("visibilitychange", onVis); io?.disconnect(); };
  }, [mode]);

  const setCursor = useCallback((label: string) => {
    if (boxRef.current) boxRef.current.dataset["cursor"] = label || "GRAB ME";
  }, []);

  const onThrow = useCallback(() => setThrown((n) => n + 1), []);

  useEffect(() => {
    const fire = (msg: ReactNode, text: string, big?: boolean) => {
      if (seen.current.has(thrown)) return;
      seen.current.add(thrown);
      if (!prefersReducedMotion()) confetti({ particleCount: big ? 180 : 70, spread: big ? 110 : 70, origin: { y: 0.7 }, colors: CONFETTI_COLORS });
      rewardToast(msg);
      setAnnounce(text);
    };
    if (thrown === 10) fire("okay you're clearly procrastinating.", "okay you're clearly procrastinating.");
    if (thrown === 25) fire("this is more QA than some people do all sprint.", "this is more QA than some people do all sprint.");
    if (thrown === 50) fire(<Link to="/work" className="underline">fine. you win. go read the actual resume →</Link>, "fine. you win. go read the actual resume.", true);
  }, [thrown]);

  const shake = () => {
    sandbox.current?.shake();
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  };

  const live = mode === "live";

  return (
    <div className="relative">
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-28 sm:px-8 sm:pt-36">
        <SectionLabel index="06">Playground</SectionLabel>
        <h1 className="display-xl mt-6 text-ink">
          <WordReveal text="GO ON, BREAK" />
          <br />
          <span className="relative inline-block">
            <span className="absolute inset-x-[-0.1em] bottom-[0.08em] top-[0.3em] -z-10 -rotate-1 bg-coral/80" aria-hidden />
            <WordReveal text="SOMETHING." />
          </span>
        </h1>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <p className="ink-border hard-sm max-w-xl rounded-2xl bg-paper px-5 py-4 text-lg text-ink">
            No pipelines here. Just my skills, as cubes, waiting to be thrown at a wall.
          </p>
          {live && (
            <div className="flex items-center gap-2 font-mono text-sm text-ink">
              grab one ↓
              <DoodleArrow className="h-10 w-10 rotate-90 text-coral" aria-hidden />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 sm:px-6">
        <span className="sr-only">
          Decorative physics sandbox: about forty coloured cubes labelled with Rakshit's skills, which you can drag and throw around a toy box.
        </span>
        <div
          ref={boxRef}
          aria-hidden
          data-cursor="GRAB ME"
          className={cn(
            "relative h-[70vh] min-h-[420px] overflow-hidden rounded-[24px] border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] transition-colors duration-700",
            gravityOff ? "bg-grape/35" : "bg-paper",
            shaking && "animate-[box-wobble_0.4s_ease-in-out]",
          )}
          style={{ touchAction: live ? "none" : undefined }}
        >
          <Star className="pointer-events-none absolute left-5 top-5 h-8 w-8 text-sunny" />
          <Sparkle className="pointer-events-none absolute right-6 top-6 h-6 w-6 text-sky" />
          {live ? (
            <GLBoundary fallback={<StaticCubes note />}>
              <Suspense fallback={<div className="grid h-full place-items-center font-mono text-sm text-ink/60">unboxing cubes…</div>}>
                <Sandbox
                  ref={sandbox}
                  resetKey={resetKey}
                  count={lowEnd ? 20 : 40}
                  lowEnd={lowEnd}
                  gravityOff={gravityOff}
                  active={inView && tabVisible}
                  onThrow={onThrow}
                  setCursor={setCursor}
                />
              </Suspense>
            </GLBoundary>
          ) : mode === "loading" ? null : (
            <StaticCubes note={mode === "nogl"} />
          )}
        </div>

        {live && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PillButton onClick={shake} label="Shake all the cubes">SHAKE IT 🫨</PillButton>
            <PillButton onClick={() => setGravityOff((g) => !g)} label={gravityOff ? "Turn gravity back on" : "Turn gravity off"} pressed={gravityOff}>
              {gravityOff ? "GRAVITY ON 🌍" : "GRAVITY OFF 🌙"}
            </PillButton>
            <PillButton onClick={() => { setResetKey((k) => k + 1); setGravityOff(false); }} label="Reset the sandbox and drop a fresh pile">RESET ↺</PillButton>
            <span className="ml-auto font-mono text-sm font-bold tabular-nums text-ink">CUBES THROWN: {thrown}</span>
          </div>
        )}
        <div aria-live="polite" className="sr-only">{announce}</div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="font-mono text-sm font-bold tracking-widest text-ink">FROM THE FACTORY FLOOR</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { k: "LINES OF SQL WRITTEN", v: "a lot", bg: "bg-sky text-cream", r: -3 },
            { k: "COFFEE → CODE CONVERSION", v: "1:1", bg: "bg-sunny text-ink", r: 2 },
            { k: "BUGS FILED", v: "enough to be proud of", bg: "bg-mint text-ink", r: -2 },
          ].map((s) => (
            <motion.div key={s.k} initial={{ rotate: s.r }} whileHover={{ rotate: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={cn("ink-border hard rounded-2xl p-6", s.bg)}>
              <p className="font-mono text-xs font-bold tracking-wider">{s.k}</p>
              <p className="mt-3 font-display text-3xl font-black uppercase leading-none">{s.v}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-ink bg-sunny">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <h2 className="display-xl text-ink" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>DONE PLAYING?</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/work" className="ink-border hard rounded-full bg-ink px-6 py-3 font-mono text-sm font-bold text-cream transition-transform active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral">
              SEE THE REAL WORK →
            </Link>
            <Link to="/contact" className="ink-border hard rounded-full bg-paper px-6 py-3 font-mono text-sm font-bold text-ink transition-transform active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral">
              SAY HELLO 👋
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PillButton({ children, onClick, label, pressed }: { children: ReactNode; onClick: () => void; label: string; pressed?: boolean }) {
  return (
    <motion.button
      type="button" onClick={onClick} aria-label={label} aria-pressed={pressed}
      whileTap={{ scaleX: 1.08, scaleY: 0.88 }}
      className={cn(
        "ink-border hard-sm rounded-full px-5 py-2.5 font-mono text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral",
        pressed ? "bg-grape text-cream" : "bg-paper hover:bg-sunny",
      )}
    >
      {children}
    </motion.button>
  );
}
