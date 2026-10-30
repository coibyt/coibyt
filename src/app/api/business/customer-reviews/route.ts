import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Staff ratings of customers waiting for the owner's approval, at the
 * active branch. Owner only. */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const rows = await prisma.customerReview.findMany({
    where: { businessId: access.business.id, status: "PENDING" },
    select: {
      id: true,
      rating: true,
      note: true,
      staffId: true,
      createdAt: true,
      customer: { select: { name: true } },
      booking: {
        select: {
          id: true,
          startsAt: true,
          service: { select: { name: true } },
          staff: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const staffIds = [...new Set(rows.map((r) => r.staffId).filter((x): x is string => !!x))];
  const raters = await prisma.staff.findMany({ where: { id: { in: staffIds } }, select: { id: true, name: true } });
  const raterName = new Map(raters.map((s) => [s.id, s.name]));

  return NextResponse.json({
    reviews: rows.map((r) => ({
      id: r.id,
      rating: r.rating,
      note: r.note,
      customerName: r.customer.name,
      bookingId: r.booking.id,
      startsAt: r.booking.startsAt.toISOString(),
      serviceName: r.booking.service.name,
      staffName: (r.staffId && raterName.get(r.staffId)) ?? r.booking.staff?.name ?? null,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}
