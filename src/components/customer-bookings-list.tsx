"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { ReviewModal } from "@/components/review-modal";
import { Link, useRouter } from "@/i18n/navigation";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";

interface BookingRow {
  id: string;
  startsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  businessName: string;
  businessSlug: string;
  businessTimezone: string;
  serviceName: string;
  hasReview: boolean;
}

export function CustomerBookingsList({
  bookings,
  locale,
}: {
  bookings: BookingRow[];
  locale: string;
}) {
  const t = useTranslations("booking");
  const router = useRouter();
  const viewerTimezone = useViewerTimezone();
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [error, setError] = useState<{ id: string; message: string } | null>(null);

  async function cancel(id: string) {
    setCancelling(id);
    setError(null);
    const res = await fetch(`/api/bookings/${id}/cancel`, { method: "POST" });
    setCancelling(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.error === "CANCELLATION_WINDOW_PASSED") {
        setError({
          id,
          message:
            locale === "vi"
              ? "Đã quá thời hạn tự hủy lịch hẹn. Vui lòng liên hệ salon để hủy."
              : "It's too late to cancel this yourself. Please contact the salon directly.",
        });
      }
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <div key={b.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <Link href={`/b/${b.businessSlug}`} className="font-semibold text-ink-900 hover:underline">
              {b.businessName}
            </Link>
            <p className="text-sm text-ink-700">{b.serviceName}</p>
            <p className="text-xs text-ink-400">
              {new Date(b.startsAt).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: b.businessTimezone,
              })}
              {viewerTimezone && viewerTimezone !== b.businessTimezone && (
                <span>
                  {" · "}
                  {locale === "vi" ? "giờ của bạn: " : "your time: "}
                  {new Date(b.startsAt).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: viewerTimezone,
                  })}
                </span>
              )}
            </p>
            {error?.id === b.id && <p className="mt-1 text-xs text-berry-500">{error.message}</p>}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-ink-900">
              {formatMoney(b.priceCents, b.currency, locale)}
            </span>
            <BookingStatusBadge status={b.status} />
            {["PENDING_PAYMENT", "CONFIRMED"].includes(b.status) && (
              <button
                onClick={() => cancel(b.id)}
                disabled={cancelling === b.id}
                className="btn-ghost !px-3 !py-1.5 text-xs text-berry-500"
              >
                {t("cancel")}
              </button>
            )}
            {b.status === "COMPLETED" && !b.hasReview && (
              <button
                onClick={() => setReviewingId(b.id)}
                className="btn-outline !px-3 !py-1.5 text-xs"
              >
                {t("leaveReview")}
              </button>
            )}
          </div>
        </div>
      ))}

      {reviewingId && (
        <ReviewModal
          bookingId={reviewingId}
          onClose={() => setReviewingId(null)}
          onSubmitted={() => {
            setReviewingId(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
