/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/site/CountUp";
import { ArchitectureDiagram } from "@/components/work/ArchitectureDiagram";
import { Squiggle } from "@/components/site/Doodles";
import { WordReveal } from "@/components/site/PageShell";
import { TiltCard } from "@/components/site/TiltCard";
import { QA_REPO, type Project } from "@/lib/projects";
import { EASE_IN, pop } from "@/lib/toy";
import { cn } from "@/lib/utils";

const SECTIONS = [
  ["problem", "THE PROBLEM"],
  ["built", "WHAT I BUILT"],
  ["proudest", "PROUDEST PART"],
  ["product", "LIKE A PRODUCT"],
  ["decisions", "DECISIONS"],
  ["result", "THE RESULT"],
] as const;

const FEATURES: [string, string, string, string][] = [
  [
    "🔍",
    "NO-SQL TABLE FINDER",
    "Type a table name, a topic or a column and it finds the right table through aliases and schema search. The feature that started the whole thing.",
    "bg-sunny",
  ],
  [
    "🧭",
    "START AN INVESTIGATION",
    "Paste any identifier and it searches the whole database for it, then drafts an investigation plan.",
    "bg-sky",
  ],
  [
    "🕸️",
    "RECORD EXPLORER",
    "Linked tables, a relationship graph and a timeline for a single record, built by following the foreign keys.",
    "bg-mint",
  ],
  [
    "✅",
    "API vs DATABASE VALIDATION",
    "Compare an API response against the database and against expected values, with response rules. This is the part no SQL client does.",
    "bg-coral",
  ],
  [
    "📋",
    "BUG EVIDENCE GENERATOR",
    "Turns a finished investigation into a masked Jira or Markdown bug report from a template, with SQL, API and expected-vs-actual included.",
    "bg-grape",
  ],
  [
    "🧪",
    "CHECK LIBRARY + QA DASHBOARD",
    "Reusable data-quality checks with severity, tags and owners; runs recorded over time with change detection, trends and TXT/CSV/XLSX exports.",
    "bg-sunny",
  ],
  [
    "⚡",
    "SQL WORKBENCH",
    "Named parameters, query library and history, an EXPLAIN analyzer and plain-English 'in short' summaries of what a query does.",
    "bg-sky",
  ],
  [
    "🤖",
    "AI ASSIST (GEMINI)",
    "Table suggestions, natural-language-to-SQL, explain and fix. Only table and column NAMES are ever sent to the model, never a single row of data.",
    "bg-mint",
  ],
];

const PRODUCT: [string, string][] = [
  [
    "🔐",
    "Accounts with admin approval, a one-time setup code for the first admin, role-based masking of emails and phones, secret columns hidden by name, and login lockout after 5 failed attempts.",
  ],
  [
    "🧵",
    "384 passing tests plus real-Chrome Playwright end-to-end suites: 20/20, 15/15 and 32/32 green.",
  ],
  [
    "🛡️",
    "Hardened for the open web: privacy policy and terms, cookie notice, XSRF on, CORS off, and Caddy/Nginx configs with HTTPS redirect, HSTS and security headers.",
  ],
  [
    "📚",
    "A real docs folder (user guide, configuration reference, architecture, security, scheduler and development notes) so someone else can actually run it.",
  ],
];

const DECISIONS: [string, string][] = [
  [
    "GENERIC BY DESIGN",
    "The core knows nothing about my employer's schema. Every company-specific check, chart and note lives in a git-ignored local/ folder, which is why it could be published at all.",
  ],
  [
    "CONNECTION POOLING",
    "The same query went from 0.87s to 0.08s. Charts and heavy panels build only when you ask for them, because in Streamlit a collapsed panel still runs its code on every rerun.",
  ],
  [
    "SCHEDULED CHECKS WITHOUT A SERVER",
    "A headless runner you point cron at, so data-quality checks keep running whether anyone has the app open or not.",
  ],
];

const RESULTS: [number, string, string][] = [
  [384, "", "automated tests"],
  [8, "", "tools in one app"],
  [0, "", "writes to your database"],
  [10, "x", "faster queries after pooling"],
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: EASE_IN },
};

function Toc() {
  const [active, setActive] = useState<string>("problem");
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(
      (e): e is HTMLElement => !!e,
    );
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (v?.target.id) setActive(v.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <nav aria-label="Sections" className="hidden lg:block">
      <ul className="sticky top-32 space-y-4">
        {SECTIONS.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() => pop()}
              className="flex items-center gap-3 num text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              <span
                className={cn(
                  "h-3 w-3 rounded-full border-2 border-ink",
                  active === id ? "bg-mint" : "bg-paper",
                )}
              />
              <span className={active === id ? "opacity-100" : "opacity-45"}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Head({ id, i, label }: { id: string; i: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="num text-xs font-bold text-coral">{i}</span>
      <h2 id={`${id}-h`} className="font-display text-2xl font-extrabold uppercase tracking-tight">
        {label}
      </h2>
      <span className="h-[2px] flex-1 bg-ink/15" />
    </div>
  );
}

function AppMock() {
  return (
    <div
      className="overflow-hidden rounded-3xl border-2 border-ink bg-paper hard-lg"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-coral ring-1 ring-ink" />
        <span className="h-2.5 w-2.5 rounded-full bg-sunny ring-1 ring-ink" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint ring-1 ring-ink" />
        <span className="num ml-3 truncate rounded-full border border-ink/30 bg-paper px-3 py-0.5 text-[10px]">
          localhost:8501 · qa data desk
        </span>
      </div>
      <div className="grid h-64 grid-cols-[3rem_1fr] grid-rows-[2rem_1fr] gap-2 bg-cream p-3 sm:h-80">
        <div className="col-span-2 rounded-md border-2 border-ink bg-ink" />
        <div className="flex flex-col gap-2 rounded-md border-2 border-ink bg-sand p-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn("h-4 rounded-sm border border-ink", i === 1 ? "bg-mint" : "bg-paper")}
            />
          ))}
        </div>
        <div className="grid grid-cols-3 grid-rows-[1fr_auto] gap-2">
          <div className="col-span-2 flex flex-col gap-1 rounded-md border-2 border-ink bg-paper p-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-3 rounded-sm",
                  i === 0 ? "bg-sky" : i === 3 ? "bg-sunny" : "bg-sand",
                )}
              />
            ))}
          </div>
          <div className="flex items-end gap-1 rounded-md border-2 border-ink bg-paper p-2">
            {[40, 70, 55, 90, 65].map((h, i) => (
              <span key={i} className="flex-1 rounded-t-sm bg-mint" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="col-span-3 h-8 rounded-md border-2 border-ink bg-coral" />
        </div>
      </div>
    </div>
  );
}

export function QaCaseStudy({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project | undefined;
  next?: Project | undefined;
}) {
  return (
    <main id="main" className="relative min-h-screen pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Data Desk",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Self-hosted (Docker)",
            description: project.outcome,
            codeRepository: QA_REPO,
            license: "https://opensource.org/licenses/MIT",
            author: { "@type": "Person", name: "Rakshit Jain" },
          }),
        }}
      />
      <div className="px-5 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <Link
            to="/work"
            onClick={() => pop()}
            className="label-pill bg-paper inline-flex items-center gap-2"
          >
            <ArrowLeft aria-hidden="true" size={12} /> All work
          </Link>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="label-pill bg-mint">OPEN SOURCE · MIT</span>
                <span className="label-pill bg-paper">SOLO BUILD</span>
              </div>
              <h1 className="display-xl mt-4">
                <WordReveal text="DATA DESK" />
              </h1>
              <Squiggle aria-hidden="true" className="mt-3 h-3 w-40 text-mint" />
              <p className="prose-measure mt-6 text-lg">
                A database investigation platform for QA engineers. Stop writing the same SQL every
                day. Search an ID, follow the data, prove the bug.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {[
                  "Python",
                  "Streamlit",
                  "MySQL",
                  "Gemini API",
                  "Playwright",
                  "PyTest",
                  "Docker",
                  "Caddy / Nginx",
                ].map((t) => (
                  <li
                    key={t}
                    className="num rounded-full border-2 border-ink bg-paper px-3 py-1 text-[11px] uppercase tracking-[0.08em]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE_IN }}
            >
              <AppMock />
            </motion.div>
          </div>

          <dl className="mt-12 grid gap-4 rounded-3xl border-2 border-ink bg-paper p-6 hard sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["ROLE", "Solo: product, build, tests, docs, deploy"],
              ["TIMELINE", "Sep 2026 → ongoing"],
              ["STATUS", "Open source, self-hosted"],
              ["CODE", "github.com/jainrakshit24/QA-Data-Desk"],
            ].map(([k, v]) => (
              <div key={k} className="min-w-0">
                <dt className="num text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">
                  {k}
                </dt>
                <dd className="mt-1 break-words text-sm font-semibold leading-snug">
                  {k === "CODE" ? (
                    <a
                      href={QA_REPO}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        className="mt-20 px-5 pb-24 sm:px-8"
        style={{ background: "color-mix(in oklab, var(--cream) 85%, transparent)" }}
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 pt-16 lg:grid-cols-[170px_minmax(0,1fr)]">
          <Toc />
          <div className="min-w-0">
            <section id="problem" aria-labelledby="problem-h">
              <Head id="problem" i="01" label="The problem" />
              <motion.p
                {...fade}
                className="rounded-3xl border-2 border-ink bg-paper p-6 text-lg leading-relaxed hard-sm"
              >
                QA work means proving things about data, and proving things about data meant writing
                the same exploratory SQL over and over: finding which table holds a record, chasing
                foreign keys by hand, screenshotting results into Jira. Every investigation started
                from zero.
              </motion.p>
            </section>

            <section id="built" aria-labelledby="built-h" className="mt-20">
              <Head id="built" i="02" label="What I built" />
              <div className="grid gap-6 sm:grid-cols-2">
                {FEATURES.map(([icon, t, d, bg], i) => (
                  <motion.div
                    key={t}
                    {...fade}
                    transition={{ ...fade.transition, delay: (i % 2) * 0.06 }}
                  >
                    <TiltCard rest={i % 2 ? 1.5 : -1.5} className="h-full overflow-hidden bg-paper">
                      <div
                        className={cn(
                          "flex items-center justify-between gap-3 border-b-2 border-ink px-5 py-3",
                          bg,
                        )}
                      >
                        <h3 className="font-display text-base font-extrabold leading-tight">{t}</h3>
                        <span
                          className="text-2xl [animation:wiggle_2.4s_ease-in-out_infinite]"
                          aria-hidden="true"
                        >
                          {icon}
                        </span>
                      </div>
                      <p className="p-5 text-[15px] leading-relaxed">{d}</p>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="proudest" aria-labelledby="proudest-h" className="mt-20">
              <Head id="proudest" i="03" label="The part I'm proudest of" />
              <motion.div
                {...fade}
                className="rounded-3xl border-2 border-ink bg-mint p-7 text-ink hard-lg sm:p-10"
              >
                <p className="font-display text-3xl font-extrabold uppercase leading-[0.95] sm:text-5xl">
                  It physically cannot write to your database.
                </p>
                <p className="prose-measure mt-6 text-base leading-relaxed sm:text-lg">
                  Read-only isn't a policy here, it's two independent layers: a statement guard that
                  rejects anything that isn't a read, including comment-smuggled SQL, LOAD_FILE and
                  locking reads, and a MySQL{" "}
                  <code className="num rounded bg-paper px-1.5 py-0.5 text-[0.85em]">
                    SET SESSION TRANSACTION READ ONLY
                  </code>{" "}
                  backstop underneath it. If the guard were ever bypassed, the database itself
                  refuses the write. I verified it at the engine level: error 1792.
                </p>
              </motion.div>
            </section>

            <section id="product" aria-labelledby="product-h" className="mt-20">
              <Head id="product" i="04" label="Built like a product, not a script" />
              <div className="grid gap-4 sm:grid-cols-2">
                {PRODUCT.map(([icon, d], i) => (
                  <motion.div
                    key={icon}
                    {...fade}
                    transition={{ ...fade.transition, delay: (i % 2) * 0.06 }}
                    className="rounded-3xl border-2 border-ink bg-paper p-6 hard-sm"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {icon}
                    </span>
                    <p className="mt-3 text-[15px] leading-relaxed">{d}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="decisions" aria-labelledby="decisions-h" className="mt-20">
              <Head id="decisions" i="05" label="Engineering decisions" />
              <ul className="border-t-2 border-ink">
                {DECISIONS.map(([t, d]) => (
                  <motion.li
                    key={t}
                    {...fade}
                    className="grid gap-2 border-b-2 border-ink py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-8"
                  >
                    <h3 className="num text-sm font-bold tracking-[0.12em] text-coral">{t}</h3>
                    <p className="text-[15px] leading-relaxed">{d}</p>
                  </motion.li>
                ))}
              </ul>
            </section>

            <section id="result" aria-labelledby="result-h" className="mt-20">
              <Head id="result" i="06" label="The result" />
              <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {RESULTS.map(([v, s, l]) => (
                  <motion.div
                    key={l}
                    {...fade}
                    className="flex flex-col-reverse rounded-3xl border-2 border-ink bg-paper p-5 hard"
                  >
                    <dt className="mt-2 text-sm leading-snug">{l}</dt>
                    <dd
                      className="num text-4xl font-extrabold tabular-nums text-mint sm:text-5xl"
                      style={{ WebkitTextStroke: "1px var(--ink)" }}
                    >
                      <CountUp value={v} suffix={s} />
                    </dd>
                  </motion.div>
                ))}
              </dl>
              <p className="num mt-6 text-[13px] leading-relaxed opacity-80">
                Built for my own QA work, then made generic enough that anyone with a MySQL database
                can point it at theirs.
              </p>

              {project.diagram ? (
                <ArchitectureDiagram src={project.diagram} title={project.title} />
              ) : null}

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={QA_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN ↗"
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-coral px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-cream hard transition-transform hover:-translate-y-0.5"
                >
                  View on GitHub ↗
                </a>
                <a
                  href={`${QA_REPO}/tree/main/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN ↗"
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-paper px-6 py-3 font-display text-sm font-bold uppercase tracking-wide hard transition-transform hover:-translate-y-0.5"
                >
                  Read the docs ↗
                </a>
              </div>
              <p className="num mt-4 text-[12px] opacity-70">
                No public demo, because it connects to a database, so you self-host it. Setup is two
                commands, in SETUP.md.
              </p>
            </section>
          </div>
        </div>
      </div>

      {[prev && (["prev", prev] as const), next && (["next", next] as const)]
        .filter(Boolean)
        .map((x) => {
          const [dir, p] = x as readonly ["prev" | "next", Project];
          const isNext = dir === "next";
          return (
            <Link
              key={dir}
              to="/work/$slug"
              params={{ slug: p.slug }}
              onClick={() => pop()}
              data-cursor="VIEW CASE"
              className={cn(
                "group block border-t-2 border-ink px-5 py-10 sm:px-8",
                isNext ? "bg-cream" : "bg-sand",
              )}
            >
              <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
                {!isNext && <ArrowLeft aria-hidden="true" size={20} />}
                <div className={cn("flex-1", isNext && "text-right")}>
                  <span className="num text-[11px] font-bold uppercase tracking-[0.2em] text-coral">
                    {isNext ? "Next project" : "Previous project"}
                  </span>
                  <p className="font-display text-2xl font-extrabold uppercase sm:text-4xl">
                    {p.title}
                  </p>
                </div>
                {isNext && <ArrowRight aria-hidden="true" size={20} />}
              </div>
            </Link>
          );
        })}

      <Link
        to="/services"
        className="block border-t-2 border-ink bg-sky px-5 py-14 text-center text-cream sm:px-8"
      >
        <span className="font-display text-3xl font-extrabold uppercase sm:text-5xl">
          Need something like this? →
        </span>
      </Link>
    </main>
  );
}
