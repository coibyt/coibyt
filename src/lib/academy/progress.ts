/** Learning progress for the Academy, kept in the visitor's browser
 * (localStorage) — no account needed. Pure functions only; the React hook
 * is in src/components/academy/use-progress.ts. */
import type { Audience, CourseCard } from "@/lib/academy/types";

export const STORAGE_KEY = "varaaai.academy.v1";

export interface LessonProgress {
  /** Last playback position in seconds (to resume). */
  pos?: number;
  /** Furthest second reached. */
  max?: number;
  /** Timestamp the lesson was completed. */
  done?: number;
  /** Best number of right quiz answers, and out of how many. */
  quiz?: number;
  quizOf?: number;
}

export interface AcademyState {
  v: 1;
  lessons: Record<string, LessonProgress>;
  /** Slug of the lesson opened most recently. */
  last?: string;
  /** Days with activity, YYYY-MM-DD, newest last (max 90). */
  days: string[];
  name?: string;
  audience?: Audience;
}

export const EMPTY: AcademyState = { v: 1, lessons: {}, days: [] };

export function parseState(raw: string | null): AcademyState {
  if (!raw) return EMPTY;
  try {
    const s = JSON.parse(raw) as Partial<AcademyState>;
    if (!s || s.v !== 1 || typeof s.lessons !== "object" || s.lessons === null) return EMPTY;
    return {
      v: 1,
      lessons: s.lessons,
      last: typeof s.last === "string" ? s.last : undefined,
      days: Array.isArray(s.days) ? s.days.filter((d) => typeof d === "string").slice(-90) : [],
      name: typeof s.name === "string" ? s.name.slice(0, 60) : undefined,
      audience: s.audience === "owner" || s.audience === "customer" || s.audience === "pro" ? s.audience : undefined,
    };
  } catch {
    return EMPTY;
  }
}

export const XP_LESSON = 100;
export const XP_ANSWER = 20;

/** XP thresholds for levels 1…5. */
export const LEVELS = [0, 200, 500, 1000, 1800];

export function xpOf(state: AcademyState, liveSlugs: Set<string>) {
  let xp = 0;
  for (const [slug, p] of Object.entries(state.lessons)) {
    if (!liveSlugs.has(slug)) continue;
    if (p.done) xp += XP_LESSON;
    xp += (p.quiz ?? 0) * XP_ANSWER;
  }
  return xp;
}

export function levelOf(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i]) level = i + 1;
  const floor = LEVELS[level - 1];
  const next = LEVELS[level] ?? null;
  return { level, floor, next, ratio: next ? Math.min(1, (xp - floor) / (next - floor)) : 1 };
}

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const today = () => dayKey(new Date());

/** Days in a row with activity, counting back from today (or yesterday, so
 * a streak isn't shown as lost before the day is over). */
export function streakOf(days: string[], now = new Date()) {
  const set = new Set(days);
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (set.has(dayKey(cursor))) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function touchDay(state: AcademyState): AcademyState {
  const t = today();
  if (state.days[state.days.length - 1] === t) return state;
  return { ...state, days: [...state.days.filter((d) => d !== t), t].slice(-90) };
}

export type BadgeId = "first" | "ace" | "streak3" | "five" | `course:${string}` | "grad:customer" | "grad:owner" | "grad:pro";

export interface BadgeStatus {
  id: BadgeId;
  earned: boolean;
  /** Course badges of courses with no video yet can't be earned. */
  locked: boolean;
}

export function courseProgress(course: CourseCard, state: AcademyState) {
  const live = course.lessons.filter((l) => l.live);
  const done = live.filter((l) => state.lessons[l.slug]?.done).length;
  return { total: live.length, done, complete: live.length > 0 && done === live.length };
}

export function trackProgress(courses: CourseCard[], audience: Audience, state: AcademyState) {
  const live = courses.filter((c) => c.audience === audience).flatMap((c) => c.lessons.filter((l) => l.live));
  const done = live.filter((l) => state.lessons[l.slug]?.done).length;
  return { total: live.length, done, complete: live.length > 0 && done === live.length };
}

export function badgesOf(courses: CourseCard[], state: AcademyState): BadgeStatus[] {
  const live = new Set(courses.flatMap((c) => c.lessons.filter((l) => l.live).map((l) => l.slug)));
  const entries = Object.entries(state.lessons).filter(([slug]) => live.has(slug));
  const doneCount = entries.filter(([, p]) => p.done).length;
  const ace = entries.some(([, p]) => p.quizOf && p.quiz === p.quizOf);
  const out: BadgeStatus[] = [
    { id: "first", earned: doneCount >= 1, locked: false },
    { id: "ace", earned: ace, locked: false },
    { id: "streak3", earned: longestStreak(state.days) >= 3, locked: false },
    { id: "five", earned: doneCount >= 5, locked: live.size < 5 },
  ];
  for (const c of courses) {
    const p = courseProgress(c, state);
    out.push({ id: `course:${c.id}`, earned: p.complete, locked: p.total === 0 });
  }
  for (const a of ["customer", "owner", "pro"] as const) {
    const p = trackProgress(courses, a, state);
    out.push({ id: `grad:${a}`, earned: p.complete, locked: p.total === 0 });
  }
  return out;
}

function longestStreak(days: string[]) {
  const sorted = [...new Set(days)].sort();
  let best = 0;
  let run = 0;
  let prev: number | null = null;
  for (const d of sorted) {
    const [y, m, dd] = d.split("-").map(Number);
    const t = new Date(y, m - 1, dd).getTime();
    run = prev !== null && Math.round((t - prev) / 86_400_000) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = t;
  }
  return best;
}

/** A lesson counts as watched once this share of it has been reached. */
export const WATCHED_RATIO = 0.9;

export function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
