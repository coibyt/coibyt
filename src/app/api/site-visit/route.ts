import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  visitorId: z.string().min(1).max(100),
});

/** Fire-and-forget "ping" beacon from SiteVisitTracker — one row per ping,
 * purely so the admin dashboard can count distinct visitors today and right
 * now. visitorId is a random browser-local id, never a real identity.
 * Never errors visibly to the client — a bad/missing body is a silent
 * no-op, same pattern as /api/pwa-install and /api/referral-click. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: true });

  await prisma.siteVisit.create({ data: { visitorId: parsed.data.visitorId } });

  return NextResponse.json({ ok: true });
}
