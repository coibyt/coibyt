"use client";

import { useEffect, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface FollowedBusiness {
  slug: string;
  name: string;
  logoUrl: string | null;
  city: string | null;
}

export function FollowingList({ locale }: { locale: string }) {
  const [businesses, setBusinesses] = useState<FollowedBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [unfollowing, setUnfollowing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/account/following")
      .then((r) => (r.ok ? r.json() : { businesses: [] }))
      .then((d) => setBusinesses(d.businesses ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function unfollow(slug: string) {
    setUnfollowing(slug);
    await fetch(`/api/businesses/${slug}/follow`, { method: "DELETE" });
    setUnfollowing(null);
    setBusinesses((prev) => prev.filter((b) => b.slug !== slug));
  }

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-ink-400">
        <Loader2 className="h-4 w-4 animate-spin" /> ...
      </p>
    );
  }

  if (businesses.length === 0) {
    return (
      <p className="text-sm text-ink-400">
        {locale === "vi" ? "Bạn chưa theo dõi salon nào." : "You're not following any salons yet."}
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {businesses.map((b) => (
        <div
          key={b.slug}
          className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 p-3"
        >
          <Link href={`/b/${b.slug}`} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mist-100 text-sm font-bold text-primary-500">
              {b.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                b.name.charAt(0)
              )}
            </div>
            <div>
              <p className="font-medium text-ink-900">{b.name}</p>
              {b.city && (
                <p className="flex items-center gap-1 text-xs text-ink-400">
                  <MapPin className="h-3 w-3" /> {b.city}
                </p>
              )}
            </div>
          </Link>
          <button
            onClick={() => unfollow(b.slug)}
            disabled={unfollowing === b.slug}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            {unfollowing === b.slug && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {locale === "vi" ? "Bỏ theo dõi" : "Unfollow"}
          </button>
        </div>
      ))}
    </div>
  );
}
