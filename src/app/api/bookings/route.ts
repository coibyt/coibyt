import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
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

  const body = await req.json();
  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Guest checkout: no session, so the booking form itself doubles as a
  // sign-up — find-or-create the User by email here, same bcrypt cost (12)
  // as /api/auth/register. An email that already has a password-protected
  // account must match that password (never silently attach a booking to
  // someone else's account just because they typed a known email) — the
  // client then surfaces that 409 the same way the register form does.
  let customerId: string;
  let customerEmail: string;
  let customerName: string;
  let newAccountEmail: string | undefined;

  if (session?.user) {
    customerId = session.user.id;
    customerEmail = session.user.email!;
    customerName = session.user.name ?? "Khách hàng";
  } else {
    if (!data.guestName || !data.guestEmail || !data.guestPhone || !data.guestPassword) {
      return NextResponse.json({ error: "GUEST_INFO_REQUIRED" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email: data.guestEmail } });
    if (existing) {
      const passwordOk =
        existing.password && (await bcrypt.compare(data.guestPassword, existing.password));
      if (!passwordOk) {
        return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
      }
      customerId = existing.id;
      customerEmail = existing.email;
      customerName = existing.name;
    } else {
      const hashed = await bcrypt.hash(data.guestPassword, 12);
      const created = await prisma.user.create({
        data: {
          name: data.guestName,
          email: data.guestEmail,
          phone: data.guestPhone,
          password: hashed,
          marketingOptOut: data.emailMarketingOptIn === false,
          smsMarketingOptOut: data.smsMarketingOptIn === false,
        },
      });
      customerId = created.id;
      customerEmail = created.email;
      customerName = created.name;
      newAccountEmail = created.email;
    }
  }

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
    extraDurationMin += addOns.reduce((sum, a) => sum + a.durationMin, 0);
  }
  if (data.extraServiceIds?.length) {
    const extraServices = await prisma.service.findMany({
      where: { id: { in: data.extraServiceIds }, businessId: service.businessId, active: true },
      select: { durationMin: true },
    });
    extraDurationMin += extraServices.reduce((sum, s) => sum + s.durationMin, 0);
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
  const affiliateCode = (await cookies()).get(`varaaai_aff_${service.businessId}`)?.value;

  try {
    const { booking, redirectUrl } = await createBookingAndPayment({
      customerId,
      customerEmail,
      customerName,
      businessId: service.businessId,
      serviceId: data.serviceId,
      staffId,
      startsAt,
      customerNote: data.customerNote,
      provider: data.paymentProvider,
      siteUrl,
      addOnIds: data.addOnIds,
      extraServiceIds: data.extraServiceIds,
      affiliateCode,
      discountCode: data.discountCode,
      newAccountEmail,
    });

    return NextResponse.json({ bookingId: booking.id, redirectUrl, isNewAccount: !!newAccountEmail });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    if (err instanceof Error && err.message === "BUSINESS_SUSPENDED") {
      return NextResponse.json({ error: "BUSINESS_SUSPENDED" }, { status: 403 });
    }
    console.error("[POST /api/bookings]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
