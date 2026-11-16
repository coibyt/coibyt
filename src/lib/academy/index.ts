/** Read-side helpers for the Academy pages: the curriculum in one language,
 * shaped for the hub and for a lesson page. */
import { COURSES as SITE_COURSES, LESSONS as SITE_LESSONS } from "@/lib/academy/curriculum";
import { CRAFT_BRIDGE, CRAFT_COURSES, CRAFT_LESSONS } from "@/lib/academy/craft";
import { DUBS } from "@/lib/academy/dubs";
import { localizedUrl } from "@/lib/seo";
import { pick, type Audience, type CourseCard, type Lesson, type LessonCard, type LessonVideo } from "@/lib/academy/types";

/** The software lessons (curriculum.ts) and the craft-skill lessons (craft.ts) form one Academy. */
const COURSES = [...SITE_COURSES, ...CRAFT_COURSES];
const LESSONS = [...SITE_LESSONS, ...CRAFT_LESSONS];

/** The video a visitor in `locale` gets, and the language it is spoken in:
 * the recording in their language, else the English one, else the original. */
export function videoFor(lesson: Lesson, locale: string): (LessonVideo & { lang: string }) | null {
  if (!lesson.video) return null;
  if (locale !== "vi") {
    const lang = DUBS[locale]?.[lesson.slug] ? locale : "en";
    const dub = DUBS[lang]?.[lesson.slug];
    if (dub) {
      const base = `/academy/${lang}/${lesson.slug}`;
      return { src: `${base}.mp4`, poster: `${base}.jpg`, captions: `${base}.vtt`, seconds: dub.seconds, published: dub.published, lang };
    }
  }
  return { ...lesson.video, lang: "vi" };
}

const audienceOf = (lesson: Lesson): Audience => COURSES.find((c) => c.id === lesson.course)?.audience ?? "customer";

/** Lesson numbers run 1…n within each audience, in curriculum order. */
function numbers() {
  const no = new Map<string, number>();
  const count: Record<Audience, number> = { customer: 0, owner: 0, pro: 0 };
  for (const c of COURSES) {
    for (const l of LESSONS.filter((x) => x.course === c.id)) {
      count[c.audience] += 1;
      no.set(l.slug, count[c.audience]);
    }
  }
  return { no, count };
}

function card(lesson: Lesson, locale: string, no: number): LessonCard {
  return {
    slug: lesson.slug,
    course: lesson.course,
    audience: audienceOf(lesson),
    no,
    title: pick(lesson.title, locale),
    summary: pick(lesson.summary, locale),
    live: !!lesson.video,
    fresh: !!lesson.fresh,
    poster: videoFor(lesson, locale)?.poster ?? null,
    seconds: videoFor(lesson, locale)?.seconds ?? 0,
    quizCount: lesson.quiz?.length ?? 0,
    style: lesson.style ?? null,
  };
}

export function courseCards(locale: string): CourseCard[] {
  const { no } = numbers();
  return COURSES.map((c) => ({
    id: c.id,
    audience: c.audience,
    icon: c.icon,
    title: pick(c.title, locale),
    body: pick(c.body, locale),
    lessons: LESSONS.filter((l) => l.course === c.id).map((l) => card(l, locale, no.get(l.slug) ?? 0)),
  }));
}

export const liveLessons = () => LESSONS.filter((l) => l.video);

/** Software lessons shown under the craft track: once you can do the work, this is how you take bookings for it. */
export function bridgeCards(locale: string): LessonCard[] {
  const { no } = numbers();
  return CRAFT_BRIDGE.map((slug) => LESSONS.find((l) => l.slug === slug && l.video))
    .filter((l): l is Lesson => !!l)
    .map((l) => card(l, locale, no.get(l.slug) ?? 0));
}

export const findLesson = (slug: string) => LESSONS.find((l) => l.slug === slug && l.video) ?? null;

/** Everything a lesson page needs, in one language. */
export function lessonPageData(slug: string, locale: string) {
  const lesson = findLesson(slug);
  const video = lesson && videoFor(lesson, locale);
  if (!lesson || !video) return null;
  const { no, count } = numbers();
  const audience = audienceOf(lesson);
  const course = COURSES.find((c) => c.id === lesson.course)!;
  const track = COURSES.filter((c) => c.audience === audience).flatMap((c) => LESSONS.filter((l) => l.course === c.id));
  const at = track.findIndex((l) => l.slug === slug);
  // Next lesson with a video — wrapping round, so the last lesson leads back to the first one not on screen.
  const after = [...track.slice(at + 1), ...track.slice(0, at)].find((l) => l.video);
  return {
    lesson,
    video,
    audience,
    view: {
      slug,
      audience,
      shareUrl: localizedUrl(locale, `/academy/${slug}`),
      no: no.get(slug) ?? 0,
      total: count[audience],
      courseTitle: pick(course.title, locale),
      title: pick(lesson.title, locale),
      summary: pick(lesson.summary, locale),
      video: { src: video.src, poster: video.poster, captions: video.captions, seconds: video.seconds, lang: video.lang },
      href: lesson.href ?? null,
      hrefLabel: lesson.hrefLabel ? pick(lesson.hrefLabel, locale) : null,
      guide: lesson.guide ?? null,
      steps: (lesson.steps ?? []).map((s) => pick(s, locale)),
      tips: (lesson.tips ?? []).map((s) => pick(s, locale)),
      quiz: (lesson.quiz ?? []).map((q) => ({ q: pick(q.q, locale), options: q.options.map((o) => pick(o, locale)), answer: q.answer, why: pick(q.why, locale) })),
      siblings: LESSONS.filter((l) => l.course === lesson.course).map((l) => card(l, locale, no.get(l.slug) ?? 0)),
      next: after ? { slug: after.slug, title: pick(after.title, locale) } : null,
      style: lesson.style ?? null,
      notice: lesson.notice ? pick(lesson.notice, locale) : null,
      sources: lesson.sources ?? [],
      related: (lesson.related ?? [])
        .map((r) => LESSONS.find((l) => l.slug === r && l.video))
        .filter((l): l is Lesson => !!l)
        .map((l) => card(l, locale, no.get(l.slug) ?? 0)),
    },
  };
}
