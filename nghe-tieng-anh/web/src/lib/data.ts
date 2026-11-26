import type { Cue, DayData, IndexData } from "./types";

/** Where day folders live. Same origin by default; set VITE_MEDIA_BASE to serve MP3s from elsewhere. */
const DATA_BASE = "./days/";
const MEDIA_BASE: string = (import.meta.env.VITE_MEDIA_BASE as string | undefined) || DATA_BASE;

export const dayUrl = (date: string, file: string) => `${DATA_BASE}${date}/${file}`;
export const audioUrl = (day: DayData) => new URL(`${MEDIA_BASE}${day.date}/${day.audio.src}`, location.href).href;
export const coverUrl = (date: string, cover: string | null | undefined) =>
  cover ? new URL(dayUrl(date, cover), location.href).href : new URL("./brand/emblem.jpg", location.href).href;

let indexPromise: Promise<IndexData> | null = null;
const dayCache = new Map<string, Promise<DayData>>();

async function getJson<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache: "no-cache" });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json() as Promise<T>;
}

export function loadIndex(): Promise<IndexData> {
  indexPromise ??= getJson<IndexData>(`${DATA_BASE}index.json`).catch((e) => {
    indexPromise = null;
    throw e;
  });
  return indexPromise;
}

export function loadDay(date: string): Promise<DayData> {
  let p = dayCache.get(date);
  if (!p) {
    p = getJson<DayData>(dayUrl(date, "day.json"));
    p.catch(() => dayCache.delete(date));
    dayCache.set(date, p);
  }
  return p;
}

/** Text to show for a cue (most cues refer to content by id instead of repeating the text). */
export function cueText(day: DayData, c: Cue): { main: string; sub?: string; speaker?: string } {
  if (c.t) return { main: c.t, sub: c.v };
  const r = c.r ?? "";
  const ph = day.phrases.find((p) => p.id === r);
  if (ph) return c.l === "en" ? { main: ph.en, sub: ph.vi } : { main: ph.vi, sub: ph.en };
  const ex = r.match(/^(p\d+)\.x(\d+)$/);
  if (ex) {
    const e = day.phrases.find((p) => p.id === ex[1])?.examples[+ex[2]];
    if (e) return c.l === "en" ? { main: e.en, sub: e.vi } : { main: e.vi, sub: e.en };
  }
  const [blk, idx] = r.split(".");
  const dl = day.dialogues.find((d) => d.id === blk);
  if (dl) {
    const ln = dl.lines[+idx];
    if (ln) {
      const speaker = dl.speakers[ln.s]?.name;
      return c.l === "en" ? { main: ln.en, sub: ln.vi, speaker } : { main: ln.vi, sub: ln.en, speaker };
    }
  }
  const ls = day.listening.find((l) => l.id === blk);
  if (ls) {
    const pa = ls.paragraphs[+idx];
    if (pa) return { main: pa.en, sub: pa.vi, speaker: ls.speakers[pa.s]?.name };
  }
  return { main: "" };
}

/** Binary search: the cue playing at time t (or the last one before it). */
export function cueAt(cues: Cue[], t: number): number {
  let lo = 0, hi = cues.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (cues[mid].s <= t) { ans = mid; lo = mid + 1; } else hi = mid - 1;
  }
  return ans;
}
