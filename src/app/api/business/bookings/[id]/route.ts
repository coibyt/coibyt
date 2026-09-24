import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"]),
  cancelReason: z.enum(["CANCELLED_BY_CUSTOMER", "CANCELLED_BY_SALON"]).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const booking = await prisma.booking.findFirst({
    where: { id, businessId },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: parsed.data.status, cancelReason: parsed.data.cancelReason },
  });
  return NextResponse.json({ booking: updated });
}
