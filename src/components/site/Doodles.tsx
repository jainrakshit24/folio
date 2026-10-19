/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function Star(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M12 2c.8 5.2 4 8.4 9.2 9.2C16 12 12.8 15.2 12 20.4 11.2 15.2 8 12 2.8 11.2 8 10.4 11.2 7.2 12 2Z"
        fill="currentColor"
        stroke="#171512"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle(props: P) {
  return (
    <svg viewBox="0 0 120 12" aria-hidden="true" fill="none" {...props}>
      <path
        d="M2 8c8-8 16 8 24 0s16 8 24 0 16 8 24 0 16 8 24 0"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn underline that draws itself in on mount. */
export function DrawnUnderline(props: P) {
  return (
    <svg viewBox="0 0 300 18" aria-hidden="true" fill="none" preserveAspectRatio="none" {...props}>
      <path
        className="draw-in"
        d="M4 12c46-8 96 6 142-2 38-6 78 4 152-4"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Arrow(props: P) {
  return (
    <svg viewBox="0 0 32 24" aria-hidden="true" fill="none" {...props}>
      <path d="M2 12h26M20 4l8 8-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Curvy hand-drawn arrow, points right-down toward the 3D scene. */
export function DoodleArrow(props: P) {
  return (
    <svg viewBox="0 0 64 40" aria-hidden="true" fill="none" {...props}>
      <path
        d="M3 8c14 2 26 10 34 22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M30 30l8 3 1-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Dots(props: P) {
  return (
    <svg viewBox="0 0 48 12" aria-hidden="true" fill="currentColor" {...props}>
      <circle cx="6" cy="6" r="4" />
      <circle cx="24" cy="6" r="4" />
      <circle cx="42" cy="6" r="4" />
    </svg>
  );
}

/* ---- chunky doodle icons for the "what I do" cards ---- */

export function IconPipes(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" {...props}>
      <rect x="4" y="8" width="14" height="14" rx="4" fill="currentColor" stroke="#171512" strokeWidth="2.5" />
      <rect x="30" y="26" width="14" height="14" rx="4" fill="#FFC531" stroke="#171512" strokeWidth="2.5" />
      <path d="M18 15h10a5 5 0 0 1 5 5v6" stroke="#171512" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 26v6a5 5 0 0 0 5 5h9" stroke="#171512" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IconChart(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" {...props}>
      <rect x="5" y="26" width="9" height="16" rx="3" fill="currentColor" stroke="#171512" strokeWidth="2.5" />
      <rect x="19" y="16" width="9" height="26" rx="3" fill="#23D5A0" stroke="#171512" strokeWidth="2.5" />
      <rect x="33" y="6" width="9" height="36" rx="3" fill="#FF5A36" stroke="#171512" strokeWidth="2.5" />
    </svg>
  );
}

export function IconShield(props: P) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" fill="none" {...props}>
      <path
        d="M24 4l16 6v13c0 10-7 17-16 21-9-4-16-11-16-21V10l16-6Z"
        fill="currentColor"
        stroke="#171512"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M16 24l6 6 11-12" stroke="#171512" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
