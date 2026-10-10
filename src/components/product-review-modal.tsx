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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-sm animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">{tProducts("writeReview")}</h3>
          <button onClick={onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="label">{t("ratingLabel")}</p>
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)}>
              <Star
                className={`h-7 w-7 ${i < rating ? "fill-coral-500 text-coral-500" : "text-ink-100"}`}
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

        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((file, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt=""
              className="h-14 w-14 rounded-lg object-cover"
            />
          ))}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-ink-100 text-ink-400 hover:border-ink-400"
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

        {error && <p className="mt-3 text-sm text-berry-500">{error}</p>}

        <button onClick={submit} disabled={saving} className="btn-primary mt-4 w-full">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("submit")}
        </button>
      </div>
    </div>
  );
}
