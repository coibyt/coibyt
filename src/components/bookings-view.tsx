"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CalendarDays, List } from "lucide-react";
import { BookingCalendar } from "@/components/booking-calendar";
import { BookingsManager } from "@/components/bookings-manager";

interface BookingRow {
  id: string;
  startsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  serviceName: string;
  staffName: string | null;
  customerName: string;
  customerPhone: string | null;
}

export function BookingsView({
  initialBookings,
  locale,
  businessTimezone,
  staff,
  openHourByWeekday,
}: {
  initialBookings: BookingRow[];
  locale: string;
  businessTimezone: string;
  staff: { id: string; name: string }[];
  openHourByWeekday: Record<number, [number, number]>;
}) {
  const t = useTranslations("business");
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-full border border-ink-100 p-1">
        <button
          onClick={() => setView("calendar")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            view === "calendar" ? "bg-ink-900 text-white" : "text-ink-700"
          }`}
        >
          <CalendarDays className="h-3.5 w-3.5" /> {t("calendarView")}
        </button>
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            view === "list" ? "bg-ink-900 text-white" : "text-ink-700"
          }`}
        >
          <List className="h-3.5 w-3.5" /> {t("listView")}
        </button>
      </div>

      {view === "calendar" ? (
        <BookingCalendar
          staff={staff}
          businessTimezone={businessTimezone}
          locale={locale}
          openHourByWeekday={openHourByWeekday}
        />
      ) : (
        <BookingsManager
          initialBookings={initialBookings}
          locale={locale}
          businessTimezone={businessTimezone}
        />
      )}
    </div>
  );
}
