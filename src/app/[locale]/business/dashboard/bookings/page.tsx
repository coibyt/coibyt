import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { BookingsManager } from "@/components/bookings-manager";

export default async function BusinessBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  const bookings = await prisma.booking.findMany({
    where: { businessId: business.id },
    include: {
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { startsAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("bookings")}</h1>
      <BookingsManager
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
      />
    </div>
  );
}
