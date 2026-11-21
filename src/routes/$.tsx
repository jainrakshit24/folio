/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * Catch-all for URLs that match no route. The loader throws notFound() so the
 * server replies 404 rather than 200 with a "not found" page, which is what a
 * crawler needs to drop the URL instead of indexing it.
 */
import { createFileRoute, notFound } from "@tanstack/react-router";
import { NotFound } from "@/components/site/NotFound";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/$")({
  loader: () => {
    throw notFound();
  },
  head: () =>
    seo({
      path: "/404",
      title: "404: Query Returned 0 Rows | Rakshit Jain",
      description: "That page doesn't exist on Rakshit Jain's portfolio.",
      ogTitle: "404: Query Returned 0 Rows",
      noindex: true,
    }),
  component: NotFound,
});
