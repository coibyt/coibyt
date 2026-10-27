import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({ aiPaused: z.boolean() });

/** Lets the salon take a thread over from the AI assistant (aiPaused: true)
 * or hand it back (false) — the same flag a customer sets with "talk to the
 * owner". */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.customers)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const res = await prisma.conversation.updateMany({
    where: { id, businessId: access.business.id },
    data: { aiPaused: parsed.data.aiPaused },
  });
  if (res.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
