/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import {
  DATA_FILTERS,
  WEB_DETAILS,
  WEB_FILTERS,
  projectsInTrack,
  type Project,
  type Track,
} from "@/lib/projects";
import { BrowserFrame } from "@/components/site/BrowserFrame";
import { pop, spring } from "@/lib/toy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  validateSearch: (s: Record<string, unknown>): { track?: Track } =>
    s["track"] === "web" ? { track: "web" } : {},
  head: () => ({
    meta: [
      { title: "Work | Data Projects & Web Builds by Rakshit Jain" },
      {
        name: "description",
        content:
          "Data systems, models and dashboards, plus the websites Rakshit Jain builds for clients.",
      },
      { property: "og:title", content: "Work | Rakshit Jain" },
      {
        property: "og:description",
        content: "Data systems, models and dashboards, plus the websites I build for clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

function ProjectCard({ project, track }: { project: Project; track: Track }) {
  const web = track === "web";
  const prod = !!project.product;
  const featured = project.featured && !(web && prod);
  const label = prod
    ? "PRODUCT"
    : web
      ? (WEB_DETAILS[project.slug]?.type ?? project.category)
      : project.category;
  const num = prod && web ? "11" : project.num;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={spring}
      className={cn(featured && "sm:col-span-2")}
    >
      <Link
        to="/work/$slug"
        params={{ slug: project.slug }}
        data-cursor="VIEW CASE"
        onClick={() => pop()}
        aria-label={`View case study: ${project.title}`}
        className={cn(
          "group relative block h-full overflow-hidden rounded-3xl border-2 border-ink bg-paper p-6 hard transition-transform hover:-translate-y-1 sm:p-8",
          featured && "bg-sky text-cream",
        )}
      >
        {/* gradient sweep on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-mint/35 to-sunny/45 transition-transform duration-700 ease-out group-hover:translate-x-full"
        />

        {web && (
          <div className="relative -mx-6 -mt-6 mb-5 border-b-2 border-ink sm:-mx-8 sm:-mt-8">
            <BrowserFrame
              url={prod ? "localhost:8501 · self-hosted" : project.links?.[0]?.label}
              tone={project.tone}
            />
          </div>
        )}
        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <span
              className={cn("num text-sm font-bold", featured ? "text-cream/80" : "text-coral")}
            >
              {num}
            </span>
            <span className="flex flex-wrap justify-end gap-2">
              {prod ? (
                <span
                  className={cn(
                    "num rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-bold",
                    web ? "bg-sky text-cream" : "bg-mint text-ink",
                  )}
                >
                  {web ? "FULL-STACK PRODUCT" : "OPEN SOURCE"}
                </span>
              ) : (
                web && (
                  <span className="num rounded-full border-2 border-ink bg-sunny px-2 py-0.5 text-[10px] font-bold text-ink">
                    DEMO BUILD
                  </span>
                )
              )}
              <span className="label-pill bg-paper text-[10px] text-ink">{label}</span>
            </span>
          </div>

          <h2
            className={cn(
              "font-display font-extrabold leading-[0.95] tracking-tight transition-transform duration-300 group-hover:translate-x-2",
              featured ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl",
            )}
          >
            {project.title}
          </h2>

          <p className={cn("text-base leading-relaxed", featured && "max-w-2xl text-lg")}>
            {project.outcome}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className={cn(
                  "num rounded-full border-2 border-ink px-2.5 py-1 text-[11px] uppercase tracking-[0.08em]",
                  featured ? "bg-cream text-ink" : "bg-sand",
                )}
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <span className="flex flex-wrap gap-2">
              {!web &&
                !prod &&
                project.links?.map((l) => (
                  <span
                    key={l.label}
                    className="num rounded-full border-2 border-ink bg-sunny px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-ink"
                  >
                    {l.label}
                  </span>
                ))}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "flex items-center gap-1 font-display text-sm font-bold uppercase transition-transform duration-300 group-hover:translate-x-1",
                featured ? "text-cream" : "text-coral",
              )}
            >
              Case study <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Work() {
  const { track = "data" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [filter, setFilter] = useState<string>("ALL");
  const filters = track === "web" ? WEB_FILTERS : DATA_FILTERS;
  const visible = projectsInTrack(track).filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "PRODUCT") return !!p.product;
    if (p.product) return false;
    return track === "web" ? WEB_DETAILS[p.slug]?.type === filter : p.category === filter;
  });

  const switchTrack = (t: Track) => {
    if (t === track) return;
    setFilter("ALL");
    pop();
    navigate({ search: t === "web" ? { track: "web" } : {}, replace: true, resetScroll: false });
  };

  return (
    <PageShell
      index="02"
      label="Work"
      title="THINGS I'VE BUILT."
      tone="sand"
      intro="Data systems, models and dashboards, plus the websites I build for clients."
    >
      <div
        role="group"
        aria-label="Type of work"
        className="mb-6 grid max-w-2xl grid-cols-2 overflow-hidden rounded-2xl border-2 border-ink hard"
      >
        {(
          [
            ["data", "DATA & ANALYTICS"],
            ["web", "FREELANCE"],
          ] as const
        ).map(([t, l], i) => {
          const active = t === track;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => switchTrack(t)}
              className={cn(
                "min-h-14 px-4 py-4 font-display text-sm font-extrabold uppercase tracking-wide transition-colors sm:text-lg",
                i === 1 && "border-l-2 border-ink",
                active ? "bg-coral text-cream" : "bg-paper text-ink hover:bg-sand",
              )}
            >
              {l}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={track}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.3 }}
        >
          <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(f);
                    pop();
                  }}
                  className={cn(
                    "num min-h-11 rounded-full border-2 border-ink px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] hard-sm transition-transform hover:-translate-y-0.5",
                    active ? "bg-sunny" : "bg-paper",
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <LayoutGroup>
            <motion.div layout className="grid gap-6 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                  <ProjectCard key={p.slug} project={p} track={track} />
                ))}
                {track === "web" && (
                  <motion.div
                    key="cta"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="sm:col-span-2"
                  >
                    <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border-2 border-ink bg-sky p-8 text-cream hard sm:flex-row sm:items-center">
                      <h2 className="font-display text-3xl font-extrabold uppercase leading-none sm:text-5xl">
                        Want one like these?
                      </h2>
                      <Link
                        to="/services"
                        onClick={() => pop()}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3 font-display text-sm font-bold uppercase text-ink hard-sm transition-transform hover:-translate-y-0.5"
                      >
                        See services &amp; pricing <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </AnimatePresence>
    </PageShell>
  );
}
