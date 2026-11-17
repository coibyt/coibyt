/** Lessons recorded again in another language — the screen walkthrough and
 * the voice, not only the page text. Files live in
 * public/academy/<locale>/<slug>.mp4 | .jpg | .vtt.
 * A locale without its own recording gets the English one, and a lesson
 * without an English one keeps the original Vietnamese video. */
export const DUBS: Record<string, Record<string, { seconds: number; published: string }>> = {
  en: {
    "dat-lich-online": { seconds: 136, published: "2026-11-16" },
    "tai-khoan": { seconds: 63, published: "2026-11-16" },
    "dich-vu": { seconds: 85, published: "2026-11-16" },
    "gio-mo-cua": { seconds: 55, published: "2026-11-16" },
    "cai-app": { seconds: 82, published: "2026-11-16" },
    "lich-hen-cua-toi": { seconds: 57, published: "2026-11-16" },
    "dang-ky-salon": { seconds: 87, published: "2026-11-17" },
    "nhan-vien": { seconds: 70, published: "2026-11-17" },
  },
};
