/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SectionLabel, WordReveal } from "@/components/site/PageShell";
import { DrawnUnderline, IconChart, IconPipes, IconShield, Star } from "@/components/site/Doodles";
import { TiltCard } from "@/components/site/TiltCard";
import { useMagnetic } from "@/components/site/ToyButton";
import { FREELANCE } from "@/lib/projects";
import { EASE_IN, pop, spring } from "@/lib/toy";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

export const Route = createFileRoute("/services")({
  head: () => ({
    ...seo({
      path: "/services",
      title: "Freelance Web Developer & Social Media Manager, Delhi NCR",
      description:
        "Rakshit Jain: freelance web development and social media management in Delhi NCR. Websites, landing pages, dashboards, content calendars and reporting.",
      ogTitle: "Websites and social media that pull their weight | Rakshit Jain",
      ogDescription:
        "Business sites, landing pages, dashboards and social media management. Pricing, process and past builds in one page.",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(serviceSchema()) }],
  }),
  component: Services,
});

const EMAIL = "itsrakshitjain@gmail.com";

const toneBg: Record<string, string> = {
  sky: "bg-sky text-cream",
  coral: "bg-coral text-cream",
  grape: "bg-grape text-cream",
  mint: "bg-mint text-ink",
  sunny: "bg-sunny text-ink",
};

const SERVICES = [
  {
    icon: "🖥️",
    name: "BUSINESS & BRAND WEBSITES",
    tone: "sky",
    pitch: "Multi-page sites for businesses that still look like they were built in 2014.",
    items: [
      "Up to 8 pages, fully responsive from 360px",
      "CMS so you can edit text yourself",
      "On-page SEO, meta, sitemap, schema",
      "Contact forms + WhatsApp integration",
    ],
  },
  {
    icon: "🚀",
    name: "LANDING PAGES THAT CONVERT",
    tone: "coral",
    pitch: "One page, one goal, built around the thing you want people to click.",
    items: [
      "Conversion-first layout and copy structure",
      "Scroll animations that guide, not distract",
      "Lead capture wired to email or a sheet",
      "A/B-ready sections",
    ],
  },
  {
    icon: "🎨",
    name: "PORTFOLIOS & CREATOR SITES",
    tone: "grape",
    pitch: "For photographers, designers, writers and people who need to look serious online.",
    items: [
      "Custom animation and interaction design",
      "Gallery and case-study layouts",
      "Optional 3D / WebGL hero",
      "Blog or journal setup",
    ],
  },
  {
    icon: "📊",
    name: "DASHBOARDS & INTERNAL TOOLS",
    tone: "mint",
    pitch: "This is where the data background actually matters.",
    items: [
      "Live data dashboards with real charts",
      "Admin panels, CRUD, auth, roles",
      "Database design, queries, API wiring",
      "Automated reports and scheduled jobs",
    ],
  },
  {
    icon: "\ud83d\udce3",
    name: "SOCIAL MEDIA MANAGEMENT",
    tone: "sunny",
    // Spans both columns: a fifth card in a two-up grid would otherwise sit
    // alone on the last row and read like a mistake.
    wide: true,
    pitch:
      "Content calendars, creatives and monthly reporting, run by someone who can actually read the numbers underneath.",
    items: [
      "Monthly content calendar, planned instead of improvised",
      "Post, story and reel creatives kept on-brand",
      "Instagram, LinkedIn, Facebook and YouTube",
      "Reporting that says what worked, not just what posted",
    ],
  },
];

const WHY = [
  [
    "I ALSO DO THE DATA.",
    "Analytics, event tracking, dashboards, database design. Your site can tell you what's working, not just look nice.",
  ],
  [
    "I TEST LIKE A QA ENGINEER.",
    "That's literally my day job. Your site gets checked across browsers and breakpoints before you ever see it.",
  ],
  ["I DON'T DISAPPEAR.", "You get the repo, the docs and a handover call. No hostage situations."],
  [
    "I'VE SHIPPED A REAL PRODUCT.",
    "Data Desk is eight tools in one app, 384 tests, auth, docs and deploy configs, open source on GitHub. Not a tutorial project.",
  ],
];

const STEPS = [
  ["01", "TALK", "15-min call. What it's for, who it's for, what success looks like."],
  ["02", "PLAN", "Scope, sitemap, stack and a fixed quote. No surprises later."],
  ["03", "BUILD", "You get a live preview link from day one and can comment on it as it grows."],
  ["04", "SHIP", "Deploy, domain, analytics, handover. Then two weeks of free fixes."],
];

// No figures on the page on purpose. A number with no scope behind it either
// scares off a good project or anchors me under one. The turnaround is what a
// visitor actually wants at this point, and the quote comes after a short call.
const PRICING = [
  {
    name: "LANDING PAGE",
    lead: "3–5 days",
    leadLabel: "live in",
    details: "1 page · responsive · animated · form wired up",
    cta: "Let's talk",
    tone: "bg-coral text-cream",
  },
  {
    name: "BUSINESS SITE",
    lead: "1–3 weeks",
    leadLabel: "live in",
    details: "up to 8 pages · CMS · SEO setup · 2 revision rounds",
    cta: "Let's talk",
    tone: "bg-sky text-cream",
    featured: true,
  },
  {
    name: "CUSTOM / APP",
    lead: "Let's scope it",
    leadLabel: "timeline",
    details: "dashboards, auth, databases, integrations, ongoing work",
    cta: "Let's talk",
    tone: "bg-mint text-ink",
  },
];

const STACK: [string, string[]][] = [
  [
    "FRONTEND",
    ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js / R3F"],
  ],
  ["BACKEND & DATA", ["Node", "Supabase", "PostgreSQL", "MySQL", "REST APIs", "Auth"]],
  ["CMS & DEPLOY", ["Sanity", "Headless CMS", "Vercel", "Netlify", "GitHub Actions"]],
  ["EXTRAS", ["SEO", "Core Web Vitals", "GA4", "Responsive Design", "Accessibility"]],
];
const pillTones = ["bg-sunny", "bg-mint", "bg-sky text-cream", "bg-coral text-cream", "bg-paper"];

const FAQ = [
  [
    "How long does a site take?",
    "Landing page 3–5 days. Business site 1–3 weeks. Custom work depends on scope and I'll tell you honestly up front.",
  ],
  [
    "Do you design, or do I need a designer?",
    "I design and build. If you already have a Figma file, even better, I'll build it properly.",
  ],
  [
    "Can I update the content myself?",
    "Yes. Business sites ship with a CMS and I'll walk you through it on the handover call.",
  ],
  [
    "What if I need changes after launch?",
    "Two weeks of fixes are included. After that, small changes are hourly and bigger ones get their own quote.",
  ],
  ["Do you work with people outside Delhi NCR?", "All of it is remote. Half my work already is."],
  ["Who owns the code?", "You do. Repo transferred on final payment."],
];

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: EASE_IN },
};

const btn =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wide hard transition-transform active:scale-95";

function MagLink({
  children,
  className,
  ...rest
}: { children: ReactNode; className: string } & (
  { to: string; search?: Record<string, string> } | { href: string }
)) {
  const m = useMagnetic();
  return (
    <motion.div {...m} className="inline-block">
      {"to" in rest ? (
        <Link
          to={rest.to}
          search={rest.search as never}
          onClick={() => pop()}
          className={cn(btn, className)}
        >
          {children}
        </Link>
      ) : (
        <a href={rest.href} onClick={() => pop()} className={cn(btn, className)}>
          {children}
        </a>
      )}
    </motion.div>
  );
}

const H2 = ({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id: string;
  className?: string;
}) => (
  <h2
    id={id}
    className={cn("display-xl", className)}
    style={{ fontSize: "clamp(2rem,6vw,3.75rem)" }}
  >
    {children}
  </h2>
);

function Services() {
  return (
    <main
      id="main"
      className="relative min-h-screen pb-0 pt-32"
      style={{ background: "color-mix(in oklab, var(--cream) 80%, transparent)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Header />
        <WhatIBuild />
      </div>
      <WhyMe />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Process />
        <Pricing />
        <Builds />
        <Stack />
        <Social />
        <Faq />
      </div>
      <Closing />
    </main>
  );
}

function Header() {
  return (
    <header>
      <SectionLabel index="04">Services</SectionLabel>
      {/* One block per line: the sky span used to wrap across two lines, which
          stretched the underline the full width of the heading. */}
      <h1 className="display-xl mt-6">
        <span className="block">
          <WordReveal text="I BUILD WEBSITES" />
        </span>
        <span className="block">
          <WordReveal text="THAT" />{" "}
          <span className="text-sky">
            <WordReveal text="PULL THEIR" />
          </span>
        </span>
        <span className="block">
          <span className="relative inline-block text-sky">
            <WordReveal text="WEIGHT." />
            <DrawnUnderline className="absolute -bottom-1 left-0 h-4 w-full text-sky" />
          </span>
        </span>
      </h1>
      <motion.p
        {...fade}
        className="prose-measure mt-8 rounded-2xl border-2 border-ink bg-paper p-5 text-lg hard"
      >
        Freelance web development out of Delhi NCR. You get a fast, responsive, properly animated
        site, and someone who understands the data behind it, not just the pixels.
      </motion.p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="label-pill bg-paper">
          <span className="mr-2 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-mint ring-1 ring-ink" />
          OPEN FOR PROJECTS · typical turnaround 1–3 weeks
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <MagLink
          to="/contact"
          search={{ subject: "Freelance Project" }}
          className="bg-coral text-cream"
        >
          Start a project <ArrowRight size={16} />
        </MagLink>
        <MagLink href="#builds" className="bg-paper text-ink">
          See the builds ↓
        </MagLink>
      </div>
    </header>
  );
}

function WhatIBuild() {
  return (
    <section aria-labelledby="build" className="mt-24">
      <H2 id="build">WHAT I BUILD</H2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            {...fade}
            transition={{ ...fade.transition, delay: (i % 2) * 0.08 }}
            className={cn("wide" in s && s.wide && "md:col-span-2")}
          >
            <TiltCard rest={i % 2 ? 1.5 : -1.5} className="h-full overflow-hidden bg-paper">
              <div
                className={cn(
                  "flex items-center justify-between border-b-2 border-ink px-5 py-3",
                  toneBg[s.tone],
                )}
              >
                <h3 className="font-display text-xl font-extrabold leading-tight">{s.name}</h3>
                <span
                  className="text-3xl [animation:wiggle_2.4s_ease-in-out_infinite]"
                  aria-hidden="true"
                >
                  {s.icon}
                </span>
              </div>
              <div className="p-5">
                <p className="text-base">{s.pitch}</p>
                <ul className="num mt-4 flex flex-col gap-2 text-[13px]">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="text-coral">▸</span> {it}
                    </li>
                  ))}
                </ul>
                {s.tone === "mint" && (
                  <Link
                    to="/work/$slug"
                    params={{ slug: "qa-data-desk" }}
                    className="mt-4 inline-block text-sm font-semibold underline decoration-2 underline-offset-4"
                  >
                    Want proof? Data Desk is exactly this, built end to end.
                  </Link>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyMe() {
  const icons = [IconChart, IconShield, IconPipes, IconChart];
  return (
    <section aria-labelledby="why" data-cursor-dark className="mt-24 bg-ink py-20 text-cream">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <span className="label-pill bg-sunny text-ink">Not a generic freelancer</span>
        <motion.h2
          {...fade}
          id="why"
          className="display-xl mt-5"
          style={{ fontSize: "clamp(2.2rem,7vw,4.5rem)" }}
        >
          MOST DEVS STOP AT THE <span className="text-sunny">FRONTEND.</span>
        </motion.h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-y-10">
          {WHY.map(([t, d], i) => {
            const Icon = icons[i]!;
            return (
              <motion.div
                key={t}
                {...fade}
                transition={{ ...fade.transition, delay: i * 0.1 }}
                className={cn(
                  "md:px-6",
                  i > 0 && "border-t border-cream/30 pt-8",
                  i === 1 && "md:border-l md:border-t-0 md:pt-0",
                  i === 3 && "md:border-l",
                )}
              >
                <Icon className="h-10 w-10 text-sunny" />
                <h3 className="num mt-4 text-sm font-bold tracking-[0.12em]">{t}</h3>
                <p className="num mt-2 text-[13px] leading-relaxed text-cream/80">{d}</p>
                {i === 3 && (
                  <Link
                    to="/work/$slug"
                    params={{ slug: "qa-data-desk" }}
                    className="num mt-3 inline-flex min-h-11 items-center text-[12px] font-bold uppercase tracking-[0.2em] text-sunny underline-offset-4 hover:underline"
                  >
                    SEE IT →
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  return (
    <section aria-labelledby="how" className="mt-24">
      <H2 id="how">HOW IT WORKS</H2>
      <div ref={ref} className="relative mt-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          className="absolute left-0 top-6 hidden h-10 w-full text-ink lg:block"
        >
          <motion.path
            d="M20 20 C 180 0, 300 40, 500 20 S 820 0, 980 20"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="10 10"
            fill="none"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, t, d], i) => (
            <motion.li key={n} {...fade} transition={{ ...fade.transition, delay: i * 0.1 }}>
              <span className="num relative z-10 inline-block rounded-full border-2 border-ink bg-sunny px-3 py-1 text-2xl font-bold">
                {n}
              </span>
              <TiltCard rest={i % 2 ? 2 : -2} className="mt-4 bg-paper p-5">
                <h3 className="font-display text-xl font-extrabold">{t}</h3>
                <p className="mt-2 text-sm">{d}</p>
              </TiltCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section aria-labelledby="pricing" className="mt-24">
      <H2 id="pricing">PACKAGES</H2>
      <div className="mt-10 flex flex-col gap-8 md:grid md:grid-cols-3 md:items-center">
        {PRICING.map((p, i) => (
          <motion.div
            key={p.name}
            {...fade}
            transition={{ ...fade.transition, delay: i * 0.08 }}
            className={cn(p.featured && "order-first md:order-none md:scale-105")}
          >
            <TiltCard rest={p.featured ? 0 : i === 0 ? -2 : 2} className="relative bg-paper">
              {p.featured && (
                <span className="label-pill absolute -top-4 right-5 z-10 rotate-3 bg-sunny">
                  <Star className="mr-1 h-3.5 w-3.5 text-coral" /> Most picked
                </span>
              )}
              <div className={cn("rounded-t-[22px] border-b-2 border-ink px-5 py-3", p.tone)}>
                <h3 className="font-display text-lg font-extrabold">{p.name}</h3>
              </div>
              <div className="p-5">
                <p className="num text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {p.leadLabel}
                </p>
                <p className="num mt-1 text-4xl font-bold tabular-nums">{p.lead}</p>
                <p className="num mt-4 text-[13px] leading-relaxed">{p.details}</p>
                <div className="mt-6">
                  <MagLink
                    to="/contact"
                    search={{ subject: "Freelance Project" }}
                    className={p.featured ? "bg-coral text-cream" : "bg-paper text-ink"}
                  >
                    {p.cta} <ArrowRight size={16} />
                  </MagLink>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
      <p className="num mt-8 max-w-2xl text-[12px] leading-relaxed text-muted-foreground">
        * No numbers on this page on purpose. Every site gets quoted after a short call, so you get
        a real figure for your scope instead of a padded one that covers somebody else&apos;s. I
        take on a limited number of projects alongside full-time work, so I&apos;ll tell you early
        and honestly if I can&apos;t do yours justice. Students and early-stage founders: talk to me
        anyway, I flex.
      </p>
    </section>
  );
}

function MockLayout({ tone }: { tone: string }) {
  const main = toneBg[tone] ?? "bg-sunny";
  return (
    <div className="grid h-40 grid-cols-6 grid-rows-4 gap-2 bg-cream p-3" aria-hidden="true">
      <div className="col-span-6 rounded-md border-2 border-ink bg-paper" />
      <div className={cn("col-span-4 row-span-2 rounded-md border-2 border-ink", main)} />
      <div className="col-span-2 row-span-2 rounded-md border-2 border-ink bg-sand" />
      <div className="col-span-2 rounded-md border-2 border-ink bg-paper" />
      <div className={cn("col-span-2 rounded-md border-2 border-ink", main)} />
      <div className="col-span-2 rounded-md border-2 border-ink bg-paper" />
    </div>
  );
}

function Builds() {
  return (
    <section id="builds" aria-labelledby="builds-h" className="mt-24 scroll-mt-28">
      <H2 id="builds-h">THE BUILDS</H2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {FREELANCE.map((p, i) => (
          <motion.div
            key={p.slug}
            {...fade}
            transition={{ ...fade.transition, delay: (i % 2) * 0.08 }}
          >
            <Link
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-cursor="VIEW BUILD"
              className="group block"
            >
              <TiltCard rest={i % 2 ? 1.5 : -1.5} className="overflow-hidden bg-paper">
                <div className="flex items-center gap-1.5 border-b-2 border-ink bg-sand px-4 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-coral ring-1 ring-ink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-sunny ring-1 ring-ink" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint ring-1 ring-ink" />
                  <span className="num ml-3 truncate rounded-full border border-ink/30 bg-paper px-3 py-0.5 text-[10px]">
                    https://{p.links?.[0]?.label}
                  </span>
                </div>
                <div className="border-b-2 border-ink">
                  <MockLayout tone={p.tone ?? "sunny"} />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="num text-coral">{String(i + 1).padStart(2, "0")}</span>
                    <span className="num rounded-full border-2 border-ink bg-sunny px-2 py-0.5 text-[10px] font-bold">
                      DEMO BUILD
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-extrabold">{p.title}</h3>
                  <p className="mt-2 text-sm">{p.context[0]}</p>
                  <p className="num mt-3 text-[11px] text-muted-foreground">{p.tags.join(" · ")}</p>
                  <p className="mt-3 border-t border-ink/20 pt-3 text-sm font-semibold">
                    → {p.outcome}
                  </p>
                  <span className="num mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em]">
                    Case study{" "}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </div>
      <Link
        to="/work"
        search={{ track: "web" }}
        className="num mt-8 inline-flex min-h-11 items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-coral"
      >
        See them on the Work page <ArrowRight size={14} />
      </Link>
    </section>
  );
}

function Stack() {
  return (
    <section aria-labelledby="stack" className="mt-24">
      <H2 id="stack">MY WEB STACK</H2>
      <div className="mt-8 flex flex-col gap-6">
        {STACK.map(([group, items], gi) => (
          <motion.div key={group} {...fade} transition={{ ...fade.transition, delay: gi * 0.06 }}>
            <p className="num text-[11px] font-bold uppercase tracking-[0.2em]">{group}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((it, i) => (
                <motion.span
                  key={it}
                  whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }}
                  transition={spring}
                  className={cn(
                    "label-pill cursor-default",
                    pillTones[(i + gi) % pillTones.length],
                  )}
                >
                  {it}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Social() {
  return (
    <motion.section
      {...fade}
      id="social"
      aria-label="Also available"
      className="mt-20 rounded-3xl border-2 border-ink bg-sand p-6"
    >
      <p className="num text-[11px] font-bold uppercase tracking-[0.2em]">Also available</p>
      <p className="mt-3">
        <strong className="font-display">SOCIAL MEDIA MANAGEMENT</strong>: content calendars, post
        creatives, captions, scheduling and monthly performance reporting. Instagram and LinkedIn
        mainly. Usually bundled with a website build.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="num text-[12px]">Monthly retainer · ask for current rates</p>
        <Link to="/contact" className="num text-[12px] font-bold underline underline-offset-4">
          ASK ME →
        </Link>
      </div>
    </motion.section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq" className="mt-24">
      <H2 id="faq">FAQ</H2>
      <div className="mt-8 flex flex-col gap-3">
        {FAQ.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div
              key={q}
              className={cn(
                "overflow-hidden rounded-2xl border-2 border-ink bg-paper",
                isOpen && "hard",
              )}
            >
              <button
                type="button"
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-bold"
              >
                {q}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={spring}
                  className="shrink-0 rounded-full border-2 border-ink bg-sunny p-1"
                >
                  <ChevronDown size={18} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  >
                    <p className="border-t-2 border-dashed border-ink/30 px-5 py-4">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section
      aria-labelledby="closing"
      className="mt-24 border-t-2 border-ink bg-sky py-20 text-cream"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 sm:px-8">
        <motion.h2
          {...fade}
          id="closing"
          className="display-xl"
          style={{ fontSize: "clamp(2.2rem,7vw,4.5rem)" }}
        >
          GOT A PROJECT? I'VE GOT A FREE SLOT.
        </motion.h2>
        <div className="flex flex-wrap gap-3">
          <MagLink
            to="/contact"
            search={{ subject: "Freelance Project" }}
            className="bg-sunny text-ink"
          >
            Start a project <ArrowRight size={16} />
          </MagLink>
          <MagLink href={`mailto:${EMAIL}`} className="bg-paper text-ink">
            Email me directly
          </MagLink>
        </div>
      </div>
    </section>
  );
}
