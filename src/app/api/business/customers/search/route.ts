import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Looks up customers who've booked with this business before, matching by
 * name or phone — powers the "book for a customer" autocomplete so an owner
 * entering a walk-in doesn't have to retype details for a repeat visitor. */
export async function GET(req: Request) {
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ customers: [] });

  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      customer: {
        OR: [{ name: { contains: q } }, { phone: { contains: q } }],
      },
    },
    select: {
      customer: { select: { id: true, name: true, phone: true, email: true } },
    },
    orderBy: { startsAt: "desc" },
    take: 50,
  });

  const seen = new Map<string, { id: string; name: string; phone: string | null; email: string }>();
  for (const b of bookings) {
    if (!seen.has(b.customer.id)) seen.set(b.customer.id, b.customer);
    if (seen.size >= 8) break;
  }

  return NextResponse.json({ customers: Array.from(seen.values()) });
}
