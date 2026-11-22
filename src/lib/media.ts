/** Where the video files (.mp4) are served from.
 *
 * The videos made the git repo so big that Hostinger's deploy could no longer clone it (2026-11-22: "Failed to
 * clone the repository" after 5 minutes), so they no longer live in git. They are uploaded to the same Hostinger
 * site instead, to public_html/media/ (served at https://varaaai.com/media/…), keeping the path they had under
 * public/ ("/academy/en/x.mp4" → "/media/academy/en/x.mp4"). Upload: scripts/upload-media.sh.
 * Posters (.jpg) and captions (.vtt) stay in public/: they are small, and captions must come from this origin. */
export const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? "/media").replace(/\/+$/, "");

/** Public URL of a video, from its old path under public/ ("/academy/en/x.mp4"). */
export const videoUrl = (path: string) => `${MEDIA_BASE}${path}`;
