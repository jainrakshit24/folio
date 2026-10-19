/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { ToyButton } from "@/components/site/ToyButton";
import { Sparkle } from "@/components/site/Doodles";
import { EASE_IN } from "@/lib/toy";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education: The Foundation · Rakshit Jain" },
      {
        name: "description",
        content:
          "B.Tech in Computer Science & Engineering (Data Science) and a Computer Science diploma, plus a peer-reviewed publication in IJSREM.",
      },
      { property: "og:title", content: "Education | Rakshit Jain" },
      { property: "og:description", content: "Degrees, specialisations and the published paper." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Education,
});

const DEGREES = [
  {
    years: "2023 to 2026",
    degree: "B.TECH, COMPUTER SCIENCE & ENGINEERING",
    specialisation: "DATA SCIENCE SPECIALIZATION",
    institution: "KCC Institute of Technology and Management, Greater Noida",
    line: "Core focus on data structures, databases, statistics, machine learning and large-scale data processing.",
  },
  {
    years: "2020 to 2023",
    degree: "DIPLOMA, COMPUTER SCIENCE",
    specialisation: null,
    institution: "Government Polytechnic Rajpur",
    line: null,
  },
];

function EduCard({
  years,
  degree,
  specialisation,
  institution,
  line,
  delay,
}: {
  years: string;
  degree: string;
  specialisation?: string | null;
  institution: string;
  line?: string | null;
  delay: number;
}) {
  return (
    <motion.div
      className="rounded-3xl border-2 border-ink/60 bg-paper/95 p-7 hard sm:p-10"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_IN, delay }}
      whileHover={{ y: -4, borderColor: "var(--sunny)" }}
      style={{ transition: "border-color 0.2s ease" }}
    >
      <p className="num text-sm font-bold uppercase tracking-[0.2em] text-ink/60">{years}</p>
      <h2 className="font-display mt-3 text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">
        {degree}
      </h2>
      {specialisation && (
        <p className="font-display mt-2 text-lg font-bold uppercase tracking-wide text-mint">
          {specialisation}
        </p>
      )}
      <p className="num mt-5 text-[12px] uppercase tracking-[0.14em] text-ink/70">{institution}</p>
      {line && <p className="prose-measure mt-4 text-[15px] leading-relaxed">{line}</p>}
    </motion.div>
  );
}

function Education() {
  return (
    <PageShell
      index="05"
      label="Education"
      title="THE FOUNDATION."
      tone="cream"
      intro="Two programs, one thread: computer science, pulled tighter and tighter toward data."
    >
      <div className="space-y-8">
        {DEGREES.map((d, i) => (
          <EduCard
            key={d.years}
            years={d.years}
            degree={d.degree}
            specialisation={d.specialisation}
            institution={d.institution}
            line={d.line}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* PUBLICATION */}
      <motion.div
        className="relative mt-16 overflow-hidden rounded-3xl border-2 border-ink p-7 hard-lg sm:p-12"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE_IN }}
      >
        {/* signature gradient wash at 10% */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            opacity: 0.1,
            background:
              "linear-gradient(115deg, var(--coral) 0%, var(--sunny) 38%, var(--mint) 70%, var(--sky) 100%)",
          }}
        />
        <span className="label-pill bg-paper">
          <Sparkle className="h-3.5 w-3.5 text-coral" />
          Peer-reviewed publication
        </span>

        <h2 className="font-display mt-6 text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">
          OPTI-RECOURSE · CREDIT RISK PREDICTION &amp; EXPLAINABILITY
        </h2>
        <p className="font-display mt-3 text-base font-bold uppercase tracking-wide text-mint sm:text-lg">
          International Journal of Scientific Research in Engineering and Management (IJSREM)
        </p>
        <p className="prose-measure mt-4 text-[15px] leading-relaxed">
          Methodology for pairing gradient-boosted credit-risk models with SHAP and LIME to
          generate actionable recourse for rejected applicants.
        </p>

        <div className="mt-7">
          <ToyButton to="/work/opti-recourse" tone="coral" cursorLabel="READ →">
            Read the paper →
          </ToyButton>
        </div>
      </motion.div>
    </PageShell>
  );
}
