import type { Metadata } from "next";
import { Globe, MapPin, Newspaper, ShoppingBag, Store } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { categoryName } from "@/lib/category-names";
import { alternatesFor } from "@/lib/seo";

// Read on every request, like sitemap.xml, so new salons show up at once.
export const dynamic = "force-dynamic";

const STRINGS = {
  vi: {
    title: "Sơ đồ trang",
    lead: "Tất cả các trang của VaraaAi ở một nơi — salon, dịch vụ, thành phố và công cụ miễn phí.",
    explore: "Khám phá",
    home: "Trang chủ",
    byService: "Tìm theo dịch vụ",
    byCity: "Tìm theo thành phố",
    salons: "Salon trên VaraaAi",
    book: "Đặt lịch",
    shop: "Cửa hàng",
    fanpage: "Fanpage",
    website: "Website",
    forOwners: "Dành cho chủ salon",
    business: "VaraaAi cho doanh nghiệp",
    priceList: "Tạo bảng giá miễn phí",
    qrPoster: "Tạo poster QR đặt lịch",
    salonCheck: "Kiểm tra salon miễn phí",
    help: "Trung tâm hướng dẫn",
    app: "Tải ứng dụng VaraaAi",
    info: "Thông tin",
    support: "Hỗ trợ",
    privacy: "Chính sách bảo mật",
    terms: "Điều khoản sử dụng",
    xml: "Sitemap XML cho công cụ tìm kiếm",
  },
  en: {
    title: "Sitemap",
    lead: "Every page on VaraaAi in one place — salons, services, cities and free tools.",
    explore: "Explore",
    home: "Home",
    byService: "Browse by service",
    byCity: "Browse by city",
    salons: "Salons on VaraaAi",
    book: "Book",
    shop: "Shop",
    fanpage: "Fanpage",
    website: "Website",
    forOwners: "For salon owners",
    business: "VaraaAi for business",
    priceList: "Free price list maker",
    qrPoster: "QR booking poster maker",
    salonCheck: "Free salon check",
    help: "Help centre",
    app: "Get the VaraaAi app",
    info: "Information",
    support: "Support",
    privacy: "Privacy policy",
    terms: "Terms of use",
    xml: "XML sitemap for search engines",
  },
  fi: {
    title: "Sivukartta",
    lead: "Kaikki VaraaAin sivut yhdessä paikassa — salongit, palvelut, kaupungit ja ilmaiset työkalut.",
    explore: "Tutustu",
    home: "Etusivu",
    byService: "Selaa palveluittain",
    byCity: "Selaa kaupungeittain",
    salons: "Salongit VaraaAissa",
    book: "Varaa",
    shop: "Kauppa",
    fanpage: "Fanisivu",
    website: "Verkkosivu",
    forOwners: "Salonkien omistajille",
    business: "VaraaAi yrityksille",
    priceList: "Ilmainen hinnastotyökalu",
    qrPoster: "QR-varausjulisteet",
    salonCheck: "Ilmainen salonkitarkistus",
    help: "Ohjekeskus",
    app: "Lataa VaraaAi-sovellus",
    info: "Tietoa",
    support: "Tuki",
    privacy: "Tietosuojakäytäntö",
    terms: "Käyttöehdot",
    xml: "XML-sivukartta hakukoneille",
  },
};
type Strings = (typeof STRINGS)["en"];
const strings = (locale: string): Strings => (STRINGS as Record<string, Strings>)[locale] ?? STRINGS.en;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const S = strings(locale);
  return { title: `${S.title} | VaraaAi`, description: S.lead, alternates: alternatesFor("/directory", locale) };
}

function search(category?: string, city?: string) {
  const p = new URLSearchParams();
  if (category) p.set("category", category);
  if (city) p.set("city", city);
  return `/search?${p.toString()}`;
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
      <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </section>
  );
}

const linkClass = "text-ink-700 underline-offset-4 hover:text-primary-600 hover:underline";

// Not /sitemap: the middleware skips every path starting with "site"
// (that prefix belongs to salons' own websites under /site).
export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const S = strings(locale);
  const now = new Date();

  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({
      where: { businesses: { some: { business: { status: "APPROVED" } } } },
      select: { slug: true, nameVi: true, nameEn: true },
    }),
    prisma.business.findMany({
      where: { status: "APPROVED" },
      select: {
        slug: true,
        name: true,
        city: true,
        landingPage: { select: { published: true } },
        _count: {
          select: {
            products: { where: { active: true, hidden: false } },
            posts: { where: { publishAt: { lte: now } } },
          },
        },
      },
      orderBy: { name: "asc" },
    }),
  ]);
  const cities = [...new Set(businesses.map((b) => b.city?.trim()).filter((c): c is string => !!c))].sort((a, b) => a.localeCompare(b, locale));
  const sortedCategories = categories
    .map((c) => ({ slug: c.slug, name: categoryName(locale, c) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));

  return (
    <div className="bg-mist-50">
      <div className="bg-gradient-to-b from-primary-50 to-mist-50">
        <div className="container max-w-5xl py-12 sm:py-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-ink-900">{S.title}</h1>
          <p className="mt-3 max-w-2xl text-ink-700">{S.lead}</p>
        </div>
      </div>

      <div className="container max-w-5xl space-y-5 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <Column title={S.explore}>
            <li>
              <Link href="/" className={linkClass}>
                {S.home}
              </Link>
            </li>
            <li className="pt-2 text-xs font-semibold uppercase tracking-wider text-ink-400">{S.byService}</li>
            {sortedCategories.map((c) => (
              <li key={c.slug}>
                <Link href={search(c.slug)} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </Column>

          <Column title={S.byCity}>
            {cities.map((city) => (
              <li key={city}>
                <Link href={search(undefined, city)} className={`${linkClass} inline-flex items-center gap-1.5`}>
                  <MapPin className="h-3.5 w-3.5 text-ink-400" />
                  {city}
                </Link>
                <ul className="mt-1.5 space-y-1.5 border-l border-ink-100 pl-5">
                  {sortedCategories.map((c) => (
                    <li key={c.slug}>
                      <Link href={search(c.slug, city)} className={`${linkClass} text-xs`}>
                        {c.name} · {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </Column>

          <div className="space-y-5">
            <Column title={S.forOwners}>
              {(
                [
                  ["/business", S.business],
                  ["/tools/price-list", S.priceList],
                  ["/tools/qr-poster", S.qrPoster],
                  ["/salon-check", S.salonCheck],
                  ["/help/getting-started", S.help],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title={S.info}>
              {(
                [
                  ["/app", S.app],
                  ["/support", S.support],
                  ["/privacy", S.privacy],
                  ["/terms", S.terms],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="/sitemap.xml" className={linkClass}>
                  {S.xml}
                </a>
              </li>
            </Column>
          </div>
        </div>

        <section className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary-600">{S.salons}</h2>
          <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <li key={b.slug}>
                <Link href={`/b/${b.slug}`} className="font-semibold text-ink-900 underline-offset-4 hover:text-primary-600 hover:underline">
                  {b.name}
                </Link>
                {b.city && <span className="text-xs text-ink-400"> · {b.city}</span>}
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <Link href={`/b/${b.slug}`} className={`${linkClass} inline-flex items-center gap-1`}>
                    <Store className="h-3 w-3" />
                    {S.book}
                  </Link>
                  {b._count.products > 0 && (
                    <Link href={`/b/${b.slug}/products`} className={`${linkClass} inline-flex items-center gap-1`}>
                      <ShoppingBag className="h-3 w-3" />
                      {S.shop}
                    </Link>
                  )}
                  {b._count.posts > 0 && (
                    <Link href={`/b/${b.slug}/fanpage`} className={`${linkClass} inline-flex items-center gap-1`}>
                      <Newspaper className="h-3 w-3" />
                      {S.fanpage}
                    </Link>
                  )}
                  {b.landingPage?.published && (
                    <a href={`/site/${b.slug}?locale=${locale}`} className={`${linkClass} inline-flex items-center gap-1`}>
                      <Globe className="h-3 w-3" />
                      {S.website}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
