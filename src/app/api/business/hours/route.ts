import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { businessHoursSchema } from "@/lib/validations";

export async function GET() {
  const businessId = await requireSectionBusinessId("hours");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const hours = await prisma.businessHours.findMany({ where: { businessId } });
  return NextResponse.json({ hours });
}

/** Replaces the full weekly schedule in one call — simpler and safer than
 * diffing individual day rows from the client. */
export async function PUT(req: Request) {
  const businessId = await requireSectionBusinessId("hours");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const body = await req.json();
  const parsed = businessHoursSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.businessHours.deleteMany({ where: { businessId } }),
    prisma.businessHours.createMany({
      data: parsed.data.map((h) => ({ ...h, businessId })),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
