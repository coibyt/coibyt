import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

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
  const t = await getTranslations("payment");

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { business: true, service: true, addOns: true },
  });
  if (!booking) notFound();

  return (
    <div className="container flex max-w-lg flex-col items-center gap-4 py-20 text-center">
      <CheckCircle2 className="h-14 w-14 text-sage-500" />
      <h1 className="text-2xl font-bold text-ink-900">
        {isCash
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
        {booking.addOns.map((a) => (
          <p key={a.id} className="text-sm text-ink-700">
            + {a.name} ({formatMoney(a.priceCents, booking.currency, locale)})
          </p>
        ))}
        <div className="flex items-center justify-between border-t border-ink-100 pt-2">
          <span className="text-sm text-ink-400">
            {isCash ? t("cash") : undefined}
          </span>
          <span className="font-bold text-ink-900">
            {formatMoney(booking.priceCents, booking.currency, locale)}
          </span>
        </div>
      </div>
      {isCash && <p className="text-sm text-ink-400">{t("cashNotice")}</p>}
      <Link href="/account/bookings" className="btn-primary">
        {locale === "vi" ? "Xem lịch hẹn của tôi" : "View my bookings"}
      </Link>
    </div>
  );
}
