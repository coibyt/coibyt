import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Settings → Booking & policies: the no-show rules (src/lib/booking-protect.ts). */
const schema = z.object({
  noShowApprovalOn: z.boolean().optional(),
  noShowApprovalCount: z.number().int().min(1).max(20).optional(),
  autoCancelUnconfirmedHours: z.number().int().min(1).max(48).nullable().optional(),
  onTimePoints: z.number().int().min(0).max(1000).optional(),
});

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const b = await prisma.business.update({
    where: { id: owned.businessId },
    data: parsed.data,
    select: { noShowApprovalOn: true, noShowApprovalCount: true, autoCancelUnconfirmedHours: true, onTimePoints: true },
  });
  return NextResponse.json(b);
}
