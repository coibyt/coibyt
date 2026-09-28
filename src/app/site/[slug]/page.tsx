import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { siteStrings } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface SectionData {
  layout: string;
  title: string | null;
  text: string | null;
  buttonLabel: string | null;
  buttonTarget: string;
  buttonUrl: string | null;
  imageUrl: string | null;
}

export default async function BusinessSitePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      ownerId: true,
      name: true,
      logoUrl: true,
      status: true,
      defaultLocale: true,
      email: true,
      website: true,
      facebookUrl: true,
      instagramUrl: true,
      tiktokUrl: true,
      youtubeUrl: true,
      whatsapp: true,
      hours: true,
      landingPage: {
        include: {
          images: true,
          highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
        },
      },
      reviews: {
        where: { comment: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { customer: { select: { name: true } } },
      },
    },
  });

  if (!business || business.status !== "APPROVED" || !business.landingPage?.published) {
    notFound();
  }
  const landing = business.landingPage;

  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(business.defaultLocale)
      ? business.defaultLocale
      : routing.defaultLocale;
  const s = siteStrings(locale);
  const branches = await getSiteBranches(business.ownerId);

  const imageUrl = (slot: string) =>
    landing.images.some((i) => i.slot === slot) ? `/api/landing-image/${landing.id}/${slot}` : null;

  const bookingHref = `/site/${slug}/booking`;
  const ctaHref = (target: string, url: string | null) =>
    target === "URL" && url ? url : bookingHref;

  const hero: SectionData = {
    layout: landing.heroLayout,
    title: landing.heroTitle,
    text: landing.heroText,
    buttonLabel: landing.heroButtonLabel || s.bookNow,
    buttonTarget: landing.heroButtonTarget,
    buttonUrl: landing.heroButtonUrl,
    imageUrl: imageUrl("hero"),
  };
  const intro: SectionData = {
    layout: landing.introLayout,
    title: landing.introTitle,
    text: landing.introText,
    buttonLabel: landing.introButtonLabel,
    buttonTarget: landing.introButtonTarget,
    buttonUrl: landing.introButtonUrl,
    imageUrl: imageUrl("intro"),
  };

  const avgRating =
    business.reviews.length > 0
      ? business.reviews.reduce((sum, r) => sum + r.rating, 0) / business.reviews.length
      : null;

  return (
    <div>
      <SiteHeader
        locale={locale}
        slug={slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active="home"
      />

      <LandingSection data={hero} ctaHref={ctaHref} large />

      {landing.introEnabled && <LandingSection data={intro} ctaHref={ctaHref} />}

      {landing.highlightsEnabled && landing.highlights.length > 0 && (
        <section className="border-t border-ink-100 bg-mist-50">
          <div className="container py-16 sm:py-20">
            {landing.highlightsTitle && (
              <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-ink-900">
                {landing.highlightsTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {landing.highlights.map((h) => {
                const hImg = imageUrl(h.id);
                return (
                  <div
                    key={h.id}
                    className="group overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-popover"
                  >
                    {hImg && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist-100">
                        <Image
                          src={hImg}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="space-y-2 p-6">
                      <p className="font-serif text-lg font-semibold text-ink-900">{h.title}</p>
                      {h.description && <p className="text-sm text-ink-700">{h.description}</p>}
                      {h.buttonLabel && (
                        <a
                          href={ctaHref(h.buttonTarget, h.buttonUrl)}
                          className="inline-block pt-1 text-sm font-semibold text-primary-600 hover:underline"
                        >
                          {h.buttonLabel} →
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

      {business.reviews.length > 0 && (
        <section className="border-t border-ink-100">
          <div className="container py-16 sm:py-20">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl font-semibold text-ink-900">{s.testimonialsTitle}</h2>
              {avgRating && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-ink-700">
                  <Star className="h-4 w-4 fill-coral-500 text-coral-500" />
                  <span className="font-semibold text-ink-900">{avgRating.toFixed(1)}</span>
                  <span>({business.reviews.length})</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {business.reviews.map((r) => (
                <div key={r.id} className="rounded-3xl border border-ink-100 bg-mist-50 p-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-ink-700">&ldquo;{r.comment}&rdquo;</p>
                  <p className="mt-3 text-xs font-semibold text-ink-900">{r.customer.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-100 bg-ink-900 py-14 text-center">
        <a href={bookingHref} className="btn-accent !px-8 !py-3.5 text-base">
          {s.bookNow}
        </a>
      </section>

      <SiteFooter
        locale={locale}
        businessName={business.name}
        contact={{
          email: business.email,
          website: business.website,
          facebookUrl: business.facebookUrl,
          instagramUrl: business.instagramUrl,
          tiktokUrl: business.tiktokUrl,
          youtubeUrl: business.youtubeUrl,
          whatsapp: business.whatsapp,
        }}
        hours={business.hours}
        branches={branches}
      />
    </div>
  );
}

function LandingSection({
  data,
  ctaHref,
  large = false,
}: {
  data: SectionData;
  ctaHref: (target: string, url: string | null) => string;
  large?: boolean;
}) {
  if (!data.title && !data.text && !data.imageUrl) return null;
  const imageFirst = data.layout === "IMAGE_LEFT";
  const textOnly = data.layout === "TEXT_ONLY" || !data.imageUrl;

  const heading = data.title && (
    <h1
      className={`font-serif font-semibold leading-tight text-ink-900 ${
        large ? "text-4xl sm:text-5xl" : "text-3xl"
      }`}
    >
      {data.title}
    </h1>
  );
  const button = data.buttonLabel && (
    <a href={ctaHref(data.buttonTarget, data.buttonUrl)} className="btn-primary inline-flex !px-6 !py-3">
      {data.buttonLabel}
    </a>
  );

  if (textOnly) {
    return (
      <section className={large ? "bg-peach-50" : "border-t border-ink-100"}>
        <div className="container py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            {heading}
            {data.text && <p className="mt-5 whitespace-pre-line text-lg text-ink-700">{data.text}</p>}
            {button && <div className="mt-7">{button}</div>}
          </div>
        </div>
      </section>
    );
  }

  const textBlock = (
    <div className="flex flex-1 flex-col justify-center gap-5">
      {heading}
      {data.text && <p className="whitespace-pre-line text-lg text-ink-700">{data.text}</p>}
      {button && <div>{button}</div>}
    </div>
  );
  const imageBlock = (
    <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-[2rem] bg-mist-100 sm:aspect-[4/3]">
      <Image src={data.imageUrl!} alt="" fill priority={large} className="object-cover" />
    </div>
  );

  return (
    <section className={large ? "bg-peach-50" : "border-t border-ink-100"}>
      <div className="container py-16 sm:py-24">
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-14">
          {imageFirst ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
