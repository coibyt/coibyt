import { NextResponse } from "next/server";
import { getBusinessAccess, requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { businessHoursSchema } from "@/lib/validations";
import { checkAndAwardReferralBonus } from "@/lib/vara-points";

/** Read-only and already public on the salon's own page, so any owner or
 * staff member of the business may read it — writing still needs "hours". */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const hours = await prisma.businessHours.findMany({ where: { businessId: access.business.id } });
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

  await checkAndAwardReferralBonus(businessId);
  return NextResponse.json({ ok: true });
}
