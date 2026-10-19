/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { CountUp } from "@/components/site/CountUp";
import { WordReveal } from "@/components/site/PageShell";
import { WEB_DETAILS, type Project } from "@/lib/projects";
import { EASE_IN, pop } from "@/lib/toy";
import { cn } from "@/lib/utils";

const MARKERS = ["bg-coral", "bg-sunny", "bg-mint", "bg-sky", "bg-grape"];
const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: EASE_IN },
};

function Head({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="num text-xs font-bold text-coral">{index}</span>
      <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">{label}</h2>
      <span className="h-[2px] flex-1 bg-ink/15" />
    </div>
  );
}

function ParallaxFrame({ project }: { project: Project }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });
  return (
    <motion.div
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE_IN }}
    >
      <BrowserFrame
        url={project.links?.[0]?.label}
        tone={project.tone}
        tall
        className="rounded-3xl border-2 border-ink bg-paper hard"
      />
    </motion.div>
  );
}

function LinkBtn({
  label,
  href,
  primary,
}: {
  label: string;
  href?: string | undefined;
  primary?: boolean;
}) {
  const real = href && href !== "#";
  const base =
    "inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wide";
  if (!real)
    return (
      <span aria-disabled="true" className={cn(base, "cursor-not-allowed bg-sand text-ink/50")}>
        {label} <span className="num text-[10px] tracking-[0.15em]">· LINK COMING SOON</span>
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => pop()}
      className={cn(
        base,
        "hard transition-transform hover:-translate-y-0.5",
        primary ? "bg-coral text-cream" : "bg-paper",
      )}
    >
      {label}
    </a>
  );
}

function Neighbour({ project, dir }: { project: Project; dir: "prev" | "next" }) {
  const next = dir === "next";
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      onClick={() => pop()}
      data-cursor="VIEW BUILD"
      className={cn(
        "group block border-t-2 border-ink px-5 py-10 sm:px-8",
        next ? "bg-cream" : "bg-sand",
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
        {!next && <ArrowLeft aria-hidden="true" size={20} />}
        <div className={cn("flex-1", next && "text-right")}>
          <span className="num text-[11px] font-bold uppercase tracking-[0.2em] text-coral">
            {next ? "Next build" : "Previous build"}
          </span>
          <p className="font-display text-2xl font-extrabold uppercase sm:text-4xl">
            {project.title}
          </p>
        </div>
        {next && <ArrowRight aria-hidden="true" size={20} />}
      </div>
    </Link>
  );
}

export function WebCaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project | undefined;
  next?: Project | undefined;
}) {
  const d = WEB_DETAILS[project.slug];
  if (!d) return null;
  const live = project.status.toLowerCase() === "live";
  const results = [
    ...project.results.slice(0, 2),
    { value: d.built.length, label: "pages & features shipped" },
  ];

  return (
    <main id="main" className="relative min-h-screen pt-32">
      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            to="/work"
            search={{ track: "web" }}
            onClick={() => pop()}
            className="label-pill bg-paper inline-flex items-center gap-2"
          >
            <ArrowLeft aria-hidden="true" size={12} /> All web builds
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="num text-sm font-bold text-coral">{project.num}</span>
                <span className="num rounded-full border-2 border-ink bg-sunny px-2.5 py-0.5 text-[11px] font-bold">
                  {live ? "LIVE" : "DEMO BUILD"}
                </span>
                <span className="label-pill bg-paper text-[10px]">{d.type}</span>
              </div>
              <h1 className="display-xl mt-3 break-words">
                <WordReveal text={project.title} />
              </h1>
              <motion.p
                className="mt-5 max-w-xl rounded-2xl border-2 border-ink bg-paper p-4 text-lg hard-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE_IN }}
              >
                {project.outcome}
              </motion.p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="num rounded-full border-2 border-ink bg-sand px-3 py-1 text-[11px] uppercase tracking-[0.08em]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <ParallaxFrame project={project} />
          </div>

          <dl
            data-cursor-dark
            className="num mt-12 grid grid-cols-2 gap-4 rounded-2xl border-2 border-ink bg-ink p-5 text-cream sm:grid-cols-4"
          >
            {[
              ["ROLE", "Design + Build + Deploy"],
              ["TIMELINE", d.timeline],
              ["STACK", project.tags.slice(0, 3).join(" · ")],
              ["STATUS", live ? "Live" : "Demo build"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-bold tracking-[0.2em] opacity-60">{k}</dt>
                <dd className="mt-1 text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        className="mt-16 px-5 pb-20 sm:px-8"
        style={{ background: "color-mix(in oklab, var(--cream) 82%, transparent)" }}
      >
        <div className="mx-auto w-full max-w-4xl space-y-16 pt-14">
          <motion.section {...fade}>
            <Head index="01" label="The brief" />
            <p className="rounded-3xl border-2 border-ink bg-paper p-6 text-lg leading-relaxed hard-sm">
              {d.brief}
            </p>
          </motion.section>

          <section>
            <Head index="02" label="What I built" />
            <ul className="space-y-3">
              {d.built.map((b, i) => (
                <motion.li
                  key={b}
                  {...fade}
                  transition={{ ...fade.transition, delay: i * 0.06 }}
                  className="flex items-start gap-4 rounded-2xl border-2 border-ink bg-paper p-4"
                >
                  <span
                    className={cn(
                      "mt-1 h-4 w-4 shrink-0 border-2 border-ink",
                      MARKERS[i % MARKERS.length],
                    )}
                  />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </section>

          <motion.section {...fade}>
            <Head index="03" label="The interesting problem" />
            <div className="rounded-3xl border-2 border-ink bg-sunny p-6 hard sm:p-8">
              <h3 className="font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
                {d.problem.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed">{d.problem.body}</p>
            </div>
          </motion.section>

          <section>
            <Head index="04" label="The result" />
            <div className="grid gap-4 sm:grid-cols-3">
              {results.map((m) => (
                <motion.div
                  key={m.label}
                  {...fade}
                  className="flex flex-col-reverse rounded-3xl border-2 border-ink bg-paper p-6 hard"
                >
                  <dt className="mt-2 text-sm">{m.label}</dt>
                  <dd className="num text-4xl font-extrabold tabular-nums text-coral">
                    <CountUp value={m.value} prefix={m.prefix ?? ""} suffix={m.suffix ?? ""} />
                  </dd>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            <LinkBtn label="Visit site ↗" href={d.site} primary />
            <LinkBtn label="View code ↗" href={d.code} />
          </section>
        </div>
      </div>

      {prev && <Neighbour project={prev} dir="prev" />}
      {next && <Neighbour project={next} dir="next" />}

      <Link
        to="/services"
        onClick={() => pop()}
        className="group block border-t-2 border-ink bg-sky px-5 py-14 text-cream sm:px-8"
      >
        <p className="mx-auto flex max-w-5xl items-center justify-between gap-4 font-display text-3xl font-extrabold uppercase sm:text-5xl">
          Need something like this?
          <ArrowRight
            className="shrink-0 transition-transform group-hover:translate-x-2"
            size={40}
          />
        </p>
      </Link>
    </main>
  );
}
