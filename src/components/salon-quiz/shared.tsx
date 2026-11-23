"use client";

/** Pieces the salon quiz screens share: the usage counter, the wordmark,
 * and pictures that are fetched ahead of time and fade in. */
import { useEffect, useRef, useState } from "react";

const VISITOR_ID_KEY = "varaaai_visitor_id";

export const GOLD = "bg-gradient-to-r from-[#f1e2bd] via-[#dcc081] to-[#b08a3e]";

export const fill = (s: string, n: number | string) => s.replace("{n}", String(n));

export type QuizEvent = "open" | "start" | "halfway" | "finish" | "cta_click" | "audio";

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

/** Counts a quiz step: our own counter, plus Google and Meta when their tags are on the page. */
export function trackQuiz(event: QuizEvent) {
  try {
    const body = JSON.stringify({ tool: "salon_quiz", event, visitorId: visitorId() });
    if (!navigator.sendBeacon?.("/api/tools/events", new Blob([body], { type: "application/json" })))
      fetch("/api/tools/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
    const w = window as unknown as { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
    w.gtag?.("event", `salon_quiz_${event}`);
    const pixel = { start: "SalonQuizStart", finish: "SalonQuizFinish", cta_click: "SalonQuizSignupClick" }[event as string];
    if (pixel) w.fbq?.("trackCustom", pixel);
  } catch {
    // Counting must never break the quiz.
  }
}

export function Wordmark() {
  return (
    <span className="text-lg font-extrabold tracking-tight text-white">
      Varaa<span className="text-[#e8d3a6]">Ai</span>
    </span>
  );
}

export const photoUrl = (name: string) => `/quiz/${name}.webp`;

// Pictures fetched ahead of the screen that shows them. The objects are kept
// for the life of the page: while one is alive the browser paints the same
// picture again at once, without asking the server whether it has changed.
const kept = new Map<string, HTMLImageElement>();

export function preloadPhotos(names: readonly string[]) {
  for (const name of names) {
    if (kept.has(name)) continue;
    const img = new Image();
    img.decoding = "async";
    img.src = photoUrl(name);
    kept.set(name, img);
  }
}

/** A picture from public/quiz that fades in once it has arrived, so a slow
 * connection shows the plum backdrop behind it rather than a broken box.
 * `priority` is for the picture of the first screen: it is in the page's
 * HTML and must show before any script has run, so it does not wait to fade. */
export function Photo({ name, className = "", priority }: { name: string; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Already there (fetched ahead, or loaded before React took over the page).
    if (ref.current?.complete && ref.current.naturalWidth > 0) setReady(true);
  }, [name]);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={photoUrl(name)}
      alt=""
      fetchPriority={priority ? "high" : undefined}
      onLoad={() => setReady(true)}
      className={priority ? className : `${className} transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
