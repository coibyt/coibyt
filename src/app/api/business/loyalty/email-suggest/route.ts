import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { suggestCardEmails } from "@/lib/loyalty";

/** Emails of this salon's customers matching what the staff typed, for the
 * "booked with another email?" box on a member card. Only for staff who may
 * see customers' contact details; everyone else types the full email. */
export async function GET(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  if (!access.canViewCustomerContactInfo) return NextResponse.json({ suggestions: [] });
  const url = new URL(req.url);
  const token = (url.searchParams.get("token") ?? "").slice(0, 32);
  const q = (url.searchParams.get("q") ?? "").slice(0, 120);
  const suggestions = await suggestCardEmails(access.business.id, token, q);
  return NextResponse.json({ suggestions });
}
