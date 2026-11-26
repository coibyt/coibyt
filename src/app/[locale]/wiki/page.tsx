import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ChevronRight, GraduationCap, Search, Store } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/academy/types";
import { SITE, absoluteUrl, jsonLd, localizedUrl } from "@/lib/seo";
import { categorySlug, contentLocale, latestArticles, liveCategories, searchArticles, sectionAlternates, wikiArticles, wikiPath } from "@/lib/wiki";
import { FEATURED, START_HERE } from "@/lib/wiki/featured";
import { wikiStrings } from "@/lib/wiki/strings";
import type { WikiArticle } from "@/lib/wiki/types";
import { ArticleCard, ArticleRow, GOLD, SERIF, cardMeta } from "@/components/wiki/parts";

type Params = Promise<{ locale: string }>;
type Query = Promise<{ q?: string | string[] }>;

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: Query }): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  const lang = contentLocale(locale);
  const s = wikiStrings(lang);
  const cover = wikiArticles(locale)[0];
  const image = cover ? [{ url: absoluteUrl(cover.hero.src)!, width: cover.hero.w ?? 1200, height: cover.hero.h ?? 675, alt: cover.hero.alt }] : undefined;
  return {
    title: { absolute: s.hubMetaTitle },
    description: s.hubMetaDescription,
    alternates: sectionAlternates(locale, () => "/wiki"),
    // A search result list is not a page of its own.
    ...(q ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: s.hubMetaTitle, description: s.hubMetaDescription, url: localizedUrl(lang, "/wiki"), siteName: "VaraaAi", type: "website", ...(image ? { images: image } : {}) },
    twitter: { card: "summary_large_image", title: s.hubMetaTitle, description: s.hubMetaDescription, ...(image ? { images: [image[0].url] } : {}) },
  };
}

/** Articles named by lesson slug, in that order; missing ones are skipped. */
const named = (all: WikiArticle[], slugs: string[]) => slugs.map((slug) => all.find((a) => a.lesson === slug)).filter((a): a is WikiArticle => !!a);

/** The Wiki's front page: search, the cover story, the chapters, what is new
 * and where a newcomer should start. */
export default async function WikiHubPage({ params, searchParams }: { params: Params; searchParams: Query }) {
  const { locale } = await params;
  const sp = await searchParams;
  const query = (Array.isArray(sp.q) ? sp.q[0] : sp.q)?.trim().slice(0, 80) ?? "";
  const lang = contentLocale(locale);
  const s = wikiStrings(lang);
  const all = wikiArticles(locale);
  const latest = latestArticles(locale);
  const chapters = liveCategories(locale);
  const picked = named(all, FEATURED);
  const featured = [...picked, ...latest.filter((a) => !picked.includes(a))].slice(0, 4);
  const cover = featured[0];
  const start = named(all, START_HERE).slice(0, 5);
  const results = query ? searchArticles(locale, query) : null;
  const formAction = lang === "vi" ? "/wiki" : `/${lang}/wiki`;
  const hubUrl = localizedUrl(lang, "/wiki");

  const pageLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: s.hubMetaTitle,
    description: s.hubMetaDescription,
    url: hubUrl,
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", name: "VaraaAi", url: SITE },
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icons/icon-512.png` } },
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${hubUrl}?q={search_term_string}` }, "query-input": "required name=search_term_string" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: all.length,
      itemListElement: latest.slice(0, 30).map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: localizedUrl(lang, wikiPath(a)) })),
    },
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: s.home, item: localizedUrl(lang, "") || SITE },
      { "@type": "ListItem", position: 2, name: s.wiki, item: hubUrl },
    ],
  };

  return (
    <div className="overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />

      {/* cover: title and search on the left, the cover story on the right */}
      <section className="relative isolate bg-[#1a1326] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(176,138,62,0.22),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(98,79,137,0.35),transparent_70%)]" />
        <div className="container pb-12 pt-5 sm:pt-7 lg:pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs font-semibold text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">
              {s.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-[#e8d3a6]">{s.wiki}</span>
          </nav>

          <div className="mt-7 grid items-end gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#e8d3a6]">VaraaAi Wiki</p>
              <h1 className={`${SERIF} mt-3 text-[2.35rem] font-bold leading-[1.12] sm:text-6xl sm:leading-[1.08]`}>{s.hubTitle}</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{s.hubLead}</p>

              <form action={formAction} method="get" role="search" className="mt-7 flex max-w-xl items-center gap-2 rounded-2xl bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-[#e8d3a6]/50">
                <label htmlFor="wiki-q" className="sr-only">
                  {s.searchLabel}
                </label>
                <Search className="ml-3 h-5 w-5 shrink-0 text-ink-300" aria-hidden />
                <input
                  id="wiki-q"
                  type="search"
                  name="q"
                  defaultValue={query}
                  placeholder={s.searchPlaceholder}
                  maxLength={80}
                  className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-ink-900 outline-none placeholder:text-ink-300 sm:text-base"
                />
                <button type="submit" className={`shrink-0 rounded-xl ${GOLD} px-4 py-2.5 text-sm font-extrabold text-primary-900 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6`}>
                  {s.searchButton}
                </button>
              </form>

              <ul className="mt-6 flex flex-wrap gap-2">
                {chapters.map(({ category }) => (
                  <li key={category.id}>
                    <Link href={`/wiki/${categorySlug(category, locale)}`} className="inline-block rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20 hover:ring-[#e8d3a6]/60">
                      {pick(category.name, lang)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {cover && !results && (
              <Link href={wikiPath(cover)} className="group relative block overflow-hidden rounded-3xl shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-[#e8d3a6]/40">
                <span className="relative block aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3.4]">
                  <Image src={cover.hero.src} alt={cover.hero.alt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-[#150f20] via-[#150f20]/55 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 block p-5 sm:p-7">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full ${GOLD} px-2.5 py-0.5 text-[11px] font-extrabold text-primary-900`}>{s.featured}</span>
                    <span className="text-xs font-bold text-[#e8d3a6]">{cardMeta(cover).category}</span>
                  </span>
                  <span className={`${SERIF} mt-2.5 block text-2xl font-bold leading-snug sm:text-[1.75rem]`}>{cover.title}</span>
                  <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-white/75">{cover.excerpt}</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {results ? (
        /* search results */
        <section className="container pb-16 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-3xl`}>{results.length ? s.searchResults(results.length, query) : s.searchNone(query)}</h2>
            <Link href="/wiki" className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-800">
              {s.searchClear}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          {results.length > 0 && (
            <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <li key={a.slug}>
                  <ArticleCard a={a} s={s} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <>
          {/* the three stories beside the cover */}
          {featured.length > 1 && (
            <section className="container pt-10 sm:pt-12">
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featured.slice(1).map((a) => (
                  <li key={a.slug} className="last:sm:col-span-2 last:lg:col-span-1">
                    <ArticleCard a={a} s={s} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* chapters */}
          <section className="container pt-14 sm:pt-16">
            <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-[2rem]`}>{s.chapters}</h2>
            <p className="mt-1.5 text-[15px] text-ink-400">{s.chaptersLead}</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {chapters.map(({ category, articles }) => (
                <li key={category.id}>
                  <Link href={`/wiki/${categorySlug(category, locale)}`} className="group relative block overflow-hidden rounded-2xl ring-1 ring-ink-100 sm:rounded-3xl">
                    <span className="relative block aspect-[4/5] sm:aspect-[4/4.4]">
                      <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-[#150f20] via-[#150f20]/35 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 block p-3.5 text-white sm:p-5">
                      <span className={`${SERIF} block text-lg font-bold leading-tight sm:text-2xl`}>{pick(category.name, lang)}</span>
                      <span className="mt-1.5 hidden text-[13px] leading-snug text-white/75 sm:line-clamp-2 sm:block">{pick(category.blurb, lang)}</span>
                      <span className="mt-2 inline-block text-xs font-bold text-[#e8d3a6]">{s.articles(articles.length)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* newest on the left, where to start on the right */}
          <section className="container grid gap-10 pt-14 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
            <div className="min-w-0">
              <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-[2rem]`}>{s.latest}</h2>
              <ul className="mt-3 divide-y divide-ink-100">
                {latest.slice(0, 8).map((a) => (
                  <li key={a.slug}>
                    <ArticleRow a={a} s={s} />
                  </li>
                ))}
              </ul>
            </div>
            {start.length > 0 && (
              <aside className="self-start rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-6 text-white ring-1 ring-[#e8d3a6]/30 sm:p-7 lg:sticky lg:top-24">
                <h2 className={`${SERIF} text-2xl font-bold`}>{s.startHere}</h2>
                <p className="mt-1.5 text-sm text-white/70">{s.startHereLead}</p>
                <ol className="mt-5 space-y-4">
                  {start.map((a, i) => (
                    <li key={a.slug}>
                      <Link href={wikiPath(a)} className="group flex gap-4">
                        <span className={`${SERIF} w-7 shrink-0 text-3xl font-bold leading-none text-[#e8d3a6]`} aria-hidden>
                          {i + 1}
                        </span>
                        <span className="min-w-0 border-b border-white/10 pb-4">
                          <span className="block text-[15px] font-bold leading-snug group-hover:text-[#e8d3a6]">{a.title}</span>
                          <span className="mt-1 block text-xs font-semibold text-white/55">{cardMeta(a).category}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </aside>
            )}
          </section>

          {/* one shelf per chapter */}
          {chapters.map(({ category, articles }) => (
            <section key={category.id} className="container pt-14 sm:pt-16">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-[2rem]`}>{pick(category.name, lang)}</h2>
                <Link href={`/wiki/${categorySlug(category, locale)}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-800">
                  {s.seeAll} ({articles.length})
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {articles.slice(0, 3).map((a) => (
                  <li key={a.slug} className="last:sm:hidden last:lg:block">
                    <ArticleCard a={a} s={s} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}

      {/* where the knowledge comes from, and the product behind it */}
      <section className="container grid gap-5 pb-20 pt-16 md:grid-cols-2">
        <div className="flex flex-col items-start rounded-3xl bg-white p-6 shadow-card ring-1 ring-[#e8d3a6] sm:p-8">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${GOLD} text-primary-900`}>
            <GraduationCap className="h-6 w-6" aria-hidden />
          </span>
          <h2 className={`${SERIF} mt-4 text-2xl font-bold text-ink-900`}>VaraaAi Academy</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-400">{s.lessonCtaBody}</p>
          <Link href="/academy" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-700">
            {s.courseOf}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="flex flex-col items-start rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-6 text-white ring-1 ring-[#e8d3a6]/30 sm:p-8">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#e8d3a6] ring-1 ring-[#e8d3a6]/40">
            <Store className="h-6 w-6" aria-hidden />
          </span>
          <h2 className={`${SERIF} mt-4 text-2xl font-bold`}>{s.tryTitle}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/75">{s.tryBody}</p>
          <Link href="/business" className={`mt-5 inline-flex items-center gap-2 rounded-2xl ${GOLD} px-5 py-3 text-sm font-extrabold text-primary-900 transition hover:brightness-105`}>
            {s.tryCta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}

