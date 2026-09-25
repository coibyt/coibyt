import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { BookingWidget } from "@/components/booking-widget";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { EmbedProviders } from "@/app/embed/providers";

export default async function EmbedBookServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; serviceId: string }>;
  searchParams: Promise<{ locale?: string; extra?: string }>;
}) {
  const { slug, serviceId } = await params;
  const { locale: rawLocale, extra } = await searchParams;
  const extraServiceIds = extra?.split(",").filter(Boolean) ?? [];

  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      status: true,
      timezone: true,
      defaultLocale: true,
      bankName: true,
      bankAccountNumber: true,
      bankAccountName: true,
      bankBic: true,
      cancellationPolicy: true,
      cancellationWindowHours: true,
    },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(business.defaultLocale)
      ? business.defaultLocale
      : routing.defaultLocale;

  const service = await prisma.service.findFirst({
    where: { id: serviceId, businessId: business.id, active: true },
    include: {
      staff: { include: { staff: true } },
      addOns: { where: { addOn: { active: true } }, include: { addOn: true } },
    },
  });
  if (!service) notFound();

  const extraServices = extraServiceIds.length
    ? await prisma.service.findMany({
        where: { id: { in: extraServiceIds }, businessId: business.id, active: true },
        select: { id: true, name: true, priceCents: true, durationMin: true },
      })
    : [];

  const staffOptions = service.staff.filter((s) => s.staff.active);
  const addOnOptions = service.addOns.map((link) => ({
    id: link.addOn.id,
    name: link.addOn.name,
    priceCents: link.addOn.priceCents,
    durationMin: link.addOn.durationMin,
  }));

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="card mb-4 flex items-center justify-between p-4">
        <div>
          <p className="text-xs text-ink-400">{business.name}</p>
          <h1 className="text-lg font-bold text-ink-900">{service.name}</h1>
          <p className="text-xs text-ink-400">{service.durationMin} min</p>
        </div>
        <span className="font-bold text-ink-900">
          {formatMoney(service.priceCents, service.currency, locale)}
        </span>
      </div>

      <EmbedProviders requestedLocale={locale}>
        <BookingWidget
          businessSlug={business.slug}
          service={{
            id: service.id,
            name: service.name,
            priceCents: service.priceCents,
            depositCents: service.depositCents,
            currency: service.currency,
            durationMin: service.durationMin,
          }}
          staffOptions={staffOptions.map((link) => ({
            id: link.staff.id,
            name: link.staff.name,
            avatarUrl: link.staff.avatarUrl,
            priceCentsOverride: link.priceCentsOverride,
            durationMinOverride: link.durationMinOverride,
            staffMessage: link.staff.staffMessage,
            videoUrls: Array.isArray(link.staff.videoUrls) ? (link.staff.videoUrls as string[]) : [],
          }))}
          addOnOptions={addOnOptions}
          extraServices={extraServices}
          bankInfo={{
            bankName: business.bankName,
            bankAccountNumber: business.bankAccountNumber,
            bankAccountName: business.bankAccountName,
            bankBic: business.bankBic,
          }}
          cancellationPolicy={business.cancellationPolicy}
          cancellationWindowHours={business.cancellationWindowHours}
          locale={locale}
          businessTimezone={business.timezone}
        />
      </EmbedProviders>
    </div>
  );
}
