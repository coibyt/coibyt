"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Award, BookOpen, CalendarDays, Check, ChevronLeft, CircleCheck, CircleX, Copy, Download, ExternalLink, Lightbulb, Lock, Play, RotateCcw, Share2, ShieldCheck, Trophy } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { academyStrings } from "@/lib/academy/strings";
import { craftStrings } from "@/lib/academy/craft-strings";
import { WATCHED_RATIO, XP_ANSWER, XP_LESSON, fmtDuration } from "@/lib/academy/progress";
import type { Audience, LessonCard, LessonStyle } from "@/lib/academy/types";
import { useAcademyProgress, useHydrated } from "@/components/academy/use-progress";

export interface LessonViewData {
  slug: string;
  audience: Audience;
  /** Public address of this lesson (for sharing). */
  shareUrl: string;
  no: number;
  total: number;
  courseTitle: string;
  title: string;
  summary: string;
  video: { src: string; poster: string; captions: string; seconds: number; lang: string };
  href: string | null;
  hrefLabel: string | null;
  guide: string | null;
  steps: string[];
  tips: string[];
  quiz: { q: string; options: string[]; answer: number; why: string }[];
  /** Lessons of the same course, in order. */
  siblings: LessonCard[];
  /** The next lesson that has a video, if any. */
  next: { slug: string; title: string } | null;
  /** Craft lessons: which of the topic's two videos this is. */
  style: LessonStyle | null;
  /** Craft lessons: a safety note, the official sources behind it, and the
   * software lessons that put the skill to work in VaraaAi. */
  notice: string | null;
  sources: { label: string; url: string }[];
  related: LessonCard[];
}

const GOLD = "bg-gradient-to-br from-[#f0d9a0] to-[#b08a3e]";
const SPEEDS = [0.75, 1, 1.25, 1.5];

export function LessonView({ lesson, locale }: { lesson: LessonViewData; locale: string }) {
  const s = academyStrings(locale);
  const cs = craftStrings(locale);
  const home = `/academy${lesson.audience === "customer" ? "" : `#${lesson.audience}`}`;
  const { state, patchLesson } = useAcademyProgress();
  const hydrated = useHydrated();
  const mine = state.lessons[lesson.slug] ?? {};
  const done = !!mine.done;
  const quizRef = useRef<HTMLDivElement>(null);
  const [celebrate, setCelebrate] = useState(false);

  // Remember this as the lesson to come back to.
  useEffect(() => {
    patchLesson(lesson.slug, (p) => p);
  }, [lesson.slug, patchLesson]);

  const complete = useCallback(() => {
    let first = false;
    patchLesson(lesson.slug, (p) => {
      if (p.done) return p;
      first = true;
      return { ...p, done: Date.now() };
    });
    if (first) setCelebrate(true);
  }, [lesson.slug, patchLesson]);

  const toQuiz = () => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="bg-mist-50/60">
      <div className="relative isolate overflow-hidden bg-[#1a1326] pb-28 pt-6 text-white sm:pb-36 sm:pt-8">
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-[#b08a3e]/20 blur-3xl" />
        <div className="container max-w-5xl">
          <Link href={home} className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white">
            <ChevronLeft className="h-4 w-4" />
            {s.back}
          </Link>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.18em] text-[#e8d3a6]">
            <span>{lesson.courseTitle}</span>
            {lesson.style && (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] tracking-wide text-white ring-1 ring-white/20">
                {lesson.style === "theory" ? cs.styleTheory : cs.stylePractice}
              </span>
            )}
            <span className="text-white/30">·</span>
            <span>{s.lessonOf(lesson.no, lesson.total)}</span>
            <span className="text-white/30">·</span>
            <span className="tabular-nums">{fmtDuration(lesson.video.seconds)}</span>
            {hydrated && done && (
              <span className={`inline-flex items-center gap-1 rounded-full ${GOLD} px-2.5 py-0.5 text-[11px] tracking-wide text-primary-900`}>
                <Check className="h-3 w-3" strokeWidth={3} />
                {s.done}
              </span>
            )}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">{lesson.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">{lesson.summary}</p>
        </div>
      </div>

      <div className="container -mt-24 max-w-5xl pb-20 sm:-mt-32">
        <Player lesson={lesson} locale={locale} onComplete={complete} onQuiz={lesson.quiz.length ? toQuiz : null} celebrate={celebrate} />
        <LessonActions lesson={lesson} locale={locale} />
        <p className="mt-3 px-1 text-center text-xs text-ink-400 sm:text-sm">{s.subtitleNote}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="min-w-0 space-y-6">
            {(lesson.notice || lesson.audience === "pro") && (
              <section className="rounded-3xl bg-gradient-to-br from-[#fbf4e2] to-white p-5 ring-1 ring-[#e8d3a6] sm:p-6">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8a6a2a]">
                  <ShieldCheck className="h-4 w-4" />
                  {cs.noticeTitle}
                </p>
                {lesson.notice && <p className="mt-2 text-sm leading-relaxed text-ink-900 sm:text-base">{lesson.notice}</p>}
                {lesson.audience === "pro" && <p className="mt-2 text-xs leading-relaxed text-ink-400 sm:text-sm">{cs.disclaimer}</p>}
                {lesson.sources.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-bold text-ink-700">{cs.sourcesTitle}</p>
                    <ul className="mt-1 space-y-1">
                      {lesson.sources.map((src) => (
                        <li key={src.url}>
                          <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-xs font-semibold text-primary-700 underline-offset-2 hover:underline sm:text-sm">
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {src.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {lesson.steps.length > 0 && (
              <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
                <h2 className="text-lg font-extrabold text-ink-900 sm:text-xl">{lesson.audience === "pro" ? cs.keyPointsTitle : s.stepsTitle}</h2>
                <ol className="mt-4 space-y-3.5">
                  {lesson.steps.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${GOLD} text-xs font-extrabold text-primary-900`}>{i + 1}</span>
                      <p className="pt-0.5 text-sm leading-relaxed text-ink-900 sm:text-base">{step}</p>
                    </li>
                  ))}
                </ol>
                {lesson.tips.length > 0 && (
                  <div className="mt-6 rounded-2xl bg-peach-50 p-4 ring-1 ring-peach-200">
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral-600">
                      <Lightbulb className="h-4 w-4" />
                      {s.tipsTitle}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {lesson.tips.map((tip, i) => (
                        <li key={i} className="text-sm leading-relaxed text-ink-700">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  {lesson.href && (
                    <Link href={lesson.href} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
                      {lesson.hrefLabel ?? s.tryIt}
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  {lesson.guide && (
                    <Link href={`/help/getting-started#${lesson.guide}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary-700 ring-1 ring-primary-200 transition-colors hover:bg-primary-50">
                      <BookOpen className="h-4 w-4" />
                      {s.readGuide}
                    </Link>
                  )}
                </div>
              </section>
            )}

            {lesson.quiz.length > 0 && (
              <div ref={quizRef} className="scroll-mt-24">
                <Quiz lesson={lesson} locale={locale} />
              </div>
            )}
          </div>

          <aside className="min-w-0 space-y-6">
            {lesson.related.length > 0 && (
              <section className="rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-5 text-white shadow-card ring-1 ring-[#e8d3a6]/30">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#e8d3a6]">
                  <CalendarDays className="h-4 w-4" />
                  {cs.relatedTitle}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/75">{cs.relatedBody}</p>
                <ul className="mt-3 space-y-2">
                  {lesson.related.map((l) => (
                    <li key={l.slug}>
                      <Link href={`/academy/${l.slug}`} className="group flex items-center gap-3 rounded-2xl bg-white/[0.07] p-2 ring-1 ring-white/10 transition-colors hover:bg-white/[0.12]">
                        <span className="relative block aspect-video w-24 shrink-0 overflow-hidden rounded-xl bg-primary-900">
                          {l.poster && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={l.poster} alt="" loading="lazy" className="h-full w-full object-cover" />
                          )}
                          <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <Play className="h-4 w-4 fill-current text-white" />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold leading-snug">{l.title}</span>
                          <span className="block text-xs tabular-nums text-white/60">{fmtDuration(l.seconds)}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#e8d3a6] transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {lesson.next && (
              <Link
                href={`/academy/${lesson.next.slug}`}
                className="group flex items-center gap-4 rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-5 text-white shadow-card ring-1 ring-[#e8d3a6]/30 transition-transform hover:-translate-y-0.5"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${GOLD} text-primary-900`}>
                  <Play className="h-5 w-5 translate-x-px fill-current" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#e8d3a6]">{s.nextLesson}</span>
                  <span className="mt-0.5 block font-extrabold leading-snug">{lesson.next.title}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#e8d3a6] transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100">
              <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-ink-400">{s.upNext}</h2>
              <ul className="mt-3 space-y-1">
                {lesson.siblings.map((l) => {
                  const here = l.slug === lesson.slug;
                  const isDone = hydrated && !!state.lessons[l.slug]?.done;
                  const row = (
                    <span className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 ${here ? "bg-primary-50 ring-1 ring-primary-100" : l.live ? "hover:bg-mist-50" : ""}`}>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          isDone ? `${GOLD} text-primary-900` : here ? "bg-primary-900 text-white" : l.live ? "bg-mist-100 text-ink-700" : "bg-mist-100 text-ink-300"
                        }`}
                      >
                        {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : l.live ? l.no : <Lock className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm leading-snug ${here ? "font-extrabold text-ink-900" : l.live ? "font-semibold text-ink-900" : "text-ink-400"}`}>{l.title}</span>
                        <span className="block text-xs text-ink-400">{l.live ? fmtDuration(l.seconds) : s.soon}</span>
                      </span>
                    </span>
                  );
                  return <li key={l.slug}>{l.live && !here ? <Link href={`/academy/${l.slug}`}>{row}</Link> : row}</li>;
                })}
              </ul>
              <Link href={home} className="mt-3 inline-flex items-center gap-1.5 px-3 text-sm font-bold text-primary-600 hover:underline">
                {s.backToAcademy}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Player({
  lesson,
  locale,
  onComplete,
  onQuiz,
  celebrate,
}: {
  lesson: LessonViewData;
  locale: string;
  onComplete: () => void;
  onQuiz: (() => void) | null;
  celebrate: boolean;
}) {
  const s = academyStrings(locale);
  const { state, patchLesson } = useAcademyProgress();
  const hydrated = useHydrated();
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [speed, setSpeed] = useState(1);
  const lastSave = useRef(0);
  const saved = hydrated ? state.lessons[lesson.slug]?.pos ?? 0 : 0;
  const resumeAt = saved > 5 && saved < lesson.video.seconds - 8 ? saved : 0;

  const save = useCallback(
    (force = false) => {
      const v = ref.current;
      if (!v || !Number.isFinite(v.currentTime)) return;
      const now = Date.now();
      if (!force && now - lastSave.current < 4000) return;
      lastSave.current = now;
      const t = Math.floor(v.currentTime);
      patchLesson(lesson.slug, (p) => ({ ...p, pos: t, max: Math.max(p.max ?? 0, t) }));
      const length = Number.isFinite(v.duration) && v.duration > 0 ? v.duration : lesson.video.seconds;
      if (v.currentTime >= length * WATCHED_RATIO) onComplete();
    },
    [lesson.slug, lesson.video.seconds, onComplete, patchLesson]
  );

  // Don't lose the position when the tab is closed or the phone is locked.
  useEffect(() => {
    const flush = () => save(true);
    document.addEventListener("visibilitychange", flush);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", flush);
      window.removeEventListener("pagehide", flush);
    };
  }, [save]);

  const start = (from: number) => {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    setEnded(false);
    setFailed(false);
    try {
      if (from > 0) v.currentTime = from;
      else if (v.currentTime > 0) v.currentTime = 0;
    } catch {
      // Metadata not loaded yet — the video simply starts from the beginning.
    }
    v.playbackRate = speed;
    void v.play().catch(() => {});
  };

  const pickSpeed = (x: number) => {
    setSpeed(x);
    if (ref.current) ref.current.playbackRate = x;
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-black shadow-[0_40px_80px_-30px_rgba(31,24,45,0.85)] ring-1 ring-[#e8d3a6]/40 sm:rounded-3xl">
        <video
          ref={ref}
          src={lesson.video.src}
          poster={lesson.video.poster}
          controls={started && !ended}
          playsInline
          preload="metadata"
          className="block aspect-video w-full bg-black"
          onTimeUpdate={() => save()}
          onPause={() => save(true)}
          onRateChange={(e) => setSpeed(e.currentTarget.playbackRate)}
          onEnded={() => {
            save(true);
            onComplete();
            setEnded(true);
          }}
          onError={() => setFailed(true)}
        >
          <track kind="subtitles" srcLang={lesson.video.lang} label={lesson.video.lang === "vi" ? "Tiếng Việt" : "English"} src={lesson.video.captions} />
        </video>

        {!started && !failed && (
          <button type="button" onClick={() => start(resumeAt)} className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/60 via-black/10 to-black/20" aria-label={s.play}>
            <span className={`flex h-16 w-16 items-center justify-center rounded-full ${GOLD} text-primary-900 shadow-[0_16px_40px_-8px_rgba(176,138,62,0.9)] transition-transform group-hover:scale-110 sm:h-20 sm:w-20`}>
              <Play className="h-7 w-7 translate-x-0.5 fill-current sm:h-8 sm:w-8" />
            </span>
            <span className="rounded-full bg-black/55 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
              {resumeAt ? s.resumeFrom(fmtDuration(resumeAt)) : `${s.play} · ${fmtDuration(lesson.video.seconds)}`}
            </span>
          </button>
        )}

        {ended && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1a1326]/92 px-3 text-center text-white backdrop-blur-sm sm:gap-3 sm:px-4">
            {celebrate && <Confetti />}
            <span className={`hidden h-14 w-14 items-center justify-center rounded-full sm:flex ${GOLD} text-primary-900`}>
              <Trophy className="h-7 w-7" />
            </span>
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base font-extrabold sm:text-2xl">
              <Trophy className="h-5 w-5 text-[#f0d9a0] sm:hidden" />
              {s.ended}
            </p>
            {celebrate && <p className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-[#f0d9a0] ring-1 ring-[#e8d3a6]/40 sm:py-1 sm:text-sm">{s.earned(XP_LESSON)}</p>}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:mt-1">
              {onQuiz && (
                <button type="button" onClick={onQuiz} className={`inline-flex items-center gap-1.5 rounded-full ${GOLD} px-4 py-2 text-xs font-extrabold text-primary-900 transition-transform hover:scale-[1.03] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm`}>
                  <Award className="h-4 w-4" />
                  {s.toQuiz}
                </button>
              )}
              {lesson.next && (
                <Link href={`/academy/${lesson.next.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary-900 transition-transform hover:scale-[1.03] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm">
                  {s.nextLesson}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <button type="button" onClick={() => start(0)} aria-label={s.watchAgain} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-white ring-1 ring-white/25 hover:bg-white/15 sm:px-4 sm:py-2.5 sm:text-sm">
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">{s.watchAgain}</span>
              </button>
            </div>
          </div>
        )}

        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a1326]/95 px-6 text-center text-white">
            <p className="max-w-sm text-sm font-semibold sm:text-base">{s.videoError}</p>
            <button
              type="button"
              onClick={() => {
                setFailed(false);
                ref.current?.load();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary-900"
            >
              <RotateCcw className="h-4 w-4" />
              {s.reload}
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span className="mr-1 text-xs font-semibold text-ink-400">{s.speed}</span>
        {SPEEDS.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => pickSpeed(x)}
            aria-pressed={speed === x}
            className={`min-w-[52px] rounded-full px-3 py-1.5 text-xs font-bold tabular-nums transition-colors ${
              speed === x ? "bg-primary-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-primary-50"
            }`}
          >
            {x}×
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const NETWORKS: { id: string; label: string; dot: string; href: (url: string, title: string) => string }[] = [
  { id: "facebook", label: "Facebook", dot: "bg-[#1877f2]", href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { id: "whatsapp", label: "WhatsApp", dot: "bg-[#25d366]", href: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}` },
  { id: "telegram", label: "Telegram", dot: "bg-[#229ed9]", href: (u, t) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { id: "x", label: "X", dot: "bg-ink-900", href: (u, t) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
];

/** Save the video to the device, or pass the lesson on: the phone's own
 * share sheet where there is one, plus direct links to the big networks. */
function LessonActions({ lesson, locale }: { lesson: LessonViewData; locale: string }) {
  const s = academyStrings(locale);
  const [copied, setCopied] = useState(false);
  const canShare = useHydrated() && typeof navigator !== "undefined" && typeof navigator.share === "function";

  const share = async () => {
    try {
      await navigator.share({ title: lesson.title, text: lesson.summary, url: lesson.shareUrl });
    } catch {
      // The visitor closed the share sheet — nothing to do.
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lesson.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt(s.copyLink, lesson.shareUrl);
    }
  };

  const pill = "inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink-900 ring-1 ring-ink-100 transition-colors hover:bg-primary-50 sm:text-sm";

  return (
    <div className="mt-4 rounded-2xl bg-white/70 p-3 ring-1 ring-ink-100 sm:p-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={lesson.video.src}
          download={`varaaai-${lesson.slug}.mp4`}
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-full ${GOLD} px-4 py-2 text-xs font-extrabold text-primary-900 transition-transform hover:scale-[1.03] sm:text-sm`}
        >
          <Download className="h-4 w-4" />
          {s.download}
        </a>
        {canShare && (
          <button type="button" onClick={share} className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-white transition-transform hover:scale-[1.03] sm:text-sm">
            <Share2 className="h-4 w-4" />
            {s.share}
          </button>
        )}
        <button type="button" onClick={copy} className={pill}>
          {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-primary-500" />}
          {copied ? s.copied : s.copyLink}
        </button>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-semibold text-ink-400">{s.shareOn}</span>
        {NETWORKS.map((n) => (
          <a key={n.id} href={n.href(lesson.shareUrl, lesson.title)} target="_blank" rel="noopener noreferrer" className={pill}>
            <span className={`h-2.5 w-2.5 rounded-full ${n.dot}`} aria-hidden />
            {n.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Quiz({ lesson, locale }: { lesson: LessonViewData; locale: string }) {
  const s = academyStrings(locale);
  const { state, patchLesson } = useAcademyProgress();
  const hydrated = useHydrated();
  const total = lesson.quiz.length;
  const [at, setAt] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [right, setRight] = useState(0);
  const [finished, setFinished] = useState(false);
  const best = hydrated ? state.lessons[lesson.slug]?.quiz : undefined;
  const q = lesson.quiz[at];

  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === q.answer) setRight((n) => n + 1);
  };

  const forward = () => {
    if (at + 1 < total) {
      setAt(at + 1);
      setChosen(null);
      return;
    }
    setFinished(true);
    patchLesson(lesson.slug, (p) => ({ ...p, quiz: Math.max(p.quiz ?? 0, right), quizOf: total }));
  };

  const again = () => {
    setAt(0);
    setChosen(null);
    setRight(0);
    setFinished(false);
  };

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100">
      <div className="flex items-center gap-3 bg-gradient-to-r from-[#2a1f3d] to-primary-900 px-5 py-4 text-white sm:px-7">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${GOLD} text-primary-900`}>
          <Award className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-extrabold">{s.quizTitle}</h2>
          <p className="text-xs text-white/70 sm:text-sm">{s.quizBody(total, XP_ANSWER)}</p>
        </div>
        {best !== undefined && (
          <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#f0d9a0] ring-1 ring-[#e8d3a6]/40">
            {best}/{total}
          </span>
        )}
      </div>

      {finished ? (
        <div className="relative px-5 py-8 text-center sm:px-7">
          {right === total && <Confetti />}
          <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${GOLD} text-primary-900`}>
            <Trophy className="h-8 w-8" />
          </span>
          <p className="mt-4 text-xl font-extrabold text-ink-900">{right === total ? s.perfect : s.score(right, total)}</p>
          {right === total && <p className="mt-1 text-sm text-ink-400">{s.score(right, total)}</p>}
          <p className="mt-3 inline-block rounded-full bg-[#fbf4e2] px-4 py-1.5 text-sm font-extrabold text-[#8a6a2c] ring-1 ring-[#e8d3a6]">{s.earned(right * XP_ANSWER)}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {right < total && (
              <button type="button" onClick={again} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-50">
                <RotateCcw className="h-4 w-4" />
                {s.retry}
              </button>
            )}
            {lesson.next ? (
              <Link href={`/academy/${lesson.next.slug}`} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
                {s.nextLesson}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link href={`/academy${lesson.audience === "customer" ? "" : `#${lesson.audience}`}`} className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
                {s.backToAcademy}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="px-5 py-6 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b08a3e]">{s.question(at + 1, total)}</span>
            <span className="flex flex-1 gap-1.5">
              {lesson.quiz.map((_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < at || (i === at && chosen !== null) ? GOLD : "bg-ink-100"}`} />
              ))}
            </span>
          </div>
          <p className="mt-4 text-base font-extrabold leading-snug text-ink-900 sm:text-lg">{q.q}</p>
          <ul className="mt-4 space-y-2.5">
            {q.options.map((opt, i) => {
              const isRight = i === q.answer;
              const picked = chosen === i;
              const tone =
                chosen === null
                  ? "bg-white ring-ink-100 hover:ring-primary-300 hover:bg-primary-50/50"
                  : isRight
                    ? "bg-emerald-50 ring-emerald-300"
                    : picked
                      ? "bg-berry-50 ring-berry-200"
                      : "bg-white ring-ink-100 opacity-60";
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={chosen !== null}
                    className={`flex min-h-[52px] w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-ink-900 ring-1 transition-all sm:text-base ${tone}`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist-100 text-xs font-bold text-ink-700">
                      {chosen !== null && isRight ? <CircleCheck className="h-5 w-5 text-emerald-600" /> : chosen !== null && picked ? <CircleX className="h-5 w-5 text-berry-500" /> : String.fromCharCode(65 + i)}
                    </span>
                    <span className="min-w-0 flex-1">{opt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {chosen !== null && (
            <div className="mt-4 animate-slide-up">
              <p className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${chosen === q.answer ? "bg-emerald-50 text-emerald-900" : "bg-peach-50 text-ink-900"}`}>
                <span className="font-extrabold">{chosen === q.answer ? s.correct : s.wrong}</span> {q.why}
              </p>
              <button type="button" onClick={forward} className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
                {at + 1 < total ? s.nextQuestion : s.seeResult}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */

const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 7) * 0.09,
  color: ["#f0d9a0", "#b08a3e", "#ec6a47", "#b7a4dc", "#ffffff"][i % 5],
  rot: (i * 53) % 360,
  dur: 1.6 + (i % 5) * 0.22,
}));

/** A short burst of confetti; hidden for people who prefer less motion. */
function Confetti() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden" aria-hidden>
      <style>{`@keyframes academy-confetti{0%{transform:translateY(-12%) rotate(0deg);opacity:1}100%{transform:translateY(520%) rotate(540deg);opacity:0}}`}</style>
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className="absolute top-0 block h-3 w-2 rounded-[2px]"
          style={{ left: `${c.left}%`, background: c.color, transform: `rotate(${c.rot}deg)`, animation: `academy-confetti ${c.dur}s ${c.delay}s ease-in forwards` }}
        />
      ))}
    </span>
  );
}
