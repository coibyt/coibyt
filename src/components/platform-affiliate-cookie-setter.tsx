"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const COOKIE_DAYS = 30;
const COOKIE_NAME = "varaaai_platform_aff";

/** Remembers which platform affiliate referred this visitor (via `?aff=CODE`
 * on the /business landing page or the application form itself) for 30
 * days, so /api/business/apply can credit the right affiliate even if the
 * visitor applies days later. Renders nothing — the code is never shown or
 * validated client-side, that happens server-side when a business is
 * actually created. */
export function PlatformAffiliateCookieSetter() {
  const searchParams = useSearchParams();
  const code = searchParams.get("aff");

  useEffect(() => {
    if (!code) return;
    const maxAge = COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(code)}; path=/; max-age=${maxAge}; SameSite=Lax`;
  }, [code]);

  return null;
}
