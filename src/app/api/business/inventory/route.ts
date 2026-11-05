import { NextResponse } from "next/server";
import { inventoryContext } from "@/lib/inventory";
import { loadInventory } from "@/lib/inventory-data";

/** The active branch's stock, cupboards and history (src/lib/inventory.ts). */
export async function GET() {
  const ctx = await inventoryContext();
  if (!ctx) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json(await loadInventory(ctx));
}
