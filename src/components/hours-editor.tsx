"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

interface DayRow {
  open: boolean;
  openTime: string; // "09:00"
  closeTime: string; // "18:00"
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

export function HoursEditor({
  initialHours,
}: {
  initialHours: { weekday: number; openMinute: number; closeMinute: number }[];
}) {
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const [days, setDays] = useState<DayRow[]>(() =>
    Array.from({ length: 7 }, (_, weekday) => {
      const existing = initialHours.find((h) => h.weekday === weekday);
      return existing
        ? { open: true, openTime: toTime(existing.openMinute), closeTime: toTime(existing.closeMinute) }
        : { open: weekday !== 0, openTime: "09:00", closeTime: "18:00" };
    })
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    const payload = days
      .map((d, weekday) => ({ ...d, weekday }))
      .filter((d) => d.open)
      .map((d) => ({
        weekday: d.weekday,
        openMinute: toMinutes(d.openTime),
        closeMinute: toMinutes(d.closeTime),
      }));

    await fetch("/api/business/hours", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <div className="card space-y-3 p-5">
      {days.map((d, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3">
          <label className="flex w-40 items-center gap-2 text-sm font-medium text-ink-900">
            <input
              type="checkbox"
              checked={d.open}
              onChange={(e) =>
                setDays((prev) =>
                  prev.map((row, idx) => (idx === i ? { ...row, open: e.target.checked } : row))
                )
              }
            />
            {tDash.raw("weekdays")[i]}
          </label>
          {d.open && (
            <>
              <input
                type="time"
                value={d.openTime}
                onChange={(e) =>
                  setDays((prev) =>
                    prev.map((row, idx) => (idx === i ? { ...row, openTime: e.target.value } : row))
                  )
                }
                className="input !w-32"
              />
              <span className="text-ink-400">–</span>
              <input
                type="time"
                value={d.closeTime}
                onChange={(e) =>
                  setDays((prev) =>
                    prev.map((row, idx) => (idx === i ? { ...row, closeTime: e.target.value } : row))
                  )
                }
                className="input !w-32"
              />
            </>
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 pt-2">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {tCommon("save")}
        </button>
        {saved && <span className="text-sm text-sage-500">✓</span>}
      </div>
    </div>
  );
}
