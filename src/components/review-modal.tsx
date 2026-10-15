"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Star, Loader2, X, ExternalLink } from "lucide-react";

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
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleReviewUrl, setGoogleReviewUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isGoogleSignedIn = session?.user?.provider === "google";

  async function submit() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, rating, comment: comment || undefined }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(t("genericError"));
        return;
      }
      setGoogleReviewUrl(data?.googleReviewUrl ?? null);
      setSubmitted(true);
    } catch {
      setError(t("genericError"));
    } finally {
      setSaving(false);
    }
  }

  function finish() {
    onSubmitted();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-sm animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">
            {submitted ? t("shareToGoogleTitle") : t("title")}
          </h3>
          <button onClick={submitted ? finish : onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div>
            <p className="mb-4 text-sm text-ink-700">{t("shareToGoogleBody")}</p>
            {googleReviewUrl && (
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mb-2 flex w-full items-center justify-center gap-2"
              >
                {t("shareToGoogleButton")} <ExternalLink className="h-4 w-4" />
              </a>
            )}
            <button onClick={finish} className="btn-ghost w-full">
              {t("later")}
            </button>
          </div>
        ) : !isGoogleSignedIn ? (
          <div>
            <p className="mb-4 text-sm text-ink-700">{t("googleRequiredBody")}</p>
            <button
              onClick={() => signIn("google", { callbackUrl: window.location.href })}
              className="btn-primary w-full"
            >
              {t("signInWithGoogle")}
            </button>
          </div>
        ) : (
          <div>
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
            {error && <p className="mt-2 text-sm text-berry-500">{error}</p>}
            <button onClick={submit} disabled={saving} className="btn-primary mt-4 w-full">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("submit")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
