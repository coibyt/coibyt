"use client";

import { useState } from "react";
import { Newspaper } from "lucide-react";
import { fanpageStrings, POST_TAGS } from "@/lib/fanpage-strings";
import type { FanPost } from "@/lib/fanpage-data";
import { FanpagePostCard } from "@/components/fanpage-post-card";

/** A list of posts with label filter chips (shown once there's more than
 * one kind of label to choose from). */
export function FanpageFeed({
  posts,
  locale,
  showBusinessLink = false,
  empty,
}: {
  posts: FanPost[];
  locale: string;
  showBusinessLink?: boolean;
  /** What to show when there are no posts at all. */
  empty?: React.ReactNode;
}) {
  const S = fanpageStrings(locale);
  const [tag, setTag] = useState<string | null>(null);
  const tags = POST_TAGS.filter((t) => posts.some((p) => p.tag === t));
  const visible = tag ? posts.filter((p) => p.tag === tag) : posts;

  if (posts.length === 0) {
    return (
      <>
        {empty ?? (
          <div className="rounded-[1.75rem] bg-lp-card px-6 py-16 text-center ring-1 ring-lp-line">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lp-surface ring-1 ring-lp-line">
              <Newspaper className="h-7 w-7 text-lp-gold" strokeWidth={1.5} />
            </span>
            <p className="mt-5 font-serif text-2xl text-lp-ink">{S.emptyTitle}</p>
            <p className="mt-2 text-sm text-lp-muted">{S.emptyText}</p>
          </div>
        )}
      </>
    );
  }

  const chip = (key: string | null, label: string) => (
    <button
      key={key ?? "all"}
      type="button"
      onClick={() => setTag(key)}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        tag === key ? "bg-lp-ink text-lp-bg" : "bg-lp-card text-lp-muted ring-1 ring-lp-line hover:text-lp-ink hover:ring-lp-gold/60"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      {tags.length > 1 && (
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
          {chip(null, S.all)}
          {tags.map((t) => chip(t, S.tags[t]))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className="rounded-[1.75rem] bg-lp-card p-10 text-center text-sm text-lp-muted ring-1 ring-lp-line">{S.noMatch}</p>
      ) : (
        visible.map((p) => <FanpagePostCard key={p.id} post={p} locale={locale} showBusinessLink={showBusinessLink} />)
      )}
    </div>
  );
}
