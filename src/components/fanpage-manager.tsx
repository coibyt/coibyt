"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, ImageIcon, Trash2, X } from "lucide-react";

interface PostRow {
  id: string;
  content: string | null;
  videoUrl: string | null;
  imageIds: string[];
  commentCount: number;
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

export function FanpageManager({ locale }: { locale: string }) {
  const tDash = useTranslations("dashboard");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/business/posts")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => setPosts(d.posts ?? []))
      .finally(() => setLoading(false));
  }, []);

  function onPickImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files].slice(0, 6));
  }

  async function submit() {
    if (!content.trim() && !videoUrl.trim() && images.length === 0) return;
    setPosting(true);
    setError(null);
    const form = new FormData();
    if (content.trim()) form.set("content", content.trim());
    if (videoUrl.trim()) form.set("videoUrl", videoUrl.trim());
    images.forEach((f) => form.append("images", f));

    const res = await fetch("/api/business/posts", { method: "POST", body: form });
    setPosting(false);
    if (!res.ok) {
      setError(locale === "vi" ? "Đăng bài thất bại, thử lại." : "Couldn't post, please try again.");
      return;
    }
    const data = await res.json();
    setPosts((prev) => [data.post, ...prev]);
    setContent("");
    setVideoUrl("");
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function remove(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/business/posts/${id}`, { method: "DELETE" });
  }

  return (
    <div className="space-y-6">
      <div className="card space-y-3 p-5">
        <textarea
          rows={3}
          className="input"
          placeholder={tDash("fanpageForm.sharePlaceholder")}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="url"
          className="input"
          placeholder={tDash("fanpageForm.videoLinkPlaceholder")}
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          onChange={onPickImages}
        />
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {images.map((f, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-mist-100 px-2.5 py-1 text-xs text-ink-700"
              >
                {f.name}
                <button type="button" onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            {tDash("fanpageForm.addPhotos")}
          </button>
          <button
            onClick={submit}
            disabled={posting || (!content.trim() && !videoUrl.trim() && images.length === 0)}
            className="btn-primary !px-4 !py-2 text-xs"
          >
            {posting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {tDash("fanpageForm.postButton")}
          </button>
        </div>
        {error && <p className="text-sm text-berry-500">{error}</p>}
      </div>

      {loading ? (
        <p className="flex items-center gap-2 text-sm text-ink-400">
          <Loader2 className="h-4 w-4 animate-spin" /> ...
        </p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-ink-400">{tDash("fanpageForm.noPostsYet")}</p>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => {
            const embed = p.videoUrl ? youtubeEmbedUrl(p.videoUrl) : null;
            return (
              <div key={p.id} className="card space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs text-ink-400">
                    {new Date(p.createdAt).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <button onClick={() => remove(p.id)} className="text-berry-500" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {p.content && <p className="whitespace-pre-line text-sm text-ink-900">{p.content}</p>}
                {p.imageIds.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {p.imageIds.map((id) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={id}
                        src={`/api/posts/images/${id}`}
                        alt=""
                        className="aspect-square w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
                {embed && (
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe src={embed} className="h-full w-full" allowFullScreen />
                  </div>
                )}
                <p className="text-xs text-ink-400">
                  {p.commentCount} {locale === "vi" ? "bình luận" : p.commentCount === 1 ? "comment" : "comments"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
