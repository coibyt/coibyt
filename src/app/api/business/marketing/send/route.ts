import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail, marketingEmail } from "@/lib/mailer";
import { unsubscribeToken } from "@/lib/marketing-email";

const schema = z.object({
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { subject, message } = parsed.data;

  const business = await prisma.business.findUniqueOrThrow({
    where: { id: businessId },
    select: { name: true },
  });

  const bookings = await prisma.booking.findMany({
    where: { businessId },
    distinct: ["customerId"],
    select: {
      customer: { select: { id: true, email: true, name: true, locale: true, marketingOptOut: true } },
    },
  });

  const recipients = bookings
    .map((b) => b.customer)
    .filter((c) => !c.marketingOptOut && !c.email.endsWith("@walkin.varaaai.com"));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const bodyHtml = escapeHtml(message).replace(/\n/g, "<br/>");

  const results = await Promise.allSettled(
    recipients.map((customer) => {
      const unsubscribeUrl = `${siteUrl}/api/marketing/unsubscribe?u=${customer.id}&t=${unsubscribeToken(
        customer.id
      )}`;
      const email = marketingEmail({
        businessName: business.name,
        bodyHtml,
        locale: customer.locale,
        unsubscribeUrl,
      });
      return sendMail({ to: customer.email, subject, html: email.html });
    })
  );
  const sentCount = results.filter((r) => r.status === "fulfilled").length;

  await prisma.emailCampaign.create({
    data: { businessId, subject, bodyHtml, recipientCount: sentCount },
  });

  return NextResponse.json({ sent: sentCount, total: recipients.length });
}
