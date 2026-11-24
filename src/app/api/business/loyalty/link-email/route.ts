import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { linkCardEmail, scanLoyaltyCard } from "@/lib/loyalty";
import { profileLockedError } from "@/lib/profile-completeness";

const schema = z.object({
  token: z.string().trim().min(4).max(32),
  email: z.string().trim().toLowerCase().email().max(191),
});

/** The customer booked with another email: link it to their card, then try the
 * scan again so that booking can earn its ticket straight away. */
export async function POST(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const locked = await profileLockedError(access.business.id);
  if (locked) return NextResponse.json(locked, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, reason: "INVALID" }, { status: 400 });

  const link = await linkCardEmail(access.business.id, parsed.data.token, parsed.data.email);
  if (!link.ok) return NextResponse.json(link, { status: 409 });

  const scan = await scanLoyaltyCard(access.business.id, parsed.data.token);
  return NextResponse.json({ linked: true, ...scan }, { status: scan.ok ? 200 : 409 });
}
