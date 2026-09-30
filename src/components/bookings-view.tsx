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
  title,
  initialBookings,
  locale,
  businessTimezone,
  staff,
  services,
  isOwner,
}: {
  title: string;
  initialBookings: BookingRow[];
  locale: string;
  businessTimezone: string;
  staff: { id: string; name: string; avatarUrl: string | null }[];
  services: { id: string; name: string; durationMin: number; priceCents: number; currency: string }[];
  isOwner: boolean;
}) {
  const t = useTranslations("business");
  const [view, setView] = useState<"calendar" | "list">("calendar");
  // The calendar's own timezone note + date/range label are portaled in here
  // (see BookingCalendar's `headerSlot` prop) so they sit on the same row as
  // the title and the Calendar/List toggle on desktop, instead of stacking
  // into several separate rows above the actual calendar.
  const [headerSlot, setHeaderSlot] = useState<HTMLDivElement | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold text-ink-900">{title}</h1>
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
        </div>
        {view === "calendar" && (
          <div
            ref={setHeaderSlot}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-end"
          />
        )}
      </div>

      {view === "calendar" ? (
        <BookingCalendar
          staff={staff}
          services={services}
          businessTimezone={businessTimezone}
          locale={locale}
          isOwner={isOwner}
          headerSlot={headerSlot}
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
