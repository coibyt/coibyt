"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface FeedPost {
  id: string;
  content: string | null;
  videoUrl: string | null;
  imageIds: string[];
  commentCount: number;
  createdAt: string;
  businessName: string;
  businessSlug: string;
  businessLogoUrl: string | null;
}

interface Comment {
  id: string;
  content: string;
  authorName: string;
  createdAt: string;
}

function youtubeEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export function FeedList({ locale }: { locale: string }) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openComments, setOpenComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/feed")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => setPosts(d.posts ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function toggleComments(postId: string) {
    const willOpen = !openComments.has(postId);
    setOpenComments((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    if (willOpen && !comments[postId]) {
      const res = await fetch(`/api/feed/posts/${postId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => ({ ...prev, [postId]: data.comments ?? [] }));
      }
    }
  }

  async function submitComment(postId: string) {
    const text = (commentDrafts[postId] ?? "").trim();
    if (!text) return;
    setSubmitting(postId);
    const res = await fetch(`/api/feed/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text }),
    });
    setSubmitting(null);
    if (!res.ok) return;
    const data = await res.json();
    setComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), data.comment] }));
    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, commentCount: p.commentCount + 1 } : p))
    );
  }

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-ink-400">
        <Loader2 className="h-4 w-4 animate-spin" /> ...
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-sm text-ink-400">
        {locale === "vi"
          ? "Chưa có bài đăng nào từ các salon bạn đang theo dõi. Hãy theo dõi một salon để xem bài đăng của họ ở đây."
          : "No posts yet from salons you follow. Follow a salon to see their posts here."}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((p) => {
        const embed = p.videoUrl ? youtubeEmbedUrl(p.videoUrl) : null;
        const isOpen = openComments.has(p.id);
        return (
          <div key={p.id} className="card space-y-3 p-5">
            <Link href={`/b/${p.businessSlug}`} className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mist-100 text-sm font-bold text-primary-500">
                {p.businessLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.businessLogoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  p.businessName.charAt(0)
                )}
              </div>
              <div>
                <p className="font-medium text-ink-900">{p.businessName}</p>
                <p className="text-xs text-ink-400">
                  {new Date(p.createdAt).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </Link>
            {p.content && <p className="whitespace-pre-line text-sm text-ink-900">{p.content}</p>}
            {p.imageIds.length > 0 && (
              <div className={`grid gap-2 ${p.imageIds.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {p.imageIds.map((id) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={id}
                    src={`/api/posts/images/${id}`}
                    alt=""
                    className="max-h-96 w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
            {embed && (
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe src={embed} className="h-full w-full" allowFullScreen />
              </div>
            )}
            <button
              onClick={() => toggleComments(p.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-700"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {p.commentCount} {locale === "vi" ? "bình luận" : p.commentCount === 1 ? "comment" : "comments"}
            </button>

            {isOpen && (
              <div className="space-y-2 border-t border-ink-100 pt-3">
                {(comments[p.id] ?? []).map((c) => (
                  <div key={c.id} className="rounded-lg bg-mist-50 px-3 py-2 text-sm">
                    <p className="font-medium text-ink-900">{c.authorName}</p>
                    <p className="text-ink-700">{c.content}</p>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    className="input flex-1"
                    placeholder={locale === "vi" ? "Viết bình luận..." : "Write a comment..."}
                    value={commentDrafts[p.id] ?? ""}
                    onChange={(e) => setCommentDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitComment(p.id);
                      }
                    }}
                  />
                  <button
                    onClick={() => submitComment(p.id)}
                    disabled={submitting === p.id || !(commentDrafts[p.id] ?? "").trim()}
                    className="btn-primary !px-3 !py-1.5 text-xs"
                  >
                    {submitting === p.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : locale === "vi" ? (
                      "Gửi"
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
