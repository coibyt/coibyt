import Image from "next/image";
import { ArrowRight, ChevronRight, GraduationCap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { courseSeoBySlug } from "@/lib/academy/course-pages";
import { pick } from "@/lib/academy/types";
import { categoryArticles, categorySlug, contentLocale, liveCategories } from "@/lib/wiki";
import type { WikiCategory } from "@/lib/wiki/categories";
import { wikiStrings } from "@/lib/wiki/strings";
import { ArticleCard, SERIF } from "@/components/wiki/parts";

/** One chapter of the wiki: what it covers, every article in course order, and the courses behind it. */
export function CategoryView({ category, locale }: { category: WikiCategory; locale: string }) {
  const lang = contentLocale(locale);
  const s = wikiStrings(lang);
  const articles = categoryArticles(locale, category.id);
  const others = liveCategories(locale).filter((c) => c.category.id !== category.id);
  const courses = category.coursePages.map((slug) => courseSeoBySlug(slug)).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <div className="overflow-x-clip">
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <Image src={category.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-right opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a1326] via-[#1a1326]/90 to-[#1a1326]/40" />
        <div className="container pb-12 pt-5 sm:pb-16 sm:pt-7">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">
              {s.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/wiki" className="hover:text-white">
              {s.wiki}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <span className="text-[#e8d3a6]">{pick(category.name, lang)}</span>
          </nav>
          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-bold text-[#e8d3a6]">{s.articles(articles.length)}</p>
            <h1 className={`${SERIF} mt-3 text-[2rem] font-bold leading-[1.16] sm:text-5xl sm:leading-[1.12]`}>{pick(category.title, lang)}</h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">{pick(category.intro, lang)}</p>
          </div>
        </div>
      </section>

      <section className="container pt-10 sm:pt-12">
        <h2 className="sr-only">{s.inChapter}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <ArticleCard a={a} s={s} />
            </li>
          ))}
        </ul>
      </section>

      {/* the courses these articles are written from */}
      {courses.length > 0 && (
        <section className="container pt-14">
          <div className="rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-6 text-white ring-1 ring-[#e8d3a6]/30 sm:p-8">
            <h2 className={`${SERIF} flex items-center gap-3 text-2xl font-bold`}>
              <GraduationCap className="h-7 w-7 text-[#e8d3a6]" aria-hidden />
              {s.courseOf}
            </h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-3">
              {courses.map((c) => (
                <li key={c.slug}>
                  <Link href={`/academy/khoa-hoc/${c.slug}`} className="group flex h-full items-center gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/15 transition hover:bg-white/[0.12] hover:ring-[#e8d3a6]/60">
                    <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug">{pick(c.metaTitle, lang)}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#e8d3a6]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="container pb-20 pt-14">
          <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-[2rem]`}>{s.chapters}</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {others.map(({ category: c, articles: list }) => (
              <li key={c.id}>
                <Link href={`/wiki/${categorySlug(c, locale)}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink-900 ring-1 ring-ink-100 transition hover:ring-[#e8d3a6]">
                  {pick(c.name, lang)}
                  <span className="text-xs font-semibold text-ink-400">{list.length}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
