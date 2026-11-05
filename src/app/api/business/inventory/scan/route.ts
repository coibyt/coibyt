import { NextResponse } from "next/server";
import { z } from "zod";
import { inventoryContext, resolveScan } from "@/lib/inventory";

const schema = z.object({ code: z.string().trim().min(1).max(200) });

/** What a scanned barcode or QR label is: an item, a cupboard, or unknown. */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const r = await resolveScan(ctx, parsed.data.code);
  if (r.type === "location") return NextResponse.json({ type: "location", location: { id: r.location.id, name: r.location.name } });
  return NextResponse.json(r);
}
