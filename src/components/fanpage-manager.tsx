"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CalendarClock,
  CalendarCheck,
  Check,
  Copy,
  ExternalLink,
  Heart,
  ImagePlus,
  Loader2,
  MessageCircle,
  MoreHorizontal,
  Newspaper,
  Pencil,
  Phone,
  Pin,
  PinOff,
  ShoppingBag,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { fill } from "@/lib/shop-strings";
import { fanpageStrings, MAX_POST_IMAGES, POST_CTAS, POST_TAGS, type FanpageStrings } from "@/lib/fanpage-strings";
import type { FanPost } from "@/lib/fanpage-data";
import { FanpagePostCard } from "@/components/fanpage-post-card";
import { EmojiPicker } from "@/components/emoji-picker";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const CTA_ICON = { BOOK: CalendarCheck, SHOP: ShoppingBag, CALL: Phone } as const;

type Filter = "all" | "pinned" | "scheduled";

/** "2026-10-25T09:00" for a datetime-local input, in the browser's time. */
function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function ChipPicker<T extends string>({
  value,
  onChange,
  options,
  noneLabel,
}: {
  value: T | "";
  onChange: (v: T | "") => void;
  options: { key: T; label: string; icon?: React.ComponentType<{ className?: string }> }[];
  noneLabel: string;
}) {
  const chip = (key: T | "", label: string, Icon?: React.ComponentType<{ className?: string }>) => (
    <button
      key={key || "none"}
      type="button"
      onClick={() => onChange(key)}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        value === key ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-400"
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
  return (
    <div className="flex flex-wrap gap-1.5">
      {chip("", noneLabel)}
      {options.map((o) => chip(o.key, o.label, o.icon))}
    </div>
  );
}

/** Label, button and schedule fields shared by the composer and the editor. */
function PostOptions({
  S,
  tag,
  setTag,
  cta,
  setCta,
  schedule,
  setSchedule,
}: {
  S: FanpageStrings;
  tag: string;
  setTag: (v: string) => void;
  cta: string;
  setCta: (v: string) => void;
  schedule: string | null;
  setSchedule: (v: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.tagLabel}</p>
        <ChipPicker value={tag} onChange={setTag} noneLabel={S.tagNone} options={POST_TAGS.map((t) => ({ key: t, label: S.tags[t] }))} />
      </div>
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.ctaLabel}</p>
        <ChipPicker value={cta} onChange={setCta} noneLabel={S.ctaNone} options={POST_CTAS.map((c) => ({ key: c, label: S.ctas[c], icon: CTA_ICON[c] }))} />
      </div>
      {schedule !== null && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.schedule}</p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="datetime-local"
              value={schedule}
              min={toLocalInput(new Date())}
              onChange={(e) => setSchedule(e.target.value)}
              className="input !w-auto"
            />
            <span className="text-xs text-ink-400">{S.scheduleHint}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function FanpageManager({
  locale,
  canEdit,
  business,
  initialPosts,
  stats,
}: {
  locale: string;
  canEdit: boolean;
  business: { slug: string; name: string; logoUrl: string | null; theme: string | null };
  initialPosts: FanPost[];
  stats: { followers: number; likes: number; comments: number };
}) {
  const S = fanpageStrings(locale);
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  useEffect(() => setPosts(initialPosts), [initialPosts]);
  const [filter, setFilter] = useState<Filter>("all");
  const [copied, setCopied] = useState(false);

  // Composer
  const [content, setContent] = useState("");
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [tag, setTag] = useState("");
  const [cta, setCta] = useState("");
  const [schedule, setSchedule] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);

  // Owner menu and editor
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [editing, setEditing] = useState<FanPost | null>(null);

  const pagePath = `${locale === routing.defaultLocale ? "" : `/${locale}`}/b/${business.slug}/fanpage`;
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com"}${pagePath}`;
  const now = Date.now();
  const isScheduled = (p: FanPost) => new Date(p.publishAt).getTime() > now;

  useEffect(() => {
    const el = textarea.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 360)}px`;
  }, [content]);

  useEffect(() => {
    if (!menuFor) return;
    const close = () => setMenuFor(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuFor]);

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError(null);
    const picked: { file: File; url: string }[] = [];
    for (const f of Array.from(files)) {
      if (!IMAGE_TYPES.has(f.type) || f.size > MAX_IMAGE_BYTES) {
        setError(fill(S.errImages, { max: MAX_POST_IMAGES }));
        continue;
      }
      picked.push({ file: f, url: URL.createObjectURL(f) });
    }
    setImages((prev) => {
      if (prev.length + picked.length > MAX_POST_IMAGES) setError(fill(S.errImages, { max: MAX_POST_IMAGES }));
      return [...prev, ...picked].slice(0, MAX_POST_IMAGES);
    });
  }

  async function submit() {
    if (!content.trim() && !videoUrl.trim() && images.length === 0) {
      setError(S.errEmpty);
      return;
    }
    if (schedule && new Date(schedule).getTime() <= Date.now()) {
      setError(S.errSchedule);
      return;
    }
    setPosting(true);
    setError(null);
    const form = new FormData();
    form.set("content", content.trim());
    form.set("videoUrl", showVideo ? videoUrl.trim() : "");
    form.set("tag", tag);
    form.set("ctaType", cta);
    form.set("pinned", String(pinned));
    if (schedule) form.set("publishAt", new Date(schedule).toISOString());
    images.forEach((i) => form.append("images", i.file));
    const res = await fetch("/api/business/posts", { method: "POST", body: form }).catch(() => null);
    setPosting(false);
    if (!res?.ok) {
      const data = await res?.json().catch(() => null);
      setError(
        data?.error === "INVALID_VIDEO_URL"
          ? S.errVideo
          : data?.error === "TOO_MANY_IMAGES" || data?.error === "FILE_TOO_LARGE" || data?.error === "UNSUPPORTED_TYPE"
            ? fill(S.errImages, { max: MAX_POST_IMAGES })
            : S.errPost
      );
      return;
    }
    images.forEach((i) => URL.revokeObjectURL(i.url));
    setContent("");
    setImages([]);
    setVideoUrl("");
    setShowVideo(false);
    setTag("");
    setCta("");
    setSchedule(null);
    setPinned(false);
    router.refresh();
  }

  async function patch(p: FanPost, fields: Record<string, string>) {
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.set(k, v));
    const res = await fetch(`/api/business/posts/${p.id}`, { method: "PATCH", body: form }).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      setPosts((prev) => prev.map((x) => (x.id === p.id ? data.post : x)));
      router.refresh();
    }
    return !!res?.ok;
  }

  async function remove(p: FanPost) {
    if (!window.confirm(S.deleteConfirm)) return;
    setPosts((prev) => prev.filter((x) => x.id !== p.id));
    await fetch(`/api/business/posts/${p.id}`, { method: "DELETE" }).catch(() => null);
    router.refresh();
  }

  function copyLink() {
    navigator.clipboard.writeText(pageUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const counts: Record<Filter, number> = {
    all: posts.length,
    pinned: posts.filter((p) => p.pinned).length,
    scheduled: posts.filter(isScheduled).length,
  };
  const visible = posts.filter((p) => (filter === "pinned" ? p.pinned : filter === "scheduled" ? isScheduled(p) : true));
  const dateFmt = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  const tiles = [
    { icon: Newspaper, label: S.statPosts, value: posts.length },
    { icon: Users, label: S.statFollowers, value: stats.followers },
    { icon: Heart, label: S.statLikes, value: stats.likes },
    { icon: MessageCircle, label: S.statComments, value: stats.comments },
  ];

  const menu = (p: FanPost) =>
    canEdit ? (
      <div className="relative">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuFor(menuFor === p.id ? null : p.id);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-full text-lp-muted hover:bg-lp-surface hover:text-lp-ink"
          aria-label={S.more}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
        {menuFor === p.id && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-10 z-20 w-52 overflow-hidden rounded-2xl bg-white py-1.5 font-sans shadow-popover ring-1 ring-ink-100 animate-fade-in"
          >
            <button
              type="button"
              onClick={() => {
                setMenuFor(null);
                setEditing(p);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-900 hover:bg-mist-50"
            >
              <Pencil className="h-4 w-4 text-ink-400" />
              {S.edit}
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuFor(null);
                patch(p, { pinned: String(!p.pinned) });
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink-900 hover:bg-mist-50"
            >
              {p.pinned ? <PinOff className="h-4 w-4 text-ink-400" /> : <Pin className="h-4 w-4 text-ink-400" />}
              {p.pinned ? S.unpin : S.pin}
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuFor(null);
                remove(p);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              {S.del}
            </button>
          </div>
        )}
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1a1326] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200">
              <Newspaper className="h-3.5 w-3.5" />
              {S.dEyebrow}
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{S.dTitle}</h1>
            <p className="max-w-xl text-sm text-white/70">{S.dSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <Link
              href={`/b/${business.slug}/fanpage`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1a1326] shadow-lg transition hover:-translate-y-0.5"
            >
              <ExternalLink className="h-4 w-4" />
              {S.viewPage}
            </Link>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              {copied ? S.copied : S.copyLink}
            </button>
          </div>
        </div>
        <div className="relative mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tiles.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/50">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </p>
              <p className="mt-1.5 text-2xl font-bold tracking-tight">{value.toLocaleString(locale)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        {/* Composer */}
        {canEdit && (
          <div
            className={`rounded-3xl bg-white p-5 shadow-card ring-1 transition sm:p-6 ${dragOver ? "ring-2 ring-primary-400" : "ring-ink-100"}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
          >
            <div className="flex gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-500 text-lg font-bold text-white">
                {business.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={business.logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  business.name.charAt(0)
                )}
              </span>
              <textarea
                ref={textarea}
                rows={3}
                value={content}
                maxLength={5000}
                onChange={(e) => setContent(e.target.value)}
                placeholder={S.composerPh}
                className="min-h-[5.5rem] w-full resize-none border-0 bg-transparent pt-2.5 text-[15px] leading-relaxed text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-0"
              />
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {images.map((img, i) => (
                  <div key={img.url} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-ink-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        URL.revokeObjectURL(img.url);
                        setImages((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white hover:bg-red-600"
                      aria-label={S.close}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {showVideo && (
              <div className="mt-4 flex items-center gap-2">
                <Video className="h-4 w-4 shrink-0 text-red-500" />
                <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder={S.videoPh} className="input" />
              </div>
            )}

            <div className="mt-5 border-t border-ink-100 pt-5">
              <PostOptions S={S} tag={tag} setTag={setTag} cta={cta} setCta={setCta} schedule={schedule} setSchedule={setSchedule} />
            </div>

            <div className="mt-5 flex flex-col gap-3 border-t border-ink-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  hidden
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-mist-100"
                >
                  <ImagePlus className="h-4 w-4 text-emerald-600" />
                  {S.addPhotos}
                  {images.length > 0 && <span className="text-xs text-ink-400">{images.length}/{MAX_POST_IMAGES}</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVideo((v) => !v)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-mist-100 ${showVideo ? "bg-mist-100 text-ink-900" : "text-ink-700"}`}
                >
                  <Video className="h-4 w-4 text-red-500" />
                  {S.addVideo}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (schedule !== null) return setSchedule(null);
                    const d = new Date(Date.now() + 24 * 3600 * 1000);
                    d.setHours(9, 0, 0, 0);
                    setSchedule(toLocalInput(d));
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-mist-100 ${schedule !== null ? "bg-mist-100 text-ink-900" : "text-ink-700"}`}
                >
                  <CalendarClock className="h-4 w-4 text-primary-500" />
                  {S.schedule}
                </button>
                <button
                  type="button"
                  onClick={() => setPinned((v) => !v)}
                  aria-pressed={pinned}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-mist-100 ${pinned ? "bg-amber-50 text-amber-700" : "text-ink-700"}`}
                >
                  <Pin className={`h-4 w-4 -rotate-45 text-amber-500 ${pinned ? "fill-current" : ""}`} />
                  {S.pinLabel}
                </button>
                <EmojiPicker onPick={(e) => setContent((c) => c + e)} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-mist-100" />
              </div>
              <button type="button" onClick={submit} disabled={posting} className="btn-primary shrink-0 !px-6">
                {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : schedule ? <CalendarClock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                {schedule ? S.scheduleBtn : S.post}
              </button>
            </div>
            {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          </div>
        )}

        {/* Posts */}
        {posts.length > 0 && (
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {(["all", "pinned", "scheduled"] as Filter[])
                .filter((f) => f === "all" || counts[f] > 0)
                .map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                      filter === f ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-400"
                    }`}
                  >
                    {f === "all" ? S.fAll : f === "pinned" ? S.fPinned : S.fScheduled}
                    <span className={`text-xs ${filter === f ? "text-white/60" : "text-ink-400"}`}>{counts[f]}</span>
                  </button>
                ))}
            </div>
            <p className="hidden text-xs text-ink-400 sm:block">{S.previewNote}</p>
          </div>
        )}

        <div style={siteThemeStyle(business.theme)} className={`${siteSerif.variable} space-y-5`}>
          {posts.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-ink-100 bg-white px-6 py-14 text-center font-sans">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
                <Newspaper className="h-7 w-7" />
              </span>
              <p className="mt-4 text-lg font-bold text-ink-900">{S.dEmptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.dEmptyText}</p>
            </div>
          ) : (
            visible.map((p) => (
              <FanpagePostCard
                key={p.id}
                post={p}
                locale={locale}
                headerAction={menu(p)}
                note={
                  isScheduled(p) ? (
                    <span className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-lp-accent" />
                      <span suppressHydrationWarning>{fill(S.scheduledFor, { time: dateFmt.format(new Date(p.publishAt)) })}</span>
                    </span>
                  ) : undefined
                }
              />
            ))
          )}
        </div>
      </div>

      {editing && (
        <EditPostDialog
          S={S}
          post={editing}
          scheduled={isScheduled(editing)}
          onClose={() => setEditing(null)}
          onSave={async (fields) => {
            const ok = await patch(editing, fields);
            if (ok) setEditing(null);
            return ok;
          }}
        />
      )}
    </div>
  );
}

function EditPostDialog({
  S,
  post,
  scheduled,
  onClose,
  onSave,
}: {
  S: FanpageStrings;
  post: FanPost;
  scheduled: boolean;
  onClose: () => void;
  onSave: (fields: Record<string, string>) => Promise<boolean>;
}) {
  const [content, setContent] = useState(post.content ?? "");
  const [videoUrl, setVideoUrl] = useState(post.videoUrl ?? "");
  const [tag, setTag] = useState(post.tag ?? "");
  const [cta, setCta] = useState(post.ctaType ?? "");
  const [schedule, setSchedule] = useState<string | null>(scheduled ? toLocalInput(new Date(post.publishAt)) : null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  async function save() {
    if (schedule && new Date(schedule).getTime() <= Date.now()) {
      setError(S.errSchedule);
      return;
    }
    setSaving(true);
    setError(null);
    const fields: Record<string, string> = { content, videoUrl, tag, ctaType: cta };
    if (schedule) fields.publishAt = new Date(schedule).toISOString();
    const ok = await onSave(fields);
    setSaving(false);
    if (!ok) setError(S.errPost);
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-900/50 backdrop-blur-[2px] sm:items-center sm:p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-slide-up sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-4">
          <h3 className="text-lg font-bold text-ink-900">{S.edit}</h3>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 ring-1 ring-ink-100 hover:text-ink-900" aria-label={S.close}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <textarea rows={6} value={content} maxLength={5000} onChange={(e) => setContent(e.target.value)} className="input" placeholder={S.composerPh} />
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 shrink-0 text-red-500" />
            <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder={S.videoPh} className="input" />
          </div>
          <PostOptions S={S} tag={tag} setTag={setTag} cta={cta} setCta={setCta} schedule={schedule} setSchedule={setSchedule} />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-ink-100 px-6 py-4">
          <p className="min-w-0 truncate text-sm font-medium text-red-600">{error}</p>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              {S.cancel}
            </button>
            <button type="button" onClick={save} disabled={saving} className="btn-primary">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {S.save}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
