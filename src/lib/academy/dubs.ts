/** Lessons recorded again in another language — the screen walkthrough and
 * the voice, not only the page text. Files live in
 * public/academy/<locale>/<slug>.mp4 | .jpg | .vtt.
 * A locale without its own recording gets the English one, and a lesson
 * without an English one keeps the original Vietnamese video. */
export const DUBS: Record<string, Record<string, { seconds: number; published: string }>> = {
  en: {
    "dat-lich-online": { seconds: 179, published: "2026-11-16" },
    "dich-vu": { seconds: 100, published: "2026-11-16" },
  },
};
