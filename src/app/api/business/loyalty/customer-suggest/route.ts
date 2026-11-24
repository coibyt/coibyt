import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { suggestNewCardCustomers } from "@/lib/loyalty";

/** Customers of this salon matching what the staff typed in the "Activate a
 * card" form (name or email). Only for staff who may see customers' contact
 * details; everyone else types the details in full. */
export async function GET(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  if (!access.canViewCustomerContactInfo) return NextResponse.json({ suggestions: [] });
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 120);
  const suggestions = await suggestNewCardCustomers(access.business.id, q);
  return NextResponse.json({ suggestions });
}
