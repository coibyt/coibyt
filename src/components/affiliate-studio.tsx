"use client";

import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Banknote,
  CalendarCheck,
  Check,
  Copy,
  Crown,
  Download,
  Handshake,
  Link2,
  Loader2,
  Mail,
  MousePointerClick,
  Pencil,
  Phone,
  Plus,
  QrCode,
  Share2,
  Trash2,
  TrendingUp,
  Undo2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { formatMoney, fromSmallestUnit, toSmallestUnit } from "@/lib/money";
import { affiliateStrings } from "@/lib/affiliate-strings";
import type { AffiliatePeriod, AffiliateStats, ReferredBooking } from "@/lib/affiliate-stats";

export interface AffiliateDashboardData {
  affiliates: AffiliateStats[];
  recent: ReferredBooking[];
  totals: { partners: number; clicks: number; bookings: number; revenueCents: number; commissionCents: number; owedCents: number };
}

const PERIODS: AffiliatePeriod[] = ["30", "90", "365", "all"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const INPUT =
  "w-full rounded-2xl border border-ink-100 bg-mist-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";
const AVATARS = [
  "from-[#624f89] to-[#1f182d]",
  "from-[#c2378f] to-[#6d2a6f]",
  "from-[#03878f] to-[#013a3e]",
  "from-[#d9b25c] to-[#8a6a2b]",
  "from-[#ec6a47] to-[#a31f3f]",
];

function initials(name: string) {
  const w = name.trim().split(/\s+/);
  return ((w[0]?.[0] ?? "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
}

function Modal({ title, onClose, children, S }: { title: string; onClose: () => void; children: React.ReactNode; S: ReturnType<typeof affiliateStrings> }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white p-6 shadow-2xl sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-ink-900">{title}</h3>
          <button type="button" onClick={onClose} aria-label={S.close} className="rounded-full p-1.5 text-ink-400 hover:bg-mist-50">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AffiliateStudio({
  initial,
  initialPeriod,
  locale,
  currency,
  linkBase,
  salonName,
  isOwner,
}: {
  initial: AffiliateDashboardData;
  initialPeriod: AffiliatePeriod;
  locale: string;
  currency: string;
  linkBase: string;
  salonName: string;
  isOwner: boolean;
}) {
  const S = affiliateStrings(locale);
  const [data, setData] = useState(initial);
  const [period, setPeriod] = useState<AffiliatePeriod>(initialPeriod);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState<null | { id: string | null; name: string; email: string; phone: string; pct: string; code: string; note: string; origCode: string }>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [qr, setQr] = useState<{ name: string; url: string; img: string } | null>(null);
  const [payout, setPayout] = useState<{ a: AffiliateStats; amount: string; note: string } | null>(null);
  const [historyOpen, setHistoryOpen] = useState<string | null>(null);

  const money = (c: number) => formatMoney(c, currency, locale);
  const linkFor = (a: { code: string }) => `${linkBase}?aff=${a.code}`;

  const reload = useCallback(
    async (p: AffiliatePeriod = period) => {
      setLoading(true);
      const res = await fetch(`/api/business/affiliates?period=${p}`).catch(() => null);
      if (res?.ok) setData(await res.json());
      setLoading(false);
    },
    [period]
  );

  useEffect(() => {
    if (period !== initialPeriod) reload(period);
  }, [period, initialPeriod, reload]);

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  function copy(a: AffiliateStats) {
    navigator.clipboard.writeText(linkFor(a)).catch(() => {});
    flash(S.copied);
  }

  async function share(a: AffiliateStats) {
    const url = linkFor(a);
    if (navigator.share) {
      await navigator.share({ title: salonName, text: fill(S.shareText, { salon: salonName }), url }).catch(() => {});
    } else copy(a);
  }

  async function openQr(a: AffiliateStats) {
    const url = linkFor(a);
    const img = await QRCode.toDataURL(url, { width: 720, margin: 2, color: { dark: "#1f182d", light: "#ffffff" } });
    setQr({ name: a.name, url, img });
  }

  function openForm(a?: AffiliateStats) {
    setFormError(null);
    setForm(
      a
        ? { id: a.id, name: a.name, email: a.email ?? "", phone: a.phone ?? "", pct: String(a.commissionPercent), code: a.code, note: a.note ?? "", origCode: a.code }
        : { id: null, name: "", email: "", phone: "", pct: "10", code: "", note: "", origCode: "" }
    );
  }

  async function saveForm() {
    if (!form || !form.name.trim()) return;
    const code = form.code.trim().toUpperCase();
    if (code && !/^[A-Z0-9_-]{3,20}$/.test(code)) return setFormError(S.codeInvalid);
    setSaving(true);
    setFormError(null);
    const res = await fetch(form.id ? `/api/business/affiliates/${form.id}` : "/api/business/affiliates", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim(),
        commissionPercent: Number(form.pct) || 0,
        email: form.email.trim(),
        phone: form.phone.trim(),
        note: form.note.trim(),
        code,
      }),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) {
      const d = await res?.json().catch(() => ({}));
      return setFormError(d?.error === "CODE_TAKEN" ? S.codeTaken : S.error);
    }
    setForm(null);
    reload();
  }

  async function remove(a: AffiliateStats) {
    if (!confirm(fill(S.removeConfirm, { name: a.name }))) return;
    await fetch(`/api/business/affiliates/${a.id}`, { method: "DELETE" });
    reload();
  }

  async function savePayout() {
    if (!payout) return;
    const cents = toSmallestUnit(Number(payout.amount.replace(",", ".")) || 0, currency);
    if (cents <= 0) return;
    setSaving(true);
    const res = await fetch(`/api/business/affiliates/${payout.a.id}/payouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountCents: cents, note: payout.note }),
    }).catch(() => null);
    setSaving(false);
    if (res?.ok) {
      setPayout(null);
      reload();
    }
  }

  async function undoPayout(a: AffiliateStats, payoutId: string) {
    await fetch(`/api/business/affiliates/${a.id}/payouts?payoutId=${payoutId}`, { method: "DELETE" });
    reload();
  }

  const t = data.totals;
  const ranked = [...data.affiliates].filter((a) => a.bookings > 0).sort((x, y) => y.revenueCents - x.revenueCents).slice(0, 5);
  const examplePrice = currency === "VND" ? 500000 : 5000;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });

  return (
    <div className="space-y-6">
      <Link href="/business/dashboard/marketing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" />
        {S.back}
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
                <Handshake className="h-4 w-4" />
                {S.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
            </div>
            {isOwner && (
              <button type="button" onClick={() => openForm()} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                <Plus className="h-4 w-4" />
                {S.addPartner}
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${period === p ? "bg-white text-[#1f182d]" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                {S.periods[p]}
              </button>
            ))}
            {loading && <Loader2 className="ml-1 h-4 w-4 animate-spin self-center text-white/60" />}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              { icon: Users, label: S.statPartners, value: String(t.partners) },
              { icon: MousePointerClick, label: S.statClicks, value: t.clicks.toLocaleString(locale) },
              { icon: CalendarCheck, label: S.statBookings, value: t.bookings.toLocaleString(locale) },
              { icon: TrendingUp, label: S.statRevenue, value: money(t.revenueCents) },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <s.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{s.label}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[#e8d3a6] to-[#c99a3f] p-4 text-[#1f182d] lg:col-span-1">
              <Wallet className="h-4 w-4" />
              <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{money(t.owedCents)}</p>
              <p className="mt-0.5 text-[11px] font-bold">{S.owedTitle}</p>
              <p className="text-[10px] text-[#1f182d]/60">{S.owedHint}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="grid gap-3 sm:grid-cols-3">
        {S.how.map(([title, text], i) => (
          <div key={title} className="flex gap-3 rounded-3xl border border-ink-100 bg-white p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-sm font-bold text-[#e8d3a6]">{i + 1}</span>
            <div>
              <p className="text-sm font-bold text-ink-900">{title}</p>
              <p className="mt-0.5 text-xs text-ink-400">{text}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Partners */}
        <div className="min-w-0 space-y-4">
          <h2 className="text-lg font-bold text-ink-900">{S.partnersTitle}</h2>
          {data.affiliates.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Handshake className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
              {isOwner && (
                <button type="button" onClick={() => openForm()} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                  <Plus className="h-4 w-4" />
                  {S.addPartner}
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {data.affiliates.map((a, idx) => {
                const conv = a.clicks > 0 ? Math.round((a.bookingsAllTime / a.clicks) * 100) : null;
                return (
                  <article key={a.id} className="flex min-w-0 flex-col rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)]">
                    <div className="flex items-start gap-3">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white ${AVATARS[idx % AVATARS.length]}`}>
                        {initials(a.name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-bold text-ink-900">{a.name}</p>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-400">
                          <span className="rounded-full bg-[#fbf3e1] px-2 py-0.5 font-bold text-[#8a6a2b]">{fill(S.commission, { pct: a.commissionPercent })}</span>
                          {a.email && (
                            <a href={`mailto:${a.email}`} className="flex items-center gap-1 hover:text-primary-600">
                              <Mail className="h-3 w-3" />
                              {a.email}
                            </a>
                          )}
                          {a.phone && (
                            <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:text-primary-600">
                              <Phone className="h-3 w-3" />
                              {a.phone}
                            </a>
                          )}
                        </div>
                      </div>
                      {isOwner && (
                        <div className="flex shrink-0">
                          <button type="button" onClick={() => openForm(a)} aria-label={S.edit} title={S.edit} className="rounded-full p-2 text-ink-300 hover:bg-mist-50 hover:text-ink-700">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => remove(a)} aria-label={S.remove} title={S.remove} className="rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Link */}
                    <div className="mt-4 flex items-center gap-1.5 rounded-2xl bg-mist-50/70 p-1.5 pl-3 ring-1 ring-ink-100">
                      <Link2 className="h-4 w-4 shrink-0 text-ink-300" />
                      <code className="min-w-0 flex-1 truncate text-xs text-ink-700">{linkFor(a).replace(/^https?:\/\//, "")}</code>
                      <button type="button" onClick={() => copy(a)} title={S.copy} aria-label={S.copy} className="rounded-xl bg-white p-2 text-ink-700 shadow-sm ring-1 ring-ink-100 hover:text-primary-600">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => openQr(a)} title={S.qr} aria-label={S.qr} className="rounded-xl bg-white p-2 text-ink-700 shadow-sm ring-1 ring-ink-100 hover:text-primary-600">
                        <QrCode className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => share(a)} title={S.share} aria-label={S.share} className="rounded-xl bg-white p-2 text-ink-700 shadow-sm ring-1 ring-ink-100 hover:text-primary-600">
                        <Share2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        [MousePointerClick, S.clicks, a.clicks.toLocaleString(locale)],
                        [CalendarCheck, S.bookings, a.bookings.toLocaleString(locale)],
                        [TrendingUp, S.revenue, money(a.revenueCents)],
                        [Wallet, S.earned, money(a.commissionCents)],
                      ].map(([Icon, label, value]) => {
                        const I = Icon as typeof Wallet;
                        return (
                          <div key={label as string} className="flex min-w-0 items-center gap-2.5 rounded-2xl bg-mist-50/60 px-3 py-2.5">
                            <I className="h-4 w-4 shrink-0 text-primary-400" />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold tabular-nums text-ink-900">{value as string}</p>
                              <p className="truncate text-[10px] font-semibold uppercase tracking-wide text-ink-400">{label as string}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {conv !== null && <p className="mt-2 text-right text-[11px] font-semibold text-ink-400">{fill(S.conversion, { pct: conv })}</p>}

                    {/* Owed */}
                    <div className="mt-auto pt-4">
                      <div className={`flex items-center justify-between gap-3 rounded-2xl p-3.5 ${a.owedCents > 0 ? "bg-gradient-to-r from-[#fffaf0] to-[#f8eedb] ring-1 ring-[#ecd9ad]" : "bg-emerald-50/60 ring-1 ring-emerald-100"}`}>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.owed}</p>
                          <p className={`text-lg font-bold tabular-nums ${a.owedCents > 0 ? "text-[#8a6a2b]" : "text-emerald-700"}`}>
                            {a.owedCents > 0 ? money(a.owedCents) : S.paidAll}
                          </p>
                          {a.upcomingCents > 0 && <p className="text-[11px] text-ink-400">{fill(S.upcoming, { amount: money(a.upcomingCents) })}</p>}
                        </div>
                        {isOwner && a.owedCents > 0 && (
                          <button
                            type="button"
                            onClick={() => setPayout({ a, amount: String(fromSmallestUnit(a.owedCents, currency)), note: "" })}
                            className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#1f182d] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#40325c]"
                          >
                            <Banknote className="h-3.5 w-3.5" />
                            {S.markPaid}
                          </button>
                        )}
                      </div>
                      {a.payouts.length > 0 && (
                        <div className="mt-2">
                          <button type="button" onClick={() => setHistoryOpen(historyOpen === a.id ? null : a.id)} className="text-xs font-semibold text-primary-600 hover:underline">
                            {S.payoutsTitle} ({a.payouts.length})
                          </button>
                          {historyOpen === a.id && (
                            <ul className="mt-2 divide-y divide-ink-100 rounded-2xl bg-mist-50/50 px-3 ring-1 ring-ink-100">
                              {a.payouts.map((p) => (
                                <li key={p.id} className="flex items-center justify-between gap-2 py-2 text-xs">
                                  <span className="min-w-0">
                                    <span className="font-bold text-ink-900">{money(p.amountCents)}</span>
                                    <span className="text-ink-400"> · {dateFmt.format(new Date(p.createdAt))}</span>
                                    {p.note && <span className="block truncate text-ink-400">{p.note}</span>}
                                  </span>
                                  {isOwner && (
                                    <button type="button" onClick={() => undoPayout(a, p.id)} className="flex shrink-0 items-center gap-1 text-ink-400 hover:text-berry-500">
                                      <Undo2 className="h-3.5 w-3.5" />
                                      {S.undo}
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Side: leaderboard + recent */}
        <aside className="space-y-4">
          <section className="rounded-3xl border border-ink-100 bg-white p-5">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <Crown className="h-4 w-4 text-[#c99a3f]" />
              {S.leaderTitle}
            </p>
            {ranked.length === 0 ? (
              <p className="mt-2 text-sm text-ink-400">{S.leaderEmpty}</p>
            ) : (
              <ol className="mt-3 space-y-2.5">
                {ranked.map((a, i) => {
                  const top = ranked[0].revenueCents || 1;
                  return (
                    <li key={a.id}>
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                              i === 0 ? "bg-[#e8d3a6] text-[#1f182d]" : i === 1 ? "bg-ink-100 text-ink-700" : i === 2 ? "bg-[#f3d6c4] text-[#7a3f22]" : "bg-mist-50 text-ink-400"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className="truncate font-semibold text-ink-900">{a.name}</span>
                        </span>
                        <span className="shrink-0 font-bold tabular-nums text-ink-900">{money(a.revenueCents)}</span>
                      </div>
                      <div className="ml-8 mt-1 h-1.5 overflow-hidden rounded-full bg-ink-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" style={{ width: `${Math.max(4, (a.revenueCents / top) * 100)}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>

          <section className="rounded-3xl border border-ink-100 bg-white p-5">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <CalendarCheck className="h-4 w-4 text-primary-500" />
              {S.recentTitle}
            </p>
            {data.recent.length === 0 ? (
              <p className="mt-2 text-sm text-ink-400">{S.recentEmpty}</p>
            ) : (
              <ul className="mt-3 divide-y divide-ink-100">
                {data.recent.map((b) => (
                  <li key={b.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink-900">{b.customerName}</p>
                      <p className="truncate text-xs text-ink-400">
                        {b.serviceName} · {dateFmt.format(new Date(b.startsAt))}
                      </p>
                      <p className="truncate text-[11px] font-semibold text-primary-600">{fill(S.via, { name: b.affiliateName })}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-bold tabular-nums text-ink-900">{money(b.priceCents)}</p>
                      <p className="text-[11px] font-semibold text-[#8a6a2b]">+{money(b.commissionCents)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {/* Add / edit */}
      {form && (
        <Modal title={form.id ? S.formEdit : S.formNew} onClose={() => setForm(null)} S={S}>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.name}</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={120} placeholder={S.namePh} className={INPUT} autoFocus />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.email}</span>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={191} className={INPUT} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.phone}</span>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={40} className={INPUT} />
              </label>
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.pct}</span>
              <div className="flex flex-wrap items-center gap-2">
                {[5, 10, 15, 20].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, pct: String(p) })}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold ring-1 transition ${Number(form.pct) === p ? "bg-[#1f182d] text-white ring-[#1f182d]" : "text-ink-700 ring-ink-100 hover:bg-mist-50"}`}
                  >
                    {p}%
                  </button>
                ))}
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={form.pct}
                  onChange={(e) => setForm({ ...form, pct: e.target.value })}
                  className={`${INPUT} !w-24`}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-ink-400">
                {S.pctHint} {fill(S.example, { price: money(examplePrice), amount: money(Math.round((examplePrice * (Number(form.pct) || 0)) / 100)) })}
              </p>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.code}</span>
              <input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase().replace(/\s+/g, "") })}
                maxLength={20}
                placeholder="LAN10"
                className={`${INPUT} font-mono tracking-widest`}
              />
              <span className="mt-1 block text-[11px] text-ink-400">{S.codeHint}</span>
              {form.id && form.code && form.code !== form.origCode && <span className="mt-1 block text-[11px] font-semibold text-amber-700">{S.codeChangeWarn}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.note}</span>
              <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} maxLength={500} rows={2} placeholder={S.notePh} className={INPUT} />
            </label>
            {formError && <p className="rounded-2xl bg-berry-50 px-4 py-2.5 text-sm text-berry-500">{formError}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={saveForm} disabled={saving || !form.name.trim()} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {S.save}
              </button>
              <button type="button" onClick={() => setForm(null)} className="rounded-full px-5 py-3 text-sm font-semibold text-ink-400 ring-1 ring-ink-100">
                {S.cancel}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* QR */}
      {qr && (
        <Modal title={fill(S.qrTitle, { name: qr.name })} onClose={() => setQr(null)} S={S}>
          <div className="rounded-3xl bg-gradient-to-br from-[#1f182d] to-[#624f89] p-6 text-center">
            <p className="font-serif text-xl italic text-[#e8d3a6]">{salonName}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qr.img} alt="QR" className="mx-auto mt-4 w-56 rounded-2xl bg-white p-2" />
            <p className="mt-3 truncate text-xs text-white/60">{qr.url.replace(/^https?:\/\//, "")}</p>
          </div>
          <p className="mt-4 text-sm text-ink-400">{fill(S.qrHint, { name: qr.name })}</p>
          <a
            href={qr.img}
            download={`qr-${qr.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "partner"}.png`}
            className={`mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}
          >
            <Download className="h-4 w-4" />
            {S.downloadQr}
          </a>
        </Modal>
      )}

      {/* Payout */}
      {payout && (
        <Modal title={fill(S.payoutTitle, { name: payout.a.name })} onClose={() => setPayout(null)} S={S}>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">
                {S.amount} ({currency})
              </span>
              <input inputMode="decimal" value={payout.amount} onChange={(e) => setPayout({ ...payout, amount: e.target.value })} className={`${INPUT} text-lg font-bold`} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.payoutNote}</span>
              <input value={payout.note} onChange={(e) => setPayout({ ...payout, note: e.target.value })} maxLength={200} placeholder={S.payoutNotePh} className={INPUT} />
            </label>
            <button type="button" onClick={savePayout} disabled={saving} className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Banknote className="h-4 w-4" />}
              {S.confirmPayout}
            </button>
          </div>
        </Modal>
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
