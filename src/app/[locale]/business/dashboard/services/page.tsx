import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { ServicesManager } from "@/components/services-manager";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  const [services, staff, categories] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: business.id },
      include: { staff: { select: { staffId: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.staff.findMany({ where: { businessId: business.id, active: true } }),
    prisma.category.findMany(),
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{t("services")}</h1>
      </div>
      <ServicesManager
        initialServices={services.map((s) => ({
          ...s,
          staffIds: s.staff.map((x) => x.staffId),
        }))}
        staffOptions={staff.map((s) => ({ id: s.id, name: s.name }))}
        categories={categories.map((c) => ({
          id: c.id,
          name: locale === "vi" ? c.nameVi : c.nameEn,
        }))}
        locale={locale}
        defaultCurrency={business.defaultCurrency}
      />
    </div>
  );
}
