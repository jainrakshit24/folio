/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
export const PALETTE = {
  cream: "#FFF6EC",
  paper: "#FFFFFF",
  ink: "#171512",
  coral: "#FF5A36",
  sunny: "#FFC531",
  mint: "#23D5A0",
  sky: "#3D6DFF",
  grape: "#8B5CF6",
  sand: "#EFE3D3",
} as const;

export const CONFETTI_COLORS = [
  PALETTE.coral,
  PALETTE.sunny,
  PALETTE.mint,
  PALETTE.sky,
  PALETTE.grape,
];

export const spring = { type: "spring" as const, stiffness: 260, damping: 20 };
export const softSpring = { type: "spring" as const, stiffness: 160, damping: 22 };
export const EASE_IN = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT = [0.76, 0, 0.24, 1] as const;

export const ROUTES = [
  { to: "/", label: "Home", doodle: "★" },
  { to: "/about", label: "About", doodle: "✦" },
  { to: "/work", label: "Work", doodle: "◆" },
  { to: "/services", label: "Services", full: "Freelance", doodle: "▣", isNew: true },
  { to: "/skills", label: "Skills", doodle: "✱" },
  { to: "/experience", label: "Experience", doodle: "➜" },
  { to: "/education", label: "Education", doodle: "✧" },
  { to: "/playground", label: "Playground", doodle: "●" },
  { to: "/contact", label: "Contact", doodle: "♥" },
] as { to: "/" | "/about" | "/work" | "/services" | "/skills" | "/experience" | "/education" | "/playground" | "/contact"; label: string; full?: string; doodle: string; isNew?: boolean }[];

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/* ---- tiny sound engine (off by default, never autoplays) ---- */
let audioCtx: AudioContext | null = null;
let soundOn = false;

export function setSoundEnabled(on: boolean) {
  soundOn = on;
  if (typeof window !== "undefined") localStorage.setItem("rj-sound", on ? "1" : "0");
}

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("rj-sound") === "1";
}

export function pop(freq = 520) {
  if (!soundOn || typeof window === "undefined") return;
  try {
    audioCtx ??= new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.6, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch {
    /* ignore */
  }
}
