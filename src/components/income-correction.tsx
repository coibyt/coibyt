"use client";

import { FileText, PenLine } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { changedFields, type AmountField } from "@/lib/income-math";
import type { IncomeReportJson } from "@/lib/income";
import type { IncomeStrings } from "@/lib/income-strings";

export function fieldLabel(S: IncomeStrings, f: AmountField) {
  return { cash: S.cash, bank: S.bank, online: S.online, gift1: S.gift1, gift2: S.gift2, tip: S.tip, total: S.total }[f];
}

/** A staff member's amount crossed out, the owner's beside it. */
export function StruckAmount({ staff, owner, money, className = "" }: { staff: number; owner: string; money: (c: number) => string; className?: string }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline justify-end gap-x-1.5 ${className}`}>
      <span className="text-ink-300 line-through decoration-berry-400 decoration-2">{money(staff)}</span>
      <span className="font-bold text-[#8e1d6d]">{owner}</span>
    </span>
  );
}

/** "Edited by owner" badge. */
export function OwnerEditedBadge({ S }: { S: IncomeStrings }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#8e1d6d]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#8e1d6d] ring-1 ring-[#8e1d6d]/20">
      <PenLine className="h-3 w-3" />
      {S.ownerEdited}
    </span>
  );
}

/** What the owner changed in a report and why: each changed amount (staff
 * member's crossed out → owner's), the reason and the owner's documents. Shown
 * to the staff member and the owner alike. Nothing when there's no correction. */
export function OwnerCorrection({ report, S, locale, onZoom }: { report: IncomeReportJson; S: IncomeStrings; locale: string; onZoom?: (url: string) => void }) {
  const changes = changedFields(report, report.staffOriginal);
  if (!changes.length && !report.ownerEditNote && !report.ownerDocs.length) return null;
  const money = (c: number) => formatMoney(c, report.currency, locale);
  const when = report.ownerEditedAt
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(report.ownerEditedAt))
    : null;

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#fdf2f8] to-[#f7eefb] ring-1 ring-[#e9c6dc]">
      <div className="flex items-start gap-2.5 px-3.5 pt-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#8e1d6d] text-white">
          <PenLine className="h-3.5 w-3.5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[13px] font-bold text-[#5d1247]">
            {S.ownerEditTitle}
            {when && <span className="ml-1.5 text-[11px] font-semibold text-[#8e1d6d]/60" suppressHydrationWarning>· {when}</span>}
          </span>
          {changes.length > 0 && <span className="block text-[11px] leading-snug text-[#5d1247]/70">{S.ownerEditSub}</span>}
        </span>
      </div>

      {changes.length > 0 && (
        <ul className="mx-3.5 mt-2.5 divide-y divide-[#e9c6dc]/70 rounded-xl bg-white/80 ring-1 ring-[#e9c6dc]/70">
          {changes.map((c) => (
            <li key={c.field} className={`flex items-center justify-between gap-3 px-3 py-2 text-xs ${c.field === "total" ? "bg-[#fdf2f8]/80 font-bold" : ""}`}>
              <span className="min-w-0 truncate font-semibold text-ink-700">{fieldLabel(S, c.field)}</span>
              <StruckAmount staff={c.staff} owner={money(c.owner)} money={money} className="shrink-0 tabular-nums" />
            </li>
          ))}
        </ul>
      )}

      {report.ownerEditNote && (
        <div className="mx-3.5 mt-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8e1d6d]">{S.ownerReason}</p>
          <p className="mt-0.5 whitespace-pre-line text-sm text-ink-900">{report.ownerEditNote}</p>
        </div>
      )}

      {report.ownerDocs.length > 0 && (
        <div className="mx-3.5 mt-2.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8e1d6d]">{S.ownerDocs}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {report.ownerDocs.map((d) =>
              d.pdf ? (
                <a
                  key={d.id}
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-16 max-w-[11rem] items-center gap-2 rounded-xl bg-white px-3 text-xs font-semibold text-[#5d1247] ring-1 ring-[#e9c6dc] hover:bg-[#fdf2f8]"
                >
                  <FileText className="h-5 w-5 shrink-0 text-[#8e1d6d]" />
                  <span className="line-clamp-2 break-all">{d.name || "PDF"}</span>
                </a>
              ) : (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => (onZoom ? onZoom(d.url) : window.open(d.url, "_blank"))}
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-[#e9c6dc]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.url} alt="" className="h-full w-full object-cover" />
                </button>
              ),
            )}
          </div>
        </div>
      )}
      <div className="h-3" />
    </div>
  );
}
