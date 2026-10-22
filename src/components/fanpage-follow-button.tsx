"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Check, Heart, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fanpageStrings } from "@/lib/fanpage-strings";

/** Follow / Following on the fanpage, in the salon's palette. Reports the
 * new follower count so the page's counter can follow along. */
export function FanpageFollowButton({
  slug,
  locale,
  initialFollowing,
  initialCount,
  showCount = false,
  className = "",
}: {
  slug: string;
  locale: string;
  initialFollowing: boolean;
  initialCount: number;
  showCount?: boolean;
  className?: string;
}) {
  const S = fanpageStrings(locale);
  const { status } = useSession();
  const [following, setFollowing] = useState(initialFollowing);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  // Another follow button on the same page (header and sidebar) changed.
  useEffect(() => {
    const onFollow = (e: Event) => {
      const d = (e as CustomEvent<{ slug: string; count: number; following: boolean }>).detail;
      if (d?.slug !== slug) return;
      setFollowing(d.following);
      setCount(d.count);
    };
    window.addEventListener("varaaai-follow", onFollow);
    return () => window.removeEventListener("varaaai-follow", onFollow);
  }, [slug]);

  const base = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${className}`;
  const label = (
    <>
      {following ? S.following : S.follow}
      {showCount && count > 0 && <span className="opacity-70">· {count}</span>}
    </>
  );

  if (status === "unauthenticated") {
    return (
      <Link
        href={`/auth/sign-in?callbackUrl=${encodeURIComponent(`/b/${slug}/fanpage`)}`}
        className={`${base} bg-lp-accent text-lp-accent-ink shadow-[0_10px_24px_-12px_rgb(var(--lp-accent)/0.9)] hover:brightness-110`}
      >
        <Heart className="h-4 w-4" />
        {label}
      </Link>
    );
  }

  async function toggle() {
    setBusy(true);
    const res = await fetch(`/api/businesses/${slug}/follow`, { method: following ? "DELETE" : "POST" }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      const data = await res.json();
      setFollowing(data.isFollowing);
      setCount(data.followerCount);
      window.dispatchEvent(new CustomEvent("varaaai-follow", { detail: { slug, count: data.followerCount, following: data.isFollowing } }));
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy || status === "loading"}
      className={`${base} ${
        following
          ? "bg-lp-card text-lp-ink ring-1 ring-lp-line hover:ring-lp-gold"
          : "bg-lp-accent text-lp-accent-ink shadow-[0_10px_24px_-12px_rgb(var(--lp-accent)/0.9)] hover:brightness-110"
      }`}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : following ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
      {label}
    </button>
  );
}

/** The follower counter in the fanpage header, kept in step with the button. */
export function FollowerCount({ slug, initial, locale }: { slug: string; initial: number; locale: string }) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    const onFollow = (e: Event) => {
      const d = (e as CustomEvent<{ slug: string; count: number }>).detail;
      if (d?.slug === slug) setCount(d.count);
    };
    window.addEventListener("varaaai-follow", onFollow);
    return () => window.removeEventListener("varaaai-follow", onFollow);
  }, [slug]);
  return <>{count.toLocaleString(locale)}</>;
}
