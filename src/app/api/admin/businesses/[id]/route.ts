import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import { approveBusiness } from "@/lib/approve-business";

const schema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "SUSPENDED"]),
  rejectReason: z.string().max(1000).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.status === "APPROVED") {
    const current = await prisma.business.findUnique({ where: { id }, select: { status: true } });
    if (!current) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    // Lifting a suspension just flips the status back — no "your salon was
    // approved" email, since the owner has already been through approval.
    if (current.status === "SUSPENDED") {
      const business = await prisma.business.update({ where: { id }, data: { status: "APPROVED" } });
      return NextResponse.json({ business });
    }
    const business = await approveBusiness(id);
    return NextResponse.json({ business });
  }

  const business = await prisma.business.update({
    where: { id },
    data: { status: parsed.data.status, rejectReason: parsed.data.rejectReason },
    include: { owner: { select: { name: true, email: true, locale: true } } },
  });

  const isVi = business.owner.locale === "vi";
  if (business.status === "REJECTED") {
    await sendMail({
      to: business.owner.email,
      subject: isVi ? "Hồ sơ doanh nghiệp chưa được duyệt" : "Your business application was not approved",
      html: `<p>${business.owner.name}, <strong>${business.name}</strong> ${
        isVi ? "chưa được duyệt." : "was not approved."
      } ${business.rejectReason ?? ""}</p>`,
    });
  }

  return NextResponse.json({ business });
}

/** Permanently removes a salon and everything under it (services, staff,
 * bookings, chats...). The owner's user account is left alone. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const business = await prisma.business.findUnique({ where: { id }, select: { id: true } });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // Bookings reference services without a cascade, so they have to go first
  // or the service cascade from the business delete would be blocked.
  await prisma.$transaction([
    prisma.booking.deleteMany({ where: { businessId: id } }),
    prisma.business.delete({ where: { id } }),
  ]);

  return NextResponse.json({ ok: true });
}
