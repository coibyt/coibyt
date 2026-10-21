"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Loader2, X, ImagePlus } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export function ProductReviewModal({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const t = useTranslations("review");
  const tProducts = useTranslations("business.productsPage");
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function submit() {
    setSaving(true);
    setError(null);
    const body = new FormData();
    body.append("rating", String(rating));
    if (comment) body.append("comment", comment);
    images.forEach((f) => body.append("images", f));

    const res = await fetch(`/api/products/${productId}/reviews`, { method: "POST", body });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error === "ALREADY_REVIEWED" ? tProducts("alreadyReviewed") : t("submit"));
      return;
    }
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4">
      <div className="w-full max-w-md animate-slide-up rounded-t-[2rem] bg-lp-bg p-6 text-lp-ink shadow-2xl ring-1 ring-lp-line sm:rounded-[2rem] sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-serif text-2xl font-medium">{tProducts("writeReview")}</h3>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-line text-lp-muted hover:text-lp-ink">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{t("ratingLabel")}</p>
        <div className="mb-5 flex gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)} className="transition-transform hover:scale-110">
              <Star
                className={`h-9 w-9 ${i < rating ? "fill-lp-gold text-lp-gold" : "text-lp-line"}`}
              />
            </button>
          ))}
        </div>
        <textarea
          className="w-full rounded-2xl border-0 bg-lp-card p-4 text-sm text-lp-ink ring-1 ring-lp-line placeholder:text-lp-muted/70 focus:outline-none focus:ring-2 focus:ring-lp-accent/60"
          rows={4}
          placeholder={t("commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((file, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt=""
              className="h-16 w-16 rounded-2xl object-cover ring-1 ring-lp-line"
            />
          ))}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-lp-line text-lp-muted hover:border-lp-gold hover:text-lp-ink"
          >
            <ImagePlus className="h-5 w-5" />
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
              e.target.value = "";
            }}
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          onClick={submit}
          disabled={saving}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lp-accent py-4 text-sm font-semibold text-lp-accent-ink shadow-[0_12px_30px_-12px_rgb(var(--lp-accent)/0.9)] disabled:opacity-70"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("submit")}
        </button>
      </div>
    </div>
  );
}
