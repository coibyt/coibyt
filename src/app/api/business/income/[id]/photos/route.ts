import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { canSee, incomeAccess, INCOME_PHOTO_MAX_BYTES, INCOME_PHOTO_TYPES, MAX_INCOME_PHOTOS, MAX_OWNER_DOCS, OWNER_DOC_MAX_BYTES, OWNER_DOC_TYPES } from "@/lib/income";

/** Adds a photo (receipt, terminal slip…) to a report still waiting for
 * approval. The browser shrinks it to a JPEG first.
 *
 * With owner=1 (owner only): a document explaining the owner's correction —
 * a photo or a PDF, at any status. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const report = await prisma.staffIncomeReport.findUnique({ where: { id } });
  if (!report || !canSee(access, report)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const form = await req.formData().catch(() => null);
  const byOwner = form?.get("owner") === "1";
  if (byOwner && !access.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!byOwner) {
    if (report.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });
    if (report.staffOriginal && !access.isOwner) return NextResponse.json({ error: "OWNER_EDITED" }, { status: 409 });
  }
  const count = await prisma.staffIncomePhoto.count({ where: { reportId: id, byOwner } });
  if (count >= (byOwner ? MAX_OWNER_DOCS : MAX_INCOME_PHOTOS)) return NextResponse.json({ error: "TOO_MANY" }, { status: 409 });

  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "NO_FILE" }, { status: 400 });
  if (file.size > (byOwner ? OWNER_DOC_MAX_BYTES : INCOME_PHOTO_MAX_BYTES)) return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
  if (!(byOwner ? OWNER_DOC_TYPES : INCOME_PHOTO_TYPES).has(file.type)) return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });

  const photo = await prisma.staffIncomePhoto.create({
    data: {
      reportId: id,
      data: Buffer.from(await file.arrayBuffer()),
      mimeType: file.type,
      byOwner,
      fileName: byOwner ? (file.name || "").slice(0, 160) || null : null,
    },
    select: { id: true },
  });
  return NextResponse.json({ id: photo.id, url: `/api/business/income-photo/${photo.id}` }, { status: 201 });
}
