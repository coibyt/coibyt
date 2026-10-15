"use client";

import { useEffect } from "react";

const VISITOR_ID_KEY = "varaaai_visitor_id";
const PING_INTERVAL_MS = 60_000;

function getOrCreateVisitorId(): string {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    // Private browsing or storage disabled — a fresh id every reload still
    // counts this visit, it just won't be recognized as the same visitor
    // across page loads.
    return crypto.randomUUID();
  }
}

function ping(visitorId: string) {
  if (document.visibilityState !== "visible") return;
  fetch("/api/site-visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
    keepalive: true,
  }).catch(() => {});
}

/** Pings the server every minute while the tab is open and visible, so the
 * admin dashboard can show "visitors today" and "online right now" — purely
 * anonymous traffic counting (see SiteVisit), no accounts or PII involved. */
export function SiteVisitTracker() {
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    ping(visitorId);
    const interval = setInterval(() => ping(visitorId), PING_INTERVAL_MS);
    function onVisibilityChange() {
      if (document.visibilityState === "visible") ping(visitorId);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return null;
}
