import { bookingStaffScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BookingsView } from "@/components/bookings-view";
import { resolveTheme } from "@/lib/seasonal-themes";
import { seesBookingContact } from "@/lib/contact-visibility";

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
  const scopeStaffId = bookingStaffScope(access);

  const [bookings, staff, services, addOns] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId: business.id, ...(scopeStaffId ? { staffId: scopeStaffId } : {}) },
      include: {
        service: { select: { name: true } },
        staff: { select: { name: true } },
        customer: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { startsAt: "desc" },
      take: 100,
    }),
    prisma.staff.findMany({
      where: {
        businessId: business.id,
        active: true,
        ...(scopeStaffId ? { id: scopeStaffId } : {}),
      },
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
        staff: { select: { staffId: true, priceCentsOverride: true } },
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
          staffId: b.staffId,
          staffName: b.staff?.name ?? null,
          customerName: b.customer.name,
          customerPhone: seesBookingContact(access, { startsAt: b.startsAt, staffId: b.staffId }, business.timezone) ? b.customer.phone : null,
        }))}
        locale={locale}
        businessTimezone={business.timezone}
        look={(() => {
          // The holiday theme (when the owner shows it here) and the booking colours:
          // the owner's own, else the theme's, else the default.
          const theme = business.themeOnCalendar ? resolveTheme(business.seasonalTheme, business.timezone) : null;
          const own = business.calendarBookingBg && business.calendarBookingText ? { bg: business.calendarBookingBg, text: business.calendarBookingText } : null;
          return { theme, colors: own ?? theme?.booking ?? null };
        })()}
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
          // A staff member's own price for it, where they have one.
          staffPrices: Object.fromEntries(s.staff.filter((x) => x.priceCentsOverride !== null).map((x) => [x.staffId, x.priceCentsOverride!])),
        }))}
        addOns={addOns.map((a) => ({
          id: a.id,
          name: a.name,
          priceCents: a.priceCents,
          durationMin: a.durationMin,
          serviceIds: a.services.map((x) => x.serviceId),
        }))}
        isOwner={access.isOwner}
        viewerStaffId={access.staffId ?? null}
        businessId={business.id}
      />
    </div>
  );
}
