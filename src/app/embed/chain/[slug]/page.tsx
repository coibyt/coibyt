import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { EmbedTopBar } from "@/components/embed-topbar";
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
    select: { id: true, slug: true, name: true, logoUrl: true, addressLine: true, city: true },
  });

  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(anchor.defaultLocale)
      ? anchor.defaultLocale
      : routing.defaultLocale;

  return (
    <div className="mx-auto max-w-xl p-4">
      <EmbedTopBar locale={locale} />
      <EmbedBookingProgress
        locale={locale}
        steps={[
          { state: "current" },
          { state: "upcoming" },
          { state: "upcoming" },
          { state: "upcoming" },
        ]}
      />
      <h1 className="mb-4 text-lg font-bold text-ink-900">{HEADINGS[locale] ?? HEADINGS.en}</h1>
      <div className="space-y-3">
        {branches.map((b) => (
          <a
            key={b.id}
            href={`/embed/${b.slug}?locale=${locale}&chain=${encodeURIComponent(slug)}`}
            className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-4 transition-colors hover:border-ink-400"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-lg font-bold text-primary-500">
              {b.logoUrl ? (
                <Image
                  src={b.logoUrl}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              ) : (
                b.name.charAt(0)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink-900">{b.name}</p>
              {(b.addressLine || b.city) && (
                <p className="truncate text-sm text-ink-400">
                  {[b.addressLine, b.city].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-primary-500" />
          </a>
        ))}
      </div>
    </div>
  );
}
