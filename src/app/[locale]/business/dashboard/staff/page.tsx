import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { StaffManager } from "@/components/staff-manager";
import { staffInsights } from "@/lib/staff-dashboard";
import { siteSerif } from "@/lib/site-fonts";

export default async function StaffPage({
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

  const [staff, services] = await Promise.all([
    prisma.staff.findMany({
      where: { businessId: owned.businessId },
      include: {
        services: { select: { serviceId: true } },
        user: { select: { email: true } },
        avatar: { select: { id: true, updatedAt: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({ where: { businessId: owned.businessId, active: true } }),
  ]);
  const business = await prisma.business.findUniqueOrThrow({
    where: { id: owned.businessId },
    select: { timezone: true, defaultCurrency: true },
  });
  // Other branches each person also works at (Staff.branchGroup).
  const groups = staff.map((s) => s.branchGroup).filter((g): g is string => !!g);
  const elsewhere = groups.length
    ? await prisma.staff.findMany({
        where: { branchGroup: { in: groups }, active: true, businessId: { not: owned.businessId } },
        select: { branchGroup: true, business: { select: { name: true } } },
      })
    : [];
  const insights = await staffInsights(
    owned.businessId,
    staff.map((s) => s.id),
    business.timezone
  );

  return (
    <div className={siteSerif.variable}>
      <StaffManager
        initialStaff={staff.map((s) => ({
          id: s.id,
          name: s.name,
          title: s.title,
          bio: s.bio,
          avatarUrl: s.avatar ? `/api/staff-avatar/${s.id}?v=${s.avatar.updatedAt.getTime()}` : null,
          active: s.active,
          serviceIds: s.services.map((x) => x.serviceId),
          email: s.user?.email ?? null,
          canViewServices: s.canViewServices,
          canViewProducts: s.canViewProducts,
          canViewBookings: s.canViewBookings,
          canViewCustomers: s.canViewCustomers,
          canViewHours: s.canViewHours,
          canViewReviews: s.canViewReviews,
          canViewCustomerContactInfo: s.canViewCustomerContactInfo,
          canViewAllBookings: s.canViewAllBookings,
          canViewAllPagesReadOnly: s.canViewAllPagesReadOnly,
          leadTimeMinutes: s.leadTimeMinutes,
          staffMessage: s.staffMessage,
          videoUrls: Array.isArray(s.videoUrls) ? (s.videoUrls as string[]) : [],
          otherBranches: s.branchGroup ? elsewhere.filter((e) => e.branchGroup === s.branchGroup).map((e) => e.business.name) : [],
        }))}
        serviceOptions={services.map((s) => ({ id: s.id, name: s.name }))}
        insights={insights}
        currency={business.defaultCurrency}
        timezone={business.timezone}
      />
    </div>
  );
}
