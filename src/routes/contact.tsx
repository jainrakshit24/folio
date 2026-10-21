/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { EASE_IN, pop } from "@/lib/toy";
import { SectionLabel, WordReveal } from "@/components/site/PageShell";
import { Sparkle, Squiggle, Star } from "@/components/site/Doodles";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      path: "/contact",
      title: "Contact: Let's Talk About Your Data | Rakshit Jain",
      description:
        "Rakshit Jain is open to Data Engineer and Data Analyst roles, and to freelance data or dashboard work. Email, phone, LinkedIn, GitHub. Delhi NCR, India.",
      ogDescription:
        "Open to Data Engineer and Data Analyst roles, and to freelance data or dashboard work.",
    }),
  validateSearch: (s: Record<string, unknown>): { subject?: string } =>
    typeof s["subject"] === "string" ? { subject: s["subject"] } : {},
  component: Contact,
});

const EMAIL = "itsrakshitjain@gmail.com";

const rise = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

/* ---------- live IST clock, inline variant ---------- */
function istNow() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function InlineISTClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    setTime(istNow());
    const id = setInterval(() => setTime(istNow()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="num inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-[11px] tracking-[0.14em] hard-sm">
      <span className="pulse-dot !h-2 !w-2 !border" aria-hidden="true" />
      <span className="tabular-nums">{time} IST</span>
    </span>
  );
}

/* ---------- left column: direct link rows ---------- */
type RowDef = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  copy?: string;
  extra?: ReactNode;
};

const ROWS: RowDef[] = [
  { label: "EMAIL", value: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
  { label: "PHONE", value: "+91 72067 53199", href: "tel:+917206753199" },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/jainrakshit24",
    href: "https://linkedin.com/in/jainrakshit24",
    external: true,
  },
  {
    label: "GITHUB",
    value: "github.com/jainrakshit24",
    href: "https://github.com/jainrakshit24",
    external: true,
  },
  { label: "LOCATION", value: "Delhi NCR, India", extra: <InlineISTClock /> },
];

const ACCENTS = ["bg-coral", "bg-sunny", "bg-sky", "bg-grape", "bg-mint"];

function ContactRow({ row, index }: { row: RowDef; index: number }) {
  const inner = (
    <>
      <span
        className={cn(
          "num flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 border-ink text-xs font-bold hard-sm transition-transform duration-300 group-hover:-rotate-6",
          ACCENTS[index % ACCENTS.length],
        )}
        aria-hidden="true"
      >
        0{index + 1}
      </span>
      <span className="flex w-6 shrink-0 items-center overflow-hidden" aria-hidden="true">
        <ArrowRight className="h-5 w-5 -translate-x-7 text-amber opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </span>
      <span className="num hidden w-20 shrink-0 text-[11px] sm:inline uppercase tracking-[0.24em] text-muted-foreground transition-transform duration-300 group-hover:translate-x-2">
        {row.label}
      </span>
      <span className="flex flex-wrap items-center gap-x-4 gap-y-2 min-w-0 break-all font-display text-base font-bold sm:break-normal sm:text-lg">
        <span className="num w-full text-[10px] uppercase tracking-[0.24em] text-muted-foreground sm:hidden">{row.label}</span>
        {row.value}
        {row.extra}
      </span>
    </>
  );

  const rowClasses = cn(
    "group relative flex w-full items-center gap-3 px-3 py-5 pr-2 transition-colors duration-300 hover:bg-ink-soft sm:gap-5",
  );

  return (
    <motion.div
      variants={rise}
      transition={{ duration: 0.6, ease: EASE_IN, delay: index * 0.06 }}
      className="flex items-stretch border-t border-ink-line last:border-b"
    >
      {row.href ? (
        <a
          href={row.href}
          {...(row.external ? { target: "_blank", rel: "noreferrer" } : {})}
          data-cursor="TAP"
          className={rowClasses}
        >
          {inner}
        </a>
      ) : (
        <div className={rowClasses}>{inner}</div>
      )}
      {row.copy && (
        <button
          type="button"
          aria-label={`Copy ${row.label.toLowerCase()} to clipboard`}
          data-cursor="COPY"
          onClick={async () => {
            const text = row.copy!;
            let ok = false;
            try {
              await navigator.clipboard.writeText(text);
              ok = true;
            } catch {
              try {
                const ta = document.createElement("textarea");
                ta.value = text;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                ok = document.execCommand("copy");
                ta.remove();
              } catch {
                ok = false;
              }
            }
            if (ok) {
              pop(720);
              toast.success("COPIED", { description: text });
            } else {
              toast.info(text, { description: "Copy it manually" });
            }
          }}
          className="my-3 ml-2 shrink-0 self-center rounded-full border-2 border-ink bg-paper p-2.5 transition-colors hover:bg-amber"
        >
          <Copy className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}

/* ---------- right column: underlined form fields ---------- */
type FieldProps = {
  id: string;
  label: string;
  error?: string | undefined;
  children: (floated: boolean) => ReactNode;
  floated: boolean;
};

function FieldShell({ id, label, error, floated, children }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const up = floated || focused;
  return (
    <div className="relative pt-5" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <label
        htmlFor={id}
        className={cn(
          "num pointer-events-none absolute left-0 uppercase transition-all duration-300",
          up
            ? cn("top-0 text-[10px] tracking-[0.24em]", focused ? "text-ink" : "text-muted-foreground")
            : "top-8 text-sm tracking-[0.18em] text-muted-foreground",
        )}
      >
        {label}
      </label>
      {children(up)}
      {/* base rule + animated amber rule */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-ink-line" aria-hidden="true" />
      <span
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left bg-amber transition-transform duration-300",
          focused ? "scale-x-100" : "scale-x-0",
        )}
        aria-hidden="true"
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="num mt-1.5 text-[11px] uppercase tracking-[0.16em] text-destructive"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClasses =
  "peer w-full bg-transparent px-0 pb-2.5 pt-3 font-medium text-ink outline-none placeholder:text-muted-foreground/50";

const SUBJECTS = ["Job Opportunity", "Freelance Project", "Collaboration", "Other"] as const;

type FormValues = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "sent";

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.name.trim()) errors.name = "Your name, please";
  if (!values.email.trim()) errors.email = "An email so I can reply";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "That email looks off";
  if (!values.subject) errors.subject = "Pick a topic";
  if (values.message.trim().length < 10) errors.message = "A few more words (10+ characters)";
  return errors;
}

function ContactForm() {
  const search = Route.useSearch();
  const initialSubject = (SUBJECTS as readonly string[]).includes(search.subject ?? "") ? search.subject! : "";
  const [values, setValues] = useState<FormValues>({ name: "", email: "", subject: initialSubject, message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof FormValues, v: string) => {
    const next = { ...values, [key]: v };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof FormValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length > 0 || status !== "idle") return;

    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      pop(880);
      const subject = `[${values.subject}] Portfolio message from ${values.name}`;
      const body = `${values.message}\n\n${values.name} (${values.email})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.setTimeout(() => setStatus("idle"), 5000);
    }, 900);
  };

  return (
    <motion.form
      variants={rise}
      transition={{ duration: 0.6, ease: EASE_IN, delay: 0.15 }}
      onSubmit={submit}
      noValidate
      className="toy-card bg-paper/90 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="-mx-6 -mt-6 mb-2 flex items-center justify-between rounded-t-[inherit] border-b-2 border-ink bg-sunny px-6 py-3 sm:-mx-8 sm:-mt-8 sm:px-8">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-paper" />
          <span className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
        </span>
        <span className="num text-[11px] uppercase tracking-[0.24em]">Message builder</span>
      </div>
      <h2 className="mt-5 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
        Write to me <span className="doodle inline-block">✉️</span>
      </h2>

      <div className="mt-4 space-y-7">
        <FieldShell id="cf-name" label="Name" floated={!!values.name} error={touched.name ? errors.name : undefined}>
          {() => (
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              className={inputClasses}
              aria-invalid={!!(touched.name && errors.name)}
            />
          )}
        </FieldShell>

        <FieldShell id="cf-email" label="Email" floated={!!values.email} error={touched.email ? errors.email : undefined}>
          {() => (
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              className={inputClasses}
              aria-invalid={!!(touched.email && errors.email)}
            />
          )}
        </FieldShell>

        <FieldShell id="cf-subject" label="Subject" floated={!!values.subject} error={touched.subject ? errors.subject : undefined}>
          {() => (
            <div className="relative">
              <select
                id="cf-subject"
                value={values.subject}
                onChange={(e) => set("subject", e.target.value)}
                onBlur={() => blur("subject")}
                className={cn(inputClasses, "appearance-none pr-8", !values.subject && "text-transparent")}
                aria-invalid={!!(touched.subject && errors.subject)}
              >
                <option value="" disabled hidden>
                  Choose…
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="text-ink">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
        </FieldShell>

        <FieldShell id="cf-message" label="Message" floated={!!values.message} error={touched.message ? errors.message : undefined}>
          {() => (
            <textarea
              id="cf-message"
              rows={4}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              onBlur={() => blur("message")}
              className={cn(inputClasses, "resize-none")}
              aria-invalid={!!(touched.message && errors.message)}
            />
          )}
        </FieldShell>
      </div>

      <button
        type="submit"
        disabled={status !== "idle"}
        data-cursor="SEND"
        className={cn(
          "mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wide transition-colors hard",
          status === "sent" ? "bg-teal text-ink" : "bg-amber text-ink hover:bg-sunny",
          status === "sending" && "opacity-80",
        )}
      >
        {status === "idle" && (
          <>
            Send message <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
        {status === "sending" && (
          <>
            Sending… <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </>
        )}
        {status === "sent" && (
          <>
            Ready to send <Check className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="num mt-4 text-center text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
        No server here. This opens your email app with everything pre-filled.
      </p>

      <AnimatePresence>
        {status === "sent" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="num mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-ink"
            role="status"
          >
            Your email app should open now, or write to {EMAIL} directly.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

/* ---------- giant clipped wordmark with scroll motion ---------- */
function WordmarkFooter() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["1.5%", "-1.5%"]);
  const letters = "RAKSHIT JAIN".split("");

  return (
    <h2
      ref={ref}
      aria-hidden="true"
      className="mt-6 whitespace-nowrap text-center font-display font-extrabold uppercase leading-[0.78] tracking-[-0.045em]"
      style={{ fontSize: "clamp(3rem, 10.4vw, 11rem)" }}
    >
      <motion.span
        style={{ x }}
        className="flex justify-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: "115%", rotate: 8, opacity: 0 },
              show: {
                y: 0,
                rotate: 0,
                opacity: 1,
                transition: { duration: 0.7, ease: EASE_IN, delay: i * 0.05 },
              },
            }}
            whileHover={{ y: "-0.06em", rotate: i % 2 ? 3 : -3, transition: { duration: 0.2 } }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.span>
    </h2>
  );
}

/* ---------- the page ---------- */
function Contact() {
  return (
    <main id="main" className="relative min-h-screen px-5 pt-32 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* ---------- HEADER ---------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="relative"
        >
          <Star className="doodle absolute -top-6 right-4 hidden h-12 w-12 text-sunny sm:block" />
          <Sparkle className="absolute right-24 top-24 hidden h-7 w-7 text-coral lg:block" />
          <motion.div variants={rise} transition={{ duration: 0.6, ease: EASE_IN }} className="flex flex-wrap items-center gap-3">
            <SectionLabel index="06">Contact</SectionLabel>
            <span className="label-pill bg-mint">
              <span className="pulse-dot !h-2 !w-2 !border" aria-hidden="true" /> Open to work
            </span>
          </motion.div>
          <h1 className="display-xl mt-6">
            <WordReveal text="LET'S TALK ABOUT" />
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-x-[-0.1em] bottom-[0.08em] top-[0.2em] -z-10 -rotate-1 rounded-lg border-2 border-ink bg-sunny" aria-hidden="true" />
              <WordReveal text="YOUR DATA." />
            </span>
          </h1>
          <Squiggle aria-hidden="true" className="mt-4 h-3 w-40 text-coral" />
          <motion.div variants={rise} transition={{ duration: 0.6, ease: EASE_IN }} className="mt-6 flex flex-wrap items-start gap-4">
            <p className="prose-measure toy-card bg-paper/90 px-5 py-4 text-lg backdrop-blur-sm">
              Open to Data Engineer and Data Analyst roles, and to freelance pipeline or dashboard
              work.
            </p>
            <div className="flex flex-wrap gap-2">
              {["ETL pipelines", "Dashboards", "SQL · Python"].map((t, i) => (
                <span key={t} className={cn("label-pill", ["bg-sky text-paper", "bg-grape text-paper", "bg-paper"][i])}>{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- LINKS + FORM ---------- */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-12"
        >
          <div className="toy-card relative self-start bg-paper/90 p-4 backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="num text-[11px] uppercase tracking-[0.24em]">Directory · 05 lines</p>
              <span className="num rotate-2 rounded-md border-2 border-ink bg-sunny px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] hard-sm">Replies &lt; 24h</span>
            </div>
            {ROWS.map((row, i) => (
              <ContactRow key={row.label} row={row} index={i} />
            ))}
          </div>
          <ContactForm />
        </motion.div>
      </div>

      {/* ---------- OVERSIZED FOOTER ---------- */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE_IN }}
        className="-mx-5 mt-28 overflow-hidden border-t-4 border-ink bg-sunny sm:-mx-8"
        aria-label="Availability"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-3 px-5 pt-10">
          <span className="inline-flex items-center gap-3 rounded-full border-2 border-ink bg-paper px-4 py-2 hard-sm">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="num text-xs uppercase tracking-[0.3em] sm:text-sm">Available for work</span>
          </span>
          <Star className="doodle h-8 w-8 text-coral" />
        </div>
        <WordmarkFooter />
      </motion.footer>
    </main>
  );
}
