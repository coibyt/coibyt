import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronRight, MapPin, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { EmbedTopBar, EmbedFooter } from "@/components/embed-topbar";
import { EmbedBookingProgress } from "@/components/embed-booking-progress";

const HEADINGS: Record<string, string> = {
  vi: "Chọn chi nhánh",
  en: "Choose a branch",
  fi: "Valitse toimipiste",
  pl: "Wybierz oddział",
  de: "Filiale wählen",
  km: "ជ្រើសរើសសាខា",
  th: "เลือกสาขา",
};

const TEXT: Record<string, { intro: (n: number) => string; services: (n: number) => string; choose: string }> = {
  vi: {
    intro: (n) => `${n} chi nhánh — chọn nơi thuận tiện nhất cho bạn để xem dịch vụ và giờ trống.`,
    services: (n) => `${n} dịch vụ`,
    choose: "Chọn",
  },
  en: {
    intro: (n) => `${n} locations — pick the one that suits you to see services and free times.`,
    services: (n) => `${n} services`,
    choose: "Select",
  },
  fi: {
    intro: (n) => `${n} toimipistettä — valitse sinulle sopivin nähdäksesi palvelut ja vapaat ajat.`,
    services: (n) => `${n} palvelua`,
    choose: "Valitse",
  },
};

/** A salon chain's shared booking page: lists every branch of the owner
 * behind `slug` (any one of their branches works), each linking to that
 * branch's own booking widget — like Timma's "customergroup" page. */
export default async function ChainEmbedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const anchor = await prisma.business.findUnique({
    where: { slug },
    select: { ownerId: true, status: true, defaultLocale: true },
  });
  if (!anchor || anchor.status !== "APPROVED") notFound();

  const branches = await prisma.business.findMany({
    where: { ownerId: anchor.ownerId, status: "APPROVED" },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      slug: true,
      name: true,
      logoUrl: true,
      coverUrl: true,
      addressLine: true,
      city: true,
      reviews: { where: { status: "APPROVED" }, select: { rating: true } },
      _count: { select: { services: { where: { active: true } } } },
    },
  });

  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(anchor.defaultLocale)
      ? anchor.defaultLocale
      : routing.defaultLocale;
  const tx = TEXT[locale] ?? TEXT.en;

  return (
    <div className="mx-auto max-w-xl px-4 pb-4 pt-4">
      <EmbedTopBar locale={locale} />
      <EmbedBookingProgress
        locale={locale}
        steps={[{ state: "current" }, { state: "upcoming" }, { state: "upcoming" }, { state: "upcoming" }]}
      />

      <div className="mb-5">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">{HEADINGS[locale] ?? HEADINGS.en}</h1>
        <p className="mt-1 text-sm leading-relaxed text-ink-400">{tx.intro(branches.length)}</p>
      </div>

      <div className="space-y-3">
        {branches.map((b) => {
          const avg = b.reviews.length ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : null;
          const address = [b.addressLine, b.city].filter(Boolean).join(", ");
          return (
            <a
              key={b.id}
              href={`/embed/${b.slug}?locale=${locale}&chain=${encodeURIComponent(slug)}`}
              className="group flex items-center gap-4 rounded-[24px] border border-ink-100 bg-white p-3 pr-4 shadow-sm shadow-primary-900/5 transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-900/10"
            >
              <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-100 to-peach-200">
                {b.coverUrl ? (
                  <Image
                    src={b.coverUrl}
                    alt=""
                    fill
                    sizes="76px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : b.logoUrl ? (
                  <Image src={b.logoUrl} alt="" fill sizes="76px" className="bg-white object-contain p-2" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-extrabold text-primary-500">
                    {b.name.charAt(0)}
                  </span>
                )}
                {b.coverUrl && b.logoUrl && (
                  <span className="absolute bottom-1.5 left-1.5 h-7 w-7 overflow-hidden rounded-full bg-white shadow ring-2 ring-white">
                    <Image src={b.logoUrl} alt="" width={28} height={28} className="h-full w-full object-contain" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-base font-bold leading-snug text-ink-900">{b.name}</p>
                {address && (
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-400">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{address}</span>
                  </p>
                )}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                  {avg !== null && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-peach-50 px-2 py-0.5 font-semibold text-ink-900">
                      <Star className="h-3 w-3 fill-coral-500 text-coral-500" />
                      {avg.toFixed(1)}
                      <span className="font-normal text-ink-400">({b.reviews.length})</span>
                    </span>
                  )}
                  {b._count.services > 0 && (
                    <span className="rounded-full bg-mist-100 px-2 py-0.5 font-medium text-ink-700">
                      {tx.services(b._count.services)}
                    </span>
                  )}
                </div>
              </div>
              <span
                aria-label={tx.choose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </span>
            </a>
          );
        })}
      </div>

      <EmbedFooter locale={locale} />
    </div>
  );
}
