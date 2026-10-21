/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 *
 * GoatCounter: no cookies, no consent banner, and a public counter endpoint so
 * the footer can show a real number without a backend of our own.
 */
import { useEffect, useRef, useState } from "react";

/**
 * The GoatCounter site code, i.e. the MYCODE in MYCODE.goatcounter.com. It is
 * public either way, since it ships in the script tag on every page, so it
 * lives here rather than in an env var. VITE_GOATCOUNTER_CODE still overrides
 * it, and setting it to an unused code is how a fork opts out.
 */
export const GOATCOUNTER_CODE = import.meta.env["VITE_GOATCOUNTER_CODE"] || "jainrakshit";

export const GOATCOUNTER_ORIGIN = GOATCOUNTER_CODE
  ? `https://${GOATCOUNTER_CODE}.goatcounter.com`
  : "";

/**
 * Counts below this are hidden. Set to 0 deliberately: the badge shows from the
 * very first view, including "0 page views", rather than appearing out of
 * nowhere once some threshold is crossed. Raise it to go quiet until the
 * number is bigger.
 */
export const COUNTER_MIN_TO_SHOW = 0;

type GoatCounter = { count: (opts: { path: string; title?: string }) => void };

declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

/**
 * The GoatCounter script counts the first page load on its own. Everything
 * after that is a client-side route change it cannot see, so each navigation
 * is reported manually or the whole site looks like one page view per visit.
 */
export function usePageViewTracking(pathname: string) {
  const firstRender = useRef(true);

  useEffect(() => {
    if (!GOATCOUNTER_CODE) return;
    // Skip the initial render: the script already counted that load.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.goatcounter?.count({ path: pathname, title: document.title });
  }, [pathname]);
}

type CounterState = { count: number; display: string } | null;

/**
 * Reads the public counter endpoint. Returns null while loading, on failure,
 * or when the count is too low to be worth showing, and the caller renders
 * nothing in that case. Fetching happens in an effect rather than during SSR
 * so the server and the first client render agree.
 */
export function useVisitorCount(): CounterState {
  const [state, setState] = useState<CounterState>(null);

  useEffect(() => {
    if (!GOATCOUNTER_ORIGIN) return;
    const abort = new AbortController();

    fetch(`${GOATCOUNTER_ORIGIN}/counter/TOTAL.json`, { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      // `count` is page views and `count_unique` is visitors; both arrive as
      // display strings with thousands separators already applied.
      .then((data: { count?: string; count_unique?: string }) => {
        const display = data.count ?? "";
        const numeric = Number(display.replace(/[^0-9]/g, ""));
        if (!display || !Number.isFinite(numeric) || numeric < COUNTER_MIN_TO_SHOW) return;
        setState({ count: numeric, display });
      })
      // A counter is decoration. If it fails, the footer carries on without it.
      .catch(() => {});

    return () => abort.abort();
  }, []);

  return state;
}
