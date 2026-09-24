import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/**
 * Saves an uploaded logo/cover image straight into the database (see
 * BusinessImage in schema.prisma) rather than to disk. Hostinger's git-based
 * deploy recreates the app directory from scratch on every push, so a file
 * written to public/uploads at runtime would silently disappear the next
 * time this code shipped — which is exactly what happened here twice before
 * this fix. There's no cloud storage account configured either, so the DB is
 * the simplest thing that's actually guaranteed to persist.
 */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const businessId = owned.businessId;

  const form = await req.formData();
  const file = form.get("file");
  const kind = form.get("kind"); // "logo" | "cover"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  }
  if (kind !== "logo" && kind !== "cover") {
    return NextResponse.json({ error: "INVALID_KIND" }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const imageKind = kind === "logo" ? "LOGO" : "COVER";

  await prisma.businessImage.upsert({
    where: { businessId_kind: { businessId, kind: imageKind } },
    update: { data: buffer, mimeType: file.type },
    create: { businessId, kind: imageKind, data: buffer, mimeType: file.type },
  });

  // The version query param busts caches on re-upload — the URL is
  // otherwise stable, so it's safe to cache aggressively (see the serving
  // route), unlike the old uuid-per-upload disk filenames.
  const publicUrl = `/api/business-image/${businessId}/${kind}?v=${Date.now()}`;

  await prisma.business.update({
    where: { id: businessId },
    data: kind === "logo" ? { logoUrl: publicUrl } : { coverUrl: publicUrl },
  });

  return NextResponse.json({ url: publicUrl });
}
