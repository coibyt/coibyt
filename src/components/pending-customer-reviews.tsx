"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, ChevronDown, Star, X } from "lucide-react";

interface PendingReview {
  id: string;
  rating: number;
  note: string | null;
  customerName: string;
  bookingId: string;
  startsAt: string;
  serviceName: string;
  staffName: string | null;
}

/** Fired when the owner approves or declines a staff member's rating, so the
 * calendar popup and this list stay in step. */
export const CUSTOMER_REVIEW_EVENT = "varaaai:customer-review";
export type CustomerReviewEventDetail = { bookingId: string; approved: boolean };

/** The owner's list of staff ratings of customers waiting for approval —
 * nothing reaches the customer until one is approved here (or in the
 * booking's popup). Renders nothing when none are waiting. */
export function PendingCustomerReviews({ locale, timezone }: { locale: string; timezone: string }) {
  const vi = locale === "vi";
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch("/api/business/customer-reviews")
      .then((r) => (r.ok ? r.json() : { reviews: [] }))
      .then((d: { reviews: PendingReview[] }) => setReviews(d.reviews))
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
    window.addEventListener(CUSTOMER_REVIEW_EVENT, load);
    return () => window.removeEventListener(CUSTOMER_REVIEW_EVENT, load);
  }, [load]);

  async function decide(r: PendingReview, approve: boolean) {
    setBusy(r.id);
    const res = await fetch(`/api/business/customer-reviews/${r.id}`, { method: approve ? "PATCH" : "DELETE" });
    setBusy(null);
    if (!res.ok) return;
    setReviews((prev) => prev.filter((x) => x.id !== r.id));
    window.dispatchEvent(
      new CustomEvent<CustomerReviewEventDetail>(CUSTOMER_REVIEW_EVENT, { detail: { bookingId: r.bookingId, approved: approve } })
    );
  }

  if (reviews.length === 0) return null;

  const when = (iso: string) =>
    new Date(iso).toLocaleString(vi ? "vi-VN" : locale, {
      timeZone: timezone,
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="rounded-3xl border border-amber-200 bg-amber-50/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-ink-900">
            {vi
              ? `${reviews.length} đánh giá khách hàng chờ duyệt`
              : `${reviews.length} customer rating${reviews.length > 1 ? "s" : ""} waiting for approval`}
          </span>
          <span className="block text-xs text-ink-500">
            {vi
              ? "Nhân viên đã chấm sao — khách chỉ nhận email sau khi bạn duyệt."
              : "Rated by your staff — the customer is emailed only once you approve."}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="space-y-2 px-3 pb-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink-900">{r.customerName}</p>
                  <p className="text-xs text-ink-500">
                    {r.serviceName} · {when(r.startsAt)}
                    {r.staffName ? ` · ${vi ? "Chấm bởi" : "By"} ${r.staffName}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"}`}
                    />
                  ))}
                </div>
              </div>
              {r.note && <p className="mt-1.5 rounded-xl bg-ink-50 px-2.5 py-1.5 text-xs text-ink-700">{r.note}</p>}
              <div className="mt-2.5 flex gap-2">
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => decide(r, true)}
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  <Check className="h-3.5 w-3.5" />
                  {vi ? "Duyệt" : "Approve"}
                </button>
                <button
                  type="button"
                  disabled={busy === r.id}
                  onClick={() => decide(r, false)}
                  className="inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-700 hover:bg-ink-50 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                  {vi ? "Không duyệt" : "Decline"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
