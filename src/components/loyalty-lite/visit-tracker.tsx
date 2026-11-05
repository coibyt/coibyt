"use client";

import { useEffect } from "react";

const VISITOR_ID_KEY = "varaaai_visitor_id";

/** The browser's anonymous id, the same one SiteVisitTracker uses. */
function visitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return null;
  }
}

/** Counts a /loyalty-lite event for the admin's stats (src/app/[locale]/admin/loyalty-lite). */
export function trackLite(event: "open" | "popup_close") {
  try {
    const body = JSON.stringify({ tool: "loyalty_lite", event, visitorId: visitorId() });
    if (!navigator.sendBeacon?.("/api/tools/events", new Blob([body], { type: "application/json" })))
      void fetch("/api/tools/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {
    // Counting must never break the page.
  }
}

/** One page view of /loyalty-lite per load. */
export function LiteVisitTracker() {
  useEffect(() => trackLite("open"), []);
  return null;
}
