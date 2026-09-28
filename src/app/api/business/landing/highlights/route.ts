import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { landingHighlightSchema } from "@/lib/validations";

const MAX_HIGHLIGHTS = 6;

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = landingHighlightSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const landing = await prisma.landingPage.upsert({
    where: { businessId: owned.businessId },
    update: {},
    create: { businessId: owned.businessId },
  });

  const count = await prisma.landingHighlight.count({ where: { landingPageId: landing.id } });
  if (count >= MAX_HIGHLIGHTS) {
    return NextResponse.json({ error: "TOO_MANY" }, { status: 400 });
  }

  const { buttonUrl, ...rest } = parsed.data;
  const highlight = await prisma.landingHighlight.create({
    data: { ...rest, buttonUrl: buttonUrl || null, landingPageId: landing.id, sortOrder: count },
  });
  return NextResponse.json({ highlight }, { status: 201 });
}
