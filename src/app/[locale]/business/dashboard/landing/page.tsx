import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { LandingPublishCard } from "@/components/landing-publish-card";
import { LandingEditor } from "@/components/landing-editor";

export default async function LandingDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const t = await getTranslations("dashboard");
  const business = await prisma.business.findUniqueOrThrow({
    where: { id: owned.businessId },
    select: { slug: true },
  });

  const landing = await prisma.landingPage.upsert({
    where: { businessId: owned.businessId },
    update: {},
    create: { businessId: owned.businessId },
    include: {
      highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
      images: true,
    },
  });

  const imageUrl = (slot: string) => {
    const has = landing.images.some((i) => i.slot === slot);
    return has ? `/api/landing-image/${landing.id}/${slot}` : null;
  };

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-ink-900">{t("landing.nav")}</h1>
      <LandingPublishCard slug={business.slug} initialPublished={landing.published} />
      <LandingEditor
        landing={{
          id: landing.id,
          heroLayout: landing.heroLayout as "IMAGE_RIGHT" | "IMAGE_LEFT" | "TEXT_ONLY",
          heroTitle: landing.heroTitle,
          heroText: landing.heroText,
          heroButtonLabel: landing.heroButtonLabel,
          heroButtonTarget: landing.heroButtonTarget as "BOOKING" | "URL",
          heroButtonUrl: landing.heroButtonUrl,
          introEnabled: landing.introEnabled,
          introLayout: landing.introLayout as "IMAGE_RIGHT" | "IMAGE_LEFT" | "TEXT_ONLY",
          introTitle: landing.introTitle,
          introText: landing.introText,
          introButtonLabel: landing.introButtonLabel,
          introButtonTarget: landing.introButtonTarget as "BOOKING" | "URL",
          introButtonUrl: landing.introButtonUrl,
          highlightsEnabled: landing.highlightsEnabled,
          highlightsTitle: landing.highlightsTitle,
          heroImageUrl: imageUrl("hero"),
          introImageUrl: imageUrl("intro"),
          highlights: landing.highlights.map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
            buttonLabel: h.buttonLabel,
            buttonTarget: h.buttonTarget as "BOOKING" | "URL",
            buttonUrl: h.buttonUrl,
            imageUrl: imageUrl(h.id),
          })),
        }}
      />
    </div>
  );
}
