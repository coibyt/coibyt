import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";

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

  const business = await prisma.business.update({
    where: { id },
    data: {
      status: parsed.data.status,
      rejectReason: parsed.data.rejectReason,
      approvedAt: parsed.data.status === "APPROVED" ? new Date() : undefined,
    },
    include: { owner: { select: { name: true, email: true, locale: true } } },
  });

  const isVi = business.owner.locale === "vi";
  if (business.status === "APPROVED") {
    await sendMail({
      to: business.owner.email,
      subject: isVi ? "Doanh nghiệp của bạn đã được duyệt!" : "Your business is approved!",
      html: `<p>${isVi ? "Chúc mừng" : "Congrats"} ${business.owner.name}, <strong>${business.name}</strong> ${
        isVi ? "đã được duyệt trên VaraaAi.Com." : "has been approved on VaraaAi.Com."
      }</p>`,
    });
  } else if (business.status === "REJECTED") {
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
