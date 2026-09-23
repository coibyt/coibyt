import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { BookingWidget } from "@/components/booking-widget";

export default async function BookServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; serviceId: string }>;
}) {
  const { locale, slug, serviceId } = await params;

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { id: true, slug: true, name: true, status: true, timezone: true },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const service = await prisma.service.findFirst({
    where: { id: serviceId, businessId: business.id, active: true },
    include: {
      staff: {
        include: { staff: true },
      },
      addOns: {
        where: { addOn: { active: true } },
        include: { addOn: true },
      },
    },
  });
  if (!service) notFound();

  const staffOptions = service.staff.map((s) => s.staff).filter((s) => s.active);
  const addOnOptions = service.addOns.map((link) => ({
    id: link.addOn.id,
    name: link.addOn.name,
    priceCents: link.addOn.priceCents,
    durationMin: link.addOn.durationMin,
  }));

  return (
    <div className="container max-w-3xl py-10">
      <div className="card mb-6 flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-ink-400">{business.name}</p>
          <h1 className="text-xl font-bold text-ink-900">{service.name}</h1>
          <p className="text-sm text-ink-400">
            {service.durationMin} min
          </p>
        </div>
        <span className="text-lg font-bold text-ink-900">
          {formatMoney(service.priceCents, service.currency, locale)}
        </span>
      </div>

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
        staffOptions={staffOptions.map((s) => ({ id: s.id, name: s.name, avatarUrl: s.avatarUrl }))}
        addOnOptions={addOnOptions}
        locale={locale}
        businessTimezone={business.timezone}
      />
    </div>
  );
}
