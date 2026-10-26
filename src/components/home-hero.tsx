import * as Icons from "lucide-react";
import { ArrowRight, BellRing, CalendarCheck, Check, Download, Sparkles, Star, Store } from "lucide-react";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { categoryName } from "@/lib/category-names";
import { fill } from "@/lib/shop-strings";
import { homeHeroStrings } from "@/lib/home-hero-strings";
import { SearchBarHero } from "@/components/search-bar";

type Category = { id: string; slug: string; nameVi: string; nameEn: string; icon: string | null };

/** Salons for the hero's visual: approved, with a cover photo, most
 * reviewed first — from the visitor's own country when it's known. */
async function featuredSalons() {
  const country = (await cookies()).get("varaaai-country")?.value?.toUpperCase();
  const pick = (where: object) =>
    prisma.business.findMany({
      where: { status: "APPROVED", coverUrl: { not: null }, ...where },
      select: {
        id: true,
        slug: true,
        name: true,
        city: true,
        coverUrl: true,
        logoUrl: true,
        categories: { select: { category: { select: { nameVi: true, nameEn: true } } }, take: 1 },
      },
      orderBy: [{ reviews: { _count: "desc" } }, { createdAt: "asc" }],
      take: 2,
    });
  let salons = country ? await pick({ country }) : [];
  if (salons.length === 0) salons = await pick({});
  const ratings = await prisma.review.groupBy({
    by: ["businessId"],
    where: { businessId: { in: salons.map((s) => s.id) }, status: "APPROVED" },
    _avg: { rating: true },
    _count: { _all: true },
  });
  return salons.map((s) => {
    const r = ratings.find((x) => x.businessId === s.id);
    return { ...s, rating: r?._avg.rating ?? null, reviews: r?._count._all ?? 0 };
  });
}

async function platformStats() {
  const [salons, bookings, reviews] = await Promise.all([
    prisma.business.count({ where: { status: "APPROVED" } }),
    prisma.booking.count({ where: { status: { not: "CANCELLED" } } }),
    prisma.review.aggregate({ where: { status: "APPROVED" }, _avg: { rating: true }, _count: { _all: true } }),
  ]);
  return { salons, bookings, rating: reviews._avg.rating, reviews: reviews._count._all };
}

/** Rounds a count down to a friendly "1,200+" style figure. */
function roundDown(n: number) {
  if (n < 20) return String(n);
  const step = n < 100 ? 10 : n < 1000 ? 50 : 100;
  return `${Math.floor(n / step) * step}+`;
}

/** The homepage hero: headline, the search bar with "Near me", category
 * shortcuts, real platform numbers, and (on larger screens) a featured
 * salon card with a floating booking confirmation. */
export async function HomeHero({
  locale,
  title,
  subtitle,
  categories,
  promoPill,
}: {
  locale: string;
  title: string;
  subtitle: string;
  categories: Category[];
  promoPill: string;
}) {
  const H = homeHeroStrings(locale);
  const [stats, salons] = await Promise.all([platformStats(), featuredSalons()]);
  const [firstLine, ...rest] = title.split("\n");
  const secondLine = rest.join(" ");
  const iconOf = (name: string | null) =>
    (name && (Icons as unknown as Record<string, Icons.LucideIcon>)[name]) || Icons.Sparkles;
  const main = salons[0];
  const side = salons[1];

  return (
    <section className="relative isolate overflow-hidden bg-[#160f24]">
      {/* Background: soft colour glows, a faint dot grid and a fade into the page. */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary-500/45 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-coral-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-12rem] left-1/3 -z-10 h-[26rem] w-[26rem] rounded-full bg-amber-300/20 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
      />

      <div className="container relative grid items-center gap-12 pb-16 pt-12 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-1.5 pl-1.5 pr-4 text-xs font-semibold text-white/85 ring-1 ring-white/15 backdrop-blur">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-coral-500 text-[#160f24]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            {H.eyebrow}
          </span>

          <h1 className="mt-6 text-[2.7rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl xl:text-7xl">
            {firstLine}
            {secondLine && (
              <>
                <br />
                <span className="bg-gradient-to-r from-peach-200 via-coral-400 to-amber-300 bg-clip-text text-transparent">{secondLine}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{subtitle}</p>

          <div className="mt-8 w-full">
            <SearchBarHero />
          </div>

          {categories.length > 0 && (
            <div className="mt-6 flex max-w-2xl flex-wrap justify-center gap-2 lg:justify-start">
              {categories.slice(0, 5).map((c) => {
                const Icon = iconOf(c.icon);
                return (
                  <Link
                    key={c.id}
                    href={`/search?category=${c.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/[0.07] py-2 pl-2 pr-4 text-sm font-medium text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15 hover:ring-white/30"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-peach-200 transition group-hover:bg-white group-hover:text-primary-600">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {categoryName(locale, c)}
                  </Link>
                );
              })}
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-peach-200 transition hover:text-white"
              >
                {H.allServices}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {(stats.salons > 0 || stats.reviews > 0) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70 lg:justify-start">
              {stats.salons > 0 && (
                <span>
                  <span className="text-lg font-bold text-white">{roundDown(stats.salons)}</span> {H.salons}
                </span>
              )}
              {stats.bookings > 0 && (
                <span>
                  <span className="text-lg font-bold text-white">{roundDown(stats.bookings)}</span> {H.bookings}
                </span>
              )}
              {stats.reviews > 0 && stats.rating && (
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                  <span className="text-lg font-bold text-white">{stats.rating.toFixed(1)}</span>
                  {fill(H.reviewsFrom, { n: stats.reviews })}
                </span>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Link
              href="/business"
              className="group inline-flex max-w-full items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 text-left shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-coral-500 text-white">
                <Store className="h-[18px] w-[18px]" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-coral-400" />
              </span>
              <span className="min-w-0 text-sm font-bold text-primary-800">{promoPill}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-coral-500 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white/85 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
            >
              <Download className="h-4 w-4" />
              {H.getApp}
            </Link>
          </div>
        </div>

        {/* Visual (large screens): a real featured salon with a floating booking confirmation. */}
        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          {main ? (
            <Link
              href={`/b/${main.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-primary-900 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={main.coverUrl!} alt={main.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160f24] via-[#160f24]/30 to-transparent" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-700 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-coral-500" />
                {H.featured}
              </span>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-2xl font-extrabold text-white">{main.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/75">
                    {main.reviews > 0 && main.rating && (
                      <span className="inline-flex items-center gap-1 font-semibold text-white">
                        <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                        {main.rating.toFixed(1)}
                        <span className="font-normal text-white/60">({main.reviews})</span>
                      </span>
                    )}
                    <span className="truncate">
                      {[main.categories[0] ? categoryName(locale, main.categories[0].category) : null, main.city].filter(Boolean).join(" · ")}
                    </span>
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-700 shadow-lg transition group-hover:bg-coral-500 group-hover:text-white">
                  <CalendarCheck className="h-4 w-4" />
                  {H.bookNow}
                </span>
              </div>
            </Link>
          ) : (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-primary-600 via-primary-700 to-coral-500 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-512.png" alt="" className="h-40 w-40 rounded-[2.5rem] opacity-90 shadow-2xl" />
              </div>
            </div>
          )}

          {/* Illustration of what a customer gets right after booking. */}
          <div className="absolute -left-12 top-14 w-60 rounded-2xl bg-white/95 p-3.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white backdrop-blur" aria-hidden>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_8px_18px_-6px_rgba(16,185,129,0.8)]">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-ink-900">{H.confirmed}</p>
                <p className="truncate text-xs text-ink-400">{H.confirmedDetail}</p>
              </div>
            </div>
            <p className="mt-2.5 flex items-center gap-1.5 rounded-xl bg-mist-50 px-2.5 py-1.5 text-[11px] font-semibold text-ink-700">
              <BellRing className="h-3.5 w-3.5 text-coral-500" />
              {H.reminder}
            </p>
          </div>

          {side && (
            <Link
              href={`/b/${side.slug}`}
              className="absolute -right-8 bottom-36 flex w-56 items-center gap-3 rounded-2xl bg-white/95 p-2.5 shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] ring-1 ring-white backdrop-blur transition hover:-translate-y-0.5"
            >
              <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-mist-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={side.logoUrl || side.coverUrl!} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink-900">{side.name}</span>
                <span className="flex items-center gap-1 text-xs text-ink-400">
                  {side.reviews > 0 && side.rating ? (
                    <>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-ink-700">{side.rating.toFixed(1)}</span>
                      {side.city && <span className="truncate">· {side.city}</span>}
                    </>
                  ) : (
                    <span className="truncate">{side.city}</span>
                  )}
                </span>
              </span>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}
