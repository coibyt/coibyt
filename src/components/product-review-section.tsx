"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductReviewList } from "@/components/product-review-list";
import { ProductReviewModal } from "@/components/product-review-modal";

interface ProductReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  customer: { name: string; image: string | null };
  images: { id: string }[];
}

export function ProductReviewSection({
  productId,
  reviews,
  alreadyReviewed,
  businessSlug,
}: {
  productId: string;
  reviews: ProductReviewItem[];
  alreadyReviewed: boolean;
  businessSlug: string;
}) {
  const { status } = useSession();
  const t = useTranslations("business.productsPage");
  const [showModal, setShowModal] = useState(false);

  const avgRating =
    reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
          {avgRating && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-coral-500 text-coral-500" />
              {avgRating.toFixed(1)}
            </span>
          )}
          {t("ratingCount", { count: reviews.length })}
        </h2>
        {status === "authenticated" && !alreadyReviewed && (
          <button onClick={() => setShowModal(true)} className="btn-outline !px-3 !py-1.5 text-xs">
            {t("writeReview")}
          </button>
        )}
        {status !== "authenticated" && (
          <Link
            href={`/auth/sign-in?callbackUrl=/b/${businessSlug}/products/${productId}`}
            className="text-xs font-medium text-primary-600 hover:underline"
          >
            {t("signInToReview")}
          </Link>
        )}
      </div>

      <ProductReviewList reviews={reviews} />

      {showModal && <ProductReviewModal productId={productId} onClose={() => setShowModal(false)} />}
    </div>
  );
}
