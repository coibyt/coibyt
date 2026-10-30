import { NextResponse } from "next/server";
import { customerScopeBusinessIds, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { emailCustomerReview } from "@/lib/customer-review";

async function pendingReview(id: string) {
  const access = await getBusinessAccess();
  if (!access?.isOwner) return null;
  const scopeIds = await customerScopeBusinessIds(access);
  return prisma.customerReview.findFirst({
    where: { id, businessId: { in: scopeIds }, status: "PENDING" },
    select: { id: true },
  });
}

/** The owner approves a staff member's rating: it's now final and the
 * customer is emailed the star count. */
export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await pendingReview(id);
  if (!review) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  await prisma.customerReview.update({
    where: { id: review.id },
    data: { status: "APPROVED", approvedAt: new Date() },
  });
  await emailCustomerReview(review.id);
  return NextResponse.json({ ok: true });
}

/** The owner turns a staff member's rating down: it's dropped without
 * telling the customer, and the booking can be rated again. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await pendingReview(id);
  if (!review) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  await prisma.customerReview.delete({ where: { id: review.id } });
  return NextResponse.json({ ok: true });
}
