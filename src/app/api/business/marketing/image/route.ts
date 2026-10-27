import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const MAX_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** Uploads a picture for a marketing email (stored in the DB, same as
 * BusinessImage). The client shrinks photos before uploading. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });

  const img = await prisma.marketingImage.create({
    data: { businessId: owned.businessId, data: Buffer.from(await file.arrayBuffer()), mimeType: file.type },
    select: { id: true },
  });
  return NextResponse.json({ id: img.id, url: `/api/marketing-image/${img.id}` });
}
