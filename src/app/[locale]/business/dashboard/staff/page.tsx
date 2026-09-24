import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { StaffManager } from "@/components/staff-manager";

export default async function StaffPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOnly();
  const t = await getTranslations("business");
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
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({ where: { businessId: owned.businessId, active: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("staff")}</h1>
      <StaffManager
        initialStaff={staff.map((s) => ({
          id: s.id,
          name: s.name,
          title: s.title,
          bio: s.bio,
          active: s.active,
          serviceIds: s.services.map((x) => x.serviceId),
          email: s.user?.email ?? null,
          canViewServices: s.canViewServices,
          canViewBookings: s.canViewBookings,
          canViewCustomers: s.canViewCustomers,
          canViewHours: s.canViewHours,
          canViewReviews: s.canViewReviews,
          leadTimeMinutes: s.leadTimeMinutes,
          staffMessage: s.staffMessage,
          videoUrls: Array.isArray(s.videoUrls) ? (s.videoUrls as string[]) : [],
        }))}
        serviceOptions={services.map((s) => ({ id: s.id, name: s.name }))}
      />
    </div>
  );
}
