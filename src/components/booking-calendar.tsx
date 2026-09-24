"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";

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
  staffName: string | null;
  customerId: string;
  customerNote: string | null;
  serviceName: string;
  customerName: string;
  customerPhone: string | null;
  addOnNames: string[];
}

interface CustomerMatch {
  id: string;
  name: string;
  phone: string | null;
  email: string;
}

interface CustomerDetail {
  customer: { name: string; phone: string | null; email: string };
  visitCount: number;
  totalSpentCents: number;
  currency: string;
  bookings: {
    id: string;
    startsAt: string;
    status: string;
    serviceName: string;
    priceCents: number;
    currency: string;
  }[];
}

const HOUR_HEIGHT = 56; // px per hour in the day/week grid
const DEFAULT_START_HOUR = 7;
const DEFAULT_END_HOUR = 21;
const DRAG_SNAP_MIN = 15;
const STAFF_DOT_COLORS = [
  "bg-primary-500",
  "bg-teal-500",
  "bg-coral-500",
  "bg-berry-500",
  "bg-sage-500",
];

const STATUS_BG: Record<string, string> = {
  PENDING_PAYMENT: "bg-coral-100 border-coral-400 text-coral-600",
  CONFIRMED: "bg-teal-50 border-teal-400 text-teal-600",
  COMPLETED: "bg-sage-50 border-sage-400 text-sage-600",
  NO_SHOW: "bg-berry-50 border-berry-400 text-berry-600",
};

type ViewMode = "day" | "week" | "month";

interface ServiceOption {
  id: string;
  name: string;
  durationMin: number;
  priceCents: number;
  currency: string;
}

interface NewBookingDraft {
  startsAt: Date;
  staffId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNote: string;
}

interface PendingReschedule {
  booking: CalendarBooking;
  newStartsAt: Date;
  newStaffId: string;
}

interface DayWindow {
  weekday: number;
  openMinute: number;
  closeMinute: number;
}

export function BookingCalendar({
  staff,
  services,
  businessTimezone,
  locale,
  isOwner,
}: {
  staff: StaffOption[];
  services: ServiceOption[];
  businessTimezone: string;
  locale: string;
  isOwner: boolean;
}) {
  const t = useTranslations("business");
  const dfLocale = locale === "vi" ? vi : undefined;
  const viewerTimezone = useViewerTimezone();
  const [view, setView] = useState<ViewMode>("day");
  const [anchorDate, setAnchorDate] = useState(() => toZonedTime(new Date(), businessTimezone));
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<CalendarBooking | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const draggingId = useRef<string | null>(null);
  const [now, setNow] = useState(() => toZonedTime(new Date(), businessTimezone));
  const [newBooking, setNewBooking] = useState<NewBookingDraft | null>(null);
  const [creatingBooking, setCreatingBooking] = useState(false);
  const [newBookingError, setNewBookingError] = useState<string | null>(null);
  const [customerMatches, setCustomerMatches] = useState<CustomerMatch[]>([]);
  const [pendingReschedule, setPendingReschedule] = useState<PendingReschedule | null>(null);
  const [reschedulingBusy, setReschedulingBusy] = useState(false);
  const [customerDetail, setCustomerDetail] = useState<CustomerDetail | null>(null);
  const [loadingCustomerDetail, setLoadingCustomerDetail] = useState(false);
  const [businessHours, setBusinessHours] = useState<DayWindow[]>([]);
  const [staffHoursMap, setStaffHoursMap] = useState<Map<string, DayWindow[]>>(new Map());
  const [resizing, setResizing] = useState<{ staffId: string; edge: "open" | "close" } | null>(null);
  const [resizePreview, setResizePreview] = useState<number | null>(null);
  const resizePreviewRef = useRef<number | null>(null);
  const dayColumnRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const interval = setInterval(() => setNow(toZonedTime(new Date(), businessTimezone)), 60_000);
    return () => clearInterval(interval);
  }, [businessTimezone]);

  // Working-hours drag-to-resize (see the resize handles in the day view
  // below) is an owner-only affordance — staff aren't allowed to edit each
  // other's schedules from the calendar.
  useEffect(() => {
    if (!isOwner) return;
    fetch("/api/business/hours")
      .then((r) => (r.ok ? r.json() : { hours: [] }))
      .then((d) => setBusinessHours(d.hours ?? []))
      .catch(() => setBusinessHours([]));
  }, [isOwner]);

  useEffect(() => {
    if (!isOwner || staff.length === 0) return;
    Promise.all(
      staff.map((s) =>
        fetch(`/api/business/staff/${s.id}/hours`)
          .then((r) => (r.ok ? r.json() : { hours: [] }))
          .then((d) => [s.id, d.hours ?? []] as const)
          .catch(() => [s.id, []] as const)
      )
    ).then((entries) => setStaffHoursMap(new Map(entries)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner, staff.map((s) => s.id).join(",")]);

  const staffColor = useMemo(() => {
    const map = new Map<string, string>();
    staff.forEach((s, i) => map.set(s.id, STAFF_DOT_COLORS[i % STAFF_DOT_COLORS.length]));
    return map;
  }, [staff]);

  const { rangeStart, rangeEnd, gridStart, gridEnd } = useMemo(() => {
    if (view === "day") {
      return { rangeStart: anchorDate, rangeEnd: anchorDate, gridStart: anchorDate, gridEnd: anchorDate };
    }
    if (view === "week") {
      const s = startOfWeek(anchorDate, { weekStartsOn: 1 });
      const e = endOfWeek(anchorDate, { weekStartsOn: 1 });
      return { rangeStart: s, rangeEnd: e, gridStart: s, gridEnd: e };
    }
    const monthStart = startOfMonth(anchorDate);
    const monthEnd = endOfMonth(anchorDate);
    const gs = startOfWeek(monthStart, { weekStartsOn: 1 });
    const ge = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return { rangeStart: gs, rangeEnd: ge, gridStart: gs, gridEnd: ge };
  }, [anchorDate, view]);

  const fromStr = format(rangeStart, "yyyy-MM-dd");
  const toStr = format(rangeEnd, "yyyy-MM-dd");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/business/bookings/calendar?from=${fromStr}&to=${toStr}`)
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [fromStr, toStr]);

  function minutesFromMidnight(iso: string) {
    const d = toZonedTime(new Date(iso), businessTimezone);
    return d.getHours() * 60 + d.getMinutes();
  }

  function bookingsOnDay(day: Date) {
    return bookings.filter((b) => isSameDay(toZonedTime(new Date(b.startsAt), businessTimezone), day));
  }

  // The staff member's working window for the currently displayed day — from
  // their own custom schedule if they have one, else the business's own
  // hours. Only a single continuous window is supported here (most salons
  // run one shift a day), matching what the two drag handles can represent.
  function getStaffWindow(staffId: string, weekday: number): DayWindow | null {
    const customRows = staffHoursMap.get(staffId);
    if (customRows && customRows.length > 0) {
      return customRows.find((r) => r.weekday === weekday) ?? null;
    }
    return businessHours.find((r) => r.weekday === weekday) ?? null;
  }

  async function commitStaffHoursResize(staffId: string, edge: "open" | "close", newMinute: number) {
    const todayWeekday = anchorDate.getDay();
    const current = getStaffWindow(staffId, todayWeekday) ?? {
      weekday: todayWeekday,
      openMinute: DEFAULT_START_HOUR * 60,
      closeMinute: DEFAULT_END_HOUR * 60,
    };
    const updated: DayWindow = {
      weekday: todayWeekday,
      openMinute: edge === "open" ? newMinute : current.openMinute,
      closeMinute: edge === "close" ? newMinute : current.closeMinute,
    };
    if (updated.openMinute >= updated.closeMinute) return;

    // A staff member with zero custom rows inherits the business's hours for
    // every day — resizing just today would otherwise leave every OTHER day
    // with no row at all, which reads as "closed", not "unchanged". Seed the
    // full week from the business's own hours the first time this happens.
    const existingRows = staffHoursMap.get(staffId) ?? [];
    const baseWeek = existingRows.length > 0 ? existingRows : businessHours;
    const newWeek = [...baseWeek.filter((r) => r.weekday !== todayWeekday), updated];

    setStaffHoursMap((prev) => new Map(prev).set(staffId, newWeek));
    await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        newWeek.map(({ weekday, openMinute, closeMinute }) => ({ weekday, openMinute, closeMinute }))
      ),
    });
  }

  function startResize(staffId: string, edge: "open" | "close", e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setResizing({ staffId, edge });
  }

  useEffect(() => {
    if (!resizing) return;
    function onMove(e: MouseEvent) {
      const col = dayColumnRefs.current.get(resizing!.staffId);
      if (!col) return;
      const rect = col.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      let minute = DEFAULT_START_HOUR * 60 + (offsetY / HOUR_HEIGHT) * 60;
      minute = Math.max(
        DEFAULT_START_HOUR * 60,
        Math.min(DEFAULT_END_HOUR * 60, Math.round(minute / DRAG_SNAP_MIN) * DRAG_SNAP_MIN)
      );
      resizePreviewRef.current = minute;
      setResizePreview(minute);
    }
    function onUp() {
      if (resizePreviewRef.current !== null) {
        commitStaffHoursResize(resizing!.staffId, resizing!.edge, resizePreviewRef.current);
      }
      resizePreviewRef.current = null;
      setResizePreview(null);
      setResizing(null);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizing]);

  function navigate(dir: -1 | 1) {
    setAnchorDate((d) =>
      view === "day" ? addDays(d, dir) : view === "week" ? addWeeks(d, dir) : addMonths(d, dir)
    );
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(true);
    await fetch(`/api/business/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setUpdating(false);
    setActiveBooking(null);
  }

  async function rescheduleBooking(booking: CalendarBooking, newStartsAt: Date, newStaffId: string) {
    const durationMs = new Date(booking.endsAt).getTime() - new Date(booking.startsAt).getTime();
    setReschedulingBusy(true);
    const res = await fetch(`/api/business/bookings/${booking.id}/reschedule`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startsAt: newStartsAt.toISOString(), staffId: newStaffId }),
    });
    setReschedulingBusy(false);
    if (!res.ok) {
      setError(
        locale === "vi"
          ? "Không thể chuyển lịch — trùng giờ với lịch hẹn khác."
          : "Couldn't move it — that time overlaps another booking."
      );
      setTimeout(() => setError(null), 4000);
      return;
    }
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id
          ? {
              ...b,
              startsAt: newStartsAt.toISOString(),
              endsAt: new Date(newStartsAt.getTime() + durationMs).toISOString(),
              staffId: newStaffId,
            }
          : b
      )
    );
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    day: Date,
    columnStaffId: string | undefined,
    gridTopHour: number
  ) {
    e.preventDefault();
    const id = draggingId.current;
    draggingId.current = null;
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    let minutes = gridTopHour * 60 + (offsetY / HOUR_HEIGHT) * 60;
    minutes = Math.max(0, Math.round(minutes / DRAG_SNAP_MIN) * DRAG_SNAP_MIN);

    // `day` is already a "fake local" Date (derived via toZonedTime earlier),
    // so its own y/m/d getters read as the business's own calendar date.
    // Combine that date with the dropped minute-of-day as a naive wall-clock
    // string and let fromZonedTime resolve the real UTC instant — the same
    // pattern the availability engine uses, so it can't drift out of sync.
    const dateStr = format(day, "yyyy-MM-dd");
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    const newStartsAt = fromZonedTime(`${dateStr}T${hh}:${mm}:00`, businessTimezone);

    const staffId = columnStaffId ?? booking.staffId ?? staff[0]?.id;
    if (!staffId) return;
    if (newStartsAt.getTime() === new Date(booking.startsAt).getTime() && staffId === booking.staffId) {
      return; // dropped back where it started — nothing to confirm
    }
    setPendingReschedule({ booking, newStartsAt, newStaffId: staffId });
  }

  async function confirmPendingReschedule() {
    if (!pendingReschedule) return;
    await rescheduleBooking(
      pendingReschedule.booking,
      pendingReschedule.newStartsAt,
      pendingReschedule.newStaffId
    );
    setPendingReschedule(null);
  }

  // Clicking empty grid space (not an existing booking — see the
  // stopPropagation in renderBookingBlock) opens the "book for a customer"
  // modal pre-filled at that time/staff column, mirroring handleDrop's math.
  function handleGridClick(
    e: React.MouseEvent<HTMLDivElement>,
    day: Date,
    columnStaffId: string | undefined,
    gridTopHour: number
  ) {
    if (services.length === 0) return;
    const resolvedStaffId = columnStaffId ?? staff[0]?.id;
    if (!resolvedStaffId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    let minutes = gridTopHour * 60 + (offsetY / HOUR_HEIGHT) * 60;
    minutes = Math.max(0, Math.round(minutes / DRAG_SNAP_MIN) * DRAG_SNAP_MIN);

    const dateStr = format(day, "yyyy-MM-dd");
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mm = String(minutes % 60).padStart(2, "0");
    const startsAt = fromZonedTime(`${dateStr}T${hh}:${mm}:00`, businessTimezone);

    setNewBookingError(null);
    setCustomerMatches([]);
    setNewBooking({
      startsAt,
      staffId: resolvedStaffId,
      serviceId: services[0].id,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerNote: "",
    });
  }

  useEffect(() => {
    const phone = newBooking?.customerPhone.trim() ?? "";
    const name = newBooking?.customerName.trim() ?? "";
    const q = phone.length >= 3 ? phone : name;
    if (q.length < 2) {
      setCustomerMatches([]);
      return;
    }
    const handle = setTimeout(() => {
      fetch(`/api/business/customers/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((data) => setCustomerMatches(data.customers ?? []))
        .catch(() => setCustomerMatches([]));
    }, 250);
    return () => clearTimeout(handle);
  }, [newBooking?.customerName, newBooking?.customerPhone]);

  function pickCustomerMatch(c: CustomerMatch) {
    setNewBooking((prev) =>
      prev
        ? { ...prev, customerName: c.name, customerPhone: c.phone ?? "", customerEmail: c.email }
        : prev
    );
    setCustomerMatches([]);
  }

  async function submitNewBooking() {
    if (!newBooking) return;
    setCreatingBooking(true);
    setNewBookingError(null);
    const res = await fetch("/api/business/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: newBooking.serviceId,
        staffId: newBooking.staffId,
        startsAt: newBooking.startsAt.toISOString(),
        customerName: newBooking.customerName,
        customerPhone: newBooking.customerPhone,
        customerEmail: newBooking.customerEmail || undefined,
        customerNote: newBooking.customerNote || undefined,
      }),
    });
    setCreatingBooking(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setNewBookingError(
        data.error === "SLOT_UNAVAILABLE"
          ? locale === "vi"
            ? "Khung giờ này đã có lịch hẹn khác."
            : "That time is already booked."
          : locale === "vi"
            ? "Có lỗi xảy ra, vui lòng thử lại."
            : "Something went wrong, please try again."
      );
      return;
    }
    setNewBooking(null);
    setLoading(true);
    fetch(`/api/business/bookings/calendar?from=${fromStr}&to=${toStr}`)
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  const startHour = DEFAULT_START_HOUR;
  const endHour = DEFAULT_END_HOUR;
  const totalHours = endHour - startHour;
  const hourMarks = Array.from({ length: totalHours + 1 }, (_, i) => startHour + i);

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = ((nowMinutes - startHour * 60) / 60) * HOUR_HEIGHT;
  const nowInRange = nowMinutes >= startHour * 60 && nowMinutes <= endHour * 60;

  function NowLine() {
    return (
      <div
        className="pointer-events-none absolute left-0 right-0 z-10 border-t-2 border-berry-500"
        style={{ top: nowTop }}
      >
        <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-berry-500" />
      </div>
    );
  }

  function renderBookingBlock(b: CalendarBooking, compact = false) {
    const top = ((minutesFromMidnight(b.startsAt) - startHour * 60) / 60) * HOUR_HEIGHT;
    const height = Math.max(
      ((minutesFromMidnight(b.endsAt) - minutesFromMidnight(b.startsAt)) / 60) * HOUR_HEIGHT,
      20
    );
    return (
      <button
        key={b.id}
        draggable={["PENDING_PAYMENT", "CONFIRMED"].includes(b.status)}
        onDragStart={() => (draggingId.current = b.id)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveBooking(b);
          setCustomerDetail(null);
        }}
        className={`absolute left-0.5 right-0.5 z-20 overflow-hidden rounded-lg border-l-4 px-2 py-1 text-left text-xs shadow-sm transition-opacity hover:opacity-90 ${
          STATUS_BG[b.status] ?? "bg-mist-100 border-ink-400 text-ink-700"
        }`}
        style={{ top, height }}
      >
        <p className="truncate font-semibold">{b.customerName}</p>
        {!compact && <p className="truncate">{b.serviceName}</p>}
        {compact && b.staffName && (
          <span
            className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${
              staffColor.get(b.staffId ?? "") ?? "bg-ink-400"
            }`}
          />
        )}
      </button>
    );
  }

  const showLocalTime = !!viewerTimezone && viewerTimezone !== businessTimezone;

  return (
    <div className="space-y-4">
      {showLocalTime && (
        <p className="text-xs text-ink-400">
          {locale === "vi"
            ? `Lịch hiển thị theo giờ salon (${businessTimezone}) · giờ của bạn hiện tại: `
            : `Calendar shown in the salon's time (${businessTimezone}) · your local time now: `}
          {new Date().toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: viewerTimezone ?? undefined,
          })}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="btn-ghost !p-2" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setAnchorDate(toZonedTime(new Date(), businessTimezone))}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            {t("today")}
          </button>
          <button onClick={() => navigate(1)} className="btn-ghost !p-2" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="ml-2 text-sm font-semibold text-ink-900">
            {view === "day" && format(anchorDate, "EEEE, d MMMM yyyy", { locale: dfLocale })}
            {view === "week" &&
              `${format(rangeStart, "d MMM", { locale: dfLocale })} – ${format(rangeEnd, "d MMM yyyy", { locale: dfLocale })}`}
            {view === "month" && format(anchorDate, "MMMM yyyy", { locale: dfLocale })}
          </span>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
        </div>

        <div className="inline-flex rounded-full border border-ink-100 p-1">
          {(["day", "week", "month"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                view === v ? "bg-ink-900 text-white" : "text-ink-700"
              }`}
            >
              {locale === "vi"
                ? { day: "Ngày", week: "Tuần", month: "Tháng" }[v]
                : { day: "Day", week: "Week", month: "Month" }[v]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-berry-50 px-3 py-2 text-sm text-berry-500">{error}</p>
      )}

      {view === "day" && (
        <div className="overflow-x-auto rounded-2xl border border-ink-100">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `56px repeat(${Math.max(staff.length, 1)}, minmax(160px, 1fr))`,
            }}
          >
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
              {nowInRange && isSameDay(anchorDate, now) && <NowLine />}
            </div>

            {(staff.length === 0 ? [{ id: "", name: "" }] : staff).map((s) => {
              const staffWindow = s.id ? getStaffWindow(s.id, anchorDate.getDay()) : null;
              const isResizingThis = resizing?.staffId === s.id;
              const openMinute =
                isResizingThis && resizing?.edge === "open" && resizePreview !== null
                  ? resizePreview
                  : staffWindow?.openMinute;
              const closeMinute =
                isResizingThis && resizing?.edge === "close" && resizePreview !== null
                  ? resizePreview
                  : staffWindow?.closeMinute;
              const openPx =
                openMinute !== undefined ? ((openMinute - startHour * 60) / 60) * HOUR_HEIGHT : null;
              const closePx =
                closeMinute !== undefined ? ((closeMinute - startHour * 60) / 60) * HOUR_HEIGHT : null;

              return (
                <div
                  key={s.id || "unassigned"}
                  ref={(el) => {
                    if (s.id) {
                      if (el) dayColumnRefs.current.set(s.id, el);
                      else dayColumnRefs.current.delete(s.id);
                    }
                  }}
                  className="relative cursor-pointer border-l border-ink-100"
                  style={{ height: totalHours * HOUR_HEIGHT }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, anchorDate, s.id || undefined, startHour)}
                  onClick={(e) => handleGridClick(e, anchorDate, s.id || undefined, startHour)}
                >
                  {hourMarks.map((h) => (
                    <div
                      key={h}
                      className="absolute w-full border-t border-ink-50"
                      style={{ top: (h - startHour) * HOUR_HEIGHT }}
                    />
                  ))}
                  {isOwner && s.id && (
                    <>
                      {openPx !== null && (
                        <div
                          className="pointer-events-none absolute left-0 right-0 top-0 z-10 bg-white/60"
                          style={{ height: Math.max(0, openPx) }}
                        />
                      )}
                      {closePx !== null && (
                        <div
                          className="pointer-events-none absolute left-0 right-0 z-10 bg-white/60"
                          style={{ top: Math.max(0, closePx), bottom: 0 }}
                        />
                      )}
                      {openPx === null && closePx === null && (
                        <div className="pointer-events-none absolute inset-0 z-10 bg-white/60" />
                      )}
                      {openPx !== null && (
                        <div
                          onMouseDown={(e) => startResize(s.id, "open", e)}
                          className={`absolute left-0 right-0 z-20 h-1.5 cursor-row-resize rounded-full bg-ink-900 ${
                            isResizingThis && resizing?.edge === "open" ? "opacity-100" : "opacity-70 hover:opacity-100"
                          }`}
                          style={{ top: openPx - 3 }}
                          title={locale === "vi" ? "Kéo để đổi giờ bắt đầu" : "Drag to change start time"}
                        />
                      )}
                      {closePx !== null && (
                        <div
                          onMouseDown={(e) => startResize(s.id, "close", e)}
                          className={`absolute left-0 right-0 z-20 h-1.5 cursor-row-resize rounded-full bg-ink-900 ${
                            isResizingThis && resizing?.edge === "close" ? "opacity-100" : "opacity-70 hover:opacity-100"
                          }`}
                          style={{ top: closePx - 3 }}
                          title={locale === "vi" ? "Kéo để đổi giờ kết thúc" : "Drag to change end time"}
                        />
                      )}
                    </>
                  )}
                  {bookingsOnDay(anchorDate)
                    .filter((b) => (staff.length === 0 ? true : b.staffId === s.id))
                    .map((b) => renderBookingBlock(b))}
                  {nowInRange && isSameDay(anchorDate, now) && <NowLine />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="overflow-x-auto rounded-2xl border border-ink-100">
          <div className="grid" style={{ gridTemplateColumns: `56px repeat(7, minmax(120px, 1fr))` }}>
            <div className="border-b border-r border-ink-100 bg-mist-50" />
            {Array.from({ length: 7 }, (_, i) => addDays(rangeStart, i)).map((day) => (
              <div
                key={day.toISOString()}
                className={`border-b border-l border-ink-100 px-2 py-2 text-center text-xs font-semibold ${
                  isSameDay(day, toZonedTime(new Date(), businessTimezone))
                    ? "bg-peach-100 text-ink-900"
                    : "bg-mist-50 text-ink-700"
                }`}
              >
                {format(day, "EEE d", { locale: dfLocale })}
              </div>
            ))}

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
              {nowInRange && isWithinInterval(now, { start: rangeStart, end: rangeEnd }) && (
                <NowLine />
              )}
            </div>

            {Array.from({ length: 7 }, (_, i) => addDays(rangeStart, i)).map((day) => (
              <div
                key={day.toISOString()}
                className="relative cursor-pointer border-l border-ink-100"
                style={{ height: totalHours * HOUR_HEIGHT }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, day, undefined, startHour)}
                onClick={(e) => handleGridClick(e, day, undefined, startHour)}
              >
                {hourMarks.map((h) => (
                  <div
                    key={h}
                    className="absolute w-full border-t border-ink-50"
                    style={{ top: (h - startHour) * HOUR_HEIGHT }}
                  />
                ))}
                {bookingsOnDay(day).map((b) => renderBookingBlock(b, true))}
                {nowInRange && isSameDay(day, now) && <NowLine />}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "month" && (
        <div className="overflow-hidden rounded-2xl border border-ink-100">
          <div className="grid grid-cols-7 bg-mist-50 text-center text-xs font-semibold text-ink-700">
            {Array.from({ length: 7 }, (_, i) => addDays(gridStart, i)).map((d) => (
              <div key={d.toISOString()} className="border-b border-ink-100 py-2">
                {format(d, "EEE", { locale: dfLocale })}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from(
              { length: Math.round((gridEnd.getTime() - gridStart.getTime()) / 86_400_000) + 1 },
              (_, i) => addDays(gridStart, i)
            ).map((day) => {
              const dayBookings = bookingsOnDay(day);
              const inMonth = isSameMonth(day, anchorDate);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => {
                    setAnchorDate(day);
                    setView("day");
                  }}
                  className={`min-h-[92px] border-b border-r border-ink-100 p-2 text-left align-top last:border-r-0 ${
                    inMonth ? "bg-white" : "bg-mist-50 text-ink-400"
                  } hover:bg-mist-50`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      isSameDay(day, toZonedTime(new Date(), businessTimezone))
                        ? "rounded-full bg-ink-900 px-1.5 py-0.5 text-white"
                        : "text-ink-700"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                  {dayBookings.length > 0 && (
                    <p className="mt-1 truncate text-xs text-primary-600">
                      {dayBookings.length}{" "}
                      {locale === "vi" ? "lịch hẹn" : dayBookings.length === 1 ? "booking" : "bookings"}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

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
              <button
                onClick={() => {
                  setActiveBooking(null);
                  setCustomerDetail(null);
                }}
                className="text-ink-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-ink-900">{activeBooking.serviceName}</p>
              {activeBooking.addOnNames.map((name) => (
                <p key={name} className="text-ink-400">
                  + {name}
                </p>
              ))}
              {activeBooking.staffName && (
                <p className="text-ink-400">{activeBooking.staffName}</p>
              )}
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
              <button
                type="button"
                onClick={() => {
                  setLoadingCustomerDetail(true);
                  setCustomerDetail(null);
                  fetch(`/api/business/customers/${activeBooking.customerId}`)
                    .then((r) => (r.ok ? r.json() : null))
                    .then((data) => setCustomerDetail(data))
                    .finally(() => setLoadingCustomerDetail(false));
                }}
                className="font-medium text-primary-600 hover:underline"
              >
                {locale === "vi" ? "Chi tiết khách hàng" : "Customer details"}
              </button>
              {loadingCustomerDetail && (
                <p className="flex items-center gap-2 text-ink-400">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> ...
                </p>
              )}
              {customerDetail && (
                <div className="space-y-2 rounded-lg bg-mist-50 p-3">
                  {customerDetail.customer.phone && (
                    <p className="text-ink-700">{customerDetail.customer.phone}</p>
                  )}
                  <p className="text-ink-700">
                    {locale === "vi"
                      ? `Đã hoàn thành ${customerDetail.visitCount} lượt tại salon này`
                      : `${customerDetail.visitCount} completed visit${customerDetail.visitCount === 1 ? "" : "s"} at this salon`}
                    {customerDetail.visitCount > 0 &&
                      ` · ${formatMoney(customerDetail.totalSpentCents, customerDetail.currency, locale)}`}
                  </p>
                  <ul className="max-h-40 space-y-1 overflow-y-auto text-xs text-ink-400">
                    {customerDetail.bookings.map((b) => (
                      <li key={b.id} className="flex justify-between gap-2">
                        <span className="truncate">
                          {new Date(b.startsAt).toLocaleDateString(
                            locale === "vi" ? "vi-VN" : "en-US",
                            { dateStyle: "medium" }
                          )}{" "}
                          — {b.serviceName}
                        </span>
                        <span className="shrink-0">{formatMoney(b.priceCents, b.currency, locale)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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

      {newBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6">
            <div className="mb-4 flex items-start justify-between">
              <p className="font-bold text-ink-900">
                {locale === "vi" ? "Đặt lịch cho khách" : "Book for a customer"}
              </p>
              <button
                onClick={() => {
                  setNewBooking(null);
                  setCustomerMatches([]);
                }}
                className="text-ink-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="label">{locale === "vi" ? "Ngày & giờ" : "Date & time"}</label>
                <input
                  type="datetime-local"
                  className="input"
                  value={format(toZonedTime(newBooking.startsAt, businessTimezone), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    setNewBooking({
                      ...newBooking,
                      startsAt: fromZonedTime(e.target.value, businessTimezone),
                    });
                  }}
                />
              </div>
              <div>
                <label className="label">{locale === "vi" ? "Dịch vụ" : "Service"}</label>
                <select
                  className="input"
                  value={newBooking.serviceId}
                  onChange={(e) => setNewBooking({ ...newBooking, serviceId: e.target.value })}
                >
                  {services.map((sv) => (
                    <option key={sv.id} value={sv.id}>
                      {sv.name} — {formatMoney(sv.priceCents, sv.currency, locale)}
                    </option>
                  ))}
                </select>
              </div>
              {staff.length > 0 && (
                <div>
                  <label className="label">{locale === "vi" ? "Nhân viên" : "Staff"}</label>
                  <select
                    className="input"
                    value={newBooking.staffId}
                    onChange={(e) => setNewBooking({ ...newBooking, staffId: e.target.value })}
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="relative">
                <label className="label">{locale === "vi" ? "Tên khách hàng" : "Customer name"}</label>
                <input
                  required
                  className="input"
                  value={newBooking.customerName}
                  onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                  autoComplete="off"
                />
                {customerMatches.length > 0 && (
                  <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-ink-100 bg-white shadow-popover">
                    {customerMatches.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => pickCustomerMatch(c)}
                          className="flex w-full flex-col px-3 py-2 text-left text-sm hover:bg-mist-50"
                        >
                          <span className="font-medium text-ink-900">{c.name}</span>
                          {c.phone && <span className="text-xs text-ink-400">{c.phone}</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative">
                <label className="label">{locale === "vi" ? "Số điện thoại" : "Phone number"}</label>
                <input
                  required
                  className="input"
                  value={newBooking.customerPhone}
                  onChange={(e) => setNewBooking({ ...newBooking, customerPhone: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="label">
                  Email ({locale === "vi" ? "không bắt buộc" : "optional"})
                </label>
                <input
                  type="email"
                  className="input"
                  value={newBooking.customerEmail}
                  onChange={(e) => setNewBooking({ ...newBooking, customerEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="label">
                  {locale === "vi" ? "Ghi chú" : "Note"} ({locale === "vi" ? "không bắt buộc" : "optional"})
                </label>
                <textarea
                  rows={2}
                  className="input"
                  value={newBooking.customerNote}
                  onChange={(e) => setNewBooking({ ...newBooking, customerNote: e.target.value })}
                />
              </div>
            </div>
            {newBookingError && <p className="mt-2 text-sm text-berry-500">{newBookingError}</p>}
            <div className="mt-4 flex gap-2">
              <button
                disabled={
                  creatingBooking || !newBooking.customerName.trim() || !newBooking.customerPhone.trim()
                }
                onClick={submitNewBooking}
                className="btn-primary"
              >
                {creatingBooking && <Loader2 className="h-4 w-4 animate-spin" />}
                {locale === "vi" ? "Đặt lịch" : "Book"}
              </button>
              <button
                onClick={() => {
                  setNewBooking(null);
                  setCustomerMatches([]);
                }}
                className="btn-ghost"
              >
                {locale === "vi" ? "Huỷ" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {pendingReschedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6">
            <p className="mb-3 text-lg font-bold text-ink-900">
              {locale === "vi" ? "Chuyển lịch hẹn?" : "Move this booking?"}
            </p>
            <p className="mb-3 text-sm text-ink-700">
              {pendingReschedule.booking.customerName}, {pendingReschedule.booking.serviceName}
            </p>
            <p className="mb-4 text-sm text-ink-700">
              {locale === "vi" ? "Thời gian mới là " : "The new time is "}
              <span className="font-semibold text-ink-900">
                {pendingReschedule.newStartsAt.toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: businessTimezone,
                })}
              </span>
            </p>
            <div className="flex gap-2">
              <button
                disabled={reschedulingBusy}
                onClick={confirmPendingReschedule}
                className="btn-primary"
              >
                {reschedulingBusy && <Loader2 className="h-4 w-4 animate-spin" />}
                {locale === "vi" ? "Có, chuyển" : "Yes, move it"}
              </button>
              <button
                disabled={reschedulingBusy}
                onClick={() => setPendingReschedule(null)}
                className="btn-ghost"
              >
                {locale === "vi" ? "Huỷ bỏ" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
