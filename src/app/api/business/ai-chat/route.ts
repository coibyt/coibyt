import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({ enabled: z.boolean() });

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const business = await prisma.business.update({
    where: { id: owned.businessId },
    data: { aiChatEnabled: parsed.data.enabled },
    select: { aiChatEnabled: true },
  });

  return NextResponse.json(business);
}
