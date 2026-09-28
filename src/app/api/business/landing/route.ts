import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { landingPageSchema } from "@/lib/validations";

async function getOrCreate(businessId: string) {
  const existing = await prisma.landingPage.findUnique({
    where: { businessId },
    include: { highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  if (existing) return existing;
  return prisma.landingPage.create({
    data: { businessId },
    include: { highlights: true },
  });
}

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const landing = await getOrCreate(owned.businessId);
  return NextResponse.json({ landing });
}

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = landingPageSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await getOrCreate(owned.businessId);
  const data = { ...parsed.data };
  // Empty string means "no custom URL" — store as null rather than "".
  if (data.heroButtonUrl === "") data.heroButtonUrl = undefined;
  if (data.introButtonUrl === "") data.introButtonUrl = undefined;

  const landing = await prisma.landingPage.update({
    where: { businessId: owned.businessId },
    data,
    include: { highlights: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] } },
  });
  return NextResponse.json({ landing });
}
