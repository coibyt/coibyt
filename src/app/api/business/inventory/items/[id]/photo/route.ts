import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inventoryContext } from "@/lib/inventory";

/** An item's photo, for whoever may see the stock. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await inventoryContext();
  if (!ctx) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const item = await prisma.inventoryItem.findFirst({ where: { id, ownerId: ctx.ownerId }, select: { photo: true, photoMime: true } });
  if (!item?.photo || !item.photoMime) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return new NextResponse(new Uint8Array(item.photo), {
    headers: { "Content-Type": item.photoMime, "Cache-Control": "private, max-age=31536000, immutable" },
  });
}
