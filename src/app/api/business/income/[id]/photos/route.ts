import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { canSee, incomeAccess, INCOME_PHOTO_MAX_BYTES, INCOME_PHOTO_TYPES, MAX_INCOME_PHOTOS } from "@/lib/income";

/** Adds a photo (receipt, terminal slip…) to a report still waiting for
 * approval. The browser shrinks it to a JPEG first. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const report = await prisma.staffIncomeReport.findUnique({ where: { id }, include: { _count: { select: { photos: true } } } });
  if (!report || !canSee(access, report)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (report.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });
  if (report._count.photos >= MAX_INCOME_PHOTOS) return NextResponse.json({ error: "TOO_MANY" }, { status: 409 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (file.size > INCOME_PHOTO_MAX_BYTES) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!INCOME_PHOTO_TYPES.has(file.type)) return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });

  const photo = await prisma.staffIncomePhoto.create({
    data: { reportId: id, data: Buffer.from(await file.arrayBuffer()), mimeType: file.type },
    select: { id: true },
  });
  return NextResponse.json({ id: photo.id, url: `/api/business/income-photo/${photo.id}` }, { status: 201 });
}
