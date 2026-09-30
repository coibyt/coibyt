"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_DAYS = 30;

/** Remembers which affiliate referred this visitor (via `?aff=CODE` on the
 * public business page or its booking flow) for 30 days, so the booking API
 * can credit the right affiliate even if the customer books days later.
 * Renders nothing — the code is never shown or validated client-side, that
 * happens server-side when a booking is actually created. */
export function AffiliateCookieSetter({ businessId }: { businessId: string }) {
  const searchParams = useSearchParams();
  const code = searchParams.get("aff");

  useEffect(() => {
    if (!code) return;
    const maxAge = COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `varaaai_aff_${businessId}=${encodeURIComponent(code)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }, [code, businessId]);

  return null;
}
