import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { getMarketingRecipients } from "@/lib/marketing-recipients";

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const { eligible, cooldown } = await getMarketingRecipients(owned.businessId);

  return NextResponse.json({ count: eligible.length, cooldownCount: cooldown.length });
}
