/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Link } from "@tanstack/react-router";

import { ToyButton } from "./ToyButton";
import { Arrow, Star } from "./Doodles";

export function Footer() {
  return (
    <footer className="relative z-10 border-t-4 border-ink bg-paper px-5 py-14 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-xl" style={{ fontSize: "clamp(2rem,7vw,4.5rem)" }}>
            SAY HELLO <span className="doodle inline-block">👋</span>
          </h2>
          <ToyButton to="/contact" tone="coral" cursorLabel="SAY HI">
            Start a conversation
          </ToyButton>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Email",
              value: "itsrakshitjain@gmail.com",
              href: "mailto:itsrakshitjain@gmail.com",
            },
            { label: "Phone", value: "+91 72067 53199", href: "tel:+917206753199" },
            {
              label: "LinkedIn",
              value: "/in/jainrakshit24",
              href: "https://linkedin.com/in/jainrakshit24",
            },
            { label: "GitHub", value: "@jainrakshit24", href: "https://github.com/jainrakshit24" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                data-cursor="TAP"
                className="toy-card flex flex-col gap-1 px-4 py-3 transition-transform hover:-translate-y-1"
              >
                <span className="num text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-display text-base font-bold">{item.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/services"
          data-cursor="SEE SERVICES"
          className="group ink-border hard flex items-center justify-between gap-4 rounded-[20px] bg-sky px-5 py-4 text-cream transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sunny"
        >
          <span className="min-w-0">
            <span className="num block text-[11px] font-bold uppercase tracking-[0.2em] text-cream/80">
              Freelance
            </span>
            <span className="mt-1 block font-display text-lg font-bold leading-tight">
              Websites · Landing Pages · Dashboards
            </span>
          </span>
          <span className="num flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]">
            <span className="hidden sm:inline">See services</span>
            <Arrow
              aria-hidden="true"
              className="h-4 w-6 transition-transform group-hover:translate-x-1"
            />
          </span>
        </Link>

        <p className="num flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
          <Star aria-hidden="true" className="h-4 w-4 text-sunny" />
          Built with too much coffee ☕ · Delhi NCR
        </p>
      </div>
    </footer>
  );
}
