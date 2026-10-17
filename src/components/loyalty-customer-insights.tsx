"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Gift,
  Info,
  Loader2,
  Mail,
  Phone,
  ScanLine,
  Scissors,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { formatMoney } from "@/lib/money";

export interface LoyaltyInsights {
  card: {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string | null;
    points: number;
    totalScans: number;
    rewardReady: boolean;
    rewardsEarned: number;
    activatedAt: string;
  };
  program: { pointsRequired: number; discountPercent: number } | null;
  stats: {
    visits: number;
    servicesDone: number;
    revenue: { currency: string; cents: number }[];
    avgSpend: { currency: string; cents: number } | null;
    upcoming: number;
    cancelled: number;
    noShow: number;
    firstVisitAt: string | null;
    lastVisitAt: string | null;
    topServices: { name: string; count: number }[];
  };
  history: {
    id: string;
    startsAt: string;
    serviceName: string;
    extraServiceNames: string[];
    staffName: string | null;
    priceCents: number;
    currency: string;
    status: "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
    done: boolean;
  }[];
  scans: string[];
  rewards: string[];
}

export function useLoyaltyInsights(cardId: string | null, refreshKey: number) {
  const [data, setData] = useState<LoyaltyInsights | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!cardId) return;
    let cancelled = false;
    setError(false);
    fetch(`/api/business/loyalty/cards/${cardId}/insights`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [cardId, refreshKey]);
  return { data: data?.card.id === cardId ? data : null, error };
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

function formatDate(iso: string, locale: string, timeZone: string, withTime = false) {
  return new Date(iso).toLocaleString(locale === "vi" ? "vi-VN" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone,
  });
}

function revenueText(revenue: LoyaltyInsights["stats"]["revenue"], locale: string) {
  if (revenue.length === 0) return "—";
  return revenue.map((r) => formatMoney(r.cents, r.currency, locale)).join(" + ");
}

function PointsRing({ points, required }: { points: number; required: number }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const ratio = required > 0 ? Math.min(1, points / required) : 0;
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="12" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#loyalty-ring)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
          className="transition-[stroke-dashoffset] duration-700"
        />
        <defs>
          <linearGradient id="loyalty-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffbfa3" />
            <stop offset="100%" stopColor="#f0855f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-3xl font-bold leading-none">{points}</span>
        <span className="mt-1 text-xs text-white/70">/ {required}</span>
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof Star;
  label: string;
  value: string;
  sub?: string;
  tone: "primary" | "teal" | "coral" | "berry" | "sage" | "peach";
}) {
  const tones: Record<typeof tone, string> = {
    primary: "bg-primary-100 text-primary-600",
    teal: "bg-teal-50 text-teal-500",
    coral: "bg-coral-50 text-coral-600",
    berry: "bg-berry-50 text-berry-500",
    sage: "bg-sage-50 text-sage-600",
    peach: "bg-peach-100 text-coral-600",
  };
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <p className="text-xl font-bold leading-tight text-ink-900">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-ink-400">{label}</p>
      {sub && <p className="mt-1 text-[11px] text-ink-400">{sub}</p>}
    </div>
  );
}

/** The framed summary shown right after a card is scanned (or opened from the
 * cardholder list): who this is, their points, and what they're worth to the
 * salon at a glance. */
export function LoyaltyInsightsPanel({
  cardId,
  locale,
  timeZone,
  refreshKey,
  notice,
  busy,
  onApplyReward,
  onOpenDetails,
  onClose,
}: {
  cardId: string;
  locale: string;
  timeZone: string;
  refreshKey: number;
  notice?: { ok: boolean; text: string } | null;
  busy?: boolean;
  onApplyReward?: (cardId: string) => void;
  onOpenDetails: (cardId: string) => void;
  onClose: () => void;
}) {
  const vi = locale === "vi";
  const { data, error } = useLoyaltyInsights(cardId, refreshKey);

  return (
    <div className="rounded-[28px] bg-gradient-to-br from-primary-300 via-coral-400 to-peach-300 p-[2px] shadow-xl shadow-primary-500/15">
      <div className="overflow-hidden rounded-[26px] bg-mist-50">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-5 pb-6 pt-5 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-coral-400/30 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-primary-300/25 blur-2xl" />
          <Sparkles className="pointer-events-none absolute right-6 top-14 h-5 w-5 text-peach-200/60" />
          <Sparkles className="pointer-events-none absolute bottom-6 right-28 h-3 w-3 text-peach-200/50" />

          <div className="relative flex items-start justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
              <Star className="h-3 w-3 fill-current" />
              {vi ? "Thẻ thành viên" : "Loyalty member"}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={vi ? "Đóng" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {notice && (
            <div
              className={`relative mt-3 flex items-start gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-medium ${
                notice.ok ? "bg-emerald-400/20 text-emerald-50" : "bg-amber-300/20 text-amber-50"
              }`}
            >
              {notice.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <Info className="mt-0.5 h-4 w-4 shrink-0" />}
              {notice.text}
            </div>
          )}

          {!data ? (
            <div className="relative flex h-32 items-center justify-center text-white/70">
              {error ? (vi ? "Không tải được dữ liệu khách." : "Couldn't load this customer.") : <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
          ) : (
            <div className="relative mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-200 to-coral-400 text-2xl font-bold text-primary-900 shadow-lg ring-4 ring-white/15">
                  {initials(data.card.customerName)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-2xl font-bold">{data.card.customerName}</h3>
                  <p className="truncate text-sm text-white/70">{data.card.customerEmail}</p>
                  <p className="mt-1 text-xs text-white/60">
                    {vi ? "Thành viên từ" : "Member since"} {formatDate(data.card.activatedAt, locale, timeZone)}
                  </p>
                </div>
              </div>
              {data.program && (
                <div className="flex items-center gap-4">
                  <PointsRing points={data.card.points} required={data.program.pointsRequired} />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{vi ? "Điểm tích lũy" : "Points"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from({ length: data.program.pointsRequired }, (_, i) => (
                        <span
                          key={i}
                          className={`flex h-5 w-5 items-center justify-center rounded-full ${
                            i < data.card.points ? "bg-gradient-to-br from-peach-200 to-coral-400 text-primary-900" : "bg-white/15"
                          }`}
                        >
                          {i < data.card.points && <Star className="h-2.5 w-2.5 fill-current" />}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-white/70">
                      {data.card.rewardReady
                        ? vi
                          ? `Đủ điểm — được giảm ${data.program.discountPercent}%`
                          : `Reward ready — ${data.program.discountPercent}% off`
                        : vi
                          ? `Còn ${Math.max(0, data.program.pointsRequired - data.card.points)} lần nữa để được giảm ${data.program.discountPercent}%`
                          : `${Math.max(0, data.program.pointsRequired - data.card.points)} more for ${data.program.discountPercent}% off`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {data && (
          <div className="space-y-4 p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile
                icon={Scissors}
                tone="teal"
                label={vi ? "Dịch vụ đã làm" : "Services done"}
                value={String(data.stats.servicesDone)}
                sub={vi ? `${data.stats.visits} lượt đến salon` : `${data.stats.visits} visits`}
              />
              <StatTile
                icon={Wallet}
                tone="primary"
                label={vi ? "Tổng doanh thu mang lại" : "Total revenue"}
                value={revenueText(data.stats.revenue, locale)}
              />
              <StatTile
                icon={Star}
                tone="coral"
                label={vi ? "Điểm hiện tại" : "Current points"}
                value={data.program ? `${data.card.points}/${data.program.pointsRequired}` : String(data.card.points)}
              />
              <StatTile icon={ScanLine} tone="sage" label={vi ? "Lượt quét" : "Scans"} value={String(data.card.totalScans)} />
              <StatTile
                icon={Gift}
                tone="berry"
                label={vi ? "Đã giảm giá" : "Rewards used"}
                value={String(data.card.rewardsEarned)}
                sub={vi ? "lần nhận ưu đãi" : "times rewarded"}
              />
              <StatTile
                icon={TrendingUp}
                tone="peach"
                label={vi ? "Chi tiêu TB / lượt" : "Avg. per visit"}
                value={data.stats.avgSpend ? formatMoney(data.stats.avgSpend.cents, data.stats.avgSpend.currency, locale) : "—"}
              />
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-ink-700">
              {data.stats.lastVisitAt && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink-100">
                  <CalendarDays className="h-3.5 w-3.5 text-primary-500" />
                  {vi ? "Lần gần nhất" : "Last visit"}: {formatDate(data.stats.lastVisitAt, locale, timeZone)}
                </span>
              )}
              {data.stats.upcoming > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink-100">
                  <CalendarClock className="h-3.5 w-3.5 text-teal-500" />
                  {vi ? `${data.stats.upcoming} lịch hẹn sắp tới` : `${data.stats.upcoming} upcoming`}
                </span>
              )}
              {data.stats.topServices[0] && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-ink-100">
                  <Sparkles className="h-3.5 w-3.5 text-coral-500" />
                  {vi ? "Hay làm" : "Favourite"}: {data.stats.topServices[0].name}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => onOpenDetails(cardId)} className="btn-primary flex-1">
                <UserRound className="h-4 w-4" />
                {vi ? "Xem chi tiết khách hàng" : "View customer details"}
              </button>
              {data.card.rewardReady && data.program && onApplyReward && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onApplyReward(cardId)}
                  className="btn-primary flex-1 !bg-gradient-to-r !from-coral-500 !to-berry-500"
                >
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gift className="h-4 w-4" />}
                  {vi ? `Áp dụng giảm ${data.program.discountPercent}%` : `Apply ${data.program.discountPercent}% off`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const STATUS_STYLES: Record<LoyaltyInsights["history"][number]["status"] | "DONE", { vi: string; en: string; cls: string }> = {
  DONE: { vi: "Đã làm", en: "Done", cls: "bg-teal-50 text-teal-600" },
  COMPLETED: { vi: "Hoàn tất", en: "Completed", cls: "bg-teal-50 text-teal-600" },
  CONFIRMED: { vi: "Sắp tới", en: "Upcoming", cls: "bg-primary-50 text-primary-600" },
  PENDING_PAYMENT: { vi: "Chờ thanh toán", en: "Awaiting payment", cls: "bg-peach-100 text-coral-600" },
  CANCELLED: { vi: "Đã hủy", en: "Cancelled", cls: "bg-ink-50 text-ink-400" },
  NO_SHOW: { vi: "Không đến", en: "No-show", cls: "bg-berry-50 text-berry-500" },
};

/** Full history for one cardholder: visits with prices and staff, favourite
 * services, and the card's scan/reward timeline. */
export function LoyaltyDetailsModal({
  cardId,
  locale,
  timeZone,
  refreshKey,
  onClose,
}: {
  cardId: string;
  locale: string;
  timeZone: string;
  refreshKey: number;
  onClose: () => void;
}) {
  const vi = locale === "vi";
  const { data, error } = useLoyaltyInsights(cardId, refreshKey);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const topMax = Math.max(1, ...(data?.stats.topServices.map((s) => s.count) ?? [1]));
  const timeline = data
    ? [
        ...data.scans.map((at) => ({ at, kind: "scan" as const })),
        ...data.rewards.map((at) => ({ at, kind: "reward" as const })),
      ].sort((a, b) => b.at.localeCompare(a.at))
    : [];

  // Portaled to <body> so no dashboard ancestor's stacking context can put
  // the site header above this overlay.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-900/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] bg-mist-50 shadow-2xl sm:rounded-[28px]"
      >
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-5 py-5 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-coral-400/30 blur-2xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-200 to-coral-400 text-lg font-bold text-primary-900">
                {data ? initials(data.card.customerName) : "…"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/60">{vi ? "Hồ sơ khách hàng" : "Customer profile"}</p>
                <h3 className="truncate text-xl font-bold">{data?.card.customerName ?? "…"}</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
              aria-label={vi ? "Đóng" : "Close"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {data && (
            <div className="relative mt-3 flex flex-wrap gap-2 text-xs">
              <a href={`mailto:${data.card.customerEmail}`} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 hover:bg-white/25">
                <Mail className="h-3.5 w-3.5" />
                {data.card.customerEmail}
              </a>
              {data.card.customerPhone && (
                <a href={`tel:${data.card.customerPhone}`} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 hover:bg-white/25">
                  <Phone className="h-3.5 w-3.5" />
                  {data.card.customerPhone}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
          {!data ? (
            <div className="flex h-40 items-center justify-center text-sm text-ink-400">
              {error ? (vi ? "Không tải được dữ liệu." : "Couldn't load.") : <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: vi ? "Lượt đến" : "Visits", value: String(data.stats.visits) },
                  { label: vi ? "Doanh thu" : "Revenue", value: revenueText(data.stats.revenue, locale) },
                  {
                    label: vi ? "Lần đầu" : "First visit",
                    value: data.stats.firstVisitAt ? formatDate(data.stats.firstVisitAt, locale, timeZone) : "—",
                  },
                  {
                    label: vi ? "Hủy / không đến" : "Cancelled / no-show",
                    value: `${data.stats.cancelled} / ${data.stats.noShow}`,
                  },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white p-3.5 ring-1 ring-ink-100">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-ink-400">{s.label}</p>
                    <p className="mt-1 truncate text-base font-bold text-ink-900">{s.value}</p>
                  </div>
                ))}
              </div>

              {data.stats.topServices.length > 0 && (
                <section className="rounded-2xl bg-white p-4 ring-1 ring-ink-100">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <Sparkles className="h-4 w-4 text-coral-500" />
                    {vi ? "Dịch vụ yêu thích" : "Favourite services"}
                  </h4>
                  <ul className="space-y-2.5">
                    {data.stats.topServices.map((s) => (
                      <li key={s.name}>
                        <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                          <span className="truncate text-ink-700">{s.name}</span>
                          <span className="shrink-0 font-semibold text-ink-900">×{s.count}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-mist-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-400 to-coral-400"
                            style={{ width: `${(s.count / topMax) * 100}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                  <CalendarDays className="h-4 w-4 text-primary-500" />
                  {vi ? "Lịch sử làm dịch vụ" : "Visit history"}
                  <span className="text-xs font-normal text-ink-400">({data.history.length})</span>
                </h4>
                {data.history.length === 0 ? (
                  <p className="rounded-2xl bg-white p-4 text-sm text-ink-400 ring-1 ring-ink-100">
                    {vi
                      ? "Chưa có lịch hẹn nào với email này tại salon."
                      : "No bookings with this email at the salon yet."}
                  </p>
                ) : (
                  <ol className="relative space-y-3 border-l-2 border-dashed border-primary-200 pl-5">
                    {data.history.map((h) => {
                      const style = STATUS_STYLES[h.done ? "DONE" : h.status];
                      const d = new Date(h.startsAt);
                      return (
                        <li key={h.id} className="relative">
                          <span
                            className={`absolute -left-[27px] top-4 h-3 w-3 rounded-full ring-4 ring-mist-50 ${
                              h.done ? "bg-teal-400" : h.status === "CANCELLED" || h.status === "NO_SHOW" ? "bg-ink-100" : "bg-primary-400"
                            }`}
                          />
                          <div className="flex gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-ink-100">
                            <div className="flex w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-50 py-1.5 text-primary-700">
                              <span className="text-lg font-bold leading-none">
                                {d.toLocaleString("en-GB", { day: "2-digit", timeZone })}
                              </span>
                              <span className="mt-0.5 whitespace-nowrap text-[10px] font-semibold uppercase">
                                {vi
                                  ? `Th${Number(d.toLocaleString("en-GB", { month: "numeric", timeZone }))}`
                                  : d.toLocaleString("en-GB", { month: "short", timeZone })}
                              </span>
                              <span className="text-[9px] text-primary-400">{d.toLocaleString("en-GB", { year: "numeric", timeZone })}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <p className="min-w-0 font-semibold text-ink-900">{h.serviceName}</p>
                                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.cls}`}>
                                  {vi ? style.vi : style.en}
                                </span>
                              </div>
                              {h.extraServiceNames.length > 0 && (
                                <p className="mt-0.5 text-xs text-ink-400">+ {h.extraServiceNames.join(", ")}</p>
                              )}
                              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-400">
                                <span>{d.toLocaleString(vi ? "vi-VN" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone })}</span>
                                {h.staffName && <span>· {h.staffName}</span>}
                                <span className="font-semibold text-ink-700">{formatMoney(h.priceCents, h.currency, locale)}</span>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>

              {timeline.length > 0 && (
                <section className="rounded-2xl bg-white p-4 ring-1 ring-ink-100">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                    <ScanLine className="h-4 w-4 text-sage-500" />
                    {vi ? "Lịch sử tích điểm" : "Points history"}
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {timeline.slice(0, 30).map((t, i) => (
                      <li key={`${t.kind}-${t.at}-${i}`} className="flex items-center gap-2">
                        {t.kind === "scan" ? (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-50 text-sage-600">
                            <Star className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-berry-50 text-berry-500">
                            <Gift className="h-3 w-3" />
                          </span>
                        )}
                        <span className="text-ink-700">
                          {t.kind === "scan"
                            ? vi ? "Cộng 1 điểm" : "+1 point"
                            : vi
                              ? `Nhận ưu đãi giảm ${data.program?.discountPercent ?? ""}%`
                              : `Reward used (${data.program?.discountPercent ?? ""}% off)`}
                        </span>
                        <span className="ml-auto text-ink-400">{formatDate(t.at, locale, timeZone, true)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
