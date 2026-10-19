/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/site/CountUp";
import { Squiggle } from "@/components/site/Doodles";
import { PageShell, WordReveal } from "@/components/site/PageShell";
import { ToyButton } from "@/components/site/ToyButton";

import { getProject, trackNeighbours, trackOf, type Project } from "@/lib/projects";
import { WebCaseStudy } from "@/components/work/WebCaseStudy";
import { QaCaseStudy } from "@/components/work/QaCaseStudy";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import { EASE_IN, pop } from "@/lib/toy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const p = getProject(params.slug);
    const title = p ? `${p.title} | Case study · Rakshit Jain` : "Case study | Rakshit Jain";
    const description = p?.outcome ?? "A closer look at one of Rakshit Jain's data projects.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Detail,
});

const SECTIONS = [
  { id: "context", label: "CONTEXT" },
  { id: "approach", label: "APPROACH" },
  { id: "results", label: "RESULTS" },
  { id: "stack", label: "STACK" },
];

function MiniNav() {
  const [active, setActive] = useState("context");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="sticky top-32 space-y-4">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => pop()}
                className="group flex items-center gap-3 num text-[11px] font-bold uppercase tracking-[0.2em]"
              >
                <span
                  className={cn(
                    "h-3 w-3 rounded-full border-2 border-ink transition-colors",
                    on ? "bg-sunny" : "bg-paper",
                  )}
                />
                <span className={cn("transition-opacity", on ? "opacity-100" : "opacity-45")}>
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SectionHead({ id, index, label }: { id: string; index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="num text-xs font-bold text-coral">{index}</span>
      <h2
        id={`${id}-heading`}
        className="font-display text-2xl font-extrabold uppercase tracking-tight"
      >
        {label}
      </h2>
      <span className="h-[2px] flex-1 bg-ink/15" />
    </div>
  );
}

function Approach({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <ol ref={ref} className="relative space-y-6 pl-12">
      <span
        aria-hidden="true"
        className="absolute left-[18px] top-2 bottom-2 w-[3px] rounded-full bg-ink/10"
      />
      <motion.span
        aria-hidden="true"
        style={{ height }}
        className="absolute left-[18px] top-2 w-[3px] rounded-full bg-sunny"
      />
      {steps.map((step, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_IN }}
          className="relative"
        >
          <span className="absolute -left-12 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper num text-[11px] font-bold hard-sm">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-base leading-relaxed">{step}</p>
        </motion.li>
      ))}
    </ol>
  );
}

function ParallaxBand({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 0.96]);

  return (
    <div
      ref={ref}
      className="mt-16 overflow-hidden rounded-3xl border-2 border-ink bg-sand hard"
      aria-label={`Diagram placeholder for ${title}`}
    >
      <motion.div style={{ scale }} className="flex h-64 items-center justify-center sm:h-80">
        <div className="text-center">
          <span className="label-pill bg-paper">Diagram soon ✱</span>
          <p className="num mt-3 text-[11px] uppercase tracking-[0.2em] opacity-60">
            Architecture sketch: {title}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function NeighbourBand({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      onClick={() => pop()}
      data-cursor="VIEW CASE"
      className={cn(
        "group block border-t-2 border-ink px-5 py-10 sm:px-8",
        isNext ? "bg-cream" : "bg-sand",
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
        {!isNext && <ArrowLeft aria-hidden="true" size={20} className="shrink-0" />}
        <div className={cn("flex-1", isNext && "text-right")}>
          <span className="num text-[11px] font-bold uppercase tracking-[0.2em] text-coral">
            {isNext ? "Next project" : "Previous project"}
          </span>
          <p
            className={cn(
              "font-display text-2xl font-extrabold uppercase leading-tight tracking-tight transition-transform duration-300 sm:text-4xl",
              isNext ? "group-hover:-translate-x-2" : "group-hover:translate-x-2",
            )}
          >
            {project.title}
          </p>
        </div>
        {isNext && <ArrowRight aria-hidden="true" size={20} className="shrink-0" />}
      </div>
    </Link>
  );
}

function Detail() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  const { prev, next } = trackNeighbours(slug);

  if (!project) {
    return (
      <PageShell
        index="02"
        label="Work"
        title="PROJECT NOT FOUND."
        tone="cream"
        intro="That case study doesn't exist, but the rest of the work does."
      >
        <ToyButton to="/work" cursorLabel="PEEK →">
          Back to work
        </ToyButton>
      </PageShell>
    );
  }

  if (project.product) return <QaCaseStudy project={project} prev={prev} next={next} />;
  if (trackOf(project) === "web") return <WebCaseStudy project={project} prev={prev} next={next} />;

  return (
    <main id="main" className="relative min-h-screen pb-0 pt-32">
      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-5xl">
          <Link
            to="/work"
            onClick={() => pop()}
            className="label-pill bg-paper inline-flex items-center gap-2"
          >
            <ArrowLeft aria-hidden="true" size={12} /> All work
          </Link>

          <p className="num mt-6 text-sm font-bold text-coral">{project.num}</p>
          <h1 className="display-xl mt-2">
            <WordReveal text={project.title} />
          </h1>
          <Squiggle aria-hidden="true" className="mt-3 h-3 w-40 text-coral" />

          <motion.p
            className="prose-measure mt-6 text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_IN }}
          >
            {project.outcome}
          </motion.p>

          <dl className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border-2 border-ink bg-paper p-6 hard sm:grid-cols-4">
            {[
              { k: "Role", v: project.role },
              { k: "Stack", v: project.tags.slice(0, 3).join(" · ") },
              { k: "Year", v: project.year },
              { k: "Status", v: project.status },
            ].map((m) => (
              <div key={m.k}>
                <dt className="num text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
                  {m.k}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-snug">{m.v}</dd>
              </div>
            ))}
          </dl>

          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => pop()}
                  data-cursor="PEEK →"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wide hard transition-transform hover:-translate-y-0.5",
                    i === 0 ? "bg-coral text-cream" : "bg-paper text-ink",
                  )}
                >
                  {l.label.toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-20 px-5 pb-24 sm:px-8"
        style={{ background: "color-mix(in oklab, var(--cream) 80%, transparent)" }}
      >
        <div className="mx-auto grid w-full max-w-5xl gap-12 pt-16 lg:grid-cols-[160px_1fr]">
          <MiniNav />

          <div>
            <section id="context" aria-labelledby="context-heading">
              <SectionHead id="context" index="01" label="Context" />
              <div className="space-y-5">
                {project.context.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: EASE_IN }}
                    className="rounded-3xl border-2 border-ink bg-paper p-6 text-base leading-relaxed hard-sm"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>
            </section>

            <section id="approach" aria-labelledby="approach-heading" className="mt-16">
              <SectionHead id="approach" index="02" label="Approach" />
              <Approach steps={project.approach} />
            </section>

            <section id="results" aria-labelledby="results-heading" className="mt-16">
              <SectionHead id="results" index="03" label="Results" />
              <dl className="grid gap-4 sm:grid-cols-2">
                {project.results.map((m) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: EASE_IN }}
                    className="flex flex-col-reverse rounded-3xl border-2 border-ink bg-paper p-6 hard"
                  >
                    <dt className="mt-2 text-sm leading-snug">{m.label}</dt>
                    <dd className="num text-4xl font-extrabold tabular-nums text-sunny sm:text-5xl">
                      <CountUp value={m.value} prefix={m.prefix ?? ""} suffix={m.suffix ?? ""} />
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </section>

            <section id="stack" aria-labelledby="stack-heading" className="mt-16">
              <SectionHead id="stack" index="04" label="Stack" />
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="num rounded-full border-2 border-ink bg-sand px-3 py-1.5 text-[11px] uppercase tracking-[0.08em]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            {project.diagram ? (
              <ArchitectureDiagram src={project.diagram} title={project.title} />
            ) : (
              <ParallaxBand title={project.title} />
            )}
          </div>
        </div>
      </div>

      {prev && <NeighbourBand project={prev} direction="prev" />}
      {next && <NeighbourBand project={next} direction="next" />}
    </main>
  );
}
