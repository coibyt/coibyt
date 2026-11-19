import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { pageCourse } from "@/lib/academy";
import { todayUtc } from "@/lib/academy/community";
import { ensureAcademyTables } from "@/lib/academy/setup";

/** "Email me new lessons" for one Academy course: GET ?course= tells whether
 * the signed-in learner follows it, POST follows, DELETE stops. */

const LOCALES = new Set(["vi", "en", "fi"]);

async function body(req: Request) {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export async function GET(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const courseId = new URL(req.url).searchParams.get("course") ?? "";
  const userId = (await auth())?.user?.id;
  if (!userId || !pageCourse(courseId)) return NextResponse.json({ signedIn: !!userId, following: false }, { headers: { "Cache-Control": "no-store" } });
  const row = await prisma.academyFollow.findUnique({ where: { userId_courseId: { userId, courseId } }, select: { id: true } });
  return NextResponse.json({ signedIn: true, following: !!row }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const userId = (await auth())?.user?.id;
  if (!userId) return NextResponse.json({ error: "SIGN_IN" }, { status: 401 });
  if (!rateLimit(`academy-follow:${userId}`, 30, 60_000)) return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 });
  const b = await body(req);
  const courseId = typeof b.course === "string" ? b.course : "";
  const locale = typeof b.locale === "string" && LOCALES.has(b.locale) ? b.locale : "vi";
  if (!pageCourse(courseId)) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  // Only lessons published from now on are announced.
  await prisma.academyFollow.upsert({
    where: { userId_courseId: { userId, courseId } },
    create: { userId, courseId, locale, notifiedThrough: todayUtc() },
    update: { locale },
  });
  return NextResponse.json({ following: true });
}

export async function DELETE(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const userId = (await auth())?.user?.id;
  if (!userId) return NextResponse.json({ error: "SIGN_IN" }, { status: 401 });
  const b = await body(req);
  const courseId = typeof b.course === "string" ? b.course : "";
  await prisma.academyFollow.deleteMany({ where: { userId, courseId } });
  return NextResponse.json({ following: false });
}
