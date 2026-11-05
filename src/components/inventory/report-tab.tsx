"use client";

import { useEffect, useState } from "react";
import { BarChart3, Info, Loader2, Trophy } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import type { InventoryStrings } from "@/lib/inventory-strings";

interface Report {
  currency: string;
  branches: { id: string; name: string }[];
  months: { month: string; byBranch: Record<string, number> }[];
  categories: { category: string; cents: number }[];
  top: { name: string; unit: string; qty: number; cents: number }[];
  uncosted: boolean;
}

// One colour per branch in the monthly bars.
const BRANCH_COLORS = ["#624f89", "#c99a3f", "#0f9d8a", "#e0559b", "#3b82f6", "#f97316"];

/** What the salon spent on supplies: six months by branch, by type, and the
 * items used most — at purchase prices. */
export function ReportTab({ S, locale }: { S: InventoryStrings; locale: string }) {
  const [r, setR] = useState<Report | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/business/inventory/report")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setR)
      .catch(() => setFailed(true));
  }, []);

  if (!r) {
    return (
      <div className="flex h-48 items-center justify-center rounded-3xl bg-white ring-1 ring-ink-100">
        {failed ? <p className="text-sm text-ink-400">{S.errGeneric}</p> : <Loader2 className="h-6 w-6 animate-spin text-ink-300" />}
      </div>
    );
  }

  const money = (c: number) => formatMoney(c, r.currency, locale);
  const monthFmt = new Intl.DateTimeFormat(locale, { month: "short" });
  const totals = r.months.map((m) => Object.values(m.byBranch).reduce((a, b) => a + b, 0));
  const peak = Math.max(1, ...totals);
  const catTotal = Math.max(1, r.categories.reduce((a, c) => a + c.cents, 0));
  const thisMonth = totals[totals.length - 1] ?? 0;
  const lastMonth = totals[totals.length - 2] ?? 0;

  return (
    <section className="space-y-4">
      {r.uncosted && (
        <p className="flex items-start gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-800 ring-1 ring-amber-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          {S.reportNoCost}
        </p>
      )}

      <div className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-base font-bold text-ink-900">
              <BarChart3 className="h-4 w-4 text-[#624f89]" />
              {S.reportMonthly}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">{S.reportSub}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold tabular-nums text-ink-900">{money(thisMonth)}</p>
            <p className="text-[11px] text-ink-400">{fill(S.reportThisMonth, { last: money(lastMonth) })}</p>
          </div>
        </div>

        <div className="mt-5 flex h-48 items-end gap-2 sm:gap-4">
          {r.months.map((m, i) => (
            <div key={m.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-[10px] font-bold tabular-nums text-ink-500">{totals[i] ? money(totals[i]) : ""}</span>
              <div className="flex w-full max-w-12 flex-col-reverse overflow-hidden rounded-t-lg" style={{ height: `${(totals[i] / peak) * 100}%`, minHeight: totals[i] ? 4 : 0 }}>
                {r.branches.map((b, bi) =>
                  m.byBranch[b.id] ? (
                    <div key={b.id} style={{ height: `${(m.byBranch[b.id] / (totals[i] || 1)) * 100}%`, background: BRANCH_COLORS[bi % BRANCH_COLORS.length] }} title={`${b.name}: ${money(m.byBranch[b.id])}`} />
                  ) : null,
                )}
              </div>
              <span className="text-[11px] font-semibold capitalize text-ink-500">{monthFmt.format(new Date(`${m.month}-15T00:00:00Z`))}</span>
            </div>
          ))}
        </div>
        {r.branches.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-ink-500">
            {r.branches.map((b, bi) => (
              <span key={b.id} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: BRANCH_COLORS[bi % BRANCH_COLORS.length] }} />
                {b.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
          <p className="text-sm font-bold text-ink-900">{S.reportByType}</p>
          {r.categories.length === 0 ? (
            <p className="mt-3 text-xs text-ink-400">{S.historyEmpty}</p>
          ) : (
            <ul className="mt-3 space-y-2.5">
              {r.categories.map((c) => (
                <li key={c.category}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink-700">{S.categories[c.category] ?? c.category}</span>
                    <span className="font-bold tabular-nums text-ink-900">{money(c.cents)}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" style={{ width: `${Math.max(2, (c.cents / catTotal) * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
          <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
            <Trophy className="h-4 w-4 text-[#c99a3f]" />
            {S.reportTop}
          </p>
          {r.top.length === 0 ? (
            <p className="mt-3 text-xs text-ink-400">{S.historyEmpty}</p>
          ) : (
            <ol className="mt-3 space-y-2">
              {r.top.map((t, i) => (
                <li key={t.name} className="flex items-center gap-3 text-xs">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist-50 text-[11px] font-extrabold text-[#624f89]">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-ink-900">{t.name}</span>
                  <span className="shrink-0 text-ink-500">
                    {t.qty} {S.units[t.unit] ?? t.unit}
                  </span>
                  <span className="w-20 shrink-0 text-right font-bold tabular-nums text-ink-900">{money(t.cents)}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
