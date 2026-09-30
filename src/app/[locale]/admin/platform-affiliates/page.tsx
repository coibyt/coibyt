import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PlatformAffiliatesManager } from "@/components/platform-affiliates-manager";

export default async function AdminPlatformAffiliatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect({ href: "/", locale });
    return null;
  }
  const t = await getTranslations("admin");

  const affiliates = await prisma.platformAffiliate.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  const referredCounts = await prisma.business.groupBy({
    by: ["referredByAffiliateId"],
    where: { referredByAffiliateId: { in: affiliates.map((a) => a.id) } },
    _count: true,
  });
  const referredByAffiliate = new Map(referredCounts.map((r) => [r.referredByAffiliateId, r._count]));

  const commissionStats = await prisma.booking.groupBy({
    by: ["platformAffiliateId", "currency"],
    where: {
      platformAffiliateId: { in: affiliates.map((a) => a.id) },
      status: { in: ["CONFIRMED", "COMPLETED"] },
    },
    _sum: { platformAffiliateCommissionCents: true },
  });
  const commissionsByAffiliate = new Map<string, { currency: string; commissionCents: number }[]>();
  for (const row of commissionStats) {
    if (!row.platformAffiliateId) continue;
    const list = commissionsByAffiliate.get(row.platformAffiliateId) ?? [];
    list.push({ currency: row.currency, commissionCents: row._sum.platformAffiliateCommissionCents ?? 0 });
    commissionsByAffiliate.set(row.platformAffiliateId, list);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-ink-900">{t("platformAffiliatesPage.title")}</h1>
        <p className="mt-1 text-sm text-ink-400">{t("platformAffiliatesPage.hint")}</p>
      </div>
      <PlatformAffiliatesManager
        initialAffiliates={affiliates.map((a) => ({
          id: a.id,
          name: a.name,
          code: a.code,
          commissionPercent: a.commissionPercent,
          referredBusinessCount: referredByAffiliate.get(a.id) ?? 0,
          commissions: commissionsByAffiliate.get(a.id) ?? [],
        }))}
        locale={locale}
        linkBase={`${siteUrl}/${locale}/business`}
      />
    </div>
  );
}
