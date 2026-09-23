import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createBookingSchema } from "@/lib/validations";
import {
  createBookingAndPayment,
  SlotUnavailableError,
} from "@/lib/booking-service";
import { getAvailableSlots } from "@/lib/availability";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
    select: { businessId: true, business: { select: { timezone: true } } },
  });
  if (!service) {
    return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });
  }

  const startsAt = new Date(data.startsAt);

  let extraDurationMin = 0;
  if (data.addOnIds?.length) {
    const addOns = await prisma.serviceAddOn.findMany({
      where: { id: { in: data.addOnIds }, businessId: service.businessId, active: true },
      select: { durationMin: true },
    });
    extraDurationMin = addOns.reduce((sum, a) => sum + a.durationMin, 0);
  }

  // Resolve a concrete staff member — required even for "any staff" bookings
  // so the DB overlap check has something to key off.
  let staffId = data.staffId;
  if (!staffId) {
    const dateStr = format(toZonedTime(startsAt, service.business.timezone), "yyyy-MM-dd");
    const slots = await getAvailableSlots({
      businessId: service.businessId,
      serviceId: data.serviceId,
      dateStr,
      extraDurationMin,
    });
    const match = slots.find(
      (s) => s.startsAt.getTime() === startsAt.getTime()
    );
    if (!match) {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    staffId = match.staffId;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const ipAddr =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

  try {
    const { booking, redirectUrl } = await createBookingAndPayment({
      customerId: session.user.id,
      customerEmail: session.user.email!,
      customerName: session.user.name ?? "Khách hàng",
      businessId: service.businessId,
      serviceId: data.serviceId,
      staffId,
      startsAt,
      customerNote: data.customerNote,
      provider: data.paymentProvider,
      locale: (session.user as { locale?: "vi" | "en" }).locale ?? "vi",
      siteUrl,
      ipAddr,
      addOnIds: data.addOnIds,
    });

    return NextResponse.json({ bookingId: booking.id, redirectUrl });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
