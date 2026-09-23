"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { addDays, format, isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { vi } from "date-fns/locale";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { CreditCard, Landmark, Banknote, Loader2 } from "lucide-react";

interface StaffOption {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface ServiceInfo {
  id: string;
  name: string;
  priceCents: number;
  depositCents: number | null;
  currency: string;
  durationMin: number;
}

interface Slot {
  startsAt: string;
  endsAt: string;
  staffId: string;
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
const PAYMENT_METHODS = [
  { id: "CASH", icon: Banknote },
  { id: "BANK_TRANSFER", icon: Landmark },
  { id: "STRIPE", icon: CreditCard },
] as const;

export function BookingWidget({
  businessSlug,
  service,
  staffOptions,
  addOnOptions,
  extraServices = [],
  bankInfo,
  locale,
  businessTimezone,
}: {
  businessSlug: string;
  service: ServiceInfo;
  staffOptions: StaffOption[];
  addOnOptions: AddOnOption[];
  extraServices?: ExtraServiceInfo[];
  bankInfo?: BankInfo | null;
  locale: string;
  businessTimezone: string;
}) {
  const t = useTranslations("service");
  const tPay = useTranslations("payment");
  const tCommon = useTranslations("common");
  const { data: session, status } = useSession();

  // "Today" and every date/time shown here is anchored to the SALON's
  // timezone, not the visitor's device — a customer booking a Hanoi salon
  // from abroad (or with a misconfigured clock) must still see Hanoi time.
  const todayInBusinessTz = useMemo(
    () => toZonedTime(new Date(), businessTimezone),
    [businessTimezone]
  );

  const [staffId, setStaffId] = useState<string>("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<Set<string>>(new Set());
  const [selectedDate, setSelectedDate] = useState(todayInBusinessTz);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [provider, setProvider] = useState<(typeof PAYMENT_METHODS)[number]["id"]>("CASH");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(
    () => Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(todayInBusinessTz, i)),
    [todayInBusinessTz]
  );

  const selectedAddOns = addOnOptions.filter((a) => selectedAddOnIds.has(a.id));
  const addOnPriceSum = selectedAddOns.reduce((sum, a) => sum + a.priceCents, 0);
  const addOnIdsKey = Array.from(selectedAddOnIds).sort().join(",");
  const extraServicePriceSum = extraServices.reduce((sum, s) => sum + s.priceCents, 0);
  const extraServiceIdsKey = extraServices.map((s) => s.id).join(",");

  const hasBankInfo = !!(bankInfo?.bankName && bankInfo?.bankAccountNumber);
  const paymentMethods = PAYMENT_METHODS.filter((m) => m.id !== "BANK_TRANSFER" || hasBankInfo);

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
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [businessSlug, service.id, staffId, selectedDate, addOnIdsKey, extraServiceIdsKey]);

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
          staffId: staffId || selectedSlot.staffId,
          startsAt: selectedSlot.startsAt,
          customerNote: note || undefined,
          paymentProvider: provider,
          addOnIds: Array.from(selectedAddOnIds),
          extraServiceIds: extraServices.map((s) => s.id),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error === "SLOT_UNAVAILABLE" ? t("noSlots") : tPay("failed"));
        return;
      }
      window.location.href = data.redirectUrl;
    } catch {
      setError(tPay("failed"));
    } finally {
      setSubmitting(false);
    }
  }

  const totalServiceCents = service.priceCents + addOnPriceSum + extraServicePriceSum;
  const isOfflinePayment = provider === "CASH" || provider === "BANK_TRANSFER";

  // Paying online can be for just the deposit; cash and bank transfer always
  // mean the full price, since there's no online step to collect a deposit.
  const amountDue = isOfflinePayment ? totalServiceCents : service.depositCents ?? totalServiceCents;

  if (status === "unauthenticated") {
    return (
      <div className="card p-8 text-center">
        <p className="mb-4 text-ink-700">
          {locale === "vi"
            ? "Vui lòng đăng nhập để đặt lịch."
            : "Please sign in to book an appointment."}
        </p>
        <Link href="/auth/sign-in" className="btn-primary">
          {locale === "vi" ? "Đăng nhập" : "Sign in"}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            </Pill>
            {staffOptions.map((s) => (
              <Pill key={s.id} active={staffId === s.id} onClick={() => setStaffId(s.id)}>
                {s.name}
              </Pill>
            ))}
          </div>
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
                className={`rounded-xl border py-2 text-sm transition-colors ${
                  selectedSlot?.startsAt === s.startsAt
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-100 text-ink-700 hover:border-ink-400"
                }`}
              >
                {new Date(s.startsAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: businessTimezone,
                })}
              </button>
            ))}
          </div>
        )}
      </div>

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
              {tPay(id === "BANK_TRANSFER" ? "bankTransfer" : (id.toLowerCase() as "cash" | "stripe"))}
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

      <div className="card space-y-2 p-4">
        <div className="flex justify-between text-sm text-ink-700">
          <span>{service.name}</span>
          <span>{formatMoney(service.priceCents, service.currency, locale)}</span>
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

      <button
        onClick={handleSubmit}
        disabled={!selectedSlot || submitting}
        className="btn-primary w-full py-3"
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isOfflinePayment ? t("confirmBooking") : t("confirmAndPay")}
      </button>
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
