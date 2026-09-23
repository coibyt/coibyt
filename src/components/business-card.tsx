import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BusinessCardProps {
  business: {
    slug: string;
    name: string;
    coverUrl: string | null;
    city: string | null;
    reviews: { rating: number }[];
    categories: { category: { nameVi: string; nameEn: string } }[];
  };
  locale: string;
}

export function BusinessCard({ business, locale }: BusinessCardProps) {
  const avgRating =
    business.reviews.length > 0
      ? business.reviews.reduce((s, r) => s + r.rating, 0) / business.reviews.length
      : null;
  const category = business.categories[0]?.category;

  return (
    <Link href={`/b/${business.slug}`} className="card group overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist-100">
        {business.coverUrl ? (
          <Image
            src={business.coverUrl}
            alt={business.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-peach-200 text-3xl font-extrabold text-primary-500">
            {business.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <h3 className="truncate font-semibold text-ink-900">{business.name}</h3>
        <div className="flex items-center justify-between text-xs text-ink-400">
          {category && (
            <span>{locale === "vi" ? category.nameVi : category.nameEn}</span>
          )}
          {business.city && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {business.city}
            </span>
          )}
        </div>
        {avgRating && (
          <div className="flex items-center gap-1 text-sm font-medium text-ink-900">
            <Star className="h-4 w-4 fill-coral-500 text-coral-500" />
            {avgRating.toFixed(1)}
            <span className="text-ink-400">({business.reviews.length})</span>
          </div>
        )}
      </div>
    </Link>
  );
}
