import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { orderStatusEmail } from "@/lib/email/order-status-email";

const patchSchema = z.object({
  status: z.enum(["PENDING_PAYMENT", "CONFIRMED", "COMPLETED", "CANCELLED"]),
  // Email the customer about the new status (confirmed / completed / cancelled).
  notify: z.boolean().optional().default(true),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { status, notify } = parsed.data;

  const existing = await prisma.order.findFirst({
    where: { id, businessId },
    include: {
      items: { select: { name: true, qty: true, totalCents: true } },
      customer: { select: { name: true, email: true, locale: true, isGuest: true, guestContactEmail: true } },
      business: { select: { name: true, slug: true, logoUrl: true, city: true } },
    },
  });
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const order = await prisma.order.update({ where: { id }, data: { status } });

  let emailed = false;
  const to = existing.customer.isGuest ? existing.customer.guestContactEmail : existing.customer.email;
  if (notify && status !== existing.status && status !== "PENDING_PAYMENT" && to && !to.endsWith("@walkin.varaaai.com")) {
    const mail = orderStatusEmail({
      locale: existing.customer.locale,
      status,
      orderId: existing.id,
      customerName: existing.customer.name,
      salon: existing.business,
      items: existing.items,
      totalCents: existing.totalCents,
      currency: existing.currency,
      paymentMethod: existing.paymentMethod,
    });
    try {
      await sendMail({ to, subject: mail.subject, html: mail.html });
      emailed = true;
    } catch (err) {
      console.error("[order status email]", err);
    }
  }
  return NextResponse.json({ order, emailed });
}
