import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getClientIp, registerReferralClick } from "@/lib/vara-points";

const schema = z.object({ code: z.string().min(1).max(64) });

/** Public, unauthenticated — called client-side whenever the public
 * /business landing page (or the application form) loads with `?aff=CODE`
 * in the URL. Only pays out when the code belongs to an owner's own
 * vara-points referral link (not the admin-run PlatformAffiliate commission
 * program, which has no click reward) — silently a no-op otherwise, so the
 * caller never needs to know which kind of code it sent. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: true });

  const owner = await prisma.user.findUnique({ where: { referralCode: parsed.data.code } });
  if (!owner) return NextResponse.json({ ok: true });

  const ip = getClientIp(req);
  if (!ip) return NextResponse.json({ ok: true });

  await registerReferralClick(owner.id, ip);
  return NextResponse.json({ ok: true });
}
