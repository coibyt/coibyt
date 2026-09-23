import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";

export default async function EmbedBusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;
  const locale = isValidLocale(rawLocale) ? rawLocale : routing.defaultLocale;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: { services: { where: { active: true }, orderBy: { createdAt: "asc" } } },
  });
  if (!business || business.status !== "APPROVED") notFound();

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100 text-lg font-bold text-primary-500">
          {business.logoUrl ? (
            <Image
              src={business.logoUrl}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            business.name.charAt(0)
          )}
        </div>
        <h1 className="text-lg font-bold text-ink-900">{business.name}</h1>
      </div>

      <div className="space-y-3">
        {business.services.map((s) => (
          <div key={s.id} className="card flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-ink-900">{s.name}</p>
              <p className="mt-1 text-xs text-ink-400">{s.durationMin} min</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="font-semibold text-ink-900">
                {formatMoney(s.priceCents, s.currency, locale)}
              </span>
              <a
                href={`/embed/${slug}/book/${s.id}?locale=${locale}`}
                className="btn-accent !px-4 !py-2 text-xs"
              >
                {locale === "vi" ? "Đặt lịch" : "Book now"}
              </a>
            </div>
          </div>
        ))}
        {business.services.length === 0 && (
          <p className="text-sm text-ink-400">
            {locale === "vi" ? "Chưa có dịch vụ nào." : "No services yet."}
          </p>
        )}
      </div>
    </div>
  );
}
