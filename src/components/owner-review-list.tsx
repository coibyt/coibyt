"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface ReviewRow {
  id: string;
  rating: number;
  comment: string | null;
  ownerReply: string | null;
  customerName: string;
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

function ReviewRowItem({ review, locale }: { review: ReviewRow; locale: string }) {
  const router = useRouter();
  const [replying, setReplying] = useState(false);
  const [reply, setReply] = useState(review.ownerReply ?? "");
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-ink-900">{review.customerName}</p>
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
      {review.comment && <p className="mt-2 text-sm text-ink-700">{review.comment}</p>}

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
