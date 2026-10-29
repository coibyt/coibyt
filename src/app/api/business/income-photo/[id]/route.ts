import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { canSee, incomeAccess } from "@/lib/income";

async function findPhoto(id: string) {
  const access = await incomeAccess();
  if (!access) return { error: NextResponse.json({ error: "FORBIDDEN" }, { status: 403 }) };
  const photo = await prisma.staffIncomePhoto.findUnique({
    where: { id },
    include: { report: { select: { businessId: true, staffId: true, status: true } } },
  });
  if (!photo || !canSee(access, photo.report)) return { error: NextResponse.json({ error: "NOT_FOUND" }, { status: 404 }) };
  return { photo };
}

/** A report photo — only for the owner and the staff member it belongs to. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await findPhoto(id);
  if ("error" in found) return found.error;
  const { photo } = found;
  return new NextResponse(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": photo.mimeType,
      "Content-Length": String(photo.data.length),
      "Cache-Control": "private, max-age=86400",
    },
  });
}

/** Removes a photo from a report that isn't approved yet. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await findPhoto(id);
  if ("error" in found) return found.error;
  if (found.photo.report.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });
  await prisma.staffIncomePhoto.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
