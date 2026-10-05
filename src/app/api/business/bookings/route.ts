import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingStaffScope, getBusinessAccess, requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { createBookingAndPayment, SlotUnavailableError } from "@/lib/booking-service";

const businessBookingSchema = z.object({
  serviceId: z.string().cuid(),
  staffId: z.string().cuid(),
  startsAt: z.string().datetime(),
  // Lets the salon shorten/extend this one booking beyond the service's own
  // duration — optional, and only ever read from this owner-only route.
  endsAt: z.string().datetime().optional(),
  addOnIds: z.array(z.string().cuid()).optional(),
  customerName: z.string().min(1).max(120),
  customerPhone: z.string().min(3).max(30),
  customerEmail: z.string().email().optional(),
  customerNote: z.string().max(1000).optional(),
  sendNotificationEmails: z.boolean().optional(),
});

/** A walk-in/phone customer usually isn't a VaraaAi member yet — reuse their
 * account if we can match one (by email, or failing that by phone), and
 * otherwise create a lightweight one so the booking still has somewhere to
 * point its required customerId. */
async function findOrCreateWalkInCustomer(input: {
  name: string;
  phone: string;
  email?: string;
}) {
  if (input.email) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) return existing;
    return prisma.user.create({
      data: { name: input.name, email: input.email, phone: input.phone, role: "CUSTOMER" },
    });
  }

  const existingByPhone = await prisma.user.findFirst({ where: { phone: input.phone } });
  if (existingByPhone) return existingByPhone;

  const syntheticEmail = `walkin-${input.phone.replace(/[^0-9a-zA-Z]/g, "")}-${Date.now()}@walkin.varaaai.com`;
  return prisma.user.create({
    data: { name: input.name, email: syntheticEmail, phone: input.phone, role: "CUSTOMER" },
  });
}

export async function POST(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;

  const parsed = businessBookingSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  const scopeStaffId = bookingStaffScope(access);
  if (scopeStaffId && data.staffId !== scopeStaffId) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const service = await prisma.service.findFirst({
    where: { id: data.serviceId, businessId, active: true },
  });
  if (!service) return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });

  if (data.endsAt && new Date(data.endsAt) <= new Date(data.startsAt)) {
    return NextResponse.json({ error: "INVALID_TIME_RANGE" }, { status: 400 });
  }

  const customer = await findOrCreateWalkInCustomer({
    name: data.customerName,
    phone: data.customerPhone,
    email: data.customerEmail,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

  try {
    const { booking } = await createBookingAndPayment({
      customerId: customer.id,
      customerEmail: customer.email,
      customerName: customer.name,
      businessId,
      serviceId: data.serviceId,
      staffId: data.staffId,
      startsAt: new Date(data.startsAt),
      endsAtOverride: data.endsAt ? new Date(data.endsAt) : undefined,
      addOnIds: data.addOnIds,
      customerNote: data.customerNote,
      // A business-created booking has no online payment step, same as cash.
      provider: "CASH",
      siteUrl,
      // Off by default for a manually-added booking — the owner opts in via
      // a checkbox, unlike a customer's own booking which always emails.
      sendNotificationEmails: data.sendNotificationEmails ?? false,
      source: "MANUAL",
    });
    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    console.error("[POST /api/business/bookings]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;
  const scopeStaffId = bookingStaffScope(access);

  const status = new URL(req.url).searchParams.get("status") ?? undefined;

  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      ...(scopeStaffId ? { staffId: scopeStaffId } : {}),
      ...(status ? { status: status as never } : {}),
    },
    include: {
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { startsAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ bookings });
}
