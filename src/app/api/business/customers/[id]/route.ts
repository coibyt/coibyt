import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** A single customer's history with this business — who they are and every
 * visit, so an owner clicking into a booking can see how many times this
 * person has come in before without leaving the calendar. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const bookings = await prisma.booking.findMany({
    where: { businessId, customerId: id },
    select: {
      id: true,
      startsAt: true,
      status: true,
      priceCents: true,
      currency: true,
      service: { select: { name: true } },
      customer: { select: { name: true, phone: true, email: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  if (bookings.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const customer = bookings[0].customer;
  const completed = bookings.filter((b) => b.status === "COMPLETED");

  return NextResponse.json({
    customer: { name: customer.name, phone: customer.phone, email: customer.email },
    visitCount: completed.length,
    totalSpentCents: completed.reduce((sum, b) => sum + b.priceCents, 0),
    currency: bookings[0].currency,
    bookings: bookings.map((b) => ({
      id: b.id,
      startsAt: b.startsAt.toISOString(),
      status: b.status,
      serviceName: b.service.name,
      priceCents: b.priceCents,
      currency: b.currency,
    })),
  });
}
