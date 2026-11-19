import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { pageCourse } from "@/lib/academy";
import { courseReviews, finishedALesson } from "@/lib/academy/community";
import { ensureAcademyTables } from "@/lib/academy/setup";

/** Ratings of an Academy course: the list (GET, fresh, no cache) and the
 * signed-in learner's own rating (POST creates or updates it). */

const LOCALES = new Set(["vi", "en", "fi"]);

export async function GET(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const courseId = new URL(req.url).searchParams.get("course") ?? "";
  if (!pageCourse(courseId)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const userId = (await auth())?.user?.id ?? null;
  const [{ summary, reviews }, mine, canReview] = await Promise.all([
    courseReviews(courseId, 20),
    userId ? prisma.academyReview.findUnique({ where: { courseId_userId: { courseId, userId } }, select: { rating: true, comment: true, status: true } }) : null,
    userId ? finishedALesson(userId, courseId) : false,
  ]);
  return NextResponse.json(
    { signedIn: !!userId, canReview, mine, summary, reviews },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const userId = (await auth())?.user?.id;
  if (!userId) return NextResponse.json({ error: "SIGN_IN" }, { status: 401 });
  if (!rateLimit(`academy-review:${userId}`, 10, 60 * 60_000)) return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 });
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const courseId = typeof b.course === "string" ? b.course : "";
  const rating = typeof b.rating === "number" ? Math.round(b.rating) : 0;
  const comment = typeof b.comment === "string" ? b.comment.trim().replace(/\s{3,}/g, "\n\n").slice(0, 1000) : "";
  const locale = typeof b.locale === "string" && LOCALES.has(b.locale) ? b.locale : "vi";
  if (!pageCourse(courseId) || rating < 1 || rating > 5) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { isGuest: true } });
  if (!user || user.isGuest) return NextResponse.json({ error: "SIGN_IN" }, { status: 401 });
  if (!(await finishedALesson(userId, courseId))) return NextResponse.json({ error: "FINISH_A_LESSON" }, { status: 403 });

  const existing = await prisma.academyReview.findUnique({ where: { courseId_userId: { courseId, userId } }, select: { status: true } });
  // A review the admin hid stays hidden when it is edited.
  const data = { rating, comment: comment || null, locale };
  await prisma.academyReview.upsert({
    where: { courseId_userId: { courseId, userId } },
    create: { courseId, userId, ...data },
    update: existing?.status === "HIDDEN" ? data : { ...data, status: "APPROVED" },
  });
  return NextResponse.json({ ok: true });
}
