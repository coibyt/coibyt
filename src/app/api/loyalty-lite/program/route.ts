import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { currentLiteOwner } from "@/lib/loyalty-lite";

/** The salon's stamp card: how many stamps, what they earn, its name. */
const schema = z.object({
  stampsRequired: z.number().int().min(3).max(20).optional(),
  rewardText: z.string().trim().min(2).max(80).optional(),
  salonName: z.string().trim().min(2).max(120).optional(),
});

export async function PATCH(req: Request) {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const updated = await prisma.liteSalon.update({ where: { id: salon.id }, data: parsed.data });
  return NextResponse.json({ stampsRequired: updated.stampsRequired, rewardText: updated.rewardText, salonName: updated.salonName });
}
