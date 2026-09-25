/**
 * All prices are stored as integer "cents" — for VND (a zero-decimal
 * currency) that just means the whole đồng amount, so 150_000 VND is
 * stored as priceCents = 150000, not 15000000.
 */
export const INTL_LOCALES: Record<string, string> = {
  vi: "vi-VN",
  en: "en-US",
  fi: "fi-FI",
  pl: "pl-PL",
  de: "de-DE",
  km: "km-KH",
  th: "th-TH",
};

export function formatMoney(cents: number, currency: string, locale: string) {
  const isZeroDecimal = currency === "VND";
  const amount = isZeroDecimal ? cents : cents / 100;
  return new Intl.NumberFormat(INTL_LOCALES[locale] ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

export function toSmallestUnit(amount: number, currency: string) {
  return currency === "VND" ? Math.round(amount) : Math.round(amount * 100);
}

/** Reverse of the above — turns stored cents back into the whole-currency-unit
 * amount an owner would type into a form (e.g. 18000 cents, EUR -> 180). */
export function fromSmallestUnit(cents: number, currency: string) {
  return currency === "VND" ? cents : cents / 100;
}
