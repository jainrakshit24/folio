/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * AdSense placement. Nothing here loads, renders or reserves space until
 * VITE_ADSENSE_CLIENT is set, so the blog runs ad-free until the account is
 * approved and the id is added in Netlify - same pattern as GoatCounter.
 *
 * The reserved height matters: an ad that arrives into un-reserved space
 * pushes the article down, which is a layout shift, which is a Core Web
 * Vitals penalty on exactly the pages meant to rank.
 */
import { useEffect, useRef } from "react";

export const ADSENSE_CLIENT = (import.meta.env["VITE_ADSENSE_CLIENT"] as string | undefined) ?? "";

/** Head entries for the AdSense loader, empty when no publisher id is configured. */
export function adsenseScripts() {
  if (!ADSENSE_CLIENT) return [];
  return [
    {
      async: true,
      crossOrigin: "anonymous" as const,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
    },
  ];
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  /** Ad unit id from AdSense. Without one the slot stays a reserved box. */
  slot?: string;
  /** Reserved height in px. Must match the unit's real height closely. */
  height?: number;
  label?: string;
};

export function AdSlot({ slot, height = 280, label = "Advertisement" }: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // A blocked or failed ad must never take the article down with it.
    }
  }, [slot]);

  // No publisher id, or no unit id, means no ad can ever fill this box - so
  // reserve nothing rather than leaving a permanent blank 280px gap.
  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <aside
      className="toy-card my-10 bg-sand/35 px-4 py-4"
      style={{ minHeight: height }}
      aria-label={label}
    >
      <span className="num mb-2 block text-[10px] uppercase tracking-[0.2em] text-ink/45">
        {label}
      </span>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: height - 28 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
