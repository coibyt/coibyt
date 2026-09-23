/**
 * All prices are stored as integer "cents" — for VND (a zero-decimal
 * currency) that just means the whole đồng amount, so 150_000 VND is
 * stored as priceCents = 150000, not 15000000.
 */
export function formatMoney(cents: number, currency: string, locale: string) {
  const isZeroDecimal = currency === "VND";
  const amount = isZeroDecimal ? cents : cents / 100;
  return new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

export function toSmallestUnit(amount: number, currency: string) {
  return currency === "VND" ? Math.round(amount) : Math.round(amount * 100);
}
