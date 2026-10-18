import { Star } from "lucide-react";

interface ReviewItem {
  id: string;
  rating: number;
  comment: string | null;
  ownerReply: string | null;
  createdAt: Date;
  customer: { name: string; image: string | null };
}

export function ReviewList({
  reviews,
  locale,
}: {
  reviews: ReviewItem[];
  locale: string;
}) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-ink-100 p-6 text-center text-sm text-ink-400">
        {locale === "vi" ? "Chưa có đánh giá nào." : "No reviews yet."}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-2xl border border-ink-100 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-peach-100 to-primary-100 text-sm font-bold text-primary-700">
              {r.customer.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink-900">{r.customer.name}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-ink-400">
                  {new Date(r.createdAt).toLocaleDateString(locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB")}
                </span>
              </div>
            </div>
          </div>
          {r.comment && <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{r.comment}</p>}
          {r.ownerReply && (
            <div className="mt-3 rounded-xl border-l-[3px] border-primary-400 bg-primary-50/70 px-4 py-3 text-sm leading-relaxed text-ink-700">
              <span className="mb-0.5 block text-xs font-semibold text-primary-700">
                {locale === "vi" ? "Phản hồi từ salon" : "Reply from the salon"}
              </span>
              {r.ownerReply}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
