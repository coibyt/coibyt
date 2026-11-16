/** VaraaAi Academy (/academy): narrated video lessons for customers and for
 * salon owners. Text is written in Vietnamese, English and Finnish; every
 * other language gets English. */

export interface L3 {
  vi: string;
  en: string;
  fi: string;
}

export const l3 = (vi: string, en: string, fi: string): L3 => ({ vi, en, fi });

export const pick = (t: L3, locale: string) => (locale === "vi" ? t.vi : locale === "fi" ? t.fi : t.en);

export type Audience = "customer" | "owner";

export type CourseIcon =
  | "compass" | "calendar" | "gift" | "rocket" | "megaphone" | "briefcase" | "heart" | "trending";

export interface Course {
  id: string;
  audience: Audience;
  icon: CourseIcon;
  title: L3;
  body: L3;
}

export interface QuizQuestion {
  q: L3;
  options: L3[];
  /** Index of the right option. */
  answer: number;
  why: L3;
}

export interface LessonVideo {
  /** Site-relative mp4 (public/academy/…). */
  src: string;
  poster: string;
  /** Optional Vietnamese subtitles (WebVTT), off until the viewer turns them on. */
  captions: string;
  seconds: number;
  /** ISO date the video was published (for search engines). */
  published: string;
}

export interface Lesson {
  slug: string;
  course: string;
  title: L3;
  summary: L3;
  /** null → announced in the curriculum, video not made yet. */
  video: LessonVideo | null;
  /** Page where the viewer can try the steps (no locale prefix). */
  href?: string;
  hrefLabel?: L3;
  /** Matching written guide in the help centre (/help/getting-started#id). */
  guide?: string;
  /** A feature added recently. */
  fresh?: boolean;
  steps?: L3[];
  tips?: L3[];
  quiz?: QuizQuestion[];
}

/** What the pages hand to client components: one language, plain strings. */
export interface LessonCard {
  slug: string;
  course: string;
  audience: Audience;
  no: number;
  title: string;
  summary: string;
  live: boolean;
  fresh: boolean;
  poster: string | null;
  seconds: number;
  quizCount: number;
}

export interface CourseCard {
  id: string;
  audience: Audience;
  icon: CourseIcon;
  title: string;
  body: string;
  lessons: LessonCard[];
}
