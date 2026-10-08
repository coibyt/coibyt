import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOrReadOnlyViewer, getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { GiftCardsManager } from "@/components/gift-cards-manager";
import { ReadOnlyBanner } from "@/components/read-only-banner";

export default async function GiftCardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const t = await getTranslations("dashboard");
  const [services, business] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: owned.businessId, active: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    getOwnedBusiness(),
  ]);

  return (
    <div className="space-y-6">
      {!owned.isOwner && <ReadOnlyBanner locale={locale} />}
      <div>
        <h1 className="text-xl font-bold text-ink-900">{t("giftCards.nav")}</h1>
        <p className="mt-1 text-sm text-ink-400">{t("giftCards.subtitle")}</p>
      </div>
      <GiftCardsManager
        locale={locale}
        services={services}
        defaultCurrency={business?.defaultCurrency ?? "VND"}
      />
    </div>
  );
}
