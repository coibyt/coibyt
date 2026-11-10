// Client-safe income report helpers (lib/income.ts pulls in Prisma).

/** Quick choices for a gift card's discount; "other" lets staff type one. */
export const GIFT_DISCOUNTS = [0, 5, 10, 30, 50, 100];

/** What a gift card adds to the salon's income after its discount. */
export function giftNet(amountCents: number, pct: number) {
  return Math.round((amountCents * (100 - pct)) / 100);
}

/** The amounts of a report — what a staff member entered, or the owner's
 * correction of it. Stored as StaffIncomeReport.staffOriginal (the staff
 * member's numbers) once the owner has corrected a report. */
export interface IncomeAmounts {
  cashCents: number;
  bankCents: number;
  onlineCents: number;
  onlineSource: string | null;
  giftCard1Cents: number;
  giftCard1Code: string | null;
  giftCard1Percent: number;
  giftCard2Cents: number;
  giftCard2Code: string | null;
  giftCard2Percent: number;
  tipCents: number;
  totalCents: number;
}

/** Salon income: gift cards count after their discount; the tip is the staff
 * member's own and stays out. */
export function incomeTotal(a: Pick<IncomeAmounts, "cashCents" | "bankCents" | "onlineCents" | "giftCard1Cents" | "giftCard1Percent" | "giftCard2Cents" | "giftCard2Percent">) {
  return a.cashCents + a.bankCents + a.onlineCents + giftNet(a.giftCard1Cents, a.giftCard1Percent) + giftNet(a.giftCard2Cents, a.giftCard2Percent);
}

/** The amounts of a report row (or JSON) as IncomeAmounts. */
export function pickAmounts(r: IncomeAmounts): IncomeAmounts {
  return {
    cashCents: r.cashCents,
    bankCents: r.bankCents,
    onlineCents: r.onlineCents ?? 0,
    onlineSource: r.onlineSource ?? null,
    giftCard1Cents: r.giftCard1Cents,
    giftCard1Code: r.giftCard1Code ?? null,
    giftCard1Percent: r.giftCard1Percent,
    giftCard2Cents: r.giftCard2Cents,
    giftCard2Code: r.giftCard2Code ?? null,
    giftCard2Percent: r.giftCard2Percent,
    tipCents: r.tipCents,
    totalCents: r.totalCents,
  };
}

export type AmountField = "cash" | "bank" | "online" | "gift1" | "gift2" | "tip" | "total";

/** The salon-income value of one field (gift cards after their discount). */
export function fieldValue(a: IncomeAmounts, f: AmountField) {
  switch (f) {
    case "cash":
      return a.cashCents;
    case "bank":
      return a.bankCents;
    case "online":
      return a.onlineCents ?? 0;
    case "gift1":
      return giftNet(a.giftCard1Cents, a.giftCard1Percent);
    case "gift2":
      return giftNet(a.giftCard2Cents, a.giftCard2Percent);
    case "tip":
      return a.tipCents;
    case "total":
      return a.totalCents;
  }
}

/** Where the owner's numbers differ from what the staff member entered —
 * every field when compared field by field, gift cards by amount and discount. */
export function changedFields(owner: IncomeAmounts, staff: IncomeAmounts | null): { field: AmountField; staff: number; owner: number }[] {
  if (!staff) return [];
  const fields: AmountField[] = ["cash", "bank", "online", "gift1", "gift2", "tip"];
  const out = fields
    .filter((f) =>
      f === "gift1"
        ? owner.giftCard1Cents !== staff.giftCard1Cents || owner.giftCard1Percent !== staff.giftCard1Percent
        : f === "gift2"
          ? owner.giftCard2Cents !== staff.giftCard2Cents || owner.giftCard2Percent !== staff.giftCard2Percent
          : fieldValue(owner, f) !== fieldValue(staff, f),
    )
    .map((f) => ({ field: f, staff: fieldValue(staff, f), owner: fieldValue(owner, f) }));
  if (owner.totalCents !== staff.totalCents) out.push({ field: "total", staff: staff.totalCents, owner: owner.totalCents });
  return out;
}

/** The staff member's value of a field when the owner changed it, else null. */
export function staffValueIfChanged(r: IncomeAmounts & { staffOriginal: IncomeAmounts | null }, f: AmountField) {
  if (!r.staffOriginal) return null;
  const s = fieldValue(r.staffOriginal, f);
  return s !== fieldValue(r, f) ? s : null;
}
