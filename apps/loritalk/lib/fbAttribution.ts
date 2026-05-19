"use client";

/**
 * Facebook ad attribution capture for the landing page.
 *
 * Reads the visitor's `_fbp` / `_fbc` cookies set by the Pixel SDK
 * (plus the `fbclid` URL parameter as a fallback), generates a stable
 * `event_id`, forwards the bundle to the backend via POST
 * `/attribution`, and persists the `event_id` in a cross-domain cookie
 * so the dashboard (`app.lori-talk.eu`) can later associate it with
 * the authenticated user after signup/login.
 *
 * The cross-domain cookie reuses the same `Domain=.lori-talk.eu`
 * pattern as `planIntent.ts`. In local dev the host check falls
 * through and the cookie is host-only — acceptable for testing.
 */

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

/** Cookie name read by the dashboard after signup to call /attribution/associate. */
export const FB_EVENT_ID_COOKIE = "lt_fb_event_id";

/** 30 days — matches Meta's typical `_fbc` cookie lifespan. */
const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30;

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const escaped = name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + escaped + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCrossDomainCookie(name: string, value: string, ttlSeconds: number): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  const isLoriTalkProd =
    host === "lori-talk.eu" || host.endsWith(".lori-talk.eu");
  const domainAttr = isLoriTalkProd ? "; Domain=.lori-talk.eu" : "";
  const secureAttr = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${name}=${encodeURIComponent(value)}` +
    `; Max-Age=${ttlSeconds}` +
    `; Path=/` +
    `; SameSite=Lax` +
    domainAttr +
    secureAttr;
}

/**
 * Ensures `_fbc` cookie exists when the URL carries `?fbclid=`. The
 * Pixel SDK normally writes it on init, but a user who lands before
 * the script loads (or with marketing-consent off, then on) may have
 * the cookie missing. Construct it deterministically following Meta's
 * `fb.<subdomain-index>.<unix-ms>.<fbclid>` format.
 */
export function captureFbclidIfPresent(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const fbclid = url.searchParams.get("fbclid");
  if (!fbclid) return;
  if (readCookie("_fbc")) return;
  setCrossDomainCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`, COOKIE_TTL_SECONDS);
}

function genUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for ancient browsers — UUIDv4-shaped, not RFC-compliant.
  const rnd = (n: number) =>
    Array.from({ length: n }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("");
  return `${rnd(8)}-${rnd(4)}-4${rnd(3)}-8${rnd(3)}-${rnd(12)}`;
}

interface AttributionPayload {
  eventId: string;
  fbp: string | null;
  fbc: string | null;
  fbclid: string | null;
}

/**
 * Capture FB identifiers from cookies + URL and POST them to the
 * backend `/attribution` endpoint. Fire-and-forget by design — the
 * caller can redirect immediately; the `keepalive` flag lets the
 * request survive the navigation.
 *
 * Returns the `event_id` so the caller can append it to the redirect
 * URL (or rely on the cross-domain cookie set inside).
 *
 * Returns `null` when:
 *   - SSR (no `window`);
 *   - `NEXT_PUBLIC_BACKEND_URL` is unset;
 *   - no FB signal is present (no `_fbp`, no `_fbc`, no `fbclid`).
 */
export async function captureAndForwardAttribution(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  if (!BACKEND) return null;

  captureFbclidIfPresent();

  const fbp = readCookie("_fbp");
  const fbc = readCookie("_fbc");
  const fbclid = new URL(window.location.href).searchParams.get("fbclid");

  if (!fbp && !fbc && !fbclid) return null;

  // Reuse the same event_id across CTAs in the same session — a user
  // clicking Hero CTA then Pricing CTA still maps to one conversion
  // attempt.
  let eventId = readCookie(FB_EVENT_ID_COOKIE);
  if (!eventId) {
    eventId = genUuid();
    setCrossDomainCookie(FB_EVENT_ID_COOKIE, eventId, COOKIE_TTL_SECONDS);
  }

  const payload: AttributionPayload = { eventId, fbp, fbc, fbclid };
  try {
    await fetch(`${BACKEND}/attribution`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Survive page navigation when the caller redirects immediately
      // after this call returns / before it resolves.
      keepalive: true,
    });
  } catch {
    // Fire-and-forget — never block the user's CTA redirect on an
    // attribution capture failure (back down / CORS / network).
  }
  return eventId;
}

/**
 * Wires `onClick` on a CTA anchor: captures attribution first, then
 * lets the navigation proceed. Returns a memoizable handler.
 *
 * Usage:
 * ```tsx
 * <a href="https://app.lori-talk.eu/register" onClick={onCtaClick(extraWork)}>...</a>
 * ```
 *
 * Where `extraWork` is an optional sync side-effect (e.g.
 * `savePlanIntent('plus','yearly')`) that should run pre-navigation.
 */
export function onCtaClick(
  extraWork?: () => void,
): (e: React.MouseEvent<HTMLAnchorElement>) => void {
  return (e) => {
    // Respect modifier-clicks (open-in-new-tab, etc.) — let the
    // browser handle them natively; we still fire-and-forget the
    // attribution capture in parallel.
    extraWork?.();
    void captureAndForwardAttribution();
    // Do NOT preventDefault — the link still navigates. The capture
    // is fired in parallel with `keepalive: true` so the POST
    // survives the navigation.
  };
}
