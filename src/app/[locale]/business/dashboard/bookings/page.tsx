import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BookingsView } from "@/components/bookings-view";

export default async function BusinessBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.bookings) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const [bookings, staff, services, addOns] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId: business.id },
      include: {
        service: { select: { name: true } },
        staff: { select: { name: true } },
        customer: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { startsAt: "desc" },
      take: 100,
    }),
    prisma.staff.findMany({
      where: { businessId: business.id, active: true },
      select: { id: true, name: true, avatar: { select: { id: true, updatedAt: true } } },
    }),
    prisma.service.findMany({
      where: { businessId: business.id, active: true },
      select: {
        id: true,
        name: true,
        durationMin: true,
        priceCents: true,
        currency: true,
        staff: { select: { staffId: true } },
      },
    }),
    prisma.serviceAddOn.findMany({
      where: { businessId: business.id, active: true },
      select: {
        id: true,
        name: true,
        priceCents: true,
        durationMin: true,
        services: { select: { serviceId: true } },
      },
    }),
  ]);

  return (
    <div>
      <BookingsView
        title={t("bookings")}
        initialBookings={bookings.map((b) => ({
          id: b.id,
          startsAt: b.startsAt.toISOString(),
          status: b.status,
          priceCents: b.priceCents,
          currency: b.currency,
          serviceName: b.service.name,
          staffName: b.staff?.name ?? null,
          customerName: b.customer.name,
          customerPhone: access.canViewCustomerContactInfo ? b.customer.phone : null,
        }))}
        locale={locale}
        businessTimezone={business.timezone}
        staff={staff.map((s) => ({
          id: s.id,
          name: s.name,
          avatarUrl: s.avatar ? `/api/staff-avatar/${s.id}?v=${s.avatar.updatedAt.getTime()}` : null,
        }))}
        services={services.map((s) => ({
          id: s.id,
          name: s.name,
          durationMin: s.durationMin,
          priceCents: s.priceCents,
          currency: s.currency,
          staffIds: s.staff.map((x) => x.staffId),
        }))}
        addOns={addOns.map((a) => ({
          id: a.id,
          name: a.name,
          priceCents: a.priceCents,
          durationMin: a.durationMin,
          serviceIds: a.services.map((x) => x.serviceId),
        }))}
        isOwner={access.isOwner}
      />
    </div>
  );
}
