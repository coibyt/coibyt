import { redirect, Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { segmentCounts } from "@/lib/marketing-recipients";
import { sendDueCampaigns } from "@/lib/marketing-send";
import { siteSerif } from "@/lib/site-fonts";
import { MarketingStudio } from "@/components/marketing-studio";
import { VaraPointsPanel } from "@/components/vara-points-panel";
import { ReadOnlyBanner } from "@/components/read-only-banner";
import { Users } from "lucide-react";

export default async function MarketingDashboardPage({
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
  const t = await getTranslations("dashboard");

  // Scheduled campaigns whose time has come, in case the cron isn't set up.
  await sendDueCampaigns(owned.businessId).catch(() => 0);
  const [counts, business] = await Promise.all([
    segmentCounts(owned.businessId),
    prisma.business.findUniqueOrThrow({ where: { id: owned.businessId }, select: { name: true, logoUrl: true } }),
  ]);

  return (
    <div className={`${siteSerif.variable} space-y-6`}>
      {!owned.isOwner && <ReadOnlyBanner locale={locale} />}
      <div className="flex justify-end">
        <Link href="/business/dashboard/marketing/affiliates" className="btn-outline !px-3 !py-1.5 text-xs">
          <Users className="h-3.5 w-3.5" /> {t("affiliatesPage.title")}
        </Link>
      </div>
      <MarketingStudio locale={locale} isOwner={owned.isOwner} initialCounts={counts} salon={business} />
      <div id="vara-points" className="scroll-mt-24">
        <VaraPointsPanel locale={locale} />
      </div>
    </div>
  );
}
