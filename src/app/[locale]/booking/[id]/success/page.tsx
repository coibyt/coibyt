import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { CancellationPolicyLink } from "@/components/cancellation-policy-link";

export default async function BookingSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ provider?: string }>;
}) {
  const { locale, id } = await params;
  const { provider } = await searchParams;
  const isCash = provider === "cash";
  const isBankTransfer = provider === "bank_transfer";
  const t = await getTranslations("payment");

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { business: true, service: true, addOns: true, extraServices: true },
  });
  if (!booking) notFound();

  return (
    <div className="container flex max-w-lg flex-col items-center gap-4 py-20 text-center">
      <CheckCircle2 className="h-14 w-14 text-sage-500" />
      <h1 className="text-2xl font-bold text-ink-900">
        {isCash || isBankTransfer
          ? locale === "vi"
            ? "Đặt lịch thành công!"
            : "Booking confirmed!"
          : t("success")}
      </h1>
      <div className="card w-full space-y-2 p-5 text-left">
        <p className="font-semibold text-ink-900">{booking.service.name}</p>
        <p className="text-sm text-ink-400">{booking.business.name}</p>
        <p className="text-sm text-ink-700">
          {booking.startsAt.toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: booking.business.timezone,
          })}
        </p>
        {booking.extraServices.map((s) => (
          <p key={s.id} className="text-sm text-ink-700">
            + {s.name} ({formatMoney(s.priceCents, booking.currency, locale)})
          </p>
        ))}
        {booking.addOns.map((a) => (
          <p key={a.id} className="text-sm text-ink-700">
            + {a.name} ({formatMoney(a.priceCents, booking.currency, locale)})
          </p>
        ))}
        <div className="flex items-center justify-between border-t border-ink-100 pt-2">
          <span className="text-sm text-ink-400">{isCash ? t("cash") : undefined}</span>
          <span className="font-bold text-ink-900">
            {formatMoney(booking.priceCents, booking.currency, locale)}
          </span>
        </div>
      </div>
      {isCash && <p className="text-sm text-ink-400">{t("cashNotice")}</p>}
      {isBankTransfer && (
        <div className="w-full space-y-2 text-left">
          <p className="text-sm text-ink-400">{t("bankTransferNotice")}</p>
          {(booking.business.bankName || booking.business.bankAccountNumber) && (
            <div className="space-y-1 rounded-xl border border-primary-100 bg-primary-50 p-3 text-xs text-ink-900">
              {booking.business.bankName && (
                <p>
                  <span className="text-ink-400">{locale === "vi" ? "Ngân hàng: " : "Bank: "}</span>
                  {booking.business.bankName}
                </p>
              )}
              {booking.business.bankAccountNumber && (
                <p>
                  <span className="text-ink-400">
                    {locale === "vi" ? "Số tài khoản: " : "Account number: "}
                  </span>
                  {booking.business.bankAccountNumber}
                </p>
              )}
              {booking.business.bankAccountName && (
                <p>
                  <span className="text-ink-400">
                    {locale === "vi" ? "Chủ tài khoản: " : "Account holder: "}
                  </span>
                  {booking.business.bankAccountName}
                </p>
              )}
              {booking.business.bankBic && (
                <p>
                  <span className="text-ink-400">BIC/SWIFT: </span>
                  {booking.business.bankBic}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      <Link href="/account/bookings" className="btn-primary">
        {locale === "vi" ? "Xem lịch hẹn của tôi" : "View my bookings"}
      </Link>
      {booking.business.cancellationPolicy && (
        <CancellationPolicyLink policy={booking.business.cancellationPolicy} locale={locale} />
      )}
    </div>
  );
}
