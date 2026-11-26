/** VaraaAi Wiki (/wiki): one long-form written article per Academy lesson
 * (owner, 2026-11-26). The lesson page is the video and its quiz; the wiki
 * article is the same knowledge written out for readers and search engines,
 * with the lesson video embedded.
 *
 * Articles are plain typed files in src/content/wiki/<locale>/<slug>.ts
 * (no database). Text fields accept two inline marks: **bold** and
 * [label](/path or https://…). */

export type WikiLocale = "vi" | "en" | "fi";

export type WikiCategoryId = "nail" | "lash" | "hair" | "spa" | "safety" | "salon" | "marketing" | "booking" | "tips";

export interface WikiImage {
  /** Site-relative path under public/wiki/…, a descriptive file name. */
  src: string;
  /** What the picture shows, in the article's language (not a keyword list). */
  alt: string;
  caption?: string;
  /** Pixel size of the file; 1200 × 675 unless stated. */
  w?: number;
  h?: number;
}

/** One block of an article section. Exactly one key per block. */
export type WikiBlock =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { img: WikiImage }
  /** A boxed remark: `tip` (trade experience), `warn` (safety, rules), `info`. */
  | { note: string; kind?: "tip" | "warn" | "info"; title?: string }
  | { table: { head: string[]; rows: string[][] } };

export interface WikiSection {
  /** Anchor id, ascii kebab-case, unique in the article. */
  id: string;
  /** The H2. */
  title: string;
  blocks: WikiBlock[];
}

export interface WikiHowTo {
  /** The H2 above the steps. */
  title: string;
  /** Anchor id; "cac-buoc" when left out. */
  id?: string;
  /** One sentence before the steps. */
  lead?: string;
  /** What you need before starting. */
  supplies?: string[];
  steps: { name: string; text: string; image?: WikiImage }[];
  /** Id of the section the steps follow; after the last section when left out. */
  after?: string;
}

export interface WikiArticle {
  locale: WikiLocale;
  /** URL slug in this language: the main keyword, ascii kebab-case. */
  slug: string;
  /** Slug of the Academy lesson this article is written from — also what ties the translations together. */
  lesson: string;
  category: WikiCategoryId;
  /** H1. */
  title: string;
  /** <title>, about 60 characters at most, main keyword first. */
  metaTitle: string;
  /** Meta description, 140–158 characters. */
  metaDescription: string;
  /** The main search phrase the article answers. */
  keyword: string;
  /** Secondary phrases. */
  keywords: string[];
  /** One or two sentences for cards and the line under the H1. */
  excerpt: string;
  /** ISO dates. */
  published: string;
  updated: string;
  hero: WikiImage;
  /** "Tóm tắt nhanh": 3–5 points a reader can act on. */
  takeaways: string[];
  /** One or two paragraphs before the video; the first names the main keyword. */
  intro: string[];
  sections: WikiSection[];
  howTo?: WikiHowTo;
  faq: { q: string; a: string }[];
  /** Lesson slugs of articles worth reading next (same language). */
  related?: string[];
}
