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

  const [bookings, staff, services] = await Promise.all([
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
      select: { id: true, name: true },
    }),
    prisma.service.findMany({
      where: { businessId: business.id, active: true },
      select: { id: true, name: true, durationMin: true, priceCents: true, currency: true },
    }),
  ]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("bookings")}</h1>
      <BookingsView
        initialBookings={bookings.map((b) => ({
          id: b.id,
          startsAt: b.startsAt.toISOString(),
          status: b.status,
          priceCents: b.priceCents,
          currency: b.currency,
          serviceName: b.service.name,
          staffName: b.staff?.name ?? null,
          customerName: b.customer.name,
          customerPhone: b.customer.phone,
        }))}
        locale={locale}
        businessTimezone={business.timezone}
        staff={staff}
        services={services}
      />
    </div>
  );
}
