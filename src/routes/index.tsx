/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";
import { EASE_IN } from "@/lib/toy";
import { FREELANCE, QA_REPO } from "@/lib/projects";
import { SchemaGraph } from "@/components/work/SchemaGraph";
import { ToyButton } from "@/components/site/ToyButton";
import { WordReveal } from "@/components/site/PageShell";
import { Marquee } from "@/components/site/Marquee";
import { CountUp } from "@/components/site/CountUp";
import { TiltCard } from "@/components/site/TiltCard";
import { ISTClock } from "@/components/site/ISTClock";
import {
  Arrow,
  DoodleArrow,
  DrawnUnderline,
  IconChart,
  IconPipes,
  IconShield,
  Sparkle,
  Star,
} from "@/components/site/Doodles";
import { seo } from "@/lib/seo";
import { personSchema, websiteSchema } from "@/lib/schema";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({
      path: "/",
      title: "Rakshit Jain | Data Engineer & Freelance Web Developer, Delhi NCR",
      description:
        "Rakshit Jain is a Data Engineer and freelance web developer in Delhi NCR. ETL work, dashboards, and fast animated websites for businesses and creators.",
      ogTitle: "Rakshit Jain | Data Engineer & Freelance Web Developer",
    }),
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personSchema()) },
      { type: "application/ld+json", children: JSON.stringify(websiteSchema()) },
    ],
  }),
  component: Home,
});

const MARQUEE = [
  "Python",
  "SQL",
  "ETL Pipelines",
  "Power BI",
  "Pandas",
  "PostgreSQL",
  "XGBoost",
  "Playwright",
  "Data Quality",
  "SHAP",
  "Streamlit",
  "CI/CD",
  "React",
  "TypeScript",
  "Tailwind",
  "Landing Pages",
  "Websites",
  "Framer Motion",
];

const STATS = [
  {
    value: 12,
    suffix: "%",
    tone: "bg-coral text-cream",
    rest: -2,
    note: "more risky borrowers my credit-risk model catches",
  },
  {
    value: 10,
    suffix: "+",
    tone: "bg-sunny text-ink",
    rest: 1.5,
    note: "hours of manual work deleted, every single week",
  },
  {
    value: 500,
    suffix: "+",
    tone: "bg-mint text-ink",
    rest: -1,
    note: "people using the intranet portal I rebuilt",
  },
  {
    value: 5,
    suffix: "M+",
    tone: "bg-sky text-cream",
    rest: 2.5,
    note: "rows moved per run, without falling over",
  },
  {
    value: 6,
    suffix: "+",
    tone: "bg-grape text-cream",
    rest: -1.5,
    note: "websites shipped for clients",
  },
];

const TWO_THINGS = [
  {
    tone: "bg-mint",
    tag: "By day",
    title: "Data engineering & analytics",
    body: "ETL pipelines, data quality checks and Power BI dashboards for teams that need numbers they can trust.",
    to: "/work" as const,
    cta: "See data work",
  },
  {
    tone: "bg-sky text-cream",
    tag: "For clients",
    title: "Freelance",
    body: "Fast, responsive, animated websites, landing pages and dashboards, from design to deploy.",
    to: "/services" as const,
    cta: "See services",
  },
];

const DOING = [
  {
    Icon: IconPipes,
    tint: "text-sky",
    title: "Data engineering",
    body: "Ingest, transform, load. Python and SQL that move multi-million-row datasets without falling over.",
  },
  {
    Icon: IconChart,
    tint: "text-sunny",
    title: "Analytics & BI",
    body: "EDA, KPI modelling, and Power BI dashboards where the important number is the first thing you see.",
  },
  {
    Icon: IconShield,
    tint: "text-mint",
    title: "Data quality",
    body: "Source-to-target reconciliation and CI/CD-wired checks, so broken data never reaches a release.",
  },
  {
    Icon: Monitor,
    tint: "text-coral",
    title: "Freelance",
    body: "Websites and landing pages built in React: quick to load, great on phones, animated with care.",
  },
];

const rise = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function Band({
  children,
  className,
  full = true,
}: {
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section className={`relative border-t-2 border-ink px-5 py-20 sm:px-8 ${className ?? ""}`}>
      <div className={full ? "mx-auto w-full max-w-6xl" : "mx-auto w-full max-w-4xl"}>
        {children}
      </div>
    </section>
  );
}

function Home() {
  return (
    <main id="main" className="relative">
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-screen flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.p variants={rise} transition={{ duration: 0.6, ease: EASE_IN }}>
              <span className="label-pill bg-paper/90">
                <span className="pulse-dot" aria-hidden="true" />
                Available for work
              </span>
            </motion.p>

            <h1 className="display-xl mt-6">
              <span className="block">
                <WordReveal text="I BUILD" />{" "}
                <span className="highlight-sunny">
                  <WordReveal text="MACHINES" />
                </span>
              </span>
              <span className="block">
                <WordReveal text="THAT TURN DATA" />
              </span>
              <span className="block">
                <WordReveal text="INTO" />{" "}
                <span className="relative inline-block text-coral">
                  <WordReveal text="DECISIONS." />
                  <DrawnUnderline className="absolute -bottom-1 left-0 h-4 w-full text-coral" />
                </span>
                <Star aria-hidden="true" className="doodle ml-3 inline-block h-8 w-8 text-sunny" />
              </span>
            </h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.6, ease: EASE_IN }}
              className="prose-measure mt-8 rounded-3xl border-2 border-ink bg-paper/90 p-5 text-lg hard"
            >
              Curious by nature, driven by technology, and always building something new. I'm
              Rakshit Jain, a Data Engineer and developer who enjoys solving real-world problems,
              exploring ideas, and turning them into simple, useful products.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease: EASE_IN }}
              className="mt-8 flex max-w-[46rem] flex-wrap items-center gap-4"
            >
              <ToyButton to="/work" tone="coral" cursorLabel="PEEK →">
                See my work <Arrow aria-hidden="true" className="h-4 w-6" />
              </ToyButton>
              <ToyButton to="/services" tone="sky" cursorLabel="LET'S BUILD">
                Hire me for a site →
              </ToyButton>
              <ToyButton
                href="/downloads/rakshit-jain-cv.pdf"
                download="Rakshit-Jain-CV.pdf"
                tone="paper"
                cursorLabel="GRAB IT"
              >
                Grab my CV ↓
              </ToyButton>
              <span className="num inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                or just poke the factory →
                <DoodleArrow aria-hidden="true" className="doodle h-8 w-12 text-grape" />
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16 sm:mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE_IN }}
          >
            <ISTClock />
          </motion.div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="relative my-6 py-6">
        <Marquee items={MARQUEE} />
      </div>

      {/* ---------- TWO THINGS I DO ---------- */}
      <Band className="bg-paper/85">
        <span className="label-pill bg-sunny">Two things I do</span>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TWO_THINGS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_IN, delay: i * 0.08 }}
            >
              <TiltCard rest={i ? 1.5 : -1.5} className={`h-full p-7 ${t.tone}`}>
                <span className="label-pill bg-paper text-ink">{t.tag}</span>
                <h2 className="mt-5 font-display text-3xl font-extrabold uppercase sm:text-4xl">
                  {t.title}
                </h2>
                <p className="mt-3 text-base">{t.body}</p>
                <Link
                  to={t.to}
                  className="num mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] underline-offset-4 hover:underline"
                >
                  {t.cta} <Arrow aria-hidden="true" className="h-3 w-6" />
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Band>

      {/* ---------- NUMBERS ---------- */}
      <Band className="bg-cream/85">
        <span className="label-pill bg-paper">( 01 ) Numbers I'm proud of</span>
        <motion.dl
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {STATS.map((s) => (
            <motion.div key={s.note} variants={rise} transition={{ duration: 0.6, ease: EASE_IN }}>
              <TiltCard rest={s.rest} className={`h-full p-6 ${s.tone}`}>
                <div className="flex flex-col-reverse">
                  <dt className="mt-3 text-sm leading-snug">{s.note}</dt>
                  <dd className="num text-5xl font-bold tabular-nums">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.dl>
      </Band>

      {/* ---------- WHAT I ACTUALLY DO ---------- */}
      <Band className="bg-sand/90">
        <span className="label-pill bg-paper">( 02 ) What I actually do</span>
        <motion.ul
          className="mt-10 grid gap-6 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {DOING.map(({ Icon, tint, title, body }) => (
            <motion.li
              key={title}
              variants={rise}
              transition={{ duration: 0.6, ease: EASE_IN }}
              className="group toy-card h-full p-6"
            >
              <Icon
                aria-hidden="true"
                className={`h-12 w-12 ${tint} transition-transform duration-300 group-hover:animate-[wiggle_0.6s_ease-in-out]`}
              />
              <h3 className="mt-5 font-display text-2xl font-extrabold uppercase">{title}</h3>
              <p className="mt-3 text-base">{body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Band>

      {/* ---------- FEATURED PROJECT ---------- */}
      <Band className="bg-sky/90">
        <span className="label-pill bg-paper">( 03 ) Featured work</span>
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE_IN }}
            data-cursor-dark
            className="relative overflow-hidden rounded-3xl border-2 border-ink bg-ink p-7 text-cream hard-lg sm:p-10"
          >
            <SchemaGraph className="pointer-events-none absolute -right-10 top-0 h-full w-[70%] opacity-60" />
            <div className="relative">
              <p className="num text-[11px] font-bold uppercase tracking-[0.2em] text-mint">
                FLAGSHIP · OPEN SOURCE
              </p>
              <h2 className="display-xl mt-3" style={{ fontSize: "clamp(2.8rem,8vw,6.5rem)" }}>
                DATA DESK
              </h2>
              <p className="prose-measure mt-4 text-lg text-cream/90">
                A database investigation platform for QA engineers. Stop writing the same SQL every
                day. Search an ID, follow the data, prove the bug.
              </p>
              <dl className="mt-7 grid grid-cols-3 gap-3">
                {(
                  [
                    [384, "automated tests"],
                    [8, "tools in one app"],
                    [0, "writes to your database"],
                  ] as const
                ).map(([v, l]) => (
                  <div
                    key={l}
                    className="flex flex-col-reverse rounded-2xl border-2 border-cream/40 p-3 sm:p-4"
                  >
                    <dt className="num mt-1 text-[10px] uppercase tracking-[0.14em] text-cream/75 sm:text-[11px]">
                      {l}
                    </dt>
                    <dd className="num text-3xl font-extrabold tabular-nums text-mint sm:text-4xl">
                      <CountUp value={v} />
                    </dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Python", "Streamlit", "MySQL", "Gemini API", "Playwright", "Docker"].map((t) => (
                  <li
                    key={t}
                    className="num rounded-full border-2 border-cream/70 px-3 py-1 text-[11px] uppercase tracking-[0.08em]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/work/$slug"
                  params={{ slug: "qa-data-desk" }}
                  data-cursor="READ IT →"
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-cream bg-coral px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-cream transition-transform hover:-translate-y-0.5"
                >
                  Read the case study →
                </Link>
                <a
                  href={QA_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-cream px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-cream transition-transform hover:-translate-y-0.5"
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_IN }}
          >
            <Link
              to="/work/$slug"
              params={{ slug: "opti-recourse" }}
              data-cursor="PEEK INSIDE →"
              className="block h-full rounded-3xl border-2 border-ink bg-paper p-6 hard transition-transform hover:-translate-y-1 "
            >
              <div className="flex items-center gap-3">
                <Sparkle aria-hidden="true" className="doodle h-5 w-5 text-coral" />
                <span className="num text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Credit risk · ML
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-extrabold uppercase sm:text-4xl">
                OPTI-Recourse
              </h2>
              <p className="mt-4 text-base">
                A credit-risk model that doesn't just say no. It explains what would have to change
                for a yes.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["Python", "XGBoost", "SHAP", "Streamlit"].map((t) => (
                  <li key={t} className="label-pill bg-sunny">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="num mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em]">
                Peek inside <Arrow aria-hidden="true" className="h-3 w-6" />
              </p>
            </Link>
          </motion.div>
        </div>
      </Band>

      {/* ---------- RECENT BUILDS ---------- */}
      <Band className="bg-cream/90">
        <span className="label-pill bg-paper">( 04 ) Recent builds</span>
        <ul
          tabIndex={0}
          aria-label="Recent web builds, scroll sideways"
          className="-mx-5 mt-10 flex snap-x focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink snap-mandatory gap-6 overflow-x-auto px-5 pb-6"
        >
          {FREELANCE.map((p) => (
            <li key={p.slug} className="w-[80%] shrink-0 snap-start sm:w-[22rem]">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor="VIEW BUILD"
                className="group block h-full overflow-hidden rounded-3xl border-2 border-ink bg-paper hard transition-transform hover:-translate-y-1.5"
              >
                <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-4 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-coral ring-1 ring-ink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sunny ring-1 ring-ink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint ring-1 ring-ink" />
                  <span className="num ml-3 truncate rounded-full bg-paper px-3 py-0.5 text-[10px]">
                    {p.links?.[0]?.label}
                  </span>
                </div>
                <div className="p-5">
                  <span className="num inline-block rounded-full border-2 border-ink bg-sunny px-2 py-0.5 text-[10px] font-bold">
                    DEMO BUILD
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold uppercase">{p.title}</h3>
                  <p className="mt-2 text-sm">{p.outcome}</p>
                  <span className="num mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
                    Case study{" "}
                    <Arrow
                      aria-hidden="true"
                      className="h-3 w-6 transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/work"
          search={{ track: "web" }}
          className="num inline-flex min-h-11 items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-coral"
        >
          All web builds <Arrow aria-hidden="true" className="h-3 w-6" />
        </Link>
        <p className="num mt-6 border-y border-ink/20 py-4 text-center text-xs uppercase tracking-[0.15em]">
          Also: social media management for a few brands: content calendars, creatives and
          reporting.
        </p>
      </Band>

      {/* ---------- PLAYGROUND TEASER ---------- */}
      <Band className="bg-sunny/95" full={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_IN }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-5xl">
            Too much reading? Go throw some cubes instead.
          </h2>
          <div className="mt-8 flex justify-center">
            <ToyButton to="/playground" tone="paper" cursorLabel="DRAG ME">
              Enter the playground <Arrow aria-hidden="true" className="h-4 w-6" />
            </ToyButton>
          </div>
        </motion.div>
      </Band>

      {/* ---------- CLOSING CTA ---------- */}
      <Band className="bg-coral text-cream" full={false}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE_IN }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-6xl">
            Let's build something that doesn't break at 2am.
          </h2>
          <div className="mt-8 flex justify-center">
            <ToyButton to="/contact" tone="sunny" cursorLabel="SAY HI">
              Say hello 👋
            </ToyButton>
          </div>
        </motion.div>
      </Band>
    </main>
  );
}
