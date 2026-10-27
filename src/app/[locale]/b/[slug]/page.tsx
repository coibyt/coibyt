import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { toZonedTime } from "date-fns-tz";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Music2,
  MessageCircle,
  Youtube,
  Map as MapIcon,
  ShoppingBag,
  CalendarCheck,
  Newspaper,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { ReviewList } from "@/components/review-list";
import { ServiceSelectionList } from "@/components/service-selection-list";
import { BusinessIntroVideo } from "@/components/business-intro-video";
import { BusinessLocationButton } from "@/components/business-location-button";
import { FollowButton } from "@/components/follow-button";
import { BusinessChatButton } from "@/components/business-chat-button";
import { AffiliateCookieSetter } from "@/components/affiliate-cookie-setter";
import { categoryNameMap } from "@/lib/service-groups";
import { categoryName } from "@/lib/category-names";
import { fanpageStrings } from "@/lib/fanpage-strings";
import { salonJsonLd, salonMetadata } from "@/lib/seo-salon";
import { jsonLd } from "@/lib/seo";
import { groupHoursByDay, windowsLabel } from "@/lib/hours-format";

const WEEKDAYS_VI = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_FI = ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"];

const L = {
  vi: {
    book: "Đặt lịch",
    closed: "Đóng cửa",
    closedOn: "Nghỉ",
    today: "Hôm nay",
    reviewsCount: (n: number) => `${n} đánh giá`,
    noReviewsYet: "Chưa có đánh giá",
  },
  en: {
    book: "Book now",
    closed: "Closed",
    closedOn: "Closed",
    today: "Today",
    reviewsCount: (n: number) => `${n} review${n === 1 ? "" : "s"}`,
    noReviewsYet: "No reviews yet",
  },
  fi: {
    book: "Varaa aika",
    closed: "Suljettu",
    closedOn: "Suljettu",
    today: "Tänään",
    reviewsCount: (n: number) => `${n} arvostelua`,
    noReviewsYet: "Ei vielä arvosteluja",
  },
};

// Printed QR codes from the free tools link here with these UTM sources.
const QR_SOURCES = new Set(["price_list", "qr_poster"]);

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  return salonMetadata(slug, locale);
}

export default async function BusinessProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ utm_source?: string }>;
}) {
  const { locale, slug } = await params;
  const { utm_source: utmSource } = await searchParams;
  const [t, business, session] = await Promise.all([
    getTranslations("business"),
    prisma.business.findUnique({
      where: { slug },
      include: {
        services: { where: { active: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
        serviceGroups: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
        staff: { where: { active: true } },
        reviews: {
          where: { status: "APPROVED" },
          include: { customer: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        hours: true,
        // Upcoming closed days (holidays), shown under the opening hours.
        closures: { where: { date: { gte: new Date(new Date().toISOString().slice(0, 10)) } }, orderBy: { date: "asc" }, take: 3 },
        categories: { include: { category: true } },
      },
    }),
    auth(),
  ]);

  if (!business || business.status !== "APPROVED") notFound();

  // Raw, never-deduplicated page-view log (same "simple counter" spirit as
  // Product.viewCount) — kept row-per-visit so the admin analytics page can
  // filter by day/week/month/custom range instead of just a running total.
  await prisma.businessPageView.create({ data: { businessId: business.id } });
  if (utmSource && QR_SOURCES.has(utmSource)) {
    await prisma.qrScan.create({ data: { businessId: business.id, source: utmSource } });
  }

  const catNames = await categoryNameMap(locale);

  const [followerCount, isFollowing, productCount, postCount] = await Promise.all([
    prisma.businessFollow.count({ where: { businessId: business.id } }),
    session?.user
      ? prisma.businessFollow
          .findUnique({
            where: { businessId_customerId: { businessId: business.id, customerId: session.user.id } },
          })
          .then((f) => !!f)
      : false,
    prisma.product.count({ where: { businessId: business.id, active: true, hidden: false } }),
    prisma.post.count({ where: { businessId: business.id, publishAt: { lte: new Date() } } }),
  ]);

  const l = L[locale as keyof typeof L] ?? L.en;
  const avgRating =
    business.reviews.length > 0
      ? business.reviews.reduce((s, r) => s + r.rating, 0) / business.reviews.length
      : null;
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: business.reviews.filter((r) => r.rating === stars).length,
  }));

  const weekdayLabels = locale === "vi" ? WEEKDAYS_VI : locale === "fi" ? WEEKDAYS_FI : WEEKDAYS_EN;
  const hoursByDay = groupHoursByDay(business.hours);
  // "Today" in the salon's own timezone, not the server's or visitor's.
  const todayIdx = toZonedTime(new Date(), business.timezone).getDay();
  const hasHours = business.hours.length > 0;

  const socialLinks = [
    business.email && { href: `mailto:${business.email}`, label: "Email", icon: Mail, external: false },
    business.whatsapp && {
      href: `https://wa.me/${business.whatsapp.replace(/[^0-9]/g, "")}`,
      label: "WhatsApp",
      icon: MessageCircle,
      external: true,
    },
    business.website && { href: business.website, label: "Website", icon: Globe, external: true },
    business.facebookUrl && { href: business.facebookUrl, label: "Facebook", icon: Facebook, external: true },
    business.instagramUrl && { href: business.instagramUrl, label: "Instagram", icon: Instagram, external: true },
    business.tiktokUrl && { href: business.tiktokUrl, label: "TikTok", icon: Music2, external: true },
    business.youtubeUrl && { href: business.youtubeUrl, label: "YouTube", icon: Youtube, external: true },
    business.googleMapsUrl && { href: business.googleMapsUrl, label: "Google Maps", icon: MapIcon, external: true },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail; external: boolean }[];

  const structuredData = await salonJsonLd(slug, locale);

  return (
    <div className="bg-mist-50">
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />}
      <Suspense fallback={null}>
        <AffiliateCookieSetter businessId={business.id} />
      </Suspense>
      <div className="relative h-56 w-full bg-gradient-to-br from-primary-700 to-primary-900 sm:h-80">
        {business.coverUrl && <Image src={business.coverUrl} alt="" fill priority className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
      </div>

      {/* `relative` here isn't decorative — without it this element is a
          plain non-positioned box, which browsers paint BEFORE the cover
          photo above (a `position: relative` element) regardless of DOM
          order. That let the cover visually cover the business name and
          Follow/Chat buttons wherever the -mt overlap landed. */}
      <div className="container relative -mt-16 pb-24">
        <div className="rounded-[28px] border border-ink-100 bg-white p-5 shadow-xl shadow-primary-900/5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
            <div className="-mt-14 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white text-3xl font-extrabold text-primary-500 shadow-lg ring-4 ring-white sm:-mt-16 sm:h-28 sm:w-28">
              {business.logoUrl ? (
                <Image src={business.logoUrl} alt="" width={112} height={112} className="h-full w-full object-contain" />
              ) : (
                business.name.charAt(0)
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{business.name}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                <a
                  href="#reviews"
                  className="inline-flex items-center gap-1.5 rounded-full bg-peach-100 px-3 py-1.5 font-semibold text-ink-900"
                >
                  <Star className="h-4 w-4 fill-coral-500 text-coral-500" />
                  {avgRating ? (
                    <>
                      {avgRating.toFixed(1)}
                      <span className="font-normal text-ink-700">({l.reviewsCount(business.reviews.length)})</span>
                    </>
                  ) : (
                    <span className="font-normal text-ink-700">{l.noReviewsYet}</span>
                  )}
                </a>
                {business.categories[0] && (
                  <span className="rounded-full bg-primary-50 px-3 py-1.5 font-medium text-primary-700">
                    {categoryName(locale, business.categories[0].category)}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-ink-700 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {business.addressLine && (
                  <span className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    {business.addressLine}
                    {business.city ? `, ${business.city}` : ""}
                  </span>
                )}
                {business.phone && (
                  <a href={`tel:${business.phone}`} className="flex items-center gap-2 hover:text-primary-600">
                    <Phone className="h-4 w-4 shrink-0 text-primary-500" />
                    {business.phone}
                  </a>
                )}
              </div>

              {business.description && (
                <p className="mt-4 max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-ink-700">
                  {business.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a href="#services" className="btn-primary !px-6 !py-3 text-sm">
                  <CalendarCheck className="h-4 w-4" />
                  {l.book}
                </a>
                <BusinessChatButton businessSlug={slug} businessName={business.name} locale={locale} />
                <FollowButton
                  businessSlug={slug}
                  initialFollowing={isFollowing}
                  initialFollowerCount={followerCount}
                  locale={locale}
                />
                {productCount > 0 && (
                  <Link href={`/b/${slug}/products`} className="btn-outline !px-4 !py-2 text-xs">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    {t("products")}
                  </Link>
                )}
                {postCount > 0 && (
                  <Link href={`/b/${slug}/fanpage`} className="btn-outline !px-4 !py-2 text-xs">
                    <Newspaper className="h-3.5 w-3.5" />
                    {fanpageStrings(locale).eyebrow}
                  </Link>
                )}
              </div>

              {business.introVideoUrl && (
                <BusinessIntroVideo
                  videoUrl={business.introVideoUrl}
                  businessName={business.name}
                  locale={locale}
                />
              )}
              {business.lat != null && business.lng != null && (
                <BusinessLocationButton lat={business.lat} lng={business.lng} name={business.name} locale={locale} />
              )}

              {socialLinks.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      title={s.label}
                      {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-mist-100 text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-600"
                    >
                      <s.icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 text-sm font-semibold">
          {[
            { href: "#services", label: t("services") },
            { href: "#reviews", label: t("reviews") },
            ...(hasHours ? [{ href: "#hours", label: t("hours") }] : []),
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-ink-100 bg-white px-4 py-2 text-ink-700 transition-colors hover:border-primary-200 hover:text-primary-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <section id="services" className="scroll-mt-24 rounded-[28px] border border-ink-100 bg-white p-5 sm:p-7">
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink-900">{t("services")}</h2>
              <ServiceSelectionList
                services={business.services.map((s) => ({
                  ...s,
                  categoryName: s.categoryId ? (catNames.get(s.categoryId) ?? null) : null,
                }))}
                groups={business.serviceGroups}
                locale={locale}
                bookBasePath={`/b/${slug}/book`}
              />
            </section>

            <section id="reviews" className="mt-8 scroll-mt-24 rounded-[28px] border border-ink-100 bg-white p-5 sm:p-7">
              <h2 className="mb-5 text-2xl font-bold tracking-tight text-ink-900">{t("reviews")}</h2>
              {avgRating && (
                <div className="mb-6 flex flex-col gap-5 rounded-3xl bg-peach-50 p-5 sm:flex-row sm:items-center sm:gap-8">
                  <div className="flex items-center gap-4 sm:flex-col sm:items-start sm:gap-1">
                    <span className="text-5xl font-extrabold tracking-tight text-ink-900">{avgRating.toFixed(1)}</span>
                    <div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(avgRating) ? "fill-coral-500 text-coral-500" : "text-ink-100"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-ink-700">{l.reviewsCount(business.reviews.length)}</p>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-1.5">
                    {ratingCounts.map((r) => (
                      <li key={r.stars} className="flex items-center gap-3 text-xs text-ink-700">
                        <span className="w-3 text-right font-semibold">{r.stars}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                          <div
                            className="h-full rounded-full bg-coral-400"
                            style={{ width: `${(r.count / business.reviews.length) * 100}%` }}
                          />
                        </div>
                        <span className="w-5 text-ink-400">{r.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <ReviewList reviews={business.reviews} locale={locale} />
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {hasHours && (
              <div id="hours" className="scroll-mt-24 rounded-[28px] border border-ink-100 bg-white p-5 sm:p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900">
                  <Clock className="h-4 w-4 text-primary-500" /> {t("hours")}
                </h3>
                <ul className="space-y-1 text-sm">
                  {[1, 2, 3, 4, 5, 6, 0].map((idx) => {
                    const h = hoursByDay.get(idx);
                    const isToday = idx === todayIdx;
                    return (
                      <li
                        key={idx}
                        className={`flex justify-between rounded-xl px-3 py-2 ${
                          isToday ? "bg-primary-50 font-semibold text-primary-800" : "text-ink-700"
                        }`}
                      >
                        <span>
                          {weekdayLabels[idx]}
                          {isToday && <span className="ml-1.5 text-xs font-medium text-primary-500">· {l.today}</span>}
                        </span>
                        <span className={h ? "tabular-nums" : "text-ink-400"}>
                          {h ? windowsLabel(h) : l.closed}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {business.closures.length > 0 && (
                  <ul className="mt-3 space-y-1 border-t border-ink-100 pt-3 text-xs">
                    {business.closures.map((c) => (
                      <li key={c.id} className="flex justify-between gap-3 rounded-xl bg-berry-50/60 px-3 py-1.5 text-berry-500">
                        <span className="font-semibold">
                          {new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", timeZone: "UTC" }).format(c.date)}
                          {c.reason ? ` · ${c.reason}` : ""}
                        </span>
                        <span>{l.closedOn}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
