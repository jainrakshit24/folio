/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { EASE_IN } from "@/lib/toy";
import { SectionLabel, WordReveal } from "@/components/site/PageShell";
import { ToyButton } from "@/components/site/ToyButton";
import { Arrow, Squiggle, Star } from "@/components/site/Doodles";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Rakshit Jain, Data Engineer, Delhi NCR" },
      {
        name: "description",
        content:
          "Rakshit Jain builds the plumbing behind the dashboard: ETL at HCLTech, reporting automation at ONGC Videsh, QA engineering at Careers360, and explainable ML with OPTI-Recourse.",
      },
      { property: "og:title", content: "About | Rakshit Jain" },
      {
        property: "og:description",
        content:
          "Data engineer from Delhi NCR: data systems, validation, and models that explain themselves.",
      },
    ],
  }),
  component: About,
});

const rise = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const PARAGRAPHS = [
  "I'm a Computer Science engineer specialising in Data Science, and most of my work lives in the unglamorous layer that everything else depends on: the pipeline, the validation, the query that has to come back in under a second.",
  "I started in data engineering internships building ETL pipelines at HCLTech, moved through automating manual reporting workflows at ONGC Videsh, and today I'm a QA Engineer at Careers360, where I reconcile source-to-target ETL flows in SQL and wire data-integrity checks straight into CI/CD.",
  "Outside of that I build models and make them explain themselves. My credit-risk platform OPTI-Recourse pairs XGBoost with SHAP and LIME so a rejection comes with an actual reason and a route back. The methodology is peer-reviewed and published in IJSREM.",
  "The thing I'm most proud of is Data Desk, a database investigation platform I built because I was tired of writing the same SQL every day. It's open source now, with proper tests, docs and an auth system, and it's the clearest thing I can point at when someone asks what I can actually do.",
];

const PRINCIPLES = [
  "VALIDATE BEFORE YOU VISUALISE.",
  "IF IT RUNS TWICE, AUTOMATE IT.",
  "A MODEL THAT CAN'T EXPLAIN ITSELF ISN'T FINISHED.",
];

const FACTS: [string, string][] = [
  ["BASED IN", "Delhi NCR, India"],
  ["CURRENTLY", "QA Engineer, Careers360"],
  ["FOCUS", "Data Engineering, Analytics, Data Quality"],
  ["EDUCATION", "B.Tech CSE (Data Science), 2023–2026"],
  ["PUBLISHED", "IJSREM, credit-risk explainability"],
  ["OPEN TO", "Data Engineer / Analyst roles"],
  ["RANDOM FACT", "🛠️ Wrote 384 tests for a tool only I was using. Worth it."],
];

function Portrait() {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_IN }}
    >
      <motion.div
        initial={{ filter: "grayscale(1)" }}
        whileInView={{ filter: "grayscale(0)" }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 1, ease: EASE_IN }}
        className="toy-card relative aspect-[4/5] overflow-hidden"
        role="img"
        aria-label="Portrait placeholder for Rakshit Jain"
      >
        {/* placeholder portrait: replace with a real photo later */}
        <div className="absolute inset-0 bg-sand" />
        <svg
          viewBox="0 0 200 250"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <circle cx="100" cy="86" r="40" fill="#FFC531" stroke="#171512" strokeWidth="4" />
          <path
            d="M62 84c0-24 76-24 76 0 0 6-6 6-8-2-4-14-56-14-60 0-2 8-8 8-8 2Z"
            fill="#171512"
          />
          <circle cx="86" cy="90" r="4" fill="#171512" />
          <circle cx="114" cy="90" r="4" fill="#171512" />
          <path d="M88 108c8 6 16 6 24 0" stroke="#171512" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path
            d="M40 250c0-44 28-70 60-70s60 26 60 70"
            fill="#FF5A36"
            stroke="#171512"
            strokeWidth="4"
          />
        </svg>
        <Star aria-hidden="true" className="doodle absolute right-4 top-4 h-7 w-7 text-coral" />
        <span className="label-pill absolute bottom-4 left-4 bg-paper">PHOTO SOON ✱</span>
      </motion.div>
      <figcaption className="num mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        RAKSHIT JAIN · DELHI NCR, IN
      </figcaption>
    </motion.figure>
  );
}

function About() {
  return (
    <main id="main" className="relative min-h-screen px-5 pb-24 pt-32 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* ---------- HEADER ---------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.div variants={rise} transition={{ duration: 0.6, ease: EASE_IN }}>
            <SectionLabel index="01">About</SectionLabel>
          </motion.div>
          <h1 className="display-xl mt-6 max-w-[52rem]">
            <WordReveal text="I BUILD THE PLUMBING BEHIND THE" />{" "}
            <span className="highlight-sunny">
              <WordReveal text="DASHBOARD." />
            </span>
          </h1>
          <Squiggle aria-hidden="true" className="mt-4 h-3 w-44 text-coral" />
        </motion.div>

        {/* ---------- INTRO (sticky portrait + scrolling copy) ---------- */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Portrait />
          </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-8"
          >
            {PARAGRAPHS.map((p) => (
              <motion.p
                key={p.slice(0, 24)}
                variants={rise}
                transition={{ duration: 0.6, ease: EASE_IN }}
                className="prose-measure rounded-3xl border-2 border-ink bg-paper/90 p-6 text-lg hard"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* ---------- PRINCIPLES ---------- */}
        <section aria-label="Principles" className="mt-24">
          <SectionLabel index="02">Principles</SectionLabel>
          <ul className="mt-8 border-t-2 border-ink">
            {PRINCIPLES.map((text, i) => (
              <motion.li
                key={text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE_IN, delay: i * 0.05 }}
                className="flex flex-col gap-2 border-b-2 border-ink py-8 sm:flex-row sm:items-baseline sm:gap-10"
              >
                <span className="num w-16 shrink-0 text-sm text-coral">0{i + 1}</span>
                <span className="font-display text-2xl font-extrabold uppercase leading-tight sm:text-4xl">
                  {text}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* ---------- QUICK FACTS ---------- */}
        <section aria-label="Quick facts" className="mt-24">
          <SectionLabel index="03">Quick facts</SectionLabel>
          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-8 grid gap-x-12 gap-y-5 sm:grid-cols-2"
          >
            {FACTS.map(([term, value]) => (
              <motion.div
                key={term}
                variants={rise}
                transition={{ duration: 0.6, ease: EASE_IN }}
                className="flex items-baseline justify-between gap-6 border-b-2 border-dashed border-ink/40 pb-3"
              >
                <dt className="num shrink-0 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {term}
                </dt>
                <dd className="text-right font-medium">{value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </section>

        {/* ---------- CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_IN }}
          className="mt-24 flex flex-wrap items-center justify-center gap-4"
        >
          <ToyButton to="/work" tone="coral" cursorLabel="PEEK →">
            See the work <Arrow aria-hidden="true" className="h-4 w-6" />
          </ToyButton>
          <ToyButton to="/contact" tone="paper" cursorLabel="SAY HI">
            Get in touch
          </ToyButton>
          <Link
            to="/work/$slug"
            params={{ slug: "opti-recourse" }}
            className="num story-link text-[11px] uppercase tracking-[0.2em]"
          >
            or read the OPTI-Recourse story →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
