"use client";

import { useTranslations } from "next-intl";

export interface DayRow {
  open: boolean;
  openTime: string;
  closeTime: string;
}

export interface StaffHoursValue {
  useCustom: boolean;
  days: DayRow[];
}

export const DEFAULT_STAFF_HOURS: StaffHoursValue = {
  useCustom: false,
  days: Array.from({ length: 7 }, (_, weekday) => ({
    open: weekday !== 0,
    openTime: "09:00",
    closeTime: "18:00",
  })),
};

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Converts the editor state to the API payload — empty when the staff
 * member just follows the salon's hours. */
export function staffHoursPayload(value: StaffHoursValue) {
  if (!value.useCustom) return [];
  return value.days
    .map((d, weekday) => ({ ...d, weekday }))
    .filter((d) => d.open)
    .map((d) => ({
      weekday: d.weekday,
      openMinute: toMinutes(d.openTime),
      closeMinute: toMinutes(d.closeTime),
    }));
}

export function StaffHoursFields({
  value,
  onChange,
}: {
  value: StaffHoursValue;
  onChange: (next: StaffHoursValue) => void;
}) {
  const tDash = useTranslations("dashboard");
  const weekdays = tDash.raw("weekdays") as string[];

  function updateDay(i: number, patch: Partial<DayRow>) {
    onChange({
      ...value,
      days: value.days.map((d, idx) => (idx === i ? { ...d, ...patch } : d)),
    });
  }

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm text-ink-700">
        <input
          type="checkbox"
          checked={value.useCustom}
          onChange={(e) => onChange({ ...value, useCustom: e.target.checked })}
        />
        {tDash("staffForm.customHours")}
      </label>

      {value.useCustom && (
        <div className="space-y-2">
          {value.days.map((d, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3">
              <label className="flex w-32 items-center gap-2 text-sm font-medium text-ink-900">
                <input
                  type="checkbox"
                  checked={d.open}
                  onChange={(e) => updateDay(i, { open: e.target.checked })}
                />
                {weekdays[i]}
              </label>
              {d.open && (
                <>
                  <input
                    type="time"
                    value={d.openTime}
                    onChange={(e) => updateDay(i, { openTime: e.target.value })}
                    className="input !w-32"
                  />
                  <span className="text-ink-400">–</span>
                  <input
                    type="time"
                    value={d.closeTime}
                    onChange={(e) => updateDay(i, { closeTime: e.target.value })}
                    className="input !w-32"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
