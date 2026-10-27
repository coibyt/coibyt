"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import {
  CalendarCheck,
  CalendarClock,
  Check,
  Copy,
  Crown,
  Download,
  ExternalLink,
  FileText,
  HeartHandshake,
  Loader2,
  Mail,
  Phone,
  Repeat,
  Scissors,
  Search,
  Send,
  Sparkles,
  StickyNote,
  Ticket,
  TrendingUp,
  UserRound,
  UserX,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { customersStrings, type CustomerSegment } from "@/lib/customers-strings";
import { Link, getPathname, useRouter } from "@/i18n/navigation";

export interface CustomerRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  walkIn: boolean;
  /** Completed visits. */
  visits: number;
  bookings: number;
  noShows: number;
  spentCents: number;
  currency: string;
  firstVisit: string | null;
  lastVisit: string | null;
  nextVisit: string | null;
  hasNote: boolean;
}

interface CustomerDetail {
  customer: { name: string; phone: string | null; email: string };
  visitCount: number;
  totalSpentCents: number;
  currency: string;
  bookings: {
    id: string;
    businessId: string;
    branchName: string;
    startsAt: string;
    status: string;
    staffName: string | null;
    cancelReason: string | null;
    serviceName: string;
    priceCents: number;
    currency: string;
    customerNote: string | null;
    loyaltyScans: string[];
    rewardApplied: boolean;
    invoiceId: string | null;
    invoiceUrl: string | null;
  }[];
  loyalty: { pointsRequired: number; discountPercent: number } | null;
  note: string;
  card: { token: string; points: number } | null;
}

const DAY = 24 * 60 * 60 * 1000;
const PAGE = 40;
const SEGMENTS: CustomerSegment[] = ["all", "vip", "regular", "new", "upcoming", "atRisk"];
const SEGMENT_ICON: Record<CustomerSegment, typeof Users> = {
  all: Users,
  vip: Crown,
  regular: HeartHandshake,
  new: Sparkles,
  upcoming: CalendarClock,
  atRisk: UserX,
};
// The marketing studio's matching audience, for "Email this group".
const MARKETING_SEGMENT: Partial<Record<CustomerSegment, string>> = { all: "ALL", vip: "LOYAL", regular: "LOYAL", new: "NEW", atRisk: "LAPSED" };
const TONES = ["from-[#624f89] to-[#1f182d]", "from-[#c2378f] to-[#6d2a6f]", "from-[#03878f] to-[#013a3e]", "from-[#d9b25c] to-[#8a6a2b]", "from-[#ec6a47] to-[#a31f3f]"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";

function tone(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

function initials(name: string) {
  const w = name.trim().split(/\s+/);
  return ((w[0]?.[0] ?? "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
}

export function CustomersManager({
  customers,
  locale,
  currentBusinessId,
  canManageBookings,
  canEmail,
}: {
  customers: CustomerRow[];
  locale: string;
  // The branch currently active in the dashboard — a visit at a different
  // one of the owner's branches needs switching to before the bookings page
  // can open it.
  currentBusinessId: string;
  canManageBookings: boolean;
  /** Owners can jump to the marketing studio with a matching audience. */
  canEmail: boolean;
}) {
  const S = customersStrings(locale);
  const tStatus = useTranslations("booking.status");
  const tCancelReason = useTranslations("booking.cancelReason");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<CustomerSegment>("all");
  const [sort, setSort] = useState<"recent" | "spent" | "visits" | "name">("recent");
  const [limit, setLimit] = useState(PAGE);
  const [detailFor, setDetailFor] = useState<CustomerRow | null>(null);
  const [detail, setDetail] = useState<CustomerDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [jumpingToBookingId, setJumpingToBookingId] = useState<string | null>(null);
  const [resendingInvoiceId, setResendingInvoiceId] = useState<string | null>(null);
  const [resendInvoiceResult, setResendInvoiceResult] = useState<{ id: string; ok: boolean } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [now] = useState(() => Date.now());
  useEffect(() => setMounted(true), []);

  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
  const shortFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2200);
  }

  // VIP: the top tenth by spend (at least 3 visits), or 8+ visits.
  const vipFloor = useMemo(() => {
    const spends = customers.map((c) => c.spentCents).filter((x) => x > 0).sort((a, b) => b - a);
    return spends.length ? spends[Math.max(0, Math.ceil(spends.length * 0.1) - 1)] : Infinity;
  }, [customers]);
  const inSegment = (c: CustomerRow, s: CustomerSegment) => {
    switch (s) {
      case "all":
        return true;
      case "vip":
        return (c.visits >= 3 && c.spentCents >= vipFloor) || c.visits >= 8;
      case "regular":
        return c.visits >= 3;
      case "new":
        return !!c.firstVisit && now - new Date(c.firstVisit).getTime() <= 30 * DAY;
      case "upcoming":
        return !!c.nextVisit;
      case "atRisk":
        return !!c.lastVisit && now - new Date(c.lastVisit).getTime() > 90 * DAY && !c.nextVisit;
    }
  };

  const counts = useMemo(() => Object.fromEntries(SEGMENTS.map((s) => [s, customers.filter((c) => inSegment(c, s)).length])) as Record<CustomerSegment, number>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers, vipFloor]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = customers.filter(
      (c) =>
        inSegment(c, segment) &&
        (!q || c.name.toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.phone ?? "").replace(/\s/g, "").includes(q.replace(/\s/g, "")))
    );
    if (sort === "spent") list.sort((a, b) => b.spentCents - a.spentCents);
    if (sort === "visits") list.sort((a, b) => b.visits - a.visits);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, locale));
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customers, query, segment, sort, vipFloor]);

  useEffect(() => setLimit(PAGE), [query, segment, sort]);

  const withVisits = customers.filter((c) => c.visits > 0);
  const stats = {
    total: customers.length,
    new: counts.new,
    returning: withVisits.length ? Math.round((withVisits.filter((c) => c.visits >= 2).length / withVisits.length) * 100) : 0,
    value: withVisits.length ? Math.round(withVisits.reduce((n, c) => n + c.spentCents, 0) / withVisits.length) : 0,
    atRisk: counts.atRisk,
  };
  const currency = customers[0]?.currency ?? "EUR";

  function ago(iso: string | null) {
    if (!iso) return S.never;
    const days = Math.floor((now - new Date(iso).getTime()) / DAY);
    return days <= 0 ? S.today : fill(S.daysAgo, { n: days });
  }

  function exportCsv() {
    const cell = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "");
    const lines = [
      S.csv.map(cell).join(","),
      ...filtered.map((c) =>
        [c.name, c.walkIn ? "" : c.email, c.phone, c.visits, formatMoney(c.spentCents, c.currency, locale), day(c.firstVisit), day(c.lastVisit), day(c.nextVisit), c.noShows]
          .map(cell)
          .join(",")
      ),
    ];
    const blob = new Blob([`﻿${lines.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `customers-${segment}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function resendInvoice(invoiceId: string, email: string) {
    setResendingInvoiceId(invoiceId);
    setResendInvoiceResult(null);
    const res = await fetch(`/api/business/invoices/${invoiceId}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResendingInvoiceId(null);
    setResendInvoiceResult({ id: invoiceId, ok: res.ok });
  }

  async function openBooking(bookingId: string, bookingBusinessId: string) {
    setJumpingToBookingId(bookingId);
    try {
      if (bookingBusinessId !== currentBusinessId) {
        await fetch("/api/business/switch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId: bookingBusinessId }),
        });
        window.location.href = `${getPathname({ href: "/business/dashboard/bookings", locale })}?edit=${bookingId}`;
        return;
      }
      router.push(`/business/dashboard/bookings?edit=${bookingId}`);
    } finally {
      setJumpingToBookingId(null);
    }
  }

  function openDetail(c: CustomerRow) {
    setDetailFor(c);
    setDetail(null);
    setNote("");
    setLoadingDetail(true);
    fetch(`/api/business/customers/${c.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: CustomerDetail | null) => {
        setDetail(d);
        setNote(d?.note ?? "");
      })
      .finally(() => setLoadingDetail(false));
  }

  async function saveNote() {
    if (!detailFor) return;
    setSavingNote(true);
    const res = await fetch(`/api/business/customers/${detailFor.id}/note`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    }).catch(() => null);
    setSavingNote(false);
    if (res?.ok) {
      flash(S.noteSaved);
      setDetail((d) => (d ? { ...d, note: note.trim() } : d));
      router.refresh();
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    flash(S.copied);
  }

  const marketingSegment = MARKETING_SEGMENT[segment];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
            <Users className="h-4 w-4" />
            {S.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{S.sub}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              { icon: Users, label: S.statCustomers, value: stats.total.toLocaleString(locale) },
              { icon: Sparkles, label: S.statNew, value: stats.new.toLocaleString(locale) },
              { icon: Repeat, label: S.statReturning, value: `${stats.returning}%` },
              { icon: Wallet, label: S.statValue, value: formatMoney(stats.value, currency, locale) },
              { icon: UserX, label: S.statAtRisk, value: stats.atRisk.toLocaleString(locale) },
            ].map((x, i) => (
              <div key={x.label} className={`rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {customers.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
            <Users className="h-6 w-6" />
          </span>
          <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
        </div>
      ) : (
        <>
          {/* Segments */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {SEGMENTS.map((s) => {
              const Icon = SEGMENT_ICON[s];
              const on = segment === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSegment(s)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                    on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${on ? "text-[#e8d3a6]" : "text-ink-400"}`} />
                  {S.segments[s]}
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${on ? "bg-white/15" : "bg-mist-50 text-ink-400"}`}>{counts[s]}</span>
                </button>
              );
            })}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col gap-2 rounded-3xl border border-ink-100 bg-white p-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={S.searchPh} className={`${FIELD} !py-2.5 pl-10`} />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${FIELD} !w-auto !py-2.5`}>
                <option value="recent">{S.sortRecent}</option>
                <option value="spent">{S.sortSpent}</option>
                <option value="visits">{S.sortVisits}</option>
                <option value="name">{S.sortName}</option>
              </select>
              <button type="button" onClick={exportCsv} className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
                <Download className="h-4 w-4" />
                {S.export}
              </button>
              {canEmail && marketingSegment && (
                <Link
                  href={`/business/dashboard/marketing?segment=${marketingSegment}`}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold ${GOLD_BTN}`}
                >
                  <Send className="h-4 w-4" />
                  {S.emailSegment}
                </Link>
              )}
            </div>
          </div>

          {/* List */}
          {filtered.length === 0 ? (
            <p className="rounded-3xl bg-white px-6 py-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noMatch}</p>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
              <ul className="divide-y divide-ink-100">
                {filtered.slice(0, limit).map((c) => {
                  const vip = inSegment(c, "vip");
                  const atRisk = inSegment(c, "atRisk");
                  const isNew = inSegment(c, "new");
                  return (
                    <li key={c.id}>
                      <button type="button" onClick={() => openDetail(c)} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-mist-50/60 sm:px-5">
                        <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white ${tone(c.id)}`}>
                          {initials(c.name)}
                          {vip && (
                            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e8d3a6] text-[#1f182d] ring-2 ring-white">
                              <Crown className="h-3 w-3" />
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-1.5">
                            <span className="truncate font-bold text-ink-900">{c.name}</span>
                            {isNew && <span className="rounded-full bg-primary-100/70 px-2 py-0.5 text-[10px] font-bold text-primary-700">{S.segments.new}</span>}
                            {atRisk && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">{S.segments.atRisk}</span>}
                            {c.walkIn && <span className="rounded-full bg-mist-50 px-2 py-0.5 text-[10px] font-bold text-ink-400 ring-1 ring-ink-100">{S.walkIn}</span>}
                            {c.hasNote && <StickyNote className="h-3.5 w-3.5 text-[#c99a3f]" aria-label={S.noteTag} />}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-400">
                            {[c.phone, c.walkIn ? null : c.email].filter(Boolean).join(" · ") || "—"}
                          </span>
                          <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-ink-400 sm:hidden">
                            <span>{fill(S.visits, { n: c.visits })}</span>
                            <span>{ago(c.lastVisit)}</span>
                          </span>
                          {c.nextVisit && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              <CalendarClock className="h-3 w-3" />
                              {fill(S.next, { date: shortFmt.format(new Date(c.nextVisit)) })}
                            </span>
                          )}
                        </span>
                        <span className="hidden w-24 shrink-0 text-center sm:block">
                          <span className="block text-sm font-bold tabular-nums text-ink-900">{c.visits}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{fill(S.visits, { n: "" }).trim()}</span>
                        </span>
                        <span className="hidden w-28 shrink-0 text-center md:block">
                          <span className="block text-sm font-semibold text-ink-700">{ago(c.lastVisit)}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{S.lastVisit}</span>
                        </span>
                        <span className="w-24 shrink-0 text-right">
                          <span className="block text-sm font-bold tabular-nums text-ink-900">{formatMoney(c.spentCents, c.currency, locale)}</span>
                          {c.noShows > 0 ? (
                            <span className="text-[10px] font-bold text-berry-500">{fill(S.noShows, { n: c.noShows })}</span>
                          ) : (
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{S.spent}</span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {filtered.length > limit && (
                <button type="button" onClick={() => setLimit(limit + PAGE)} className="w-full border-t border-ink-100 py-3 text-sm font-semibold text-primary-600 hover:bg-mist-50/60">
                  {fill(S.showMore, { n: Math.min(PAGE, filtered.length - limit) })}
                </button>
              )}
            </div>
          )}
        </>
      )}

      {mounted && detailFor && createPortal(renderDrawer(detailFor), document.body)}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[95] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );

  // The customer's profile, sliding in from the right.
  function renderDrawer(c: CustomerRow) {
    const d = detail;
    const count = (key: (b: CustomerDetail["bookings"][number]) => string | null) => {
      const m = new Map<string, number>();
      for (const b of d?.bookings ?? []) {
        if (b.status === "CANCELLED") continue;
        const k = key(b);
        if (k) m.set(k, (m.get(k) ?? 0) + 1);
      }
      return [...m.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    };
    const favService = count((b) => b.serviceName);
    const favStaff = count((b) => b.staffName);
    const unreliable = d ? d.bookings.filter((b) => b.status === "CANCELLED" || b.status === "NO_SHOW").length : 0;
    const email = d?.customer.email && !d.customer.email.includes("@walkin.") ? d.customer.email : null;
    const phone = d?.customer.phone ?? null;

    return (
      <div className="fixed inset-0 z-[80] flex justify-end bg-[#1f182d]/50 backdrop-blur-sm" onClick={() => setDetailFor(null)}>
        <div onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-xl flex-col bg-[#faf8fd] shadow-2xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-[#1f182d] px-5 pb-5 pt-5 text-white sm:px-6">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#624f89]/60 blur-3xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3.5">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold ring-2 ring-white/20 ${tone(c.id)}`}>{initials(c.name)}</span>
                <div className="min-w-0">
                  <p className="truncate font-serif text-2xl">{c.name}</p>
                  <p className="mt-0.5 flex flex-wrap gap-1.5 text-[11px] font-bold">
                    {inSegment(c, "vip") && (
                      <span className="flex items-center gap-1 rounded-full bg-[#e8d3a6] px-2 py-0.5 text-[#1f182d]">
                        <Crown className="h-3 w-3" />
                        VIP
                      </span>
                    )}
                    {inSegment(c, "regular") && <span className="rounded-full bg-white/15 px-2 py-0.5">{S.segments.regular}</span>}
                    {inSegment(c, "new") && <span className="rounded-full bg-white/15 px-2 py-0.5">{S.segments.new}</span>}
                    {inSegment(c, "atRisk") && <span className="rounded-full bg-amber-400/25 px-2 py-0.5 text-amber-100">{S.segments.atRisk}</span>}
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setDetailFor(null)} aria-label={S.close} className="rounded-full p-2 text-white/70 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            {(phone || email) && (
              <div className="relative mt-4 flex flex-wrap gap-2">
                {phone && (
                  <>
                    <a href={`tel:${phone}`} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/20">
                      <Phone className="h-3.5 w-3.5" />
                      {phone}
                    </a>
                  </>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex min-w-0 items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/20">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{email}</span>
                  </a>
                )}
                {email && (
                  <button type="button" onClick={() => copy(email)} title={S.copy} aria-label={S.copy} className="rounded-full bg-white/10 p-2 ring-1 ring-white/15 hover:bg-white/20">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
            {loadingDetail && (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-ink-300" />
              </div>
            )}
            {d && (
              <>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: CalendarCheck, label: S.completed, value: String(d.visitCount) },
                    { icon: TrendingUp, label: S.totalSpent, value: formatMoney(d.totalSpentCents, d.currency, locale) },
                    { icon: Wallet, label: S.avgTicket, value: d.visitCount ? formatMoney(Math.round(d.totalSpentCents / d.visitCount), d.currency, locale) : "—" },
                    { icon: UserX, label: S.reliability, value: String(unreliable), warn: unreliable > 1 },
                  ].map((x) => (
                    <div key={x.label} className="rounded-2xl bg-white p-3.5 ring-1 ring-ink-100">
                      <x.icon className={`h-4 w-4 ${x.warn ? "text-berry-500" : "text-primary-500"}`} />
                      <p className={`mt-2 truncate text-lg font-bold tabular-nums ${x.warn ? "text-berry-500" : "text-ink-900"}`}>{x.value}</p>
                      <p className="text-[11px] font-medium text-ink-400">{x.label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 rounded-3xl bg-white p-4 text-sm ring-1 ring-ink-100">
                  {[
                    { icon: UserRound, label: S.firstVisit, value: c.firstVisit ? dateFmt.format(new Date(c.firstVisit)) : "—" },
                    { icon: Scissors, label: S.favService, value: favService ?? "—" },
                    { icon: HeartHandshake, label: S.favStaff, value: favStaff ?? "—" },
                  ].map((x) => (
                    <p key={x.label} className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-ink-400">
                        <x.icon className="h-4 w-4" />
                        {x.label}
                      </span>
                      <span className="truncate font-semibold text-ink-900">{x.value}</span>
                    </p>
                  ))}
                  {d.card && (
                    <p className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-ink-400">
                        <Ticket className="h-4 w-4" />
                        {S.card}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-ink-900">
                          {fill(S.cardTickets, { n: d.card.points })}
                          {d.loyalty ? ` / ${d.loyalty.pointsRequired}` : ""}
                        </span>
                        <Link href={`/loyalty/${d.card.token}`} target="_blank" className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline">
                          {S.openCard}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </span>
                    </p>
                  )}
                </div>

                {/* Private note */}
                <div className="rounded-3xl bg-gradient-to-br from-[#fffaf0] to-[#f8eedb] p-4 ring-1 ring-[#ecd9ad]">
                  <p className="flex items-center gap-2 text-sm font-bold text-[#6b5221]">
                    <StickyNote className="h-4 w-4" />
                    {S.noteTitle}
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#8a6a2b]">{S.noteHint}</p>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={4000} placeholder={S.notePh} className={`${FIELD} mt-2.5 border-[#ecd9ad]`} />
                  {note.trim() !== (d.note ?? "").trim() && (
                    <button type="button" onClick={saveNote} disabled={savingNote} className={`mt-2 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                      {savingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      {S.saveNote}
                    </button>
                  )}
                </div>

                {/* History */}
                <div>
                  <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b08a3e]">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    {S.historyTitle}
                  </p>
                  <ol className="relative space-y-2.5 border-l-2 border-ink-100 pl-4">
                    {d.bookings.map((b) => {
                      const future = new Date(b.startsAt).getTime() > now;
                      const dot =
                        b.status === "COMPLETED" ? "bg-emerald-500" : b.status === "CANCELLED" || b.status === "NO_SHOW" ? "bg-berry-500" : future ? "bg-primary-500" : "bg-ink-300";
                      return (
                        <li key={b.id} className="relative rounded-2xl bg-white p-3.5 text-xs ring-1 ring-ink-100">
                          <span className={`absolute -left-[23px] top-4 h-3 w-3 rounded-full ring-4 ring-[#faf8fd] ${dot}`} />
                          <div className="flex items-start justify-between gap-2">
                            <span className="min-w-0">
                              <span className="block text-sm font-bold text-ink-900">{b.serviceName}</span>
                              <span className="text-ink-400">
                                {dateFmt.format(new Date(b.startsAt))}
                                {b.staffName && ` · ${b.staffName}`}
                                {` · ${b.branchName}`}
                              </span>
                            </span>
                            <span className="shrink-0 text-right">
                              <span className="block text-sm font-bold tabular-nums text-ink-900">{formatMoney(b.priceCents, b.currency, locale)}</span>
                              <span className="font-semibold text-ink-400">{tStatus(b.status as never)}</span>
                            </span>
                          </div>
                          {b.cancelReason && <p className="mt-1 text-berry-500">{tCancelReason(b.cancelReason as never)}</p>}
                          {(b.loyaltyScans.length > 0 || b.rewardApplied) && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {b.loyaltyScans.map((time, i) => (
                                <span key={i} className="rounded-full bg-[#fbf3e1] px-2 py-0.5 font-semibold text-[#8a6a2b]">
                                  {fill(S.ticket, { time })}
                                </span>
                              ))}
                              {b.rewardApplied && (
                                <span className="rounded-full bg-berry-50 px-2 py-0.5 font-semibold text-berry-500">
                                  {fill(S.rewardApplied, { pct: d.loyalty?.discountPercent ?? 0, n: d.loyalty?.pointsRequired ?? 0 })}
                                </span>
                              )}
                            </div>
                          )}
                          {b.customerNote && <p className="mt-1.5 whitespace-pre-line rounded-xl bg-mist-50 px-2.5 py-1.5 text-ink-700">{b.customerNote}</p>}
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                            {canManageBookings && (
                              <button
                                type="button"
                                disabled={jumpingToBookingId === b.id}
                                onClick={() => openBooking(b.id, b.businessId)}
                                className="font-semibold text-primary-600 hover:underline disabled:opacity-50"
                              >
                                {jumpingToBookingId === b.id ? "…" : S.editBooking}
                              </button>
                            )}
                            {b.invoiceId && b.invoiceUrl && (
                              <>
                                <span className="flex items-center gap-1 font-semibold text-emerald-700">
                                  <FileText className="h-3 w-3" />
                                  {S.invoiceIssued}
                                </span>
                                <a href={b.invoiceUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary-600 hover:underline">
                                  {S.viewInvoice}
                                </a>
                                {canManageBookings && email && (
                                  <button
                                    type="button"
                                    disabled={resendingInvoiceId === b.invoiceId}
                                    onClick={() => resendInvoice(b.invoiceId!, email)}
                                    className="font-semibold text-primary-600 hover:underline disabled:opacity-50"
                                  >
                                    {resendingInvoiceId === b.invoiceId ? "…" : S.resendInvoice}
                                  </button>
                                )}
                                {resendInvoiceResult?.id === b.invoiceId && (
                                  <span className={resendInvoiceResult.ok ? "text-emerald-700" : "text-berry-500"}>{resendInvoiceResult.ok ? S.sent : S.failed}</span>
                                )}
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
