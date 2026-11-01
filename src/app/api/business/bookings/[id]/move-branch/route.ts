import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { getBusinessAccess } from "@/lib/current-business";
import { sendBookingRescheduledEmail } from "@/lib/booking-service";
import { moveBooking, moveOptions } from "@/lib/booking-move";

/** The owner moves a booking to another of their branches (src/lib/booking-move.ts). */
async function ownerAccess() {
  const session = await auth();
  const access = await getBusinessAccess();
  if (!session?.user || !access?.isOwner) return null;
  return { ownerId: session.user.id, businessId: access.business.id };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await ownerAccess();
  if (!o) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const options = await moveOptions(id, o.businessId, o.ownerId);
  if (!options) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ options });
}

const schema = z.object({ businessId: z.string().cuid(), notify: z.boolean().default(false) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await ownerAccess();
  if (!o) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const result = await moveBooking(id, o.businessId, o.ownerId, parsed.data.businessId);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, missing: result.missing ?? null }, { status: result.error === "NOT_FOUND" ? 404 : 409 });
  }
  // The usual "your booking has changed" email — it shows the new address.
  let emailed = false;
  if (parsed.data.notify) {
    try {
      emailed = await sendBookingRescheduledEmail(id, { force: true });
    } catch (err) {
      console.error("[move-branch] email", id, err);
    }
  }
  return NextResponse.json({ ok: true, businessName: result.businessName, emailed });
}
