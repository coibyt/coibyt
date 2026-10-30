"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { addDays } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import {
  AlertCircle,
  CalendarClock,
  CalendarOff,
  CalendarPlus,
  CalendarRange,
  Check,
  Clock,
  Copy,
  Info,
  Loader2,
  Plane,
  Plus,
  Sparkles,
  Store,
  Trash2,
  UserCog,
  X,
} from "lucide-react";
import { activeStaffPeriod, groupStaffHours, type HoursPeriod, type StaffHourRow } from "@/lib/staff-hours";
import { minutesLabel } from "@/lib/hours-format";
import { fill } from "@/lib/shop-strings";
import { staffScheduleStrings } from "@/lib/staff-schedule-strings";
import { siteSerif } from "@/lib/site-fonts";
import { personalTimeLabel, type PersonalTimeKind } from "@/lib/personal-time";

interface Shift {
  open: string; // "09:00"
  close: string;
}
interface DayRow {
  open: boolean;
  shifts: Shift[];
}
interface HourWindow {
  weekday: number;
  openMinute: number;
  closeMinute: number;
}
interface TimeOff {
  id: string;
  kind: string | null;
  note: string | null;
  startsAt: string;
  endsAt: string;
}

// Monday first, as salons read their week.
const ORDER = [1, 2, 3, 4, 5, 6, 0];
const NEW_PERIOD = "new";
// The kinds that make sense as days away; the short ones (lunch, errands)
// are blocked straight on the bookings calendar.
const LEAVE_KINDS: PersonalTimeKind[] = ["VACATION", "SICK", "PERSONAL", "CHILD_CARE", "PARENTAL", "OVERTIME_OFF", "REDUCED_HOURS", "WORK"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100";
const LABEL = "mb-1.5 block text-xs font-semibold text-ink-700";

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function periodKey(p: { validFrom: string | null; validUntil: string | null }) {
  return `${p.validFrom ?? ""}|${p.validUntil ?? ""}`;
}

function daysFrom(windows: HourWindow[]): DayRow[] {
  return Array.from({ length: 7 }, (_, weekday) => {
    // An empty window (edges dragged together on the calendar) means not working.
    const list = windows.filter((w) => w.weekday === weekday && w.closeMinute > w.openMinute).sort((a, b) => a.openMinute - b.openMinute);
    return list.length
      ? { open: true, shifts: list.map((w) => ({ open: minutesLabel(w.openMinute), close: minutesLabel(w.closeMinute) })) }
      : { open: false, shifts: [{ open: "09:00", close: "18:00" }] };
  });
}

function windowsFrom(days: DayRow[]): HourWindow[] {
  return days.flatMap((d, weekday) =>
    d.open ? d.shifts.map((s) => ({ weekday, openMinute: toMinutes(s.open), closeMinute: toMinutes(s.close) })) : []
  );
}

/** Problems with one day's shifts: ending before starting, or overlaps. */
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

/** Whether every minute of the shift falls inside one of the salon's windows
 * that day (bookings are clamped to the salon's hours anyway). */
function insideSalon(s: Shift, salon: HourWindow[]) {
  const a = toMinutes(s.open);
  const b = toMinutes(s.close);
  return salon.some((w) => w.openMinute <= a && b <= w.closeMinute);
}

/** "YYYY-MM-DD" plus n days, as plain calendar arithmetic (no timezone). */
function shiftDate(date: string, n: number) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Calendar days from a to b ("YYYY-MM-DD"). */
function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
}

function weeklyMinutes(windows: HourWindow[]) {
  return windows.reduce((n, w) => n + Math.max(0, w.closeMinute - w.openMinute), 0);
}

export function StaffHoursModal({
  staffId,
  staffName,
  staffTitle,
  avatarUrl,
  locale,
  timezone,
  onClose,
}: {
  staffId: string;
  staffName: string;
  staffTitle?: string | null;
  avatarUrl?: string | null;
  locale: string;
  timezone: string;
  onClose: () => void;
}) {
  const S = staffScheduleStrings(locale);
  const today = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"week" | "leave">("week");
  const [periods, setPeriods] = useState<HoursPeriod[]>([]);
  const [salon, setSalon] = useState<HourWindow[]>([]);
  const [selected, setSelected] = useState<string>(NEW_PERIOD);
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [custom, setCustom] = useState(false);
  const [days, setDays] = useState<DayRow[]>(() => daysFrom([]));
  const [copyFrom, setCopyFrom] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [leave, setLeave] = useState<TimeOff[]>([]);
  const [leaveForm, setLeaveForm] = useState({ kind: "VACATION" as PersonalTimeKind, from: today, to: "", allDay: true, start: "09:00", end: "13:00", note: "" });
  const [leaveBusy, setLeaveBusy] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // Lock the page behind and close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  async function loadLeave() {
    const to = formatInTimeZone(addDays(new Date(), 365), timezone, "yyyy-MM-dd");
    const r = await fetch(`/api/business/time-off?from=${today}&to=${to}`);
    if (!r.ok) return;
    const d = await r.json();
    // Only this branch's own blocks — time taken at their other branches is
    // listed there, not here.
    setLeave(((d.timeOff ?? []) as (TimeOff & { staffId: string })[]).filter((x) => x.staffId === staffId && !x.kind?.startsWith("OTHER_BRANCH")));
  }

  useEffect(() => {
    // A load that finishes after a newer one (or after the window closed)
    // must not overwrite what the owner has already started editing.
    let cancelled = false;
    Promise.all([
      fetch(`/api/business/staff/${staffId}/hours`).then((r) => r.json()),
      fetch(`/api/business/hours`).then((r) => r.json()),
      loadLeave(),
    ])
      .then(([mine, biz]) => {
        if (cancelled) return;
        const rows: StaffHourRow[] = mine.hours ?? [];
        const list = groupStaffHours(rows).sort((a, b) => (a.validFrom ?? "").localeCompare(b.validFrom ?? ""));
        const salonRows: HourWindow[] = (biz.hours ?? []).map((h: HourWindow) => ({ weekday: h.weekday, openMinute: h.openMinute, closeMinute: h.closeMinute }));
        setPeriods(list);
        setSalon(salonRows);
        // Open on the period in force today, else the first one, else a fresh
        // schedule seeded from the salon's hours.
        const current = activeStaffPeriod(list, today) ?? list[0];
        if (current) selectPeriod(current);
        else setDays(daysFrom(salonRows));
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  function selectPeriod(p: HoursPeriod) {
    setSelected(periodKey(p));
    setFrom(p.validFrom ?? "");
    setUntil(p.validUntil ?? "");
    setCustom(p.windows.length > 0);
    setDays(daysFrom(p.windows.length ? p.windows : salon));
    setCopyFrom(null);
    setError(null);
  }

  function startNewPeriod() {
    setSelected(NEW_PERIOD);
    setFrom(today);
    setUntil("");
    setCustom(true);
    setDays(daysFrom(salon));
    setCopyFrom(null);
    setError(null);
  }

  const salonByDay = useMemo(() => {
    const m = new Map<number, HourWindow[]>();
    for (const w of salon) m.set(w.weekday, [...(m.get(w.weekday) ?? []), w].sort((a, b) => a.openMinute - b.openMinute));
    return m;
  }, [salon]);

  const activeKey = useMemo(() => {
    const p = activeStaffPeriod(periods, today);
    return p ? periodKey(p) : null;
  }, [periods, today]);

  const errors = useMemo(() => days.map(dayErrors), [days]);
  const hasErrors = custom && errors.some((e) => e.length > 0);
  const effective = custom ? windowsFrom(days) : salon;
  const weekly = weeklyMinutes(effective);
  const workingDays = new Set(effective.map((w) => w.weekday)).size;
  const upcomingLeave = leave.filter((l) => new Date(l.endsAt) > new Date());

  function update(weekday: number, fn: (d: DayRow) => DayRow) {
    setDays((prev) => prev.map((d, i) => (i === weekday ? fn(d) : d)));
  }

  function applyPreset(targets: number[] | "working", open: string, close: string) {
    setDays((prev) => {
      const on = prev.map((d, i) => (d.open ? i : -1)).filter((i) => i >= 0);
      const list = targets === "working" ? (on.length ? on : [1, 2, 3, 4, 5, 6]) : targets;
      return prev.map((d, i) => (list.includes(i) ? { open: true, shifts: [{ open, close }] } : targets === "working" ? d : { ...d, open: false }));
    });
  }

  function copyTo(targets: number[]) {
    if (copyFrom === null) return;
    const src = days[copyFrom];
    setDays((prev) => prev.map((d, i) => (targets.includes(i) && i !== copyFrom ? { open: src.open, shifts: src.shifts.map((s) => ({ ...s })) } : d)));
    setToast(fill(S.copied, { day: S.dayNames[copyFrom] }));
    setCopyFrom(null);
  }

  async function save() {
    if (from && until && from > until) return setError(S.errRange);
    if (custom && windowsFrom(days).length === 0) return setError(S.errNoDays);
    if (hasErrors) return;
    const old = selected !== NEW_PERIOD ? periods.find((p) => periodKey(p) === selected) : null;
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from || null,
        until: until || null,
        oldFrom: old ? old.validFrom : from || null,
        oldUntil: old ? old.validUntil : until || null,
        // No windows means "no own schedule": the salon's hours apply.
        hours: custom ? windowsFrom(days) : [],
      }),
    });
    setSaving(false);
    if (!res.ok) return setError(S.errSave);
    onClose();
  }

  async function deleteSelected() {
    const old = periods.find((p) => periodKey(p) === selected);
    if (!old || !window.confirm(S.deleteConfirm)) return;
    setSaving(true);
    await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from: old.validFrom, until: old.validUntil, oldFrom: old.validFrom, oldUntil: old.validUntil, hours: [] }),
    });
    setSaving(false);
    onClose();
  }

  async function addLeave() {
    const f = leaveForm;
    if (!f.from) return;
    const last = f.allDay ? f.to || f.from : f.from;
    if (last < f.from || (!f.allDay && toMinutes(f.end) <= toMinutes(f.start))) return setLeaveError(S.leaveErr);
    // The API caps one block at 31 days, so a longer leave is saved as
    // several back-to-back blocks.
    const blocks: { startsAt: Date; endsAt: Date }[] = [];
    if (f.allDay) {
      let cursor = f.from;
      while (cursor <= last) {
        const chunkEnd = [shiftDate(cursor, 30), last].sort()[0];
        blocks.push({
          startsAt: fromZonedTime(`${cursor}T00:00:00`, timezone),
          endsAt: fromZonedTime(`${shiftDate(chunkEnd, 1)}T00:00:00`, timezone),
        });
        cursor = shiftDate(chunkEnd, 1);
      }
    } else {
      blocks.push({ startsAt: fromZonedTime(`${f.from}T${f.start}:00`, timezone), endsAt: fromZonedTime(`${f.from}T${f.end}:00`, timezone) });
    }
    setLeaveBusy(true);
    setLeaveError(null);
    for (const b of blocks) {
      const r = await fetch("/api/business/time-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId, kind: f.kind, note: f.note.trim() || undefined, startsAt: b.startsAt.toISOString(), endsAt: b.endsAt.toISOString() }),
      });
      if (!r.ok) {
        setLeaveBusy(false);
        setLeaveError(S.leaveErr);
        await loadLeave();
        return;
      }
    }
    await loadLeave();
    setLeaveBusy(false);
    setLeaveForm((x) => ({ ...x, to: "", note: "" }));
    setToast(S.leaveAdded);
  }

  async function removeLeave(id: string) {
    setLeave((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/business/time-off/${id}`, { method: "DELETE" });
    setToast(S.leaveDeleted);
  }

  const dateFmt = (d: string) =>
    new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T00:00:00Z`));

  function periodLabel(p: { validFrom: string | null; validUntil: string | null }) {
    if (!p.validFrom && !p.validUntil) return S.always;
    return `${p.validFrom ? dateFmt(p.validFrom) : S.start} → ${p.validUntil ? dateFmt(p.validUntil) : S.noEnd}`;
  }

  /** "12 thg 11 – 15 thg 11 · 4 ngày" or "12 thg 11 · 09:00–13:00". */
  function leaveLabel(l: TimeOff) {
    const s = formatInTimeZone(l.startsAt, timezone, "yyyy-MM-dd HH:mm");
    const e = formatInTimeZone(l.endsAt, timezone, "yyyy-MM-dd HH:mm");
    if (s.endsWith("00:00") && e.endsWith("00:00")) {
      const first = s.slice(0, 10);
      const lastDay = shiftDate(e.slice(0, 10), -1);
      const n = daysBetween(first, lastDay) + 1;
      return { when: first === lastDay ? dateFmt(first) : `${dateFmt(first)} – ${dateFmt(lastDay)}`, extra: n > 1 ? fill(S.days, { n }) : S.allDay, first };
    }
    return { when: dateFmt(s.slice(0, 10)), extra: `${s.slice(11)}–${e.slice(11)}`, first: s.slice(0, 10) };
  }

  const initial = staffName.trim()[0]?.toUpperCase();

  const body = (
    <div className={`${siteSerif.variable} fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/55 backdrop-blur-sm sm:items-center sm:p-4`} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-[#faf8fd] shadow-2xl animate-slide-up sm:max-h-[90vh] sm:max-w-2xl sm:rounded-[2rem]"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-[#1f182d] px-5 pb-4 pt-5 text-white sm:px-7 sm:pt-6">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#624f89]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-[#c99a3f]/25 blur-3xl" />
          <div className="relative flex items-start gap-3.5">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="h-14 w-14 shrink-0 rounded-2xl object-cover ring-2 ring-white/15" />
            ) : (
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#624f89] to-[#3b2f55] font-serif text-2xl text-[#e8d3a6] ring-2 ring-white/10">
                {initial}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">
                <CalendarClock className="h-3.5 w-3.5" />
                {S.eyebrow}
              </p>
              <h3 className="mt-1 truncate font-serif text-2xl leading-tight sm:text-[1.7rem]">{staffName}</h3>
              {staffTitle && <p className="truncate text-xs text-white/60">{staffTitle}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label={S.cancel} className="-mr-1 rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mt-4 grid grid-cols-3 gap-2">
            {[
              { v: fill(S.hoursUnit, { n: Math.round((weekly / 60) * 10) / 10 }), l: S.statWeekly },
              { v: `${workingDays}/7`, l: S.statDays },
              { v: String(upcomingLeave.length), l: S.statLeave },
            ].map((x) => (
              <div key={x.l} className="min-w-0 rounded-2xl bg-white/[0.07] px-3 py-2.5 ring-1 ring-white/10">
                <p className="truncate text-lg font-bold tabular-nums">{loading ? "–" : x.v}</p>
                <p className="truncate text-[10px] font-semibold text-white/55">{x.l}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-4 flex gap-1 rounded-full bg-white/[0.07] p-1 ring-1 ring-white/10">
            {(
              [
                { id: "week", label: S.tabWeek, icon: CalendarRange },
                { id: "leave", label: S.tabLeave, icon: Plane },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold transition ${
                  tab === t.id ? "bg-white text-[#1f182d] shadow" : "text-white/70 hover:text-white"
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
                {t.id === "leave" && upcomingLeave.length > 0 && (
                  <span className={`rounded-full px-1.5 text-[10px] ${tab === t.id ? "bg-[#1f182d] text-white" : "bg-white/15"}`}>{upcomingLeave.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
            </div>
          ) : tab === "week" ? (
            <div className="space-y-4">
              {/* Periods */}
              <section className="rounded-3xl border border-ink-100 bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <CalendarRange className="h-4 w-4 text-[#b08a3e]" />
                  {S.periods}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{S.periodsHint}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {periods.map((p) => {
                    const key = periodKey(p);
                    const on = key === selected;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => selectPeriod(p)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          on ? "bg-[#1f182d] text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:bg-white"
                        }`}
                      >
                        {periodLabel(p)}
                        {key === activeKey && (
                          <span className={`rounded-full px-1.5 py-px text-[9px] font-bold uppercase ${on ? "bg-emerald-400/20 text-emerald-200" : "bg-emerald-50 text-emerald-700"}`}>
                            {S.activeNow}
                          </span>
                        )}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={startNewPeriod}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                      selected === NEW_PERIOD ? "bg-[#1f182d] text-white" : "border border-dashed border-[#c99a3f] text-[#8a6a2b] hover:bg-[#fffaf0]"
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {S.newPeriod}
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="min-w-0">
                    <span className={LABEL}>{S.from}</span>
                    <input type="date" value={from} max={until || undefined} onChange={(e) => setFrom(e.target.value)} className={FIELD} />
                  </label>
                  <label className="min-w-0">
                    <span className={LABEL}>{S.until}</span>
                    <input type="date" value={until} min={from || undefined} onChange={(e) => setUntil(e.target.value)} className={FIELD} />
                  </label>
                </div>
                <p className="mt-1.5 text-[11px] text-ink-400">{S.dateHint}</p>
              </section>

              {/* Mode */}
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { on: false, icon: Store, title: S.modeSalon, text: S.modeSalonText },
                    { on: true, icon: UserCog, title: S.modeCustom, text: S.modeCustomText },
                  ] as const
                ).map((m) => {
                  const active = custom === m.on;
                  return (
                    <button
                      key={m.title}
                      type="button"
                      onClick={() => {
                        setCustom(m.on);
                        setError(null);
                        if (m.on && windowsFrom(days).length === 0) setDays(daysFrom(salon));
                      }}
                      className={`rounded-3xl p-3.5 text-left transition ${
                        active ? "bg-white shadow-[0_14px_30px_-22px_rgba(31,24,45,0.7)] ring-2 ring-[#c99a3f]" : "bg-white/60 ring-1 ring-ink-100 hover:bg-white"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${active ? "bg-[#1f182d] text-[#e8d3a6]" : "bg-mist-50 text-ink-400"}`}>
                          <m.icon className="h-4 w-4" />
                        </span>
                        <span className={`flex h-5 w-5 items-center justify-center rounded-full ${active ? "bg-[#c99a3f] text-white" : "ring-1 ring-ink-200"}`}>
                          {active && <Check className="h-3 w-3" />}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm font-bold text-ink-900">{m.title}</span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-ink-400">{m.text}</span>
                    </button>
                  );
                })}
              </div>

              {!custom ? (
                <section className="rounded-3xl border border-ink-100 bg-white p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                    <Store className="h-4 w-4 text-[#b08a3e]" />
                    {S.salonHours}
                  </p>
                  <ul className="mt-2 divide-y divide-ink-100">
                    {ORDER.map((wd) => {
                      const list = salonByDay.get(wd) ?? [];
                      return (
                        <li key={wd} className="flex items-center justify-between gap-3 py-2 text-sm">
                          <span className="font-semibold text-ink-700">{S.dayNames[wd]}</span>
                          <span className={`text-right tabular-nums ${list.length ? "text-ink-900" : "text-ink-300"}`}>
                            {list.length ? list.map((w) => `${minutesLabel(w.openMinute)}–${minutesLabel(w.closeMinute)}`).join(", ") : S.off}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ) : (
                <section className="rounded-3xl border border-ink-100 bg-white p-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {S.quick}
                    </span>
                    <button type="button" onClick={() => setDays(daysFrom(salon))} className="flex items-center gap-1 rounded-full bg-[#1f182d] px-3 py-1.5 text-[11px] font-bold text-white">
                      <Store className="h-3 w-3" />
                      {S.copySalon}
                    </button>
                    {[
                      { label: S.presetOffice, targets: [1, 2, 3, 4, 5] as number[] | "working", open: "09:00", close: "17:00" },
                      { label: S.presetMorning, targets: "working" as const, open: "09:00", close: "14:00" },
                      { label: S.presetEvening, targets: "working" as const, open: "14:00", close: "20:00" },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => applyPreset(p.targets, p.open, p.close)}
                        className="rounded-full bg-[#fffaf0] px-3 py-1.5 text-[11px] font-semibold text-[#6b5221] ring-1 ring-[#ecd9ad] hover:bg-[#f8eedb]"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-[10px] font-semibold text-ink-400">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-4 rounded-full bg-[#f1e4c4]" />
                      {S.legendSalon}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-4 rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" />
                      {S.legendStaff}
                    </span>
                  </div>

                  <ul className="mt-2 divide-y divide-ink-100">
                    {ORDER.map((wd) => {
                      const d = days[wd];
                      const errs = errors[wd];
                      const salonToday = salonByDay.get(wd) ?? [];
                      const outside = d.open && errs.length === 0 && d.shifts.some((s) => !insideSalon(s, salonToday));
                      return (
                        <li key={wd} className="py-3.5">
                          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 sm:grid-cols-[8.5rem_minmax(0,1fr)_auto]">
                            <label className="col-start-1 row-start-1 flex cursor-pointer items-center gap-3 pt-1.5">
                              <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${d.open ? "bg-[#1f182d]" : "bg-ink-100"}`}>
                                <input type="checkbox" className="sr-only" checked={d.open} onChange={(e) => update(wd, (x) => ({ ...x, open: e.target.checked }))} />
                                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${d.open ? "left-[22px]" : "left-0.5"}`} />
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-bold text-ink-900">{S.dayNames[wd]}</span>
                                <span className={`text-[11px] font-semibold ${d.open ? "text-emerald-600" : "text-ink-400"}`}>{d.open ? S.working : S.off}</span>
                              </span>
                            </label>

                            <div className="col-span-2 row-start-2 min-w-0 space-y-2 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                              {d.open &&
                                d.shifts.map((s, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <input
                                      type="time"
                                      value={s.open}
                                      onChange={(e) => update(wd, (x) => ({ ...x, shifts: x.shifts.map((y, j) => (j === i ? { ...y, open: e.target.value } : y)) }))}
                                      className={`${FIELD} min-w-0 flex-1 tabular-nums sm:w-[8.25rem] sm:flex-none ${errs.length ? "!border-berry-300" : ""}`}
                                    />
                                    <span className="text-ink-300">–</span>
                                    <input
                                      type="time"
                                      value={s.close}
                                      onChange={(e) => update(wd, (x) => ({ ...x, shifts: x.shifts.map((y, j) => (j === i ? { ...y, close: e.target.value } : y)) }))}
                                      className={`${FIELD} min-w-0 flex-1 tabular-nums sm:w-[8.25rem] sm:flex-none ${errs.length ? "!border-berry-300" : ""}`}
                                    />
                                    {d.shifts.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => update(wd, (x) => ({ ...x, shifts: x.shifts.filter((_, j) => j !== i) }))}
                                        aria-label={S.removeShift}
                                        title={S.removeShift}
                                        className="shrink-0 rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-500"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              {errs.length > 0 && (
                                <p className="flex items-center gap-1 text-xs font-semibold text-berry-500">
                                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                  {errs.map((e) => (e === "order" ? S.errOrder : S.errOverlap)).join(" · ")}
                                </p>
                              )}
                              {outside && (
                                <p className="flex items-start gap-1 text-[11px] font-medium text-amber-700">
                                  <Info className="mt-px h-3.5 w-3.5 shrink-0" />
                                  {salonToday.length ? S.outsideSalon : S.salonClosed}
                                </p>
                              )}
                            </div>

                            {d.open && (
                              <div className="col-start-2 row-start-1 flex shrink-0 gap-1 sm:col-start-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const last = d.shifts[d.shifts.length - 1];
                                    const start = Math.min(toMinutes(last.close) + 60, 23 * 60);
                                    update(wd, (x) => ({ ...x, shifts: [...x.shifts, { open: minutesLabel(start), close: minutesLabel(Math.min(start + 180, 1439)) }] }));
                                  }}
                                  className="flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100/50"
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
                                  {S.dayShort[x]}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* 24h bar: salon hours behind, this person's shifts on top. */}
                          <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-mist-50 ring-1 ring-ink-100">
                            {salonToday.map((w, i) => (
                              <span
                                key={`s${i}`}
                                className="absolute inset-y-0 bg-[#f1e4c4]"
                                style={{ left: `${(w.openMinute / 1440) * 100}%`, width: `${((w.closeMinute - w.openMinute) / 1440) * 100}%` }}
                              />
                            ))}
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
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-1 flex justify-between px-0.5 text-[10px] tabular-nums text-ink-300">
                    {[0, 6, 12, 18, 24].map((h) => (
                      <span key={h}>{String(h).padStart(2, "0")}:00</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Add time off */}
              <section className="rounded-3xl border border-ink-100 bg-white p-4">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <CalendarPlus className="h-4 w-4 text-[#b08a3e]" />
                  {S.leaveTitle}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{S.leaveHint}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {LEAVE_KINDS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setLeaveForm((x) => ({ ...x, kind: k }))}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        leaveForm.kind === k ? "bg-[#1f182d] text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:bg-white"
                      }`}
                    >
                      {personalTimeLabel(k, locale)}
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="min-w-0">
                    <span className={LABEL}>{S.leaveFrom}</span>
                    <input type="date" value={leaveForm.from} min={today} onChange={(e) => setLeaveForm((x) => ({ ...x, from: e.target.value }))} className={FIELD} />
                  </label>
                  {leaveForm.allDay ? (
                    <label className="min-w-0">
                      <span className={LABEL}>{S.leaveTo}</span>
                      <input type="date" value={leaveForm.to} min={leaveForm.from || today} onChange={(e) => setLeaveForm((x) => ({ ...x, to: e.target.value }))} className={FIELD} />
                    </label>
                  ) : (
                    <div className="grid min-w-0 grid-cols-2 gap-2">
                      <label className="min-w-0">
                        <span className={LABEL}>{S.timeFrom}</span>
                        <input type="time" value={leaveForm.start} onChange={(e) => setLeaveForm((x) => ({ ...x, start: e.target.value }))} className={`${FIELD} !px-2`} />
                      </label>
                      <label className="min-w-0">
                        <span className={LABEL}>{S.timeTo}</span>
                        <input type="time" value={leaveForm.end} onChange={(e) => setLeaveForm((x) => ({ ...x, end: e.target.value }))} className={`${FIELD} !px-2`} />
                      </label>
                    </div>
                  )}
                </div>

                <label className="mt-3 flex w-fit cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink-700">
                  <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${leaveForm.allDay ? "bg-[#1f182d]" : "bg-ink-100"}`}>
                    <input type="checkbox" className="sr-only" checked={leaveForm.allDay} onChange={(e) => setLeaveForm((x) => ({ ...x, allDay: e.target.checked }))} />
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${leaveForm.allDay ? "left-[18px]" : "left-0.5"}`} />
                  </span>
                  {S.allDay}
                </label>

                <label className="mt-3 block">
                  <span className={LABEL}>{S.note}</span>
                  <input value={leaveForm.note} maxLength={200} placeholder={S.notePh} onChange={(e) => setLeaveForm((x) => ({ ...x, note: e.target.value }))} className={FIELD} />
                </label>

                {leaveError && (
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-berry-500">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {leaveError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addLeave}
                  disabled={leaveBusy || !leaveForm.from}
                  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}
                >
                  {leaveBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plane className="h-4 w-4" />}
                  {S.addLeave}
                </button>
              </section>

              {/* Upcoming */}
              <section>
                <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.upcoming}</p>
                {upcomingLeave.length === 0 ? (
                  <p className="flex items-center gap-2 rounded-3xl border border-dashed border-ink-100 bg-white px-4 py-6 text-sm text-ink-400">
                    <CalendarOff className="h-4 w-4" />
                    {S.noLeave}
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {upcomingLeave.map((l) => {
                      const lab = leaveLabel(l);
                      const now = lab.first <= today;
                      return (
                        <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-ink-100">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${now ? "bg-[#1f182d] text-[#e8d3a6]" : "bg-[#fbf3e1] text-[#8a6a2b]"}`}>
                            <Plane className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-x-2 text-sm font-bold text-ink-900">
                              {personalTimeLabel(l.kind, locale)}
                              {now && <span className="rounded-full bg-emerald-50 px-1.5 py-px text-[10px] font-bold text-emerald-700">{S.today}</span>}
                            </span>
                            <span className="block truncate text-xs text-ink-400">
                              {lab.when} · {lab.extra}
                              {l.note ? ` · ${l.note}` : ""}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLeave(l.id)}
                            aria-label={S.removeLeave}
                            title={S.removeLeave}
                            className="shrink-0 rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        {tab === "week" && !loading && (
          <div className="shrink-0 border-t border-ink-100 bg-white px-4 py-3 sm:px-7">
            {error && (
              <p className="mb-2 flex items-start gap-1.5 text-xs font-semibold text-berry-500">
                <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
                {error}
              </p>
            )}
            <div className="flex items-center gap-2">
              {selected !== NEW_PERIOD && (
                <button
                  type="button"
                  onClick={deleteSelected}
                  disabled={saving}
                  aria-label={S.deletePeriod}
                  title={S.deletePeriod}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold text-berry-500 ring-1 ring-berry-100 hover:bg-berry-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{S.deletePeriod}</span>
                </button>
              )}
              <button type="button" onClick={onClose} className="ml-auto shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-mist-50">
                {S.cancel}
              </button>
              <button
                type="button"
                onClick={save}
                disabled={saving || hasErrors}
                className={`flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clock className="h-4 w-4" />}
                {S.save}
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );

  return mounted ? createPortal(body, document.body) : null;
}
