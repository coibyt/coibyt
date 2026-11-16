"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY, STORAGE_KEY, parseState, touchDay, type AcademyState, type LessonProgress } from "@/lib/academy/progress";

/** One shared, cached view of the saved progress so every component on the
 * page sees the same object and re-renders together. */
let cachedRaw: string | null | undefined;
let cached: AcademyState = EMPTY;
const listeners = new Set<() => void>();

function read(): AcademyState {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode or storage turned off: progress just lasts for this visit.
    return cached;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = parseState(raw);
  }
  return cached;
}

function write(next: AcademyState) {
  cached = next;
  try {
    const raw = JSON.stringify(next);
    cachedRaw = raw;
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    cachedRaw = undefined;
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const serverSnapshot = () => EMPTY;

export function useAcademyProgress() {
  const state = useSyncExternalStore(subscribe, read, serverSnapshot);

  const update = useCallback((fn: (s: AcademyState) => AcademyState) => {
    write(fn(read()));
  }, []);

  const patchLesson = useCallback(
    (slug: string, fn: (p: LessonProgress) => LessonProgress, active = true) => {
      update((s) => {
        const next = { ...s, lessons: { ...s.lessons, [slug]: fn(s.lessons[slug] ?? {}) } };
        return active ? touchDay({ ...next, last: slug }) : next;
      });
    },
    [update]
  );

  return { state, update, patchLesson };
}

/** False on the server and on the first client render, true afterwards —
 * for things that depend on saved progress and must not flash a wrong
 * state while the page hydrates. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
