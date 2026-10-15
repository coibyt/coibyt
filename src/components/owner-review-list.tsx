"use client";

import { useState } from "react";
import { Star, Loader2, Check, EyeOff } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

type ReviewStatus = "PENDING" | "APPROVED" | "HIDDEN";

interface ReviewRow {
  id: string;
  rating: number;
  comment: string | null;
  ownerReply: string | null;
  customerName: string;
  status: ReviewStatus;
}

export function OwnerReviewList({
  reviews,
  locale,
}: {
  reviews: ReviewRow[];
  locale: string;
}) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-ink-400">
        {locale === "vi" ? "Chưa có đánh giá nào." : "No reviews yet."}
      </p>
    );
  }
  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <ReviewRowItem key={r.id} review={r} locale={locale} />
      ))}
    </div>
  );
}

function statusBadge(status: ReviewStatus, locale: string) {
  if (status === "APPROVED") {
    return (
      <span className="rounded-full bg-sage-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-sage-600">
        {locale === "vi" ? "ĐÃ CÔNG KHAI" : "PUBLISHED"}
      </span>
    );
  }
  if (status === "HIDDEN") {
    return (
      <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-ink-400">
        {locale === "vi" ? "ĐÃ ẨN" : "HIDDEN"}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-bold tracking-wide text-coral-600">
      {locale === "vi" ? "CHỜ DUYỆT" : "AWAITING REVIEW"}
    </span>
  );
}

function ReviewRowItem({ review, locale }: { review: ReviewRow; locale: string }) {
  const router = useRouter();
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState(review.ownerReply ?? "");
  const [saving, setSaving] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  async function submitReply() {
    setSaving(true);
    await fetch(`/api/business/reviews/${review.id}/reply`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    });
    setSaving(false);
    setReplying(false);
    router.refresh();
  }

  async function setStatus(status: "APPROVED" | "HIDDEN") {
    setUpdatingStatus(true);
    await fetch(`/api/business/reviews/${review.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingStatus(false);
    router.refresh();
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-ink-900">{review.customerName}</p>
        <div className="flex items-center gap-2">
          {statusBadge(review.status, locale)}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < review.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {review.comment && <p className="mt-2 text-sm text-ink-700">{review.comment}</p>}

      <div className="mt-3 flex gap-2">
        {review.status !== "APPROVED" && (
          <button
            onClick={() => setStatus("APPROVED")}
            disabled={updatingStatus}
            className="flex items-center gap-1 rounded-full bg-sage-50 px-3 py-1.5 text-xs font-medium text-sage-600 hover:bg-sage-100 disabled:opacity-50"
          >
            <Check className="h-3.5 w-3.5" />
            {locale === "vi" ? "Công khai lên trang salon" : "Publish on salon page"}
          </button>
        )}
        {review.status !== "HIDDEN" && (
          <button
            onClick={() => setStatus("HIDDEN")}
            disabled={updatingStatus}
            className="flex items-center gap-1 rounded-full border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-ink-400 disabled:opacity-50"
          >
            <EyeOff className="h-3.5 w-3.5" />
            {locale === "vi" ? "Ẩn đánh giá này" : "Hide this review"}
          </button>
        )}
      </div>

      {review.ownerReply && !replying ? (
        <div className="mt-3 rounded-xl bg-mist-50 p-3 text-sm text-ink-700">
          {review.ownerReply}
        </div>
      ) : replying ? (
        <div className="mt-3 space-y-2">
          <textarea
            className="input"
            rows={2}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <button onClick={submitReply} disabled={saving} className="btn-primary !px-3 !py-1.5 text-xs">
            {saving && <Loader2 className="h-3 w-3 animate-spin" />}
            {locale === "vi" ? "Gửi" : "Send"}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setReplying(true)}
          className="mt-2 text-xs font-medium text-primary-500"
        >
          {locale === "vi" ? "Trả lời" : "Reply"}
        </button>
      )}
    </div>
  );
}
