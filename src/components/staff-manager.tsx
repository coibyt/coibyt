"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import {
  ArchiveRestore,
  CalendarCheck,
  CalendarClock,
  Check,
  Clock,
  Crown,
  Eye,
  Film,
  KeyRound,
  Loader2,
  Lock,
  Pencil,
  Plus,
  Scissors,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  UserMinus,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { personalTimeLabel } from "@/lib/personal-time";
import { staffStrings, type PermissionKey, type RolePreset } from "@/lib/staff-strings";
import type { StaffInsight } from "@/lib/staff-dashboard";
import { StaffHoursModal } from "@/components/staff-hours-modal";
import { VaraClipLink } from "@/components/varaclip-link";
import { StaffAvatarUpload } from "@/components/staff-avatar-upload";
import { StaffHoursFields, DEFAULT_STAFF_HOURS, staffHoursPayload, type StaffHoursValue } from "@/components/staff-hours-fields";

interface StaffRow {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatarUrl: string | null;
  active: boolean;
  serviceIds: string[];
  email: string | null;
  canViewServices: boolean;
  canViewProducts: boolean;
  canViewBookings: boolean;
  canViewCustomers: boolean;
  canViewHours: boolean;
  canViewReviews: boolean;
  canViewCustomerContactInfo: boolean;
  canViewAllBookings: boolean;
  canViewAllPagesReadOnly: boolean;
  leadTimeMinutes: number;
  staffMessage: string | null;
  videoUrls: string[];
}

const emptyForm = {
  name: "",
  title: "",
  bio: "",
  serviceIds: [] as string[],
  email: "",
  password: "",
  canViewServices: false,
  canViewProducts: false,
  canViewBookings: true,
  canViewCustomers: false,
  canViewHours: false,
  canViewReviews: false,
  canViewCustomerContactInfo: false,
  canViewAllBookings: true,
  canViewAllPagesReadOnly: false,
  leadTimeMinutes: 0,
  staffMessage: "",
  videoUrls: ["", "", "", "", ""] as string[],
};

const PERMISSIONS: PermissionKey[] = [
  "canViewBookings",
  "canViewCustomers",
  "canViewCustomerContactInfo",
  "canViewServices",
  "canViewProducts",
  "canViewHours",
  "canViewReviews",
];
const LEAD_TIMES = [0, 15, 30, 60, 120, 180, 360, 720];

/** What each quick role switches on. */
const ROLE_PRESETS: Record<RolePreset, Partial<typeof emptyForm>> = {
  stylist: {
    canViewBookings: true,
    canViewAllBookings: false,
    canViewCustomers: false,
    canViewCustomerContactInfo: false,
    canViewServices: false,
    canViewProducts: false,
    canViewHours: false,
    canViewReviews: false,
    canViewAllPagesReadOnly: false,
  },
  reception: {
    canViewBookings: true,
    canViewAllBookings: true,
    canViewCustomers: true,
    canViewCustomerContactInfo: true,
    canViewServices: true,
    canViewProducts: true,
    canViewHours: true,
    canViewReviews: false,
    canViewAllPagesReadOnly: false,
  },
  manager: {
    canViewBookings: true,
    canViewAllBookings: true,
    canViewCustomers: true,
    canViewCustomerContactInfo: true,
    canViewServices: true,
    canViewProducts: true,
    canViewHours: true,
    canViewReviews: true,
    canViewAllPagesReadOnly: true,
  },
};

const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-mist-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";
const STATUS_STYLE: Record<string, string> = {
  working: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  away: "bg-amber-50 text-amber-700 ring-amber-200",
  "off-day": "bg-ink-100 text-ink-400 ring-ink-100",
  before: "bg-primary-100/60 text-primary-700 ring-primary-200",
  after: "bg-mist-50 text-ink-400 ring-ink-100",
};
const DOT: Record<string, string> = {
  working: "bg-emerald-500",
  away: "bg-amber-500",
  "off-day": "bg-ink-300",
  before: "bg-primary-400",
  after: "bg-ink-300",
};

function hhmm(min: number) {
  const h = Math.floor(min / 60) % 24;
  return `${String(h).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

export function StaffManager({
  initialStaff,
  serviceOptions,
  insights,
  currency,
}: {
  initialStaff: StaffRow[];
  serviceOptions: { id: string; name: string }[];
  insights: Record<string, StaffInsight>;
  currency: string;
}) {
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const locale = useLocale();
  const S = staffStrings(locale);
  const router = useRouter();

  const [drawer, setDrawer] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoursFor, setHoursFor] = useState<StaffRow | null>(null);
  const [newHours, setNewHours] = useState<StaffHoursValue>(DEFAULT_STAFF_HOURS);
  const [editingAvatarUrl, setEditingAvatarUrl] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setNewHours(DEFAULT_STAFF_HOURS);
    setError(null);
    setDrawer(true);
  }

  function startEdit(s: StaffRow) {
    setEditingId(s.id);
    setEditingAvatarUrl(s.avatarUrl);
    setForm({
      name: s.name,
      title: s.title ?? "",
      bio: s.bio ?? "",
      serviceIds: s.serviceIds,
      email: s.email ?? "",
      password: "",
      canViewServices: s.canViewServices,
      canViewProducts: s.canViewProducts,
      canViewBookings: s.canViewBookings,
      canViewCustomers: s.canViewCustomers,
      canViewHours: s.canViewHours,
      canViewReviews: s.canViewReviews,
      canViewCustomerContactInfo: s.canViewCustomerContactInfo,
      canViewAllBookings: s.canViewAllBookings,
      canViewAllPagesReadOnly: s.canViewAllPagesReadOnly,
      leadTimeMinutes: s.leadTimeMinutes,
      staffMessage: s.staffMessage ?? "",
      videoUrls: [0, 1, 2, 3, 4].map((i) => s.videoUrls[i] ?? ""),
    });
    setError(null);
    setDrawer(true);
  }

  async function saveStaff(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch(editingId ? `/api/business/staff/${editingId}` : "/api/business/staff", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? form : { ...form, hours: staffHoursPayload(newHours) }),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) {
      const data = await res?.json().catch(() => null);
      setError(
        data?.error === "EMAIL_IN_USE"
          ? S.errEmailInUse
          : data?.error === "PASSWORD_REQUIRED"
            ? S.errPasswordRequired
            : data?.error?.fieldErrors?.password
              ? S.errPasswordShort
              : S.errGeneric
      );
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setDrawer(false);
    flash(S.saved);
    router.refresh();
  }

  async function removeStaff(s: StaffRow) {
    if (!window.confirm(fill(S.removeConfirm, { name: s.name }))) return;
    await fetch(`/api/business/staff/${s.id}`, { method: "DELETE" });
    router.refresh();
  }

  async function restoreStaff(s: StaffRow) {
    const res = await fetch(`/api/business/staff/${s.id}/restore`, { method: "POST" }).catch(() => null);
    if (res?.ok) {
      flash(S.restored);
      router.refresh();
    }
  }

  function setVideoUrl(index: number, value: string) {
    setForm((f) => {
      const next = [...f.videoUrls];
      next[index] = value;
      return { ...f, videoUrls: next };
    });
  }

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id) ? f.serviceIds.filter((x) => x !== id) : [...f.serviceIds, id],
    }));
  }

  const active = initialStaff.filter((s) => s.active);
  const former = initialStaff.filter((s) => !s.active);
  const ins = (id: string): StaffInsight =>
    insights[id] ?? { bookings30: 0, revenue30: 0, rating: null, reviews: 0, today: { windows: [], timeOff: [], status: "off-day", bookingsToday: 0 } };
  const needle = q.trim().toLowerCase();
  const shown = active.filter((s) => !needle || s.name.toLowerCase().includes(needle) || (s.title ?? "").toLowerCase().includes(needle));
  const ranked = [...active].filter((s) => ins(s.id).bookings30 > 0).sort((a, b) => ins(b.id).revenue30 - ins(a.id).revenue30);
  const totals = {
    working: active.filter((s) => ins(s.id).today.status === "working").length,
    bookings: active.reduce((n, s) => n + ins(s.id).bookings30, 0),
    revenue: active.reduce((n, s) => n + ins(s.id).revenue30, 0),
  };

  function avatar(s: StaffRow, size: string, text: string) {
    return s.avatarUrl ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={s.avatarUrl} alt="" className={`${size} shrink-0 rounded-2xl object-cover`} />
    ) : (
      <span className={`${size} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#624f89] to-[#1f182d] font-serif font-bold text-[#e8d3a6] ${text}`}>
        {s.name.trim()[0]?.toUpperCase()}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
                <Users className="h-4 w-4" />
                {S.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
            </div>
            <button type="button" onClick={startCreate} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
              <Plus className="h-4 w-4" />
              {S.add}
            </button>
          </div>
          {active.length > 0 && (
            <div className="mt-6 flex -space-x-2">
              {active.slice(0, 8).map((s) => (
                <span key={s.id} title={s.name} className="relative rounded-2xl ring-2 ring-[#1f182d]">
                  {avatar(s, "h-10 w-10", "text-sm")}
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-[#1f182d] ${DOT[ins(s.id).today.status]}`} />
                </span>
              ))}
            </div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Users, label: S.statTeam, value: String(active.length) },
              { icon: Clock, label: S.statWorking, value: String(totals.working) },
              { icon: CalendarCheck, label: S.statBookings, value: totals.bookings.toLocaleString(locale) },
              { icon: TrendingUp, label: S.statRevenue, value: formatMoney(totals.revenue, currency, locale) },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          {active.length > 2 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchPh} className={`${FIELD} bg-white pl-11`} />
            </div>
          )}

          {active.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Users className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
              <button type="button" onClick={startCreate} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                <Plus className="h-4 w-4" />
                {S.add}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {shown.map((s) => {
                const i = ins(s.id);
                const st = i.today.status;
                return (
                  <article key={s.id} className="flex min-w-0 flex-col rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)]">
                    <div className="flex items-start gap-3.5">
                      <span className="relative">
                        {avatar(s, "h-16 w-16", "text-2xl")}
                        <span className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-[3px] ring-white ${DOT[st]}`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-bold text-ink-900">{s.name}</p>
                        {s.title && <p className="truncate text-xs text-ink-400">{s.title}</p>}
                        <span className={`mt-1.5 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${STATUS_STYLE[st]}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${DOT[st]}`} />
                          {S.status[st]}
                        </span>
                      </div>
                    </div>

                    {/* Today */}
                    <div className="mt-4 rounded-2xl bg-mist-50/60 px-3.5 py-2.5 text-xs ring-1 ring-ink-100">
                      <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-ink-700">
                        <CalendarClock className="h-3.5 w-3.5 text-primary-500" />
                        <span className="font-bold">{S.today}</span>
                        {i.today.windows.length > 0 ? (
                          <span className="tabular-nums">{i.today.windows.map((w) => `${hhmm(w.open)}–${hhmm(w.close)}`).join(", ")}</span>
                        ) : (
                          <span className="text-ink-400">{S.status["off-day"]}</span>
                        )}
                        {i.today.bookingsToday > 0 && <span className="font-semibold text-primary-600">· {fill(S.bookingsToday, { n: i.today.bookingsToday })}</span>}
                      </p>
                      {i.today.timeOff.length > 0 && (
                        <p className="mt-1 text-amber-700">
                          {i.today.timeOff.map((o) => `${personalTimeLabel(o.kind, locale)} ${hhmm(o.start)}–${hhmm(o.end)}`).join(" · ")}
                        </p>
                      )}
                    </div>

                    {/* Performance */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-2xl bg-mist-50/60 px-1 py-2.5">
                        <p className="text-base font-bold tabular-nums text-ink-900">{i.bookings30}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{S.bookings30}</p>
                      </div>
                      <div className="rounded-2xl bg-mist-50/60 px-1 py-2.5">
                        <p className="truncate text-base font-bold tabular-nums text-ink-900">{formatMoney(i.revenue30, currency, locale)}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{S.revenue30}</p>
                      </div>
                      <div className="rounded-2xl bg-mist-50/60 px-1 py-2.5" title={i.reviews ? fill(S.reviews, { n: i.reviews }) : undefined}>
                        <p className="flex items-center justify-center gap-1 text-base font-bold tabular-nums text-ink-900">
                          {i.rating !== null ? (
                            <>
                              <Star className="h-4 w-4 fill-[#f5b041] text-[#f5b041]" />
                              {i.rating.toFixed(1)}
                            </>
                          ) : (
                            <span className="text-sm text-ink-300">{S.noRating}</span>
                          )}
                        </p>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink-400">{S.rating}</p>
                      </div>
                    </div>

                    {/* Access + services */}
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                      <span className={`flex items-center gap-1 rounded-full px-2 py-1 ${s.serviceIds.length ? "bg-primary-100/60 text-primary-700" : "bg-amber-50 text-amber-700"}`}>
                        <Scissors className="h-3 w-3" />
                        {s.serviceIds.length ? fill(S.services, { n: s.serviceIds.length }) : S.noServices}
                      </span>
                      {s.email ? (
                        <>
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-700" title={s.email}>
                            <KeyRound className="h-3 w-3" />
                            {S.login}
                          </span>
                          {s.canViewBookings && (
                            <span className="flex items-center gap-1 rounded-full bg-mist-50 px-2 py-1 text-ink-700 ring-1 ring-ink-100">
                              <Eye className="h-3 w-3" />
                              {s.canViewAllBookings ? S.seesAll : S.seesOwn}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="flex items-center gap-1 rounded-full bg-mist-50 px-2 py-1 text-ink-400 ring-1 ring-ink-100">
                          <Lock className="h-3 w-3" />
                          {S.noLogin}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-1.5 border-t border-ink-100 pt-3">
                      <button type="button" onClick={() => startEdit(s)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-mist-50">
                        <Pencil className="h-3.5 w-3.5" />
                        {S.edit}
                      </button>
                      <button type="button" onClick={() => setHoursFor(s)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-mist-50">
                        <Clock className="h-3.5 w-3.5" />
                        {S.schedule}
                      </button>
                      <button type="button" onClick={() => removeStaff(s)} className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-berry-500 hover:bg-berry-50">
                        <UserMinus className="h-3.5 w-3.5" />
                        {S.remove}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {former.length > 0 && (
            <section className="rounded-3xl border border-dashed border-ink-100 bg-mist-50/40 p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-ink-700">
                <UserMinus className="h-4 w-4 text-ink-400" />
                {S.formerTitle} <span className="text-xs font-semibold text-ink-400">({former.length})</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-400">{S.formerHint}</p>
              <ul className="mt-3 divide-y divide-ink-100">
                {former.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span className="opacity-60 grayscale">{avatar(s, "h-8 w-8", "text-xs")}</span>
                      <span className="truncate font-semibold text-ink-400">{s.name}</span>
                    </span>
                    <button type="button" onClick={() => restoreStaff(s)} className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100/40">
                      <ArchiveRestore className="h-3.5 w-3.5" />
                      {S.restore}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside>
          <section className="rounded-3xl border border-ink-100 bg-white p-5 xl:sticky xl:top-24">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <Crown className="h-4 w-4 text-[#c99a3f]" />
              {S.topTitle}
            </p>
            {ranked.length === 0 ? (
              <p className="mt-2 text-sm text-ink-400">{S.topEmpty}</p>
            ) : (
              <ol className="mt-3 space-y-3">
                {ranked.slice(0, 6).map((s, idx) => (
                  <li key={s.id}>
                    <div className="flex items-center gap-2.5 text-sm">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${idx === 0 ? "bg-[#e8d3a6] text-[#1f182d]" : "bg-mist-50 text-ink-400"}`}>{idx + 1}</span>
                      {avatar(s, "h-8 w-8", "text-xs")}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-ink-900">{s.name}</span>
                        <span className="text-[11px] text-ink-400">
                          {ins(s.id).bookings30} {S.bookings30.toLowerCase()}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs font-bold tabular-nums text-ink-900">{formatMoney(ins(s.id).revenue30, currency, locale)}</span>
                    </div>
                    <div className="ml-[4.25rem] mt-1 h-1.5 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" style={{ width: `${Math.max(6, (ins(s.id).revenue30 / Math.max(1, ins(ranked[0].id).revenue30)) * 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </aside>
      </div>

      {hoursFor && <StaffHoursModal staffId={hoursFor.id} staffName={hoursFor.name} locale={locale} onClose={() => (setHoursFor(null), router.refresh())} />}

      {mounted && drawer && createPortal(renderDrawer(), document.body)}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );

  function renderDrawer() {
    const label = "mb-1.5 block text-xs font-semibold text-ink-700";
    const title = (icon: React.ReactNode, text: string, right?: React.ReactNode) => (
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b08a3e]">
          {icon}
          {text}
        </p>
        {right}
      </div>
    );
    const box = "rounded-3xl bg-white p-5 ring-1 ring-ink-100";
    return (
      <div className="fixed inset-0 z-[80] flex justify-end bg-[#1f182d]/50 backdrop-blur-sm" onClick={() => setDrawer(false)}>
        <form onSubmit={saveStaff} onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-xl flex-col bg-[#faf8fd] shadow-2xl">
          <div className="flex items-center justify-between gap-3 border-b border-ink-100 bg-white px-5 py-4 sm:px-6">
            <h3 className="text-lg font-bold text-ink-900">{editingId ? S.formEdit : S.formNew}</h3>
            <button type="button" onClick={() => setDrawer(false)} aria-label={S.close} className="rounded-full p-2 text-ink-400 hover:bg-mist-50">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            <section className={box}>
              {title(<UserRound className="h-3.5 w-3.5" />, S.secProfile)}
              {editingId ? (
                <div className="mb-4">
                  <label className={label}>{tDash("staffForm.avatar")}</label>
                  <StaffAvatarUpload
                    staffId={editingId}
                    initialUrl={editingAvatarUrl}
                    uploadLabel={tDash("staffForm.uploadAvatar")}
                    removeLabel={tDash("staffForm.removeAvatar")}
                    errorLabel={tDash("staffForm.avatarError")}
                  />
                </div>
              ) : (
                <p className="mb-3 text-[11px] text-ink-400">{tDash("staffForm.saveBeforeAvatar")}</p>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>{tDash("staffForm.staffName")}</label>
                  <input required minLength={2} maxLength={120} className={FIELD} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus={!editingId} />
                </div>
                <div>
                  <label className={label}>{tDash("staffForm.title")}</label>
                  <input maxLength={120} className={FIELD} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>
              <div className="mt-4">
                <label className={label}>{tDash("staffForm.bio")}</label>
                <textarea rows={3} maxLength={2000} className={FIELD} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>
            </section>

            {serviceOptions.length > 0 && (
              <section className={box}>
                {title(
                  <Scissors className="h-3.5 w-3.5" />,
                  S.secServices,
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, serviceIds: f.serviceIds.length === serviceOptions.length ? [] : serviceOptions.map((s) => s.id) }))
                    }
                    className="text-xs font-semibold text-primary-600 hover:underline"
                  >
                    {form.serviceIds.length === serviceOptions.length ? S.clearAll : S.selectAll}
                  </button>
                )}
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => {
                    const on = form.serviceIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"}`}
                      >
                        {on && <Check className="h-3.5 w-3.5 text-[#e8d3a6]" />}
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {!editingId && (
              <section className={box}>
                {title(<Clock className="h-3.5 w-3.5" />, S.secHours)}
                <p className="mb-2 text-[11px] text-ink-400">{tDash("staffForm.hoursHint")}</p>
                <StaffHoursFields value={newHours} onChange={setNewHours} />
              </section>
            )}

            <section className={box}>
              {title(<ShieldCheck className="h-3.5 w-3.5" />, S.secAccess)}
              <p className="mb-3 text-xs text-ink-400">{S.loginHint}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="email" placeholder="email@example.com" className={FIELD} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder={editingId ? S.passwordKeep : S.passwordNew}
                  className={FIELD}
                  value={form.password}
                  minLength={8}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <p className="mb-2 mt-5 text-xs font-semibold text-ink-700">{S.presets}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {(Object.keys(ROLE_PRESETS) as RolePreset[]).map((r) => {
                  const preset = ROLE_PRESETS[r];
                  const on = (Object.keys(preset) as (keyof typeof preset)[]).every((k) => form[k] === preset[k]);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, ...preset }))}
                      className={`rounded-2xl p-3 text-left ring-1 transition ${on ? "bg-gradient-to-br from-[#fffaf0] to-[#f8eedb] ring-[#d9b25c]" : "bg-white ring-ink-100 hover:bg-mist-50"}`}
                    >
                      <span className="flex items-center justify-between text-sm font-bold text-ink-900">
                        {S.roles[r][0]}
                        {on && <Check className="h-4 w-4 text-[#b08a3e]" />}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-ink-400">{S.roles[r][1]}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mb-2 mt-5 text-xs font-semibold text-ink-700">{S.canView}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {PERMISSIONS.map((k) => (
                  <label key={k} className={`flex cursor-pointer items-center justify-between gap-2 rounded-2xl px-3.5 py-2.5 text-sm ring-1 transition ${form[k] ? "bg-primary-100/40 text-ink-900 ring-primary-200" : "bg-white text-ink-700 ring-ink-100"}`}>
                    {S.permissions[k]}
                    <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${form[k] ? "bg-primary-500" : "bg-ink-100"}`}>
                      <input type="checkbox" checked={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.checked })} className="sr-only" />
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${form[k] ? "left-[18px]" : "left-0.5"}`} />
                    </span>
                  </label>
                ))}
              </div>
              {form.canViewBookings && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {[true, false].map((all) => (
                    <label key={String(all)} className={`flex cursor-pointer items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm ring-1 ${form.canViewAllBookings === all ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100"}`}>
                      <input type="radio" name="bookingScope" className="sr-only" checked={form.canViewAllBookings === all} onChange={() => setForm({ ...form, canViewAllBookings: all })} />
                      <Eye className="h-4 w-4 shrink-0" />
                      {all ? S.scopeAll : S.scopeOwn}
                    </label>
                  ))}
                </div>
              )}
              <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl bg-mist-50/70 p-3.5 text-sm text-ink-700 ring-1 ring-ink-100">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary-500" checked={form.canViewAllPagesReadOnly} onChange={(e) => setForm({ ...form, canViewAllPagesReadOnly: e.target.checked })} />
                <span>
                  {S.allPages}
                  <span className="mt-0.5 block text-[11px] text-ink-400">{S.allPagesHint}</span>
                </span>
              </label>
            </section>

            <section className={box}>
              {title(<CalendarClock className="h-3.5 w-3.5" />, S.secBooking)}
              <label className={label}>{S.leadTime}</label>
              <p className="mb-2 text-[11px] text-ink-400">{S.leadTimeHint}</p>
              <div className="flex flex-wrap gap-1.5">
                {LEAD_TIMES.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setForm({ ...form, leadTimeMinutes: m })}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${form.leadTimeMinutes === m ? "bg-[#1f182d] text-white ring-[#1f182d]" : "text-ink-700 ring-ink-100 hover:bg-mist-50"}`}
                  >
                    {S.leadOptions[m]}
                  </button>
                ))}
              </div>
              <label className={`${label} mt-4`}>{S.staffMessage}</label>
              <p className="mb-1.5 text-[11px] text-ink-400">{S.staffMessageHint}</p>
              <textarea rows={2} maxLength={2000} className={FIELD} value={form.staffMessage} onChange={(e) => setForm({ ...form, staffMessage: e.target.value })} />
            </section>

            <section className={box}>
              {title(<Film className="h-3.5 w-3.5" />, S.secVideos)}
              <p className="mb-2 text-[11px] text-ink-400">
                {S.videosHint} (<VaraClipLink />)
              </p>
              <div className="space-y-2">
                {form.videoUrls.map((url, i) => (
                  <input key={i} type="url" placeholder="https://varaclip.com/v/..." className={FIELD} value={url} onChange={(e) => setVideoUrl(i, e.target.value)} />
                ))}
              </div>
            </section>
          </div>

          <div className="border-t border-ink-100 bg-white px-5 py-4 sm:px-6">
            {error && <p className="mb-2 text-sm text-berry-500">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {tCommon("save")}
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="rounded-full px-5 py-3 text-sm font-semibold text-ink-400 ring-1 ring-ink-100">
                {tCommon("cancel")}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
