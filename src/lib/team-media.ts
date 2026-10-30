/** Shared by the team hub's upload routes and the browser uploader. */

export type MediaKind = "IMAGE" | "VIDEO" | "FILE";

/** Each stored piece of a file — small enough for any request body limit. */
export const MEDIA_CHUNK_BYTES = 2 * 1024 * 1024;

export const MEDIA_LIMITS: Record<MediaKind, number> = {
  IMAGE: 15 * 1024 * 1024,
  VIDEO: 60 * 1024 * 1024,
  FILE: 25 * 1024 * 1024,
};

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const FILE_EXT = /\.(pdf|docx?|xlsx?|pptx?|txt|csv|rtf|odt|ods|odp)$/i;

export function mediaKindFor(mimeType: string, name: string): MediaKind | null {
  if (IMAGE_TYPES.has(mimeType)) return "IMAGE";
  if (VIDEO_TYPES.has(mimeType)) return "VIDEO";
  if (FILE_EXT.test(name)) return "FILE";
  return null;
}

export function mediaUrl(id: string, opts?: { poster?: boolean; download?: boolean }) {
  const q = opts?.poster ? "?poster=1" : opts?.download ? "?download=1" : "";
  return `/api/business/team/media/${id}${q}`;
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1024 / 1024).toFixed(n < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}
