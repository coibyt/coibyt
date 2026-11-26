/** The Wiki's part of /sitemap.xml and /llms.txt. Each page is listed in the
 * languages it is actually written in, with hreflang links between them. */
import type { MetadataRoute } from "next";
import { pick } from "@/lib/academy/types";
import { SITE, localizedUrl } from "@/lib/seo";
import { articleVideo, liveCategories, translations, wikiArticles, wikiLocales, wikiPath } from "@/lib/wiki";

type Entry = MetadataRoute.Sitemap[number];

const abs = (path: string) => `${SITE}${path}`;

export function wikiSitemap(): Entry[] {
  const locales = wikiLocales();
  if (!locales.length) return [];
  const main = locales[0];
  const out: Entry[] = [];
  const newest = (l: string) => wikiArticles(l).reduce((d, a) => (a.updated > d ? a.updated : d), "2026-11-26");

  out.push({
    url: localizedUrl(main, "/wiki"),
    lastModified: new Date(newest(main)),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(l, "/wiki")])) },
  });

  // A chapter is listed for the languages in which it has articles.
  const chapters = new Map<string, { id: string; langs: Record<string, string>; image: string; updated: string }>();
  for (const l of locales)
    for (const { category, articles } of liveCategories(l)) {
      const c = chapters.get(category.id) ?? { id: category.id, langs: {}, image: category.image, updated: "" };
      c.langs[l] = localizedUrl(l, `/wiki/${pick(category.slug, l)}`);
      c.updated = articles.reduce((d, a) => (a.updated > d ? a.updated : d), c.updated);
      chapters.set(category.id, c);
    }
  for (const c of chapters.values()) {
    const first = locales.find((l) => c.langs[l])!;
    out.push({ url: c.langs[first], lastModified: new Date(c.updated), changeFrequency: "weekly", priority: 0.7, alternates: { languages: c.langs }, images: [abs(c.image)] });
  }

  // One entry per article (keyed by its lesson), with its translations as alternates.
  const seen = new Set<string>();
  for (const l of locales)
    for (const a of wikiArticles(l)) {
      if (seen.has(a.lesson)) continue;
      seen.add(a.lesson);
      const t = translations(a);
      const langs: Record<string, string> = {};
      for (const x of locales) if (t[x]) langs[x] = localizedUrl(x, wikiPath(t[x]!));
      const pictures = [a.hero.src, ...a.sections.flatMap((s) => s.blocks.flatMap((b) => ("img" in b ? [b.img.src] : []))), ...(a.howTo?.steps.flatMap((s) => (s.image ? [s.image.src] : [])) ?? [])];
      out.push({ url: localizedUrl(a.locale, wikiPath(a)), lastModified: new Date(a.updated), changeFrequency: "monthly", priority: 0.7, alternates: { languages: langs }, images: pictures.slice(0, 12).map(abs) });
    }
  return out;
}

/** Lines for /llms.txt: the hub, the chapters and every article with a one-line summary. */
export function wikiLlmsLines(): string[] {
  const locales = wikiLocales();
  if (!locales.length) return [];
  // English first when it exists (llms.txt is written in English), then Vietnamese, where every article starts.
  const order = [...locales].sort((a, b) => (a === "en" ? -1 : b === "en" ? 1 : a === "vi" ? -1 : b === "vi" ? 1 : 0));
  const names: Record<string, string> = { vi: "Vietnamese", en: "English", fi: "Finnish" };
  const lines = [
    "## VaraaAi Wiki (knowledge base)",
    "Long-form articles written from the VaraaAi Academy lessons: nail, lash, hair and spa craft, salon hygiene and safety, salon management and marketing, and how customers book. Each article has step-by-step instructions, pictures, an FAQ and the lesson video.",
  ];
  for (const l of order) {
    lines.push("", `### Articles in ${names[l]}`, `- [VaraaAi Wiki](${localizedUrl(l, "/wiki")}): all chapters and the newest articles`);
    for (const { category, articles } of liveCategories(l)) {
      lines.push(`- [${pick(category.name, l)}](${localizedUrl(l, `/wiki/${pick(category.slug, l)}`)}): ${pick(category.blurb, l)}`);
      for (const a of articles) {
        const video = articleVideo(a);
        lines.push(`  - [${a.title}](${localizedUrl(l, wikiPath(a))}): ${a.excerpt}${video ? ` (lesson video ${Math.round(video.video.seconds / 60)} min)` : ""}`);
      }
    }
  }
  lines.push("");
  return lines;
}
