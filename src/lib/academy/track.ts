/** Academy learning statistics, browser side (admin › Học viện): a random id
 * kept in localStorage, and small pings to /api/academy/track. Never blocks
 * or breaks the page: every failure is swallowed. */

const KEY = "varaaai.academy.vid";

export type TrackEvent =
  | { e: "visit"; tab?: string; src?: string }
  | { e: "open"; slug: string }
  | { e: "watch"; slug: string; sec: number; pos: number }
  | { e: "done"; slug: string }
  | { e: "quiz"; slug: string; right: number; of: number };

function visitorId(): string | null {
  try {
    let v = localStorage.getItem(KEY);
    if (!v || !/^[a-z0-9]{12,40}$/i.test(v)) {
      const raw = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      v = raw.replace(/[^a-z0-9]/gi, "").slice(0, 32);
      localStorage.setItem(KEY, v);
    }
    return v;
  } catch {
    return null;
  }
}

export function track(event: TrackEvent) {
  const v = visitorId();
  if (!v) return;
  try {
    const body = JSON.stringify({ v, loc: document.documentElement.lang || undefined, ...event });
    // Pings sent while the page is closing go out as a beacon.
    if (document.visibilityState === "hidden" && typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/academy/track", new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch("/api/academy/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
  } catch {
    // Statistics are optional.
  }
}

/** Where the visitor came from: ?utm_source=…, else the referring site. */
export function visitSource(): string | undefined {
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    if (utm) return utm.slice(0, 120);
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host && host !== window.location.hostname) return host.slice(0, 120);
    }
  } catch {
    // ignore
  }
  return undefined;
}
