import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { LITE_COOKIE, cookieOptions, createTrialSalon, currentLiteSession, liteLocale } from "@/lib/loyalty-lite";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({ locale: z.string().max(8).default("vi") });

/** "Try it now, no email": a trial salon signed in on this browser (or the
 * one it already has), so the studio opens straight away. */
export async function POST(req: Request) {
  const session = await currentLiteSession();
  if (session) return NextResponse.json({ status: "SIGNED_IN" });
  const ip = await clientIp();
  // Real people try once or twice; bots don't get a pile of empty salons.
  if (!rateLimit(`lite-try:h:${ip}`, 5, 60 * 60_000) || !rateLimit(`lite-try:d:${ip}`, 20, 24 * 60 * 60_000)) {
    return NextResponse.json({ error: "TOO_MANY" }, { status: 429 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  const salon = await createTrialSalon(liteLocale(parsed.success ? parsed.data.locale : "vi"));
  (await cookies()).set(LITE_COOKIE, salon.accessToken, cookieOptions);
  return NextResponse.json({ status: "CREATED" });
}
