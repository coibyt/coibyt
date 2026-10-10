"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ProductAddToCartButton } from "@/components/product-add-to-cart-button";

export function ProductDetailActions({
  businessSlug,
  product,
}: {
  businessSlug: string;
  product: { id: string; name: string; priceCents: number; currency: string; imageId: string | null };
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-ink-100 px-2 py-1.5">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="btn-ghost !h-6 !w-6 !p-0">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm">{qty}</span>
        <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="btn-ghost !h-6 !w-6 !p-0">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <ProductAddToCartButton businessSlug={businessSlug} product={product} qty={qty} className="btn-primary flex-1" />
    </div>
  );
}
