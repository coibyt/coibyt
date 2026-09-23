"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { addDays, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";

interface StaffOption {
  id: string;
  name: string;
}

interface CalendarBooking {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  staffId: string | null;
  customerNote: string | null;
  serviceName: string;
  customerName: string;
  customerPhone: string | null;
}

const HOUR_HEIGHT = 56; // px per hour in the grid
const DEFAULT_START_HOUR = 7;
const DEFAULT_END_HOUR = 21;

const STATUS_BG: Record<string, string> = {
  PENDING_PAYMENT: "bg-coral-100 border-coral-400 text-coral-600",
  CONFIRMED: "bg-teal-50 border-teal-400 text-teal-600",
  COMPLETED: "bg-sage-50 border-sage-400 text-sage-600",
  NO_SHOW: "bg-berry-50 border-berry-400 text-berry-600",
};

export function BookingCalendar({
  staff,
  businessTimezone,
  locale,
  openHourByWeekday,
}: {
  staff: StaffOption[];
  businessTimezone: string;
  locale: string;
  /** [openMinute, closeMinute] per weekday (0=Sun..6=Sat), if the business is open that day. */
  openHourByWeekday: Record<number, [number, number]>;
}) {
  const t = useTranslations("business");
  const [selectedDate, setSelectedDate] = useState(() =>
    toZonedTime(new Date(), businessTimezone)
  );
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<CalendarBooking | null>(null);
  const [updating, setUpdating] = useState(false);

  const dateStr = format(selectedDate, "yyyy-MM-dd");
  const weekday = selectedDate.getDay();
  const hoursToday = openHourByWeekday[weekday];

  const startHour = hoursToday
    ? Math.min(DEFAULT_START_HOUR, Math.floor(hoursToday[0] / 60))
    : DEFAULT_START_HOUR;
  const endHour = hoursToday
    ? Math.max(DEFAULT_END_HOUR, Math.ceil(hoursToday[1] / 60))
    : DEFAULT_END_HOUR;
  const totalHours = endHour - startHour;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/business/bookings/calendar?date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [dateStr]);

  const hourMarks = useMemo(
    () => Array.from({ length: totalHours + 1 }, (_, i) => startHour + i),
    [startHour, totalHours]
  );

  function minutesFromGridStart(iso: string) {
    const d = toZonedTime(new Date(iso), businessTimezone);
    return (d.getHours() - startHour) * 60 + d.getMinutes();
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(true);
    await fetch(`/api/business/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setUpdating(false);
    setActiveBooking(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedDate((d) => addDays(d, -1))}
            className="btn-ghost !p-2"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSelectedDate(toZonedTime(new Date(), businessTimezone))}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            {t("today")}
          </button>
          <button
            onClick={() => setSelectedDate((d) => addDays(d, 1))}
            className="btn-ghost !p-2"
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-2 text-sm font-semibold text-ink-900">
            {format(selectedDate, "EEEE, d MMMM yyyy", {
              locale: locale === "vi" ? vi : undefined,
            })}
          </span>
        </div>
        {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `56px repeat(${Math.max(staff.length, 1)}, minmax(160px, 1fr))`,
          }}
        >
          {/* Header row */}
          <div className="border-b border-r border-ink-100 bg-mist-50" />
          {staff.length === 0 ? (
            <div className="border-b border-ink-100 bg-mist-50 px-3 py-2 text-xs font-semibold text-ink-700">
              {t("unassigned")}
            </div>
          ) : (
            staff.map((s) => (
              <div
                key={s.id}
                className="border-b border-l border-ink-100 bg-mist-50 px-3 py-2 text-xs font-semibold text-ink-700"
              >
                {s.name}
              </div>
            ))
          )}

          {/* Time axis column */}
          <div className="relative border-r border-ink-100" style={{ height: totalHours * HOUR_HEIGHT }}>
            {hourMarks.map((h) => (
              <div
                key={h}
                className="absolute -translate-y-1/2 pr-2 text-right text-xs text-ink-400"
                style={{ top: (h - startHour) * HOUR_HEIGHT, right: 0 }}
              >
                {String(h).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Staff columns */}
          {(staff.length === 0 ? [{ id: "", name: "" }] : staff).map((s) => (
            <div
              key={s.id || "unassigned"}
              className="relative border-l border-ink-100"
              style={{ height: totalHours * HOUR_HEIGHT }}
            >
              {hourMarks.map((h) => (
                <div
                  key={h}
                  className="absolute w-full border-t border-ink-50"
                  style={{ top: (h - startHour) * HOUR_HEIGHT }}
                />
              ))}
              {bookings
                .filter((b) => (staff.length === 0 ? true : b.staffId === s.id))
                .map((b) => {
                  const top = (minutesFromGridStart(b.startsAt) / 60) * HOUR_HEIGHT;
                  const height = Math.max(
                    ((minutesFromGridStart(b.endsAt) - minutesFromGridStart(b.startsAt)) / 60) *
                      HOUR_HEIGHT,
                    20
                  );
                  return (
                    <button
                      key={b.id}
                      onClick={() => setActiveBooking(b)}
                      className={`absolute left-0.5 right-0.5 overflow-hidden rounded-lg border-l-4 px-2 py-1 text-left text-xs shadow-sm transition-opacity hover:opacity-90 ${
                        STATUS_BG[b.status] ?? "bg-mist-100 border-ink-400 text-ink-700"
                      }`}
                      style={{ top, height }}
                    >
                      <p className="truncate font-semibold">{b.customerName}</p>
                      <p className="truncate">{b.serviceName}</p>
                    </button>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {activeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="font-bold text-ink-900">{activeBooking.customerName}</p>
                {activeBooking.customerPhone && (
                  <p className="text-sm text-ink-400">{activeBooking.customerPhone}</p>
                )}
              </div>
              <button onClick={() => setActiveBooking(null)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-ink-900">{activeBooking.serviceName}</p>
              <p className="text-ink-700">
                {new Date(activeBooking.startsAt).toLocaleString(
                  locale === "vi" ? "vi-VN" : "en-US",
                  { dateStyle: "medium", timeStyle: "short", timeZone: businessTimezone }
                )}
              </p>
              <p className="font-semibold text-ink-900">
                {formatMoney(activeBooking.priceCents, activeBooking.currency, locale)}
              </p>
              {activeBooking.customerNote && (
                <p className="rounded-lg bg-mist-50 p-2 text-ink-700">
                  {activeBooking.customerNote}
                </p>
              )}
              <BookingStatusBadge status={activeBooking.status} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeBooking.status === "CONFIRMED" && (
                <>
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "COMPLETED")}
                    className="btn-primary !bg-sage-500 !px-3 !py-1.5 text-xs hover:!bg-sage-600"
                  >
                    {locale === "vi" ? "Hoàn thành" : "Complete"}
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "NO_SHOW")}
                    className="btn-outline !px-3 !py-1.5 text-xs"
                  >
                    {locale === "vi" ? "Không đến" : "No-show"}
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "CANCELLED")}
                    className="btn-outline !border-berry-400 !px-3 !py-1.5 text-xs !text-berry-500"
                  >
                    {locale === "vi" ? "Huỷ" : "Cancel"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
