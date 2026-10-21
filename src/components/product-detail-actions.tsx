"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Phone, Plus, Share2, ShoppingBag } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { announceAddedToCart, openCart, useProductCart } from "@/lib/product-cart";
import { shopStrings } from "@/lib/shop-strings";

/** Quantity, "Add to bag", "Buy now" and "Share" on the product page — plus
 * a bar pinned to the bottom of phones once those buttons scroll away. */
export function ProductDetailActions({
  businessSlug,
  locale,
  phone,
  product,
}: {
  businessSlug: string;
  locale: string;
  phone: string | null;
  product: { id: string; name: string; priceCents: number; currency: string; imageId: string | null; soldOut: boolean };
}) {
  const S = shopStrings(locale);
  const cart = useProductCart(businessSlug);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function add(n = qty) {
    cart.addItem(
      { productId: product.id, name: product.name, priceCents: product.priceCents, currency: product.currency, imageId: product.imageId },
      n
    );
  }

  function addToBag() {
    add();
    announceAddedToCart(businessSlug, { name: product.name, imageId: product.imageId });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function buyNow() {
    add();
    openCart(businessSlug);
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url }).catch(() => {});
      return;
    }
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (product.soldOut) {
    return (
      <div className="space-y-3">
        <p className="rounded-2xl bg-lp-surface p-4 text-sm leading-relaxed text-lp-muted ring-1 ring-lp-line">{S.soldOutNote}</p>
        <div className="flex gap-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-lp-ink py-4 text-sm font-semibold text-lp-bg"
            >
              <Phone className="h-4 w-4" />
              {S.contactSalon}
            </a>
          )}
          <ShareButton onClick={share} copied={copied} label={copied ? S.linkCopied : S.share} />
        </div>
      </div>
    );
  }

  const addClass = `flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all ${
    added ? "bg-lp-ink text-lp-bg" : "bg-lp-accent text-lp-accent-ink shadow-[0_14px_30px_-12px_rgb(var(--lp-accent)/0.9)] hover:brightness-110"
  }`;

  return (
    <>
      <div ref={panel} className="space-y-3">
        <div className="flex gap-3">
          <div className="flex h-[52px] items-center rounded-full bg-lp-card ring-1 ring-lp-line" aria-label={S.qty}>
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-[52px] w-12 items-center justify-center text-lp-muted hover:text-lp-ink"
              aria-label="−"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-base font-semibold tabular-nums">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-[52px] w-12 items-center justify-center text-lp-muted hover:text-lp-ink"
              aria-label="+"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button type="button" onClick={addToBag} className={`${addClass} h-[52px] flex-1`}>
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? S.added : S.add}
          </button>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={buyNow}
            className="flex h-[52px] flex-1 items-center justify-center rounded-full border border-lp-ink/80 text-sm font-semibold text-lp-ink transition-colors hover:bg-lp-ink hover:text-lp-bg"
          >
            {S.buyNow}
          </button>
          <ShareButton onClick={share} copied={copied} label={copied ? S.linkCopied : S.share} />
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-lp-line bg-lp-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-lp-muted">{product.name}</p>
            <p className="font-semibold text-lp-ink">{formatMoney(product.priceCents, product.currency, locale)}</p>
          </div>
          <button type="button" onClick={addToBag} className={`${addClass} h-12 px-6`}>
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
            {added ? S.added : S.add}
          </button>
        </div>
      </div>
    </>
  );
}

function ShareButton({ onClick, copied, label }: { onClick: () => void; copied: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-lp-card text-lp-ink ring-1 ring-lp-line transition-colors hover:ring-lp-gold"
    >
      {copied ? <Check className="h-4 w-4 text-lp-accent" /> : <Share2 className="h-4 w-4" />}
    </button>
  );
}
