import { NextResponse } from "next/server";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { segmentCounts } from "@/lib/marketing-recipients";

/** How many customers each audience segment reaches right now. */
export async function GET() {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json({ segments: await segmentCounts(owned.businessId) });
}
