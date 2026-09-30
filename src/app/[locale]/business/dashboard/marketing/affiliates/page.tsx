import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { AffiliatesManager } from "@/components/affiliates-manager";

export default async function AffiliatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const tDash = await getTranslations("dashboard");
  if (!access?.isOwner) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const affiliates = await prisma.affiliate.findMany({
    where: { businessId: business.id, active: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = await prisma.booking.groupBy({
    by: ["affiliateId"],
    where: {
      businessId: business.id,
      affiliateId: { in: affiliates.map((a) => a.id) },
      status: { in: ["CONFIRMED", "COMPLETED"] },
    },
    _count: true,
    _sum: { affiliateCommissionCents: true },
  });
  const statsByAffiliate = new Map(
    stats.map((s) => [s.affiliateId, { bookingCount: s._count, commissionCents: s._sum.affiliateCommissionCents ?? 0 }])
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-ink-900">{tDash("affiliatesPage.title")}</h1>
        <p className="mt-1 text-sm text-ink-400">{tDash("affiliatesPage.hint")}</p>
      </div>
      <AffiliatesManager
        initialAffiliates={affiliates.map((a) => ({
          id: a.id,
          name: a.name,
          code: a.code,
          commissionPercent: a.commissionPercent,
          bookingCount: statsByAffiliate.get(a.id)?.bookingCount ?? 0,
          commissionCents: statsByAffiliate.get(a.id)?.commissionCents ?? 0,
        }))}
        locale={locale}
        currency={business.defaultCurrency}
        linkBase={`${siteUrl}/${locale}/b/${business.slug}`}
      />
    </div>
  );
}
