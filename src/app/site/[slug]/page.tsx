import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarCheck, Clock, Quote, Sparkles, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { resolveSiteLocale, siteAccess, SITE_BUSINESS_SELECT } from "@/lib/site-page";
import { HeroSlider } from "@/components/hero-slider";
import { GiftCardSale } from "@/components/gift-card-sale";
import { Eyebrow, SectionHeading, SiteCta, SiteShell, Stars, siteStatusLabel } from "@/components/site-shell";

const HERO_SLIDE_SLOTS = ["hero-slide-0", "hero-slide-1", "hero-slide-2", "hero-slide-3", "hero-slide-4"];
const STAT_COLS: Record<number, string> = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };
const GALLERY_SLOTS = Array.from({ length: 8 }, (_, i) => `gallery-${i}`);

export default async function BusinessSitePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const business = await prisma.business.findUnique({ where: { slug }, select: SITE_BUSINESS_SELECT });
  const { preview } = await siteAccess(business);
  const b = business!;

  const [landing, branches, reviewStats, reviews, services, serviceCount, staff, giftCards] = await Promise.all([
    prisma.landingPage.findUniqueOrThrow({
      where: { businessId: b.id },
      include: {
        images: { select: { slot: true, updatedAt: true } },
        highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
      },
    }),
    getSiteBranches(b.ownerId),
    prisma.review.aggregate({ where: { businessId: b.id, status: "APPROVED" }, _avg: { rating: true }, _count: true }),
    prisma.review.findMany({
      where: { businessId: b.id, comment: { not: null }, status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { customer: { select: { name: true } } },
    }),
    prisma.service.findMany({
      where: { businessId: b.id, active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 6,
    }),
    prisma.service.count({ where: { businessId: b.id, active: true } }),
    prisma.staff.findMany({
      where: { businessId: b.id, active: true },
      orderBy: { createdAt: "asc" },
      take: 8,
      select: { id: true, name: true, title: true, bio: true, avatar: { select: { updatedAt: true } } },
    }),
    prisma.giftCard.findMany({
      where: { businessId: b.id, active: true },
      include: { service: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const locale = resolveSiteLocale(rawLocale, b.defaultLocale);
  const s = siteStrings(locale);
  const prefix = sitePrefix(locale);
  const { label: statusLabel, status } = siteStatusLabel(locale, b);

  const imageUrl = (slot: string) => {
    const img = landing.images.find((i) => i.slot === slot);
    return img ? `/api/landing-image/${landing.id}/${slot}?v=${img.updatedAt.getTime()}` : null;
  };
  // Falls back to the older single "hero" image slot for salons that
  // uploaded one before the multi-slide slider existed.
  const heroSlidesRaw = HERO_SLIDE_SLOTS.map(imageUrl).filter((u): u is string => !!u);
  const legacyHero = imageUrl("hero");
  const heroSlides = heroSlidesRaw.length > 0 ? heroSlidesRaw : legacyHero ? [legacyHero] : [];
  const gallery = GALLERY_SLOTS.map(imageUrl).filter((u): u is string => !!u);
  const introImage = imageUrl("intro");

  const bookingHref = `/site/${slug}/booking?locale=${locale}`;
  const servicesHref = `/site/${slug}/services?locale=${locale}`;
  const ctaHref = (target: string, url: string | null) => (target === "URL" && url ? url : bookingHref);

  const avgRating = reviewStats._avg.rating;
  const reviewCount = reviewStats._count;
  const heroTitle = landing.heroTitle || b.name;
  const heroText = landing.heroText || b.description;
  const heroButton = landing.heroButtonLabel || s.bookNow;
  const heroLayout = landing.heroLayout;

  const ratingChip = avgRating ? (
    <span className="inline-flex items-center gap-2">
      <Stars rating={avgRating} size="h-3.5 w-3.5" />
      <span className="font-semibold">{avgRating.toFixed(1)}</span>
      <span className="opacity-70">
        ({reviewCount} {s.reviewsLabel})
      </span>
    </span>
  ) : null;

  const stats = [
    avgRating && { value: avgRating.toFixed(1), label: `${reviewCount} ${s.reviewsLabel}`, Icon: null },
    serviceCount > 0 && { value: String(serviceCount), label: s.servicesCountLabel, Icon: Sparkles },
    staff.length > 0 && { value: String(staff.length), label: s.specialistsLabel, Icon: Users },
    { value: "24/7", label: s.navBooking, Icon: CalendarCheck },
  ].filter((x): x is { value: string; label: string; Icon: typeof Sparkles | null } => !!x);

  return (
    <SiteShell locale={locale} business={b} branches={branches} active="home" preview={preview}>
      {/* ---------- Hero ---------- */}
      {heroLayout === "FULL" ? (
        <section className="relative flex min-h-[min(calc(100svh-5rem),640px)] items-end overflow-hidden sm:min-h-[680px] sm:items-center">
          <HeroSlider images={heroSlides} variant="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/35 sm:to-transparent" />
          <div className="container relative z-10 py-16 sm:py-24">
            <div className="max-w-2xl text-white animate-slide-up">
              {landing.heroEyebrow && (
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-lp-gold">{landing.heroEyebrow}</p>
              )}
              <h1 className="font-serif text-[2.9rem] font-medium leading-[1.04] sm:text-7xl">{heroTitle}</h1>
              {heroText && <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed text-white/80">{heroText}</p>}
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={ctaHref(landing.heroButtonTarget, landing.heroButtonUrl)}
                  className="inline-flex items-center gap-2 rounded-full bg-lp-accent px-8 py-4 text-sm font-semibold text-lp-accent-ink shadow-2xl transition-transform hover:-translate-y-0.5"
                >
                  <CalendarCheck className="h-4 w-4" />
                  {heroButton}
                </a>
                <a
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                  {s.viewAllServices}
                </a>
              </div>
              {(ratingChip || statusLabel) && (
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                  {ratingChip}
                  {statusLabel && (
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${status?.open ? "bg-emerald-400" : "bg-white/50"}`} />
                      {statusLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : heroLayout === "TEXT_ONLY" ? (
        <section className="relative overflow-hidden bg-lp-surface">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-lp-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-lp-gold/25 blur-3xl" />
          <div className="container relative py-24 text-center sm:py-36">
            {landing.heroEyebrow && <Eyebrow>{landing.heroEyebrow}</Eyebrow>}
            <h1 className="mx-auto mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] text-lp-ink sm:text-7xl">{heroTitle}</h1>
            {heroText && <p className="mx-auto mt-7 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-lp-muted">{heroText}</p>}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <HeroButtons
                primaryHref={ctaHref(landing.heroButtonTarget, landing.heroButtonUrl)}
                primaryLabel={heroButton}
                secondaryHref={servicesHref}
                secondaryLabel={s.viewAllServices}
              />
            </div>
            {ratingChip && <div className="mt-8 text-sm text-lp-muted">{ratingChip}</div>}
          </div>
        </section>
      ) : (
        <section className="relative overflow-hidden bg-lp-bg">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-full bg-lp-surface lg:w-[42%]" />
          <div className="container relative py-14 sm:py-20 lg:py-24">
            <div
              className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${heroLayout === "IMAGE_LEFT" ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="animate-slide-up">
                {landing.heroEyebrow ? (
                  <Eyebrow center={false}>{landing.heroEyebrow}</Eyebrow>
                ) : (
                  statusLabel && (
                    <p className="inline-flex items-center gap-2 rounded-full border border-lp-line bg-lp-card px-4 py-1.5 text-xs font-medium text-lp-muted">
                      <span className={`h-2 w-2 rounded-full ${status?.open ? "bg-emerald-500" : "bg-lp-muted/50"}`} />
                      {statusLabel}
                    </p>
                  )
                )}
                <h1 className="mt-6 font-serif text-[2.9rem] font-medium leading-[1.05] text-lp-ink sm:text-[4.25rem]">{heroTitle}</h1>
                {heroText && (
                  <p className="mt-6 max-w-xl whitespace-pre-line text-lg leading-relaxed text-lp-muted">{heroText}</p>
                )}
                <div className="mt-10 flex flex-wrap gap-3">
                  <HeroButtons
                    primaryHref={ctaHref(landing.heroButtonTarget, landing.heroButtonUrl)}
                    primaryLabel={heroButton}
                    secondaryHref={servicesHref}
                    secondaryLabel={s.viewAllServices}
                  />
                </div>
                {ratingChip && <div className="mt-10 text-sm text-lp-muted">{ratingChip}</div>}
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="absolute -inset-4 hidden translate-x-5 translate-y-5 rounded-t-[999px] rounded-b-[2.75rem] border border-lp-gold/60 sm:block" />
                <HeroSlider images={heroSlides} />
                {statusLabel && (
                  <div className="absolute -left-4 bottom-10 hidden items-center gap-3 rounded-2xl border border-lp-line bg-lp-card/95 px-5 py-4 shadow-xl backdrop-blur sm:flex">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lp-accent/10 text-lp-accent">
                      <Clock className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-lp-muted">{s.today}</span>
                      <span className="block text-sm font-semibold text-lp-ink">{statusLabel}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Trust bar ---------- */}
      <section className="relative z-10 bg-lp-bg">
        <div className="container">
          <div
            className={`grid grid-cols-2 overflow-hidden rounded-3xl border border-lp-line bg-lp-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] ${STAT_COLS[stats.length]} ${
              heroLayout === "FULL" ? "-mt-10" : "mt-0"
            }`}
          >
            {stats.map((st, i) => (
              <div
                key={st.label}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-7 text-center ${
                  i > 0 ? "border-l border-lp-line" : ""
                } ${i >= 2 ? "border-t border-lp-line sm:border-t-0" : ""} ${i === 2 ? "border-l-0 sm:border-l" : ""} ${
                  stats.length % 2 === 1 && i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="flex items-center gap-2 font-serif text-3xl font-medium text-lp-ink">
                  {st.Icon ? <st.Icon className="h-5 w-5 text-lp-gold" /> : <Stars rating={Number(st.value)} size="h-4 w-4" />}
                  {st.value}
                </span>
                <span className="text-xs uppercase tracking-[0.16em] text-lp-muted">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      {landing.introEnabled && (landing.introTitle || landing.introText || introImage) && (
        <section className="bg-lp-bg py-20 sm:py-28">
          <div className="container">
            {landing.introLayout === "TEXT_ONLY" || !introImage ? (
              <div className="mx-auto max-w-3xl text-center">
                <Eyebrow>{s.aboutEyebrow}</Eyebrow>
                {landing.introTitle && (
                  <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-lp-ink sm:text-5xl">{landing.introTitle}</h2>
                )}
                {landing.introText && (
                  <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-lp-muted">{landing.introText}</p>
                )}
                {landing.introButtonLabel && (
                  <a
                    href={ctaHref(landing.introButtonTarget, landing.introButtonUrl)}
                    className="mt-9 inline-flex items-center gap-2 border-b border-lp-gold pb-1 text-sm font-semibold uppercase tracking-[0.18em] text-lp-ink"
                  >
                    {landing.introButtonLabel} <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            ) : (
              <div
                className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-24 ${
                  landing.introLayout === "IMAGE_RIGHT" ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-lp-surface">
                    <Image src={introImage} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -right-4 hidden h-36 w-36 rounded-full border border-lp-gold/60 sm:block" />
                </div>
                <div>
                  <Eyebrow center={false}>{s.aboutEyebrow}</Eyebrow>
                  {landing.introTitle && (
                    <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-lp-ink sm:text-5xl">{landing.introTitle}</h2>
                  )}
                  {landing.introText && (
                    <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-lp-muted">{landing.introText}</p>
                  )}
                  {landing.introButtonLabel && (
                    <a
                      href={ctaHref(landing.introButtonTarget, landing.introButtonUrl)}
                      className="mt-9 inline-flex items-center gap-2 rounded-full bg-lp-ink px-7 py-3.5 text-sm font-semibold text-lp-bg transition-transform hover:-translate-y-0.5"
                    >
                      {landing.introButtonLabel} <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- Signature services ---------- */}
      {landing.servicesEnabled && services.length > 0 && (
        <section className="relative overflow-hidden bg-lp-surface py-20 sm:py-28">
          <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-lp-gold/15 blur-3xl" />
          <div className="container relative">
            <SectionHeading eyebrow={s.servicesEyebrow} title={landing.servicesTitle || s.featuredServicesTitle} />
            <div className="mx-auto grid max-w-5xl gap-x-14 gap-y-2 md:grid-cols-2">
              {services.map((sv) => (
                <a
                  key={sv.id}
                  href={`${prefix}/b/${slug}/book/${sv.id}`}
                  className="group -mx-4 rounded-2xl px-4 py-5 transition-colors hover:bg-lp-card"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-xl text-lp-ink">{sv.name}</span>
                    <span className="mb-1 min-w-6 flex-1 border-b border-dotted border-lp-muted/40" />
                    <span className="font-serif text-xl text-lp-accent">{formatMoney(sv.priceCents, sv.currency, locale)}</span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-4 text-sm text-lp-muted">
                    <span className="line-clamp-1">
                      {sv.durationMin} {s.min}
                      {sv.description ? ` · ${sv.description}` : ""}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-lp-accent opacity-0 transition-opacity group-hover:opacity-100">
                      {s.bookShort} <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a
                href={servicesHref}
                className="inline-flex items-center gap-2 rounded-full border border-lp-ink/20 px-8 py-3.5 text-sm font-semibold text-lp-ink transition-colors hover:border-lp-ink hover:bg-lp-ink hover:text-lp-bg"
              >
                {s.viewAllServices}
                {serviceCount > services.length && <span className="opacity-60">({serviceCount})</span>}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Highlights ---------- */}
      {landing.highlightsEnabled && landing.highlights.length > 0 && (
        <section className="bg-lp-bg py-20 sm:py-28">
          <div className="container">
            {landing.highlightsTitle && <SectionHeading title={landing.highlightsTitle} />}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landing.highlights.map((h) => {
                const hImg = imageUrl(h.id);
                return (
                  <div
                    key={h.id}
                    className="group flex flex-col overflow-hidden rounded-[2rem] border border-lp-line bg-lp-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]"
                  >
                    {hImg && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-lp-surface">
                        <Image
                          src={hImg}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-3 p-7">
                      <p className="font-serif text-2xl text-lp-ink">{h.title}</p>
                      {h.description && <p className="flex-1 text-sm leading-relaxed text-lp-muted">{h.description}</p>}
                      {h.buttonLabel && (
                        <a
                          href={ctaHref(h.buttonTarget, h.buttonUrl)}
                          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-lp-accent"
                        >
                          {h.buttonLabel} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Gallery ---------- */}
      {landing.galleryEnabled && gallery.length > 0 && (
        <section className="bg-lp-bg pb-20 sm:pb-28">
          <div className="container">
            <SectionHeading eyebrow={s.galleryEyebrow} title={landing.galleryTitle || s.galleryTitle} />
            <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
              {gallery.map((url, i) => (
                <div
                  key={url}
                  className={`group relative overflow-hidden rounded-3xl bg-lp-surface ${
                    i === 0 ? "col-span-2 row-span-2" : i === 3 && gallery.length > 5 ? "row-span-2" : ""
                  }`}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-lp-deep/0 transition-colors duration-500 group-hover:bg-lp-deep/15" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Team ---------- */}
      {landing.teamEnabled && staff.length > 0 && (
        <section className="bg-lp-surface py-20 sm:py-28">
          <div className="container">
            <SectionHeading eyebrow={s.teamEyebrow} title={s.teamTitle} />
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-12">
              {staff.map((m) => (
                <div key={m.id} className="group w-[calc(50%-12px)] text-center sm:w-56">
                  <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-t-[999px] rounded-b-3xl bg-lp-card">
                    {m.avatar ? (
                      <Image
                        src={`/api/staff-avatar/${m.id}?v=${m.avatar.updatedAt.getTime()}`}
                        alt=""
                        fill
                        sizes="224px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-lp-accent/15 to-lp-gold/15 font-serif text-6xl text-lp-accent">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="mt-5 font-serif text-xl text-lp-ink">{m.name}</p>
                  {m.title && <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{m.title}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Reviews ---------- */}
      {landing.reviewsEnabled && reviews.length > 0 && (
        <section className="bg-lp-bg py-20 sm:py-28">
          <div className="container">
            <SectionHeading
              eyebrow={s.reviewsEyebrow}
              title={s.testimonialsTitle}
              subtitle={
                avgRating ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="font-serif text-4xl text-lp-ink">{avgRating.toFixed(1)}</span>
                    <span className="text-left">
                      <Stars rating={avgRating} />
                      <span className="block text-xs">
                        {reviewCount} {s.reviewsLabel}
                      </span>
                    </span>
                  </span>
                ) : undefined
              }
            />
            <div className="flex flex-wrap justify-center gap-6">
              {reviews.map((r) => (
                <figure
                  key={r.id}
                  className="relative flex w-full flex-col rounded-[2rem] border border-lp-line bg-lp-card p-8 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <Quote className="h-8 w-8 fill-lp-gold/20 text-lp-gold" strokeWidth={1} />
                  <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-lp-ink">{r.comment}</blockquote>
                  <figcaption className="mt-7 flex items-center justify-between gap-3 border-t border-lp-line pt-5">
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lp-accent/10 font-serif text-lp-accent">
                        {r.customer.name.charAt(0)}
                      </span>
                      <span className="text-sm font-semibold text-lp-ink">{r.customer.name}</span>
                    </span>
                    <Stars rating={r.rating} size="h-3.5 w-3.5" />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Gift cards ---------- */}
      {giftCards.length > 0 && (
        <section className="bg-lp-surface py-20 sm:py-24">
          <div className="container max-w-4xl">
            <SectionHeading title={locale === "vi" ? "Thẻ quà tặng" : "Gift cards"} />
            <div className="text-ink-900">
              <GiftCardSale
                locale={locale}
                cards={giftCards.map((c) => ({
                  id: c.id,
                  name: c.name,
                  serviceName: c.service.name,
                  discountPercent: c.discountPercent,
                  validDays: c.validDays,
                  maxUses: c.maxUses,
                  salePriceCents: c.salePriceCents,
                  currency: c.currency,
                }))}
              />
            </div>
          </div>
        </section>
      )}

      <SiteCta locale={locale} slug={slug} phone={b.phone} />
    </SiteShell>
  );
}

function HeroButtons({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <>
      <a
        href={primaryHref}
        className="inline-flex items-center gap-2 rounded-full bg-lp-accent px-8 py-4 text-sm font-semibold text-lp-accent-ink shadow-[0_18px_40px_-15px_rgb(var(--lp-accent)/0.8)] transition-transform hover:-translate-y-0.5"
      >
        <CalendarCheck className="h-4 w-4" />
        {primaryLabel}
      </a>
      <a
        href={secondaryHref}
        className="inline-flex items-center gap-2 rounded-full border border-lp-ink/20 px-8 py-4 text-sm font-semibold text-lp-ink transition-colors hover:border-lp-ink"
      >
        {secondaryLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </>
  );
}
