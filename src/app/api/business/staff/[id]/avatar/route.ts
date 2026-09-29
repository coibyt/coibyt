import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/** Uploads a staff member's avatar photo — stored in the DB like
 * LandingImage/BusinessImage, since Hostinger's git-based deploy wipes
 * public/uploads on every push. Shown both on the dashboard staff list and
 * on the salon's public /site/*\/about page. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const staff = await prisma.staff.findFirst({ where: { id, businessId: owned.businessId } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await prisma.staffAvatar.upsert({
    where: { staffId: id },
    update: { data: buffer, mimeType: file.type },
    create: { staffId: id, data: buffer, mimeType: file.type },
  });

  const url = `/api/staff-avatar/${id}?v=${Date.now()}`;
  return NextResponse.json({ url });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const staff = await prisma.staff.findFirst({ where: { id, businessId: owned.businessId } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.staffAvatar.deleteMany({ where: { staffId: id } });
  return NextResponse.json({ ok: true });
}
