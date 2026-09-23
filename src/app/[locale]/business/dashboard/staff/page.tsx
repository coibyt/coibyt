import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { StaffManager } from "@/components/staff-manager";

export default async function StaffPage() {
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  const [staff, services] = await Promise.all([
    prisma.staff.findMany({
      where: { businessId: business.id },
      include: { services: { select: { serviceId: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.service.findMany({ where: { businessId: business.id, active: true } }),
  ]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("staff")}</h1>
      <StaffManager
        initialStaff={staff.map((s) => ({
          ...s,
          serviceIds: s.services.map((x) => x.serviceId),
        }))}
        serviceOptions={services.map((s) => ({ id: s.id, name: s.name }))}
      />
    </div>
  );
}
