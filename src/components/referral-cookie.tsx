"use client";

import { useEffect } from "react";
import { REFERRAL_COOKIE_DAYS, referralCookieName } from "@/lib/loyalty-referral-constants";

/** Remembers the invite code for this salon, so the booking the visitor
 * makes later (on any page) is credited to the friend who invited them. */
export function ReferralCookie({ businessId, code }: { businessId: string; code: string }) {
  useEffect(() => {
    const maxAge = REFERRAL_COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `${referralCookieName(businessId)}=${encodeURIComponent(code)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }, [businessId, code]);
  return null;
}
