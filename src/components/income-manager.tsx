"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import {
  AlarmClock,
  Banknote,
  BellRing,
  CalendarDays,
  Check,
  CheckCircle2,
  CheckCheck,
  Clock3,
  CreditCard,
  Gift,
  HandCoins,
  Loader2,
  Pencil,
  Receipt,
  TrendingUp,
  Undo2,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { incomeStrings } from "@/lib/income-strings";
import { formatMoney } from "@/lib/money";
import type { IncomeReportJson } from "@/lib/income";
import type { OverdueBooking } from "@/lib/income-reminders";
import { IncomeReportModal } from "@/components/income-report";
import { giftNet } from "@/lib/income-math";

type Period = "today" | "week" | "month" | "last";
type StatusFilter = "" | "PENDING" | "APPROVED" | "REJECTED";

const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";

function shiftDate(date: string, n: number) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** [from, to] as salon-local YYYY-MM-DD for a period. */
function range(period: Period, today: string): [string, string] {
  const [y, m] = today.split("-").map(Number);
  const monthStart = `${y}-${String(m).padStart(2, "0")}-01`;
  switch (period) {
    case "today":
      return [today, today];
    case "week":
      return [shiftDate(today, -6), today];
    case "month":
      return [monthStart, today];
    case "last": {
      const end = shiftDate(monthStart, -1);
      return [`${end.slice(0, 7)}-01`, end];
    }
  }
}

export function IncomeManager({
  locale,
  isOwner,
  timezone,
  currency,
  staff,
}: {
  locale: string;
  isOwner: boolean;
  timezone: string;
  currency: string;
  /** Owner only: the salon's staff, for the filter. */
  staff: { id: string; name: string }[];
}) {
  const S = incomeStrings(locale);
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("month");
  const [status, setStatus] = useState<StatusFilter>("");
  const [staffId, setStaffId] = useState("");
  const [reports, setReports] = useState<IncomeReportJson[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  // The report the owner is writing a "not approved" reason for.
  const [rejecting, setRejecting] = useState<{ id: string; note: string; error: boolean } | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [editing, setEditing] = useState<IncomeReportJson | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [today, setToday] = useState<string | null>(null);

  // The salon's "today" — read in the browser only, so nothing differs
  // between the server render and hydration.
  useEffect(() => setToday(formatInTimeZone(new Date(), timezone, "yyyy-MM-dd")), [timezone]);

  const load = useCallback(async () => {
    if (!today) return;
    const [from, to] = range(period, today);
    const q = new URLSearchParams({ from, to, ...(status ? { status } : {}), ...(staffId ? { staffId } : {}) });
    const res = await fetch(`/api/business/income?${q}`).catch(() => null);
    if (res?.ok) setReports((await res.json()).reports);
  }, [today, period, status, staffId]);

  useEffect(() => {
    setReports(null);
    load();
  }, [load]);

  // Bookings over 24 hours past with no report, and whether reminders are on.
  const [overdue, setOverdue] = useState<{ enabled: boolean; bookings: OverdueBooking[] } | null>(null);
  const [reportingOverdue, setReportingOverdue] = useState<OverdueBooking | null>(null);
  const [savingReminders, setSavingReminders] = useState(false);
  const loadOverdue = useCallback(async () => {
    const res = await fetch("/api/business/income/overdue").catch(() => null);
    if (res?.ok) setOverdue(await res.json());
  }, []);
  useEffect(() => {
    loadOverdue();
  }, [loadOverdue]);

  async function toggleReminders(on: boolean) {
    setSavingReminders(true);
    const res = await fetch("/api/business/income/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reminders: on }),
    }).catch(() => null);
    setSavingReminders(false);
    if (!res?.ok) return;
    setOverdue((o) => (o ? { ...o, enabled: on } : o));
    setToast(on ? S.remindOnToast : S.remindOffToast);
  }

  const overdueByStaff = useMemo(() => {
    const m = new Map<string, { name: string; items: OverdueBooking[] }>();
    for (const b of overdue?.bookings ?? []) {
      const key = b.staffId ?? "";
      const row = m.get(key) ?? { name: b.staffName ?? S.noStaff, items: [] };
      row.items.push(b);
      m.set(key, row);
    }
    return [...m.values()].sort((a, b) => b.items.length - a.items.length);
  }, [overdue, S.noStaff]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const money = (c: number, cur = currency) => formatMoney(c, cur, locale);
  const list = useMemo(() => reports ?? [], [reports]);
  const stats = useMemo(() => {
    const sum = (xs: IncomeReportJson[]) => xs.reduce((n, r) => n + r.totalCents, 0);
    const approved = list.filter((r) => r.status === "APPROVED");
    const pending = list.filter((r) => r.status === "PENDING");
    const rejected = list.filter((r) => r.status === "REJECTED");
    const tips = list.reduce((n, r) => n + r.tipCents, 0);
    return { total: sum(list), approved: sum(approved), pending: sum(pending), pendingCount: pending.length, rejectedCount: rejected.length, count: list.length, tips };
  }, [list]);

  const byStaff = useMemo(() => {
    const m = new Map<string, { name: string; total: number; count: number; pending: number; tips: number }>();
    for (const r of list) {
      const key = r.staffId ?? "";
      const row = m.get(key) ?? { name: r.staffName ?? S.noStaff, total: 0, count: 0, pending: 0, tips: 0 };
      row.total += r.totalCents;
      row.tips += r.tipCents;
      row.count += 1;
      if (r.status === "PENDING") row.pending += 1;
      m.set(key, row);
    }
    return [...m.entries()].sort((a, b) => b[1].total - a[1].total);
  }, [list, S.noStaff]);

  async function setApproval(r: IncomeReportJson, action: "approve" | "unapprove" | "reject", note?: string) {
    setBusyId(r.id);
    const res = await fetch(`/api/business/income/${r.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, note }),
    }).catch(() => null);
    setBusyId(null);
    if (!res?.ok) return;
    const { report } = await res.json();
    setReports((prev) => prev?.map((x) => (x.id === r.id ? report : x)) ?? prev);
    setRejecting(null);
    setToast(action === "approve" ? S.approvedToast : action === "reject" ? S.rejectedToast : S.unapprovedToast);
    // The menu's "waiting" badge is server-rendered.
    router.refresh();
  }

  async function approveAll() {
    const waiting = list.filter((r) => r.status === "PENDING");
    if (!waiting.length || !window.confirm(fill(S.approveAllConfirm, { n: waiting.length }))) return;
    setBulkBusy(true);
    for (const r of waiting) {
      await fetch(`/api/business/income/${r.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      }).catch(() => null);
    }
    setBulkBusy(false);
    setToast(S.approvedToast);
    load();
    router.refresh();
  }

  const dateFmt = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: timezone });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] px-6 py-7 text-white sm:px-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c99a3f]/20 blur-3xl" />
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#e8d3a6]">
            <TrendingUp className="h-4 w-4" />
            {isOwner ? S.ownerEyebrow : S.staffEyebrow}
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{isOwner ? S.ownerTitle : S.staffTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">{isOwner ? S.ownerSub : S.staffSub}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Wallet, label: `${S.statTotal} · ${fill(S.reportsN, { n: stats.count })}`, value: money(stats.total) },
              { icon: CheckCircle2, label: S.statApproved, value: money(stats.approved) },
              { icon: Clock3, label: `${S.statPending} (${stats.pendingCount})`, value: money(stats.pending) },
              { icon: HandCoins, label: S.statTip, value: money(stats.tips) },
            ].map((x) => (
              <div key={x.label} className="min-w-0 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{reports ? x.value : "–"}</p>
                <p className="truncate text-[11px] font-semibold text-white/55">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-3xl border border-ink-100 bg-white p-3 lg:flex-row lg:items-center">
        <div className="flex gap-1 overflow-x-auto rounded-full bg-mist-50 p-1">
          {(
            [
              ["today", S.periodToday],
              ["week", S.periodWeek],
              ["month", S.periodMonth],
              ["last", S.periodLast],
            ] as [Period, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setPeriod(k)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${period === k ? "bg-[#1f182d] text-white shadow" : "text-ink-700 hover:bg-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto rounded-full bg-mist-50 p-1">
          {(
            [
              ["", S.allStatus],
              ["PENDING", S.statPending],
              ["APPROVED", S.statApproved],
              ["REJECTED", S.rejected],
            ] as [StatusFilter, string][]
          ).map(([k, label]) => (
            <button
              key={k || "all"}
              type="button"
              onClick={() => setStatus(k)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold transition ${status === k ? "bg-white text-[#1f182d] shadow ring-1 ring-ink-100" : "text-ink-700 hover:bg-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
        {isOwner && (
          <select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="rounded-full border border-ink-100 bg-white px-4 py-2 text-sm text-ink-900 outline-none focus:border-primary-400 lg:ml-auto lg:w-56"
          >
            <option value="">{S.allStaff}</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-3">
          {/* Staff: their bookings still waiting for a report, reportable here. */}
          {!isOwner && overdue && overdue.bookings.length > 0 && (
            <section className="overflow-hidden rounded-3xl border border-[#ecd9ad] bg-gradient-to-br from-[#fffaf0] to-[#f8eedb]">
              <div className="flex items-start gap-3 px-4 pb-2 pt-4 sm:px-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1f182d] text-[#e8d3a6]">
                  <AlarmClock className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-ink-900">
                    {S.overdueTitle} <span className="text-[#b9852d]">({overdue.bookings.length})</span>
                  </span>
                  <span className="block text-xs text-[#6b5221]">{S.overdueSub}</span>
                </span>
              </div>
              <ul className="divide-y divide-[#ecd9ad]/70 px-2 pb-2">
                {overdue.bookings.map((b) => (
                  <li key={b.id} className="flex items-center gap-3 rounded-2xl px-2.5 py-2.5">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink-900">{b.customerName || "—"}</span>
                      <span className="block truncate text-xs text-ink-400" suppressHydrationWarning>
                        {dateFmt.format(new Date(b.startsAt))} · {b.serviceName}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold tabular-nums text-ink-900">{money(b.expectedCents, b.currency)}</span>
                    <button type="button" onClick={() => setReportingOverdue(b)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${GOLD_BTN}`}>
                      {S.reportNow}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isOwner && stats.pendingCount > 0 && (
            <button
              type="button"
              onClick={approveAll}
              disabled={bulkBusy}
              className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-60 ${GOLD_BTN}`}
            >
              {bulkBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
              {fill(S.approveAll, { n: stats.pendingCount })}
            </button>
          )}

          {!reports ? (
            <div className="flex justify-center rounded-3xl border border-ink-100 bg-white py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
            </div>
          ) : list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-12 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Receipt className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.empty}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.howText}</p>
              <Link href="/business/dashboard/bookings" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1f182d] px-5 py-2.5 text-sm font-bold text-white">
                <CalendarDays className="h-4 w-4" />
                {S.openCalendar}
              </Link>
            </div>
          ) : (
            list.map((r) => {
              const approved = r.status === "APPROVED";
              const rejected = r.status === "REJECTED";
              const diff = r.totalCents - r.expectedCents;
              const parts = [
                { icon: Banknote, label: S.cash, v: r.cashCents },
                { icon: CreditCard, label: S.bank, v: r.bankCents },
                { icon: Gift, label: r.giftCard1Code ? `${S.gift1} · ${r.giftCard1Code}` : S.gift1, v: r.giftCard1Cents, pct: r.giftCard1Percent },
                { icon: Gift, label: r.giftCard2Code ? `${S.gift2} · ${r.giftCard2Code}` : S.gift2, v: r.giftCard2Cents, pct: r.giftCard2Percent },
              ].filter((p) => p.v > 0);
              return (
                <article
                  key={r.id}
                  className={`rounded-3xl border bg-white p-4 shadow-[0_14px_34px_-30px_rgba(31,24,45,0.6)] sm:p-5 ${approved ? "border-emerald-100" : rejected ? "border-berry-200" : "border-ink-100"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {approved ? (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {S.approved}
                          </span>
                        ) : rejected ? (
                          <span className="flex items-center gap-1 rounded-full bg-berry-50 px-2.5 py-0.5 text-[11px] font-bold text-berry-600 ring-1 ring-berry-100">
                            <XCircle className="h-3.5 w-3.5" />
                            {S.rejected}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 ring-1 ring-amber-100">
                            <Clock3 className="h-3.5 w-3.5" />
                            {S.pending}
                          </span>
                        )}
                        <span className="text-[11px] text-ink-400" suppressHydrationWarning>
                          {dateFmt.format(new Date(r.serviceAt))}
                        </span>
                        {isOwner && r.staffName && (
                          <span className="flex items-center gap-1 rounded-full bg-primary-100/60 px-2 py-0.5 text-[11px] font-semibold text-primary-700">
                            <Users className="h-3 w-3" />
                            {r.staffName}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 truncate text-base font-bold text-ink-900">{r.customerName || "—"}</p>
                      <p className="truncate text-xs text-ink-400">{r.serviceName}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold tabular-nums text-ink-900">{money(r.totalCents, r.currency)}</p>
                      <p className={`text-[11px] font-semibold ${diff === 0 ? "text-ink-400" : "text-amber-700"}`}>
                        {S.expected} {money(r.expectedCents, r.currency)}
                        {diff !== 0 && <span className="block">{fill(S.mismatch, { amount: `${diff > 0 ? "+" : "−"}${money(Math.abs(diff), r.currency)}` })}</span>}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {parts.map((p) => (
                      <span key={p.label} className="flex items-center gap-1.5 rounded-full bg-mist-50 px-2.5 py-1 text-[11px] font-semibold text-ink-700 ring-1 ring-ink-100">
                        <p.icon className="h-3 w-3 text-[#b08a3e]" />
                        {p.label}
                        {"pct" in p && p.pct ? (
                          <>
                            <span className="tabular-nums text-ink-400 line-through">{money(p.v, r.currency)}</span>
                            <span className="rounded-full bg-[#1f182d] px-1.5 text-[10px] font-bold text-[#e8d3a6]">−{p.pct}%</span>
                            <span className="tabular-nums text-ink-900">{money(giftNet(p.v, p.pct), r.currency)}</span>
                          </>
                        ) : (
                          <span className="tabular-nums text-ink-900">{money(p.v, r.currency)}</span>
                        )}
                      </span>
                    ))}
                    {r.tipCents > 0 && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[#fffaf0] px-2.5 py-1 text-[11px] font-semibold text-[#6b5221] ring-1 ring-[#ecd9ad]">
                        <HandCoins className="h-3 w-3" />
                        {S.tip}
                        <span className="tabular-nums">{money(r.tipCents, r.currency)}</span>
                      </span>
                    )}
                  </div>
                  {r.note && <p className="mt-2 rounded-2xl bg-mist-50/70 px-3 py-2 text-xs text-ink-700">{r.note}</p>}
                  {rejected && r.ownerNote && (
                    <div className="mt-3 rounded-2xl bg-berry-50 px-3.5 py-3 ring-1 ring-berry-100">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-berry-600">
                        <XCircle className="h-3.5 w-3.5" />
                        {S.ownerSays}
                      </p>
                      <p className="mt-1 whitespace-pre-line text-sm text-ink-900">{r.ownerNote}</p>
                      {r.rejectedAt && (
                        <p className="mt-1 text-[11px] text-berry-500" suppressHydrationWarning>
                          {fill(S.rejectedOn, { time: dateFmt.format(new Date(r.rejectedAt)) })}
                        </p>
                      )}
                      {!isOwner && <p className="mt-1.5 text-[11px] text-ink-700">{S.resubmitHint}</p>}
                    </div>
                  )}
                  {r.photos.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {r.photos.map((url) => (
                        <button key={url} type="button" onClick={() => setZoom(url)} className="h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 ring-ink-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-3">
                    {approved && r.approvedAt && (
                      <span className="mr-auto text-[11px] text-emerald-700" suppressHydrationWarning>
                        {fill(S.approvedOn, { time: dateFmt.format(new Date(r.approvedAt)) })}
                      </span>
                    )}
                    {!approved && (
                      <button
                        type="button"
                        onClick={() => setEditing(r)}
                        className={`mr-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${rejected && !isOwner ? "bg-[#1f182d] text-white" : "text-ink-700 hover:bg-mist-50"}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {rejected && !isOwner ? S.resubmit : S.update}
                      </button>
                    )}
                    {isOwner && !approved && !rejected && (
                      <button
                        type="button"
                        onClick={() => setRejecting(rejecting?.id === r.id ? null : { id: r.id, note: "", error: false })}
                        disabled={busyId === r.id}
                        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold ring-1 transition ${rejecting?.id === r.id ? "bg-berry-500 text-white ring-berry-500" : "text-berry-600 ring-berry-200 hover:bg-berry-50"}`}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        {S.reject}
                      </button>
                    )}
                    {isOwner &&
                      (approved ? (
                        <button
                          type="button"
                          onClick={() => setApproval(r, "unapprove")}
                          disabled={busyId === r.id}
                          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-400 ring-1 ring-ink-100 hover:text-ink-700"
                        >
                          <Undo2 className="h-3.5 w-3.5" />
                          {S.unapprove}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setApproval(r, "approve")}
                          disabled={busyId === r.id}
                          className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                        >
                          {busyId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          {S.approve}
                        </button>
                      ))}
                  </div>

                  {rejecting?.id === r.id && (
                    <div className="mt-3 rounded-2xl bg-berry-50/60 p-3 ring-1 ring-berry-100">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold text-berry-600">{S.rejectTitle}</span>
                        <textarea
                          autoFocus
                          rows={3}
                          maxLength={500}
                          value={rejecting.note}
                          onChange={(e) => setRejecting({ ...rejecting, note: e.target.value, error: false })}
                          placeholder={S.rejectPh}
                          className="w-full resize-none rounded-2xl border border-berry-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-berry-300 focus:ring-4 focus:ring-berry-100"
                        />
                      </label>
                      {rejecting.error && <p className="mt-1 text-xs font-semibold text-berry-500">{S.errReason}</p>}
                      <div className="mt-2 flex justify-end gap-2">
                        <button type="button" onClick={() => setRejecting(null)} className="rounded-full px-3.5 py-2 text-xs font-semibold text-ink-700 hover:bg-white">
                          {S.rejectCancel}
                        </button>
                        <button
                          type="button"
                          disabled={busyId === r.id}
                          onClick={() =>
                            rejecting.note.trim() ? setApproval(r, "reject", rejecting.note.trim()) : setRejecting({ ...rejecting, error: true })
                          }
                          className="flex items-center gap-1.5 rounded-full bg-berry-500 px-4 py-2 text-xs font-bold text-white hover:bg-berry-600 disabled:opacity-60"
                        >
                          {busyId === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                          {S.rejectSend}
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Side: per staff member (owner) or how it works (staff) */}
        <aside className="min-w-0 space-y-4">
          {isOwner ? (
            <section className="rounded-3xl border border-ink-100 bg-white p-5">
              <p className="flex items-center gap-2 font-bold text-ink-900">
                <Users className="h-4 w-4 text-[#c99a3f]" />
                {S.byStaff}
              </p>
              {byStaff.length === 0 ? (
                <p className="mt-2 text-sm text-ink-400">—</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {byStaff.map(([id, row]) => (
                    <li key={id || "none"}>
                      <button
                        type="button"
                        onClick={() => id && setStaffId(staffId === id ? "" : id)}
                        className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${staffId === id && id ? "bg-[#1f182d] text-white" : "hover:bg-mist-50"}`}
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${staffId === id && id ? "bg-white/10 text-[#e8d3a6]" : "bg-gradient-to-br from-[#624f89] to-[#3b2f55] text-[#e8d3a6]"}`}>
                          {row.name.trim()[0]?.toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{row.name}</span>
                          <span className={`block text-[11px] ${staffId === id && id ? "text-white/60" : "text-ink-400"}`}>
                            {fill(S.reportsN, { n: row.count })}
                            {row.pending > 0 ? ` · ${row.pending} ${S.statPending.toLowerCase()}` : ""}
                            {row.tips > 0 ? ` · ${fill(S.tipOf, { amount: money(row.tips) })}` : ""}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm font-bold tabular-nums">{money(row.total)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}

          {isOwner && overdue && (
            <section className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
              {/* Owner switch: alarm + daily email for staff who haven't reported. */}
              <label className={`flex items-start gap-3 bg-gradient-to-br from-[#1f182d] to-[#40325c] p-4 text-white ${savingReminders ? "opacity-70" : "cursor-pointer"}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#e8d3a6] ring-1 ring-white/15">
                  <BellRing className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold">{S.remindTitle}</span>
                    <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${overdue.enabled ? "bg-[#c99a3f]" : "bg-white/20"}`}>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={overdue.enabled}
                        disabled={savingReminders}
                        onChange={(e) => toggleReminders(e.target.checked)}
                      />
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${overdue.enabled ? "left-[22px]" : "left-0.5"}`} />
                    </span>
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-white/65">{S.remindText}</span>
                  <span className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${overdue.enabled ? "bg-emerald-400/20 text-emerald-200" : "bg-white/10 text-white/60"}`}>
                    {overdue.enabled ? S.remindOn : S.remindOff}
                  </span>
                </span>
              </label>
              <div className="p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <AlarmClock className="h-4 w-4 text-[#c99a3f]" />
                  {S.overdueTitle}
                  {overdue.bookings.length > 0 && (
                    <span className="rounded-full bg-berry-50 px-2 py-0.5 text-[11px] font-bold text-berry-600">{overdue.bookings.length}</span>
                  )}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-400">{S.overdueSub}</p>
                {overdueByStaff.length === 0 ? (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {S.overdueNone}
                  </p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {overdueByStaff.map((row) => (
                      <li key={row.name}>
                        <p className="flex items-center justify-between gap-2 text-xs font-bold text-ink-900">
                          <span className="truncate">{row.name}</span>
                          <span className="shrink-0 text-berry-600">{fill(S.overdueByStaff, { n: row.items.length })}</span>
                        </p>
                        <ul className="mt-1 space-y-1">
                          {row.items.slice(0, 5).map((b) => (
                            <li key={b.id}>
                              <button
                                type="button"
                                onClick={() => setReportingOverdue(b)}
                                className="flex w-full items-center justify-between gap-2 rounded-xl bg-mist-50/70 px-2.5 py-1.5 text-left text-[11px] hover:bg-mist-50"
                              >
                                <span className="min-w-0 truncate text-ink-700" suppressHydrationWarning>
                                  {dateFmt.format(new Date(b.startsAt))} · {b.customerName || "—"}
                                </span>
                                <span className="shrink-0 font-semibold tabular-nums text-ink-900">{money(b.expectedCents, b.currency)}</span>
                              </button>
                            </li>
                          ))}
                          {row.items.length > 5 && <li className="px-2.5 text-[11px] text-ink-400">+{row.items.length - 5}</li>}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          <section className="rounded-3xl bg-gradient-to-br from-[#fffaf0] to-[#f6ead2] p-5 ring-1 ring-[#ecd9ad]">
            <p className="flex items-center gap-2 text-sm font-bold text-[#6b5221]">
              <Receipt className="h-4 w-4" />
              {S.howTitle}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#6b5221]/90">{S.howText}</p>
            <Link href="/business/dashboard/bookings" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1f182d]">
              <CalendarDays className="h-3.5 w-3.5" />
              {S.openCalendar} →
            </Link>
          </section>
        </aside>
      </div>

      {reportingOverdue && (
        <IncomeReportModal
          locale={locale}
          booking={{
            id: reportingOverdue.id,
            customerName: reportingOverdue.customerName,
            serviceName: reportingOverdue.serviceName,
            staffName: reportingOverdue.staffName,
            startsAt: reportingOverdue.startsAt,
            expectedCents: reportingOverdue.expectedCents,
            currency: reportingOverdue.currency,
          }}
          report={null}
          onClose={() => setReportingOverdue(null)}
          onSaved={() => {
            loadOverdue();
            load();
          }}
        />
      )}

      {editing && (
        <IncomeReportModal
          locale={locale}
          booking={{
            id: editing.bookingId,
            customerName: editing.customerName,
            serviceName: editing.serviceName,
            staffName: editing.staffName,
            startsAt: editing.serviceAt,
            expectedCents: editing.expectedCents,
            currency: editing.currency,
          }}
          report={editing}
          onClose={() => setEditing(null)}
          onSaved={() => load()}
        />
      )}

      {zoom && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4" onClick={() => setZoom(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="" className="max-h-full max-w-full rounded-2xl" />
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );
}
