import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const status = new URL(req.url).searchParams.get("status") ?? undefined;

  const bookings = await prisma.booking.findMany({
    where: { businessId, ...(status ? { status: status as never } : {}) },
    include: {
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { startsAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ bookings });
}
