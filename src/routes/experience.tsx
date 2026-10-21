/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageShell } from "@/components/site/PageShell";
import { ToyButton } from "@/components/site/ToyButton";
import { EASE_IN } from "@/lib/toy";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/experience")({
  head: () =>
    seo({
      path: "/experience",
      title: "Experience | Data Engineer at Careers360 | Rakshit Jain",
      description:
        "QA Engineer at Careers360, Engineering Intern at ONGC Videsh, Data Engineering Intern at HCLTech. What I owned in each role and what shipped.",
      ogTitle: "Experience | Rakshit Jain",
      ogDescription: "Careers360, ONGC Videsh, HCLTech: what I owned and what moved.",
    }),
  component: Experience,
});

type Role = {
  n: string;
  dates: string;
  title: string;
  company: string;
  badge?: string;
  badge2?: string;
  bullets: string[];
};

const ROLES: Role[] = [
  {
    n: "01",
    dates: "FEB 2026 → PRESENT",
    title: "QA Engineer: Test Automation & Data Validation",
    company: "Careers360",
    badge: "PROMOTED IN 4 MONTHS",
    badge2: "BUILT A TOOL",
    bullets: [
      "Author SQL (joins, CTEs, window functions) to reconcile source-to-target ETL flows, validating row counts, referential integrity and transformation logic before every release.",
      "Automate data-integrity and regression checks in CI/CD pipelines (GitHub Actions, Jenkins) with Allure reporting on every commit, collapsing regression cycles from hours to minutes.",
      "Build and maintain Playwright UI automation across key regression flows, using AI-assisted script generation to extend coverage each sprint.",
      "Lead root cause analysis with engineering and product teams in JIRA, tracing surface failures to backend and database-level data inconsistencies; verify fixes on 90%+ of high-priority defects within SLA.",
      "Built Data Desk, an internal database-investigation tool that replaced day-to-day exploratory SQL, then made it schema-agnostic and open-sourced it (Python, Streamlit, MySQL, 384 tests).",
      "Promoted from QA Intern to QA Engineer within 4 months for consistent automation delivery and release-quality gains.",
    ],
  },
  {
    n: "02",
    dates: "AUG 2025 → OCT 2025",
    title: "Engineering Intern",
    company: "ONGC Videsh",
    bullets: [
      "Automated recurring data workflows with Python (Pandas, openpyxl) and Advanced Excel (Power Query, VLOOKUP, Pivot Tables), eliminating 10+ hours of manual data handling per week and removing hand-entry errors downstream.",
      "Enhanced an intranet portal serving 500+ users, streamlining internal communication and document access.",
    ],
  },
  {
    n: "03",
    dates: "OCT 2024 → MAR 2025",
    title: "Data Engineering Intern",
    company: "HCLTech",
    bullets: [
      "Built scalable ETL pipelines in Python and SQL to ingest, transform and load multi-million-row datasets, delivering analysis-ready data to analytics and BI teams and feeding automated Power BI dashboards.",
      "Optimized data-warehouse query performance through improved indexing and partitioning, bringing report generation on large relational datasets down to single-digit seconds.",
    ],
  },
];

function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <PageShell
      index="04"
      label="Experience"
      title="WHERE I'VE WORKED."
      tone="sand"
      intro="Three teams, one throughline: data that can be trusted by the time anyone looks at it."
    >
      <div ref={trackRef} className="relative pl-10 sm:pl-16">
        {/* base rail */}
        <div aria-hidden="true" className="absolute left-3 top-2 bottom-2 w-px bg-ink/25 sm:left-6" />
        {/* drawn rail */}
        <motion.div
          aria-hidden="true"
          className="absolute left-3 top-2 bottom-2 w-[3px] origin-top bg-sunny sm:left-[22px]"
          style={{ scaleY: lineScale }}
        />

        <ol className="space-y-14">
          {ROLES.map((role, i) => (
            <motion.li
              key={role.n}
              className="relative"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: EASE_IN, delay: i * 0.06 }}
            >
              {/* node */}
              <motion.span
                aria-hidden="true"
                className="absolute -left-10 top-3 h-5 w-5 rounded-full border-2 border-ink bg-paper sm:-left-[52px]"
                initial={{ backgroundColor: "var(--paper)", scale: 0.9 }}
                whileInView={{ backgroundColor: "var(--sunny)", scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.35, ease: EASE_IN }}
              />

              <div className="grid gap-5 lg:grid-cols-[190px_1fr] lg:gap-8">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <p className="num text-[11px] uppercase tracking-[0.18em] text-ink/60">( {role.n} )</p>
                  <p className="num mt-2 text-[12px] font-bold uppercase tracking-[0.12em]">{role.dates}</p>
                  {role.badge && (
                    <span className="num mt-3 inline-block rounded-full border-2 border-ink bg-coral px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-cream hard">
                      {role.badge}
                    </span>
                  )}
                  {role.badge2 && (
                    <span className="num mt-3 ml-2 inline-block rounded-full border-2 border-ink bg-mint px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ink hard lg:ml-0">
                      {role.badge2}
                    </span>
                  )}
                </div>

                <div className="toy-card p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-3xl">
                    {role.title}
                  </h2>
                  <p className="font-display mt-2 text-lg font-bold uppercase tracking-wide text-mint">
                    {role.company}
                  </p>

                  <ul className="mt-5 space-y-3.5">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-[3px] border-2 border-ink bg-sunny"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
        <ul className="mt-10 rounded-2xl border-2 border-dashed border-ink/40 p-5 text-[14px]">
          <li className="flex gap-3">
            <span aria-hidden="true" className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-[3px] border-2 border-ink bg-mint" />
            <span><strong className="font-display">Side note:</strong> I also handle social media management for a few brands: content calendars, creatives and reporting.</span>
          </li>
        </ul>
      </div>

      <div className="mt-20 rounded-3xl border-2 border-ink bg-sunny p-8 text-center hard sm:p-12">
        <h2 className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">
          Want the full version?
        </h2>
        <div className="mt-6 flex justify-center">
          <ToyButton
            href="/downloads/rakshit-jain-cv.pdf"
            download="Rakshit-Jain-CV.pdf"
            tone="coral"
            cursorLabel="GRAB IT"
          >
            Download CV ↓
          </ToyButton>
        </div>
      </div>
    </PageShell>
  );
}
