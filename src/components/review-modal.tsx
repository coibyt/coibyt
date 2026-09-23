"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Loader2, X } from "lucide-react";

export function ReviewModal({
  bookingId,
  onClose,
  onSubmitted,
}: {
  bookingId: string;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  const t = useTranslations("review");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId, rating, comment: comment || undefined }),
    });
    setSaving(false);
    if (res.ok) onSubmitted();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-sm animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">{t("title")}</h3>
          <button onClick={onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="label">{t("ratingLabel")}</p>
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)}>
              <Star
                className={`h-7 w-7 ${
                  i < rating ? "fill-coral-500 text-coral-500" : "text-ink-100"
                }`}
              />
            </button>
          ))}
        </div>
        <textarea
          className="input"
          rows={3}
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={submit} disabled={saving} className="btn-primary mt-4 w-full">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("submit")}
        </button>
      </div>
    </div>
  );
}
