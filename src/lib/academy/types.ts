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

/** "pro" is the craft-skills track (nails, lashes, hair, spa, hygiene) for people who work in salons. */
export type Audience = "customer" | "owner" | "pro";

export const AUDIENCES: Audience[] = ["customer", "owner", "pro"];

/** Every craft topic has two videos: the mentor's talk (theory, rules, experience) and the step-by-step practice. */
export type LessonStyle = "theory" | "practice";

export type CourseIcon =
  | "compass" | "calendar" | "gift" | "rocket" | "megaphone" | "briefcase" | "heart" | "trending"
  | "shield" | "sparkles" | "eye" | "scissors" | "flower";

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
  /** Craft lessons: which of the topic's two videos this is. */
  style?: LessonStyle;
  /** Craft lessons: a safety note shown above the steps (local rules apply, follow the product label…). */
  notice?: L3;
  /** Official sources behind the rules a lesson states. */
  sources?: { label: string; url: string }[];
  /** Slugs of software lessons that put this skill to work in VaraaAi. */
  related?: string[];
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
  style: LessonStyle | null;
}

export interface CourseCard {
  id: string;
  audience: Audience;
  icon: CourseIcon;
  title: string;
  body: string;
  /** Slug of the course landing page (/academy/khoa-hoc/<slug>), if it has one. */
  page: string | null;
  lessons: LessonCard[];
}
