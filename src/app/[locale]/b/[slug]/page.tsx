import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Star, MapPin, Phone, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ReviewList } from "@/components/review-list";
import { ServiceSelectionList } from "@/components/service-selection-list";

const WEEKDAYS_VI = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const [t, business] = await Promise.all([
    getTranslations("business"),
    prisma.business.findUnique({
      where: { slug },
      include: {
        services: { where: { active: true }, orderBy: { createdAt: "asc" } },
        staff: { where: { active: true } },
        reviews: {
          include: { customer: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
        hours: true,
        categories: { include: { category: true } },
      },
    }),
  ]);

  if (!business || business.status !== "APPROVED") notFound();

  const avgRating =
    business.reviews.length > 0
      ? business.reviews.reduce((s, r) => s + r.rating, 0) / business.reviews.length
      : null;

  const weekdayLabels = locale === "vi" ? WEEKDAYS_VI : WEEKDAYS_EN;
  const hoursByDay = new Map(business.hours.map((h) => [h.weekday, h]));

  return (
    <div>
      <div className="relative h-56 w-full bg-mist-100 sm:h-72">
        {business.coverUrl && (
          <Image src={business.coverUrl} alt="" fill className="object-cover" />
        )}
      </div>

      <div className="container -mt-12 pb-16">
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary-100 text-2xl font-extrabold text-primary-500 ring-4 ring-white">
            {business.logoUrl ? (
              <Image src={business.logoUrl} alt="" width={80} height={80} className="h-full w-full object-cover" />
            ) : (
              business.name.charAt(0)
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-ink-900">{business.name}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-400">
              {avgRating && (
                <span className="flex items-center gap-1 font-medium text-ink-900">
                  <Star className="h-4 w-4 fill-coral-500 text-coral-500" />
                  {avgRating.toFixed(1)} ({business.reviews.length})
                </span>
              )}
              {business.categories[0] && (
                <span>
                  {locale === "vi"
                    ? business.categories[0].category.nameVi
                    : business.categories[0].category.nameEn}
                </span>
              )}
              {business.addressLine && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {business.addressLine}, {business.city}
                </span>
              )}
              {business.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" /> {business.phone}
                </span>
              )}
            </div>
            {business.description && (
              <p className="mt-3 max-w-2xl text-sm text-ink-700">{business.description}</p>
            )}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-ink-900">{t("services")}</h2>
            <ServiceSelectionList
              services={business.services}
              locale={locale}
              buildHref={(serviceId, extraServiceIds) => {
                const params = new URLSearchParams();
                if (extraServiceIds.length) params.set("extra", extraServiceIds.join(","));
                const qs = params.toString();
                return `/b/${slug}/book/${serviceId}${qs ? `?${qs}` : ""}`;
              }}
            />

            <h2 className="mb-4 mt-10 text-lg font-bold text-ink-900">
              {t("reviews")}
            </h2>
            <ReviewList reviews={business.reviews} locale={locale} />
          </div>

          <aside>
            <div className="card p-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink-900">
                <Clock className="h-4 w-4" /> {t("hours")}
              </h3>
              <ul className="space-y-1.5 text-sm">
                {weekdayLabels.map((label, idx) => {
                  const h = hoursByDay.get(idx);
                  return (
                    <li key={idx} className="flex justify-between text-ink-700">
                      <span>{label}</span>
                      <span className={h ? "" : "text-ink-400"}>
                        {h
                          ? `${minToTime(h.openMinute)} – ${minToTime(h.closeMinute)}`
                          : locale === "vi"
                            ? "Đóng cửa"
                            : "Closed"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function minToTime(min: number) {
  const h = Math.floor(min / 60)
    .toString()
    .padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
