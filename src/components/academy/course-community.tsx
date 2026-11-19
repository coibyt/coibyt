"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bell, BellRing, Loader2, MessageSquareQuote, Star } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { accountStrings } from "@/lib/academy/account-strings";
import type { ReviewItem, ReviewSummary } from "@/lib/academy/community";

const back = (path: string) => `?callbackUrl=${encodeURIComponent(path)}`;

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} ${value >= i - 0.25 ? "fill-[#d9b25c] text-[#d9b25c]" : value >= i - 0.75 ? "fill-[#d9b25c]/50 text-[#d9b25c]" : "fill-ink-100 text-ink-100"}`} />
      ))}
    </span>
  );
}

const dateFmt = (iso: string, locale: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "short", year: "numeric" });

interface ApiData {
  signedIn: boolean;
  canReview: boolean;
  mine: { rating: number; comment: string | null; status: string } | null;
  summary: ReviewSummary;
  reviews: ReviewItem[];
}

/** "Learner reviews" under a course: the average and the star bars, the
 * signed-in learner's own rating form, and the newest reviews. The page
 * renders the first list on the server; this refreshes it after a review. */
export function CourseReviews({
  courseId,
  locale,
  firstLesson,
  initial,
}: {
  courseId: string;
  locale: string;
  firstLesson: string | null;
  initial: { summary: ReviewSummary; reviews: ReviewItem[] };
}) {
  const s = accountStrings(locale);
  const path = usePathname();
  const { status } = useSession();
  const [data, setData] = useState<ApiData | null>(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [all, setAll] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/academy/reviews?course=${encodeURIComponent(courseId)}`, { cache: "no-store" });
      if (!res.ok) return;
      const d = (await res.json()) as ApiData;
      setData(d);
      if (d.mine) {
        setRating(d.mine.rating);
        setComment(d.mine.comment ?? "");
      }
    } catch {
      // keep what the page rendered
    }
  }, [courseId]);

  // Fresh numbers and, once the session is known, the learner's own review.
  // A first sign-in also merges progress, so look again a moment later.
  useEffect(() => {
    if (status === "loading") return;
    load();
    if (status !== "authenticated") return;
    const t = setTimeout(load, 3000);
    return () => clearTimeout(t);
  }, [status, load]);

  const summary = data?.summary ?? initial.summary;
  const reviews = data?.reviews ?? initial.reviews;
  const shown = all ? reviews : reviews.slice(0, 4);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || busy) return;
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/academy/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: courseId, rating, comment, locale }),
      });
      setNote(res.ok ? s.thanks : res.status === 403 ? s.finishFirst : s.error);
      if (res.ok) await load();
    } catch {
      setNote(s.error);
    } finally {
      setBusy(false);
    }
  };

  const shownStars = hover || rating;

  return (
    <section id="danh-gia" className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
      <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.reviewsTitle}</h2>

      {/* summary */}
      <div className="mt-5 grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#2a1f3d] to-[#150f20] p-5 text-center text-white">
          <p className="text-5xl font-extrabold tabular-nums text-[#e8d3a6]">{summary.count ? summary.average.toFixed(1) : "—"}</p>
          <div className="mt-2 flex justify-center">
            <Stars value={summary.average} />
          </div>
          <p className="mt-1.5 text-xs font-semibold text-white/70">{s.reviewsCount(summary.count)}</p>
        </div>
        <ul className="space-y-1.5">
          {summary.stars.map((n, i) => {
            const pct = summary.count ? Math.round((n / summary.count) * 100) : 0;
            return (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="w-14 shrink-0 font-semibold text-ink-500">{s.stars(5 - i)}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100/60">
                  <span className="block h-full rounded-full bg-gradient-to-r from-[#e8d3a6] to-[#c9a25a]" style={{ width: `${pct}%` }} />
                </span>
                <span className="w-9 shrink-0 text-right tabular-nums text-ink-400">{pct}%</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* the learner's own review */}
      <div className="mt-6 rounded-2xl bg-mist-50 p-4 ring-1 ring-ink-100 sm:p-5">
        {status !== "authenticated" ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-600">{s.signInToReview}</p>
            <div className="flex shrink-0 gap-2">
              <Link href={`/auth/sign-up${back(path)}`} className="rounded-full bg-primary-900 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700">
                {s.signUp}
              </Link>
              <Link href={`/auth/sign-in${back(path)}`} className="rounded-full px-4 py-2 text-sm font-bold text-primary-900 ring-1 ring-ink-200 hover:bg-white">
                {s.signIn}
              </Link>
            </div>
          </div>
        ) : data && !data.canReview && !data.mine ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-600">{s.finishFirst}</p>
            {firstLesson && (
              <Link href={`/academy/${firstLesson}`} className="shrink-0 rounded-full bg-primary-900 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700">
                {s.startLesson}
              </Link>
            )}
          </div>
        ) : data ? (
          <form onSubmit={submit}>
            <p className="text-sm font-extrabold text-ink-900">{data.mine ? s.editReview : s.yourReview}</p>
            <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-label={s.pickStars} onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={rating === i}
                  aria-label={s.stars(i)}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  className="rounded-lg p-1 transition hover:scale-110"
                >
                  <Star className={`h-8 w-8 ${shownStars >= i ? "fill-[#d9b25c] text-[#d9b25c]" : "fill-white text-ink-200"}`} />
                </button>
              ))}
            </div>
            <label className="mt-3 block text-xs font-semibold text-ink-500" htmlFor="review-comment">
              {s.commentLabel}
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={3}
              placeholder={s.commentPlaceholder}
              className="mt-1 w-full rounded-2xl border-0 bg-white px-4 py-3 text-sm text-ink-900 ring-1 ring-ink-100 placeholder:text-ink-300 focus:ring-2 focus:ring-primary-400"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-ink-400">{data.mine?.status === "HIDDEN" ? s.hidden : s.publicName}</p>
              <button type="submit" disabled={!rating || busy} className="inline-flex items-center gap-2 rounded-full bg-primary-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary-700 disabled:opacity-50">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {data.mine ? s.update : s.send}
              </button>
            </div>
            {note && <p className="mt-2 text-sm font-semibold text-primary-700">{note}</p>}
          </form>
        ) : (
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-ink-300" />
        )}
      </div>

      {/* the reviews */}
      {reviews.length === 0 ? (
        <p className="mt-6 flex items-start gap-2 text-sm text-ink-500">
          <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-[#b08a3e]" />
          {s.reviewsNone}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-ink-100">
          {shown.map((r) => (
            <li key={r.id} className="flex gap-3 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-[#f3e7cc] text-sm font-extrabold uppercase text-primary-900">
                {r.name.trim().split(/\s+/).pop()?.[0] ?? "•"}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="font-bold text-ink-900">{r.name}</span>
                  <span className="text-xs text-ink-400">{dateFmt(r.date, locale)}</span>
                </div>
                <div className="mt-0.5">
                  <Stars value={r.rating} size="h-3.5 w-3.5" />
                </div>
                {r.comment && <p className="mt-1.5 whitespace-pre-line break-words text-sm leading-relaxed text-ink-700">{r.comment}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
      {!all && reviews.length > 4 && (
        <button type="button" onClick={() => setAll(true)} className="mt-2 rounded-full px-4 py-2 text-sm font-bold text-primary-700 ring-1 ring-ink-100 hover:bg-primary-50">
          {s.more}
        </button>
      )}
    </section>
  );
}

/** "Email me new lessons" for one course. Visitors get a sign-up link. */
export function FollowCourseButton({ courseId, locale, className = "" }: { courseId: string; locale: string; className?: string }) {
  const s = accountStrings(locale);
  const path = usePathname();
  const { status } = useSession();
  const [following, setFollowing] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/academy/follow?course=${encodeURIComponent(courseId)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setFollowing(!!d.following))
      .catch(() => {});
  }, [status, courseId]);

  if (status === "loading") return null;

  if (status !== "authenticated") {
    return (
      <Link href={`/auth/sign-up${back(path)}`} title={s.followSignIn} className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-primary-900 ring-1 ring-ink-100 transition hover:bg-primary-50 ${className}`}>
        <Bell className="h-4 w-4 text-[#b08a3e]" />
        {s.followOn}
      </Link>
    );
  }

  const toggle = async () => {
    if (busy || following === null) return;
    setBusy(true);
    try {
      const res = await fetch("/api/academy/follow", {
        method: following ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: courseId, locale }),
      });
      if (res.ok) setFollowing(!!(await res.json()).following);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        disabled={busy || following === null}
        aria-pressed={!!following}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold transition disabled:opacity-60 ${following ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "text-primary-900 ring-1 ring-ink-100 hover:bg-primary-50"}`}
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : following ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4 text-[#b08a3e]" />}
        {following ? s.followOff : s.followOn}
      </button>
      <p className="mt-1.5 text-center text-[11px] leading-snug text-ink-400">{s.followHint}</p>
    </div>
  );
}
