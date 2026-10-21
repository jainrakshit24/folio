/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
import { PROJECTS, type Project } from "./projects";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./seo";

const PERSON_ID = `${SITE_URL}/#rakshit`;
const SITE_ID = `${SITE_URL}/#website`;

/** The one Person node every other node points at, so crawlers merge them. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Rakshit Jain",
    url: SITE_URL,
    image: absoluteUrl("/og-image.png"),
    jobTitle: ["Data Engineer", "Freelance Web Developer"],
    description:
      "Data Engineer and freelance web developer in Delhi NCR. ETL pipelines, dashboards and fast animated websites.",
    email: "mailto:itsrakshitjain@gmail.com",
    telephone: "+91-72067-53199",
    address: { "@type": "PostalAddress", addressLocality: "Delhi NCR", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: "Careers360" },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "B.Tech, Computer Science & Engineering (Data Science)",
    },
    sameAs: ["https://linkedin.com/in/jainrakshit24", "https://github.com/jainrakshit24"],
    knowsAbout: [
      "Data engineering",
      "ETL pipelines",
      "SQL",
      "Python",
      "Data analytics",
      "Power BI",
      "Machine learning",
      "Data quality",
      "Web development",
      "React",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: `${SITE_NAME}, Data Engineer & Freelance Web Developer`,
    inLanguage: "en-IN",
    publisher: { "@id": PERSON_ID },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Freelance Web Development",
    serviceType: "Web development",
    url: absoluteUrl("/services"),
    description:
      "Fast, responsive, animated websites, landing pages and dashboards for businesses and creators.",
    provider: { "@id": PERSON_ID },
    areaServed: [
      { "@type": "Place", name: "Delhi NCR, India" },
      { "@type": "Place", name: "Remote" },
    ],
  };
}

/** Gives the /work listing an explicit, ordered set of case-study URLs. */
export function workListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Work by Rakshit Jain",
    url: absoluteUrl("/work"),
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/work/${p.slug}`),
      name: p.title,
    })),
  };
}

/** Placeholder hrefs are "#" in the project data; never emit those as URLs. */
const realLinks = (p: Project) =>
  (p.links ?? []).map((l) => l.href).filter((h) => h.startsWith("https://"));

export function caseStudySchema(p: Project) {
  const repo = realLinks(p).find((h) => h.includes("github.com"));
  const url = absoluteUrl(`/work/${p.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": repo ? "SoftwareSourceCode" : "CreativeWork",
    name: p.title,
    headline: p.title,
    url,
    description: p.outcome,
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en-IN",
    keywords: p.tags.join(", "),
    about: p.category,
    ...(repo ? { codeRepository: repo, programmingLanguage: p.tags } : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
