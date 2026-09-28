import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";

interface SectionData {
  layout: string;
  title: string | null;
  text: string | null;
  buttonLabel: string | null;
  buttonTarget: string;
  buttonUrl: string | null;
  imageUrl: string | null;
}

export default async function BusinessLandingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      logoUrl: true,
      status: true,
      landingPage: {
        include: {
          images: true,
          highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
        },
      },
    },
  });

  if (!business || business.status !== "APPROVED" || !business.landingPage?.published) {
    notFound();
  }
  const landing = business.landingPage;

  const imageUrl = (slot: string) =>
    landing.images.some((i) => i.slot === slot) ? `/api/landing-image/${landing.id}/${slot}` : null;

  const bookingHref = `/b/${slug}`;
  const ctaHref = (target: string, url: string | null) =>
    target === "URL" && url ? url : bookingHref;

  const hero: SectionData = {
    layout: landing.heroLayout,
    title: landing.heroTitle,
    text: landing.heroText,
    buttonLabel: landing.heroButtonLabel,
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

  return (
    <div>
      <div className="border-b border-ink-100 bg-white">
        <div className="container flex items-center gap-3 py-4">
          {business.logoUrl && (
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-mist-100">
              <Image src={business.logoUrl} alt="" fill className="object-contain" />
            </div>
          )}
          <span className="font-bold text-ink-900">{business.name}</span>
        </div>
      </div>

      <LandingSection data={hero} ctaHref={ctaHref} large />

      {landing.introEnabled && <LandingSection data={intro} ctaHref={ctaHref} />}

      {landing.highlightsEnabled && landing.highlights.length > 0 && (
        <section className="container py-14">
          {landing.highlightsTitle && (
            <h2 className="mb-8 text-center text-2xl font-bold text-ink-900">
              {landing.highlightsTitle}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landing.highlights.map((h) => {
              const hImg = imageUrl(h.id);
              return (
                <div key={h.id} className="card overflow-hidden">
                  {hImg && (
                    <div className="relative aspect-video w-full bg-mist-100">
                      <Image src={hImg} alt="" fill className="object-cover" />
                    </div>
                  )}
                  <div className="space-y-2 p-5">
                    <p className="font-bold text-ink-900">{h.title}</p>
                    {h.description && <p className="text-sm text-ink-700">{h.description}</p>}
                    {h.buttonLabel && (
                      <LinkOrExternal
                        href={ctaHref(h.buttonTarget, h.buttonUrl)}
                        className="font-medium text-primary-600 hover:underline"
                      >
                        {h.buttonLabel}
                      </LinkOrExternal>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="border-t border-ink-100 bg-mist-50 py-6 text-center">
        <Link href={bookingHref} className="btn-primary">
          {locale === "vi" ? "Xem trang đặt lịch đầy đủ" : "View the full booking page"}
        </Link>
      </div>
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
    <h1 className={`font-extrabold text-ink-900 ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
      {data.title}
    </h1>
  );
  const button = data.buttonLabel && (
    <LinkOrExternal href={ctaHref(data.buttonTarget, data.buttonUrl)} className="btn-primary inline-flex">
      {data.buttonLabel}
    </LinkOrExternal>
  );

  if (textOnly) {
    return (
      <section className={`container py-12 sm:py-16 ${large ? "" : "border-t border-ink-100"}`}>
        <div className="mx-auto max-w-2xl text-center">
          {heading}
          {data.text && <p className="mt-4 whitespace-pre-line text-ink-700">{data.text}</p>}
          {button && <div className="mt-5">{button}</div>}
        </div>
      </section>
    );
  }

  const textBlock = (
    <div className="flex flex-1 flex-col justify-center gap-4">
      {heading}
      {data.text && <p className="whitespace-pre-line text-ink-700">{data.text}</p>}
      {button && <div>{button}</div>}
    </div>
  );
  const imageBlock = (
    <div className="relative aspect-square flex-1 overflow-hidden rounded-3xl bg-mist-100 sm:aspect-[4/3]">
      <Image src={data.imageUrl!} alt="" fill className="object-cover" />
    </div>
  );

  return (
    <section className={`container py-12 sm:py-16 ${large ? "" : "border-t border-ink-100"}`}>
      <div className="flex flex-col items-center gap-8 sm:flex-row">
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
    </section>
  );
}

function LinkOrExternal({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
