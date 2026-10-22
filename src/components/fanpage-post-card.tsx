"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  ImagePlus,
  Loader2,
  MessageCircle,
  Phone,
  Pin,
  Send,
  Share2,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { EmojiPicker } from "@/components/emoji-picker";
import { embedFrameClass, toYoutubeEmbedUrl } from "@/lib/youtube";
import { fill } from "@/lib/shop-strings";
import { fanpageStrings, isPostCta, isPostTag, timeAgo, type FanpageStrings } from "@/lib/fanpage-strings";
import type { FanComment, FanPost } from "@/lib/fanpage-data";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** The colour of each label's chip. */
const TAG_TONE: Record<string, string> = {
  PROMO: "bg-lp-accent text-lp-accent-ink",
  NEW_WORK: "bg-lp-gold/20 text-lp-ink ring-1 ring-lp-gold/40",
  NEWS: "bg-lp-deep text-lp-deep-ink",
  TIP: "bg-lp-surface text-lp-ink ring-1 ring-lp-line",
};

export function Avatar({ name, src, size = 44 }: { name: string; src: string | null; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-lp-accent font-serif font-semibold text-lp-accent-ink ring-2 ring-lp-card"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </span>
  );
}

export function TagChip({ tag, S }: { tag: string; S: FanpageStrings }) {
  if (!isPostTag(tag)) return null;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${TAG_TONE[tag]}`}>{S.tags[tag]}</span>
  );
}

/** Full-screen photo viewer. */
export function Lightbox({ urls, start, onClose, S }: { urls: string[]; start: number; onClose: () => void; S: FanpageStrings }) {
  const [i, setI] = useState(start);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((x) => (x + d + urls.length) % urls.length);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-black/95 animate-fade-in" onClick={onClose}>
      <div className="flex items-center justify-between p-4 text-white/80">
        <span className="text-sm tabular-nums">
          {i + 1} / {urls.length}
        </span>
        <button type="button" onClick={onClose} aria-label={S.close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-6"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urls[i]} alt="" className="max-h-full max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
        {urls.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={S.prev}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={S.next}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Photos laid out by count: one large, two side by side, three as one
 * tall plus two, four or more as a 2×2 grid with "+N" on the last. */
function Gallery({ urls, onOpen }: { urls: string[]; onOpen: (i: number) => void }) {
  const n = urls.length;
  const tile = (i: number, className: string, extra?: number) => (
    <button key={i} type="button" onClick={() => onOpen(i)} className={`group relative overflow-hidden bg-lp-surface ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={urls[i]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      {extra ? (
        <span className="absolute inset-0 flex items-center justify-center bg-black/55 font-serif text-4xl font-medium text-white sm:text-5xl">+{extra}</span>
      ) : null}
    </button>
  );
  if (n === 1) return <div className="overflow-hidden">{tile(0, "block max-h-[560px] w-full [&>img]:max-h-[560px]")}</div>;
  if (n === 2) return <div className="grid grid-cols-2 gap-1">{[0, 1].map((i) => tile(i, "aspect-[4/5]"))}</div>;
  if (n === 3)
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1" style={{ aspectRatio: "1 / 1" }}>
        {tile(0, "row-span-2")}
        {tile(1, "")}
        {tile(2, "")}
      </div>
    );
  return <div className="grid grid-cols-2 gap-1">{[0, 1, 2, 3].map((i) => tile(i, "aspect-square", i === 3 && n > 4 ? n - 4 : undefined))}</div>;
}

/** One fanpage post — painted with the salon's lp-* palette, so it must sit
 * inside a themed wrapper. */
export function FanpagePostCard({
  post,
  locale,
  showBusinessLink = false,
  headerAction,
  note,
}: {
  post: FanPost;
  locale: string;
  /** In a feed of many salons: the header links to the salon's fanpage. */
  showBusinessLink?: boolean;
  /** e.g. the owner's menu, at the top right. */
  headerAction?: React.ReactNode;
  /** A line above the post, e.g. "Goes live tomorrow at 9:00". */
  note?: React.ReactNode;
}) {
  const S = fanpageStrings(locale);
  const { status } = useSession();
  const signedIn = status === "authenticated";
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [pop, setPop] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<FanComment[] | null>(null);
  const [draft, setDraft] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [shared, setShared] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLiked(post.liked);
    setLikeCount(post.likeCount);
    setCommentCount(post.commentCount);
  }, [post.liked, post.likeCount, post.commentCount]);

  const urls = post.imageIds.map((id) => `/api/posts/images/${id}`);
  const embed = post.videoUrl ? toYoutubeEmbedUrl(post.videoUrl) : null;
  const long = (post.content?.length ?? 0) > 320 || (post.content?.split("\n").length ?? 0) > 6;
  const fanpageHref = `/b/${post.business.slug}/fanpage`;
  const signInHref = `/auth/sign-in?callbackUrl=${encodeURIComponent(fanpageHref)}`;

  async function toggleLike() {
    if (!signedIn) return;
    const next = !liked;
    setLiked(next);
    setLikeCount((n) => n + (next ? 1 : -1));
    if (next) {
      setPop(true);
      setTimeout(() => setPop(false), 400);
    }
    const res = await fetch(`/api/feed/posts/${post.id}/like`, { method: "POST" }).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    }
  }

  async function toggleComments() {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && comments === null) {
      const res = await fetch(`/api/feed/posts/${post.id}/comments`).catch(() => null);
      setComments(res?.ok ? ((await res.json()).comments ?? []) : []);
    }
  }

  async function sendComment() {
    const text = draft.trim();
    if (!text && !image) return;
    setSending(true);
    const form = new FormData();
    if (text) form.set("content", text);
    if (image) form.set("image", image);
    const res = await fetch(`/api/feed/posts/${post.id}/comments`, { method: "POST", body: form }).catch(() => null);
    setSending(false);
    if (!res?.ok) return;
    const data = await res.json();
    setComments((prev) => [...(prev ?? []), data.comment]);
    setCommentCount((n) => n + 1);
    setDraft("");
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function deleteComment(c: FanComment) {
    if (!window.confirm(S.deleteCommentConfirm)) return;
    setComments((prev) => (prev ?? []).filter((x) => x.id !== c.id));
    setCommentCount((n) => Math.max(0, n - 1));
    await fetch(`/api/feed/posts/${post.id}/comments?commentId=${c.id}`, { method: "DELETE" }).catch(() => null);
  }

  async function share() {
    const url = `${window.location.origin}${fanpageHref}#post-${post.id}`;
    if (navigator.share) {
      await navigator.share({ title: post.business.name, text: post.content?.slice(0, 120) ?? undefined, url }).catch(() => {});
      return;
    }
    navigator.clipboard.writeText(url).catch(() => {});
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  const cta = isPostCta(post.ctaType) ? post.ctaType : null;
  const ctaHref =
    cta === "BOOK" ? `/b/${post.business.slug}#services` : cta === "SHOP" ? `/b/${post.business.slug}/products` : null;
  const CtaIcon = cta === "BOOK" ? CalendarCheck : cta === "SHOP" ? ShoppingBag : Phone;

  const header = (
    <>
      <Avatar name={post.business.name} src={post.business.logoUrl} />
      <span className="min-w-0">
        <span className="block truncate font-semibold text-lp-ink">{post.business.name}</span>
        <span className="block text-xs text-lp-muted" suppressHydrationWarning>
          {timeAgo(post.publishAt, locale, S.justNow)}
        </span>
      </span>
    </>
  );

  return (
    <article id={`post-${post.id}`} className="relative scroll-mt-28 rounded-[1.75rem] bg-lp-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-18px_rgba(0,0,0,0.25)] ring-1 ring-lp-line">
      {note && <div className="rounded-t-[1.75rem] border-b border-lp-line bg-lp-surface px-5 py-2.5 text-xs font-semibold text-lp-ink">{note}</div>}

      <header className="flex items-start justify-between gap-3 px-5 pt-5">
        {showBusinessLink ? (
          <Link href={fanpageHref} className="flex min-w-0 items-center gap-3 hover:opacity-90">
            {header}
          </Link>
        ) : (
          <div className="flex min-w-0 items-center gap-3">{header}</div>
        )}
        <div className="flex shrink-0 items-center gap-1.5">
          {post.pinned && (
            <span className="flex items-center gap-1 rounded-full bg-lp-surface px-2.5 py-1 text-[11px] font-semibold text-lp-muted ring-1 ring-lp-line">
              <Pin className="h-3 w-3 -rotate-45 fill-current" />
              {S.pinned}
            </span>
          )}
          {headerAction}
        </div>
      </header>

      {post.tag && (
        <div className="px-5 pt-3">
          <TagChip tag={post.tag} S={S} />
        </div>
      )}

      {post.content && (
        <div className="px-5 pt-3">
          <p className={`whitespace-pre-line text-[15px] leading-relaxed text-lp-ink ${long && !expanded ? "line-clamp-6" : ""}`}>{post.content}</p>
          {long && (
            <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-1 text-sm font-semibold text-lp-accent hover:underline">
              {expanded ? S.seeLess : S.seeMore}
            </button>
          )}
        </div>
      )}

      {(urls.length > 0 || embed) && (
        <div className="mt-4 space-y-1">
          {urls.length > 0 && <Gallery urls={urls} onOpen={setLightbox} />}
          {embed && (
            <div className={embedFrameClass(embed, "bg-black")}>
              <iframe src={embed} title={post.business.name} className="h-full w-full" allow="encrypted-media; picture-in-picture" allowFullScreen />
            </div>
          )}
        </div>
      )}

      {cta && (cta !== "CALL" || post.business.phone) && (
        <div className="px-5 pt-4">
          {ctaHref ? (
            <Link
              href={ctaHref}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lp-accent py-3 text-sm font-semibold text-lp-accent-ink shadow-[0_10px_24px_-12px_rgb(var(--lp-accent)/0.9)] transition hover:brightness-110"
            >
              <CtaIcon className="h-4 w-4" />
              {S.ctas[cta]}
            </Link>
          ) : (
            <a
              href={`tel:${post.business.phone}`}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lp-accent py-3 text-sm font-semibold text-lp-accent-ink shadow-[0_10px_24px_-12px_rgb(var(--lp-accent)/0.9)] transition hover:brightness-110"
            >
              <CtaIcon className="h-4 w-4" />
              {S.ctas[cta]}
            </a>
          )}
        </div>
      )}

      {(likeCount > 0 || commentCount > 0) && (
        <div className="flex items-center justify-between px-5 pt-4 text-xs text-lp-muted">
          <span className="flex items-center gap-1.5">
            {likeCount > 0 && (
              <>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lp-accent text-lp-accent-ink">
                  <Heart className="h-3 w-3 fill-current" />
                </span>
                {likeCount === 1 ? S.likesOne : fill(S.likesCount, { n: likeCount })}
              </>
            )}
          </span>
          {commentCount > 0 && (
            <button type="button" onClick={toggleComments} className="hover:underline">
              {commentCount === 1 ? S.commentsOne : fill(S.commentsCount, { n: commentCount })}
            </button>
          )}
        </div>
      )}

      <div className="mx-5 mt-3 grid grid-cols-3 border-t border-lp-line py-1.5">
        {signedIn ? (
          <button
            type="button"
            onClick={toggleLike}
            aria-pressed={liked}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors hover:bg-lp-surface ${
              liked ? "text-lp-accent" : "text-lp-muted"
            }`}
          >
            <Heart className={`h-[18px] w-[18px] transition-transform duration-300 ${liked ? "fill-current" : ""} ${pop ? "scale-125" : ""}`} />
            {S.like}
          </button>
        ) : (
          <Link href={signInHref} className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-lp-muted hover:bg-lp-surface">
            <Heart className="h-[18px] w-[18px]" />
            {S.like}
          </Link>
        )}
        <button
          type="button"
          onClick={toggleComments}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors hover:bg-lp-surface ${open ? "text-lp-ink" : "text-lp-muted"}`}
        >
          <MessageCircle className="h-[18px] w-[18px]" />
          {S.comment}
        </button>
        <button type="button" onClick={share} className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-lp-muted transition-colors hover:bg-lp-surface">
          {shared ? <Check className="h-[18px] w-[18px] text-lp-accent" /> : <Share2 className="h-[18px] w-[18px]" />}
          <span className="truncate">{shared ? S.linkCopied : S.share}</span>
        </button>
      </div>

      {open && (
        <div className="space-y-3 rounded-b-[1.75rem] border-t border-lp-line bg-lp-surface/50 px-5 py-4">
          {comments === null ? (
            <p className="flex justify-center py-2 text-lp-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
            </p>
          ) : comments.length === 0 ? (
            <p className="text-center text-sm text-lp-muted">{S.noComments}</p>
          ) : (
            <ul className="space-y-3">
              {comments.map((c) => (
                <li key={c.id} className="group flex gap-2.5">
                  <Avatar name={c.authorName} src={c.authorImage} size={32} />
                  <div className="min-w-0 flex-1">
                    <div className={`inline-block max-w-full rounded-2xl px-3.5 py-2 ${c.asBusiness ? "bg-lp-accent/10 ring-1 ring-lp-accent/25" : "bg-lp-card ring-1 ring-lp-line"}`}>
                      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-lp-ink">
                        {c.authorName}
                        {c.asBusiness && (
                          <span className="rounded-full bg-lp-accent px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-lp-accent-ink">{S.salonBadge}</span>
                        )}
                      </p>
                      {c.content && <p className="whitespace-pre-line break-words text-sm text-lp-ink/90">{c.content}</p>}
                    </div>
                    {c.imageId && (
                      <button type="button" onClick={() => window.open(`/api/feed/comments/images/${c.imageId}`, "_blank")} className="mt-1.5 block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/api/feed/comments/images/${c.imageId}`} alt="" className="max-h-48 rounded-2xl object-cover ring-1 ring-lp-line" />
                      </button>
                    )}
                    <p className="mt-1 flex items-center gap-3 px-2 text-[11px] text-lp-muted">
                      <span suppressHydrationWarning>{timeAgo(c.createdAt, locale, S.justNow)}</span>
                      {c.canDelete && (
                        <button
                          type="button"
                          onClick={() => deleteComment(c)}
                          className="flex items-center gap-1 opacity-100 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Trash2 className="h-3 w-3" />
                          {S.deleteComment}
                        </button>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {signedIn ? (
            <div>
              {image && (
                <div className="mb-2 flex items-center gap-2 text-xs text-lp-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(image)} alt="" className="h-12 w-12 rounded-xl object-cover" />
                  <button type="button" onClick={() => setImage(null)} className="hover:text-red-600" aria-label={S.close}>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-1 rounded-full bg-lp-card py-1 pl-1.5 pr-1 ring-1 ring-lp-line focus-within:ring-2 focus-within:ring-lp-accent/50">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && f.size <= MAX_IMAGE_BYTES) setImage(f);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lp-muted hover:bg-lp-surface hover:text-lp-ink"
                  aria-label={S.attach}
                >
                  <ImagePlus className="h-4 w-4" />
                </button>
                <EmojiPicker
                  onPick={(emoji) => setDraft((d) => d + emoji)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lp-muted hover:bg-lp-surface hover:text-lp-ink"
                />
                <input
                  className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-lp-ink placeholder:text-lp-muted/70 focus:outline-none"
                  placeholder={S.writeComment}
                  value={draft}
                  maxLength={1000}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      sendComment();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={sendComment}
                  disabled={sending || (!draft.trim() && !image)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lp-accent text-lp-accent-ink disabled:opacity-40"
                  aria-label={S.send}
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ) : (
            <Link
              href={signInHref}
              className="block rounded-full bg-lp-card py-3 text-center text-sm font-semibold text-lp-ink ring-1 ring-lp-line hover:ring-lp-gold"
            >
              {S.signInToComment}
            </Link>
          )}
        </div>
      )}

      {lightbox !== null && <Lightbox urls={urls} start={lightbox} onClose={() => setLightbox(null)} S={S} />}
    </article>
  );
}
