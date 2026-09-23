import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const booking = await prisma.booking.findFirst({
    where: { id, customerId: session.user.id },
    include: { business: { select: { cancellationWindowHours: true } } },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!["PENDING_PAYMENT", "CONFIRMED"].includes(booking.status)) {
    return NextResponse.json({ error: "CANNOT_CANCEL" }, { status: 409 });
  }

  const hoursUntilStart = (booking.startsAt.getTime() - Date.now()) / 3_600_000;
  if (hoursUntilStart < booking.business.cancellationWindowHours) {
    return NextResponse.json({ error: "CANCELLATION_WINDOW_PASSED" }, { status: 409 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  return NextResponse.json({ booking: updated });
}
