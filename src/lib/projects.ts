/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
export type ProjectCategory =
  "WEB DEVELOPMENT" | "DATA ENGINEERING" | "MACHINE LEARNING" | "ANALYTICS" | "AUTOMATION";

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

export type Project = {
  num: string;
  slug: string;
  title: string;
  outcome: string;
  category: ProjectCategory;
  tags: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  /** Real shipped product that belongs to both tracks. */
  product?: boolean;
  /** Static architecture diagram under /public/diagrams, embedded on the case study. */
  diagram?: string;
  tone?: "sunny" | "grape" | "mint" | "coral" | "sky";
  /* case study */
  role: string;
  year: string;
  status: string;
  context: string[];
  approach: string[];
  results: Metric[];
};

export const PROJECT_FILTERS: ("ALL" | ProjectCategory)[] = [
  "ALL",
  "WEB DEVELOPMENT",
  "DATA ENGINEERING",
  "MACHINE LEARNING",
  "ANALYTICS",
];

export const QA_REPO = "https://github.com/jainrakshit24/QA-Data-Desk";

export const PROJECTS: Project[] = [
  {
    num: "00",
    slug: "qa-data-desk",
    diagram: "/diagrams/data-desk-architecture.html",
    title: "DATA DESK",
    outcome:
      "A read-only database investigation platform for QA engineers. Eight tools, 384 tests, and not one row of data leaves the database.",
    category: "DATA ENGINEERING",
    tags: ["Python", "Streamlit", "MySQL", "Gemini API", "Playwright", "Docker"],
    links: [{ label: "github.com/jainrakshit24/QA-Data-Desk", href: QA_REPO }],
    featured: true,
    product: true,
    tone: "mint",
    role: "Solo: product, build, tests, docs, deploy",
    year: "Sep 2026 → ongoing",
    status: "Open source, self-hosted",
    context: [],
    approach: [],
    results: [
      { value: 384, label: "automated tests" },
      { value: 8, label: "tools in one app" },
      { value: 0, label: "writes to your database" },
    ],
  },
  {
    num: "01",
    slug: "opti-recourse",
    diagram: "/diagrams/opti-recourse-architecture.html",
    title: "OPTI-RECOURSE",
    outcome:
      "Credit-risk prediction platform that explains every rejection and tells the borrower how to flip it.",
    category: "MACHINE LEARNING",
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Optuna",
      "SHAP",
      "LIME",
      "Streamlit",
    ],
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Read the Paper", href: "#" },
    ],
    featured: true,
    role: "Solo build: modelling, explainability, app",
    year: "2025",
    status: "Published · Live",
    context: [
      "Credit rejections are usually a black box. A borrower gets a no, with no indication of what would have made it a yes, and the lender carries a model nobody in the business can interrogate.",
      "That leaves two problems in one system: applicants have no route back, and risk teams cannot defend a decision when a regulator, an analyst or a customer asks why. OPTI-Recourse was built to close both gaps with the same set of explanations.",
    ],
    approach: [
      "Built and compared three classifiers (XGBoost, Logistic Regression and Random Forest) on a held-out test set with cross-validation.",
      "Tuned hyperparameters with Optuna, targeting recall so genuinely risky applicants aren't missed.",
      "Layered SHAP for global, portfolio-level feature attribution and LIME for individual predictions.",
      "Turned the explanations into recourse: the specific feature changes that would flip a rejection.",
      "Shipped it as an interactive Streamlit dashboard for real-time risk scoring.",
      "Wrote up the methodology; peer-reviewed and published in IJSREM.",
    ],
    results: [
      { value: 12, prefix: "+", suffix: "%", label: "more risky borrowers caught" },
      { value: 3, label: "models compared head to head" },
      { value: 2, label: "ways it explains a rejection" },
      { value: 1, label: "peer-reviewed publication" },
    ],
  },
  {
    num: "02",
    slug: "campaign-data-integrity",
    title: "AD CAMPAIGN DATA INTEGRITY",
    outcome:
      "Reconciled an ad platform's client, campaign and delivery-unit data across three master sources and the APIs on top of them, and proved where the documented behaviour and the live system disagreed.",
    category: "DATA ENGINEERING",
    tags: ["SQL", "MySQL", "Python", "REST APIs", "Schema Analysis", "Data Quality"],
    role: "Careers360",
    year: "2026",
    status: "In production",
    tone: "sky",
    context: [
      "An advertising platform where one client record fans out into campaigns, and each campaign into the delivery units that actually run. Three client categories sit behind that single screen, and each one draws its entities from a different master table under a different rule about what may be attached and where it may come from.",
      "That shape makes drift cheap and silent. A record can read one way in the admin UI, a second way from the API and a third way in the table underneath, and nothing anywhere throws. The first person to notice is a client looking at a report that does not match what they bought.",
      "The written spec was spread across sibling tickets that contradicted each other, and ticket status tracked intent rather than reality: work marked done was sometimes not deployed, and work marked open was already serving traffic. Taking either the spec or the board at face value would have produced a confident, wrong answer.",
    ],
    approach: [
      "Rebuilt the data model from the live schema instead of the document: which master table feeds each client category, which keys carry the association, and how a soft delete marks a row as gone while leaving it joinable.",
      "Read every record three ways, querying the database directly in Python and comparing it against the same record from the API and the admin UI, rather than trusting any single surface.",
      "Reconstructed the campaign state machine from live data and found the documented status mapping was inverted for two of the four states, which meant every draft count derived from it was describing the wrong set of rows.",
      "Traced an asset field that never populated back to its source and showed the application was reading a table that had never held that data, while the real values sat in a different master table all along.",
      "Separated genuine spec violations from legacy rows that predate the current rules, so the fix list reflected the policy rather than the history, and flagged the ambiguous ones instead of quietly picking a side.",
      "Established what could not be verified at all: one feature's backing table was empty in the test environment, so the conflict and locking behaviour had no path to proof. Reported it as untestable rather than passing it.",
      "Kept direct database writes out of permission and editability testing, because writing straight to the table bypasses the exact validation layer under test and turns a real check into a green tick that proves nothing.",
      "Wrote every finding with the query and the request that reproduce it, so each one could be confirmed by someone else without rerunning my session.",
    ],
    results: [
      { value: 1135, label: "records breaking the stated rules" },
      { value: 100, suffix: "%", label: "database and API in agreement" },
      { value: 2, label: "status codes the docs got wrong" },
      { value: 0, label: "findings without proof attached" },
    ],
  },
  {
    num: "03",
    slug: "college-predictor-data",
    title: "COLLEGE PREDICTOR DATA VALIDATION",
    outcome:
      "Validated the ranks, counts and field mappings behind a student-facing prediction tool by recomputing every aggregate from source rather than trusting what the application had stored.",
    category: "ANALYTICS",
    tags: ["SQL", "MySQL", "Python", "Analytics", "Data Validation"],
    role: "Careers360",
    year: "2026",
    status: "In production",
    tone: "mint",
    context: [
      "A prediction tool students use to judge where they stand. Behind one number on screen sit several layers: entries that record a usage event, per-user rank and count aggregates built from them, a mapping layer that decides which inputs feed which prediction, and an entitlement layer that decides whether this user was allowed the attempt at all.",
      "The failure mode here is worse than an outage. An outage is obvious and someone fixes it in an hour. A rank computed from a mapping that quietly points at the wrong column does not look like a bug; it looks like an answer, and a student makes a real decision on it.",
      "Correctness was therefore both arithmetic and access. The same attempt has to be counted once, ranked against the right population, and permitted by the entitlement that gates it, and all three have to agree.",
    ],
    approach: [
      "Worked backwards from the number on screen to the exact rows that produced it, through the usage, rank and count layers in turn, so every figure had a traceable lineage rather than a plausible one.",
      "Recomputed each aggregate independently in SQL and compared it against what the application had stored, treating a match as the only acceptable result and an explained mismatch as the next best.",
      "Verified the field-mapping layer resolves every predictor input to a column that actually exists, including the mappings that point at columns which had since been renamed or dropped.",
      "Cross-checked usage entries against the entitlement records that gate them, so access, attempt counts and the ranks derived from them tell the same story.",
      "Proved each API filter with a negative case as well as a positive one, after finding that an unrecognised parameter name is silently ignored and returns the full unfiltered set, which reads exactly like a filter that works.",
      "Probed the live API and database before drawing any conclusion, because ticket status in this codebase reflected intent rather than what was deployed.",
      "Documented the cases where the spec and the data genuinely disagreed and escalated them as questions, instead of assuming whichever reading made the test pass.",
    ],
    results: [
      { value: 100, suffix: "%", label: "of results rechecked from raw data" },
      { value: 5, label: "systems checked behind one number" },
      { value: 0, label: "filters shipped untested" },
    ],
  },
  {
    num: "04",
    slug: "ongc-intranet",
    title: "INTERNAL PORTAL & REPORTING AUTOMATION",
    outcome:
      "Rebuilt how 500+ people at ONGC Videsh found documents and received their weekly numbers, and took the manual assembly of those numbers out of the loop entirely.",
    category: "AUTOMATION",
    tags: ["Python", "Pandas", "openpyxl", "Power Query", "Advanced Excel", "Internal Tools"],
    role: "Engineering Intern, ONGC Videsh",
    year: "2025",
    status: "Shipped",
    tone: "grape",
    context: [
      "An intranet portal that more than 500 people depended on to find documents and circulars, and which had grown by accretion until finding anything meant knowing in advance where it had been filed. People asked colleagues instead of searching, which is the clearest possible signal that a tool has stopped working.",
      "Running alongside it was a recurring reporting cycle assembled by hand every week: pull the same extracts, paste them into the same workbook, reconcile them against last week, format, send. It cost a full working day a week and the errors it produced were the quiet kind, a mistyped figure that nobody catches until a decision has already been made on it.",
      "Both problems had the same root. Work that was perfectly well understood had never been written down as a process, so it lived in whoever happened to be doing it that week.",
    ],
    approach: [
      "Watched the actual weekly routine end to end before changing anything, because the version people describe and the version they perform are rarely the same document.",
      "Rewrote the assembly step in Python with Pandas and openpyxl so the extracts are read, joined and written into the finished workbook without a human copying a single cell.",
      "Moved the transformations that genuinely belonged in Excel into Power Query, so the people who own the report can still open it, see what it does and change it without asking an engineer.",
      "Added reconciliation against the previous period so a figure that moves unexpectedly is flagged while the report is being built, not after it has been read.",
      "Reorganised the portal around how people actually look for documents rather than the department that filed them, and made search reach the content instead of only the titles.",
      "Wrote the runbook alongside the code, since an internship ends and an automation nobody can rerun is just a slower version of the original problem.",
    ],
    results: [
      { value: 500, suffix: "+", label: "people using it every day" },
      { value: 10, suffix: "+", label: "hours of manual work saved weekly" },
      { value: 0, label: "typing errors after rollout" },
      { value: 1, label: "command to rebuild the whole report" },
    ],
  },
  {
    num: "05",
    slug: "aurora-cafe",
    title: "AURORA CAFÉ",
    outcome: "Bookings handled on-site instead of over DM.",
    category: "WEB DEVELOPMENT",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Sanity CMS", "Vercel"],
    links: [{ label: "auroracafe.in", href: "#" }],
    tone: "sunny",
    role: "Freelance: design, build, launch",
    year: "2025",
    status: "Demo build",
    context: [
      "A caf\u00e9 site where the menu, the table booking and the Instagram feed all live in one place.",
      "Before, bookings and menu questions all came in over Instagram DMs.",
    ],
    approach: [
      "Menu managed in Sanity so staff can edit prices themselves.",
      "Table booking form wired to email.",
      "Instagram feed embedded on the home page.",
      "Light motion with Framer Motion, deployed on Vercel.",
    ],
    results: [
      { value: 1, label: "place for menu, booking and feed" },
      { value: 95, suffix: "+", label: "Google performance score" },
      { value: 0, label: "bookings lost in Instagram DMs" },
    ],
  },
  {
    num: "06",
    slug: "lumen-studio",
    title: "LUMEN STUDIO",
    outcome: "Lighthouse 98 with 60+ full-res images.",
    category: "WEB DEVELOPMENT",
    tags: ["React", "Vite", "GSAP", "Lenis", "Cloudinary"],
    links: [{ label: "lumenstudio.co", href: "#" }],
    tone: "grape",
    role: "Freelance: design, build, launch",
    year: "2025",
    status: "Demo build",
    context: [
      "A photographer's portfolio with a full-bleed gallery and a page-transition that doesn't flicker.",
      "Heavy images made the old site slow and jumpy.",
    ],
    approach: [
      "Images served responsively through Cloudinary.",
      "GSAP page transitions with Lenis smooth scroll.",
      "Full-bleed gallery and case-study layouts.",
      "Built with React and Vite for a tiny bundle.",
    ],
    results: [
      { value: 98, label: "Google speed score" },
      { value: 60, suffix: "+", label: "full-res images, still fast" },
      { value: 0, label: "flicker between pages" },
    ],
  },
  {
    num: "07",
    slug: "fittrack",
    title: "FITTRACK",
    outcome: "Trainers stopped tracking attendance in a notebook.",
    category: "WEB DEVELOPMENT",
    tags: ["Next.js", "Supabase", "Recharts", "Tailwind", "Auth"],
    links: [{ label: "fittrack.app", href: "#" }],
    tone: "mint",
    role: "Freelance: design, build, launch",
    year: "2025",
    status: "Demo build",
    context: [
      "A gym landing page plus a members dashboard showing attendance and progress charts.",
      "Trainers were logging attendance by hand in a notebook.",
    ],
    approach: [
      "Landing page built to drive trial sign-ups.",
      "Supabase database and auth for members and trainers.",
      "Recharts attendance and progress charts.",
      "Role-based views for trainers and members.",
    ],
    results: [
      { value: 2, label: "apps in one: site + dashboard" },
      { value: 0, label: "paper registers needed" },
      { value: 100, suffix: "%", label: "usable on a phone" },
    ],
  },
  {
    num: "08",
    slug: "kirana-kart",
    title: "KIRANA KART",
    outcome: "Zero payment-gateway setup, orders still land on a phone.",
    category: "WEB DEVELOPMENT",
    tags: ["React", "Zustand", "Tailwind", "WhatsApp API", "Netlify"],
    links: [{ label: "kiranakart.shop", href: "#" }],
    tone: "coral",
    role: "Freelance: design, build, launch",
    year: "2025",
    status: "Demo build",
    context: [
      "A storefront for a neighbourhood shop that turns a cart into a pre-filled WhatsApp order.",
      "The shop owner didn't want a payment gateway \u2014 just orders on their phone.",
    ],
    approach: [
      "Product catalogue with a Zustand-powered cart.",
      "Checkout builds a pre-filled WhatsApp message.",
      "Tailwind layout tuned for cheap phones.",
      "Deployed on Netlify.",
    ],
    results: [
      { value: 0, label: "payment gateway to set up" },
      { value: 1, label: "tap to send an order" },
      { value: 100, suffix: "%", label: "of orders arrive on WhatsApp" },
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function neighbours(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0) return { prev: undefined, next: undefined };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

export const isFreelance = (slug: string) => getProject(slug)?.category === "WEB DEVELOPMENT";
export const FREELANCE = PROJECTS.filter((p) => p.category === "WEB DEVELOPMENT");

/* ---------- tracks ---------- */
export type Track = "data" | "web";
export const trackOf = (p: Project): Track => (p.category === "WEB DEVELOPMENT" ? "web" : "data");

export type WebType = "BUSINESS SITE" | "LANDING PAGE" | "PORTFOLIO" | "DASHBOARD";
export const DATA_FILTERS = [
  "ALL",
  "PRODUCT",
  "DATA ENGINEERING",
  "MACHINE LEARNING",
  "ANALYTICS",
  "AUTOMATION",
] as const;
export const WEB_FILTERS = [
  "ALL",
  "PRODUCT",
  "BUSINESS SITE",
  "LANDING PAGE",
  "PORTFOLIO",
  "DASHBOARD",
] as const;

export type WebDetail = {
  type: WebType;
  timeline: string;
  brief: string;
  built: string[];
  problem: { title: string; body: string };
  site?: string;
  code?: string;
};

export const WEB_DETAILS: Record<string, WebDetail> = {
  "aurora-cafe": {
    type: "BUSINESS SITE",
    timeline: "2 weeks",
    brief:
      "Aurora is a small neighbourhood café that ran everything through Instagram. They needed one place where people could see the menu, book a table and catch the latest posts, without the owner answering the same DM forty times a day.",
    built: [
      "Five pages: home, menu, about, gallery and bookings.",
      "Menu and prices editable by staff in Sanity CMS, so no developer is needed.",
      "Table-booking form with date, time and party size, validated in the browser.",
      "Live Instagram feed embedded on the home page.",
      "Gentle Framer Motion reveals, deployed on Vercel with preview links for every change.",
    ],
    problem: {
      title: "Keeping the booking form usable without a backend",
      body: "The café didn't want a database or a monthly bill. So the form validates everything on the device, then hands the booking to a form-to-email service. The owner gets a tidy email, the guest gets a confirmation, and nothing breaks if the service is slow because the form tells you exactly what happened.",
    },
  },
  "lumen-studio": {
    type: "PORTFOLIO",
    timeline: "3 weeks",
    brief:
      "Lumen is a photographer whose old site took ages to load and jumped around as images arrived. The work is the whole point, so the new site had to show 60+ full-resolution images and still feel instant.",
    built: [
      "Full-bleed gallery plus individual case-study pages per shoot.",
      "GSAP page transitions with Lenis smooth scroll, so there is no flicker between pages.",
      "Every image served through Cloudinary in the right size for the screen.",
      "Contact and booking enquiry page.",
      "React + Vite build with a tiny bundle so the text and layout land first.",
    ],
    problem: {
      title: "60+ full-res images at Lighthouse 98",
      body: "Each image gets responsive sizes from Cloudinary, a fixed aspect ratio so the page never jumps, lazy loading below the fold and async decoding so scrolling stays smooth. The first image is preloaded; everything else waits its turn.",
    },
  },
  fittrack: {
    type: "DASHBOARD",
    timeline: "3 weeks",
    brief:
      "A local gym wanted more trial sign-ups and a way out of the attendance notebook. Trainers needed to log sessions quickly; members wanted to see their own progress.",
    built: [
      "Landing page built around one goal: booking a free trial.",
      "Member and trainer sign-in with Supabase Auth.",
      "Trainer screen to mark attendance in a couple of taps.",
      "Recharts attendance and progress charts for each member.",
      "Separate views for trainers and members from the same app.",
    ],
    problem: {
      title: "Members only see their own data",
      body: "Instead of trusting the app to filter rows, the database itself enforces it: row-level security rules in Supabase mean a member's request can only ever return their own sessions, while trainers can see the members assigned to them.",
    },
  },
  "kirana-kart": {
    type: "BUSINESS SITE",
    timeline: "1 week",
    brief:
      "A neighbourhood grocery shop wanted to take orders online but didn't want a payment gateway, fees or a dashboard to learn. Orders just needed to arrive on the owner's phone.",
    built: [
      "Product catalogue with categories and search.",
      "Cart that survives a refresh, powered by Zustand.",
      "Checkout that turns the cart into a pre-filled WhatsApp message.",
      "Layout tuned for cheap phones and slow connections.",
      "Deployed on Netlify with zero running cost.",
    ],
    problem: {
      title: "A whole cart inside a WhatsApp link",
      body: "At checkout the cart is formatted into a readable order (items, quantities, totals and address) then encoded into a wa.me link. One tap opens WhatsApp with the message ready to send, so the shop gets a clean order without any server in the middle.",
    },
  },
};

export function trackNeighbours(slug: string) {
  const p = getProject(slug);
  if (!p) return { prev: undefined, next: undefined };
  const list = PROJECTS.filter((x) => trackOf(x) === trackOf(p));
  const i = list.findIndex((x) => x.slug === slug);
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

/** Projects shown in a track. Products appear in both (last in web). */
export function projectsInTrack(t: Track) {
  if (t === "data") return PROJECTS.filter((p) => trackOf(p) === "data");
  return [...PROJECTS.filter((p) => trackOf(p) === "web"), ...PROJECTS.filter((p) => p.product)];
}
