"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, FileText, Loader2, Paperclip, Play, X } from "lucide-react";
import { formatBytes, MEDIA_CHUNK_BYTES, MEDIA_LIMITS, mediaKindFor, mediaUrl, type MediaKind } from "@/lib/team-media";
import { fill } from "@/lib/shop-strings";
import type { TeamStrings } from "@/lib/team-strings";

/** Building blocks shared by the team hub's chat, notices and training. */

export interface Member {
  userId: string;
  name: string;
  avatarUrl: string | null;
  title: string | null;
  isOwner: boolean;
  left?: boolean;
}

export interface Media {
  id: string;
  kind: MediaKind | string;
  mimeType: string;
  name: string;
  size: number;
  width?: number | null;
  height?: number | null;
}

/** Stored on notices and lessons. */
export interface MediaRef {
  mediaId: string;
  kind: string;
  name: string;
  size: number;
  mimeType: string;
}

export const refToMedia = (r: MediaRef): Media => ({ id: r.mediaId, kind: r.kind, mimeType: r.mimeType, name: r.name, size: r.size });
export const mediaToRef = (m: Media): MediaRef => ({ mediaId: m.id, kind: m.kind, mimeType: m.mimeType, name: m.name, size: m.size });

// ── Avatars ──────────────────────────────────────────────────────────────

export const GROUP_COLORS: Record<string, string> = {
  plum: "from-[#624f89] to-[#1f182d]",
  gold: "from-[#e2c27d] to-[#a8792b]",
  rose: "from-[#e47e97] to-[#a31f3f]",
  teal: "from-[#1aa3ab] to-[#013a3e]",
  coral: "from-[#f6a07f] to-[#d54f2c]",
  sage: "from-[#9fb2a5] to-[#54645a]",
};

const PERSON_GRADIENTS = [
  "from-[#8b76b9] to-[#40325c]",
  "from-[#e2c27d] to-[#a8792b]",
  "from-[#e47e97] to-[#a31f3f]",
  "from-[#1aa3ab] to-[#024f54]",
  "from-[#f6a07f] to-[#d54f2c]",
  "from-[#9fb2a5] to-[#54645a]",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function PersonAvatar({
  id,
  name,
  url,
  size = 40,
  className = "",
  owner = false,
}: {
  id: string;
  name: string;
  url?: string | null;
  size?: number;
  className?: string;
  owner?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const style = { width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)) };
  const ring = owner ? "ring-2 ring-[#d8b46a] ring-offset-2 ring-offset-white" : "";
  if (url && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={name}
        onError={() => setBroken(true)}
        style={style}
        className={`shrink-0 rounded-full object-cover ${ring} ${className}`}
      />
    );
  }
  return (
    <span
      style={style}
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ${PERSON_GRADIENTS[hash(id) % PERSON_GRADIENTS.length]} ${ring} ${className}`}
    >
      {initials(name)}
    </span>
  );
}

export function GroupAvatar({ name, color, size = 44, all = false }: { name: string; color?: string | null; size?: number; all?: boolean }) {
  const style = { width: size, height: size, fontSize: Math.max(11, Math.round(size * 0.34)) };
  if (all) {
    return (
      <span
        style={style}
        className="relative inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f2544] to-[#120d1b] text-[#e8d3a6] shadow-[inset_0_0_0_1px_rgba(232,211,166,0.35)]"
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21V9.5L12 3l9 6.5V21" />
          <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
        </svg>
      </span>
    );
  }
  return (
    <span
      style={style}
      className={`inline-flex shrink-0 select-none items-center justify-center rounded-2xl bg-gradient-to-br font-bold text-white shadow-sm ${GROUP_COLORS[color ?? ""] ?? GROUP_COLORS.plum}`}
    >
      {initials(name)}
    </span>
  );
}

// ── Toast ────────────────────────────────────────────────────────────────

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);
  const node = toast ? (
    <div className="fixed inset-x-4 bottom-6 z-[120] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
      <Check className="h-4 w-4 shrink-0 text-[#e8d3a6]" />
      {toast}
    </div>
  ) : null;
  return [node, setToast] as const;
}

// ── Time ─────────────────────────────────────────────────────────────────

export function relativeTime(iso: string, locale: string) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(Math.round(diff), "second");
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  if (abs < 7 * 86400) return rtf.format(Math.round(diff / 86400), "day");
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });
}

export function shortStamp(iso: string, locale: string) {
  const d = new Date(iso);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  if (now.getTime() - d.getTime() < 6 * 86400e3) return d.toLocaleDateString(locale, { weekday: "short" });
  return d.toLocaleDateString(locale, { day: "numeric", month: "numeric" });
}

// ── Uploads ──────────────────────────────────────────────────────────────

export class UploadError extends Error {}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/** Big photos are scaled to 2048px and re-encoded, so chat stays fast. */
async function prepareImage(file: File): Promise<{ file: File; width: number; height: number }> {
  const img = await loadImage(file).catch(() => null);
  if (!img) return { file, width: 0, height: 0 };
  const { naturalWidth: w, naturalHeight: h } = img;
  URL.revokeObjectURL(img.src);
  const max = 2048;
  if (file.type === "image/gif" || (w <= max && h <= max && file.size < 1.5 * 1024 * 1024)) return { file, width: w, height: h };
  const scale = Math.min(1, max / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.86));
  if (!blob || blob.size >= file.size) return { file, width: w, height: h };
  return { file: new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }), width: canvas.width, height: canvas.height };
}

/** The first frame of a video as a JPEG, plus its size. */
async function videoPoster(file: File): Promise<{ poster: Blob | null; width: number; height: number }> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    let settled = false;
    const done = (r: { poster: Blob | null; width: number; height: number }) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(url);
      resolve(r);
    };
    setTimeout(() => done({ poster: null, width: 0, height: 0 }), 8000);
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.onloadeddata = () => {
      video.currentTime = Math.min(0.5, (video.duration || 1) / 3);
    };
    video.onseeked = () => {
      const w = video.videoWidth;
      const h = video.videoHeight;
      const scale = Math.min(1, 720 / Math.max(w, h, 1));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      try {
        canvas.getContext("2d")!.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((b) => done({ poster: b, width: w, height: h }), "image/jpeg", 0.8);
      } catch {
        done({ poster: null, width: w, height: h });
      }
    };
    video.onerror = () => done({ poster: null, width: 0, height: 0 });
    video.src = url;
  });
}

/** Sends a file to the team hub in pieces; `onProgress` gets 0–100. */
export async function uploadTeamMedia(original: File, onProgress?: (p: number) => void): Promise<Media> {
  const kind = mediaKindFor(original.type, original.name);
  if (!kind) throw new UploadError("UNSUPPORTED_TYPE");
  let file = original;
  let width = 0;
  let height = 0;
  let poster: Blob | null = null;
  if (kind === "IMAGE") ({ file, width, height } = await prepareImage(original));
  if (kind === "VIDEO") ({ poster, width, height } = await videoPoster(original));
  if (file.size > MEDIA_LIMITS[kind]) throw new UploadError("FILE_TOO_LARGE");

  const res = await fetch("/api/business/team/media", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mimeType: file.type, name: file.name, size: file.size, ...(width && { width, height }) }),
  });
  if (!res.ok) throw new UploadError((await res.json().catch(() => ({}))).error ?? "UPLOAD");
  const { id, chunkSize } = (await res.json()) as { id: string; chunkSize: number };
  const cs = chunkSize || MEDIA_CHUNK_BYTES;
  const count = Math.ceil(file.size / cs);
  for (let i = 0; i < count; i++) {
    const part = file.slice(i * cs, Math.min(file.size, (i + 1) * cs));
    let ok = false;
    for (let attempt = 0; attempt < 3 && !ok; attempt++) {
      const r = await fetch(`/api/business/team/media/${id}?idx=${i}`, { method: "PUT", body: part }).catch(() => null);
      ok = !!r?.ok;
    }
    if (!ok) throw new UploadError("UPLOAD");
    onProgress?.(Math.round(((i + 1) / count) * 96));
  }
  if (poster) await fetch(`/api/business/team/media/${id}?poster=1`, { method: "PUT", body: poster }).catch(() => null);
  const fin = await fetch(`/api/business/team/media/${id}`, { method: "POST" });
  if (!fin.ok) throw new UploadError("UPLOAD");
  onProgress?.(100);
  return { id, kind, mimeType: file.type, name: file.name, size: file.size, width: width || null, height: height || null };
}

export function uploadErrorText(err: unknown, S: TeamStrings, kind?: MediaKind | null) {
  const code = err instanceof Error ? err.message : "";
  if (code === "FILE_TOO_LARGE") return fill(S.tooLarge, { max: formatBytes(MEDIA_LIMITS[kind ?? "FILE"]) });
  if (code === "UNSUPPORTED_TYPE") return S.unsupported;
  return S.uploadFailed;
}

export const ACCEPT_MEDIA = "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime";
export const ACCEPT_FILES = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods,.odp";

// ── Showing media ────────────────────────────────────────────────────────

function fileTone(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return { label: "PDF", cls: "bg-[#fbeaee] text-[#a31f3f]" };
  if (/^docx?$|^odt$|^rtf$/.test(ext)) return { label: ext.toUpperCase(), cls: "bg-[#e8eefb] text-[#2f55a4]" };
  if (/^xlsx?$|^ods$|^csv$/.test(ext)) return { label: ext.toUpperCase(), cls: "bg-[#e6f2ec] text-[#1d6b45]" };
  if (/^pptx?$|^odp$/.test(ext)) return { label: ext.toUpperCase(), cls: "bg-[#fdf0e6] text-[#b4541b]" };
  return { label: ext.toUpperCase() || "FILE", cls: "bg-mist-50 text-ink-700" };
}

export function FileCard({ media, dark = false, S }: { media: Media; dark?: boolean; S: TeamStrings }) {
  const tone = fileTone(media.name);
  return (
    <div className={`flex w-full min-w-0 items-center gap-3 rounded-2xl p-2.5 ${dark ? "bg-white/10" : "bg-white ring-1 ring-ink-100"}`}>
      <span className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl text-[9px] font-black tracking-wide ${tone.cls}`}>
        <FileText className="mb-0.5 h-4 w-4" />
        {tone.label}
      </span>
      <a href={mediaUrl(media.id)} target="_blank" rel="noreferrer" className="min-w-0 flex-1">
        <span className={`block truncate text-sm font-semibold ${dark ? "text-white" : "text-ink-900"}`}>{media.name}</span>
        <span className={`block text-[11px] ${dark ? "text-white/60" : "text-ink-400"}`}>{formatBytes(media.size)}</span>
      </a>
      <a
        href={mediaUrl(media.id, { download: true })}
        aria-label={S.download}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-mist-50 text-ink-700 hover:bg-mist-100"}`}
      >
        <Download className="h-4 w-4" />
      </a>
    </div>
  );
}

/** A photo or video thumbnail that opens the lightbox. */
export function MediaThumb({ media, onOpen, className = "", maxH = 320 }: { media: Media; onOpen: () => void; className?: string; maxH?: number }) {
  const ratio = media.width && media.height ? media.width / media.height : media.kind === "VIDEO" ? 16 / 9 : 4 / 3;
  const isVideo = media.kind === "VIDEO";
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ aspectRatio: String(Math.min(Math.max(ratio, 0.6), 2)), maxHeight: maxH }}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-[#1f182d]/10 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={isVideo ? mediaUrl(media.id, { poster: true }) : mediaUrl(media.id)}
        alt=""
        loading="lazy"
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = "hidden")}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      {isVideo && (
        <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#1f182d] shadow-xl backdrop-blur transition group-hover:scale-105">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
          <span className="absolute bottom-2 right-2.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-white">
            {formatBytes(media.size)}
          </span>
        </span>
      )}
    </button>
  );
}

export function Lightbox({ items, index, onClose, S }: { items: Media[]; index: number; onClose: () => void; S: TeamStrings }) {
  const [i, setI] = useState(index);
  const item = items[i];
  const prev = useCallback(() => setI((x) => (x - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setI((x) => (x + 1) % items.length), [items.length]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[130] flex flex-col bg-[#0b0810]/95 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="min-w-0 truncate text-sm font-semibold text-white/80">
          {items.length > 1 && <span className="mr-2 text-[#e8d3a6]">{i + 1}/{items.length}</span>}
          {item.name}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <a href={mediaUrl(item.id, { download: true })} aria-label={S.download} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <Download className="h-5 w-5" />
          </a>
          <button type="button" onClick={onClose} aria-label={S.close} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-6" onClick={(e) => e.stopPropagation()}>
        {item.kind === "VIDEO" ? (
          <video key={item.id} src={mediaUrl(item.id)} poster={mediaUrl(item.id, { poster: true })} controls autoPlay playsInline className="max-h-full max-w-full rounded-xl" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.id} src={mediaUrl(item.id)} alt={item.name} className="max-h-full max-w-full rounded-xl object-contain" />
        )}
        {items.length > 1 && (
          <>
            <button type="button" onClick={prev} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={next} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Photos and videos as a gallery, documents as cards — on notices and
 * lessons. */
export function AttachmentGallery({ attachments, S }: { attachments: MediaRef[]; S: TeamStrings }) {
  const [open, setOpen] = useState<number | null>(null);
  const visual = attachments.filter((a) => a.kind === "IMAGE" || a.kind === "VIDEO").map(refToMedia);
  const files = attachments.filter((a) => a.kind === "FILE").map(refToMedia);
  if (attachments.length === 0) return null;
  return (
    <div className="space-y-2">
      {visual.length > 0 && (
        <div className={`grid gap-2 ${visual.length === 1 ? "grid-cols-1 sm:max-w-lg" : "grid-cols-2 sm:grid-cols-3"}`}>
          {visual.map((m, i) => (
            <MediaThumb key={m.id} media={m} onOpen={() => setOpen(i)} maxH={visual.length === 1 ? 380 : 200} className={visual.length > 1 ? "!aspect-square" : ""} />
          ))}
        </div>
      )}
      {files.map((m) => (
        <FileCard key={m.id} media={m} S={S} />
      ))}
      {open !== null && <Lightbox items={visual} index={open} onClose={() => setOpen(null)} S={S} />}
    </div>
  );
}

interface PendingUpload {
  key: string;
  name: string;
  progress: number;
}

/** Add and remove attachments in the notice and lesson editors. */
export function AttachmentPicker({
  value,
  onChange,
  S,
  onError,
  label,
}: {
  value: MediaRef[];
  onChange: (next: MediaRef[]) => void;
  S: TeamStrings;
  onError: (msg: string) => void;
  label: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const latest = useRef(value);
  latest.current = value;

  async function add(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      const key = `${file.name}-${Date.now()}-${Math.random()}`;
      setPending((p) => [...p, { key, name: file.name, progress: 0 }]);
      try {
        const m = await uploadTeamMedia(file, (progress) => setPending((p) => p.map((x) => (x.key === key ? { ...x, progress } : x))));
        onChange([...latest.current, mediaToRef(m)]);
      } catch (err) {
        onError(uploadErrorText(err, S, mediaKindFor(file.type, file.name)));
      } finally {
        setPending((p) => p.filter((x) => x.key !== key));
      }
    }
  }

  return (
    <div className="space-y-2">
      {value.map((a) => (
        <div key={a.mediaId} className="flex items-center gap-3 rounded-2xl bg-white p-2 ring-1 ring-ink-100">
          {a.kind === "FILE" ? (
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[9px] font-black ${fileTone(a.name).cls}`}>{fileTone(a.name).label}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaUrl(a.mediaId, a.kind === "VIDEO" ? { poster: true } : undefined)} alt="" className="h-10 w-10 shrink-0 rounded-xl bg-ink-100 object-cover" />
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-ink-900">{a.name}</span>
            <span className="block text-[11px] text-ink-400">{formatBytes(a.size)}</span>
          </span>
          <button
            type="button"
            onClick={() => onChange(value.filter((x) => x.mediaId !== a.mediaId))}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 hover:bg-mist-50 hover:text-berry-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      {pending.map((p) => (
        <div key={p.key} className="flex items-center gap-3 rounded-2xl bg-white p-2 ring-1 ring-ink-100">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1fa]">
            <Loader2 className="h-4 w-4 animate-spin text-[#624f89]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-semibold text-ink-900">{p.name}</span>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-ink-100">
              <span className="block h-full rounded-full bg-gradient-to-r from-[#c99a3f] to-[#e8d3a6] transition-all" style={{ width: `${p.progress}%` }} />
            </span>
          </span>
        </div>
      ))}
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8c49a] bg-[#fffaf0] px-4 py-3 text-xs font-bold text-[#8a6a2c] transition hover:bg-[#fbf1dc]"
      >
        <Paperclip className="h-4 w-4" />
        {label}
      </button>
      <input
        ref={input}
        type="file"
        multiple
        accept={`${ACCEPT_MEDIA},${ACCEPT_FILES}`}
        className="hidden"
        onChange={(e) => {
          add(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/** A labelled on/off switch. */
export function Toggle({ on, onChange, label, hint }: { on: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-start gap-3 text-left">
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink-900">{label}</span>
        {hint && <span className="mt-0.5 block text-[11px] leading-snug text-ink-400">{hint}</span>}
      </span>
      <span className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-[#1f182d]" : "bg-ink-100"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

/** A centred sheet on desktop, a bottom sheet on phones. */
export function Sheet({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#120d1b]/55 backdrop-blur-[2px] sm:items-center sm:p-6" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[1.75rem] bg-[#fbfaf8] shadow-2xl animate-slide-up sm:rounded-[1.75rem] ${wide ? "sm:max-w-2xl" : "sm:max-w-md"}`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-ink-100 bg-white px-5 py-4">
          <h2 className="truncate text-base font-bold text-ink-900">{title}</h2>
          <button type="button" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist-50 text-ink-700 hover:bg-mist-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

/** Text with links made clickable and line breaks kept. */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return (
    <span className={`whitespace-pre-wrap break-words ${className}`}>
      {parts.map((p, i) =>
        /^https?:\/\//.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noreferrer" className="underline decoration-current/40 underline-offset-2 hover:decoration-current">
            {p}
          </a>
        ) : (
          p
        )
      )}
    </span>
  );
}

/** "Are you sure?" with a dangerous action in red. */
export function ConfirmDialog({
  text,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
}: {
  text: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[140] flex items-end justify-center bg-[#120d1b]/55 p-4 backdrop-blur-[2px] sm:items-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-[1.5rem] bg-white p-5 shadow-2xl animate-slide-up">
        <p className="text-center text-sm font-semibold leading-relaxed text-ink-900">{text}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={onClose} className="rounded-full bg-mist-50 px-4 py-2.5 text-sm font-bold text-ink-700 hover:bg-mist-100">
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="rounded-full bg-berry-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-berry-600"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
