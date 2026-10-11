import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Live-preview check for a gift-card code typed into the booking summary —
 * purely informational (shows the discount before the customer confirms).
 * The booking itself re-validates and redeems the code server-side in
 * createBookingAndPayment, so nothing here is trusted at booking time. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code.trim() : "";
  const serviceId = typeof body.serviceId === "string" ? body.serviceId : "";
  if (!code || !serviceId) {
    return NextResponse.json({ valid: false, error: "MISSING_CODE" }, { status: 400 });
  }

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { businessId: true },
  });
  if (!service) return NextResponse.json({ valid: false, error: "NOT_FOUND" }, { status: 404 });

  const purchase = await prisma.giftCardPurchase.findUnique({
    where: { code },
    include: { giftCard: true },
  });

  const valid =
    !!purchase &&
    purchase.status === "ACTIVE" &&
    purchase.usesLeft > 0 &&
    (!purchase.expiresAt || purchase.expiresAt > new Date()) &&
    purchase.businessId === service.businessId &&
    purchase.giftCard.serviceId === serviceId;

  if (!valid) {
    return NextResponse.json({ valid: false, error: "INVALID_CODE" });
  }

  return NextResponse.json({
    valid: true,
    discountPercent: purchase!.giftCard.discountPercent,
    name: purchase!.giftCard.name,
  });
}
