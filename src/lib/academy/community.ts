/** Server side of the Academy's account features: course ratings and the
 * "email me new lessons" follows. Only server code imports this file. */
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { cleanState } from "@/lib/academy/progress";
import { lessonsOfCourse } from "@/lib/academy";

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  date: string;
}

export interface ReviewSummary {
  average: number;
  count: number;
  /** How many 5, 4, 3, 2, 1-star ratings (index 0 = 5 stars). */
  stars: number[];
}

const EMPTY_SUMMARY: ReviewSummary = { average: 0, count: 0, stars: [0, 0, 0, 0, 0] };

/** The rating summary and the newest reviews of a course. Never throws: the
 * page is still shown (without reviews) if the database can't be reached. */
export async function courseReviews(courseId: string, take = 6): Promise<{ summary: ReviewSummary; reviews: ReviewItem[] }> {
  try {
    const where = { courseId, status: "APPROVED" as const };
    const [groups, rows] = await Promise.all([
      prisma.academyReview.groupBy({ by: ["rating"], where, _count: { _all: true } }),
      prisma.academyReview.findMany({
        where,
        orderBy: [{ updatedAt: "desc" }],
        take,
        select: { id: true, rating: true, comment: true, updatedAt: true, user: { select: { name: true } } },
      }),
    ]);
    const stars = [0, 0, 0, 0, 0];
    let sum = 0;
    let count = 0;
    for (const g of groups) {
      if (g.rating < 1 || g.rating > 5) continue;
      stars[5 - g.rating] += g._count._all;
      sum += g.rating * g._count._all;
      count += g._count._all;
    }
    return {
      summary: { average: count ? Math.round((sum / count) * 10) / 10 : 0, count, stars },
      reviews: rows.map((r) => ({
        id: r.id,
        name: (r.user.name || "").trim().slice(0, 40) || "—",
        rating: r.rating,
        comment: r.comment,
        date: r.updatedAt.toISOString().slice(0, 10),
      })),
    };
  } catch {
    return { summary: EMPTY_SUMMARY, reviews: [] };
  }
}

/** Has the learner finished at least one lesson of the course (per the
 * progress saved to their account)? Only they may rate it. */
export async function finishedALesson(userId: string, courseId: string) {
  const row = await prisma.academyProgress.findUnique({ where: { userId }, select: { data: true } });
  if (!row) return false;
  const state = cleanState(row.data);
  return lessonsOfCourse(courseId).some((l) => l.video && state.lessons[l.slug]?.done);
}

/** Signed token for the one-click "stop these emails" link (no login needed). */
export function unfollowToken(followId: string) {
  return createHmac("sha256", process.env.APP_SECRET ?? "").update(`academy-unfollow:${followId}`).digest("base64url").slice(0, 22);
}

export function isUnfollowToken(followId: string, token: string) {
  const a = Buffer.from(unfollowToken(followId));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const todayUtc = () => new Date().toISOString().slice(0, 10);
