"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, X } from "lucide-react";
import { groupStaffHours, type HoursPeriod, type StaffHourRow } from "@/lib/staff-hours";

interface DayRow {
  open: boolean;
  openTime: string;
  closeTime: string;
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
function toTime(minutes: number) {
  const h = Math.floor(minutes / 60).toString().padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}
const DEFAULT_DAY: DayRow = { open: true, openTime: "09:00", closeTime: "18:00" };
const NEW_PERIOD = "new";

function periodKey(p: { validFrom: string | null; validUntil: string | null }) {
  return `${p.validFrom ?? ""}|${p.validUntil ?? ""}`;
}

function daysFromPeriod(p: HoursPeriod | null): DayRow[] {
  return Array.from({ length: 7 }, (_, weekday) => {
    const existing = p?.windows.find((w) => w.weekday === weekday);
    return existing
      ? { open: true, openTime: toTime(existing.openMinute), closeTime: toTime(existing.closeMinute) }
      : { open: false, openTime: DEFAULT_DAY.openTime, closeTime: DEFAULT_DAY.closeTime };
  });
}

export function StaffHoursModal({
  staffId,
  staffName,
  locale,
  onClose,
}: {
  staffId: string;
  staffName: string;
  locale: string;
  onClose: () => void;
}) {
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const weekdays = tDash.raw("weekdays");
  const vi = locale === "vi";

  const [loading, setLoading] = useState(true);
  const [periods, setPeriods] = useState<HoursPeriod[]>([]);
  const [selected, setSelected] = useState<string>(NEW_PERIOD);
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [days, setDays] = useState<DayRow[]>(() => daysFromPeriod(null));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/business/staff/${staffId}/hours`)
      .then((r) => r.json())
      .then((data) => {
        const rows: StaffHourRow[] = data.hours ?? [];
        const list = groupStaffHours(rows).sort((a, b) =>
          (a.validFrom ?? "").localeCompare(b.validFrom ?? "")
        );
        setPeriods(list);
        if (list.length > 0) selectPeriod(list[0]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  function selectPeriod(p: HoursPeriod) {
    setSelected(periodKey(p));
    setFrom(p.validFrom ?? "");
    setUntil(p.validUntil ?? "");
    setUseCustom(p.windows.length > 0);
    setDays(daysFromPeriod(p));
    setError(null);
  }

  function startNewPeriod() {
    setSelected(NEW_PERIOD);
    setFrom("");
    setUntil("");
    setUseCustom(true);
    setDays(daysFromPeriod(null));
    setError(null);
  }

  // The period being replaced: the selected existing one, or — for a brand
  // new period — the one with the same range if it exists (replacing it).
  const oldPeriod = useMemo(() => {
    if (selected !== NEW_PERIOD) {
      const found = periods.find((p) => periodKey(p) === selected);
      if (found) return { validFrom: found.validFrom, validUntil: found.validUntil };
    }
    return { validFrom: from || null, validUntil: until || null };
  }, [selected, periods, from, until]);

  async function save() {
    if (from && until && from > until) {
      setError(vi ? "Ngày kết thúc phải sau ngày bắt đầu." : "End date must be after the start date.");
      return;
    }
    setSaving(true);
    setError(null);
    const hours = useCustom
      ? days
          .map((d, weekday) => ({ ...d, weekday }))
          .filter((d) => d.open)
          .map((d) => ({
            weekday: d.weekday,
            openMinute: toMinutes(d.openTime),
            closeMinute: toMinutes(d.closeTime),
          }))
      : [];

    const res = await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from || null,
        until: until || null,
        oldFrom: oldPeriod.validFrom,
        oldUntil: oldPeriod.validUntil,
        hours,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setError(vi ? "Không lưu được, vui lòng thử lại." : "Couldn't save, please try again.");
      return;
    }
    onClose();
  }

  async function deleteSelected() {
    if (selected === NEW_PERIOD) return;
    setSaving(true);
    await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: oldPeriod.validFrom,
        until: oldPeriod.validUntil,
        oldFrom: oldPeriod.validFrom,
        oldUntil: oldPeriod.validUntil,
        hours: [],
      }),
    });
    setSaving(false);
    onClose();
  }

  function periodLabel(p: HoursPeriod) {
    const range =
      p.validFrom || p.validUntil
        ? `${p.validFrom ?? (vi ? "bắt đầu" : "start")} → ${p.validUntil ?? (vi ? "không giới hạn" : "open-ended")}`
        : vi
          ? "Luôn áp dụng"
          : "Always";
    return range;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-lg animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">
            {`${tDash("staffForm.workingHours")} — ${staffName}`}
          </h3>
          <button onClick={onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
          </div>
        ) : (
          <>
            <div className="mb-4 space-y-2">
              <label className="label">{vi ? "Khoảng thời gian áp dụng" : "Applies to"}</label>
              <select
                className="input"
                value={selected}
                onChange={(e) => {
                  if (e.target.value === NEW_PERIOD) startNewPeriod();
                  else {
                    const p = periods.find((x) => periodKey(x) === e.target.value);
                    if (p) selectPeriod(p);
                  }
                }}
              >
                {periods.map((p) => (
                  <option key={periodKey(p)} value={periodKey(p)}>
                    {periodLabel(p)}
                  </option>
                ))}
                <option value={NEW_PERIOD}>{vi ? "+ Khoảng thời gian mới" : "+ New period"}</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-ink-400">{vi ? "Từ ngày" : "From"}</label>
                  <input type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-ink-400">{vi ? "Đến ngày" : "Until"}</label>
                  <input type="date" className="input" value={until} onChange={(e) => setUntil(e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-ink-400">
                {vi
                  ? "Để trống ngày để áp dụng vô thời hạn. Ngày ngoài khoảng này sẽ theo giờ mở cửa của salon."
                  : "Leave a date empty for no limit. Days outside this range follow the salon's opening hours."}
              </p>
            </div>

            <label className="mb-4 flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} />
              {vi
                ? "Đặt giờ làm việc riêng cho nhân viên này (mặc định theo giờ mở cửa salon)"
                : "Set custom hours for this staff member (defaults to the salon's opening hours)"}
            </label>

            {useCustom && (
              <div className="max-h-[45vh] space-y-3 overflow-y-auto pr-1">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3">
                    <label className="flex w-32 items-center gap-2 text-sm font-medium text-ink-900">
                      <input
                        type="checkbox"
                        checked={d.open}
                        onChange={(e) =>
                          setDays((prev) => prev.map((row, idx) => (idx === i ? { ...row, open: e.target.checked } : row)))
                        }
                      />
                      {weekdays[i]}
                    </label>
                    {d.open && (
                      <>
                        <input
                          type="time"
                          value={d.openTime}
                          onChange={(e) =>
                            setDays((prev) => prev.map((row, idx) => (idx === i ? { ...row, openTime: e.target.value } : row)))
                          }
                          className="input !w-32"
                        />
                        <span className="text-ink-400">–</span>
                        <input
                          type="time"
                          value={d.closeTime}
                          onChange={(e) =>
                            setDays((prev) => prev.map((row, idx) => (idx === i ? { ...row, closeTime: e.target.value } : row)))
                          }
                          className="input !w-32"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {error && <p className="mt-3 text-sm text-berry-500">{error}</p>}

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={save} disabled={saving} className="btn-primary">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {tCommon("save")}
              </button>
              {selected !== NEW_PERIOD && (
                <button onClick={deleteSelected} disabled={saving} className="btn-ghost !text-berry-500">
                  {vi ? "Xoá khoảng này" : "Delete this period"}
                </button>
              )}
              <button onClick={onClose} className="btn-ghost">
                {tCommon("cancel")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
