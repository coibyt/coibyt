import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { ServicesManager, type ServiceStats } from "@/components/services-manager";
import { categoryName } from "@/lib/category-names";
import { siteSerif } from "@/lib/site-fonts";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.services) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [services, staff, groups, categories, booked, addOnLinks] = await Promise.all([
    prisma.service.findMany({
      where: { businessId: business.id },
      include: {
        staff: {
          select: { staffId: true, priceCentsOverride: true, durationMinOverride: true },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.staff.findMany({ where: { businessId: business.id, active: true } }),
    prisma.serviceGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.category.findMany({ select: { id: true, nameVi: true, nameEn: true }, orderBy: { nameVi: "asc" } }),
    // How each service has sold over the last 30 days.
    prisma.booking.groupBy({
      by: ["serviceId"],
      where: { businessId: business.id, status: { in: ["CONFIRMED", "COMPLETED"] }, startsAt: { gte: since } },
      _count: true,
      _sum: { priceCents: true },
    }),
    prisma.serviceAddOnLink.groupBy({
      by: ["serviceId"],
      where: { service: { businessId: business.id } },
      _count: true,
    }),
  ]);

  const stats: Record<string, ServiceStats> = {};
  for (const s of services) stats[s.id] = { bookings: 0, revenueCents: 0, addOns: 0 };
  for (const b of booked) if (stats[b.serviceId]) Object.assign(stats[b.serviceId], { bookings: b._count, revenueCents: b._sum.priceCents ?? 0 });
  for (const a of addOnLinks) if (stats[a.serviceId]) stats[a.serviceId].addOns = a._count;

  return (
    <div className={siteSerif.variable}>
      <ServicesManager
        initialServices={services.map((s) => ({
          ...s,
          staffAssignments: s.staff.map((x) => ({
            staffId: x.staffId,
            priceCentsOverride: x.priceCentsOverride,
            durationMinOverride: x.durationMinOverride,
          })),
        }))}
        staffOptions={staff.map((s) => ({ id: s.id, name: s.name, avatarUrl: s.avatarUrl }))}
        groups={groups.map((g) => ({ id: g.id, name: g.name }))}
        categories={categories.map((c) => ({ id: c.id, name: categoryName(locale, c) }))}
        stats={stats}
        locale={locale}
        defaultCurrency={business.defaultCurrency}
        canReorder={access.isOwner}
        canEdit={access.isOwner}
      />
    </div>
  );
}
