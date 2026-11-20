import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** The dashboard's wait list tab: everyone still waiting at this branch
 * (src/lib/waitlist.ts). Opening the tab also clears the red dot. */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;
  const entries = await prisma.waitlistEntry.findMany({
    where: { businessId, leftAt: null, toDate: { gte: new Date(Date.now() - 86_400_000) } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
      fromDate: true,
      toDate: true,
      note: true,
      createdAt: true,
      notifiedAt: true,
      notifyCount: true,
      serviceId: true,
      staffId: true,
      service: { select: { name: true } },
      staff: { select: { name: true } },
    },
  });
  // Contact details only for those allowed to see customers' contacts.
  const seesContact = access.isOwner || access.canViewCustomerContactInfo;
  return NextResponse.json({
    entries: entries.map((e) => ({
      ...e,
      phone: seesContact ? e.phone : null,
      email: seesContact ? e.email : "",
      fromDate: e.fromDate.toISOString().slice(0, 10),
      toDate: e.toDate.toISOString().slice(0, 10),
      createdAt: e.createdAt.toISOString(),
      notifiedAt: e.notifiedAt?.toISOString() ?? null,
    })),
  });
}

/** The owner opened the tab: nothing is "new" any more. */
export async function PATCH() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  await prisma.business.update({ where: { id: access.business.id }, data: { waitlistSeenAt: new Date() } });
  return NextResponse.json({ ok: true });
}
