/** Pictures and intro videos of the Academy course pages (owner, 2026-11-19).
 * Files live in public/academy/khoa-hoc/: <slug>.jpg (wide banner, 1600x900),
 * <slug>-intro.jpg | -intro.vtt and the intro video <slug>-intro.mp4 (served from /media, see lib/media.ts).
 * Link previews: public/og/khoa-hoc/<slug>-<lang>.jpg (1200x630). */

import { videoUrl } from "@/lib/media";

export const courseImage = (slug: string) => `/academy/khoa-hoc/${slug}.jpg`;

export const courseOgImage = (slug: string, locale: string) => `/og/khoa-hoc/${slug}-${locale === "vi" || locale === "fi" ? locale : "en"}.jpg`;

/** Course id → its intro video (filled in as the videos are made). */
export const COURSE_INTROS: Record<string, { seconds: number; published: string }> = {
  "p-nail": { seconds: 69, published: "2026-11-19" },
  "p-lash": { seconds: 70, published: "2026-11-19" },
  "p-hair": { seconds: 73, published: "2026-11-19" },
  "p-spa": { seconds: 69, published: "2026-11-19" },
  "p-safety": { seconds: 71, published: "2026-11-19" },
  "o-start": { seconds: 60, published: "2026-11-19" },
  "o-reach": { seconds: 56, published: "2026-11-19" },
  "o-daily": { seconds: 61, published: "2026-11-19" },
  "o-retain": { seconds: 57, published: "2026-11-19" },
  "o-grow": { seconds: 58, published: "2026-11-19" },
  "c-start": { seconds: 55, published: "2026-11-19" },
  "c-bookings": { seconds: 56, published: "2026-11-19" },
  "c-perks": { seconds: 57, published: "2026-11-19" },
};

export function courseIntro(id: string, slug: string) {
  const v = COURSE_INTROS[id];
  if (!v) return null;
  const base = `/academy/khoa-hoc/${slug}-intro`;
  return { src: videoUrl(`${base}.mp4`), poster: `${base}.jpg`, captions: `${base}.vtt`, seconds: v.seconds, published: v.published };
}
