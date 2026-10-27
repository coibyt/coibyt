import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ businessId: z.string().min(1).max(40), code: z.string().min(1).max(40) });

/** Public — counts a visit to a salon's page through a partner's `?aff=`
 * link. The browser only calls this once per code per day (see
 * AffiliateCookieSetter); unknown codes are silently ignored. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (parsed.success) {
    await prisma.affiliate.updateMany({
      where: { code: parsed.data.code.toUpperCase(), businessId: parsed.data.businessId, active: true },
      data: { clickCount: { increment: 1 } },
    });
  }
  return NextResponse.json({ ok: true });
}
