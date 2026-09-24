"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { ReviewModal } from "@/components/review-modal";
import { Link, useRouter } from "@/i18n/navigation";
import { useViewerTimezone } from "@/hooks/use-viewer-timezone";
import { X } from "lucide-react";

interface BookingRow {
  id: string;
  startsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  businessName: string;
  businessSlug: string;
  businessTimezone: string;
  businessAddress: string | null;
  businessPhone: string | null;
  businessGoogleMapsUrl: string | null;
  cancellationPolicy: string | null;
  cancellationWindowHours: number;
  staffName: string | null;
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
  const [detailFor, setDetailFor] = useState<BookingRow | null>(null);
  const [confirmingCancel, setConfirmingCancel] = useState(false);

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
      setConfirmingCancel(false);
      return;
    }
    setDetailFor(null);
    setConfirmingCancel(false);
    router.refresh();
  }

  function formatDateTime(iso: string, tz: string) {
    return new Date(iso).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: tz,
    });
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
              {formatDateTime(b.startsAt, b.businessTimezone)}
              {viewerTimezone && viewerTimezone !== b.businessTimezone && (
                <span>
                  {" · "}
                  {locale === "vi" ? "giờ của bạn: " : "your time: "}
                  {formatDateTime(b.startsAt, viewerTimezone)}
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
            <button
              onClick={() => setDetailFor(b)}
              className="btn-outline !px-3 !py-1.5 text-xs"
            >
              {locale === "vi" ? "Xem thông tin đặt chỗ" : "View booking details"}
            </button>
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

      {detailFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-md animate-slide-up p-6">
            <div className="mb-3 flex items-start justify-between">
              <p className="font-bold text-ink-900">{detailFor.businessName}</p>
              <button
                onClick={() => {
                  setDetailFor(null);
                  setConfirmingCancel(false);
                }}
                className="text-ink-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="font-medium text-ink-900">{detailFor.serviceName}</p>
              {detailFor.staffName && <p className="text-ink-700">{detailFor.staffName}</p>}
              <p className="text-ink-700">{formatDateTime(detailFor.startsAt, detailFor.businessTimezone)}</p>
              {detailFor.businessAddress && <p className="text-ink-700">{detailFor.businessAddress}</p>}
              {detailFor.businessPhone && (
                <p className="text-ink-700">
                  <a href={`tel:${detailFor.businessPhone}`} className="hover:underline">
                    {detailFor.businessPhone}
                  </a>
                </p>
              )}
              {detailFor.businessGoogleMapsUrl && (
                <a
                  href={detailFor.businessGoogleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-primary-600 hover:underline"
                >
                  {locale === "vi" ? "Xem trên Google Maps" : "View on Google Maps"}
                </a>
              )}
              <p className="font-semibold text-ink-900">
                {formatMoney(detailFor.priceCents, detailFor.currency, locale)}
              </p>
              <BookingStatusBadge status={detailFor.status} />
            </div>

            {["PENDING_PAYMENT", "CONFIRMED"].includes(detailFor.status) && (
              <div className="mt-4 border-t border-ink-100 pt-4">
                {!confirmingCancel ? (
                  <button
                    onClick={() => setConfirmingCancel(true)}
                    className="btn-outline !border-berry-400 !px-3 !py-1.5 text-xs !text-berry-500"
                  >
                    {t("cancel")}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-ink-900">
                      {locale === "vi" ? "Chính sách hủy đặt chỗ" : "Cancellation policy"}
                    </p>
                    <p className="whitespace-pre-line rounded-lg bg-mist-50 p-2.5 text-xs text-ink-700">
                      {detailFor.cancellationPolicy ||
                        (locale === "vi"
                          ? `Bạn có thể tự hủy đến ${detailFor.cancellationWindowHours} giờ trước giờ hẹn.`
                          : `You can cancel yourself up until ${detailFor.cancellationWindowHours} hours before the appointment.`)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        disabled={cancelling === detailFor.id}
                        onClick={() => cancel(detailFor.id)}
                        className="btn-primary !bg-berry-500 !px-3 !py-1.5 text-xs hover:!bg-berry-600"
                      >
                        {locale === "vi" ? "Xác nhận hủy" : "Confirm cancellation"}
                      </button>
                      <button
                        onClick={() => setConfirmingCancel(false)}
                        className="btn-ghost !px-3 !py-1.5 text-xs"
                      >
                        {locale === "vi" ? "Không hủy" : "Keep booking"}
                      </button>
                    </div>
                    {error?.id === detailFor.id && (
                      <p className="text-xs text-berry-500">{error.message}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
