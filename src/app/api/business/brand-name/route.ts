import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { brandNameFor } from "@/lib/marketing-send";

const schema = z.object({ brandName: z.string().trim().max(120) });

/** The owner's brand name for marketing emails sent as the whole system;
 * empty = worked out from the branch names again. */
export async function PATCH(req: Request) {
  const [owned, session] = await Promise.all([requireOwnerOnly(), auth()]);
  if (!owned || !session?.user) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await prisma.user.update({ where: { id: session.user.id }, data: { brandName: parsed.data.brandName || null } });
  return NextResponse.json({ brandName: await brandNameFor(session.user.id) });
}
