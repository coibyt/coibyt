import { redirect, Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { getMarketingRecipients } from "@/lib/marketing-recipients";
import { MarketingComposer } from "@/components/marketing-composer";
import { VaraPointsPanel } from "@/components/vara-points-panel";
import { Users } from "lucide-react";

export default async function MarketingDashboardPage({
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

  const { eligible, cooldown } = await getMarketingRecipients(owned.businessId);
  const recipientCount = eligible.length;
  const cooldownCount = cooldown.length;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink-900">{t("marketing.nav")}</h1>
          <p className="mt-1 text-sm text-ink-400">{t("marketing.subtitle")}</p>
        </div>
        <Link
          href="/business/dashboard/marketing/affiliates"
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          <Users className="h-3.5 w-3.5" /> {t("affiliatesPage.title")}
        </Link>
      </div>
      <VaraPointsPanel locale={locale} />
      <MarketingComposer initialRecipientCount={recipientCount} initialCooldownCount={cooldownCount} />
    </div>
  );
}
