export interface StaffHourRow {
  weekday: number;
  openMinute: number;
  closeMinute: number;
  validFrom: string | null;
  validUntil: string | null;
}

export interface HoursPeriod {
  validFrom: string | null;
  validUntil: string | null;
  windows: { weekday: number; openMinute: number; closeMinute: number }[];
}

/** Rows that share a date range form one schedule period. */
export function groupStaffHours(rows: StaffHourRow[]): HoursPeriod[] {
  const byKey = new Map<string, HoursPeriod>();
  for (const r of rows) {
    const key = `${r.validFrom ?? ""}|${r.validUntil ?? ""}`;
    let period = byKey.get(key);
    if (!period) {
      period = { validFrom: r.validFrom, validUntil: r.validUntil, windows: [] };
      byKey.set(key, period);
    }
    period.windows.push({ weekday: r.weekday, openMinute: r.openMinute, closeMinute: r.closeMinute });
  }
  return Array.from(byKey.values());
}

/** The schedule in force on a given YYYY-MM-DD: among the periods covering
 * that date, the one that starts latest wins. Null when no period covers it,
 * meaning the salon's own opening hours apply. */
export function activeStaffPeriod(periods: HoursPeriod[], dateStr: string): HoursPeriod | null {
  const covering = periods.filter(
    (p) =>
      (!p.validFrom || p.validFrom <= dateStr) && (!p.validUntil || dateStr <= p.validUntil)
  );
  if (covering.length === 0) return null;
  covering.sort((a, b) => (b.validFrom ?? "").localeCompare(a.validFrom ?? ""));
  return covering[0];
}
