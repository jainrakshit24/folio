/**
 * Rakshit Jain · Portfolio
 * Copyright (c) 2026 Rakshit Jain.
 * https://github.com/jainrakshit24
 */
type ErrorSink = (payload: {
  message: string;
  stack?: string;
  route?: string;
  context?: Record<string, unknown>;
}) => void;

declare global {
  interface Window {
    /**
     * Optional hook for an error-reporting service. Nothing defines this today;
     * assign it from an analytics snippet (or swap the body of reportError for a
     * real SDK call) when you want crashes sent somewhere.
     */
    __reportError?: ErrorSink;
  }
}

/** Loaders and server fns commonly throw a raw Response; String(it) is the
 *  opaque "[object Response]", so pull out the status and URL instead. */
function describe(error: unknown): { message: string; stack?: string } {
  if (error instanceof Response) {
    return { message: `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` };
  }
  if (error instanceof Error) {
    return { message: error.message, ...(error.stack !== undefined && { stack: error.stack }) };
  }
  return { message: String(error) };
}

/**
 * Called from the root error boundary. Prod React does not rethrow
 * boundary-caught errors to window.onerror, so without this the only trace of a
 * crash is the raw console.error in the boundary itself.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const { message, stack } = describe(error);
  const route = window.location.pathname;

  console.error("[error-boundary]", { message, route, ...context });

  window.__reportError?.({
    message,
    ...(stack !== undefined && { stack }),
    route,
    context,
  });
}
