import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canSee, incomeAccess, reportJson, reportWithPhotos } from "@/lib/income";

const patchSchema = z.object({ action: z.enum(["approve", "unapprove"]) });

/** The owner approves a report (the staff member sees a green tick), or
 * takes the approval back so it can be corrected. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  const session = await auth();
  if (!access?.isOwner || !session?.user) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const report = await prisma.staffIncomeReport.findFirst({ where: { id, businessId: access.business.id }, select: { id: true } });
  if (!report) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.staffIncomeReport.update({
    where: { id },
    data:
      parsed.data.action === "approve"
        ? { status: "APPROVED", approvedAt: new Date(), approvedById: session.user.id }
        : { status: "PENDING", approvedAt: null, approvedById: null },
  });
  const full = await reportWithPhotos(id);
  return NextResponse.json({ report: reportJson(full!) });
}

/** Withdraws a report that hasn't been approved yet. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const report = await prisma.staffIncomeReport.findUnique({ where: { id } });
  if (!report || !canSee(access, report)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (report.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });
  await prisma.staffIncomeReport.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
