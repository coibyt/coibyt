"use client";

import { useTranslations } from "next-intl";

const COLORS: Record<string, string> = {
  PENDING_PAYMENT: "bg-coral-50 text-coral-600",
  CONFIRMED: "bg-teal-50 text-teal-500",
  COMPLETED: "bg-sage-50 text-sage-500",
  CANCELLED: "bg-mist-100 text-ink-400",
  NO_SHOW: "bg-berry-50 text-berry-500",
};

export function BookingStatusBadge({ status }: { status: string }) {
  const t = useTranslations("booking.status");
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${COLORS[status] ?? ""}`}
    >
      {t(status as never)}
    </span>
  );
}
