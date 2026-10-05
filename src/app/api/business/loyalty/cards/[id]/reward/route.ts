import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { applyLoyaltyReward } from "@/lib/loyalty";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const applied = await applyLoyaltyReward(access.business.id, id);
  if (!applied) return NextResponse.json({ error: "NOT_READY" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
