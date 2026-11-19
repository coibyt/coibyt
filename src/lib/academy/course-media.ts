/** Pictures and intro videos of the Academy course pages (owner, 2026-11-19).
 * Files live in public/academy/khoa-hoc/: <slug>.jpg (wide banner, 1600x900),
 * <slug>-intro.mp4 | -intro.jpg | -intro.vtt (the intro video, Vietnamese).
 * Link previews: public/og/khoa-hoc/<slug>-<lang>.jpg (1200x630). */

export const courseImage = (slug: string) => `/academy/khoa-hoc/${slug}.jpg`;

export const courseOgImage = (slug: string, locale: string) => `/og/khoa-hoc/${slug}-${locale === "vi" || locale === "fi" ? locale : "en"}.jpg`;

/** Course id → its intro video (filled in as the videos are made). */
export const COURSE_INTROS: Record<string, { seconds: number; published: string }> = {};

export function courseIntro(id: string, slug: string) {
  const v = COURSE_INTROS[id];
  if (!v) return null;
  const base = `/academy/khoa-hoc/${slug}-intro`;
  return { src: `${base}.mp4`, poster: `${base}.jpg`, captions: `${base}.vtt`, seconds: v.seconds, published: v.published };
}
