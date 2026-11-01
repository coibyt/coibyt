import { prisma } from "@/lib/prisma";

/** Moving a booking to another of the owner's branches — the same person
 * working there (Staff.branchGroup), the service with the same name, the same
 * time. E.g. a lash appointment at Kamppi moved to Hakaniemi so the stylist
 * works there that day. Used by /api/business/bookings/[id]/move-branch. */

const sameName = (s: string) => s.trim().toLowerCase();
const ACTIVE = ["CONFIRMED", "PENDING_PAYMENT"] as const;

export type MoveError = "NO_STAFF" | "STAFF_NOT_THERE" | "SERVICE_NOT_THERE";

function loadBooking(id: string, businessId: string) {
  return prisma.booking.findFirst({
    where: { id, businessId },
    include: {
      service: { select: { name: true } },
      staff: { select: { id: true, name: true, branchGroup: true } },
      extraServices: { include: { staff: { select: { branchGroup: true, name: true } } } },
      addOns: true,
    },
  });
}
type MovableBooking = NonNullable<Awaited<ReturnType<typeof loadBooking>>>;

/** What the booking would become at a branch, or why it can't go there. */
async function plan(b: MovableBooking, businessId: string) {
  const groups = [b.staff?.branchGroup, ...b.extraServices.map((x) => x.staff?.branchGroup)].filter((g): g is string => !!g);
  const [staffThere, servicesThere, addOnsThere] = await Promise.all([
    groups.length
      ? prisma.staff.findMany({ where: { businessId, active: true, branchGroup: { in: groups } }, select: { id: true, name: true, branchGroup: true } })
      : Promise.resolve([]),
    prisma.service.findMany({ where: { businessId, active: true }, select: { id: true, name: true } }),
    prisma.serviceAddOn.findMany({ where: { businessId, active: true }, select: { id: true, name: true } }),
  ]);
  const staffFor = (group: string | null | undefined) => (group ? staffThere.find((s) => s.branchGroup === group) : undefined);
  const serviceFor = (name: string) => servicesThere.find((s) => sameName(s.name) === sameName(name));

  if (!b.staff) return { error: "NO_STAFF" as MoveError };
  const staff = staffFor(b.staff.branchGroup);
  if (!staff) return { error: "STAFF_NOT_THERE" as MoveError, missing: b.staff.name };
  const service = serviceFor(b.service.name);
  if (!service) return { error: "SERVICE_NOT_THERE" as MoveError, missing: b.service.name };

  const extras = [];
  for (const x of b.extraServices) {
    const xs = x.staffId ? staffFor(x.staff?.branchGroup) : undefined;
    if (x.staffId && !xs) return { error: "STAFF_NOT_THERE" as MoveError, missing: x.staff?.name ?? "" };
    extras.push({ id: x.id, staffId: xs?.id ?? null, serviceId: serviceFor(x.name)?.id ?? null });
  }
  const addOns = b.addOns.map((a) => ({ id: a.id, addOnId: addOnsThere.find((o) => sameName(o.name) === sameName(a.name))?.id ?? null }));
  return { staff, service, extras, addOns };
}

/** The owner's other branches and whether this booking can go to each. */
export async function moveOptions(bookingId: string, fromBusinessId: string, ownerId: string) {
  const b = await loadBooking(bookingId, fromBusinessId);
  if (!b) return null;
  const branches = await prisma.business.findMany({
    where: { ownerId, id: { not: fromBusinessId } },
    select: { id: true, name: true, city: true },
    orderBy: { createdAt: "asc" },
  });
  const options = [];
  for (const br of branches) {
    const p = await plan(b, br.id);
    options.push({
      businessId: br.id,
      name: br.name,
      city: br.city,
      ...("error" in p ? { error: p.error, missing: p.missing ?? null } : { staffName: p.staff.name, serviceName: p.service.name }),
    });
  }
  return options;
}

export type MoveResult =
  | { ok: true; businessName: string }
  | { ok: false; error: "NOT_FOUND" | "CANNOT_MOVE" | "ALREADY_DONE" | "SLOT_UNAVAILABLE" | MoveError; missing?: string | null };

/** Moves the booking, its extra services and add-ons to the branch. */
export async function moveBooking(bookingId: string, fromBusinessId: string, ownerId: string, toBusinessId: string): Promise<MoveResult> {
  const [b, target] = await Promise.all([
    loadBooking(bookingId, fromBusinessId),
    prisma.business.findFirst({ where: { id: toBusinessId, ownerId, NOT: { id: fromBusinessId } }, select: { id: true, name: true } }),
  ]);
  if (!b || !target) return { ok: false, error: "NOT_FOUND" };
  if (!(ACTIVE as readonly string[]).includes(b.status)) return { ok: false, error: "CANNOT_MOVE" };

  // Income already reported or the customer already rated: it happened here.
  const [report, review] = await Promise.all([
    prisma.staffIncomeReport.findUnique({ where: { bookingId }, select: { id: true } }),
    prisma.customerReview.findUnique({ where: { bookingId }, select: { id: true } }),
  ]);
  if (report || review) return { ok: false, error: "ALREADY_DONE" };

  const p = await plan(b, target.id);
  if (p.error) return { ok: false, error: p.error, missing: p.missing ?? null };

  // Nobody gets double-booked at the new branch.
  const people = [p.staff.id, ...p.extras.flatMap((x) => (x.staffId ? [x.staffId] : []))];
  const [clash, clashExtra] = await Promise.all([
    prisma.booking.findFirst({
      where: { id: { not: bookingId }, staffId: { in: people }, status: { in: [...ACTIVE] }, startsAt: { lt: b.endsAt }, endsAt: { gt: b.startsAt } },
      select: { id: true },
    }),
    prisma.bookingExtraService.findFirst({
      where: { bookingId: { not: bookingId }, staffId: { in: people }, booking: { status: { in: [...ACTIVE] } }, startsAt: { lt: b.endsAt }, endsAt: { gt: b.startsAt } },
      select: { id: true },
    }),
  ]);
  if (clash || clashExtra) return { ok: false, error: "SLOT_UNAVAILABLE" };

  await prisma.$transaction([
    prisma.booking.update({ where: { id: bookingId }, data: { businessId: target.id, serviceId: p.service.id, staffId: p.staff.id } }),
    ...p.extras.map((x) => prisma.bookingExtraService.update({ where: { id: x.id }, data: { staffId: x.staffId, serviceId: x.serviceId } })),
    ...p.addOns.map((a) => prisma.bookingAddOn.update({ where: { id: a.id }, data: { addOnId: a.addOnId } })),
  ]);
  return { ok: true, businessName: target.name };
}
