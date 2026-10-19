/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain. All rights reserved.
 * https://github.com/jainrakshit24
 */
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { EASE_IN } from "@/lib/toy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills: The Toolkit · Rakshit Jain" },
      {
        name: "description",
        content:
          "Python, SQL, ETL, Power BI, machine learning and QA tooling: what Rakshit Jain reaches for, grouped by what it's for.",
      },
      { property: "og:title", content: "Skills | Rakshit Jain" },
      { property: "og:description", content: "What I reach for, grouped by what it's for." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Skills,
});

const GROUPS: { name: string; skills: string[] }[] = [
  {
    name: "PROGRAMMING",
    skills: ["Python", "SQL (Joins, CTEs, Window Functions)", "JavaScript", "C++"],
  },
  {
    name: "DATABASES",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Query Optimization",
      "Indexing & Partitioning",
      "Data Warehouse Concepts",
    ],
  },
  {
    name: "DATA ENGINEERING",
    skills: [
      "Data Ingestion & Transformation",
      "Data Cleaning & Wrangling",
      "Data Validation",
      "Data Quality",
      "ETL Pipeline Development",
    ],
  },
  {
    name: "DATA ANALYSIS",
    skills: [
      "Pandas",
      "NumPy",
      "Exploratory Data Analysis",
      "Statistical Analysis",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    name: "BI & REPORTING",
    skills: [
      "Power BI",
      "Interactive Dashboards",
      "Data Visualization",
      "KPI Reporting",
      "Advanced Excel (Pivot Tables, Power Query, VLOOKUP)",
      "Streamlit",
      "Data Apps",
    ],
  },
  {
    name: "MACHINE LEARNING",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "Feature Engineering",
      "Hyperparameter Tuning (Optuna)",
      "Explainable AI (SHAP, LIME)",
      "Model Deployment (Streamlit)",
    ],
  },
  {
    name: "QA & TOOLING",
    skills: [
      "Test Automation (Playwright, PyTest)",
      "REST API Testing (Postman)",
      "Root Cause Analysis",
      "Git",
      "GitHub",
      "CI/CD (Jenkins, GitHub Actions)",
      "JIRA",
      "Agile/Scrum",
      "End-to-End Testing (Playwright + real Chrome)",
      "Docker",
      "Nginx / Caddy",
    ],
  },
  {
    name: "AI & LLM TOOLING",
    skills: ["Google Gemini API", "NL→SQL", "Prompt Design", "AI-Assisted Development"],
  },
];

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const on = () => setFine(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

function Skills() {
  const fine = useFinePointer();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <PageShell
      index="03"
      label="Skills"
      title="THE TOOLKIT."
      tone="mint"
      intro="What I reach for, grouped by what it's for."
    >
      <div className="rounded-3xl border-2 border-ink bg-paper hard">
        {GROUPS.map((group, gi) => (
          <section
            key={group.name}
            aria-labelledby={`grp-${gi}`}
            className={cn(
              "grid gap-5 p-6 sm:p-8 lg:grid-cols-[240px_1fr] lg:gap-10",
              gi > 0 && "border-t border-ink/20",
            )}
          >
            <h2
              id={`grp-${gi}`}
              className="font-display text-xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-2xl lg:sticky lg:top-32 lg:self-start"
            >
              {group.name}
            </h2>

            <motion.ul
              className="flex flex-wrap gap-2.5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
            >
              {group.skills.map((skill) => {
                const key = `${group.name}/${skill}`;
                const dimmed = fine && hovered !== null && hovered !== key;
                return (
                  <motion.li
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 14, scale: 0.94 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={{ duration: 0.35, ease: EASE_IN }}
                  >
                    <span
                      onPointerEnter={() => fine && setHovered(key)}
                      onPointerLeave={() => fine && setHovered(null)}
                      className={cn(
                        "num inline-block cursor-default rounded-full border-2 border-ink bg-sand px-3.5 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-all duration-200 hover:-translate-y-0.5 hover:border-mint hover:bg-paper",
                        dimmed ? "opacity-30" : "opacity-100",
                      )}
                    >
                      {skill}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
