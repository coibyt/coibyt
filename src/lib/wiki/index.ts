/** Read-side helpers for the Wiki pages: which articles exist in which
 * language, how they map to Academy lessons, and what to show beside them. */
import type { Metadata } from "next";
import { VI_ARTICLES } from "@/content/wiki/vi";
import { EN_ARTICLES } from "@/content/wiki/en";
import { FI_ARTICLES } from "@/content/wiki/fi";
import { findLesson, lessonsOfCourse, videoFor } from "@/lib/academy";
import { pick } from "@/lib/academy/types";
import { SEO_LOCALES, localizedUrl } from "@/lib/seo";
import { WIKI_CATEGORIES, wikiCategory, type WikiCategory } from "@/lib/wiki/categories";
import type { WikiArticle, WikiCategoryId, WikiLocale } from "@/lib/wiki/types";

const BY_LOCALE: Record<WikiLocale, WikiArticle[]> = { vi: VI_ARTICLES, en: EN_ARTICLES, fi: FI_ARTICLES };

/** Languages that have articles of their own. */
export const wikiLocales = () => SEO_LOCALES.filter((l) => BY_LOCALE[l].length > 0);

/** The language the wiki is read in by a visitor in `locale`: their own when
 * it has articles, else English, else Vietnamese (where every article starts). */
export function contentLocale(locale: string): WikiLocale {
  if ((locale === "vi" || locale === "en" || locale === "fi") && BY_LOCALE[locale].length > 0) return locale;
  return BY_LOCALE.en.length > 0 ? "en" : "vi";
}

/** Position of a lesson in the curriculum, so lists follow the order of the course. */
const ORDER = new Map<string, number>();
for (const c of WIKI_CATEGORIES) for (const id of c.courses) for (const l of lessonsOfCourse(id)) ORDER.set(l.slug, ORDER.size);
const byCourseOrder = (a: WikiArticle, b: WikiArticle) => (ORDER.get(a.lesson) ?? 9999) - (ORDER.get(b.lesson) ?? 9999);

/** Every article of the language, in curriculum order. */
export const wikiArticles = (locale: string) => [...BY_LOCALE[contentLocale(locale)]].sort(byCourseOrder);

/** Newest first (by the date the article was last revised, then curriculum order). */
export const latestArticles = (locale: string) => wikiArticles(locale).sort((a, b) => b.updated.localeCompare(a.updated) || b.published.localeCompare(a.published));

export const findArticle = (locale: string, slug: string) => BY_LOCALE[contentLocale(locale)].find((a) => a.slug === slug) ?? null;

export const categoryArticles = (locale: string, id: WikiCategoryId) => wikiArticles(locale).filter((a) => a.category === id);

export const categorySlug = (c: WikiCategory, locale: string) => pick(c.slug, contentLocale(locale));

export const findCategory = (locale: string, slug: string) => WIKI_CATEGORIES.find((c) => categorySlug(c, locale) === slug) ?? null;

/** Categories that have at least one article in the language. */
export const liveCategories = (locale: string) =>
  WIKI_CATEGORIES.map((c) => ({ category: c, articles: categoryArticles(locale, c.id) })).filter((x) => x.articles.length > 0);

export const wikiPath = (a: Pick<WikiArticle, "slug">) => `/wiki/${a.slug}`;

/** The wiki article written from an Academy lesson, in the visitor's language. */
export const articleForLesson = (lessonSlug: string, locale: string) => BY_LOCALE[contentLocale(locale)].find((a) => a.lesson === lessonSlug) ?? null;

/** The same article in each language that has it. */
export function translations(article: WikiArticle): Partial<Record<WikiLocale, WikiArticle>> {
  const out: Partial<Record<WikiLocale, WikiArticle>> = {};
  for (const l of SEO_LOCALES) {
    const t = BY_LOCALE[l].find((a) => a.lesson === article.lesson);
    if (t) out[l] = t;
  }
  return out;
}

/** Canonical + hreflang for an article: only the languages it is written in. */
export function articleAlternates(article: WikiArticle): Metadata["alternates"] {
  const t = translations(article);
  const languages: Record<string, string> = {};
  for (const l of SEO_LOCALES) if (t[l]) languages[l] = localizedUrl(l, wikiPath(t[l]));
  const fallback = t.vi ?? t.en ?? article;
  languages["x-default"] = localizedUrl(fallback.locale, wikiPath(fallback));
  return { canonical: localizedUrl(article.locale, wikiPath(article)), languages };
}

/** Canonical + hreflang for the hub or a category page. */
export function sectionAlternates(locale: string, path: (l: WikiLocale) => string): Metadata["alternates"] {
  const own = contentLocale(locale);
  const languages: Record<string, string> = {};
  for (const l of wikiLocales()) languages[l] = localizedUrl(l, path(l));
  languages["x-default"] = localizedUrl(languages.vi ? "vi" : own, path(languages.vi ? "vi" : own));
  return { canonical: localizedUrl(own, path(own)), languages };
}

/** The lesson video in the article's language (the recording in that language, else English, else the original). */
export function articleVideo(article: WikiArticle) {
  const lesson = findLesson(article.lesson);
  const video = lesson && videoFor(lesson, article.locale);
  return lesson && video ? { lesson, video } : null;
}

/** A craft topic's other half: the practice article of a theory article, and the other way round. */
export function pairedArticle(article: WikiArticle) {
  const lesson = findLesson(article.lesson);
  if (!lesson?.style) return null;
  const course = lessonsOfCourse(lesson.course);
  const at = course.findIndex((l) => l.slug === lesson.slug);
  const other = lesson.style === "theory" ? course[at + 1] : course[at - 1];
  if (!other || !other.style || other.style === lesson.style) return null;
  return articleForLesson(other.slug, article.locale);
}

/** What to read next: the other half of the topic, the articles the author named, then neighbours in the chapter. */
export function relatedArticles(article: WikiArticle, max = 4) {
  const all = wikiArticles(article.locale);
  const out: WikiArticle[] = [];
  const add = (a: WikiArticle | null | undefined) => {
    if (a && a.slug !== article.slug && !out.some((x) => x.slug === a.slug) && out.length < max) out.push(a);
  };
  add(pairedArticle(article));
  for (const slug of article.related ?? []) add(all.find((a) => a.lesson === slug));
  // Software lessons that put the craft to work, as the lesson itself lists them.
  for (const slug of findLesson(article.lesson)?.related ?? []) add(all.find((a) => a.lesson === slug));
  const chapter = all.filter((a) => a.category === article.category);
  const at = chapter.findIndex((a) => a.slug === article.slug);
  for (let d = 1; d < chapter.length && out.length < max; d++) {
    add(chapter[at + d]);
    add(chapter[at - d]);
  }
  for (const a of all) add(a);
  return out;
}

/** The article before and after this one in its chapter. */
export function neighbours(article: WikiArticle) {
  const chapter = categoryArticles(article.locale, article.category);
  const at = chapter.findIndex((a) => a.slug === article.slug);
  return { prev: chapter[at - 1] ?? null, next: chapter[at + 1] ?? null };
}

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

/** Plain search over titles, keywords and summaries; accents optional ("son gel" finds "sơn gel"). */
export function searchArticles(locale: string, query: string) {
  const words = fold(query).split(/\s+/).filter(Boolean).slice(0, 8);
  if (!words.length) return [];
  return wikiArticles(locale)
    .map((a) => {
      const title = fold(`${a.title} ${a.keyword}`);
      const rest = fold(`${a.keywords.join(" ")} ${a.excerpt} ${a.takeaways.join(" ")} ${pick(wikiCategory(a.category).name, a.locale)}`);
      let score = 0;
      for (const w of words) {
        if (title.includes(w)) score += 3;
        else if (rest.includes(w)) score += 1;
        else return null;
      }
      return { a, score };
    })
    .filter((x): x is { a: WikiArticle; score: number } => !!x)
    .sort((x, y) => y.score - x.score)
    .map((x) => x.a);
}

/** Reading time from the length of the text (about 200 words a minute). */
export function readMinutes(a: WikiArticle) {
  const parts: string[] = [...a.intro, ...a.takeaways, ...a.faq.flatMap((f) => [f.q, f.a])];
  for (const s of a.sections)
    for (const b of s.blocks) {
      if ("p" in b) parts.push(b.p);
      else if ("h3" in b) parts.push(b.h3);
      else if ("ul" in b) parts.push(...b.ul);
      else if ("ol" in b) parts.push(...b.ol);
      else if ("note" in b) parts.push(b.note);
      else if ("table" in b) parts.push(...b.table.rows.flat());
    }
  for (const st of a.howTo?.steps ?? []) parts.push(st.name, st.text);
  const words = parts.join(" ").split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

export { WIKI_CATEGORIES, wikiCategory };
