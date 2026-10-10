import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { orderSchema } from "@/lib/validations";

/** Same trust model as a booking's cash/bank-transfer payment choice (see
 * BookingPaymentChoice in booking-service.ts): no payment gateway, so the
 * order is confirmed immediately and the salon reconciles manually. CHAT
 * means the customer wants to work out payment with the salon directly —
 * the order still gets created so the salon sees exactly what was asked
 * for, just left at PENDING_PAYMENT until they sort it out over chat. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const parsed = orderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { businessId, items, paymentMethod, customerNote } = parsed.data;

  const business = await prisma.business.findFirst({
    where: { id: businessId, status: "APPROVED" },
  });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  if (paymentMethod === "BANK_TRANSFER" && !business.bankName) {
    return NextResponse.json({ error: "NO_BANK_INFO" }, { status: 400 });
  }

  // Prices are always re-read from the DB here, never trusted from the
  // client — same discipline as createBookingAndPayment's add-ons/extra
  // services.
  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, businessId, active: true },
  });
  const productById = new Map(products.map((p) => [p.id, p]));
  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "PRODUCT_UNAVAILABLE" }, { status: 409 });
  }

  const currency = products[0]?.currency ?? business.defaultCurrency;
  const lines = items.map((i) => {
    const product = productById.get(i.productId)!;
    return {
      productId: product.id,
      name: product.name,
      unitPriceCents: product.priceCents,
      currency: product.currency,
      qty: i.qty,
      totalCents: product.priceCents * i.qty,
    };
  });
  const totalCents = lines.reduce((sum, l) => sum + l.totalCents, 0);

  const order = await prisma.order.create({
    data: {
      businessId,
      customerId: session.user.id,
      status: paymentMethod === "CHAT" ? "PENDING_PAYMENT" : "CONFIRMED",
      paymentMethod,
      totalCents,
      currency,
      customerNote: customerNote || null,
      items: { create: lines },
    },
    include: { items: true },
  });

  return NextResponse.json(
    {
      order,
      bankInfo:
        paymentMethod === "BANK_TRANSFER"
          ? {
              bankName: business.bankName,
              bankAccountNumber: business.bankAccountNumber,
              bankAccountName: business.bankAccountName,
              bankBic: business.bankBic,
            }
          : undefined,
    },
    { status: 201 }
  );
}
