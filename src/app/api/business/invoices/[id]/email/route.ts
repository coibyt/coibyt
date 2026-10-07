import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail, invoiceEmail } from "@/lib/mailer";
import { invoicePublicUrl, renderInvoicePdf, toInvoiceData, withDbRetry } from "@/lib/invoices";

const schema = z.object({ email: z.string().trim().email().max(180) });

/** Emails an already-issued invoice (as a PDF attachment, plus a link to the
 * public invoice page) to whatever address the salon enters in the
 * "pay at the counter" success panel — lets them send it to the customer's
 * own address even when the booking itself used a placeholder (e.g. a
 * walk-in) email. In the salon's own configured language, same as the
 * loyalty activation email. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }

  try {
    const invoice = await withDbRetry(() =>
      prisma.invoice.findFirst({ where: { id, businessId: access.business.id } })
    );
    if (!invoice) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const [business, customer] = await withDbRetry(() =>
      Promise.all([
        prisma.business.findUnique({
          where: { id: access.business.id },
          select: { name: true, defaultLocale: true },
        }),
        prisma.user.findUnique({
          where: { id: invoice.customerId },
          select: { name: true, email: true, phone: true },
        }),
      ])
    );
    if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    const locale = business.defaultLocale;

    // The PDF is a nice-to-have, not the point of the email — the view link
    // below always gets the customer to their invoice. So a PDF failure
    // degrades to a link-only email instead of blocking the send entirely.
    let pdf: Buffer | null = null;
    try {
      pdf = await renderInvoicePdf(toInvoiceData(invoice, customer, locale));
    } catch (err) {
      console.error("[POST /api/business/invoices/[id]/email] PDF render failed, sending link-only", err);
    }

    const email = invoiceEmail({
      customerName: customer?.name ?? "",
      businessName: business.name,
      invoiceNumber: invoice.number,
      viewUrl: invoicePublicUrl(invoice.token, locale),
      locale,
    });

    try {
      await sendMail({
        to: parsed.data.email,
        subject: email.subject,
        html: email.html,
        attachments: pdf
          ? [{ filename: `${invoice.number}.pdf`, content: pdf, contentType: "application/pdf" }]
          : undefined,
      });
    } catch (err) {
      console.error("[POST /api/business/invoices/[id]/email] sendMail failed", err);
      return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, pdfAttached: pdf !== null });
  } catch (err) {
    console.error("[POST /api/business/invoices/[id]/email] unexpected failure", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
