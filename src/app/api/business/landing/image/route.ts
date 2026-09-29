import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/** Uploads an image for one slot of the owner's landing page — "hero",
 * "intro", or a highlight's own id — reusing the same in-DB storage pattern
 * as BusinessImage (see that model for why: Hostinger wipes public/uploads
 * on every deploy). */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const form = await req.formData();
  const file = form.get("file");
  const slot = form.get("slot");

  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (typeof slot !== "string" || !slot) {
    return NextResponse.json({ error: "INVALID_SLOT" }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  }

  // A highlight's slot must actually belong to this owner's landing page —
  // otherwise any signed-in owner could overwrite another salon's image by
  // guessing a highlight id.
  const landing = await prisma.landingPage.upsert({
    where: { businessId: owned.businessId },
    update: {},
    create: { businessId: owned.businessId },
  });
  const isHeroSlide = /^hero-slide-[0-4]$/.test(slot);
  if (slot !== "hero" && slot !== "intro" && !isHeroSlide) {
    const highlight = await prisma.landingHighlight.findFirst({
      where: { id: slot, landingPageId: landing.id },
      select: { id: true },
    });
    if (!highlight) return NextResponse.json({ error: "INVALID_SLOT" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await prisma.landingImage.upsert({
    where: { landingPageId_slot: { landingPageId: landing.id, slot } },
    update: { data: buffer, mimeType: file.type },
    create: { landingPageId: landing.id, slot, data: buffer, mimeType: file.type },
  });

  const url = `/api/landing-image/${landing.id}/${slot}?v=${Date.now()}`;
  return NextResponse.json({ url });
}

/** Removes one slot's image — currently only used to clear a hero slide, so
 * the owner can drop back below 5 without replacing it with another photo. */
export async function DELETE(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const { slot } = await req.json();
  if (typeof slot !== "string" || !slot) {
    return NextResponse.json({ error: "INVALID_SLOT" }, { status: 400 });
  }

  const landing = await prisma.landingPage.findUnique({ where: { businessId: owned.businessId } });
  if (!landing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.landingImage.deleteMany({ where: { landingPageId: landing.id, slot } });
  return NextResponse.json({ ok: true });
}
