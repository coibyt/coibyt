/** Read-side helpers for the Academy pages: the curriculum in one language,
 * shaped for the hub and for a lesson page. */
import { COURSES, LESSONS } from "@/lib/academy/curriculum";
import { localizedUrl } from "@/lib/seo";
import { pick, type Audience, type CourseCard, type Lesson, type LessonCard } from "@/lib/academy/types";

const audienceOf = (lesson: Lesson): Audience => COURSES.find((c) => c.id === lesson.course)?.audience ?? "customer";

/** Lesson numbers run 1…n within each audience, in curriculum order. */
function numbers() {
  const no = new Map<string, number>();
  const count: Record<Audience, number> = { customer: 0, owner: 0 };
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
    poster: lesson.video?.poster ?? null,
    seconds: lesson.video?.seconds ?? 0,
    quizCount: lesson.quiz?.length ?? 0,
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

export const findLesson = (slug: string) => LESSONS.find((l) => l.slug === slug && l.video) ?? null;

/** Everything a lesson page needs, in one language. */
export function lessonPageData(slug: string, locale: string) {
  const lesson = findLesson(slug);
  if (!lesson?.video) return null;
  const { no, count } = numbers();
  const audience = audienceOf(lesson);
  const course = COURSES.find((c) => c.id === lesson.course)!;
  const track = COURSES.filter((c) => c.audience === audience).flatMap((c) => LESSONS.filter((l) => l.course === c.id));
  const at = track.findIndex((l) => l.slug === slug);
  // Next lesson with a video — wrapping round, so the last lesson leads back to the first one not on screen.
  const after = [...track.slice(at + 1), ...track.slice(0, at)].find((l) => l.video);
  return {
    lesson,
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
      video: { src: lesson.video.src, poster: lesson.video.poster, captions: lesson.video.captions, seconds: lesson.video.seconds },
      href: lesson.href ?? null,
      hrefLabel: lesson.hrefLabel ? pick(lesson.hrefLabel, locale) : null,
      guide: lesson.guide ?? null,
      steps: (lesson.steps ?? []).map((s) => pick(s, locale)),
      tips: (lesson.tips ?? []).map((s) => pick(s, locale)),
      quiz: (lesson.quiz ?? []).map((q) => ({ q: pick(q.q, locale), options: q.options.map((o) => pick(o, locale)), answer: q.answer, why: pick(q.why, locale) })),
      siblings: LESSONS.filter((l) => l.course === lesson.course).map((l) => card(l, locale, no.get(l.slug) ?? 0)),
      next: after ? { slug: after.slug, title: pick(after.title, locale) } : null,
    },
  };
}
