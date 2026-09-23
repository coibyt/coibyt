"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, X } from "lucide-react";

interface DayRow {
  open: boolean;
  openTime: string;
  closeTime: string;
}

const WEEKDAYS_VI = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
  const weekdays = locale === "vi" ? WEEKDAYS_VI : WEEKDAYS_EN;

  const [loading, setLoading] = useState(true);
  const [useCustom, setUseCustom] = useState(false);
  const [days, setDays] = useState<DayRow[]>(() =>
    Array.from({ length: 7 }, () => ({ ...DEFAULT_DAY }))
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/business/staff/${staffId}/hours`)
      .then((r) => r.json())
      .then((data) => {
        const hours: { weekday: number; openMinute: number; closeMinute: number }[] =
          data.hours ?? [];
        if (hours.length > 0) {
          setUseCustom(true);
          setDays(
            Array.from({ length: 7 }, (_, weekday) => {
              const existing = hours.find((h) => h.weekday === weekday);
              return existing
                ? {
                    open: true,
                    openTime: toTime(existing.openMinute),
                    closeTime: toTime(existing.closeMinute),
                  }
                : { open: false, openTime: "09:00", closeTime: "18:00" };
            })
          );
        }
      })
      .finally(() => setLoading(false));
  }, [staffId]);

  async function save() {
    setSaving(true);
    const payload = useCustom
      ? days
          .map((d, weekday) => ({ ...d, weekday }))
          .filter((d) => d.open)
          .map((d) => ({
            weekday: d.weekday,
            openMinute: toMinutes(d.openTime),
            closeMinute: toMinutes(d.closeTime),
          }))
      : [];

    await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-lg animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">
            {locale === "vi" ? `Giờ làm việc — ${staffName}` : `Working hours — ${staffName}`}
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
            <label className="mb-4 flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={useCustom}
                onChange={(e) => setUseCustom(e.target.checked)}
              />
              {locale === "vi"
                ? "Đặt giờ làm việc riêng cho nhân viên này (mặc định theo giờ mở cửa salon)"
                : "Set custom hours for this staff member (defaults to the salon's opening hours)"}
            </label>

            {useCustom && (
              <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
                {days.map((d, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-3">
                    <label className="flex w-32 items-center gap-2 text-sm font-medium text-ink-900">
                      <input
                        type="checkbox"
                        checked={d.open}
                        onChange={(e) =>
                          setDays((prev) =>
                            prev.map((row, idx) =>
                              idx === i ? { ...row, open: e.target.checked } : row
                            )
                          )
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
                            setDays((prev) =>
                              prev.map((row, idx) =>
                                idx === i ? { ...row, openTime: e.target.value } : row
                              )
                            )
                          }
                          className="input !w-28"
                        />
                        <span className="text-ink-400">–</span>
                        <input
                          type="time"
                          value={d.closeTime}
                          onChange={(e) =>
                            setDays((prev) =>
                              prev.map((row, idx) =>
                                idx === i ? { ...row, closeTime: e.target.value } : row
                              )
                            )
                          }
                          className="input !w-28"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 flex gap-2">
              <button onClick={save} disabled={saving} className="btn-primary">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {tCommon("save")}
              </button>
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
