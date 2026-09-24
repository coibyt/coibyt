import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { CustomerBookingsList } from "@/components/customer-bookings-list";

export default async function MyBookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect({ href: "/auth/sign-in?callbackUrl=/account/bookings", locale });

  const t = await getTranslations("booking");

  const bookings = await prisma.booking.findMany({
    where: { customerId: session!.user.id },
    include: {
      business: {
        select: {
          name: true,
          slug: true,
          timezone: true,
          addressLine: true,
          city: true,
          phone: true,
          googleMapsUrl: true,
          cancellationPolicy: true,
          cancellationWindowHours: true,
        },
      },
      service: { select: { name: true } },
      staff: { select: { name: true } },
      review: { select: { id: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="mb-6 text-xl font-bold text-ink-900">{t("myBookingsTitle")}</h1>
      {bookings.length === 0 ? (
        <p className="text-sm text-ink-400">{t("empty")}</p>
      ) : (
        <CustomerBookingsList
          bookings={bookings.map((b) => ({
            id: b.id,
            startsAt: b.startsAt.toISOString(),
            status: b.status,
            priceCents: b.priceCents,
            currency: b.currency,
            businessName: b.business.name,
            businessSlug: b.business.slug,
            businessTimezone: b.business.timezone,
            businessAddress: [b.business.addressLine, b.business.city].filter(Boolean).join(", ") || null,
            businessPhone: b.business.phone,
            businessGoogleMapsUrl: b.business.googleMapsUrl,
            cancellationPolicy: b.business.cancellationPolicy,
            cancellationWindowHours: b.business.cancellationWindowHours,
            staffName: b.staff?.name ?? null,
            serviceName: b.service.name,
            hasReview: !!b.review,
          }))}
          locale={locale}
        />
      )}
    </div>
  );
}
