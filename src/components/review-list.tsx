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
      <p className="text-sm text-ink-400">
        {locale === "vi" ? "Chưa có đánh giá nào." : "No reviews yet."}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="card p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
              {r.customer.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-ink-900">{r.customer.name}</p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {r.comment && <p className="mt-3 text-sm text-ink-700">{r.comment}</p>}
          {r.ownerReply && (
            <div className="mt-3 rounded-xl bg-mist-50 p-3 text-sm text-ink-700">
              <span className="font-medium text-ink-900">
                {locale === "vi" ? "Phản hồi từ chủ salon: " : "Owner reply: "}
              </span>
              {r.ownerReply}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
