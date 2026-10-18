import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { BookingWidget } from "@/components/booking-widget";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { EmbedProviders } from "@/app/embed/providers";
import { getSiteBranches } from "@/lib/site-branches";
import { EmbedSalonHeader } from "@/components/embed-salon-header";
import { EmbedFooter } from "@/components/embed-topbar";
import { Clock } from "lucide-react";

const SUMMARY: Record<string, { chosen: string; change: string }> = {
  vi: { chosen: "Dịch vụ đã chọn", change: "Đổi" },
  en: { chosen: "Your service", change: "Change" },
  fi: { chosen: "Valittu palvelu", change: "Vaihda" },
};

export default async function EmbedBookServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; serviceId: string }>;
  searchParams: Promise<{ locale?: string; extra?: string; chain?: string; date?: string; time?: string }>;
}) {
  const { slug, serviceId } = await params;
  const { locale: rawLocale, extra, chain, date, time } = await searchParams;
  const extraServiceIds = extra?.split(",").filter(Boolean) ?? [];

  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      logoUrl: true,
      coverUrl: true,
      addressLine: true,
      city: true,
      reviews: { where: { status: "APPROVED" }, select: { rating: true } },
      status: true,
      timezone: true,
      defaultLocale: true,
      ownerId: true,
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
      staff: { include: { staff: { include: { avatar: { select: { id: true, updatedAt: true } } } } } },
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

  const siblings = await getSiteBranches(business.ownerId);

  const staffOptions = service.staff.filter((s) => s.staff.active);
  const addOnOptions = service.addOns.map((link) => ({
    id: link.addOn.id,
    name: link.addOn.name,
    priceCents: link.addOn.priceCents,
    durationMin: link.addOn.durationMin,
  }));

  const step2Href = `/embed/${slug}?locale=${locale}${chain ? `&chain=${encodeURIComponent(chain)}` : ""}`;
  const sx = SUMMARY[locale] ?? SUMMARY.en;
  const intro = (
    <EmbedSalonHeader
      name={business.name}
      logoUrl={business.logoUrl}
      coverUrl={business.coverUrl}
      address={[business.addressLine, business.city].filter(Boolean).join(", ") || null}
      rating={
        business.reviews.length
          ? {
              avg: business.reviews.reduce((sum, r) => sum + r.rating, 0) / business.reviews.length,
              count: business.reviews.length,
            }
          : null
      }
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-100">{sx.chosen}</p>
          <p className="truncate font-bold text-white">
            {service.name}
            {extraServices.length > 0 && <span className="font-medium text-primary-100"> +{extraServices.length}</span>}
          </p>
          <p className="mt-0.5 flex items-center gap-2 text-xs text-primary-100">
            <Clock className="h-3.5 w-3.5" /> {service.durationMin} min
            <span aria-hidden>·</span>
            <span className="font-semibold text-white">{formatMoney(service.priceCents, service.currency, locale)}</span>
          </p>
        </div>
        <a
          href={step2Href}
          className="shrink-0 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-primary-700 transition-colors hover:bg-peach-100"
        >
          {sx.change}
        </a>
      </div>
    </EmbedSalonHeader>
  );

  return (
    <div className="mx-auto max-w-xl px-4 pb-4 pt-4">
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
          embedProgress={{
            step1Href:
              siblings.length > 1
                ? `/embed/chain/${encodeURIComponent(chain || slug)}?locale=${locale}`
                : undefined,
            step2Href,
          }}
          embedIntro={intro}
        />
      </EmbedProviders>
      <EmbedFooter locale={locale} />
    </div>
  );
}
