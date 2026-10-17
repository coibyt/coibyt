import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOrReadOnlyViewer, getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { GiftCardsManager } from "@/components/gift-cards-manager";
import { ReadOnlyBanner } from "@/components/read-only-banner";

export default async function GiftCardsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { locale } = await params;
  const { code } = await searchParams;

  const session = await auth();
  if (!session?.user) {
    // The QR on an emailed gift card opens this page — scanned while signed
    // out, come back here after signing in with the code still filled in.
    const back = `/business/dashboard/gift-cards${code ? `?code=${encodeURIComponent(code)}` : ""}`;
    redirect({ href: `/auth/sign-in?callbackUrl=${encodeURIComponent(back)}`, locale });
    return null;
  }

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
        businessName={business?.name ?? ""}
        initialCode={code ?? ""}
      />
    </div>
  );
}
