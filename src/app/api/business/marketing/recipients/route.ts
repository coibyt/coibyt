import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const bookings = await prisma.booking.findMany({
    where: { businessId: owned.businessId },
    distinct: ["customerId"],
    select: { customer: { select: { email: true, marketingOptOut: true } } },
  });

  const count = bookings.filter(
    (b) => !b.customer.marketingOptOut && !b.customer.email.endsWith("@walkin.varaaai.com")
  ).length;

  return NextResponse.json({ count });
}
