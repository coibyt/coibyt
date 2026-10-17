import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { emailGiftCard } from "@/lib/gift-card-image";

const schema = z.object({ locale: z.string().max(5).default("vi") });

/** (Re)sends the designed gift card image to the card's recipient. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const { locale } = schema.parse(await req.json().catch(() => ({})));

  try {
    await emailGiftCard(id, owned.businessId, locale);
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_FOUND") {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    console.error("[gift-card send email]", err);
    return NextResponse.json({ error: "EMAIL_FAILED" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
