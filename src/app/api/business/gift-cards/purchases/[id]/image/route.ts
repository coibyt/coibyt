import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { loadGiftCardDesign, renderGiftCardPng } from "@/lib/gift-card-image";

/** The designed gift card as a PNG — the same image that's emailed, so the
 * owner can view, download or share it themselves. ?download=1 saves it. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const { searchParams } = new URL(req.url);

  const design = await loadGiftCardDesign(id, owned.businessId, searchParams.get("locale") ?? "vi");
  if (!design) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const png = await renderGiftCardPng(design);
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "private, no-store",
      ...(searchParams.get("download")
        ? { "Content-Disposition": `attachment; filename="gift-card-${design.code}.png"` }
        : {}),
    },
  });
}
