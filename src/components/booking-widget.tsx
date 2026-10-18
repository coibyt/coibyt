"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { fi, vi } from "date-fns/locale";
import { Link } from "@/i18n/navigation";
import { SignInForm } from "@/components/guest-booking-auth";
import { EmbedTopBar } from "@/components/embed-topbar";
import { EmbedBookingProgress } from "@/components/embed-booking-progress";
import { formatMoney } from "@/lib/money";
import { BOOKING_DAYS_AHEAD } from "@/lib/booking-window";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";
import { embedFrameClass, toYoutubeEmbedUrl } from "@/lib/youtube";
import { Landmark, Banknote, Loader2, PlayCircle, X, Check, Users, ChevronLeft, ChevronRight } from "lucide-react";

interface StaffOption {
  id: string;
  name: string;
  avatarUrl: string | null;
  priceCentsOverride: number | null;
  durationMinOverride: number | null;
  staffMessage: string | null;
  videoUrls: string[];
}

interface ServiceInfo {
  id: string;
  name: string;
  priceCents: number;
  depositCents: number | null;
  currency: string;
  durationMin: number;
}

interface ComboAssignment {
  key: string;
  serviceId: string;
  name: string;
  staffId: string;
  staffName: string;
  startsAt: string;
  endsAt: string;
}

interface Slot {
  startsAt: string;
  endsAt: string;
  staffId: string;
  priceCents: number;
  durationMin: number;
  /** Present only when this slot splits the selected services across
   * different staff members, back-to-back — no single staff could do
   * everything, so each service goes to whoever is free, in order. */
  assignments?: ComboAssignment[];
}

interface AddOnOption {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
}

interface ExtraServiceInfo {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
}

export interface BankInfo {
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBic: string | null;
}

const WIDGET_LABELS = {
  vi: {
    extras: "Dịch vụ của bạn",
    today: "Hôm nay",
    morning: "Buổi sáng",
    afternoon: "Buổi chiều",
    evening: "Buổi tối",
    loadingTimes: "Đang tìm giờ trống…",
    summary: "Lịch hẹn của bạn",
    pickTime: "Chọn ngày và giờ",
  },
  en: {
    extras: "Your services",
    today: "Today",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    loadingTimes: "Finding free times…",
    summary: "Your appointment",
    pickTime: "Pick a date and time",
  },
  fi: {
    extras: "Palvelusi",
    today: "Tänään",
    morning: "Aamupäivä",
    afternoon: "Iltapäivä",
    evening: "Ilta",
    loadingTimes: "Haetaan vapaita aikoja…",
    summary: "Varauksesi",
    pickTime: "Valitse päivä ja aika",
  },
};
// "CASH" (pay at the salon) listed first and selected by default — the site
// doesn't require an online merchant account to start taking bookings.
// BANK_TRANSFER is only offered once the salon has filled in their account
// details (see bankInfo below) — there's nothing useful to show otherwise.
// International card payment (Stripe) isn't offered on this checkout step.
const PAYMENT_METHODS = [
  { id: "CASH", icon: Banknote },
  { id: "BANK_TRANSFER", icon: Landmark },
] as const;

export function BookingWidget({
  businessSlug,
  service,
  staffOptions,
  addOnOptions,
  extraServices = [],
  bankInfo,
  cancellationPolicy,
  cancellationWindowHours,
  locale,
  businessTimezone,
  embedProgress,
  initialDate,
  initialTime,
}: {
  businessSlug: string;
  service: ServiceInfo;
  staffOptions: StaffOption[];
  addOnOptions: AddOnOption[];
  extraServices?: ExtraServiceInfo[];
  bankInfo?: BankInfo | null;
  cancellationPolicy?: string | null;
  cancellationWindowHours: number;
  locale: string;
  businessTimezone: string;
  /** Only set on the /embed booking flow — shows the Location/Service/
   * Booking/Finish step bar there; the main site's /b/... booking page
   * already has its own navigation, so this stays unset there. */
  embedProgress?: { step1Href?: string; step2Href: string };
  /** Preselection from a deep link (e.g. the AI chat's "book now" button):
   * "yyyy-MM-dd" and "HH:mm", both in the salon's timezone. Ignored when out
   * of the bookable range or no longer free — the customer just picks again. */
  initialDate?: string;
  initialTime?: string;
}) {
  const t = useTranslations("service");
  const tPay = useTranslations("payment");
  const tCommon = useTranslations("common");
  const tAuth = useTranslations("auth");
  const { status } = useSession();
  const viewerTimezone = useViewerTimezone();
  const showLocalTime = !!viewerTimezone && viewerTimezone !== businessTimezone;

  // "Today" and every date/time shown here is anchored to the SALON's
  // timezone, not the visitor's device — a customer booking a Hanoi salon
  // from abroad (or with a misconfigured clock) must still see Hanoi time.
  const todayInBusinessTz = useMemo(
    () => toZonedTime(new Date(), businessTimezone),
    [businessTimezone]
  );

  const firstBookableDay = useMemo(() => startOfDay(todayInBusinessTz), [todayInBusinessTz]);
  const lastBookableDay = useMemo(() => addDays(firstBookableDay, BOOKING_DAYS_AHEAD - 1), [firstBookableDay]);
  const initialDay = useMemo(() => {
    if (!initialDate || !/^\d{4}-\d{2}-\d{2}$/.test(initialDate)) return undefined;
    const [y, m, d] = initialDate.split("-").map(Number);
    const day = new Date(y, m - 1, d);
    // Rejects rollovers like "2026-02-31" as well as out-of-range dates.
    if (format(day, "yyyy-MM-dd") !== initialDate) return undefined;
    return day >= firstBookableDay && day <= lastBookableDay ? day : undefined;
    // Only the first render's preselection matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Applied once, on the first slot list for the preselected day — after
  // that, the customer's own clicks are in charge.
  const pendingInitialTime = useRef(initialDay && initialTime && /^\d{2}:\d{2}$/.test(initialTime) ? initialTime : null);

  const [staffId, setStaffId] = useState<string>("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState(initialDay ?? todayInBusinessTz);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [provider, setProvider] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("CASH");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);

  // Guest checkout — only used while status !== "authenticated". Filling
  // these in and confirming creates the customer's account inline (see
  // POST /api/bookings); "Already have an account?" swaps this block for
  // SignInForm instead.
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  // Discount code (redeems a GiftCardPurchase for this exact service) —
  // validated live here purely for preview; createBookingAndPayment
  // re-validates and redeems it server-side, never trusting this.
  const [discountCode, setDiscountCode] = useState("");
  const [discountChecking, setDiscountChecking] = useState(false);
  const [discount, setDiscount] = useState<{ percent: number; name: string } | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);

  const selectedAddOns = addOnOptions.filter((a) => selectedAddOnIds.has(a.id));
  const addOnPriceSum = selectedAddOns.reduce((sum, a) => sum + a.priceCents, 0);
  const addOnIdsKey = Array.from(selectedAddOnIds).sort().join(",");
  const extraServicePriceSum = extraServices.reduce((sum, s) => sum + s.priceCents, 0);
  const extraServiceIdsKey = extraServices.map((s) => s.id).join(",");

  const hasBankInfo = !!(bankInfo?.bankName && bankInfo?.bankAccountNumber);
  const paymentMethods = PAYMENT_METHODS.filter((m) => m.id !== "BANK_TRANSFER" || hasBankInfo);

  // What the service actually costs/takes depends on which staff member ends
  // up doing it — each can have their own price/duration override. Once a
  // slot is picked, trust that (the server already resolved the real staff
  // for "any staff" bookings); before that, preview either the selected
  // staff's own numbers, or the cheapest staff's when "any" is still picked.
  const selectedStaff = staffOptions.find((s) => s.id === staffId);
  const cheapestStaff = staffOptions.reduce<StaffOption | null>((cheapest, s) => {
    const price = s.priceCentsOverride ?? service.priceCents;
    const cheapestPrice = cheapest ? (cheapest.priceCentsOverride ?? service.priceCents) : Infinity;
    return price < cheapestPrice ? s : cheapest;
  }, null);
  const previewStaff = selectedStaff ?? cheapestStaff;
  const effectiveServicePriceCents = selectedSlot
    ? selectedSlot.priceCents
    : previewStaff?.priceCentsOverride ?? service.priceCents;
  const effectiveServiceDurationMin = selectedSlot
    ? selectedSlot.durationMin
    : previewStaff?.durationMinOverride ?? service.durationMin;

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  useEffect(() => {
    setSelectedSlot(null);
    setLoadingSlots(true);
    const params = new URLSearchParams({
      serviceId: service.id,
      date: format(selectedDate, "yyyy-MM-dd"),
    });
    if (staffId) params.set("staffId", staffId);
    if (addOnIdsKey) params.set("addOnIds", addOnIdsKey);
    if (extraServiceIdsKey) params.set("extraServiceIds", extraServiceIdsKey);

    fetch(`/api/businesses/${businessSlug}/availability?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        const fetched: Slot[] = data.slots ?? [];
        setSlots(fetched);
        const wanted = pendingInitialTime.current;
        if (wanted) {
          pendingInitialTime.current = null;
          const match = fetched.find(
            (s) => format(toZonedTime(new Date(s.startsAt), businessTimezone), "HH:mm") === wanted
          );
          if (match) setSelectedSlot(match);
        }
      })
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [businessSlug, service.id, staffId, selectedDate, addOnIdsKey, extraServiceIdsKey, businessTimezone]);

  async function applyDiscount() {
    if (!discountCode.trim()) return;
    setDiscountChecking(true);
    setDiscountError(null);
    try {
      const res = await fetch("/api/bookings/validate-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim(), serviceId: service.id }),
      });
      const data = await res.json();
      if (!data.valid) {
        setDiscount(null);
        setDiscountError(locale === "vi" ? "Mã giảm giá không hợp lệ." : "Invalid discount code.");
        return;
      }
      setDiscount({ percent: data.discountPercent, name: data.name });
    } finally {
      setDiscountChecking(false);
    }
  }

  const isGuest = status !== "authenticated";
  const guestFormValid =
    guestName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(guestEmail) &&
    guestPhone.trim().length >= 6 &&
    guestPassword.length >= 8;

  async function handleSubmit() {
    if (!selectedSlot) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          // Leave "any staff" bookings unresolved here — the server re-runs
          // the same availability check right before creating the booking
          // (never trusting a client-picked staff for "any staff"), which is
          // also what lets it attach a combo slot's per-service assignments.
          staffId: staffId || undefined,
          startsAt: selectedSlot.startsAt,
          customerNote: note || undefined,
          paymentProvider: provider,
          addOnIds: Array.from(selectedAddOnIds),
          extraServiceIds: extraServices.map((s) => s.id),
          discountCode: discount ? discountCode.trim() : undefined,
          ...(isGuest
            ? {
                guestName,
                guestEmail,
                guestPhone,
                guestPassword,
                emailMarketingOptIn: emailOptIn,
                smsMarketingOptIn: smsOptIn,
              }
            : {}),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "SLOT_UNAVAILABLE"
            ? t("noSlots")
            : data.error === "EMAIL_IN_USE"
              ? tAuth("emailInUse")
              : data.error === "GUEST_INFO_REQUIRED"
                ? locale === "vi"
                  ? "Vui lòng điền đầy đủ thông tin của bạn."
                  : "Please fill in all your details."
                : tPay("failed")
        );
        return;
      }
      if (isGuest) {
        await signIn("credentials", { email: guestEmail, password: guestPassword, redirect: false });
      }
      window.location.href = data.redirectUrl;
    } catch {
      setError(tPay("failed"));
    } finally {
      setSubmitting(false);
    }
  }

  const discountCents = discount
    ? Math.round((effectiveServicePriceCents * discount.percent) / 100)
    : 0;
  const totalServiceCents = effectiveServicePriceCents + addOnPriceSum + extraServicePriceSum - discountCents;
  const isOfflinePayment = provider === "CASH" || provider === "BANK_TRANSFER";

  // Paying online can be for just the deposit; cash and bank transfer always
  // mean the full price, since there's no online step to collect a deposit.
  const amountDue = isOfflinePayment ? totalServiceCents : service.depositCents ?? totalServiceCents;

  const progressBar = embedProgress && (
    <>
      <EmbedTopBar locale={locale} />
      <EmbedBookingProgress
        locale={locale}
        steps={[
          { state: "done", href: embedProgress.step1Href },
          { state: "done", href: embedProgress.step2Href },
          selectedSlot
            ? { state: "done", onClick: () => setSelectedSlot(null) }
            : { state: "current" },
          selectedSlot ? { state: "current" } : { state: "upcoming" },
        ]}
      />
    </>
  );

  const L = WIDGET_LABELS[locale as keyof typeof WIDGET_LABELS] ?? WIDGET_LABELS.en;
  const intlLocale = locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB";
  const slotTime = (iso: string, timeZone?: string) =>
    new Date(iso).toLocaleTimeString(intlLocale, { hour: "2-digit", minute: "2-digit", timeZone });
  const slotGroups = (["morning", "afternoon", "evening"] as const)
    .map((part) => ({
      part,
      items: slots.filter((s) => {
        const h = toZonedTime(new Date(s.startsAt), businessTimezone).getHours();
        return part === "morning" ? h < 12 : part === "afternoon" ? h >= 12 && h < 17 : h >= 17;
      }),
    }))
    .filter((g) => g.items.length > 0);
  let stepNo = 0;
  const nextStep = () => ++stepNo;

  return (
    <div className="space-y-5">
      {progressBar}

      {(addOnOptions.length > 0 || extraServices.length > 0) && (
        <Step n={nextStep()} title={L.extras}>
          {extraServices.length > 0 && (
            <div className="mb-3 space-y-2">
              <p className="text-xs font-semibold text-ink-400">{locale === "vi" ? "Dịch vụ đã chọn thêm" : "Also booking"}</p>
              {extraServices.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-mist-50 px-4 py-3 text-sm"
                >
                  <span className="font-medium text-ink-900">
                    {s.name}
                    <span className="ml-1.5 text-xs font-normal text-ink-400">
                      {s.durationMin} {tCommon("min")}
                    </span>
                  </span>
                  <span className="font-semibold text-ink-900">{formatMoney(s.priceCents, service.currency, locale)}</span>
                </div>
              ))}
            </div>
          )}
          {addOnOptions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-ink-400">
                {locale === "vi" ? "Dịch vụ phụ (không bắt buộc)" : "Add-ons (optional)"}
              </p>
              {addOnOptions.map((a) => {
                const on = selectedAddOnIds.has(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      on ? "border-primary-400 bg-primary-50 ring-1 ring-primary-400" : "border-ink-100 hover:border-primary-200"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggleAddOn(a.id)} />
                      <span
                        aria-hidden
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400 ${
                          on ? "border-primary-500 bg-primary-500 text-white" : "border-ink-100 bg-white"
                        }`}
                      >
                        {on && <Check className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span className="text-ink-900">
                        {a.name}
                        {a.durationMin > 0 && (
                          <span className="ml-1.5 text-xs text-ink-400">
                            +{a.durationMin} {tCommon("min")}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold text-ink-900">
                      +{formatMoney(a.priceCents, service.currency, locale)}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </Step>
      )}

      {staffOptions.length > 0 && (
        <Step n={nextStep()} title={t("selectStaff")}>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <StaffTile
              active={staffId === ""}
              onClick={() => setStaffId("")}
              name={t("anyStaff")}
              avatarUrl={null}
              any
              price={
                cheapestStaff
                  ? formatMoney(cheapestStaff.priceCentsOverride ?? service.priceCents, service.currency, locale)
                  : null
              }
            />
            {staffOptions.map((s) => (
              <StaffTile
                key={s.id}
                active={staffId === s.id}
                onClick={() => setStaffId(s.id)}
                name={s.name}
                avatarUrl={s.avatarUrl}
                price={
                  s.priceCentsOverride !== null || s.durationMinOverride !== null
                    ? formatMoney(s.priceCentsOverride ?? service.priceCents, service.currency, locale)
                    : null
                }
              />
            ))}
          </div>
          {selectedStaff && (
            <p className="mt-3 text-xs text-ink-400">
              {formatMoney(selectedStaff.priceCentsOverride ?? service.priceCents, service.currency, locale)}
              {" · "}
              {selectedStaff.durationMinOverride ?? service.durationMin} {tCommon("min")}
            </p>
          )}
          {selectedStaff?.staffMessage && (
            <p className="mt-2 rounded-2xl bg-peach-50 px-4 py-3 text-sm leading-relaxed text-ink-700">
              {selectedStaff.staffMessage}
            </p>
          )}
          {selectedStaff && selectedStaff.videoUrls.length > 0 && (
            <StaffVideos videoUrls={selectedStaff.videoUrls} staffName={selectedStaff.name} locale={locale} />
          )}
        </Step>
      )}

      <Step n={nextStep()} title={t("selectDate")}>
        <DateCalendar
          firstDay={firstBookableDay}
          lastDay={lastBookableDay}
          selected={selectedDate}
          onSelect={setSelectedDate}
          locale={locale}
          todayLabel={L.today}
        />
      </Step>

      <Step n={nextStep()} title={t("selectTime")}>
        {showLocalTime && (
          <p className="mb-3 rounded-xl bg-mist-50 px-3 py-2 text-xs text-ink-700">
            {locale === "vi"
              ? `Giờ hiển thị là giờ salon (${businessTimezone}) — giờ của bạn hiện theo dưới mỗi khung giờ.`
              : `Times shown are the salon's local time (${businessTimezone}) — your own local time is shown under each slot.`}
          </p>
        )}
        {loadingSlots ? (
          <p className="flex items-center gap-2 py-4 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> {L.loadingTimes}
          </p>
        ) : slots.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ink-100 px-4 py-6 text-center text-sm text-ink-400">
            {t("noSlots")}
          </p>
        ) : (
          <div className="space-y-4">
            {slotGroups.map((g) => (
              <div key={g.part}>
                <p className="mb-2 text-xs font-semibold text-ink-400">{L[g.part]}</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {g.items.map((s) => {
                    const on = selectedSlot?.startsAt === s.startsAt;
                    return (
                      <button
                        key={s.startsAt}
                        onClick={() => setSelectedSlot(s)}
                        title={
                          s.assignments
                            ? locale === "vi"
                              ? "Khung giờ này chia cho nhiều nhân viên"
                              : "This time splits the services across multiple staff"
                            : undefined
                        }
                        className={`relative rounded-xl border py-2.5 text-sm font-semibold tabular-nums transition-colors ${
                          on
                            ? "border-transparent bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md"
                            : "border-ink-100 bg-white text-ink-900 hover:border-primary-300 hover:bg-primary-50"
                        }`}
                      >
                        {s.assignments && (
                          <span
                            className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${on ? "bg-white" : "bg-primary-500"}`}
                          />
                        )}
                        <span className="block">{slotTime(s.startsAt, businessTimezone)}</span>
                        {showLocalTime && (
                          <span className={`block text-[11px] font-normal ${on ? "text-white/70" : "text-ink-400"}`}>
                            {slotTime(s.startsAt, viewerTimezone ?? undefined)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedSlot?.assignments && (
          <div className="mt-3 rounded-2xl border border-primary-200 bg-primary-50 p-4 text-sm">
            <p className="mb-1.5 font-semibold text-ink-900">
              {locale === "vi"
                ? "Lịch hẹn này sẽ do nhiều nhân viên thực hiện, nối tiếp nhau:"
                : "This appointment will be handled by multiple staff, one after another:"}
            </p>
            <ul className="space-y-1 text-ink-700">
              {selectedSlot.assignments.map((a) => (
                <li key={a.key} className="flex items-center justify-between gap-2">
                  <span>
                    {a.name}
                    <span className="text-ink-400"> · {a.staffName}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ink-400">{slotTime(a.startsAt, businessTimezone)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Step>

      {selectedSlot && isGuest && (
        <Step n={nextStep()} title={locale === "vi" ? "Thông tin của bạn" : "Your info"}>
          {!showSignIn ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="label">{tAuth("name")}</label>
                  <input required className="input" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
                </div>
                <div>
                  <label className="label">{tAuth("phone")}</label>
                  <input
                    required
                    type="tel"
                    className="input"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">{tAuth("email")}</label>
                  <input
                    required
                    type="email"
                    className="input"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">{tAuth("password")}</label>
                  <input
                    required
                    type="password"
                    minLength={8}
                    className="input"
                    value={guestPassword}
                    onChange={(e) => setGuestPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-mist-50 p-4">
                <p className="mb-2 text-sm font-medium text-ink-900">
                  {locale === "vi"
                    ? "Bạn muốn nhận tin nhắn và thông báo tiếp thị bằng cách nào?"
                    : "How would you like to receive marketing messages?"}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-ink-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary-500"
                      checked={emailOptIn}
                      onChange={(e) => setEmailOptIn(e.target.checked)}
                    />
                    {locale === "vi" ? "Qua email" : "By email"}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-primary-500"
                      checked={smsOptIn}
                      onChange={(e) => setSmsOptIn(e.target.checked)}
                    />
                    {locale === "vi" ? "Qua tin nhắn văn bản" : "By text message"}
                  </label>
                </div>
              </div>

              <p className="text-sm text-ink-400">
                {tAuth("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => setShowSignIn(true)}
                  className="font-semibold text-primary-600 hover:underline"
                >
                  {tAuth("signInInstead")}
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <SignInForm />
              <p className="text-center text-sm text-ink-400">
                <button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  className="font-semibold text-primary-600 hover:underline"
                >
                  {locale === "vi" ? "Quay lại đặt lịch với thông tin mới" : "Back to booking as a new customer"}
                </button>
              </p>
            </div>
          )}
        </Step>
      )}

      <Step n={nextStep()} title={tPay("choose")}>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {paymentMethods.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setProvider(id)}
              className={`flex flex-col items-center gap-2 rounded-2xl border py-4 text-sm font-semibold transition-colors ${
                provider === id
                  ? "border-primary-400 bg-primary-50 text-primary-700 ring-1 ring-primary-400"
                  : "border-ink-100 text-ink-700 hover:border-primary-200"
              }`}
            >
              <Icon className="h-6 w-6" />
              {tPay(id === "BANK_TRANSFER" ? "bankTransfer" : "cash")}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-400">
          {provider === "CASH"
            ? tPay("cashNotice")
            : provider === "BANK_TRANSFER"
              ? tPay("bankTransferNotice")
              : tPay("sandboxNotice")}
        </p>
        {provider === "BANK_TRANSFER" && bankInfo && (
          <div className="mt-3 space-y-1 rounded-2xl border border-primary-100 bg-primary-50 p-4 text-sm text-ink-900">
            {bankInfo.bankName && (
              <p>
                <span className="text-ink-400">{locale === "vi" ? "Ngân hàng: " : "Bank: "}</span>
                {bankInfo.bankName}
              </p>
            )}
            {bankInfo.bankAccountNumber && (
              <p>
                <span className="text-ink-400">{locale === "vi" ? "Số tài khoản: " : "Account number: "}</span>
                {bankInfo.bankAccountNumber}
              </p>
            )}
            {bankInfo.bankAccountName && (
              <p>
                <span className="text-ink-400">{locale === "vi" ? "Chủ tài khoản: " : "Account holder: "}</span>
                {bankInfo.bankAccountName}
              </p>
            )}
            {bankInfo.bankBic && (
              <p>
                <span className="text-ink-400">BIC/SWIFT: </span>
                {bankInfo.bankBic}
              </p>
            )}
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="note">
              {t("note")}
            </label>
            <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="input !rounded-2xl" />
          </div>
          <div>
            <p className="label">{locale === "vi" ? "Mã giảm giá" : "Discount code"}</p>
            <div className="flex gap-2">
              <input
                className="input flex-1"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                  setDiscount(null);
                  setDiscountError(null);
                }}
                placeholder={locale === "vi" ? "Nhập mã" : "Enter code"}
              />
              <button
                type="button"
                onClick={applyDiscount}
                disabled={discountChecking || !discountCode.trim()}
                className="btn-outline !px-4"
              >
                {discountChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : locale === "vi" ? "Áp dụng" : "Apply"}
              </button>
            </div>
            {discount && (
              <p className="mt-1.5 text-xs font-medium text-teal-600">
                {locale === "vi"
                  ? `Đã áp dụng "${discount.name}" (-${discount.percent}%)`
                  : `"${discount.name}" applied (-${discount.percent}%)`}
              </p>
            )}
            {discountError && <p className="mt-1.5 text-xs text-berry-500">{discountError}</p>}
          </div>
        </div>
      </Step>

      <section className="overflow-hidden rounded-[24px] border border-ink-100 bg-white">
        <div className="bg-gradient-to-br from-primary-700 to-primary-900 px-5 py-4 text-white sm:px-6">
          <p className="text-xs font-medium text-primary-100">{L.summary}</p>
          <p className="mt-1 text-lg font-bold">
            {selectedSlot
              ? `${format(toZonedTime(new Date(selectedSlot.startsAt), businessTimezone), "EEEE d.M.", {
                  locale: locale === "vi" ? vi : undefined,
                })} · ${slotTime(selectedSlot.startsAt, businessTimezone)}`
              : L.pickTime}
          </p>
          {selectedSlot && (
            <p className="text-sm text-primary-100">
              {staffOptions.find((s) => s.id === selectedSlot.staffId)?.name ?? (selectedStaff?.name || t("anyStaff"))}
              {" · "}
              {effectiveServiceDurationMin + selectedAddOns.reduce((sum, a) => sum + a.durationMin, 0) +
                extraServices.reduce((sum, s) => sum + s.durationMin, 0)}{" "}
              {tCommon("min")}
            </p>
          )}
        </div>
        <div className="space-y-2 p-5 sm:px-6">
          <div className="flex justify-between gap-3 text-sm text-ink-700">
            <span>{service.name}</span>
            <span className="shrink-0">{formatMoney(effectiveServicePriceCents, service.currency, locale)}</span>
          </div>
          {extraServices.map((s) => (
            <div key={s.id} className="flex justify-between gap-3 text-sm text-ink-700">
              <span>{s.name}</span>
              <span className="shrink-0">{formatMoney(s.priceCents, service.currency, locale)}</span>
            </div>
          ))}
          {selectedAddOns.map((a) => (
            <div key={a.id} className="flex justify-between gap-3 text-sm text-ink-700">
              <span>{a.name}</span>
              <span className="shrink-0">{formatMoney(a.priceCents, service.currency, locale)}</span>
            </div>
          ))}
          {discount && (
            <div className="flex justify-between gap-3 text-sm text-teal-600">
              <span>
                {discount.name} (-{discount.percent}%)
              </span>
              <span className="shrink-0">-{formatMoney(discountCents, service.currency, locale)}</span>
            </div>
          )}
          {!isOfflinePayment && service.depositCents && (
            <div className="flex justify-between gap-3 text-sm text-ink-400">
              <span>{t("deposit")}</span>
              <span className="shrink-0">{formatMoney(service.depositCents, service.currency, locale)}</span>
            </div>
          )}
          <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-ink-100 pt-3">
            <span className="font-semibold text-ink-900">{isOfflinePayment ? t("dueAtSalon") : t("total")}</span>
            <span className="text-2xl font-extrabold tracking-tight text-ink-900">
              {formatMoney(amountDue, service.currency, locale)}
            </span>
          </div>
        </div>
      </section>

      {error && <p className="rounded-2xl bg-berry-50 px-4 py-3 text-sm font-medium text-berry-500">{error}</p>}

      <label className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-ink-700 ring-1 ring-ink-100">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary-500"
        />
        <span>
          {locale === "vi" ? "Tôi chấp nhận " : "I accept the "}
          <button
            type="button"
            onClick={() => setShowCancellationPolicy(true)}
            className="font-semibold text-primary-600 underline hover:no-underline"
          >
            {locale === "vi" ? "Chính sách hủy bỏ" : "Cancellation Policy"}
          </button>
          {locale === "vi" ? " và VaraaAi " : " and VaraaAi "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-600 underline hover:no-underline"
          >
            {locale === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}
          </Link>
          .
        </span>
      </label>

      <div className="sticky bottom-3 z-20 flex items-center gap-3 rounded-full bg-white/90 p-2 pl-5 shadow-2xl shadow-primary-900/20 ring-1 ring-black/5 backdrop-blur-md">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-ink-400">
            {selectedSlot
              ? `${format(toZonedTime(new Date(selectedSlot.startsAt), businessTimezone), "d.M.")} · ${slotTime(selectedSlot.startsAt, businessTimezone)}`
              : L.pickTime}
          </p>
          <p className="text-base font-extrabold text-ink-900">{formatMoney(amountDue, service.currency, locale)}</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedSlot || submitting || !acceptedTerms || (isGuest && !guestFormValid)}
          className="btn-primary shrink-0 !px-6 !py-3"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isOfflinePayment ? t("confirmBooking") : t("confirmAndPay")}
        </button>
      </div>

      <p className="text-center text-xs text-ink-400">
        {locale === "vi" ? "Bằng việc tiếp tục, tôi đồng ý " : "By continuing, I agree to "}
        <Link
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline hover:no-underline"
        >
          {locale === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}
        </Link>
        {locale === "vi" ? " và " : " and "}
        <Link
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline hover:no-underline"
        >
          {locale === "vi" ? "Chính sách bảo mật" : "Privacy Policy"}
        </Link>
        {locale === "vi" ? " của VaraaAi.com." : " of VaraaAi.com."}
      </p>

      {showCancellationPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-sm animate-slide-up p-6">
            <div className="mb-3 flex items-start justify-between">
              <p className="text-lg font-bold text-ink-900">
                {locale === "vi" ? "Chính sách hủy bỏ" : "Cancellation Policy"}
              </p>
              <button onClick={() => setShowCancellationPolicy(false)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="whitespace-pre-line text-sm text-ink-700">
              {cancellationPolicy ||
                (locale === "vi"
                  ? `Bạn có thể tự hủy lịch hẹn trong hồ sơ của mình cho đến ${cancellationWindowHours} giờ trước giờ hẹn.`
                  : `You can cancel this appointment yourself, up until ${cancellationWindowHours} hours before the appointment.`)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StaffVideos({
  videoUrls,
  staffName,
  locale,
}: {
  videoUrls: string[];
  staffName: string;
  locale: string;
}) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const embeds = videoUrls.map((u) => toYoutubeEmbedUrl(u)).filter((u): u is string => !!u);
  if (embeds.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        {embeds.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setPlayingIndex((prev) => (prev === i ? null : i))}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"
          >
            <PlayCircle className="h-4 w-4" />
            {locale === "vi" ? `Xem video ${i + 1}` : `Watch video ${i + 1}`}
          </button>
        ))}
      </div>
      {playingIndex !== null && (
        <div className={embedFrameClass(embeds[playingIndex], "mt-2 rounded-xl")}>
          <iframe
            src={embeds[playingIndex]}
            title={staffName}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] border border-ink-100 bg-white p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-base font-bold text-ink-900">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
          {n}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function StaffTile({
  active,
  onClick,
  name,
  avatarUrl,
  price,
  any = false,
}: {
  active: boolean;
  onClick: () => void;
  name: string;
  avatarUrl: string | null;
  price: string | null;
  any?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-24 shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-colors ${
        active ? "border-primary-400 bg-primary-50 ring-1 ring-primary-400" : "border-ink-100 bg-white hover:border-primary-200"
      }`}
    >
      <span
        className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-base font-bold ${
          active ? "ring-2 ring-primary-500 ring-offset-2" : ""
        } ${any ? "bg-peach-100 text-primary-600" : "bg-primary-100 text-primary-700"}`}
      >
        {any ? (
          <Users className="h-5 w-5" />
        ) : avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          name.trim().charAt(0).toUpperCase() || "?"
        )}
      </span>
      <span className="line-clamp-2 w-full text-xs font-semibold leading-tight text-ink-900">{name}</span>
      {price && <span className="text-[11px] text-ink-400">{price}</span>}
    </button>
  );
}

const WEEKDAYS: Record<string, string[]> = {
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  fi: ["ma", "ti", "ke", "to", "pe", "la", "su"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
};

/** Month calendar for picking the visit date — arrows step through the
 * months up to the booking horizon (a year out), so a customer in October can
 * just as easily book November, December or next spring. Weeks start on
 * Monday, as in both Vietnam and Finland. */
function DateCalendar({
  firstDay,
  lastDay,
  selected,
  onSelect,
  locale,
  todayLabel,
}: {
  firstDay: Date;
  lastDay: Date;
  selected: Date;
  onSelect: (d: Date) => void;
  locale: string;
  todayLabel: string;
}) {
  const [month, setMonth] = useState(() => startOfMonth(selected));
  const firstMonth = startOfMonth(firstDay);
  const lastMonth = startOfMonth(lastDay);
  const canPrev = month > firstMonth;
  const canNext = month < lastMonth;

  const gridStart = startOfWeek(month, { weekStartsOn: 1 });
  const weeks = Math.ceil((differenceInCalendarDays(endOfMonth(month), gridStart) + 1) / 7);
  const cells = Array.from({ length: weeks * 7 }, (_, i) => addDays(gridStart, i));

  const monthLabel =
    locale === "vi"
      ? `Tháng ${month.getMonth() + 1}, ${month.getFullYear()}`
      : (() => {
          const label = format(month, "LLLL yyyy", { locale: locale === "fi" ? fi : undefined });
          return label.charAt(0).toUpperCase() + label.slice(1);
        })();
  const weekdays = WEEKDAYS[locale] ?? WEEKDAYS.en;
  const navBtn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-ink-100 text-ink-700 transition-colors hover:border-primary-200 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-ink-100 disabled:hover:text-ink-700";

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, -1))}
          disabled={!canPrev}
          aria-label={locale === "vi" ? "Tháng trước" : locale === "fi" ? "Edellinen kuukausi" : "Previous month"}
          className={navBtn}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-sm font-bold text-ink-900" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          disabled={!canNext}
          aria-label={locale === "vi" ? "Tháng sau" : locale === "fi" ? "Seuraava kuukausi" : "Next month"}
          className={navBtn}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map((w) => (
          <span key={w} className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
            {w}
          </span>
        ))}
        {cells.map((d) => {
          if (!isSameMonth(d, month)) return <span key={d.toISOString()} />;
          const disabled = d < firstDay || d > lastDay;
          const on = isSameDay(d, selected);
          const isToday = isSameDay(d, firstDay);
          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(d)}
              aria-pressed={on}
              aria-label={`${format(d, "yyyy-MM-dd")}${isToday ? ` (${todayLabel})` : ""}`}
              className={`relative mx-auto flex h-10 w-full max-w-[2.75rem] items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                on
                  ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md"
                  : disabled
                    ? "cursor-not-allowed text-ink-400/40"
                    : isToday
                      ? "bg-primary-50 text-primary-700 hover:bg-primary-100"
                      : "text-ink-900 hover:bg-mist-100"
              }`}
            >
              {format(d, "d")}
              {isToday && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${on ? "bg-white" : "bg-primary-500"}`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
