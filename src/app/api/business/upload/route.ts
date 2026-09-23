import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Saves an uploaded logo/cover image to disk under public/uploads and
 * updates the business record. There's no cloud storage account configured
 * yet (no Cloudinary/S3 credentials), so this writes straight to the app's
 * own filesystem — see docs/DEPLOYMENT.md for the caveat that a full rebuild
 * on Hostinger *could* wipe this directory if it isn't preserved between
 * deploys, and how to move to real object storage once that matters.
 */
export async function POST(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

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
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "uploads", "businesses", businessId);
  await mkdir(dir, { recursive: true });

  const filename = `${kind}-${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  const publicUrl = `/uploads/businesses/${businessId}/${filename}`;

  await prisma.business.update({
    where: { id: businessId },
    data: kind === "logo" ? { logoUrl: publicUrl } : { coverUrl: publicUrl },
  });

  return NextResponse.json({ url: publicUrl });
}
