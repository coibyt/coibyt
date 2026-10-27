/** A price changed by a percentage. Rounded prices land on a whole currency
 * unit (EUR/USD) or a whole thousand (VND), so a list stays tidy. Used by
 * the bulk price tool and its preview, so both agree to the cent. */
export function adjustPrice(cents: number, currency: string, percent: number, round: boolean) {
  const raw = (cents * (100 + percent)) / 100;
  const step = !round ? 1 : currency === "VND" ? 1000 : 100;
  return Math.max(0, Math.round(raw / step) * step);
}
