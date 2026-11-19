import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { cleanState, mergeStates, EMPTY } from "@/lib/academy/progress";
import { ensureAcademyTables } from "@/lib/academy/setup";

/** The learner's Academy progress saved to their account (GET), and saving
 * the browser's copy into it (PUT: merged, so nothing learnt anywhere is lost). */

const MAX_BYTES = 200_000;

async function signedInUser() {
  return (await auth())?.user?.id ?? null;
}

async function saved(userId: string) {
  const row = await prisma.academyProgress.findUnique({ where: { userId }, select: { data: true } });
  return row ? cleanState(row.data) : EMPTY;
}

export async function GET() {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const userId = await signedInUser();
  if (!userId) return NextResponse.json({ signedIn: false }, { status: 401 });
  return NextResponse.json({ signedIn: true, state: await saved(userId) });
}

export async function PUT(req: Request) {
  if (!(await ensureAcademyTables())) return NextResponse.json({ error: "SETUP" }, { status: 503 });
  const userId = await signedInUser();
  if (!userId) return NextResponse.json({ signedIn: false }, { status: 401 });
  if (!rateLimit(`academy-progress:${userId}`, 60, 60_000)) return NextResponse.json({ error: "RATE_LIMIT" }, { status: 429 });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "TOO_LARGE" }, { status: 413 });
  let body: { state?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }
  const merged = mergeStates(cleanState(body.state), await saved(userId));
  const data = JSON.stringify(merged);
  await prisma.academyProgress.upsert({ where: { userId }, create: { userId, data }, update: { data } });
  return NextResponse.json({ signedIn: true, state: merged });
}
