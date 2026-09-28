import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({ published: z.boolean() });

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const landing = await prisma.landingPage.upsert({
    where: { businessId: owned.businessId },
    update: { published: parsed.data.published },
    create: { businessId: owned.businessId, published: parsed.data.published },
  });
  return NextResponse.json({ published: landing.published });
}
