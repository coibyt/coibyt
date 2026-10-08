import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect, Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ServicesManager } from "@/components/services-manager";
import { Sparkles } from "lucide-react";
import { categoryName } from "@/lib/category-names";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  const tDash = await getTranslations("dashboard");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.services) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const [services, staff, groups, categories] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: business.id },
      include: {
        staff: {
          select: { staffId: true, priceCentsOverride: true, durationMinOverride: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.staff.findMany({ where: { businessId: business.id, active: true } }),
    prisma.serviceGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.category.findMany({ select: { id: true, nameVi: true, nameEn: true }, orderBy: { nameVi: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{t("services")}</h1>
        <Link
          href="/business/dashboard/services/addons"
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" /> {tDash("addOnsPage.title")}
        </Link>
      </div>
      <ServicesManager
        initialServices={services.map((s) => ({
          ...s,
          staffAssignments: s.staff.map((x) => ({
            staffId: x.staffId,
            priceCentsOverride: x.priceCentsOverride,
            durationMinOverride: x.durationMinOverride,
          })),
        }))}
        staffOptions={staff.map((s) => ({ id: s.id, name: s.name }))}
        groups={groups.map((g) => ({ id: g.id, name: g.name }))}
        categories={categories.map((c) => ({ id: c.id, name: categoryName(locale, c) }))}
        locale={locale}
        defaultCurrency={business.defaultCurrency}
      />
    </div>
  );
}
