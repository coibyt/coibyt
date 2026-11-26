import type { Metadata } from "next";
import { AcademyHub } from "@/components/academy/academy-hub";
import { bridgeCards, catalogue, courseCards, liveLessons } from "@/lib/academy";
import { AcademyCatalogue } from "@/components/academy/academy-catalogue";
import { coursePageStrings } from "@/lib/academy/course-page-strings";
import { academyStrings } from "@/lib/academy/strings";
import { ogImage } from "@/lib/og-image";
import { academyTabOg, isAudience } from "@/lib/academy/og";
import { AcademyShareLinks } from "@/components/academy/academy-share-links";
import { SITE, alternatesFor, jsonLd, localizedUrl } from "@/lib/seo";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { pick } from "@/lib/academy/types";
import { categorySlug, contentLocale, liveCategories } from "@/lib/wiki";
import { wikiStrings } from "@/lib/wiki/strings";

type Params = Promise<{ locale: string }>;
type Search = Promise<{ tab?: string | string[] }>;

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: Search }): Promise<Metadata> {
  const { locale } = await params;
  const s = academyStrings(locale);
  // A shared ?tab= link previews with that tab's own banner, title and text.
  const { tab } = await searchParams;
  if (isAudience(tab)) {
    const og = academyTabOg(tab, locale);
    return {
      title: og.title,
      description: og.description,
      alternates: alternatesFor("/academy", locale),
      openGraph: { title: og.title, description: og.description, url: `${localizedUrl(locale, "/academy")}?tab=${tab}`, siteName: "VaraaAi", type: "website", images: [og.image] },
      twitter: { card: "summary_large_image", title: og.title, description: og.description, images: [og.image.url] },
    };
  }
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: alternatesFor("/academy", locale),
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: localizedUrl(locale, "/academy"), siteName: "VaraaAi", type: "website", images: [ogImage(locale)] },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription },
  };
}

/** VaraaAi Academy: narrated video lessons for customers and salon owners,
 * with progress, points, badges and a certificate kept in the browser. */
export default async function AcademyPage({ params }: { params: Params }) {
  const { locale } = await params;
  const s = academyStrings(locale);
  const cs = coursePageStrings(locale);
  const courses = courseCards(locale);
  const live = liveLessons();
  const wikiLang = contentLocale(locale);
  const ws = wikiStrings(wikiLang);
  const wikiChapters = liveCategories(locale);

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: s.metaTitle,
    itemListElement: catalogue(locale).map((c, i) => ({ "@type": "ListItem", position: i + 1, url: localizedUrl(locale, `/academy/khoa-hoc/${c.slug}`), name: c.headline })),
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE },
  };

  return (
    <div className="overflow-x-clip bg-mist-50/60">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(list)} />
      {/* Course catalogue first, like a course marketplace (owner, 2026-11-19); every card opens the course page. */}
      <AcademyCatalogue courses={catalogue(locale)} locale={locale} lessons={live.length} seconds={live.reduce((a, l) => a + (l.video?.seconds ?? 0), 0)} />

      {/* The lessons written out as articles (owner, 2026-11-26). */}
      {wikiChapters.length > 0 && (
        <section className="container pb-12">
          <div className="rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-6 text-white ring-1 ring-[#e8d3a6]/30 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="min-w-0 flex-1 basis-72">
                <h2 className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight sm:text-2xl">
                  <BookOpen className="h-6 w-6 shrink-0 text-[#e8d3a6]" />
                  {ws.hubTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">{ws.hubLead}</p>
              </div>
              <Link href="/wiki" className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a] px-5 py-3 text-sm font-extrabold text-primary-900 transition hover:brightness-105">
                {ws.nav}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {wikiChapters.map(({ category, articles }) => (
                <li key={category.id}>
                  <Link href={`/wiki/${categorySlug(category, locale)}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                    {pick(category.name, wikiLang)}
                    <span className="text-xs text-[#e8d3a6]">{articles.length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* The learning path with progress, badges and the certificate. */}
      <div id="lo-trinh" className="scroll-mt-20 border-t border-ink-100 bg-white">
        <div className="container pb-14 pt-12 text-center sm:pb-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{cs.catPathTitle}</h2>
          <p className="mt-1 text-sm text-ink-400 sm:text-base">{cs.catPathBody}</p>
        </div>
        <AcademyHub courses={courses} bridge={bridgeCards(locale)} locale={locale} />
      </div>
      {/* Everyone can share the three tabs (owner, 2026-11-19). */}
      <div className="container -mt-10 pb-20">
        <AcademyShareLinks locale={locale} baseUrl={localizedUrl(locale, "/academy")} />
      </div>
    </div>
  );
}
