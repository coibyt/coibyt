"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { addDays, format, isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { Link } from "@/i18n/navigation";
import { SignInForm } from "@/components/guest-booking-auth";
import { EmbedTopBar } from "@/components/embed-topbar";
import { EmbedBookingProgress } from "@/components/embed-booking-progress";
import { formatMoney } from "@/lib/money";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";
import { embedFrameClass, toYoutubeEmbedUrl } from "@/lib/youtube";
import { Landmark, Banknote, Loader2, PlayCircle, X } from "lucide-react";

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

const DAYS_AHEAD = 14;
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

  const days = useMemo(
    () => Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(todayInBusinessTz, i)),
    [todayInBusinessTz]
  );
  const initialDay = initialDate ? days.find((d) => format(d, "yyyy-MM-dd") === initialDate) : undefined;
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

  return (
    <div className="space-y-6">
      {progressBar}
      {addOnOptions.length > 0 && (
        <div>
          <p className="label">
            {locale === "vi" ? "Dịch vụ phụ (không bắt buộc)" : "Add-ons (optional)"}
          </p>
          <div className="space-y-2">
            {addOnOptions.map((a) => (
              <label
                key={a.id}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                  selectedAddOnIds.has(a.id)
                    ? "border-primary-500 bg-primary-50"
                    : "border-ink-100 hover:border-ink-400"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedAddOnIds.has(a.id)}
                    onChange={() => toggleAddOn(a.id)}
                  />
                  <span>
                    {a.name}
                    {a.durationMin > 0 && (
                      <span className="ml-1.5 text-xs text-ink-400">
                        +{a.durationMin} {tCommon("min")}
                      </span>
                    )}
                  </span>
                </span>
                <span className="font-medium text-ink-900">
                  +{formatMoney(a.priceCents, service.currency, locale)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {extraServices.length > 0 && (
        <div>
          <p className="label">
            {locale === "vi" ? "Dịch vụ đã chọn thêm" : "Also booking"}
          </p>
          <div className="space-y-2">
            {extraServices.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-mist-50 px-3 py-2.5 text-sm"
              >
                <span>
                  {s.name}
                  <span className="ml-1.5 text-xs text-ink-400">
                    {s.durationMin} {tCommon("min")}
                  </span>
                </span>
                <span className="font-medium text-ink-900">
                  {formatMoney(s.priceCents, service.currency, locale)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {staffOptions.length > 0 && (
        <div>
          <p className="label">{t("selectStaff")}</p>
          <div className="flex flex-wrap gap-2">
            <Pill active={staffId === ""} onClick={() => setStaffId("")}>
              {t("anyStaff")}
              {cheapestStaff && (
                <span className="ml-1 opacity-70">
                  ·{" "}
                  {formatMoney(
                    cheapestStaff.priceCentsOverride ?? service.priceCents,
                    service.currency,
                    locale
                  )}
                </span>
              )}
            </Pill>
            {staffOptions.map((s) => (
              <Pill key={s.id} active={staffId === s.id} onClick={() => setStaffId(s.id)}>
                {s.name}
                {(s.priceCentsOverride !== null || s.durationMinOverride !== null) && (
                  <span className="ml-1 opacity-70">
                    · {formatMoney(s.priceCentsOverride ?? service.priceCents, service.currency, locale)}
                  </span>
                )}
              </Pill>
            ))}
          </div>
          {selectedStaff && (
            <p className="mt-2 text-xs text-ink-400">
              {formatMoney(selectedStaff.priceCentsOverride ?? service.priceCents, service.currency, locale)}
              {" · "}
              {selectedStaff.durationMinOverride ?? service.durationMin} {tCommon("min")}
            </p>
          )}
          {selectedStaff?.staffMessage && (
            <p className="mt-2 rounded-xl bg-mist-50 p-2.5 text-sm text-ink-700">
              {selectedStaff.staffMessage}
            </p>
          )}
          {selectedStaff && selectedStaff.videoUrls.length > 0 && (
            <StaffVideos videoUrls={selectedStaff.videoUrls} staffName={selectedStaff.name} locale={locale} />
          )}
        </div>
      )}

      <div>
        <p className="label">{t("selectDate")}</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => (
            <button
              key={d.toISOString()}
              onClick={() => setSelectedDate(d)}
              className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2.5 text-sm transition-colors ${
                isSameDay(d, selectedDate)
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-100 text-ink-700 hover:border-ink-400"
              }`}
            >
              <span className="text-xs opacity-70">
                {format(d, "EEE", { locale: locale === "vi" ? vi : undefined })}
              </span>
              <span className="text-base font-bold">{format(d, "d")}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label">{t("selectTime")}</p>
        {showLocalTime && (
          <p className="mb-2 text-xs text-ink-400">
            {locale === "vi"
              ? `Giờ hiển thị là giờ salon (${businessTimezone}) — giờ của bạn hiện theo dưới mỗi khung giờ.`
              : `Times shown are the salon's local time (${businessTimezone}) — your own local time is shown under each slot.`}
          </p>
        )}
        {loadingSlots ? (
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> ...
          </p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-ink-400">{t("noSlots")}</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {slots.map((s) => (
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
                className={`relative rounded-xl border py-2 text-sm transition-colors ${
                  selectedSlot?.startsAt === s.startsAt
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-100 text-ink-700 hover:border-ink-400"
                }`}
              >
                {s.assignments && (
                  <span
                    className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${
                      selectedSlot?.startsAt === s.startsAt ? "bg-white" : "bg-primary-500"
                    }`}
                  />
                )}
                <span className="block">
                  {new Date(s.startsAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: businessTimezone,
                  })}
                </span>
                {showLocalTime && (
                  <span
                    className={`block text-[11px] font-normal ${
                      selectedSlot?.startsAt === s.startsAt ? "text-white/70" : "text-ink-400"
                    }`}
                  >
                    {new Date(s.startsAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: viewerTimezone ?? undefined,
                    })}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        {selectedSlot?.assignments && (
          <div className="mt-3 rounded-xl border border-primary-200 bg-primary-50 p-3 text-sm">
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
                  <span className="shrink-0 text-xs text-ink-400">
                    {new Date(a.startsAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: businessTimezone,
                    })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedSlot && isGuest && (
        <div className="card space-y-4 p-4">
          <p className="font-semibold text-ink-900">
            {locale === "vi" ? "Thông tin của bạn" : "Your info"}
          </p>
          {!showSignIn ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="label">{tAuth("name")}</label>
                  <input
                    required
                    className="input"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
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

              <div>
                <p className="label">
                  {locale === "vi"
                    ? "Bạn muốn nhận tin nhắn và thông báo tiếp thị bằng cách nào?"
                    : "How would you like to receive marketing messages?"}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-ink-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={emailOptIn}
                      onChange={(e) => setEmailOptIn(e.target.checked)}
                    />
                    {locale === "vi" ? "Qua email" : "By email"}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
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
                  className="font-medium text-primary-500 hover:underline"
                >
                  {tAuth("signInInstead")}
                </button>
              </p>
            </>
          ) : (
            <>
              <SignInForm />
              <p className="text-center text-sm text-ink-400">
                <button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  className="font-medium text-primary-500 hover:underline"
                >
                  {locale === "vi" ? "Quay lại đặt lịch với thông tin mới" : "Back to booking as a new customer"}
                </button>
              </p>
            </>
          )}
        </div>
      )}

      <div>
        <label className="label" htmlFor="note">
          {t("note")}
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="input"
        />
      </div>

      <div>
        <p className="label">{tPay("choose")}</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {paymentMethods.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setProvider(id)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border py-3 text-xs font-medium transition-colors ${
                provider === id
                  ? "border-primary-500 bg-primary-50 text-primary-600"
                  : "border-ink-100 text-ink-700 hover:border-ink-400"
              }`}
            >
              <Icon className="h-5 w-5" />
              {tPay(id === "BANK_TRANSFER" ? "bankTransfer" : "cash")}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-400">
          {provider === "CASH"
            ? tPay("cashNotice")
            : provider === "BANK_TRANSFER"
              ? tPay("bankTransferNotice")
              : tPay("sandboxNotice")}
        </p>
        {provider === "BANK_TRANSFER" && bankInfo && (
          <div className="mt-2 space-y-1 rounded-xl border border-primary-100 bg-primary-50 p-3 text-xs text-ink-900">
            {bankInfo.bankName && (
              <p>
                <span className="text-ink-400">{locale === "vi" ? "Ngân hàng: " : "Bank: "}</span>
                {bankInfo.bankName}
              </p>
            )}
            {bankInfo.bankAccountNumber && (
              <p>
                <span className="text-ink-400">
                  {locale === "vi" ? "Số tài khoản: " : "Account number: "}
                </span>
                {bankInfo.bankAccountNumber}
              </p>
            )}
            {bankInfo.bankAccountName && (
              <p>
                <span className="text-ink-400">
                  {locale === "vi" ? "Chủ tài khoản: " : "Account holder: "}
                </span>
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
            {discountChecking ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : locale === "vi" ? (
              "Áp dụng"
            ) : (
              "Apply"
            )}
          </button>
        </div>
        {discount && (
          <p className="mt-1 text-xs text-sage-600">
            {locale === "vi"
              ? `Đã áp dụng "${discount.name}" (-${discount.percent}%)`
              : `"${discount.name}" applied (-${discount.percent}%)`}
          </p>
        )}
        {discountError && <p className="mt-1 text-xs text-berry-500">{discountError}</p>}
      </div>

      <div className="card space-y-2 p-4">
        <div className="flex justify-between text-sm text-ink-700">
          <span>{service.name}</span>
          <span>{formatMoney(effectiveServicePriceCents, service.currency, locale)}</span>
        </div>
        {extraServices.map((s) => (
          <div key={s.id} className="flex justify-between text-sm text-ink-700">
            <span>{s.name}</span>
            <span>{formatMoney(s.priceCents, service.currency, locale)}</span>
          </div>
        ))}
        {selectedAddOns.map((a) => (
          <div key={a.id} className="flex justify-between text-sm text-ink-700">
            <span>{a.name}</span>
            <span>{formatMoney(a.priceCents, service.currency, locale)}</span>
          </div>
        ))}
        {discount && (
          <div className="flex justify-between text-sm text-sage-600">
            <span>
              {discount.name} (-{discount.percent}%)
            </span>
            <span>-{formatMoney(discountCents, service.currency, locale)}</span>
          </div>
        )}
        {!isOfflinePayment && service.depositCents && (
          <div className="flex justify-between text-sm text-ink-400">
            <span>{t("deposit")}</span>
            <span>{formatMoney(service.depositCents, service.currency, locale)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ink-100 pt-2 font-bold text-ink-900">
          <span>{isOfflinePayment ? t("dueAtSalon") : t("total")}</span>
          <span>{formatMoney(amountDue, service.currency, locale)}</span>
        </div>
      </div>

      {error && <p className="text-sm text-berry-500">{error}</p>}

      <label className="flex items-start gap-2.5 text-sm text-ink-700">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          {locale === "vi" ? "Tôi chấp nhận " : "I accept the "}
          <button
            type="button"
            onClick={() => setShowCancellationPolicy(true)}
            className="font-medium text-primary-600 underline hover:no-underline"
          >
            {locale === "vi" ? "Chính sách hủy bỏ" : "Cancellation Policy"}
          </button>
          {locale === "vi" ? " và VaraaAi " : " and VaraaAi "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary-600 underline hover:no-underline"
          >
            {locale === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}
          </Link>
          .
        </span>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!selectedSlot || submitting || !acceptedTerms || (isGuest && !guestFormValid)}
        className="btn-primary w-full py-3"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isOfflinePayment ? t("confirmBooking") : t("confirmAndPay")}
      </button>

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

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-ink-900 bg-ink-900 text-white"
          : "border-ink-100 text-ink-700 hover:border-ink-400"
      }`}
    >
      {children}
    </button>
  );
}
