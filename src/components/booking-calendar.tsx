"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getPathname, useRouter } from "@/i18n/navigation";
import {
  addDays,
  addMinutes,
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
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Loader2, Pencil, X } from "lucide-react";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";
import { activeStaffPeriod, groupStaffHours, type StaffHourRow } from "@/lib/staff-hours";

interface StaffOption {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ServiceSlotView {
  key: string;
  kind: "primary" | "extra";
  name: string;
  priceCents: number;
  startsAt: string;
  endsAt: string;
  staffId: string | null;
  staffName: string | null;
}

interface CalendarBooking {
  id: string;
  source: "WEBSITE" | "MANUAL";
  slots: ServiceSlotView[];
  startsAt: string;
  endsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  staffId: string | null;
  serviceId: string;
  staffName: string | null;
  customerId: string;
  customerNote: string | null;
  serviceName: string;
  customerName: string;
  customerPhone: string | null;
  customerEmail: string | null;
  addOnNames: string[];
  addOns: { name: string; priceCents: number }[];
  addOnIds: string[];
}

/** One service of a booking as its own calendar block — the booking's own
 * fields plus that service's time, staff, name and price. */
type CalendarBlock = CalendarBooking & {
  slotKey: string;
  priceCents: number;
};

interface EditBookingDraft {
  bookingId: string;
  startsAt: Date;
  endsAt: Date;
  staffId: string;
  serviceId: string;
  addOnIds: string[];
  priceAmount: string; // whole-currency-unit string, e.g. "180" for 180 EUR
  currency: string;
  customerNote: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

// "Đến quầy thanh toán" — the dashboard's pay-at-the-counter checkout. Line
// prices start from the booking's own service/add-on prices but the salon
// can adjust each before confirming, same as Timma's "Hinta/kpl" field.
interface CheckoutLineDraft {
  name: string;
  qty: number;
  unitPriceAmount: string; // whole-currency-unit string, same convention as EditBookingDraft.priceAmount
}

interface CheckoutDraft {
  bookingId: string;
  currency: string;
  lines: CheckoutLineDraft[];
  paymentMethod: "CASH" | "BANK_TRANSFER" | "GIFT_CARD";
  giftCardCode: string;
  note: string;
}

interface CheckoutResult {
  number: string;
  totalCents: number;
  currency: string;
  publicUrl: string;
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
    businessId: string;
    branchName: string;
    startsAt: string;
    status: string;
    staffName: string | null;
    cancelReason: string | null;
    serviceName: string;
    priceCents: number;
    currency: string;
    customerNote: string | null;
    loyaltyScans: string[];
    rewardApplied: boolean;
  }[];
  loyalty: { pointsRequired: number; discountPercent: number } | null;
}

const HOUR_HEIGHT = 40; // px per hour in the day/week grid — short enough to need less scrolling
const DEFAULT_START_HOUR = 7;
const DEFAULT_END_HOUR = 23;
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

const HOURS_DIALOG: Record<
  string,
  {
    dragStart: string;
    dragEnd: string;
    confirmStart: string;
    confirmEnd: string;
    newTimeIs: string;
    confirm: string;
    cancel: string;
  }
> = {
  vi: {
    dragStart: "Kéo để đổi giờ bắt đầu",
    dragEnd: "Kéo để đổi giờ kết thúc",
    confirmStart: "Đổi giờ bắt đầu làm việc?",
    confirmEnd: "Đổi giờ kết thúc làm việc?",
    newTimeIs: "Giờ mới là",
    confirm: "Được rồi",
    cancel: "Huỷ bỏ",
  },
  en: {
    dragStart: "Drag to change start time",
    dragEnd: "Drag to change end time",
    confirmStart: "Change the start time?",
    confirmEnd: "Change the end time?",
    newTimeIs: "The new time is",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  fi: {
    dragStart: "Vedä muuttaaksesi alkamisaikaa",
    dragEnd: "Vedä muuttaaksesi päättymisaikaa",
    confirmStart: "Haluatko varmasti siirtää työvuoron alkamisaikaa?",
    confirmEnd: "Haluatko varmasti siirtää työvuoron päättymisaikaa?",
    newTimeIs: "Uusi aika on",
    confirm: "OK",
    cancel: "Peruuta",
  },
  pl: {
    dragStart: "Przeciągnij, aby zmienić godzinę rozpoczęcia",
    dragEnd: "Przeciągnij, aby zmienić godzinę zakończenia",
    confirmStart: "Zmienić godzinę rozpoczęcia pracy?",
    confirmEnd: "Zmienić godzinę zakończenia pracy?",
    newTimeIs: "Nowa godzina to",
    confirm: "OK",
    cancel: "Anuluj",
  },
  de: {
    dragStart: "Ziehen, um die Startzeit zu ändern",
    dragEnd: "Ziehen, um die Endzeit zu ändern",
    confirmStart: "Startzeit der Arbeit ändern?",
    confirmEnd: "Endzeit der Arbeit ändern?",
    newTimeIs: "Die neue Zeit ist",
    confirm: "OK",
    cancel: "Abbrechen",
  },
  km: {
    dragStart: "អូសដើម្បីប្តូរម៉ោងចាប់ផ្តើម",
    dragEnd: "អូសដើម្បីប្តូរម៉ោងបញ្ចប់",
    confirmStart: "ប្តូរម៉ោងចាប់ផ្តើមធ្វើការមែនទេ?",
    confirmEnd: "ប្តូរម៉ោងបញ្ចប់ការងារមែនទេ?",
    newTimeIs: "ម៉ោងថ្មីគឺ",
    confirm: "យល់ព្រម",
    cancel: "បោះបង់",
  },
  th: {
    dragStart: "ลากเพื่อเปลี่ยนเวลาเริ่มงาน",
    dragEnd: "ลากเพื่อเปลี่ยนเวลาเลิกงาน",
    confirmStart: "ต้องการเปลี่ยนเวลาเริ่มงานหรือไม่?",
    confirmEnd: "ต้องการเปลี่ยนเวลาเลิกงานหรือไม่?",
    newTimeIs: "เวลาใหม่คือ",
    confirm: "ตกลง",
    cancel: "ยกเลิก",
  },
};

interface ServiceOption {
  id: string;
  name: string;
  durationMin: number;
  priceCents: number;
  currency: string;
  // Staff members this service is assigned to (see the Services page's
  // per-service "add-ons"/staff picker) — used to only show a staff member
  // the services they're actually set up to perform, instead of every
  // service the salon offers.
  staffIds: string[];
}

function servicesForStaff(services: ServiceOption[], staffId: string): ServiceOption[] {
  if (!staffId) return services;
  return services.filter((s) => s.staffIds.includes(staffId));
}

interface AddOnOption {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
  // Main services this add-on can be tacked onto (see the Services page's
  // "Dịch vụ phụ" picker) — used to only show add-ons that actually apply to
  // whichever main service is currently selected.
  serviceIds: string[];
}

function addOnsForService(addOns: AddOnOption[], serviceId: string): AddOnOption[] {
  return addOns.filter((a) => a.serviceIds.includes(serviceId));
}

interface NewBookingDraft {
  startsAt: Date;
  endsAt: Date;
  staffId: string;
  serviceId: string;
  addOnIds: string[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerNote: string;
  sendNotificationEmails: boolean;
}

interface PendingReschedule {
  booking: CalendarBlock;
  newStartsAt: Date;
  newStaffId: string;
}

interface DayWindow {
  weekday: number;
  openMinute: number;
  closeMinute: number;
}

function blockKey(b: CalendarBlock) {
  return `${b.id}|${b.slotKey}`;
}

/** Splits blocks that overlap in time into side-by-side lanes, so two bookings
 * on the same chair both stay visible instead of covering each other. */
function laneLayout(blocks: CalendarBlock[]) {
  const ms = (iso: string) => new Date(iso).getTime();
  const sorted = [...blocks].sort(
    (a, b) => ms(a.startsAt) - ms(b.startsAt) || ms(b.endsAt) - ms(a.endsAt)
  );
  const result = new Map<string, { lane: number; lanes: number }>();
  let group: CalendarBlock[] = [];
  let groupEnd = -Infinity;

  const flush = () => {
    const laneEnds: number[] = [];
    const placed: [CalendarBlock, number][] = [];
    for (const b of group) {
      let lane = laneEnds.findIndex((end) => end <= ms(b.startsAt));
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(ms(b.endsAt));
      } else {
        laneEnds[lane] = ms(b.endsAt);
      }
      placed.push([b, lane]);
    }
    for (const [b, lane] of placed) {
      result.set(blockKey(b), { lane, lanes: laneEnds.length });
    }
    group = [];
  };

  for (const b of sorted) {
    if (group.length > 0 && ms(b.startsAt) >= groupEnd) flush();
    group.push(b);
    groupEnd = Math.max(groupEnd, ms(b.endsAt));
  }
  flush();
  return result;
}

function formatMinuteOfDay(minute: number) {
  return `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
}

function OwnShiftBanner({ window, locale }: { window: DayWindow | null; locale: string }) {
  const vi = locale === "vi";
  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-medium text-teal-700">
      {window
        ? `${vi ? "Giờ làm việc của bạn hôm nay" : "Your working hours today"}: ${formatMinuteOfDay(window.openMinute)} – ${formatMinuteOfDay(window.closeMinute)}`
        : vi
          ? "Hôm nay bạn không có lịch làm việc."
          : "You're not scheduled to work today."}
    </div>
  );
}

export function BookingCalendar({
  staff,
  services,
  addOns,
  businessTimezone,
  locale,
  isOwner,
  viewerStaffId,
  headerSlot,
  businessId,
}: {
  staff: StaffOption[];
  services: ServiceOption[];
  addOns: AddOnOption[];
  businessTimezone: string;
  locale: string;
  isOwner: boolean;
  viewerStaffId: string | null;
  // When given, the timezone note + current date/range label are portaled
  // into this element instead of rendered inline — lets the parent put them
  // in the same row as the page title and the Calendar/List toggle, which
  // live outside this component, without lifting `view`/`anchorDate` state
  // up (both are used pervasively throughout this file).
  headerSlot?: HTMLElement | null;
  // The branch currently loaded into this page — used to tell whether a
  // customer-history visit belongs here (open its edit form in place) or at
  // another of the owner's branches (switch branches, then land back here).
  businessId: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("business");
  const tDash = useTranslations("dashboard");
  const hd = HOURS_DIALOG[locale] ?? HOURS_DIALOG.en;
  const tStatus = useTranslations("booking.status");
  const tCancelReason = useTranslations("booking.cancelReason");
  const dfLocale = locale === "vi" ? vi : undefined;
  const viewerTimezone = useViewerTimezone();
  const [view, setView] = useState<ViewMode>("day");
  const [anchorDate, setAnchorDate] = useState(() => toZonedTime(new Date(), businessTimezone));
  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<CalendarBooking | null>(null);
  const [showCancelPicker, setShowCancelPicker] = useState(false);
  const [editBooking, setEditBooking] = useState<EditBookingDraft | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jumpingToBookingId, setJumpingToBookingId] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutDraft | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkoutDone, setCheckoutDone] = useState<CheckoutResult | null>(null);
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
  const [staffHoursMap, setStaffHoursMap] = useState<Map<string, StaffHourRow[]>>(new Map());
  const [resizing, setResizing] = useState<{ staffId: string; edge: "open" | "close" } | null>(null);
  const [pendingHoursChange, setPendingHoursChange] = useState<{
    staffId: string;
    edge: "open" | "close";
    newMinute: number;
  } | null>(null);
  const [resizePreview, setResizePreview] = useState<number | null>(null);
  const resizePreviewRef = useRef<number | null>(null);
  const dayColumnRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  // Header and body each have their own horizontal scroller (see the comment
  // above the day/week grid markup for why they're split apart); this keeps
  // the header's columns aligned with the body's as the owner scrolls sideways.
  const headerScrollRef = useRef<HTMLDivElement | null>(null);
  const bodyScrollRef = useRef<HTMLDivElement | null>(null);
  const syncHeaderScroll = () => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
  };
  const [hiddenStaffIds, setHiddenStaffIds] = useState<Set<string>>(new Set());

  function toggleStaffVisible(staffId: string) {
    setHiddenStaffIds((prev) => {
      const next = new Set(prev);
      if (next.has(staffId)) next.delete(staffId);
      else next.add(staffId);
      return next;
    });
  }

  function toggleAllStaffVisible() {
    setHiddenStaffIds((prev) => (prev.size > 0 ? new Set() : new Set(staff.map((s) => s.id))));
  }

  const visibleStaff = useMemo(
    () => staff.filter((s) => !hiddenStaffIds.has(s.id)),
    [staff, hiddenStaffIds]
  );

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

  // A staff member sees working hours on the columns they can view (their own,
  // or everyone's when they may see the whole calendar), read-only.
  const [ownHoursLoaded, setOwnHoursLoaded] = useState(false);
  useEffect(() => {
    if (isOwner || !viewerStaffId) return;
    Promise.all([
      fetch("/api/business/hours")
        .then((r) => (r.ok ? r.json() : { hours: [] }))
        .then((d) => setBusinessHours(d.hours ?? []))
        .catch(() => setBusinessHours([])),
      ...staff.map((s) =>
        fetch(`/api/business/staff/${s.id}/hours`)
          .then((r) => (r.ok ? r.json() : { hours: [] }))
          .then((d) => [s.id, d.hours ?? []] as const)
          .catch(() => [s.id, []] as const)
      ),
    ]).then((results) => {
      const entries = results.slice(1) as (readonly [string, StaffHourRow[]])[];
      setStaffHoursMap(new Map(entries));
      setOwnHoursLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOwner, viewerStaffId, staff.map((s) => s.id).join(",")]);

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

  function reloadBookings() {
    setLoading(true);
    return fetch(`/api/business/bookings/calendar?from=${fromStr}&to=${toStr}`)
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings ?? []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    reloadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromStr, toStr]);

  function minutesFromMidnight(iso: string) {
    const d = toZonedTime(new Date(iso), businessTimezone);
    return d.getHours() * 60 + d.getMinutes();
  }

  // Every service of every booking becomes its own block, placed by its own
  // time and staff — so a multi-service booking can show its services in
  // different columns and be moved one at a time.
  const calendarBlocks = useMemo<CalendarBlock[]>(
    () =>
      bookings.flatMap((b) =>
        (b.slots ?? []).map((sl) => ({
          ...b,
          slotKey: sl.key,
          serviceName: sl.name,
          startsAt: sl.startsAt,
          endsAt: sl.endsAt,
          staffId: sl.staffId,
          staffName: sl.staffName,
        }))
      ),
    [bookings]
  );

  function bookingsOnDay(day: Date) {
    return calendarBlocks.filter((b) => isSameDay(toZonedTime(new Date(b.startsAt), businessTimezone), day));
  }

  // The staff member's working window for the currently displayed day — from
  // their own custom schedule if they have one, else the business's own
  // hours. Only a single continuous window is supported here (most salons
  // run one shift a day), matching what the two drag handles can represent.
  function getStaffWindow(staffId: string, date: Date): DayWindow | null {
    const period = activeStaffPeriod(
      groupStaffHours(staffHoursMap.get(staffId) ?? []),
      format(date, "yyyy-MM-dd")
    );
    const weekday = date.getDay();
    if (period) return period.windows.find((r) => r.weekday === weekday) ?? null;
    return businessHours.find((r) => r.weekday === weekday) ?? null;
  }

  async function reloadStaffHours(staffId: string) {
    const r = await fetch(`/api/business/staff/${staffId}/hours`);
    if (!r.ok) return;
    const d = await r.json();
    setStaffHoursMap((prev) => new Map(prev).set(staffId, d.hours ?? []));
  }

  async function commitStaffHoursResize(staffId: string, edge: "open" | "close", newMinute: number) {
    const todayWeekday = anchorDate.getDay();
    const current = getStaffWindow(staffId, anchorDate) ?? {
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

    // Resizing edits the schedule period that applies to this date. With no
    // period in force, the week is seeded from the salon's own hours as an
    // open-ended period, so the other days don't silently become "closed".
    const period = activeStaffPeriod(
      groupStaffHours(staffHoursMap.get(staffId) ?? []),
      format(anchorDate, "yyyy-MM-dd")
    );
    const baseWindows = period ? period.windows : businessHours;
    const newWindows = [...baseWindows.filter((r) => r.weekday !== todayWeekday), updated];
    const from = period?.validFrom ?? null;
    const until = period?.validUntil ?? null;

    await fetch(`/api/business/staff/${staffId}/hours`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        until,
        oldFrom: from,
        oldUntil: until,
        hours: newWindows.map(({ weekday, openMinute, closeMinute }) => ({ weekday, openMinute, closeMinute })),
      }),
    });
    await reloadStaffHours(staffId);
  }

  async function confirmPendingHoursChange() {
    if (!pendingHoursChange) return;
    await commitStaffHoursResize(
      pendingHoursChange.staffId,
      pendingHoursChange.edge,
      pendingHoursChange.newMinute
    );
    setPendingHoursChange(null);
    setResizePreview(null);
  }

  function cancelPendingHoursChange() {
    setPendingHoursChange(null);
    setResizePreview(null);
  }

  // Pointer events (not mouse events) so the same drag works with a finger on
  // a phone or tablet as well as with a mouse.
  function startResize(staffId: string, edge: "open" | "close", e: React.PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    setResizing({ staffId, edge });
  }

  useEffect(() => {
    if (!resizing) return;
    function onMove(e: PointerEvent) {
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
      const { staffId, edge } = resizing!;
      const minute = resizePreviewRef.current;
      resizePreviewRef.current = null;

      // Don't commit yet — show the same "are you sure" confirmation Timma
      // shows before actually moving a shift boundary. `resizePreview` is
      // deliberately left set (not cleared here) so the bar stays drawn at
      // the dropped position while the dialog is open; it's the rendering
      // below that decides whether to trust it, based on pendingHoursChange.
      if (minute !== null) {
        const todayWeekday = anchorDate.getDay();
        const current = getStaffWindow(staffId, anchorDate) ?? {
          weekday: todayWeekday,
          openMinute: DEFAULT_START_HOUR * 60,
          closeMinute: DEFAULT_END_HOUR * 60,
        };
        const openMinute = edge === "open" ? minute : current.openMinute;
        const closeMinute = edge === "close" ? minute : current.closeMinute;
        if (openMinute < closeMinute) {
          setPendingHoursChange({ staffId, edge, newMinute: minute });
          setResizing(null);
          return;
        }
      }
      setResizePreview(null);
      setResizing(null);
    }
    function onCancel() {
      resizePreviewRef.current = null;
      setResizePreview(null);
      setResizing(null);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizing]);

  function navigate(dir: -1 | 1) {
    setAnchorDate((d) =>
      view === "day" ? addDays(d, dir) : view === "week" ? addWeeks(d, dir) : addMonths(d, dir)
    );
  }

  async function updateStatus(id: string, status: string, cancelReason?: string) {
    setUpdating(true);
    await fetch(`/api/business/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, cancelReason }),
    });
    // A cancelled or no-show booking should disappear immediately — the
    // calendar API excludes both, so drop it from local state the same way
    // rather than leaving a stale block on the grid.
    setBookings((prev) =>
      status === "CANCELLED" || status === "NO_SHOW"
        ? prev.filter((b) => b.id !== id)
        : prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    setUpdating(false);
    setActiveBooking(null);
    setShowCancelPicker(false);
  }

  function startEditBooking(booking: CalendarBooking) {
    setEditError(null);
    setEditBooking({
      bookingId: booking.id,
      startsAt: new Date(booking.startsAt),
      endsAt: new Date(booking.endsAt),
      staffId: booking.staffId ?? staff[0]?.id ?? "",
      serviceId: booking.serviceId,
      addOnIds: booking.addOnIds,
      priceAmount: String(fromSmallestUnit(booking.priceCents, booking.currency)),
      currency: booking.currency,
      customerNote: booking.customerNote ?? "",
      customerName: booking.customerName,
      customerPhone: booking.customerPhone ?? "",
      customerEmail: booking.customerEmail ?? "",
    });
  }

  // Opens a booking straight into its own edit form from a customer's visit
  // history — same branch jumps there in place; a visit at another of the
  // owner's branches switches the active branch first, then lands back on
  // this page with `?edit=` so the effect below picks it back up.
  async function openBookingFromHistory(bookingId: string, bookingBusinessId: string) {
    setJumpingToBookingId(bookingId);
    try {
      if (bookingBusinessId !== businessId) {
        await fetch("/api/business/switch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessId: bookingBusinessId }),
        });
        window.location.href = `${getPathname({ href: "/business/dashboard/bookings", locale })}?edit=${bookingId}`;
        return;
      }
      const res = await fetch(`/api/business/bookings/${bookingId}`);
      if (!res.ok) return;
      const data: CalendarBooking = await res.json();
      setActiveBooking(null);
      setCustomerDetail(null);
      if (data.status === "CANCELLED") {
        setActiveBooking(data);
      } else {
        startEditBooking(data);
      }
    } finally {
      setJumpingToBookingId(null);
    }
  }

  // Lands here after `openBookingFromHistory` switched branches — picks the
  // booking back up on this (now active) branch and opens it the same way,
  // then drops the query param so a refresh doesn't reopen it.
  useEffect(() => {
    const editId = searchParams.get("edit");
    if (!editId) return;
    (async () => {
      const res = await fetch(`/api/business/bookings/${editId}`);
      if (res.ok) {
        const data: CalendarBooking = await res.json();
        if (data.status === "CANCELLED") {
          setActiveBooking(data);
        } else {
          startEditBooking(data);
        }
      }
      router.replace("/business/dashboard/bookings");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCheckout(booking: CalendarBooking) {
    setCheckoutError(null);
    setCheckoutDone(null);
    setCheckout({
      bookingId: booking.id,
      currency: booking.currency,
      lines: [
        ...booking.slots.map((sl) => ({
          name: sl.name,
          qty: 1,
          unitPriceAmount: String(fromSmallestUnit(sl.priceCents, booking.currency)),
        })),
        ...booking.addOns.map((a) => ({
          name: a.name,
          qty: 1,
          unitPriceAmount: String(fromSmallestUnit(a.priceCents, booking.currency)),
        })),
      ],
      paymentMethod: "CASH",
      giftCardCode: "",
      note: "",
    });
  }

  async function submitCheckout() {
    if (!checkout) return;
    setCheckingOut(true);
    setCheckoutError(null);
    const res = await fetch("/api/business/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: checkout.bookingId,
        lines: checkout.lines.map((l) => ({
          name: l.name,
          qty: l.qty,
          unitPriceCents: toSmallestUnit(Number(l.unitPriceAmount) || 0, checkout.currency),
        })),
        paymentMethod: checkout.paymentMethod,
        giftCardCode: checkout.paymentMethod === "GIFT_CARD" ? checkout.giftCardCode.trim() : undefined,
        note: checkout.note.trim() || undefined,
      }),
    });
    const data = await res.json();
    setCheckingOut(false);
    if (!res.ok) {
      setCheckoutError(
        data.error === "NEEDS_INVOICE_SETTINGS"
          ? locale === "vi"
            ? "Cần điền thông tin xuất hóa đơn ở trang Cài đặt trước."
            : "Fill in the invoice details on the Settings page first."
          : data.error === "GIFT_CARD_CODE_REQUIRED"
            ? locale === "vi"
              ? "Nhập mã thẻ quà tặng."
              : "Enter the gift card code."
            : typeof data.error === "string" && data.error.startsWith("GIFT_CARD_")
              ? locale === "vi"
                ? "Thẻ quà tặng không hợp lệ hoặc đã dùng hết."
                : "That gift card isn't valid or has no uses left."
              : locale === "vi"
                ? "Có lỗi xảy ra, vui lòng thử lại."
                : "Something went wrong — please try again."
      );
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === checkout.bookingId ? { ...b, status: "COMPLETED" } : b)));
    setActiveBooking(null);
    setCheckoutDone(data);
  }

  // Ticking/unticking an add-on nudges both the price and end time by
  // exactly that add-on's own amount — a delta on top of whatever's already
  // there, rather than recomputing from scratch, so it doesn't clobber a
  // price the salon already hand-adjusted for some other reason.
  function toggleEditBookingAddOn(addOn: AddOnOption) {
    if (!editBooking) return;
    const adding = !editBooking.addOnIds.includes(addOn.id);
    const nextIds = adding
      ? [...editBooking.addOnIds, addOn.id]
      : editBooking.addOnIds.filter((id) => id !== addOn.id);
    const deltaMin = adding ? addOn.durationMin : -addOn.durationMin;
    const deltaAmount = fromSmallestUnit(adding ? addOn.priceCents : -addOn.priceCents, editBooking.currency);
    setEditBooking({
      ...editBooking,
      addOnIds: nextIds,
      endsAt: addMinutes(editBooking.endsAt, deltaMin),
      priceAmount: String((Number(editBooking.priceAmount) || 0) + deltaAmount),
    });
  }

  function toggleNewBookingAddOn(addOn: AddOnOption) {
    if (!newBooking) return;
    const adding = !newBooking.addOnIds.includes(addOn.id);
    const nextIds = adding
      ? [...newBooking.addOnIds, addOn.id]
      : newBooking.addOnIds.filter((id) => id !== addOn.id);
    const deltaMin = adding ? addOn.durationMin : -addOn.durationMin;
    setNewBooking({
      ...newBooking,
      addOnIds: nextIds,
      endsAt: addMinutes(newBooking.endsAt, deltaMin),
    });
  }

  async function submitEditBooking() {
    if (!editBooking) return;
    setSavingEdit(true);
    setEditError(null);
    const res = await fetch(`/api/business/bookings/${editBooking.bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: editBooking.serviceId,
        staffId: editBooking.staffId || undefined,
        startsAt: editBooking.startsAt.toISOString(),
        endsAt: editBooking.endsAt.toISOString(),
        addOnIds: editBooking.addOnIds,
        priceCents: toSmallestUnit(Number(editBooking.priceAmount) || 0, editBooking.currency),
        customerNote: editBooking.customerNote,
        customerName: editBooking.customerName,
        customerPhone: editBooking.customerPhone.trim() || undefined,
        customerEmail: editBooking.customerEmail || undefined,
      }),
    });
    setSavingEdit(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setEditError(
        data.error === "SLOT_UNAVAILABLE"
          ? locale === "vi"
            ? "Khung giờ này đã có lịch hẹn khác."
            : "That time is already booked."
          : data.error === "EMAIL_IN_USE"
            ? locale === "vi"
              ? "Email này đã được dùng cho một tài khoản khác."
              : "That email is already used by another account."
            : locale === "vi"
              ? "Có lỗi xảy ra, vui lòng thử lại."
              : "Something went wrong, please try again."
      );
      return;
    }
    setEditBooking(null);
    setActiveBooking(null);
    reloadBookings();
  }

  async function rescheduleBooking(block: CalendarBlock, newStartsAt: Date, newStaffId: string) {
    setReschedulingBusy(true);
    const res = await fetch(`/api/business/bookings/${block.id}/services/${block.slotKey}`, {
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
    await reloadBookings();
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    day: Date,
    columnStaffId: string | undefined,
    gridTopHour: number
  ) {
    e.preventDefault();
    const dragKey = draggingId.current;
    draggingId.current = null;
    const booking = calendarBlocks.find((b) => `${b.id}|${b.slotKey}` === dragKey);
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

    const eligibleServices = servicesForStaff(services, resolvedStaffId);
    const defaultService = eligibleServices[0] ?? services[0];

    setNewBookingError(null);
    setCustomerMatches([]);
    setNewBooking({
      startsAt,
      endsAt: addMinutes(startsAt, defaultService.durationMin),
      staffId: resolvedStaffId,
      serviceId: defaultService.id,
      addOnIds: [],
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerNote: "",
      sendNotificationEmails: false,
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
        endsAt: newBooking.endsAt.toISOString(),
        addOnIds: newBooking.addOnIds,
        customerName: newBooking.customerName,
        customerPhone: newBooking.customerPhone,
        customerEmail: newBooking.customerEmail || undefined,
        customerNote: newBooking.customerNote || undefined,
        sendNotificationEmails: newBooking.sendNotificationEmails,
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
    reloadBookings();
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

  function renderBookingBlock(b: CalendarBlock, compact = false, lane?: { lane: number; lanes: number }) {
    const top = ((minutesFromMidnight(b.startsAt) - startHour * 60) / 60) * HOUR_HEIGHT;
    const height = Math.max(
      ((minutesFromMidnight(b.endsAt) - minutesFromMidnight(b.startsAt)) / 60) * HOUR_HEIGHT,
      20
    );
    const timeLabel = `${format(toZonedTime(new Date(b.startsAt), businessTimezone), "HH:mm")}–${format(
      toZonedTime(new Date(b.endsAt), businessTimezone),
      "HH:mm"
    )}`;
    return (
      <button
        key={b.id}
        draggable={["PENDING_PAYMENT", "CONFIRMED"].includes(b.status)}
        onDragStart={() => (draggingId.current = `${b.id}|${b.slotKey}`)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveBooking(b);
          setCustomerDetail(null);
          setShowCancelPicker(false);
        }}
        className={`absolute z-20 overflow-hidden rounded-lg border-l-4 px-2 py-1 text-left text-xs shadow-sm transition-opacity hover:opacity-90 ${
          lane ? "" : "left-0.5 right-0.5"
        } ${
          b.source === "MANUAL"
            ? "bg-violet-50 border-violet-500 text-violet-700"
            : STATUS_BG[b.status] ?? "bg-mist-100 border-ink-400 text-ink-700"
        }`}
        style={
          lane
            ? {
                top,
                height,
                left: `calc(${(lane.lane / lane.lanes) * 100}% + 2px)`,
                width: `calc(${100 / lane.lanes}% - 4px)`,
              }
            : { top, height }
        }
      >
        <p className="truncate leading-tight opacity-80">{timeLabel}</p>
        <p className="truncate font-semibold leading-tight">{b.customerName}</p>
        {!compact && (
          <p className="truncate leading-tight">
            {b.slotKey !== "primary" ? "+ " : ""}
            {b.serviceName}
          </p>
        )}
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

  const headerContent = (
    <>
      {showLocalTime && (
        <span
          className="text-xs text-ink-400 md:min-w-0 md:truncate"
          title={
            locale === "vi"
              ? `Lịch hiển thị theo giờ salon (${businessTimezone})`
              : `Calendar shown in the salon's time (${businessTimezone})`
          }
        >
          {locale === "vi"
            ? `Lịch hiển thị theo giờ salon (${businessTimezone}) · giờ của bạn hiện tại: `
            : `Calendar shown in the salon's time (${businessTimezone}) · your local time now: `}
          {new Date().toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: viewerTimezone ?? undefined,
          })}
        </span>
      )}
      <span className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-ink-900 md:shrink-0">
        {view === "day" && format(anchorDate, "EEEE, d MMMM yyyy", { locale: dfLocale })}
        {view === "week" &&
          `${format(rangeStart, "d MMM", { locale: dfLocale })} – ${format(rangeEnd, "d MMM yyyy", { locale: dfLocale })}`}
        {view === "month" && format(anchorDate, "MMMM yyyy", { locale: dfLocale })}
        {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
      </span>
    </>
  );

  return (
    <div className="space-y-4">
      {headerSlot ? (
        createPortal(headerContent, headerSlot)
      ) : (
        <div className="flex flex-col gap-2">{headerContent}</div>
      )}

      {error && (
        <p className="rounded-lg bg-berry-50 px-3 py-2 text-sm text-berry-500">{error}</p>
      )}

      {view === "day" && !isOwner && viewerStaffId && ownHoursLoaded && (
        <OwnShiftBanner
          window={getStaffWindow(viewerStaffId, anchorDate)}
          locale={locale}
        />
      )}

      {view === "day" && staff.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={toggleAllStaffVisible}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 transition-colors hover:bg-mist-50"
          >
            {hiddenStaffIds.size > 0 ? t("showAllStaff") : t("hideAllStaff")}
          </button>
          {staff.map((s) => {
            const checked = !hiddenStaffIds.has(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleStaffVisible(s.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                  checked
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-100 bg-white text-ink-400"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    checked ? "border-white/70 bg-white/20" : "border-ink-200"
                  }`}
                >
                  {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                {s.name}
              </button>
            );
          })}
        </div>
      )}

      {view === "day" && staff.length > 0 && visibleStaff.length === 0 && (
        <div className="rounded-2xl border border-dashed border-ink-200 bg-mist-50 px-4 py-10 text-center text-sm text-ink-400">
          {t("selectStaffToView")}
        </div>
      )}

      {view === "day" && (staff.length === 0 || visibleStaff.length > 0) && (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-100">
          {/* Header row and body row each have their own [frozen cell, scrolling
              content] pair instead of relying on position:sticky. Sticky broke
              two different ways here: (1) sticky-left on a grid item's inline
              axis silently stops tracking scroll past ~300px in some browsers,
              and (2) once the hour column was pulled out into its own
              horizontally-non-scrolling flex sibling, any position:sticky
              nested inside the horizontally-scrolling div started resolving
              its containing block against THAT div (because overflow-x:auto
              alone makes an element "a scroll container" for sticky purposes,
              for both axes) instead of the real vertical scroller, breaking
              vertical stickiness too. Splitting header and body into separate
              rows — the header simply isn't part of any vertically-scrolling
              region, so it never needs to stick — sidesteps both bugs. The
              two rows' horizontal scroll positions are kept in sync manually. */}
          <div className="flex">
            <div className="h-20 w-7 shrink-0 border-b border-r border-ink-100 bg-mist-50" />
            <div ref={headerScrollRef} className="min-w-0 flex-1 overflow-hidden">
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(visibleStaff.length, 1)}, minmax(64px, 1fr))`,
                }}
              >
                {staff.length === 0 ? (
                  <div className="flex h-20 items-center border-b border-ink-100 bg-mist-50 px-3 text-xs font-semibold text-ink-700">
                    {t("unassigned")}
                  </div>
                ) : (
                  visibleStaff.map((s) => (
                    <div
                      key={s.id}
                      title={s.name}
                      className="flex h-20 min-w-0 flex-col items-center justify-center gap-1 overflow-hidden border-b border-l border-ink-100 bg-mist-50 px-1 py-2 text-xs font-semibold text-ink-700"
                    >
                      {s.avatarUrl ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <Image src={s.avatarUrl} alt="" fill className="object-cover" />
                        </div>
                      ) : (
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                            staffColor.get(s.id) ?? "bg-ink-400"
                          }`}
                        >
                          {s.name.trim().charAt(0).toUpperCase() || "?"}
                        </span>
                      )}
                      <span className="w-full truncate text-center">{s.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex max-h-[70vh] items-start overflow-y-auto">
            {/* items-start (instead of the flex row's default align-items:
                stretch) keeps both children at their true content height.
                Under stretch, the flex line's cross-size gets clamped to the
                container's own max-h-[70vh], and BOTH the frozen hour column
                and the scrollable body get squashed down to that clamped
                height — silently clipping away everything below it (visible
                as a blank white area past a certain scroll depth, worse the
                later a staff member's working hours end and the more
                non-working-hours overlay there is below the visible fold). */}
            <div className="flex shrink-0 flex-col bg-white" style={{ width: 28 }}>
              <div className="relative border-r border-ink-100" style={{ height: totalHours * HOUR_HEIGHT }}>
                {hourMarks.map((h) => (
                  <div
                    key={h}
                    className="absolute -translate-y-1/2 pr-1.5 text-right text-xs text-ink-400"
                    style={{ top: (h - startHour) * HOUR_HEIGHT, right: 0 }}
                  >
                    {h}
                  </div>
                ))}
                {nowInRange && isSameDay(anchorDate, now) && <NowLine />}
              </div>
            </div>

            <div ref={bodyScrollRef} onScroll={syncHeaderScroll} className="min-w-0 flex-1 overflow-x-auto">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${Math.max(visibleStaff.length, 1)}, minmax(64px, 1fr))`,
            }}
          >
            {(staff.length === 0 ? [{ id: "", name: "" }] : visibleStaff).map((s) => {
              const staffWindow = s.id ? getStaffWindow(s.id, anchorDate) : null;
              // While a drag is in flight OR its confirmation dialog is still
              // open, trust resizePreview over the saved window so the bar
              // stays drawn wherever it was dropped until the owner decides.
              const activeEdit =
                resizing?.staffId === s.id
                  ? resizing
                  : pendingHoursChange?.staffId === s.id
                    ? pendingHoursChange
                    : null;
              const openMinute =
                activeEdit?.edge === "open" && resizePreview !== null
                  ? resizePreview
                  : staffWindow?.openMinute;
              const closeMinute =
                activeEdit?.edge === "close" && resizePreview !== null
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
                      className="absolute w-full border-t border-ink-400/40"
                      style={{ top: (h - startHour) * HOUR_HEIGHT }}
                    />
                  ))}
                  {hourMarks.map((h) => (
                    <div
                      key={`${h}-half`}
                      className="absolute w-full border-t border-dashed border-ink-100"
                      style={{ top: (h - startHour + 0.5) * HOUR_HEIGHT }}
                    />
                  ))}
                  {!isOwner && viewerStaffId && s.id && ownHoursLoaded && (
                    <>
                      {openPx !== null && closePx !== null ? (
                        <>
                          <div
                            className="pointer-events-none absolute left-0 right-0 top-0 z-10 bg-blue-100/60"
                            style={{ height: Math.max(0, openPx) }}
                          />
                          <div
                            className="pointer-events-none absolute left-0 right-0 z-10 bg-blue-100/60"
                            style={{ top: Math.max(0, closePx), bottom: 0 }}
                          />
                          <div
                            className="pointer-events-none absolute left-0 right-0 z-20 border-t-2 border-ink-900"
                            style={{ top: Math.max(0, openPx) }}
                          />
                          <div
                            className="pointer-events-none absolute left-0 right-0 z-20 border-t-2 border-ink-900"
                            style={{ top: Math.max(0, closePx) }}
                          />
                        </>
                      ) : (
                        <div className="pointer-events-none absolute inset-0 z-10 bg-blue-100/60" />
                      )}
                    </>
                  )}
                  {isOwner && s.id && (
                    <>
                      {openPx !== null && (
                        <div
                          className="pointer-events-none absolute left-0 right-0 top-0 z-10 bg-blue-100/60"
                          style={{ height: Math.max(0, openPx) }}
                        />
                      )}
                      {closePx !== null && (
                        <div
                          className="pointer-events-none absolute left-0 right-0 z-10 bg-blue-100/60"
                          style={{ top: Math.max(0, closePx), bottom: 0 }}
                        />
                      )}
                      {openPx === null && closePx === null && (
                        <div className="pointer-events-none absolute inset-0 z-10 bg-blue-100/60" />
                      )}
                      {/* Each handle is a tall, invisible touch target around a thin
                          visible bar — a 6px line is far too small to grab with a
                          finger. touch-none stops the page scrolling mid-drag. */}
                      {openPx !== null && (
                        <div
                          onPointerDown={(e) => startResize(s.id, "open", e)}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-0 right-0 z-20 flex h-8 cursor-row-resize touch-none items-center"
                          style={{ top: openPx - 16 }}
                          title={hd.dragStart}
                        >
                          <span
                            className={`pointer-events-none block h-1.5 w-full rounded-full bg-ink-900 ${
                              activeEdit?.edge === "open" ? "opacity-100" : "opacity-70"
                            }`}
                          />
                        </div>
                      )}
                      {closePx !== null && (
                        <div
                          onPointerDown={(e) => startResize(s.id, "close", e)}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-0 right-0 z-20 flex h-8 cursor-row-resize touch-none items-center"
                          style={{ top: closePx - 16 }}
                          title={hd.dragEnd}
                        >
                          <span
                            className={`pointer-events-none block h-1.5 w-full rounded-full bg-ink-900 ${
                              activeEdit?.edge === "close" ? "opacity-100" : "opacity-70"
                            }`}
                          />
                        </div>
                      )}
                    </>
                  )}
                  {(() => {
                    const columnBlocks = bookingsOnDay(anchorDate).filter(
                      (b) => (staff.length === 0 ? true : b.staffId === s.id)
                    );
                    const lanes = laneLayout(columnBlocks);
                    return columnBlocks.map((b) => renderBookingBlock(b, false, lanes.get(blockKey(b))));
                  })()}
                  {nowInRange && isSameDay(anchorDate, now) && <NowLine />}
                </div>
              );
            })}
          </div>
            </div>
          </div>
        </div>
      )}

      {view === "week" && (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-ink-100">
          {/* See the matching comment in the day view for why header/body are
              split into separate rows instead of using position:sticky. */}
          <div className="flex">
            <div className="h-12 w-7 shrink-0 border-b border-r border-ink-100 bg-mist-50" />
            <div ref={headerScrollRef} className="min-w-0 flex-1 overflow-hidden">
              <div className="grid" style={{ gridTemplateColumns: `repeat(7, minmax(120px, 1fr))` }}>
                {Array.from({ length: 7 }, (_, i) => addDays(rangeStart, i)).map((day) => (
                  <div
                    key={day.toISOString()}
                    className={`flex h-12 items-center justify-center border-b border-l border-ink-100 px-2 text-center text-xs font-semibold ${
                      isSameDay(day, toZonedTime(new Date(), businessTimezone))
                        ? "bg-peach-100 text-ink-900"
                        : "bg-mist-50 text-ink-700"
                    }`}
                  >
                    {format(day, "EEE d", { locale: dfLocale })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex max-h-[70vh] items-start overflow-y-auto">
            {/* See the matching comment in the day view for why items-start
                is required here (without it, content below a certain scroll
                depth silently disappears). */}
            <div className="flex shrink-0 flex-col bg-white" style={{ width: 28 }}>
              <div className="relative border-r border-ink-100" style={{ height: totalHours * HOUR_HEIGHT }}>
                {hourMarks.map((h) => (
                  <div
                    key={h}
                    className="absolute -translate-y-1/2 pr-1.5 text-right text-xs text-ink-400"
                    style={{ top: (h - startHour) * HOUR_HEIGHT, right: 0 }}
                  >
                    {h}
                  </div>
                ))}
                {nowInRange && isWithinInterval(now, { start: rangeStart, end: rangeEnd }) && (
                  <NowLine />
                )}
              </div>
            </div>

            <div ref={bodyScrollRef} onScroll={syncHeaderScroll} className="min-w-0 flex-1 overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns: `repeat(7, minmax(120px, 1fr))` }}>
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
                    className="absolute w-full border-t border-ink-400/40"
                    style={{ top: (h - startHour) * HOUR_HEIGHT }}
                  />
                ))}
                {hourMarks.map((h) => (
                  <div
                    key={`${h}-half`}
                    className="absolute w-full border-t border-dashed border-ink-100"
                    style={{ top: (h - startHour + 0.5) * HOUR_HEIGHT }}
                  />
                ))}
                {bookingsOnDay(day).map((b) => renderBookingBlock(b, true))}
                {nowInRange && isSameDay(day, now) && <NowLine />}
              </div>
            ))}
          </div>
            </div>
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

      <div className="sticky bottom-4 z-30 flex justify-center">
        <div className="flex items-center gap-1 rounded-full border border-ink-100 bg-white p-1 shadow-popover">
          <button onClick={() => navigate(-1)} className="btn-ghost !p-2" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setAnchorDate(toZonedTime(new Date(), businessTimezone))}
            className="btn-outline !border-0 !px-3 !py-1.5 text-xs"
          >
            {t("today")}
          </button>
          <button onClick={() => navigate(1)} className="btn-ghost !p-2" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
          <span className="mx-1 h-5 w-px bg-ink-100" />
          {(["day", "week", "month"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                view === v ? "bg-ink-900 text-white" : "text-ink-700"
              }`}
            >
              {tDash("viewModes." + v)}
            </button>
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
                {activeBooking.customerEmail && (
                  <p className="text-sm text-ink-400">{activeBooking.customerEmail}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {activeBooking.status !== "CANCELLED" && (
                  <button
                    onClick={() => startEditBooking(activeBooking)}
                    className="text-ink-400 hover:text-primary-600"
                    aria-label={locale === "vi" ? "Sửa cuộc hẹn" : "Edit booking"}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveBooking(null);
                    setCustomerDetail(null);
                    setShowCancelPicker(false);
                  }}
                  className="text-ink-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <ul className="space-y-2">
                {activeBooking.slots.map((sl) => (
                  <li key={sl.key} className="rounded-lg border border-ink-100 p-2">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-medium text-ink-900">
                        {sl.kind === "extra" ? "+ " : ""}
                        {sl.name}
                      </p>
                      <p className="shrink-0 text-sm font-semibold text-ink-900">
                        {formatMoney(sl.priceCents, activeBooking.currency, locale)}
                      </p>
                    </div>
                    <p className="text-xs text-ink-400">
                      {formatInTimeZone(sl.startsAt, businessTimezone, "HH:mm")}–
                      {formatInTimeZone(sl.endsAt, businessTimezone, "HH:mm")}
                      {sl.staffName ? ` · ${sl.staffName}` : ""}
                    </p>
                  </li>
                ))}
                {activeBooking.addOns.map((a) => (
                  <li key={`addon-${a.name}`} className="flex items-start justify-between gap-3 rounded-lg border border-ink-100 p-2">
                    <p className="font-medium text-ink-700">+ {a.name}</p>
                    <p className="shrink-0 text-sm font-semibold text-ink-900">
                      {formatMoney(a.priceCents, activeBooking.currency, locale)}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="text-ink-700">
                {new Date(activeBooking.startsAt).toLocaleString(
                  locale === "vi" ? "vi-VN" : "en-US",
                  { dateStyle: "medium", timeStyle: "short", timeZone: businessTimezone }
                )}
              </p>
              <div className="flex items-center justify-between border-t border-ink-100 pt-2">
                <span className="text-sm font-medium text-ink-700">
                  {locale === "vi" ? "Tổng cộng (cần thu)" : "Total to collect"}
                </span>
                <span className="text-lg font-bold text-ink-900">
                  {formatMoney(activeBooking.priceCents, activeBooking.currency, locale)}
                </span>
              </div>
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
                  <ul className="max-h-40 space-y-1.5 overflow-y-auto text-xs text-ink-400">
                    {customerDetail.bookings.map((b) => (
                      <li key={b.id}>
                        <div className="flex justify-between gap-2">
                          <span className="truncate">
                            {new Date(b.startsAt).toLocaleDateString(
                              locale === "vi" ? "vi-VN" : "en-US",
                              { dateStyle: "medium" }
                            )}{" "}
                            — {b.serviceName}
                          </span>
                          <span className="shrink-0">{formatMoney(b.priceCents, b.currency, locale)}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="font-medium text-ink-700">{b.branchName}</span>
                          {b.staffName && <span>{b.staffName}</span>}
                          <span>{tStatus(b.status as never)}</span>
                          {b.cancelReason && (
                            <span>{tCancelReason(b.cancelReason as never)}</span>
                          )}
                          <button
                            type="button"
                            disabled={jumpingToBookingId === b.id}
                            onClick={() => openBookingFromHistory(b.id, b.businessId)}
                            className="font-medium text-primary-600 hover:underline disabled:opacity-50"
                          >
                            {jumpingToBookingId === b.id
                              ? "..."
                              : locale === "vi"
                                ? "Sửa cuộc hẹn này"
                                : "Edit this booking"}
                          </button>
                        </div>
                        {b.loyaltyScans.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {b.loyaltyScans.map((time, i) => (
                              <span key={i} className="rounded-md bg-sage-50 px-1.5 py-0.5 text-xs font-medium text-sage-700">
                                {locale === "vi" ? `+1 điểm · ${time}` : `+1 point · ${time}`}
                              </span>
                            ))}
                          </div>
                        )}
                        {b.rewardApplied && (
                          <p className="mt-1 rounded-md bg-berry-50 px-2 py-1 text-xs font-semibold text-berry-500">
                            {locale === "vi"
                              ? `Đã giảm ${customerDetail.loyalty?.discountPercent ?? 0}% do tích đủ ${customerDetail.loyalty?.pointsRequired ?? 0} điểm`
                              : `${customerDetail.loyalty?.discountPercent ?? 0}% off applied after ${customerDetail.loyalty?.pointsRequired ?? 0} points`}
                          </p>
                        )}
                        {b.customerNote && (
                          <p className="mt-1 whitespace-pre-line rounded-md bg-mist-50 px-2 py-1 text-xs text-ink-700">
                            {b.customerNote}
                          </p>
                        )}
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
                    onClick={() => openCheckout(activeBooking)}
                    className="btn-primary !bg-primary-500 !px-3 !py-1.5 text-xs hover:!bg-primary-600"
                  >
                    {locale === "vi" ? "Đến quầy thanh toán" : "Pay at the counter"}
                  </button>
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
                    onClick={() => setShowCancelPicker(true)}
                    className="btn-outline !border-berry-400 !px-3 !py-1.5 text-xs !text-berry-500"
                  >
                    {locale === "vi" ? "Huỷ" : "Cancel"}
                  </button>
                </>
              )}
            </div>

            {showCancelPicker && (
              <div className="mt-4 space-y-2 rounded-xl border border-ink-100 p-3">
                <p className="text-sm font-medium text-ink-900">
                  {locale === "vi" ? "Lý do hủy?" : "Reason for cancelling?"}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "NO_SHOW")}
                    className="btn-outline !justify-start !px-3 !py-2 text-xs"
                  >
                    {locale === "vi" ? "Khách hàng không đến" : "Customer didn't show up"}
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "CANCELLED", "CANCELLED_BY_CUSTOMER")}
                    className="btn-outline !justify-start !px-3 !py-2 text-xs"
                  >
                    {locale === "vi" ? "Hủy từ phía khách hàng" : "Cancelled by the customer"}
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => updateStatus(activeBooking.id, "CANCELLED", "CANCELLED_BY_SALON")}
                    className="btn-outline !justify-start !px-3 !py-2 text-xs"
                  >
                    {locale === "vi" ? "Hủy từ phía salon" : "Cancelled by the salon"}
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => setShowCancelPicker(false)}
                    className="btn-ghost !px-3 !py-2 text-xs"
                  >
                    {locale === "vi" ? "Đóng" : "Close"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {editBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card flex w-full max-w-sm animate-slide-up flex-col p-6" style={{ maxHeight: "90vh" }}>
            <div className="mb-4 flex items-start justify-between">
              <p className="font-bold text-ink-900">
                {locale === "vi" ? "Sửa cuộc hẹn" : "Edit booking"}
              </p>
              <button onClick={() => setEditBooking(null)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              <div>
                <label className="label">{locale === "vi" ? "Ngày & giờ" : "Date & time"}</label>
                <QuarterHourField
                  value={format(toZonedTime(editBooking.startsAt, businessTimezone), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(v) => {
                    if (!v) return;
                    const newStartsAt = fromZonedTime(v, businessTimezone);
                    // Keep the duration the salon already set for this booking
                    // (default or manually adjusted) — moving the start time
                    // shouldn't silently shrink or stretch it.
                    const durationMs = editBooking.endsAt.getTime() - editBooking.startsAt.getTime();
                    setEditBooking({
                      ...editBooking,
                      startsAt: newStartsAt,
                      endsAt: new Date(newStartsAt.getTime() + durationMs),
                    });
                  }}
                />
              </div>
              <div>
                <label className="label">{locale === "vi" ? "Giờ kết thúc" : "End time"}</label>
                <input
                  type="time"
                  className="input"
                  value={format(toZonedTime(editBooking.endsAt, businessTimezone), "HH:mm")}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const dateStr = format(toZonedTime(editBooking.startsAt, businessTimezone), "yyyy-MM-dd");
                    setEditBooking({
                      ...editBooking,
                      endsAt: fromZonedTime(`${dateStr}T${e.target.value}:00`, businessTimezone),
                    });
                  }}
                />
                <p className="mt-1 text-xs text-ink-400">
                  {locale === "vi"
                    ? "Có thể rút ngắn hoặc kéo dài thời lượng cuộc hẹn này."
                    : "Shorten or extend this one appointment's duration."}
                </p>
              </div>
              {staff.length > 0 && (
                <div>
                  <label className="label">{locale === "vi" ? "Nhân viên" : "Staff"}</label>
                  <select
                    className="input"
                    value={editBooking.staffId}
                    onChange={(e) => {
                      const newStaffId = e.target.value;
                      const eligible = servicesForStaff(services, newStaffId);
                      const stillValid = eligible.some((s) => s.id === editBooking.serviceId);
                      const fallback = !stillValid ? eligible[0] : undefined;
                      setEditBooking({
                        ...editBooking,
                        staffId: newStaffId,
                        ...(fallback
                          ? {
                              serviceId: fallback.id,
                              addOnIds: [],
                              priceAmount: String(fromSmallestUnit(fallback.priceCents, fallback.currency)),
                              currency: fallback.currency,
                              endsAt: addMinutes(editBooking.startsAt, fallback.durationMin),
                            }
                          : {}),
                      });
                    }}
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="label">{locale === "vi" ? "Dịch vụ" : "Service"}</label>
                {servicesForStaff(services, editBooking.staffId).length === 0 ? (
                  <p className="text-sm text-berry-500">
                    {locale === "vi"
                      ? "Nhân viên này chưa được gán dịch vụ nào. Vào mục Nhân viên để thêm."
                      : "This staff member has no services assigned yet — add some from the Staff page."}
                  </p>
                ) : (
                  <select
                    className="input"
                    value={editBooking.serviceId}
                    onChange={(e) => {
                      const sv = services.find((s) => s.id === e.target.value);
                      setEditBooking({
                        ...editBooking,
                        serviceId: e.target.value,
                        addOnIds: [],
                        ...(sv
                          ? {
                              priceAmount: String(fromSmallestUnit(sv.priceCents, sv.currency)),
                              currency: sv.currency,
                              endsAt: addMinutes(editBooking.startsAt, sv.durationMin),
                            }
                          : {}),
                      });
                    }}
                  >
                    {servicesForStaff(services, editBooking.staffId).map((sv) => (
                      <option key={sv.id} value={sv.id}>
                        {sv.name} — {formatMoney(sv.priceCents, sv.currency, locale)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {addOnsForService(addOns, editBooking.serviceId).length > 0 && (
                <div>
                  <label className="label">{locale === "vi" ? "Dịch vụ phụ" : "Add-ons"}</label>
                  <div className="space-y-1.5">
                    {addOnsForService(addOns, editBooking.serviceId).map((a) => (
                      <label
                        key={a.id}
                        className="flex items-center justify-between gap-2 rounded-xl border border-ink-100 px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editBooking.addOnIds.includes(a.id)}
                            onChange={() => toggleEditBookingAddOn(a)}
                          />
                          {a.name}
                        </span>
                        <span className="text-ink-700">{formatMoney(a.priceCents, editBooking.currency, locale)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <label className="label">
                  {locale === "vi" ? "Giá" : "Price"} ({editBooking.currency})
                </label>
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={editBooking.priceAmount}
                  onChange={(e) => setEditBooking({ ...editBooking, priceAmount: e.target.value })}
                />
              </div>
              <div>
                <label className="label">{locale === "vi" ? "Tên khách hàng" : "Customer name"}</label>
                <input
                  required
                  className="input"
                  value={editBooking.customerName}
                  onChange={(e) => setEditBooking({ ...editBooking, customerName: e.target.value })}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="label">{locale === "vi" ? "Số điện thoại" : "Phone number"}</label>
                <input
                  className="input"
                  value={editBooking.customerPhone}
                  onChange={(e) => setEditBooking({ ...editBooking, customerPhone: e.target.value })}
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
                  value={editBooking.customerEmail}
                  onChange={(e) => setEditBooking({ ...editBooking, customerEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="label">
                  {locale === "vi" ? "Ghi chú" : "Note"} ({locale === "vi" ? "không bắt buộc" : "optional"})
                </label>
                <textarea
                  rows={2}
                  className="input"
                  value={editBooking.customerNote}
                  onChange={(e) => setEditBooking({ ...editBooking, customerNote: e.target.value })}
                />
              </div>
            </div>
            {editBooking.endsAt <= editBooking.startsAt && (
              <p className="mt-2 text-sm text-berry-500">
                {locale === "vi"
                  ? "Giờ kết thúc phải sau giờ bắt đầu."
                  : "End time must be after the start time."}
              </p>
            )}
            {editError && <p className="mt-2 text-sm text-berry-500">{editError}</p>}
            <div className="mt-4 flex shrink-0 gap-2">
              <button
                disabled={
                  savingEdit ||
                  !editBooking.customerName.trim() ||
                  editBooking.endsAt <= editBooking.startsAt ||
                  servicesForStaff(services, editBooking.staffId).length === 0
                }
                onClick={submitEditBooking}
                className="btn-primary"
              >
                {savingEdit && <Loader2 className="h-4 w-4 animate-spin" />}
                {locale === "vi" ? "Lưu" : "Save"}
              </button>
              <button onClick={() => setEditBooking(null)} className="btn-ghost">
                {locale === "vi" ? "Huỷ" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {checkout && !checkoutDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card flex w-full max-w-sm animate-slide-up flex-col p-6" style={{ maxHeight: "90vh" }}>
            <div className="mb-4 flex items-start justify-between">
              <p className="font-bold text-ink-900">
                {locale === "vi" ? "Đến quầy thanh toán" : "Pay at the counter"}
              </p>
              <button onClick={() => setCheckout(null)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              <div className="space-y-2">
                {checkout.lines.map((line, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex-1 truncate text-sm text-ink-700">{line.name}</span>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      className="input !w-24 text-right"
                      value={line.unitPriceAmount}
                      onChange={(e) => {
                        const lines = [...checkout.lines];
                        lines[i] = { ...lines[i], unitPriceAmount: e.target.value };
                        setCheckout({ ...checkout, lines });
                      }}
                    />
                    <span className="text-xs text-ink-400">{checkout.currency}</span>
                  </div>
                ))}
              </div>
              <p className="flex justify-between border-t border-ink-100 pt-2 text-sm font-semibold text-ink-900">
                <span>{locale === "vi" ? "Tổng cộng" : "Total"}</span>
                <span>
                  {formatMoney(
                    checkout.lines.reduce(
                      (sum, l) => sum + toSmallestUnit(Number(l.unitPriceAmount) || 0, checkout.currency) * l.qty,
                      0
                    ),
                    checkout.currency,
                    locale
                  )}
                </span>
              </p>
              <div>
                <label className="label">
                  {locale === "vi" ? "Hình thức thanh toán" : "Payment method"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["CASH", "BANK_TRANSFER", "GIFT_CARD"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setCheckout({ ...checkout, paymentMethod: m })}
                      className={`rounded-lg border px-2 py-2 text-xs font-medium ${
                        checkout.paymentMethod === m
                          ? "border-primary-500 bg-primary-50 text-primary-600"
                          : "border-ink-100 text-ink-700"
                      }`}
                    >
                      {m === "CASH"
                        ? locale === "vi"
                          ? "Tiền mặt"
                          : "Cash"
                        : m === "BANK_TRANSFER"
                          ? locale === "vi"
                            ? "Qua ngân hàng"
                            : "Bank transfer"
                          : locale === "vi"
                            ? "Thẻ quà tặng"
                            : "Gift card"}
                    </button>
                  ))}
                </div>
              </div>
              {checkout.paymentMethod === "GIFT_CARD" && (
                <div>
                  <label className="label">{locale === "vi" ? "Mã thẻ quà tặng" : "Gift card code"}</label>
                  <input
                    className="input"
                    value={checkout.giftCardCode}
                    onChange={(e) => setCheckout({ ...checkout, giftCardCode: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="label">
                  {locale === "vi" ? "Thêm thông tin vào biên lai" : "Add info to the receipt"}
                </label>
                <textarea
                  className="input"
                  rows={2}
                  value={checkout.note}
                  onChange={(e) => setCheckout({ ...checkout, note: e.target.value })}
                />
              </div>
            </div>
            {checkoutError && <p className="mt-2 text-sm text-berry-500">{checkoutError}</p>}
            <div className="mt-4 flex shrink-0 gap-2">
              <button
                disabled={checkingOut || (checkout.paymentMethod === "GIFT_CARD" && !checkout.giftCardCode.trim())}
                onClick={submitCheckout}
                className="btn-primary"
              >
                {checkingOut && <Loader2 className="h-4 w-4 animate-spin" />}
                {locale === "vi" ? "Xác nhận thanh toán" : "Confirm payment"}
              </button>
              <button onClick={() => setCheckout(null)} className="btn-ghost">
                {locale === "vi" ? "Huỷ" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {checkoutDone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6 text-center">
            <p className="mb-1 font-bold text-ink-900">
              {locale === "vi" ? "Đã xác nhận thanh toán" : "Payment confirmed"}
            </p>
            <p className="mb-4 text-sm text-ink-400">{checkoutDone.number}</p>
            <p className="mb-4 text-2xl font-bold text-ink-900">
              {formatMoney(checkoutDone.totalCents, checkoutDone.currency, locale)}
            </p>
            <a
              href={checkoutDone.publicUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline mb-2 inline-flex w-full justify-center !py-2 text-sm"
            >
              {locale === "vi" ? "Xem / tải hóa đơn" : "View / download invoice"}
            </a>
            <button
              onClick={() => {
                setCheckout(null);
                setCheckoutDone(null);
              }}
              className="btn-ghost w-full"
            >
              {locale === "vi" ? "Đóng" : "Close"}
            </button>
          </div>
        </div>
      )}

      {newBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card flex w-full max-w-sm animate-slide-up flex-col p-6" style={{ maxHeight: "90vh" }}>
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
            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              <div>
                <label className="label">{locale === "vi" ? "Ngày & giờ" : "Date & time"}</label>
                <QuarterHourField
                  value={format(toZonedTime(newBooking.startsAt, businessTimezone), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(v) => {
                    if (!v) return;
                    const newStartsAt = fromZonedTime(v, businessTimezone);
                    const durationMs = newBooking.endsAt.getTime() - newBooking.startsAt.getTime();
                    setNewBooking({
                      ...newBooking,
                      startsAt: newStartsAt,
                      endsAt: new Date(newStartsAt.getTime() + durationMs),
                    });
                  }}
                />
              </div>
              <div>
                <label className="label">{locale === "vi" ? "Giờ kết thúc" : "End time"}</label>
                <input
                  type="time"
                  className="input"
                  value={format(toZonedTime(newBooking.endsAt, businessTimezone), "HH:mm")}
                  onChange={(e) => {
                    if (!e.target.value) return;
                    const dateStr = format(toZonedTime(newBooking.startsAt, businessTimezone), "yyyy-MM-dd");
                    setNewBooking({
                      ...newBooking,
                      endsAt: fromZonedTime(`${dateStr}T${e.target.value}:00`, businessTimezone),
                    });
                  }}
                />
                <p className="mt-1 text-xs text-ink-400">
                  {locale === "vi"
                    ? "Có thể rút ngắn hoặc kéo dài thời lượng cuộc hẹn này."
                    : "Shorten or extend this one appointment's duration."}
                </p>
              </div>
              {staff.length > 0 && (
                <div>
                  <label className="label">{locale === "vi" ? "Nhân viên" : "Staff"}</label>
                  <select
                    className="input"
                    value={newBooking.staffId}
                    onChange={(e) => {
                      const newStaffId = e.target.value;
                      const eligible = servicesForStaff(services, newStaffId);
                      const stillValid = eligible.some((s) => s.id === newBooking.serviceId);
                      const fallback = !stillValid ? eligible[0] : undefined;
                      setNewBooking({
                        ...newBooking,
                        staffId: newStaffId,
                        ...(fallback
                          ? {
                              serviceId: fallback.id,
                              addOnIds: [],
                              endsAt: addMinutes(newBooking.startsAt, fallback.durationMin),
                            }
                          : {}),
                      });
                    }}
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="label">{locale === "vi" ? "Dịch vụ" : "Service"}</label>
                {servicesForStaff(services, newBooking.staffId).length === 0 ? (
                  <p className="text-sm text-berry-500">
                    {locale === "vi"
                      ? "Nhân viên này chưa được gán dịch vụ nào. Vào mục Nhân viên để thêm."
                      : "This staff member has no services assigned yet — add some from the Staff page."}
                  </p>
                ) : (
                  <select
                    className="input"
                    value={newBooking.serviceId}
                    onChange={(e) => {
                      const sv = services.find((s) => s.id === e.target.value);
                      setNewBooking({
                        ...newBooking,
                        serviceId: e.target.value,
                        addOnIds: [],
                        ...(sv ? { endsAt: addMinutes(newBooking.startsAt, sv.durationMin) } : {}),
                      });
                    }}
                  >
                    {servicesForStaff(services, newBooking.staffId).map((sv) => (
                      <option key={sv.id} value={sv.id}>
                        {sv.name} — {formatMoney(sv.priceCents, sv.currency, locale)}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {addOnsForService(addOns, newBooking.serviceId).length > 0 && (
                <div>
                  <label className="label">{locale === "vi" ? "Dịch vụ phụ" : "Add-ons"}</label>
                  <div className="space-y-1.5">
                    {addOnsForService(addOns, newBooking.serviceId).map((a) => {
                      const sv = services.find((s) => s.id === newBooking.serviceId);
                      const currency = sv?.currency ?? "VND";
                      return (
                        <label
                          key={a.id}
                          className="flex items-center justify-between gap-2 rounded-xl border border-ink-100 px-3 py-2 text-sm"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={newBooking.addOnIds.includes(a.id)}
                              onChange={() => toggleNewBookingAddOn(a)}
                            />
                            {a.name}
                          </span>
                          <span className="text-ink-700">{formatMoney(a.priceCents, currency, locale)}</span>
                        </label>
                      );
                    })}
                  </div>
                  {(() => {
                    const sv = services.find((s) => s.id === newBooking.serviceId);
                    if (!sv) return null;
                    const addOnTotal = addOnsForService(addOns, newBooking.serviceId)
                      .filter((a) => newBooking.addOnIds.includes(a.id))
                      .reduce((sum, a) => sum + a.priceCents, 0);
                    return (
                      <p className="mt-1.5 text-xs text-ink-400">
                        {locale === "vi" ? "Tổng cộng" : "Total"}:{" "}
                        <span className="font-medium text-ink-900">
                          {formatMoney(sv.priceCents + addOnTotal, sv.currency, locale)}
                        </span>
                      </p>
                    );
                  })()}
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
              <label className="flex items-start gap-2 text-sm text-ink-700">
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={newBooking.sendNotificationEmails}
                  onChange={(e) =>
                    setNewBooking({ ...newBooking, sendNotificationEmails: e.target.checked })
                  }
                />
                <span>
                  {locale === "vi"
                    ? "Gửi email xác nhận và nhắc lịch cho khách hàng"
                    : "Send the customer a confirmation and reminder emails"}
                  <span className="block text-xs text-ink-400">
                    {locale === "vi"
                      ? "Bạn cũng sẽ nhận được email thông báo về lịch hẹn này."
                      : "You'll also get an email notifying you about this booking."}
                  </span>
                </span>
              </label>
            </div>
            {newBooking.endsAt <= newBooking.startsAt && (
              <p className="mt-2 text-sm text-berry-500">
                {locale === "vi"
                  ? "Giờ kết thúc phải sau giờ bắt đầu."
                  : "End time must be after the start time."}
              </p>
            )}
            {newBookingError && <p className="mt-2 text-sm text-berry-500">{newBookingError}</p>}
            <div className="mt-4 flex shrink-0 gap-2">
              <button
                disabled={
                  creatingBooking ||
                  !newBooking.customerName.trim() ||
                  !newBooking.customerPhone.trim() ||
                  newBooking.endsAt <= newBooking.startsAt ||
                  servicesForStaff(services, newBooking.staffId).length === 0
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

      {pendingHoursChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6">
            <p className="mb-3 text-lg font-bold text-ink-900">
              {pendingHoursChange.edge === "open" ? hd.confirmStart : hd.confirmEnd}
            </p>
            <p className="mb-4 text-sm text-ink-700">
              {hd.newTimeIs}{" "}
              <span className="font-semibold text-ink-900">
                {String(Math.floor(pendingHoursChange.newMinute / 60)).padStart(2, "0")}:
                {String(pendingHoursChange.newMinute % 60).padStart(2, "0")}
              </span>
            </p>
            <div className="flex gap-2">
              <button onClick={confirmPendingHoursChange} className="btn-primary">
                {hd.confirm}
              </button>
              <button onClick={cancelPendingHoursChange} className="btn-ghost">
                {hd.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Date, hour, and a minute picker in 15-minute steps. Keeps an off-grid minute
 * (an older booking at 17:20) selectable so opening the form never changes it. */
function QuarterHourField({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const [date, time] = value.split("T");
  const [hh, mm] = (time ?? "00:00").split(":");
  const minute = Number(mm);
  const minuteOptions = [0, 15, 30, 45].includes(minute)
    ? [0, 15, 30, 45]
    : [0, 15, 30, 45, minute].sort((a, b) => a - b);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
      <input
        type="date"
        className="input"
        value={date}
        onChange={(e) => e.target.value && onChange(`${e.target.value}T${hh}:${mm}`)}
      />
      <select
        className="input !w-20"
        value={hh}
        onChange={(e) => onChange(`${date}T${e.target.value}:${mm}`)}
      >
        {Array.from({ length: 24 }, (_, h) => (
          <option key={h} value={pad(h)}>
            {pad(h)}
          </option>
        ))}
      </select>
      <select
        className="input !w-20"
        value={mm}
        onChange={(e) => onChange(`${date}T${hh}:${e.target.value}`)}
      >
        {minuteOptions.map((m) => (
          <option key={m} value={pad(m)}>
            {pad(m)}
          </option>
        ))}
      </select>
    </div>
  );
}
