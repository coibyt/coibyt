"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, ShoppingCart } from "lucide-react";
import { useProductCart } from "@/lib/product-cart";

export function ProductAddToCartButton({
  businessSlug,
  product,
  qty = 1,
  className = "btn-primary w-full",
}: {
  businessSlug: string;
  product: { id: string; name: string; priceCents: number; currency: string; imageId: string | null };
  qty?: number;
  className?: string;
}) {
  const t = useTranslations("business.productsPage");
  const cart = useProductCart(businessSlug);
  const [justAdded, setJustAdded] = useState(false);

  function add(e: React.MouseEvent) {
    e.preventDefault();
    cart.addItem(
      {
        productId: product.id,
        name: product.name,
        priceCents: product.priceCents,
        currency: product.currency,
        imageId: product.imageId,
      },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button onClick={add} className={className}>
      {justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
      {t("addToCart")}
    </button>
  );
}
