/** Everything personal lives in this browser (localStorage), wrapped so a blocked storage never breaks the page. */
import { useSyncExternalStore } from "react";

const PREFIX = "nghe.";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}
function readRaw<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* private mode / quota: ignore */
  }
}

/* ------------------------------------------------------------ settings */
export interface Settings {
  goalMinutes: number;
  speed: number;
  showVi: boolean;
  sleepDefault: number; // minutes, 0 = off
  level: string;
  topics: string[];
  dailyLength: "2h" | "1h30" | "1h";
  voiceVariety: "rotate" | "fixed";
}
export const defaultSettings: Settings = {
  goalMinutes: 60,
  speed: 1,
  showVi: true,
  sleepDefault: 0,
  level: "A2-B1",
  topics: ["work", "daily", "travel"],
  dailyLength: "2h",
  voiceVariety: "rotate",
};

type Listener = () => void;
function createStore<T>(key: string, initial: T, merge = true) {
  let state: T = merge ? read(key, initial) : readRaw(key, initial);
  const listeners = new Set<Listener>();
  return {
    get: () => state,
    set(next: T | ((s: T) => T)) {
      state = typeof next === "function" ? (next as (s: T) => T)(state) : next;
      write(key, state);
      listeners.forEach((l) => l());
    },
    subscribe(l: Listener) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

export const settingsStore = createStore<Settings>("settings", defaultSettings);
export const useSettings = () => useSyncExternalStore(settingsStore.subscribe, settingsStore.get);

/* --------------------------------------------- listening time & resume */
/** seconds listened per calendar day (local date) and resume positions per lesson */
export interface Progress {
  listened: Record<string, number>; // "2026-11-27" (calendar day) -> seconds
  lessonHeard: Record<string, number>; // lesson date -> seconds heard of that lesson
  positions: Record<string, number>; // lesson date -> last position (s)
  lastLesson?: string;
}
export const progressStore = createStore<Progress>("progress", { listened: {}, lessonHeard: {}, positions: {} });
export const useProgress = () => useSyncExternalStore(progressStore.subscribe, progressStore.get);

export const todayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function streak(listened: Record<string, number>, minSeconds: number): number {
  let n = 0;
  const d = new Date();
  if ((listened[todayKey(d)] ?? 0) < minSeconds) d.setDate(d.getDate() - 1); // today not done yet: count from yesterday
  while ((listened[todayKey(d)] ?? 0) >= minSeconds) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

/* ----------------------------------------------------------- local SRS */
export interface CardState { stage: number; due: string; lapses: number; seen: number }
export interface Tap { en: string; date: string; knew: boolean }
export interface SrsState { cards: Record<string, CardState>; taps: Tap[] }
export const srsStore = createStore<SrsState>("srs", { cards: {}, taps: [] });
export const useSrs = () => useSyncExternalStore(srsStore.subscribe, srsStore.get);

export const INTERVALS = [1, 3, 7, 14, 30, 60];
export const MASTERED_DAYS = 120;
export const addDays = (date: string, n: number) => {
  const d = new Date(date + "T12:00:00");
  d.setDate(d.getDate() + n);
  return todayKey(d);
};

/** A phrase first met on lesson day `from` is due the next day, then 3, 7, 14, 30, 60 days later. */
export function cardFor(key: string, from: string, s: SrsState): CardState {
  return s.cards[key] ?? { stage: 0, due: addDays(from, INTERVALS[0]), lapses: 0, seen: 0 };
}

export function answer(key: string, from: string, knew: boolean) {
  const today = todayKey();
  srsStore.set((s) => {
    const c = cardFor(key, from, s);
    let next: CardState;
    if (knew) {
      const stage = Math.min(c.stage + 1, INTERVALS.length);
      const wait = stage >= INTERVALS.length ? MASTERED_DAYS : INTERVALS[stage];
      next = { stage, due: addDays(today, wait), lapses: c.lapses, seen: c.seen + 1 };
    } else {
      next = { stage: 0, due: addDays(today, 1), lapses: c.lapses + 1, seen: c.seen + 1 };
    }
    return { cards: { ...s.cards, [key]: next }, taps: [...s.taps, { en: key, date: today, knew }].slice(-2000) };
  });
}
