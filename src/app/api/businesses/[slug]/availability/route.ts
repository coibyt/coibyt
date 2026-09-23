import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("serviceId");
  const staffId = searchParams.get("staffId") ?? undefined;
  const dateParam = searchParams.get("date"); // YYYY-MM-DD

  if (!serviceId || !dateParam) {
    return NextResponse.json(
      { error: "serviceId and date are required" },
      { status: 400 }
    );
  }

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { id: true, status: true },
  });
  if (!business || business.status !== "APPROVED") {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
  }

  const slots = await getAvailableSlots({
    businessId: business.id,
    serviceId,
    staffId,
    dateStr: dateParam,
  });

  return NextResponse.json({
    slots: slots.map((s) => ({
      startsAt: s.startsAt.toISOString(),
      endsAt: s.endsAt.toISOString(),
      staffId: s.staffId,
    })),
  });
}
