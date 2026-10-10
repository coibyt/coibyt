"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  customer: { name: string; image: string | null };
  images: { id: string }[];
}

export function ProductReviewList({ reviews }: { reviews: ProductReviewItem[] }) {
  const t = useTranslations("business.productsPage");

  if (reviews.length === 0) {
    return <p className="text-sm text-ink-400">{t("noReviewsYet")}</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="card p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
              {r.customer.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-ink-900">{r.customer.name}</p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {r.comment && <p className="mt-3 text-sm text-ink-700">{r.comment}</p>}
          {r.images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {r.images.map((img) => (
                <div key={img.id} className="h-16 w-16 overflow-hidden rounded-lg bg-mist-100">
                  <Image
                    src={`/api/product-review-image/${img.id}`}
                    alt=""
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
