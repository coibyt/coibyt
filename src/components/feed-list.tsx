"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Heart, Share2, Paperclip, X, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EmojiPicker } from "@/components/emoji-picker";

interface FeedPost {
  id: string;
  content: string | null;
  videoUrl: string | null;
  imageIds: string[];
  commentCount: number;
  likeCount: number;
  liked: boolean;
  createdAt: string;
  businessName: string;
  businessSlug: string;
  businessLogoUrl: string | null;
}

interface Comment {
  id: string;
  content: string;
  authorName: string;
  imageId: string | null;
  createdAt: string;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

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
  const [commentImages, setCommentImages] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [shared, setShared] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  async function toggleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likeCount: p.likeCount + (p.liked ? -1 : 1) }
          : p
      )
    );
    const res = await fetch(`/api/feed/posts/${postId}/like`, { method: "POST" });
    if (!res.ok) return;
    const data = await res.json();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, liked: data.liked, likeCount: data.likeCount } : p))
    );
  }

  async function sharePost(post: FeedPost) {
    const url = `${window.location.origin}/b/${post.businessSlug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.businessName, text: post.content ?? undefined, url });
        return;
      } catch {
        return; // user cancelled the native share sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(post.id);
      setTimeout(() => setShared(null), 2000);
    } catch {
      // clipboard unavailable — nothing more we can do here
    }
  }

  function onPickCommentImage(postId: string, file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) return;
    setCommentImages((prev) => ({ ...prev, [postId]: file }));
  }

  async function submitComment(postId: string) {
    const text = (commentDrafts[postId] ?? "").trim();
    const image = commentImages[postId];
    if (!text && !image) return;
    setSubmitting(postId);
    const form = new FormData();
    if (text) form.set("content", text);
    if (image) form.set("image", image);
    const res = await fetch(`/api/feed/posts/${postId}/comments`, { method: "POST", body: form });
    setSubmitting(null);
    if (!res.ok) return;
    const data = await res.json();
    setComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), data.comment] }));
    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
    setCommentImages((prev) => ({ ...prev, [postId]: null }));
    const input = fileInputRefs.current[postId];
    if (input) input.value = "";
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
        const draftImage = commentImages[p.id];
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

            <div className="flex items-center gap-4 border-t border-ink-100 pt-2.5">
              <button
                onClick={() => toggleLike(p.id)}
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  p.liked ? "text-berry-500" : "text-ink-400 hover:text-ink-700"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${p.liked ? "fill-berry-500" : ""}`} />
                {p.likeCount}
              </button>
              <button
                onClick={() => toggleComments(p.id)}
                className="flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {p.commentCount}{" "}
                {locale === "vi" ? "bình luận" : p.commentCount === 1 ? "comment" : "comments"}
              </button>
              <button
                onClick={() => sharePost(p)}
                className="flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-700"
              >
                <Share2 className="h-3.5 w-3.5" />
                {shared === p.id
                  ? locale === "vi"
                    ? "Đã sao chép liên kết"
                    : "Link copied"
                  : locale === "vi"
                    ? "Chia sẻ"
                    : "Share"}
              </button>
            </div>

            {isOpen && (
              <div className="space-y-2 border-t border-ink-100 pt-3">
                {(comments[p.id] ?? []).map((c) => (
                  <div key={c.id} className="rounded-lg bg-mist-50 px-3 py-2 text-sm">
                    <p className="font-medium text-ink-900">{c.authorName}</p>
                    {c.content && <p className="text-ink-700">{c.content}</p>}
                    {c.imageId && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/api/feed/comments/images/${c.imageId}`}
                        alt=""
                        className="mt-1.5 max-h-48 rounded-lg object-cover"
                      />
                    )}
                  </div>
                ))}

                {draftImage && (
                  <div className="flex items-center gap-2 text-xs text-ink-700">
                    <span className="truncate">{draftImage.name}</span>
                    <button
                      onClick={() => setCommentImages((prev) => ({ ...prev, [p.id]: null }))}
                      className="text-berry-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <input
                    ref={(el) => {
                      fileInputRefs.current[p.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onPickCommentImage(p.id, e.target.files?.[0])}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[p.id]?.click()}
                    className="btn-ghost !p-2 text-ink-700"
                    aria-label={locale === "vi" ? "Đính kèm ảnh" : "Attach image"}
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <EmojiPicker
                    onPick={(emoji) =>
                      setCommentDrafts((prev) => ({ ...prev, [p.id]: (prev[p.id] ?? "") + emoji }))
                    }
                  />
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
                    disabled={
                      submitting === p.id || (!(commentDrafts[p.id] ?? "").trim() && !draftImage)
                    }
                    className="btn-primary !p-2.5"
                    aria-label={locale === "vi" ? "Gửi" : "Send"}
                  >
                    {submitting === p.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
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
