"use client";

import { CheckCircle2, Clock3, Download, PenLine, Users, XCircle } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { formatMoney } from "@/lib/money";
import { giftNet, staffValueIfChanged, type AmountField } from "@/lib/income-math";
import type { IncomeReportJson } from "@/lib/income";
import type { IncomeStrings } from "@/lib/income-strings";
import { downloadXlsx, type XlsxRow } from "@/lib/xlsx-write";

/** One staff member's reports as a spreadsheet: a row per booking and the
 * totals underneath. On the Doanh thu page, "Bảng tính" view. */

const gift = (r: Pick<IncomeReportJson, "giftCard1Cents" | "giftCard1Percent" | "giftCard2Cents" | "giftCard2Percent">) => giftNet(r.giftCard1Cents, r.giftCard1Percent) + giftNet(r.giftCard2Cents, r.giftCard2Percent);
const giftPcts = (r: IncomeReportJson) =>
  [r.giftCard1Cents > 0 ? r.giftCard1Percent : null, r.giftCard2Cents > 0 ? r.giftCard2Percent : null].filter((p): p is number => p !== null && p > 0);

export function sheetTotals(rows: IncomeReportJson[]) {
  return rows.reduce(
    (t, r) => ({
      expected: t.expected + r.expectedCents,
      cash: t.cash + r.cashCents,
      bank: t.bank + r.bankCents,
      mobilePay: t.mobilePay + r.mobilePayCents,
      online: t.online + r.onlineCents,
      gift: t.gift + gift(r),
      tip: t.tip + r.tipCents,
      total: t.total + r.totalCents,
    }),
    { expected: 0, cash: 0, bank: 0, mobilePay: 0, online: 0, gift: 0, tip: 0, total: 0 },
  );
}

/** The rows as a real Excel file: one row per booking, a bold totals row
 * under each staff member, amounts as numbers Excel can add up. */
export function downloadIncomeXlsx(groups: { name: string; rows: IncomeReportJson[] }[], S: IncomeStrings, locale: string, timezone: string, filename: string) {
  const day = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: timezone });
  const amt = (c: number) => c / 100;
  const status = (r: IncomeReportJson) => (r.status === "APPROVED" ? S.approved : r.status === "REJECTED" ? S.rejected : S.pending);
  const lines: XlsxRow[] = [
    [S.colDate, S.byStaff, S.colCustomer, S.colService, S.colPrice, S.colCash, S.colBank, S.colMobilePay, S.colOnline, S.colGift, S.colTip, S.colTotal, S.colStatus, S.colOwnerEdit],
  ];
  for (const g of groups) {
    for (const r of g.rows) {
      lines.push([
        day.format(new Date(r.serviceAt)),
        g.name,
        r.customerName,
        r.serviceName,
        amt(r.expectedCents),
        amt(r.cashCents),
        amt(r.bankCents),
        amt(r.mobilePayCents),
        amt(r.onlineCents),
        amt(gift(r)),
        amt(r.tipCents),
        amt(r.totalCents),
        status(r),
        // The owner's numbers count; what the staff member entered is kept here.
        r.staffOriginal ? amt(r.staffOriginal.totalCents) : "",
      ]);
    }
    const t = sheetTotals(g.rows);
    lines.push({
      bold: true,
      cells: ["", `${S.totalRow} · ${g.name}`, "", "", amt(t.expected), amt(t.cash), amt(t.bank), amt(t.mobilePay), amt(t.online), amt(t.gift), amt(t.tip), amt(t.total), "", ""],
    });
  }
  downloadXlsx(filename, S.colTotal, lines, { money: [4, 5, 6, 7, 8, 9, 10, 11, 13] });
}

export function IncomeSheet({
  name,
  rows,
  S,
  locale,
  timezone,
  currency,
  onRow,
}: {
  name: string;
  rows: IncomeReportJson[];
  S: IncomeStrings;
  locale: string;
  timezone: string;
  currency: string;
  onRow: (r: IncomeReportJson) => void;
}) {
  const money = (c: number) => (c ? formatMoney(c, rows[0]?.currency ?? currency, locale) : "—");
  const dayFmt = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "numeric", timeZone: timezone });
  const timeFmt = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone: timezone });
  const when = (iso: string) => `${dayFmt.format(new Date(iso))} · ${timeFmt.format(new Date(iso))}`;
  const t = sheetTotals(rows);
  const approved = rows.filter((r) => r.status === "APPROVED").reduce((n, r) => n + r.totalCents, 0);
  const waiting = rows.filter((r) => r.status !== "APPROVED").reduce((n, r) => n + r.totalCents, 0);
  const th = "whitespace-nowrap px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-ink-400";
  const num = "whitespace-nowrap px-3 py-2 text-right tabular-nums";
  // A cell the owner corrected: the staff member's amount crossed out above the owner's.
  const cell = (r: IncomeReportJson, f: AmountField, value: number, strong = false) => {
    const was = staffValueIfChanged(r, f);
    if (was === null) return strong ? formatMoney(value, r.currency, locale) : money(value);
    return (
      <span className="inline-flex flex-col items-end leading-tight">
        <span className="text-[10px] text-ink-300 line-through decoration-berry-400">{money(was)}</span>
        <span className="font-bold text-[#8e1d6d]">{strong ? formatMoney(value, r.currency, locale) : money(value)}</span>
      </span>
    );
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_14px_34px_-30px_rgba(31,24,45,0.6)]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 bg-gradient-to-r from-[#1f182d] to-[#40325c] px-4 py-3 text-white sm:px-5">
        <p className="flex items-center gap-2 font-bold">
          <Users className="h-4 w-4 text-[#e8d3a6]" />
          {name}
          <span className="text-xs font-semibold text-white/55">· {fill(S.rowsN, { n: rows.length })}</span>
        </p>
        <p className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {S.statApproved} <b className="tabular-nums">{formatMoney(approved, currency, locale)}</b>
          </span>
          <span className="flex items-center gap-1 text-amber-200">
            <Clock3 className="h-3.5 w-3.5" />
            {S.pending} / {S.rejected} <b className="tabular-nums">{formatMoney(waiting, currency, locale)}</b>
          </span>
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px] border-collapse text-xs">
          <thead className="bg-mist-50/70">
            <tr>
              <th className={th}>{S.colDate}</th>
              <th className={th}>{S.colCustomer}</th>
              <th className={th}>{S.colService}</th>
              <th className={`${th} text-right`}>{S.colPrice}</th>
              <th className={`${th} text-right`}>{S.colCash}</th>
              <th className={`${th} text-right`}>{S.colBank}</th>
              <th className={`${th} text-right`}>{S.colMobilePay}</th>
              <th className={`${th} text-right`}>{S.colOnline}</th>
              <th className={`${th} text-right`}>{S.colGift}</th>
              <th className={`${th} bg-[#fffaf0] text-right text-[#8a6a2c]`}>{S.colTip}</th>
              <th className={`${th} text-right`}>{S.colTotal}</th>
              <th className={th}>{S.colStatus}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const pcts = giftPcts(r);
              return (
                <tr
                  key={r.id}
                  onClick={() => onRow(r)}
                  className={`cursor-pointer border-t border-ink-100 transition hover:bg-[#f4f1fa] ${i % 2 ? "bg-mist-50/40" : "bg-white"}`}
                >
                  <td className="whitespace-nowrap px-3 py-2 text-ink-500" suppressHydrationWarning>
                    {when(r.serviceAt)}
                  </td>
                  <td className="max-w-[160px] truncate px-3 py-2 font-semibold text-ink-900">{r.customerName || "—"}</td>
                  <td className="max-w-[200px] truncate px-3 py-2 text-ink-700">{r.serviceName}</td>
                  <td className={`${num} text-ink-400`}>{money(r.expectedCents)}</td>
                  <td className={num}>{cell(r, "cash", r.cashCents)}</td>
                  <td className={num}>{cell(r, "bank", r.bankCents)}</td>
                  <td className={num}>{cell(r, "mobilePay", r.mobilePayCents)}</td>
                  <td className={num} title={r.onlineSource ?? undefined}>
                    {cell(r, "online", r.onlineCents)}
                  </td>
                  <td className={num}>
                    {staffValueIfChanged(r, "gift1") !== null || staffValueIfChanged(r, "gift2") !== null ? (
                      <span className="inline-flex flex-col items-end leading-tight">
                        <span className="text-[10px] text-ink-300 line-through decoration-berry-400">{money(gift(r.staffOriginal!))}</span>
                        <span className="font-bold text-[#8e1d6d]">{money(gift(r))}</span>
                      </span>
                    ) : (
                      money(gift(r))
                    )}
                    {pcts.map((p) => (
                      <span key={p} className="ml-1 rounded-full bg-[#1f182d] px-1.5 text-[9px] font-bold text-[#e8d3a6]">
                        −{p}%
                      </span>
                    ))}
                  </td>
                  <td className={`${num} bg-[#fffaf0]/70 text-[#6b5221]`}>{cell(r, "tip", r.tipCents)}</td>
                  <td className={`${num} font-bold text-ink-900`}>{cell(r, "total", r.totalCents, true)}</td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {r.staffOriginal && (
                      <span title={S.ownerEdited} className="mr-1 inline-flex items-center rounded-full bg-[#8e1d6d]/10 p-1 align-middle text-[#8e1d6d]">
                        <PenLine className="h-3 w-3" />
                      </span>
                    )}
                    {r.status === "APPROVED" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {S.approved}
                      </span>
                    ) : r.status === "REJECTED" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-berry-50 px-2 py-0.5 text-[10px] font-bold text-berry-600">
                        <XCircle className="h-3 w-3" />
                        {S.rejected}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        <Clock3 className="h-3 w-3" />
                        {S.pending}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#1f182d] bg-[#f4f1fa] font-bold text-ink-900">
              <td className="px-3 py-2.5" colSpan={3}>
                {S.totalRow}
              </td>
              <td className={`${num} text-ink-500`}>{money(t.expected)}</td>
              <td className={num}>{money(t.cash)}</td>
              <td className={num}>{money(t.bank)}</td>
              <td className={num}>{money(t.mobilePay)}</td>
              <td className={num}>{money(t.online)}</td>
              <td className={num}>{money(t.gift)}</td>
              <td className={`${num} bg-[#fffaf0] text-[#6b5221]`}>{money(t.tip)}</td>
              <td className={`${num} text-sm`}>{formatMoney(t.total, currency, locale)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export function SheetExportButton({ onClick, S }: { onClick: () => void; S: IncomeStrings }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
      <Download className="h-3.5 w-3.5" />
      {S.exportCsv}
    </button>
  );
}
