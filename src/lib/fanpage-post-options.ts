import { isPostCta, isPostTag } from "@/lib/fanpage-strings";
import { toYoutubeEmbedUrl } from "@/lib/youtube";

/** The optional fields a post can be created or edited with; `error` when
 * one of them is invalid. */
export function readPostOptions(form: FormData) {
  const out: { tag?: string | null; ctaType?: string | null; pinned?: boolean; publishAt?: Date; videoUrl?: string | null } = {};
  if (form.has("tag")) {
    const v = form.get("tag");
    if (v && !isPostTag(v)) return { error: "INVALID_TAG" as const };
    out.tag = v ? String(v) : null;
  }
  if (form.has("ctaType")) {
    const v = form.get("ctaType");
    if (v && !isPostCta(v)) return { error: "INVALID_CTA" as const };
    out.ctaType = v ? String(v) : null;
  }
  if (form.has("pinned")) out.pinned = form.get("pinned") === "true";
  if (form.has("publishAt")) {
    const v = form.get("publishAt");
    if (v) {
      const d = new Date(String(v));
      if (Number.isNaN(d.getTime())) return { error: "INVALID_DATE" as const };
      out.publishAt = d;
    }
  }
  if (form.has("videoUrl")) {
    const v = String(form.get("videoUrl") ?? "").trim();
    // Only a link that actually plays: a VaraClip video (or a YouTube one,
    // which older posts used).
    if (v && !toYoutubeEmbedUrl(v)) return { error: "INVALID_VIDEO_URL" as const };
    out.videoUrl = v || null;
  }
  return { options: out };
}
