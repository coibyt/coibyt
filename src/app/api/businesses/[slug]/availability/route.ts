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
  const addOnIds = searchParams.get("addOnIds")?.split(",").filter(Boolean) ?? [];
  const extraServiceIds = searchParams.get("extraServiceIds")?.split(",").filter(Boolean) ?? [];

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

  // Never trust a client-supplied duration number — always re-derive extra
  // minutes from the add-on catalog itself, scoped to this business.
  let extraDurationMin = 0;
  if (addOnIds.length > 0) {
    const addOns = await prisma.serviceAddOn.findMany({
      where: { id: { in: addOnIds }, businessId: business.id, active: true },
      select: { durationMin: true },
    });
    extraDurationMin += addOns.reduce((sum, a) => sum + a.durationMin, 0);
  }
  if (extraServiceIds.length > 0) {
    const extraServices = await prisma.service.findMany({
      where: { id: { in: extraServiceIds }, businessId: business.id, active: true },
      select: { durationMin: true },
    });
    extraDurationMin += extraServices.reduce((sum, s) => sum + s.durationMin, 0);
  }

  const slots = await getAvailableSlots({
    businessId: business.id,
    serviceId,
    staffId,
    dateStr: dateParam,
    extraDurationMin,
  });

  return NextResponse.json({
    slots: slots.map((s) => ({
      startsAt: s.startsAt.toISOString(),
      endsAt: s.endsAt.toISOString(),
      staffId: s.staffId,
    })),
  });
}
