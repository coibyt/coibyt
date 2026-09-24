"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Heart, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function FollowButton({
  businessSlug,
  initialFollowing,
  initialFollowerCount,
  locale,
}: {
  businessSlug: string;
  initialFollowing: boolean;
  initialFollowerCount: number;
  locale: string;
}) {
  const { status } = useSession();
  const [following, setFollowing] = useState(initialFollowing);
  const [count, setCount] = useState(initialFollowerCount);
  const [loading, setLoading] = useState(false);

  if (status === "unauthenticated") {
    return (
      <Link
        href={`/auth/sign-in?callbackUrl=/b/${businessSlug}`}
        className="btn-outline !px-4 !py-2 text-xs"
      >
        <Heart className="h-3.5 w-3.5" />
        {locale === "vi" ? "Theo dõi" : "Follow"}
      </Link>
    );
  }

  async function toggle() {
    setLoading(true);
    const res = await fetch(`/api/businesses/${businessSlug}/follow`, {
      method: following ? "DELETE" : "POST",
    });
    setLoading(false);
    if (res.ok) {
      const data = await res.json();
      setFollowing(data.isFollowing);
      setCount(data.followerCount);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={following ? "btn-outline !px-4 !py-2 text-xs" : "btn-primary !px-4 !py-2 text-xs"}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Heart className={`h-3.5 w-3.5 ${following ? "fill-current" : ""}`} />
      )}
      {following ? (locale === "vi" ? "Đang theo dõi" : "Following") : locale === "vi" ? "Theo dõi" : "Follow"}
      {count > 0 && <span className="opacity-70">· {count}</span>}
    </button>
  );
}
