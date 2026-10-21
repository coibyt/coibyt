import { redirect } from "@/i18n/navigation";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { isSiteTheme } from "@/lib/site-theme";
import { LandingPublishCard } from "@/components/landing-publish-card";
import { LandingEditor } from "@/components/landing-editor";
import type { LandingLayout } from "@/components/landing-section-card";
import { ReadOnlyBanner } from "@/components/read-only-banner";

export default async function LandingDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const business = await prisma.business.findUniqueOrThrow({
    where: { id: owned.businessId },
    select: { slug: true },
  });

  const [landing, services, staff, reviews] = await Promise.all([
    prisma.landingPage.upsert({
      where: { businessId: owned.businessId },
      update: {},
      create: { businessId: owned.businessId },
      include: {
        highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
        images: { select: { slot: true, updatedAt: true } },
      },
    }),
    prisma.service.count({ where: { businessId: owned.businessId, active: true } }),
    prisma.staff.count({ where: { businessId: owned.businessId, active: true } }),
    prisma.review.count({ where: { businessId: owned.businessId, status: "APPROVED", comment: { not: null } } }),
  ]);

  const imageUrl = (slot: string) => {
    const img = landing.images.find((i) => i.slot === slot);
    return img ? `/api/landing-image/${landing.id}/${slot}?v=${img.updatedAt.getTime()}` : null;
  };

  return (
    <div className="space-y-6">
      {!owned.isOwner && <ReadOnlyBanner locale={locale} />}
      <LandingPublishCard slug={business.slug} initialPublished={landing.published} readOnly={!owned.isOwner} />
      <LandingEditor
        landing={{
          id: landing.id,
          theme: isSiteTheme(landing.theme) ? landing.theme : "ROSE",
          heroLayout: landing.heroLayout as LandingLayout,
          heroEyebrow: landing.heroEyebrow,
          heroTitle: landing.heroTitle,
          heroText: landing.heroText,
          heroButtonLabel: landing.heroButtonLabel,
          heroButtonTarget: landing.heroButtonTarget as "BOOKING" | "URL",
          heroButtonUrl: landing.heroButtonUrl,
          introEnabled: landing.introEnabled,
          introLayout: landing.introLayout as LandingLayout,
          introTitle: landing.introTitle,
          introText: landing.introText,
          introButtonLabel: landing.introButtonLabel,
          introButtonTarget: landing.introButtonTarget as "BOOKING" | "URL",
          introButtonUrl: landing.introButtonUrl,
          highlightsEnabled: landing.highlightsEnabled,
          highlightsTitle: landing.highlightsTitle,
          servicesEnabled: landing.servicesEnabled,
          servicesTitle: landing.servicesTitle,
          teamEnabled: landing.teamEnabled,
          reviewsEnabled: landing.reviewsEnabled,
          galleryEnabled: landing.galleryEnabled,
          galleryTitle: landing.galleryTitle,
          heroImageUrl: imageUrl("hero"),
          heroSlideUrls: [0, 1, 2, 3, 4].map((i) => imageUrl(`hero-slide-${i}`)),
          introImageUrl: imageUrl("intro"),
          galleryUrls: Array.from({ length: 8 }, (_, i) => imageUrl(`gallery-${i}`)),
          highlights: landing.highlights.map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            buttonLabel: h.buttonLabel,
            buttonTarget: h.buttonTarget as "BOOKING" | "URL",
            buttonUrl: h.buttonUrl,
            imageUrl: imageUrl(h.id),
          })),
          counts: { services, staff, reviews },
        }}
      />
    </div>
  );
}
