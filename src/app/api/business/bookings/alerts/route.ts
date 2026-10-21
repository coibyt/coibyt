import { NextResponse } from "next/server";
import { format } from "date-fns";
import { toZonedTime, formatInTimeZone } from "date-fns-tz";
import { bookingStaffScope, getBusinessAccess } from "@/lib/current-business";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_LOOKBACK_MS = 15 * 60 * 1000;

/** New customer bookings for TODAY (in each salon's own time zone) -- across
 * every branch for an owner; for a staff member, their own salon and only
 * their own bookings unless they may see the whole calendar -- confirmed
 * since `since` — polled by the
 * dashboard's booking alarm so an open dashboard (website, installed app or
 * the Android app) rings out loud. Bookings the salon added itself are left
 * out: nobody needs an alarm for something they just typed in. */
export async function GET(req: Request) {
  const [access, session] = await Promise.all([getBusinessAccess(), auth()]);
  if (!access || !session?.user) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const staffScope = bookingStaffScope(access);

  const now = new Date();
  const raw = new URL(req.url).searchParams.get("since");
  const parsed = raw ? new Date(raw) : null;
  const since =
    parsed && !Number.isNaN(parsed.getTime()) && now.getTime() - parsed.getTime() < MAX_LOOKBACK_MS
      ? parsed
      : new Date(now.getTime() - MAX_LOOKBACK_MS);

  const bookings = await prisma.booking.findMany({
    where: {
      ...(access.isOwner
        ? { business: { ownerId: session.user.id } }
        : { businessId: access.business.id, ...(staffScope ? { staffId: staffScope } : {}) }),
      source: "WEBSITE",
      status: "CONFIRMED",
      // Online payments are confirmed a little after the booking is
      // created, so watch the confirmation time, not just creation.
      updatedAt: { gt: since },
      createdAt: { gt: new Date(now.getTime() - 3 * 60 * 60 * 1000) },
    },
    orderBy: { startsAt: "asc" },
    take: 20,
    select: {
      id: true,
      startsAt: true,
      customer: { select: { name: true } },
      service: { select: { name: true } },
      staff: { select: { name: true } },
      business: { select: { name: true, timezone: true } },
    },
  });

  const today = bookings.filter((b) => {
    const tz = b.business.timezone;
    return format(toZonedTime(b.startsAt, tz), "yyyy-MM-dd") === format(toZonedTime(now, tz), "yyyy-MM-dd");
  });

  return NextResponse.json({
    now: now.toISOString(),
    bookings: today.map((b) => ({
      id: b.id,
      time: formatInTimeZone(b.startsAt, b.business.timezone, "HH:mm"),
      customer: b.customer.name,
      service: b.service.name,
      staff: b.staff?.name ?? null,
      branch: b.business.name,
    })),
  });
}
