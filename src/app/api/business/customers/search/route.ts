import { NextResponse } from "next/server";
import { contactCustomersToday } from "@/lib/contact-visibility";
import { customerScopeBusinessIds, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Looks up customers who've booked with this business before, matching by
 * name or phone — powers the "book for a customer" autocomplete so an owner
 * entering a walk-in doesn't have to retype details for a repeat visitor. */
export async function GET(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessIds = await customerScopeBusinessIds(access);

  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ customers: [] });

  const bookings = await prisma.booking.findMany({
    where: {
      businessId: { in: businessIds },
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

  // Staff find customers by name or phone, but only see contact details
  // when they may (src/lib/contact-visibility.ts).
  const todayOnly = access.canViewCustomerContactInfo ? await contactCustomersToday(access, access.business.timezone) : null;
  const sees = (id: string) => access.canViewCustomerContactInfo && (!todayOnly || todayOnly.has(id));
  return NextResponse.json({
    customers: Array.from(seen.values()).map((c) => (sees(c.id) ? c : { ...c, phone: null, email: "" })),
  });
}
