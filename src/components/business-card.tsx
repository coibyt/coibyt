import Image from "next/image";
import { Star, MapPin, Navigation } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { categoryName } from "@/lib/category-names";
import { formatMoney } from "@/lib/money";

interface BusinessCardProps {
  business: {
    slug: string;
    name: string;
    coverUrl: string | null;
    city: string | null;
    reviews: { rating: number }[];
    categories: { category: { nameVi: string; nameEn: string } }[];
    minPriceCents?: number | null;
    currency?: string;
  };
  locale: string;
  distanceKm?: number | null;
}

export function BusinessCard({ business, locale, distanceKm = null }: BusinessCardProps) {
  const avgRating =
    business.reviews.length > 0
      ? business.reviews.reduce((s, r) => s + r.rating, 0) / business.reviews.length
      : null;
  const category = business.categories[0]?.category;
  const fromLabel = locale === "vi" ? "Từ" : locale === "fi" ? "Alk." : "From";

  return (
    <Link
      href={`/b/${business.slug}`}
      className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white transition-shadow hover:shadow-xl hover:shadow-primary-900/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist-100">
        {business.coverUrl ? (
          <Image
            src={business.coverUrl}
            alt={business.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-peach-200 text-4xl font-extrabold text-primary-500">
            {business.name.charAt(0)}
          </div>
        )}
        {avgRating && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-ink-900 shadow-sm">
            <Star className="h-3.5 w-3.5 fill-coral-500 text-coral-500" />
            {avgRating.toFixed(1)}
            <span className="font-normal text-ink-400">({business.reviews.length})</span>
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate text-base font-bold text-ink-900">{business.name}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-400">
          {category && <span className="font-medium text-primary-600">{categoryName(locale, category)}</span>}
          {business.city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {business.city}
            </span>
          )}
          {distanceKm !== null && (
            <span className="flex items-center gap-1 text-teal-600">
              <Navigation className="h-3 w-3" />
              {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`}
            </span>
          )}
        </div>
        {business.minPriceCents != null && business.currency && (
          <p className="mt-3 text-sm text-ink-700">
            {fromLabel}{" "}
            <span className="font-bold text-ink-900">{formatMoney(business.minPriceCents, business.currency, locale)}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
