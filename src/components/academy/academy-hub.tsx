"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CalendarDays,
  Check,
  Compass,
  Flame,
  Gift,
  GraduationCap,
  Heart,
  Lock,
  Megaphone,
  Play,
  Rocket,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { academyStrings } from "@/lib/academy/strings";
import {
  badgesOf,
  courseProgress,
  fmtDuration,
  levelOf,
  streakOf,
  trackProgress,
  xpOf,
  type BadgeId,
} from "@/lib/academy/progress";
import type { Audience, CourseCard, CourseIcon, LessonCard } from "@/lib/academy/types";
import { useAcademyProgress, useHydrated } from "@/components/academy/use-progress";
import { AcademyCertificate } from "@/components/academy/certificate";

const COURSE_ICONS: Record<CourseIcon, typeof Compass> = {
  compass: Compass,
  calendar: CalendarDays,
  gift: Gift,
  rocket: Rocket,
  megaphone: Megaphone,
  briefcase: Briefcase,
  heart: Heart,
  trending: TrendingUp,
};

const GOLD = "bg-gradient-to-br from-[#f0d9a0] to-[#b08a3e]";

/** The Academy's home: who-are-you switch, level card, "keep learning",
 * every course with its lessons, badges and the certificate. */
export function AcademyHub({ courses, locale }: { courses: CourseCard[]; locale: string }) {
  const s = academyStrings(locale);
  const { state, update } = useAcademyProgress();
  const hydrated = useHydrated();
  const [picked, setPicked] = useState<Audience | null>(null);

  // /academy#owner opens the salon-owner track (links from business pages).
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "owner" || h === "customer") setPicked(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const audience: Audience = picked ?? (hydrated ? state.audience : undefined) ?? "customer";
  const choose = (a: Audience) => {
    setPicked(a);
    update((st) => ({ ...st, audience: a }));
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  const live = useMemo(() => new Set(courses.flatMap((c) => c.lessons.filter((l) => l.live).map((l) => l.slug))), [courses]);
  const xp = xpOf(state, live);
  const lv = levelOf(xp);
  const streak = streakOf(state.days);
  const badges = badgesOf(courses, state);
  const earned = badges.filter((b) => b.earned).length;
  const mine = courses.filter((c) => c.audience === audience);
  const track = trackProgress(courses, audience, state);

  // What to watch next: the lesson in progress, else the first one not done.
  const trackLessons = mine.flatMap((c) => c.lessons.filter((l) => l.live));
  const lastLesson = trackLessons.find((l) => l.slug === state.last && !state.lessons[l.slug]?.done);
  const nextUp = lastLesson ?? trackLessons.find((l) => !state.lessons[l.slug]?.done);
  const nextPos = nextUp ? state.lessons[nextUp.slug]?.pos ?? 0 : 0;

  const badgeText = (id: BadgeId): [string, string] => {
    if (id.startsWith("course:")) {
      const c = courses.find((x) => `course:${x.id}` === id);
      return [c?.title ?? "", s.badge.course];
    }
    if (id === "grad:customer") return s.badge.gradCustomer as [string, string];
    if (id === "grad:owner") return s.badge.gradOwner as [string, string];
    return s.badge[id as "first" | "ace" | "streak3" | "five"] as [string, string];
  };
  const badgeIcon = (id: BadgeId) =>
    id === "first" ? Zap : id === "ace" ? Star : id === "streak3" ? Flame : id === "five" ? BookOpen : id.startsWith("grad:") ? GraduationCap : Award;

  return (
    <div className="container relative -mt-10 pb-20 sm:-mt-12">
      {/* who are you */}
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-2 rounded-[1.75rem] bg-white p-2 shadow-popover ring-1 ring-ink-100">
        {(["customer", "owner"] as const).map((a) => {
          const on = audience === a;
          const Icon = a === "customer" ? User : Store;
          return (
            <button
              key={a}
              type="button"
              onClick={() => choose(a)}
              aria-pressed={on}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-0.5 rounded-[1.35rem] px-3 py-2.5 text-center transition-all ${
                on ? "bg-primary-900 text-white shadow-lg" : "text-ink-700 hover:bg-primary-50"
              }`}
            >
              <span className="flex items-center gap-1.5 text-sm font-extrabold sm:text-base">
                <Icon className={`h-4 w-4 ${on ? "text-[#e8d3a6]" : "text-primary-500"}`} />
                {a === "customer" ? s.forCustomer : s.forOwner}
              </span>
              <span className={`hidden text-xs sm:block ${on ? "text-white/70" : "text-ink-400"}`}>{a === "customer" ? s.customerHint : s.ownerHint}</span>
            </button>
          );
        })}
      </div>

      {/* level + keep learning */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-5 text-white shadow-[0_24px_60px_-28px_rgba(31,24,45,0.9)] ring-1 ring-[#e8d3a6]/25 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#b08a3e]/25 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <LevelRing ratio={lv.ratio} level={lv.level} />
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e8d3a6]">
                {s.level} {lv.level}
              </p>
              <p className="truncate text-xl font-extrabold sm:text-2xl">{s.levelNames[lv.level - 1]}</p>
              <p className="mt-0.5 text-sm text-white/70">
                <span className="font-bold text-white">{xp}</span> {s.points}
                {" · "}
                {xp === 0 ? s.startHint : lv.next ? s.toNext(lv.next - xp, lv.level + 1) : s.maxLevel}
              </p>
            </div>
          </div>
          <ul className="relative mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10">
              <Check className="h-3.5 w-3.5 text-[#e8d3a6]" />
              {s.lessonsDone(track.done, track.total)}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10">
              <Flame className="h-3.5 w-3.5 text-coral-400" />
              {s.streak(streak)}
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10">
              <Award className="h-3.5 w-3.5 text-[#e8d3a6]" />
              {s.badgesCount(earned)}
            </li>
          </ul>
        </section>

        {nextUp ? (
          <Link
            href={`/academy/${nextUp.slug}`}
            className="group relative flex items-stretch gap-4 overflow-hidden rounded-3xl bg-white p-3 shadow-card ring-1 ring-ink-100 transition-all hover:-translate-y-0.5 hover:shadow-popover sm:p-4"
          >
            <Poster lesson={nextUp} className="w-[42%] max-w-[260px] shrink-0 self-center" />
            <div className="flex min-w-0 flex-1 flex-col justify-center py-1 pr-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b08a3e]">{track.done > 0 || nextPos > 0 ? s.continueTitle : s.startTitle}</p>
              <p className="mt-1 line-clamp-2 text-base font-extrabold leading-snug text-ink-900 sm:text-xl">{nextUp.title}</p>
              <p className="mt-1 hidden text-sm text-ink-400 sm:line-clamp-2">{nextUp.summary}</p>
              {nextPos > 0 && nextUp.seconds > 0 && (
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-100">
                  <div className={`h-full rounded-full ${GOLD}`} style={{ width: `${Math.min(100, (nextPos / nextUp.seconds) * 100)}%` }} />
                </div>
              )}
              <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-white transition-transform group-hover:scale-[1.03]">
                <Play className="h-3.5 w-3.5 fill-current" />
                {nextPos > 5 ? s.resumeFrom(fmtDuration(nextPos)) : s.start}
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${GOLD} text-primary-900`}>
              <Sparkles className="h-7 w-7" />
            </span>
            <p className="text-base font-semibold leading-relaxed text-ink-700">{s.allDone}</p>
          </div>
        )}
      </div>

      {/* courses */}
      <div className="mt-12 space-y-12">
        {mine.map((c) => {
          const Icon = COURSE_ICONS[c.icon];
          const p = courseProgress(c, state);
          return (
            <section key={c.id} id={c.id} className="scroll-mt-24">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-900 text-[#e8d3a6] shadow-card">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{c.title}</h2>
                  <p className="mt-0.5 text-sm text-ink-400 sm:text-base">{c.body}</p>
                </div>
                {p.total > 0 && (
                  <span
                    className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      p.complete ? `${GOLD} text-primary-900` : "bg-primary-50 text-primary-700 ring-1 ring-primary-100"
                    }`}
                  >
                    {p.done}/{p.total}
                  </span>
                )}
              </div>
              {p.total > 0 && (
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink-100">
                  <div className={`h-full rounded-full ${GOLD} transition-[width] duration-500`} style={{ width: `${(p.done / p.total) * 100}%` }} />
                </div>
              )}
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {c.lessons.map((l) => (
                  <li key={l.slug}>
                    <LessonTile lesson={l} done={!!state.lessons[l.slug]?.done} pos={state.lessons[l.slug]?.pos ?? 0} s={s} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {/* badges */}
      <section className="mt-16">
        <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.badgesTitle}</h2>
        <p className="mt-1 text-sm text-ink-400 sm:text-base">{s.badgesBody}</p>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {badges
            .filter((b) => !b.locked)
            .map((b) => {
              const [name, how] = badgeText(b.id);
              const Icon = badgeIcon(b.id);
              return (
                <li
                  key={b.id}
                  className={`flex items-center gap-3 rounded-2xl p-3 ring-1 transition-colors ${
                    b.earned ? "bg-gradient-to-br from-[#fbf4e2] to-white ring-[#e8d3a6]" : "bg-white ring-ink-100"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      b.earned ? `${GOLD} text-primary-900 shadow-[0_8px_20px_-8px_rgba(176,138,62,0.9)]` : "bg-mist-100 text-ink-300"
                    }`}
                  >
                    {b.earned ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-sm font-bold ${b.earned ? "text-ink-900" : "text-ink-700"}`}>{name}</span>
                    <span className="block text-xs leading-snug text-ink-400">{how}</span>
                  </span>
                </li>
              );
            })}
        </ul>
      </section>

      <AcademyCertificate locale={locale} audience={audience} done={track.done} total={track.total} />

      {/* written guides */}
      <section className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500 p-7 text-white sm:p-10">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold">{s.helpTitle}</h2>
            <p className="mt-2 text-white/80">{s.helpBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/help/getting-started" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-lg transition-transform hover:scale-[1.02]">
              <BookOpen className="h-4 w-4" />
              {s.helpCta}
            </Link>
            <Link href="/support" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/30 transition-colors hover:bg-white/15">
              {s.supportCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function LevelRing({ ratio, level }: { ratio: number; level: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 76 76" className="absolute inset-0 -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="academy-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0d9a0" />
            <stop offset="1" stopColor="#b08a3e" />
          </linearGradient>
        </defs>
        <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          stroke="url(#academy-gold)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.max(0.02, ratio))}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="text-2xl font-extrabold text-[#f0d9a0]">{level}</span>
    </span>
  );
}

function Poster({ lesson, className = "" }: { lesson: LessonCard; className?: string }) {
  return (
    <span className={`relative block aspect-video overflow-hidden rounded-2xl bg-primary-900 ${className}`}>
      {lesson.poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={lesson.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-primary-900 shadow-lg transition-transform group-hover:scale-110">
        <Play className="h-4 w-4 translate-x-px fill-current" />
      </span>
      {lesson.seconds > 0 && (
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-white">{fmtDuration(lesson.seconds)}</span>
      )}
    </span>
  );
}

function LessonTile({ lesson, done, pos, s }: { lesson: LessonCard; done: boolean; pos: number; s: ReturnType<typeof academyStrings> }) {
  if (!lesson.live) {
    return (
      <div className="flex h-full items-center gap-3 rounded-2xl border border-dashed border-ink-200 bg-white/60 p-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist-100 text-ink-300">
          <Lock className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-300">
              {s.lessonWord} {lesson.no}
            </span>
            <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-400">{s.soon}</span>
            {lesson.fresh && <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coral-600">{s.fresh}</span>}
          </span>
          <span className="mt-0.5 block text-sm font-bold leading-snug text-ink-700">{lesson.title}</span>
          <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-ink-400">{lesson.summary}</span>
        </span>
      </div>
    );
  }
  return (
    <Link
      href={`/academy/${lesson.slug}`}
      className="group flex h-full gap-3 rounded-2xl bg-white p-2.5 shadow-card ring-1 ring-ink-100 transition-all hover:-translate-y-0.5 hover:shadow-popover hover:ring-[#e8d3a6] sm:flex-col sm:gap-0 sm:p-3"
    >
      <span className="relative w-[44%] shrink-0 self-start sm:w-full">
        <Poster lesson={lesson} />
        {done && (
          <span className={`absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full ${GOLD} text-primary-900 shadow`}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        )}
        {!done && pos > 0 && lesson.seconds > 0 && (
          <span className="absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-2xl bg-white/30">
            <span className={`block h-full ${GOLD}`} style={{ width: `${Math.min(100, (pos / lesson.seconds) * 100)}%` }} />
          </span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col sm:mt-3 sm:px-1 sm:pb-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">
            {s.lessonWord} {lesson.no}
          </span>
          {lesson.fresh && <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-coral-600">{s.fresh}</span>}
          {done && <span className="text-[11px] font-bold text-sage-600">{s.done}</span>}
        </span>
        <span className="mt-0.5 line-clamp-2 text-sm font-extrabold leading-snug text-ink-900 sm:text-base">{lesson.title}</span>
        <span className="mt-1 line-clamp-2 text-xs leading-snug text-ink-400 sm:text-sm">{lesson.summary}</span>
      </span>
    </Link>
  );
}
