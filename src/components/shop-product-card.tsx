"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { announceAddedToCart, useProductCart } from "@/lib/product-cart";
import { discountPct, shopStrings } from "@/lib/shop-strings";

/** One product as the shop shows it. */
export interface ShopProduct {
  id: string;
  name: string;
  brand: string | null;
  priceCents: number;
  compareAtCents: number | null;
  currency: string;
  /** Cover first; the card shows the second one on hover. */
  imageIds: string[];
  groupId: string | null;
  featured: boolean;
  soldOut: boolean;
  isNew: boolean;
  rating: number | null;
  reviewCount: number;
  sortOrder: number;
  createdAt: string;
}

/** Five stars, filled up to `rating`, in the salon's gold. */
export function ShopStars({ rating, size = "h-3.5 w-3.5" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${size} ${i < Math.round(rating) ? "fill-lp-gold" : "fill-lp-line"}`} aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** A product tile on the shop's lp-* palette. With `previewImages` it's the
 * dashboard's static preview: those image URLs, no link and no cart. */
export function ShopProductCard({
  product: p,
  slug,
  locale,
  previewImages,
  priority = false,
}: {
  product: ShopProduct;
  slug: string;
  locale: string;
  previewImages?: string[];
  priority?: boolean;
}) {
  const S = shopStrings(locale);
  const cart = useProductCart(slug);
  const [added, setAdded] = useState(false);
  const images = previewImages ?? p.imageIds.map((id) => `/api/product-image/${id}`);
  const pct = discountPct(p.priceCents, p.compareAtCents);
  const href = `/b/${slug}/products/${p.id}`;

  function add(e: React.MouseEvent) {
    e.preventDefault();
    if (previewImages || p.soldOut) return;
    cart.addItem({ productId: p.id, name: p.name, priceCents: p.priceCents, currency: p.currency, imageId: p.imageIds[0] ?? null });
    announceAddedToCart(slug, { name: p.name, imageId: p.imageIds[0] ?? null });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const media = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-lp-surface ring-1 ring-lp-line/70">
      {images[0] ? (
        <>
          <Image
            src={images[0]}
            alt={p.name}
            fill
            priority={priority}
            unoptimized={!!previewImages}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={`object-cover transition duration-700 ease-out group-hover:scale-[1.04] ${images[1] ? "group-hover:opacity-0" : ""} ${p.soldOut ? "grayscale-[60%]" : ""}`}
          />
          {images[1] && (
            <Image
              src={images[1]}
              alt=""
              fill
              unoptimized={!!previewImages}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="scale-[1.04] object-cover opacity-0 transition duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-lp-gold/50" strokeWidth={1.2} />
        </div>
      )}

      <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
        {pct > 0 && !p.soldOut && (
          <span className="rounded-full bg-lp-accent px-2.5 py-1 text-[11px] font-bold tracking-wide text-lp-accent-ink shadow-sm">−{pct}%</span>
        )}
        {p.isNew && !p.soldOut && (
          <span className="rounded-full bg-lp-card/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-lp-ink shadow-sm backdrop-blur">
            {S.badgeNew}
          </span>
        )}
      </div>
      {p.featured && !p.soldOut && (
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-lp-deep/80 text-lp-gold backdrop-blur" title={S.badgeFeatured}>
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
          </svg>
        </span>
      )}
      {p.soldOut && (
        <div className="absolute inset-x-3 bottom-3 rounded-full bg-lp-deep/85 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-lp-deep-ink backdrop-blur">
          {S.soldOut}
        </div>
      )}
    </div>
  );

  const addButton = !p.soldOut && (
    <button
      type="button"
      onClick={add}
      aria-label={S.add}
      className={`absolute bottom-3 right-3 flex h-11 items-center rounded-full px-3.5 text-sm font-semibold shadow-[0_10px_25px_-10px_rgba(0,0,0,0.45)] transition-all duration-300 ${
        added ? "bg-lp-accent text-lp-accent-ink" : "bg-lp-card text-lp-ink hover:bg-lp-accent hover:text-lp-accent-ink"
      }`}
    >
      {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[9rem] group-hover:pl-2 sm:inline">
        {added ? S.added : S.add}
      </span>
    </button>
  );

  const info = (
    <div className="mt-4 px-1">
      {p.brand && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{p.brand}</p>}
      <h3 className="mt-1 line-clamp-2 font-serif text-[1.05rem] font-medium leading-snug text-lp-ink sm:text-lg">{p.name}</h3>
      {p.reviewCount > 0 && p.rating !== null && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-lp-muted">
          <ShopStars rating={p.rating} />
          <span>
            {p.rating.toFixed(1)} · {p.reviewCount}
          </span>
        </p>
      )}
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
        <span className={`text-base font-semibold ${pct > 0 ? "text-lp-accent" : "text-lp-ink"}`}>{formatMoney(p.priceCents, p.currency, locale)}</span>
        {pct > 0 && p.compareAtCents && (
          <span className="text-sm text-lp-muted line-through decoration-lp-muted/60">{formatMoney(p.compareAtCents, p.currency, locale)}</span>
        )}
      </p>
    </div>
  );

  if (previewImages) {
    return (
      <div className="group">
        <div className="relative">
          {media}
          {addButton}
        </div>
        {info}
      </div>
    );
  }

  const linkClass = "block rounded-[1.6rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-lp-accent focus-visible:ring-offset-4 focus-visible:ring-offset-lp-bg";
  return (
    <article className="group">
      <div className="relative">
        <Link href={href} className={linkClass}>
          {media}
        </Link>
        {addButton}
      </div>
      <Link href={href} className={linkClass} tabIndex={-1}>
        {info}
      </Link>
    </article>
  );
}
