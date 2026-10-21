"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { BadgeCheck, PenLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill, shopStrings } from "@/lib/shop-strings";
import { ShopStars } from "@/components/shop-product-card";
import { ProductReviewModal } from "@/components/product-review-modal";

interface ProductReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  customer: { name: string; image: string | null };
  images: { id: string }[];
}

/** The product page's reviews: an average with a 5-to-1 star breakdown,
 * then every review with its photos. */
export function ProductReviewSection({
  productId,
  reviews,
  alreadyReviewed,
  businessSlug,
  locale,
}: {
  productId: string;
  reviews: ProductReviewItem[];
  alreadyReviewed: boolean;
  businessSlug: string;
  locale: string;
}) {
  const { status } = useSession();
  const S = shopStrings(locale);
  const [showModal, setShowModal] = useState(false);

  const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" });

  return (
    <section id="reviews" className="scroll-mt-24">
      <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">
        <span className="h-px w-8 bg-current opacity-60" />
        {S.reviewsEyebrow}
      </p>
      <h2 className="mt-3 font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{S.reviewsTitle}</h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-12">
        <div className="h-fit rounded-[2rem] bg-lp-surface p-7 ring-1 ring-lp-line lg:sticky lg:top-24">
          <div className="flex items-end gap-3">
            <span className="font-serif text-6xl font-medium leading-none text-lp-ink">{reviews.length ? avg.toFixed(1) : "–"}</span>
            <span className="pb-1 text-sm text-lp-muted">/ 5</span>
          </div>
          <div className="mt-3">
            <ShopStars rating={avg} size="h-5 w-5" />
          </div>
          <p className="mt-2 text-sm text-lp-muted">{fill(S.basedOn, { n: reviews.length })}</p>

          <ul className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const n = reviews.filter((r) => r.rating === star).length;
              const pct = reviews.length ? (n / reviews.length) * 100 : 0;
              return (
                <li key={star} className="flex items-center gap-3 text-xs text-lp-muted">
                  <span className="w-3 tabular-nums">{star}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-lp-line">
                    <span className="block h-full rounded-full bg-lp-gold" style={{ width: `${pct}%` }} />
                  </span>
                  <span className="w-6 text-right tabular-nums">{n}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-7">
            {status === "authenticated" && !alreadyReviewed && (
              <button
                onClick={() => setShowModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-lp-ink py-3.5 text-sm font-semibold text-lp-bg transition hover:opacity-90"
              >
                <PenLine className="h-4 w-4" />
                {S.writeReview}
              </button>
            )}
            {status === "authenticated" && alreadyReviewed && (
              <p className="flex items-center justify-center gap-2 text-sm text-lp-muted">
                <BadgeCheck className="h-4 w-4 text-lp-accent" />
                {S.alreadyReviewed}
              </p>
            )}
            {status === "unauthenticated" && (
              <Link
                href={`/auth/sign-in?callbackUrl=/b/${businessSlug}/products/${productId}`}
                className="flex w-full items-center justify-center rounded-full border border-lp-ink/30 py-3.5 text-sm font-semibold text-lp-ink hover:bg-lp-card"
              >
                {S.signInToReview}
              </Link>
            )}
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className="flex items-center rounded-[2rem] border border-dashed border-lp-line p-10 text-center font-serif text-xl text-lp-muted lg:text-left">
            {S.noReviews}
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-[1.75rem] bg-lp-card p-6 ring-1 ring-lp-line">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {r.customer.image ? (
                      <span className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-lp-line">
                        <Image src={r.customer.image} alt="" fill sizes="44px" className="object-cover" />
                      </span>
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lp-surface font-serif text-lg text-lp-accent ring-1 ring-lp-line">
                        {r.customer.name.charAt(0)}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold text-lp-ink">{r.customer.name}</p>
                      <p className="text-xs text-lp-muted">{dateFmt.format(new Date(r.createdAt))}</p>
                    </div>
                  </div>
                  <ShopStars rating={r.rating} />
                </div>
                {r.comment && <p className="mt-4 whitespace-pre-line leading-relaxed text-lp-muted">{r.comment}</p>}
                {r.images.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.images.map((img) => (
                      <a
                        key={img.id}
                        href={`/api/product-review-image/${img.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-lp-line"
                      >
                        <Image
                          src={`/api/product-review-image/${img.id}`}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && <ProductReviewModal productId={productId} onClose={() => setShowModal(false)} />}
    </section>
  );
}
