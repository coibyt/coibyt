import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ChevronLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { BookingWidget } from "@/components/booking-widget";
import { AffiliateCookieSetter } from "@/components/affiliate-cookie-setter";

export default async function BookServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string; serviceId: string }>;
  searchParams: Promise<{ extra?: string; date?: string; time?: string }>;
}) {
  const { locale, slug, serviceId } = await params;
  const { extra, date, time } = await searchParams;
  const extraServiceIds = extra?.split(",").filter(Boolean) ?? [];

  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      status: true,
      logoUrl: true,
      timezone: true,
      bankName: true,
      bankAccountNumber: true,
      bankAccountName: true,
      bankBic: true,
      cancellationPolicy: true,
      cancellationWindowHours: true,
    },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const service = await prisma.service.findFirst({
    where: { id: serviceId, businessId: business.id, active: true },
    include: {
      staff: {
        include: { staff: { include: { avatar: { select: { id: true, updatedAt: true } } } } },
      },
      addOns: {
        where: { addOn: { active: true } },
        include: { addOn: true },
      },
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
    <div className="min-h-screen bg-mist-50">
      <div className="container max-w-3xl pb-10 pt-6 sm:pt-10">
      <Suspense fallback={null}>
        <AffiliateCookieSetter businessId={business.id} />
      </Suspense>
      <Link
        href={`/b/${business.slug}`}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-primary-600"
      >
        <ChevronLeft className="h-4 w-4" />
        {business.name}
      </Link>
      <div className="relative mb-5 overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 text-white shadow-xl shadow-primary-900/10 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-coral-400/25 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-xl font-extrabold text-primary-600">
            {business.logoUrl ? (
              <Image src={business.logoUrl} alt="" width={56} height={56} className="h-full w-full object-contain" />
            ) : (
              business.name.charAt(0)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-primary-100">{business.name}</p>
            <h1 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">{service.name}</h1>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-primary-100">
              <Clock className="h-3.5 w-3.5" />
              {service.durationMin} min
            </p>
          </div>
          <span className="shrink-0 text-xl font-extrabold text-peach-200 sm:text-2xl">
            {formatMoney(service.priceCents, service.currency, locale)}
          </span>
        </div>
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
        staffOptions={staffOptions.map((link) => ({
          id: link.staff.id,
          name: link.staff.name,
          avatarUrl: link.staff.avatar
            ? `/api/staff-avatar/${link.staff.id}?v=${link.staff.avatar.updatedAt.getTime()}`
            : null,
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
        initialDate={date}
        initialTime={time}
      />
      </div>
    </div>
  );
}
