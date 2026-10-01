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

    // Registers a click toward an owner's own vara-points referral link (a
    // no-op server-side for an admin PlatformAffiliate code, or a repeat
    // visitor by IP) — guarded per tab/session so a re-render of this
    // component doesn't re-fire the request for the same code.
    const sentKey = `varaaai_ref_click_sent_${code}`;
    try {
      if (sessionStorage.getItem(sentKey)) return;
      sessionStorage.setItem(sentKey, "1");
    } catch {
      // Private browsing or storage disabled — fall through and send once
      // anyway rather than block the reward entirely.
    }
    fetch("/api/referral-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }).catch(() => {});
  }, [code]);

  return null;
}
