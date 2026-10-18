import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { SearchBarHero } from "@/components/search-bar";
import { SearchResults } from "@/components/search-results";
import { searchBusinesses, citiesWithSalons, countriesWithSalons } from "@/lib/business-search";
import { visitorCountry } from "@/lib/visitor-country";
import { searchSeo } from "@/lib/search-seo";
import { categoryName } from "@/lib/category-names";
import { formatMoney } from "@/lib/money";

type Params = Promise<{ locale: string }>;
type SearchQuery = Promise<{ q?: string; city?: string; category?: string; country?: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

function localePrefix(locale: string) {
  return locale === "vi" ? "" : `/${locale}`;
}

function searchHref(params: { category?: string | null; city?: string | null; country?: string | null }) {
  const qs = new URLSearchParams();
  if (params.category) qs.set("category", params.category);
  if (params.city) qs.set("city", params.city);
  if (params.country) qs.set("country", params.country);
  const s = qs.toString();
  return `/search${s ? `?${s}` : ""}`;
}

/** Which country's salons to show: one the visitor picked (?country=), else
 * the country they're in. Null — show every country — when that country has
 * no salons at all (or can't be told), since an empty page helps nobody. */
async function resolveCountry(sp: Awaited<SearchQuery>) {
  const [available, detected] = await Promise.all([countriesWithSalons(), visitorCountry()]);
  const picked = sp.country?.trim().toUpperCase() || null;
  const chosen = picked && available.includes(picked) ? picked : null;
  const country = chosen ?? (detected && available.includes(detected) ? detected : null);
  return { country, chosen, available };
}

async function loadPage(locale: string, sp: Awaited<SearchQuery>) {
  const q = sp.q?.trim() || null;
  const city = sp.city?.trim() || null;
  const categorySlug = sp.category?.trim() || null;
  const { country, chosen, available } = await resolveCountry(sp);
  const [category, results] = await Promise.all([
    categorySlug ? prisma.category.findUnique({ where: { slug: categorySlug } }) : null,
    searchBusinesses({ q: q ?? undefined, city: city ?? undefined, category: categorySlug ?? undefined, country }),
  ]);
  const priced = results.filter((r) => r.minPriceCents !== null);
  const cheapest = priced.sort((a, b) => a.minPriceCents! - b.minPriceCents!)[0];
  const seo = searchSeo({
    locale,
    categoryName: category ? categoryName(locale, category) : null,
    categorySlug: category?.slug ?? null,
    city,
    q,
    resultCount: results.length,
    fromPrice: cheapest ? formatMoney(cheapest.minPriceCents!, cheapest.currency, locale) : null,
  });
  return { q, city, category, results, seo, country, chosen, available };
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchQuery;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const { seo, category, city } = await loadPage(locale, sp);
  const path = searchHref({ category: category?.slug, city });
  const url = `${SITE}${localePrefix(locale)}${path}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        vi: `${SITE}${path}`,
        en: `${SITE}/en${path}`,
        fi: `${SITE}/fi${path}`,
      },
    },
    robots: seo.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title: seo.title, description: seo.description, url, siteName: "VaraaAi", type: "website" },
  };
}

export default async function SearchPage({ params, searchParams }: { params: Params; searchParams: SearchQuery }) {
  const { locale } = await params;
  const sp = await searchParams;
  const { q, city, category, results, seo, country, chosen, available } = await loadPage(locale, sp);
  const [allCategories, cities] = await Promise.all([
    prisma.category.findMany({ orderBy: { createdAt: "asc" } }),
    citiesWithSalons(category?.slug, country),
  ]);
  const regionNames = new Intl.DisplayNames([locale === "vi" ? "vi" : locale === "fi" ? "fi" : "en"], { type: "region" });
  const countries = available.map((code) => ({ code, name: regionNames.of(code) ?? code }));
  const vi = locale === "vi";
  const prefix = localePrefix(locale);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: seo.h1,
      itemListElement: results.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE}${prefix}/b/${b.slug}`,
        name: b.name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="bg-mist-50">
      <script
        type="application/ld+json"
        // Escape "<" so salon names can never close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="relative overflow-hidden bg-primary-800">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-coral-400/25 blur-3xl" />
        <div className="container relative pb-10 pt-10 sm:pb-14 sm:pt-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-primary-100">
            <Link href="/" className="hover:text-white">VaraaAi</Link>
            <span aria-hidden>/</span>
            <Link href="/search" className="hover:text-white">{vi ? "Tìm kiếm" : locale === "fi" ? "Haku" : "Search"}</Link>
            {category && (
              <>
                <span aria-hidden>/</span>
                <Link href={searchHref({ category: category.slug })} className="hover:text-white">
                  {categoryName(locale, category)}
                </Link>
              </>
            )}
            {city && (
              <>
                <span aria-hidden>/</span>
                <span className="text-white">{city}</span>
              </>
            )}
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{seo.h1}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-100 sm:text-base">{seo.intro}</p>
          <div className="mt-6 max-w-2xl">
            <SearchBarHero initialQ={q ?? ""} initialCity={city ?? ""} />
          </div>
        </div>
      </section>

      <div className="container py-6">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <Link
            href={searchHref({ city, country: chosen })}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              !category ? "bg-primary-600 text-white shadow" : "border border-ink-100 bg-white text-ink-700 hover:border-primary-200"
            }`}
          >
            {vi ? "Tất cả" : locale === "fi" ? "Kaikki" : "All"}
          </Link>
          {allCategories.map((c) => (
            <Link
              key={c.id}
              href={searchHref({ category: c.slug, city, country: chosen })}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                category?.slug === c.slug
                  ? "bg-primary-600 text-white shadow"
                  : "border border-ink-100 bg-white text-ink-700 hover:border-primary-200"
              }`}
            >
              {categoryName(locale, c)}
            </Link>
          ))}
        </div>

      </div>

      {/* Wider than the text container, so the desktop list + map get room. */}
      <div className="mx-auto mt-2 w-full max-w-[1600px] px-4 lg:px-6">
        <SearchResults
          businesses={results}
          locale={locale}
          country={country}
          countryChosen={!!chosen}
          countries={countries}
        />
      </div>

      <div className="container pb-10">

        <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-ink-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-ink-900">
              {vi ? "Câu hỏi thường gặp" : locale === "fi" ? "Usein kysyttyä" : "Frequently asked questions"}
            </h2>
            <div className="mt-4 divide-y divide-ink-100">
              {seo.faq.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900">
                    {f.q}
                    <span className="text-xl leading-none text-primary-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {cities.length > 0 && (
              <div className="rounded-[28px] border border-ink-100 bg-white p-6">
                <h2 className="font-bold text-ink-900">
                  {category
                    ? vi
                      ? `${categoryName(locale, category)} theo thành phố`
                      : locale === "fi"
                        ? `${categoryName(locale, category)} kaupungeittain`
                        : `${categoryName(locale, category)} by city`
                    : vi
                      ? "Salon theo thành phố"
                      : locale === "fi"
                        ? "Salongit kaupungeittain"
                        : "Salons by city"}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <Link
                      key={c}
                      href={searchHref({ category: category?.slug, city: c, country: chosen })}
                      className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                        c === city ? "bg-primary-50 font-semibold text-primary-700" : "bg-mist-100 text-ink-700 hover:bg-primary-50"
                      }`}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-[28px] border border-ink-100 bg-white p-6">
              <h2 className="font-bold text-ink-900">
                {vi ? "Tìm kiếm phổ biến" : locale === "fi" ? "Suosittuja hakuja" : "Popular searches"}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {allCategories
                  .filter((c) => c.slug !== category?.slug)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={searchHref({ category: c.slug, city, country: chosen })} className="text-primary-700 hover:underline">
                        {categoryName(locale, c)}
                        {city ? (vi ? ` tại ${city}` : locale === "fi" ? ` – ${city}` : ` in ${city}`) : ""}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
