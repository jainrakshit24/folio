/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Writes public/sitemap.xml from the real route list, so adding a project to
 * src/lib/projects.ts cannot leave the sitemap behind. Run by `bun run build`.
 */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { PROJECTS } from "../src/lib/projects";

const SITE_URL = (process.env["VITE_SITE_URL"] || "https://jainrakshit.tech").replace(/\/+$/, "");

/** Static pages, in the order a visitor would reasonably meet them. */
const STATIC_PATHS = [
  "/",
  "/about",
  "/work",
  "/services",
  "/skills",
  "/experience",
  "/education",
  "/contact",
  "/playground",
];

/** Route files back each path; their last commit is an honest lastmod. */
const SOURCE_FOR: Record<string, string> = {
  "/": "src/routes/index.tsx",
  "/about": "src/routes/about.tsx",
  "/work": "src/routes/work.index.tsx",
  "/services": "src/routes/services.tsx",
  "/skills": "src/routes/skills.tsx",
  "/experience": "src/routes/experience.tsx",
  "/education": "src/routes/education.tsx",
  "/contact": "src/routes/contact.tsx",
  "/playground": "src/routes/playground.tsx",
};

/**
 * Google only trusts lastmod when it is consistently accurate, so it comes
 * from git rather than the build clock. No git, no lastmod.
 */
function lastModified(file: string): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out ? out.slice(0, 10) : undefined;
  } catch {
    return undefined;
  }
}

const entries = [
  ...STATIC_PATHS.map((path) => ({ path, lastmod: lastModified(SOURCE_FOR[path] ?? "") })),
  ...PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    lastmod: lastModified("src/lib/projects.ts"),
  })),
];

const body = entries
  .map(({ path, lastmod }) => {
    const loc = `  <url>\n    <loc>${SITE_URL}${path}</loc>`;
    return lastmod ? `${loc}\n    <lastmod>${lastmod}</lastmod>\n  </url>` : `${loc}\n  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml, "utf-8");
console.log(`sitemap.xml: ${entries.length} urls -> ${SITE_URL}`);
