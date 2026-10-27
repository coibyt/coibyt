"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarOff,
  CalendarPlus,
  Check,
  Clock,
  Copy,
  Globe2,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Undo2,
  Users,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { hoursStrings } from "@/lib/hours-strings";
import { minutesLabel } from "@/lib/hours-format";

interface Shift {
  open: string; // "09:00"
  close: string; // "18:00"
}
interface DayRow {
  open: boolean;
  shifts: Shift[];
}
interface Closure {
  id: string;
  date: string;
  reason: string | null;
}

// Monday first, as salons read their week.
const ORDER = [1, 2, 3, 4, 5, 6, 0];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "rounded-2xl border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100";

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromHours(initial: { weekday: number; openMinute: number; closeMinute: number }[]): DayRow[] {
  return Array.from({ length: 7 }, (_, weekday) => {
    const list = initial.filter((h) => h.weekday === weekday).sort((a, b) => a.openMinute - b.openMinute);
    return list.length
      ? { open: true, shifts: list.map((h) => ({ open: minutesLabel(h.openMinute), close: minutesLabel(h.closeMinute) })) }
      : { open: false, shifts: [{ open: "09:00", close: "18:00" }] };
  });
}

/** Problems with one day's shifts: closing before opening, or overlaps. */
function dayErrors(d: DayRow): ("order" | "overlap")[] {
  if (!d.open) return [];
  const errs = new Set<"order" | "overlap">();
  const sorted = [...d.shifts].sort((a, b) => toMinutes(a.open) - toMinutes(b.open));
  sorted.forEach((s, i) => {
    if (toMinutes(s.close) <= toMinutes(s.open)) errs.add("order");
    if (i > 0 && toMinutes(s.open) < toMinutes(sorted[i - 1].close)) errs.add("overlap");
  });
  return [...errs];
}

/** The day and minute right now in the salon's own timezone. */
function nowIn(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { weekday: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), minute: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function HoursEditor({
  initialHours,
  locale,
  timezone,
  country,
  canEdit,
}: {
  initialHours: { weekday: number; openMinute: number; closeMinute: number }[];
  locale: string;
  timezone: string;
  country: string;
  canEdit: boolean;
}) {
  const S = hoursStrings(locale);
  const [saved, setSaved] = useState(initialHours);
  const [days, setDays] = useState<DayRow[]>(() => fromHours(initialHours));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ ok: boolean; text: string } | null>(null);
  const [copyFrom, setCopyFrom] = useState<number | null>(null);
  const [now, setNow] = useState<{ weekday: number; minute: number } | null>(null);

  // Closures
  const [closures, setClosures] = useState<Closure[] | null>(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [adding, setAdding] = useState(false);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    setNow(nowIn(timezone));
    const t = setInterval(() => setNow(nowIn(timezone)), 60_000);
    return () => clearInterval(t);
  }, [timezone]);

  function loadClosures() {
    fetch("/api/business/closures")
      .then((r) => (r.ok ? r.json() : { closures: [] }))
      .then((d) => setClosures(d.closures ?? []))
      .catch(() => setClosures([]));
  }
  useEffect(loadClosures, []);

  function flash(ok: boolean, text: string) {
    setToast({ ok, text });
    setTimeout(() => setToast(null), 2600);
  }

  const payload = (rows: DayRow[]) =>
    rows.flatMap((d, weekday) => (d.open ? d.shifts.map((s) => ({ weekday, openMinute: toMinutes(s.open), closeMinute: toMinutes(s.close) })) : []));

  const dirty = JSON.stringify(payload(days).sort((a, b) => a.weekday - b.weekday || a.openMinute - b.openMinute)) !==
    JSON.stringify([...saved].map((h) => ({ weekday: h.weekday, openMinute: h.openMinute, closeMinute: h.closeMinute })).sort((a, b) => a.weekday - b.weekday || a.openMinute - b.openMinute));
  const errors = days.map(dayErrors);
  const hasErrors = errors.some((e) => e.length > 0);

  function update(weekday: number, fn: (d: DayRow) => DayRow) {
    setDays((prev) => prev.map((d, i) => (i === weekday ? fn(d) : d)));
  }

  function applyPreset(openDays: number[], open: string, close: string) {
    setDays(Array.from({ length: 7 }, (_, i) => ({ open: openDays.includes(i), shifts: [{ open, close }] })));
  }

  function copyTo(targets: number[]) {
    if (copyFrom === null) return;
    const src = days[copyFrom];
    setDays((prev) => prev.map((d, i) => (targets.includes(i) && i !== copyFrom ? { open: src.open, shifts: src.shifts.map((s) => ({ ...s })) } : d)));
    flash(true, fill(S.copied, { day: S.days[copyFrom] }));
    setCopyFrom(null);
  }

  async function save() {
    if (hasErrors) return flash(false, S.saveError);
    setSaving(true);
    const body = payload(days);
    const res = await fetch("/api/business/hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) return flash(false, S.saveError);
    setSaved(body);
    flash(true, S.saved);
  }

  async function addClosure(f: string, t: string, r: string) {
    if (!f) return;
    setAdding(true);
    const res = await fetch("/api/business/closures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: f, to: t && t > f ? t : undefined, reason: r || undefined }),
    }).catch(() => null);
    setAdding(false);
    if (res?.ok) {
      setFrom("");
      setTo("");
      setReason("");
      flash(true, S.added);
      loadClosures();
    } else flash(false, S.saveError);
  }

  async function removeClosure(id: string) {
    setClosures((c) => (c ?? []).filter((x) => x.id !== id));
    await fetch(`/api/business/closures?id=${id}`, { method: "DELETE" }).catch(() => null);
  }

  // Stats and "open now", from the saved schedule.
  const savedByDay = useMemo(() => {
    const m = new Map<number, { openMinute: number; closeMinute: number }[]>();
    for (const h of saved) m.set(h.weekday, [...(m.get(h.weekday) ?? []), h].sort((a, b) => a.openMinute - b.openMinute));
    return m;
  }, [saved]);
  const weeklyMinutes = saved.reduce((n, h) => n + (h.closeMinute - h.openMinute), 0);
  const todayStr = useMemo(() => new Intl.DateTimeFormat("en-CA", { timeZone: timezone }).format(new Date()), [timezone]);
  const closedToday = closures?.some((c) => c.date === todayStr) ?? false;
  const upcoming = (closures ?? []).filter((c) => c.date >= todayStr);
  const past = (closures ?? []).filter((c) => c.date < todayStr).reverse();

  let status: { open: boolean; text: string } | null = null;
  if (now) {
    const today = closedToday ? [] : (savedByDay.get(now.weekday) ?? []);
    const current = today.find((w) => w.openMinute <= now.minute && now.minute < w.closeMinute);
    if (current) status = { open: true, text: fill(S.closesAt, { time: minutesLabel(current.closeMinute) }) };
    else {
      const later = today.find((w) => w.openMinute > now.minute);
      if (later) status = { open: false, text: fill(S.opensAt, { time: minutesLabel(later.openMinute) }) };
      else {
        for (let i = 1; i <= 7; i++) {
          const wd = (now.weekday + i) % 7;
          const first = savedByDay.get(wd)?.[0];
          if (first) {
            status = { open: false, text: fill(S.opensDay, { day: S.days[wd].toLowerCase(), time: minutesLabel(first.openMinute) }) };
            break;
          }
        }
      }
    }
  }

  // Holiday suggestions for the salon's country, within the next year.
  const countryHolidays = country === "FI" ? hoursStrings("fi").holidays : country === "VN" ? hoursStrings("vi").holidays : hoursStrings("en").holidays;
  const suggestions = useMemo(() => {
    const taken = new Set((closures ?? []).map((c) => c.date));
    const year = Number(todayStr.slice(0, 4));
    return Object.keys(countryHolidays)
      .flatMap((md) => [`${year}-${md}`, `${year + 1}-${md}`])
      .filter((d) => d >= todayStr && !taken.has(d))
      .sort()
      .slice(0, 5)
      .map((d) => ({ date: d, label: S.holidays[d.slice(5)] ?? countryHolidays[d.slice(5)] }));
  }, [closures, todayStr, countryHolidays, S.holidays]);

  const dateFmt = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
              <Clock className="h-4 w-4" />
              {S.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
            {status && (
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15">
                <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]" : "bg-white/40"}`} />
                <span className="font-bold">{closedToday ? S.closedToday : status.open ? S.openNow : S.closedNow}</span>
                <span className="text-white/60">· {status.text}</span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: S.statWeekly, value: fill(S.hoursUnit, { n: Math.round((weeklyMinutes / 60) * 10) / 10 }) },
              { label: S.statDays, value: `${savedByDay.size}/7` },
              { label: S.statClosures, value: closures ? String(upcoming.length) : "…" },
            ].map((x) => (
              <div key={x.label} className="min-w-[96px] rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
                <p className="text-xl font-bold tabular-nums">{x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-tight text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Weekly schedule */}
        <section className="min-w-0 rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)] sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-ink-900">{S.weekly}</h2>
              <p className="mt-0.5 text-xs text-ink-400">{S.weeklyHint}</p>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-ink-400">
              <Globe2 className="h-3.5 w-3.5" />
              {fill(S.timezone, { tz: timezone })}
            </span>
          </div>

          {canEdit && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">
                <Sparkles className="h-3.5 w-3.5" />
                {S.presets}
              </span>
              {[
                { label: S.presetWeekdays, days: [1, 2, 3, 4, 5], open: "09:00", close: "18:00" },
                { label: S.presetSalon, days: [1, 2, 3, 4, 5, 6], open: "09:00", close: "19:00" },
                { label: S.presetEveryday, days: [0, 1, 2, 3, 4, 5, 6], open: "10:00", close: "20:00" },
              ].map((p) => (
                <button key={p.label} type="button" onClick={() => applyPreset(p.days, p.open, p.close)} className="rounded-full bg-[#fffaf0] px-3 py-1.5 text-xs font-semibold text-[#6b5221] ring-1 ring-[#ecd9ad] hover:bg-[#f8eedb]">
                  {p.label}
                </button>
              ))}
            </div>
          )}

          <ul className="mt-5 divide-y divide-ink-100">
            {ORDER.map((wd) => {
              const d = days[wd];
              const errs = errors[wd];
              const isToday = now?.weekday === wd;
              return (
                <li key={wd} className={`py-4 ${isToday ? "-mx-3 rounded-2xl bg-primary-100/30 px-3" : ""}`}>
                  {/* Phones: day + actions on top, shifts full width below.
                      Wider screens: day | shifts | actions in one row. */}
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 sm:grid-cols-[9rem_minmax(0,1fr)_auto]">
                    {/* Day + toggle */}
                    <label className={`col-start-1 row-start-1 flex items-center gap-3 pt-2 ${canEdit ? "cursor-pointer" : ""}`}>
                      <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${d.open ? "bg-[#1f182d]" : "bg-ink-100"}`}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={d.open}
                          disabled={!canEdit}
                          onChange={(e) => update(wd, (x) => ({ ...x, open: e.target.checked }))}
                        />
                        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${d.open ? "left-[22px]" : "left-0.5"}`} />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-ink-900">{S.days[wd]}</span>
                        <span className={`text-[11px] font-semibold ${d.open ? "text-emerald-600" : "text-ink-400"}`}>{d.open ? S.open : S.closed}</span>
                      </span>
                    </label>

                    {/* Shifts */}
                    <div className="col-span-2 row-start-2 min-w-0 space-y-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                      {d.open ? (
                        d.shifts.map((s, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              type="time"
                              value={s.open}
                              disabled={!canEdit}
                              onChange={(e) => update(wd, (x) => ({ ...x, shifts: x.shifts.map((y, j) => (j === i ? { ...y, open: e.target.value } : y)) }))}
                              className={`${FIELD} min-w-0 flex-1 tabular-nums sm:w-[8.75rem] sm:flex-none ${errs.length ? "border-berry-300" : ""}`}
                            />
                            <span className="text-ink-300">–</span>
                            <input
                              type="time"
                              value={s.close}
                              disabled={!canEdit}
                              onChange={(e) => update(wd, (x) => ({ ...x, shifts: x.shifts.map((y, j) => (j === i ? { ...y, close: e.target.value } : y)) }))}
                              className={`${FIELD} min-w-0 flex-1 tabular-nums sm:w-[8.75rem] sm:flex-none ${errs.length ? "border-berry-300" : ""}`}
                            />
                            {canEdit && d.shifts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => update(wd, (x) => ({ ...x, shifts: x.shifts.filter((_, j) => j !== i) }))}
                                aria-label={S.removeShift}
                                title={S.removeShift}
                                className="rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-500"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="hidden pt-2.5 text-sm text-ink-300 sm:block">—</p>
                      )}
                      {errs.length > 0 && (
                        <p className="flex items-center gap-1 text-xs font-semibold text-berry-500">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {errs.map((e) => (e === "order" ? S.errOrder : S.errOverlap)).join(" · ")}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    {canEdit && d.open && (
                      <div className="col-start-2 row-start-1 flex shrink-0 gap-1 pt-1 sm:col-start-3">
                        <button
                          type="button"
                          onClick={() => {
                            const last = d.shifts[d.shifts.length - 1];
                            const start = Math.min(toMinutes(last.close) + 60, 23 * 60);
                            update(wd, (x) => ({ ...x, shifts: [...x.shifts, { open: minutesLabel(start), close: minutesLabel(Math.min(start + 180, 1439)) }] }));
                          }}
                          className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100/50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {S.addShift}
                        </button>
                        <button
                          type="button"
                          onClick={() => setCopyFrom(copyFrom === wd ? null : wd)}
                          aria-label={S.copyTo}
                          title={S.copyTo}
                          className={`rounded-full p-2 ${copyFrom === wd ? "bg-[#1f182d] text-white" : "text-ink-400 hover:bg-mist-50"}`}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Copy targets */}
                  {copyFrom === wd && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-2xl bg-mist-50/70 p-2.5 ring-1 ring-ink-100">
                      <span className="px-1 text-xs font-semibold text-ink-700">{S.copyTo}</span>
                      <button type="button" onClick={() => copyTo([0, 1, 2, 3, 4, 5, 6])} className="rounded-full bg-[#1f182d] px-3 py-1 text-xs font-bold text-white">
                        {S.copyAll}
                      </button>
                      <button type="button" onClick={() => copyTo([1, 2, 3, 4, 5])} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-700 ring-1 ring-ink-100">
                        {S.copyWeekdays}
                      </button>
                      {ORDER.filter((x) => x !== wd).map((x) => (
                        <button key={x} type="button" onClick={() => copyTo([x])} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-700 ring-1 ring-ink-100">
                          {S.daysShort[x]}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 24h bar */}
                  <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-mist-50 ring-1 ring-ink-100">
                    {d.open &&
                      d.shifts.map((s, i) => {
                        const a = toMinutes(s.open);
                        const b = toMinutes(s.close);
                        if (!(b > a)) return null;
                        return (
                          <span
                            key={i}
                            className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]"
                            style={{ left: `${(a / 1440) * 100}%`, width: `${((b - a) / 1440) * 100}%` }}
                          />
                        );
                      })}
                    {isToday && now && <span className="absolute inset-y-[-2px] w-0.5 bg-berry-500" style={{ left: `${(now.minute / 1440) * 100}%` }} />}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 flex justify-between px-0.5 text-[10px] font-semibold text-ink-300">
            {["00", "06", "12", "18", "24"].map((h) => (
              <span key={h}>{h}:00</span>
            ))}
          </div>

          {canEdit && (
            <div className={`sticky bottom-4 z-10 mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3 transition ${dirty ? "bg-[#1f182d] text-white shadow-2xl" : "bg-mist-50/60"}`}>
              {dirty ? <span className="text-sm font-semibold text-[#e8d3a6]">{S.unsaved}</span> : <span className="hidden sm:block" />}
              <div className="flex w-full gap-2 sm:w-auto">
                {dirty && (
                  <button type="button" onClick={() => setDays(fromHours(saved))} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold text-white/80 ring-1 ring-white/20 hover:text-white">
                    <Undo2 className="h-4 w-4" />
                    {S.discard}
                  </button>
                )}
                <button type="button" onClick={save} disabled={saving || !dirty || hasErrors} className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-50 sm:flex-none ${GOLD_BTN}`}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {S.save}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Closures + staff */}
        <aside className="space-y-4">
          <section className="rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)]">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <CalendarOff className="h-4 w-4 text-[#c2378f]" />
              {S.closuresTitle}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">{S.closuresHint}</p>

            {canEdit && (
              <div className="mt-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-ink-700">{S.from}</span>
                    <input type="date" value={from} min={todayStr} onChange={(e) => setFrom(e.target.value)} className={`${FIELD} w-full`} />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-[11px] font-semibold text-ink-700">{S.to}</span>
                    <input type="date" value={to} min={from || todayStr} onChange={(e) => setTo(e.target.value)} className={`${FIELD} w-full`} />
                  </label>
                </div>
                <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={120} placeholder={S.reasonPh} className={`${FIELD} w-full`} />
                <button type="button" onClick={() => addClosure(from, to, reason)} disabled={!from || adding} className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}>
                  {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4" />}
                  {S.addClosure}
                </button>

                {suggestions.length > 0 && (
                  <div className="pt-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">{S.suggestions}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {suggestions.map((s) => (
                        <button
                          key={s.date}
                          type="button"
                          onClick={() => addClosure(s.date, "", s.label)}
                          className="flex items-center gap-1 rounded-full bg-[#fffaf0] px-2.5 py-1 text-[11px] font-semibold text-[#6b5221] ring-1 ring-[#ecd9ad] hover:bg-[#f8eedb]"
                        >
                          <Plus className="h-3 w-3" />
                          {s.label} · {new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${s.date}T00:00:00Z`))}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.upcoming}</p>
            {closures === null ? (
              <Loader2 className="mt-2 h-4 w-4 animate-spin text-ink-300" />
            ) : upcoming.length === 0 ? (
              <p className="mt-1.5 text-sm text-ink-400">{S.noClosures}</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {upcoming.map((c) => (
                  <li key={c.id} className="flex items-center gap-3 rounded-2xl bg-berry-50/50 px-3 py-2 ring-1 ring-berry-100">
                    <CalendarOff className="h-4 w-4 shrink-0 text-berry-500" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold capitalize text-ink-900">{dateFmt.format(new Date(`${c.date}T00:00:00Z`))}</span>
                      {c.reason && <span className="block truncate text-xs text-ink-400">{c.reason}</span>}
                    </span>
                    {canEdit && (
                      <button type="button" onClick={() => removeClosure(c.id)} aria-label={S.reopen} title={S.reopen} className="rounded-full p-1.5 text-ink-300 hover:bg-white hover:text-berry-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {past.length > 0 && (
              <div className="mt-3">
                <button type="button" onClick={() => setShowPast(!showPast)} className="text-xs font-semibold text-ink-400 hover:underline">
                  {S.past} ({past.length})
                </button>
                {showPast && (
                  <ul className="mt-1.5 space-y-1 text-xs text-ink-400">
                    {past.slice(0, 20).map((c) => (
                      <li key={c.id}>
                        {dateFmt.format(new Date(`${c.date}T00:00:00Z`))}
                        {c.reason ? ` · ${c.reason}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </section>

          <section className="flex gap-3 rounded-3xl border border-ink-100 bg-white p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-100/60 text-primary-600">
              <Users className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{S.staffTitle}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{S.staffText}</p>
              <Link href="/business/dashboard/staff" className="mt-2 inline-block text-xs font-semibold text-primary-600 hover:underline">
                {S.staffLink} →
              </Link>
            </div>
          </section>
        </aside>
      </div>

      {toast && (
        <div className={`fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up ${toast.ok ? "bg-[#1f182d]" : "bg-berry-500"}`}>
          {toast.ok ? <Check className="h-4 w-4 text-[#e8d3a6]" /> : <AlertCircle className="h-4 w-4" />}
          {toast.text}
        </div>
      )}
    </div>
  );
}
