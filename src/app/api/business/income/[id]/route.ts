import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { canSee, incomeAccess, reportJson, reportWithPhotos } from "@/lib/income";
import type { IncomeAmounts } from "@/lib/income-math";

const patchSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("approve") }),
  z.object({ action: z.literal("unapprove") }),
  // "Chưa duyệt": sent back to the staff member with the reason.
  z.object({ action: z.literal("reject"), note: z.string().trim().min(1).max(500) }),
  // Undo the owner's correction: the staff member's numbers count again.
  z.object({ action: z.literal("revert") }),
]);

/** The owner approves a report (the staff member sees a green tick), sends
 * it back with a reason, or takes an approval back so it can be corrected. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  const session = await auth();
  if (!access?.isOwner || !session?.user) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const report = await prisma.staffIncomeReport.findFirst({ where: { id, businessId: access.business.id }, select: { id: true, staffOriginal: true } });
  if (!report) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const a = parsed.data;
  if (a.action === "revert") {
    const staff = report.staffOriginal as unknown as IncomeAmounts | null;
    await prisma.$transaction([
      prisma.staffIncomeReport.update({
        where: { id },
        data: {
          ...(staff
            ? {
                cashCents: staff.cashCents,
                bankCents: staff.bankCents,
                onlineCents: staff.onlineCents ?? 0,
                onlineSource: staff.onlineSource ?? null,
                giftCard1Cents: staff.giftCard1Cents,
                giftCard1Code: staff.giftCard1Code ?? null,
                giftCard1Percent: staff.giftCard1Percent,
                giftCard2Cents: staff.giftCard2Cents,
                giftCard2Code: staff.giftCard2Code ?? null,
                giftCard2Percent: staff.giftCard2Percent,
                tipCents: staff.tipCents,
                totalCents: staff.totalCents,
              }
            : {}),
          staffOriginal: Prisma.DbNull,
          ownerEditNote: null,
          ownerEditedAt: null,
          ownerEditedById: null,
        },
      }),
      prisma.staffIncomePhoto.deleteMany({ where: { reportId: id, byOwner: true } }),
    ]);
    const full = await reportWithPhotos(id);
    return NextResponse.json({ report: reportJson(full!) });
  }
  await prisma.staffIncomeReport.update({
    where: { id },
    data:
      a.action === "approve"
        ? { status: "APPROVED", approvedAt: new Date(), approvedById: session.user.id, rejectedAt: null }
        : a.action === "reject"
          ? { status: "REJECTED", ownerNote: a.note, rejectedAt: new Date(), approvedAt: null, approvedById: null }
          : { status: "PENDING", approvedAt: null, approvedById: null },
  });
  const full = await reportWithPhotos(id);
  return NextResponse.json({ report: reportJson(full!) });
}

/** Withdraws a report that hasn't been approved yet — not for the staff
 * member once the owner has corrected it. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const report = await prisma.staffIncomeReport.findUnique({ where: { id } });
  if (!report || !canSee(access, report)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (report.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });
  if (report.staffOriginal && !access.isOwner) return NextResponse.json({ error: "OWNER_EDITED" }, { status: 409 });
  await prisma.staffIncomeReport.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
