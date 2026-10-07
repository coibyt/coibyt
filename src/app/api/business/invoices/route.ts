import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingStaffScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { newInvoiceNumber, randomInvoiceToken, invoicePublicUrl, invoiceQrPng, withDbRetry } from "@/lib/invoices";
import { redeemGiftCard } from "@/lib/gift-cards";

const lineSchema = z.object({
  name: z.string().min(1).max(160),
  qty: z.number().int().min(1).max(99),
  unitPriceCents: z.number().int().min(0),
});

const createSchema = z.object({
  bookingId: z.string().cuid(),
  lines: z.array(lineSchema).min(1).max(20),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "GIFT_CARD"]),
  giftCardCode: z.string().max(40).optional(),
  note: z.string().max(500).optional(),
});

/** Issues a receipt from the dashboard's "pay at the counter" checkout and
 * marks the booking COMPLETED — the invoice itself is a standalone record
 * (see src/lib/invoices.ts), not a Prisma relation, same convention as
 * GiftCardPurchase. Requires the salon's invoice billing details to already
 * be filled in on the Settings page. */
export async function POST(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;
  const scopeStaffId = bookingStaffScope(access);

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  try {
    const business = await withDbRetry(() =>
      prisma.business.findUnique({
        where: { id: businessId },
        select: {
          invoiceCompanyName: true,
          invoiceCompanyAddress: true,
          invoiceTaxId: true,
          invoiceVatPercent: true,
          defaultCurrency: true,
          defaultLocale: true,
        },
      })
    );
    if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    if (!business.invoiceCompanyName) {
      return NextResponse.json({ error: "NEEDS_INVOICE_SETTINGS" }, { status: 400 });
    }

    const booking = await withDbRetry(() =>
      prisma.booking.findFirst({
        where: {
          id: data.bookingId,
          businessId,
          ...(scopeStaffId ? { staffId: scopeStaffId } : {}),
        },
        select: { id: true, customerId: true, currency: true, status: true },
      })
    );
    if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

    if (data.paymentMethod === "GIFT_CARD") {
      if (!data.giftCardCode) {
        return NextResponse.json({ error: "GIFT_CARD_CODE_REQUIRED" }, { status: 400 });
      }
      const redeemed = await redeemGiftCard({
        businessId,
        code: data.giftCardCode,
        bookingId: booking.id,
      });
      if (!redeemed.ok) {
        return NextResponse.json({ error: `GIFT_CARD_${redeemed.reason}` }, { status: 409 });
      }
    }

    // Line prices are what the customer actually pays — VAT-inclusive,
    // same convention as every price elsewhere in the app (and as
    // Booksalon/Timma show it) — so VAT is extracted out of the total
    // rather than added on top of it.
    const totalCents = data.lines.reduce((sum, l) => sum + l.qty * l.unitPriceCents, 0);
    const vatPercent = business.invoiceVatPercent ?? 0;
    const vatCents = Math.round((totalCents * vatPercent) / (100 + vatPercent));
    const subtotalCents = totalCents - vatCents;

    const token = randomInvoiceToken();
    const [invoice] = await prisma.$transaction([
      prisma.invoice.create({
        data: {
          businessId,
          bookingId: booking.id,
          customerId: booking.customerId,
          number: newInvoiceNumber(),
          token,
          lines: data.lines.map((l) => ({ ...l, totalCents: l.qty * l.unitPriceCents })),
          subtotalCents,
          vatPercent,
          vatCents,
          totalCents,
          currency: booking.currency,
          paymentMethod: data.paymentMethod,
          giftCardCode: data.paymentMethod === "GIFT_CARD" ? data.giftCardCode : null,
          note: data.note || null,
          companyName: business.invoiceCompanyName,
          companyAddress: business.invoiceCompanyAddress,
          companyTaxId: business.invoiceTaxId,
        },
      }),
      ...(booking.status !== "COMPLETED"
        ? [prisma.booking.update({ where: { id: booking.id }, data: { status: "COMPLETED" as const } })]
        : []),
    ]);

    const qr = await invoiceQrPng(invoice.token, business.defaultLocale);
    return NextResponse.json({
      id: invoice.id,
      number: invoice.number,
      token: invoice.token,
      totalCents: invoice.totalCents,
      currency: invoice.currency,
      publicUrl: invoicePublicUrl(invoice.token, business.defaultLocale),
      qrDataUri: `data:image/png;base64,${qr.toString("base64")}`,
    });
  } catch (err) {
    console.error("[POST /api/business/invoices]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
