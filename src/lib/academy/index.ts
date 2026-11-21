/** Read-side helpers for the Academy pages: the curriculum in one language,
 * shaped for the hub and for a lesson page. */
import { COURSES as SITE_COURSES, LESSONS as SITE_LESSONS } from "@/lib/academy/curriculum";
import { CRAFT_BRIDGE, CRAFT_COURSES, CRAFT_LESSONS } from "@/lib/academy/craft";
import { TOSITEO_COURSES, TOSITEO_LESSONS } from "@/lib/academy/tositeo";
import { DUBS } from "@/lib/academy/dubs";
import { localizedUrl } from "@/lib/seo";
import { COURSE_SEO, courseSeoById, courseSeoBySlug } from "@/lib/academy/course-pages";
import { courseImage, courseIntro, courseOgImage } from "@/lib/academy/course-media";
import { pick, type Audience, type CourseCard, type CourseIcon, type Lesson, type LessonCard, type LessonVideo } from "@/lib/academy/types";

/** The software lessons (curriculum.ts), the craft-skill lessons (craft.ts) and the Tositeo course (tositeo.ts) form one Academy. */
const COURSES = [...SITE_COURSES, ...TOSITEO_COURSES, ...CRAFT_COURSES];
const LESSONS = [...SITE_LESSONS, ...TOSITEO_LESSONS, ...CRAFT_LESSONS];

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

/** Lesson numbers run 1…n within each audience, in curriculum order; a standalone course numbers its own lessons 1…n. */
function numbers() {
  const no = new Map<string, number>();
  const count: Record<Audience, number> = { customer: 0, owner: 0, pro: 0 };
  for (const c of COURSES) {
    LESSONS.filter((x) => x.course === c.id).forEach((l, i) => {
      if (c.standalone) return void no.set(l.slug, i + 1);
      count[c.audience] += 1;
      no.set(l.slug, count[c.audience]);
    });
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
    page: courseSeoById(c.id)?.slug ?? null,
    standalone: !!c.standalone,
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
  // A standalone course is its own path; the track is every other course of the audience.
  const track = course.standalone
    ? LESSONS.filter((l) => l.course === course.id)
    : COURSES.filter((c) => c.audience === audience && !c.standalone).flatMap((c) => LESSONS.filter((l) => l.course === c.id));
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
      total: course.standalone ? track.length : count[audience],
      courseTitle: pick(course.title, locale),
      coursePage: courseSeoById(course.id)?.slug ?? null,
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

// ── Course catalogue and course landing pages (/academy/khoa-hoc/<slug>) ──

/** Languages a course can be watched in: Vietnamese always; English once every
 * lesson that has a video also has an English recording. */
function courseLangs(id: string): string[] {
  const live = LESSONS.filter((l) => l.course === id && l.video);
  return live.length > 0 && live.every((l) => DUBS.en?.[l.slug]) ? ["vi", "en"] : ["vi"];
}

export interface CatalogueCourse {
  id: string;
  audience: Audience;
  icon: CourseIcon;
  slug: string;
  title: string;
  headline: string;
  /** English headline, for the "courses in English" shelf. */
  headlineEn: string;
  /** Short course name for the cards (the page's title tag, ≤ ~60 characters). */
  name: string;
  nameEn: string;
  tagline: string;
  image: string;
  live: number;
  total: number;
  seconds: number;
  langs: string[];
  /** Seconds of the English recordings (courses with an English version). */
  secondsEn: number;
  first: string | null;
  /** Own lesson numbering, not part of a certificate track. */
  standalone: boolean;
}

/** Every visible course that has a landing page, in curriculum order. */
export function catalogue(locale: string): CatalogueCourse[] {
  return COURSES.flatMap((c) => {
    const seo = courseSeoById(c.id);
    if (!seo) return [];
    const all = LESSONS.filter((l) => l.course === c.id);
    const live = all.filter((l) => l.video);
    return [
      {
        id: c.id,
        audience: c.audience,
        icon: c.icon,
        slug: seo.slug,
        title: pick(c.title, locale),
        headline: pick(seo.headline, locale),
        headlineEn: seo.headline.en,
        name: pick(seo.metaTitle, locale),
        nameEn: seo.metaTitle.en,
        tagline: pick(seo.tagline, locale),
        image: courseImage(seo.slug),
        live: live.length,
        total: all.length,
        seconds: live.reduce((a, l) => a + (l.video?.seconds ?? 0), 0),
        langs: courseLangs(c.id),
        secondsEn: live.reduce((a, l) => a + (DUBS.en?.[l.slug]?.seconds ?? 0), 0),
        first: live[0]?.slug ?? null,
        standalone: !!c.standalone,
      },
    ];
  });
}

/** Slugs of the course pages that are shown (a hidden course has no page yet). */
export const coursePageSlugs = () => COURSE_SEO.filter((s) => COURSES.some((c) => c.id === s.id)).map((s) => s.slug);

export interface CourseTopic {
  title: string;
  lessons: LessonCard[];
}

/** Everything a course landing page needs, in one language. */
export function coursePageData(slug: string, locale: string) {
  const seo = courseSeoBySlug(slug);
  const course = seo && COURSES.find((c) => c.id === seo.id);
  if (!seo || !course) return null;
  const { no } = numbers();
  const lessons = LESSONS.filter((l) => l.course === course.id);
  const cards = lessons.map((l) => card(l, locale, no.get(l.slug) ?? 0));
  // Craft topics pair a theory video with the practice video right after it
  // (gel-hieu-dung → son-gel); software courses are one list.
  const topics: CourseTopic[] = [];
  if (course.audience === "pro") {
    const groups: { lessons: LessonCard[]; open: boolean }[] = [];
    lessons.forEach((l, i) => {
      const last = groups[groups.length - 1];
      if (l.style === "practice" && last?.open) {
        last.lessons.push(cards[i]);
        last.open = false;
      } else groups.push({ lessons: [cards[i]], open: l.style === "theory" });
    });
    for (const { lessons: group } of groups) {
      const first = group[0].title;
      topics.push({ title: group.length > 1 ? first.split(":")[0].trim() : first, lessons: group });
    }
  } else {
    topics.push({ title: pick(course.title, locale), lessons: cards });
  }
  const live = cards.filter((c) => c.live);
  const related = catalogue(locale).filter((c) => c.id !== course.id && c.audience === course.audience);
  const others = catalogue(locale).filter((c) => c.audience !== course.audience);
  return {
    seo,
    course,
    title: pick(course.title, locale),
    image: courseImage(seo.slug),
    og: courseOgImage(seo.slug, locale),
    intro: courseIntro(course.id, seo.slug),
    langs: courseLangs(course.id),
    topics,
    lessons: cards,
    live: live.length,
    seconds: live.reduce((a, c) => a + c.seconds, 0),
    first: live[0]?.slug ?? null,
    related: [...related, ...others].slice(0, 4),
  };
}

/** A course that has a landing page (only those can be rated or followed). */
export const pageCourse = (id: string) => (courseSeoById(id) ? (COURSES.find((c) => c.id === id) ?? null) : null);
export const lessonsOfCourse = (id: string) => LESSONS.filter((l) => l.course === id);
