import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";

/** One person working at several of the owner's branches is one Staff row per
 * branch (their own services and hours there), linked by Staff.branchGroup.
 * The login (userId) sits on one of them. A booking or blocked time on any of
 * the rows makes that person busy at every branch — at the other branches
 * also for their travel time (Staff.branchTravelMinutes) before and after. */

const MIN = 60 * 1000;
export { BRANCH_TRAVEL_CHOICES } from "@/lib/branch-travel";

export function newBranchGroup() {
  return randomBytes(12).toString("hex");
}

/** Whether this staff member is taken at one of their OTHER branches during
 * [start, end), counting their travel time between branches — for refusing a
 * booking or move into that time. */
export async function busyAtOtherBranch(staffId: string, start: Date, end: Date): Promise<boolean> {
  const s = await prisma.staff.findUnique({ where: { id: staffId }, select: { branchGroup: true, branchTravelMinutes: true } });
  if (!s?.branchGroup) return false;
  const others = await prisma.staff.findMany({ where: { branchGroup: s.branchGroup, id: { not: staffId } }, select: { id: true } });
  if (others.length === 0) return false;
  const ids = { in: others.map((o) => o.id) };
  const travel = s.branchTravelMinutes * MIN;
  // Their time there, widened by the travel either side, overlaps this.
  const window = { startsAt: { lt: new Date(end.getTime() + travel) }, endsAt: { gt: new Date(start.getTime() - travel) } };
  const live = { in: ["PENDING_PAYMENT" as const, "CONFIRMED" as const] };
  const [b, x, t] = await Promise.all([
    prisma.booking.findFirst({ where: { staffId: ids, status: live, ...window }, select: { id: true } }),
    prisma.bookingExtraService.findFirst({ where: { staffId: ids, ...window, booking: { status: live } }, select: { id: true } }),
    prisma.staffTimeOff.findFirst({ where: { staffId: ids, ...window }, select: { id: true } }),
  ]);
  return !!(b || x || t);
}

/** For these staff rows, their rows at OTHER branches: other row id → this
 * branch's row id, with the other branch's name and the person's travel time
 * between branches (ms). */
export async function siblingRows(staffIds: string[]) {
  const out = new Map<string, { localId: string; branchName: string; travelMs: number }>();
  if (staffIds.length === 0) return out;
  const linked = await prisma.staff.findMany({
    where: { id: { in: staffIds }, branchGroup: { not: null } },
    select: { id: true, branchGroup: true, branchTravelMinutes: true },
  });
  if (linked.length === 0) return out;
  const localByGroup = new Map(linked.map((r) => [r.branchGroup!, r.id]));
  const travelByGroup = new Map(linked.map((r) => [r.branchGroup!, r.branchTravelMinutes * MIN]));
  const others = await prisma.staff.findMany({
    where: { branchGroup: { in: [...localByGroup.keys()] }, id: { notIn: staffIds } },
    select: { id: true, branchGroup: true, business: { select: { name: true } } },
  });
  for (const o of others) {
    out.set(o.id, { localId: localByGroup.get(o.branchGroup!)!, branchName: o.business.name, travelMs: travelByGroup.get(o.branchGroup!) ?? 0 });
  }
  return out;
}

export interface ExternalBusy {
  id: string;
  staffId: string;
  kind: "OTHER_BRANCH_BOOKING" | "OTHER_BRANCH_BUSY";
  branchName: string;
  /** Widened by the travel time either side. */
  startsAt: Date;
  endsAt: Date;
  travelMinutes: number;
}

/** Time these staff members are taken at their other branches in [from, to):
 * bookings (and split-off extra services) there, and time blocked there —
 * each widened by their travel time between branches. */
export async function externalBusy(staffIds: string[], from: Date, to: Date): Promise<ExternalBusy[]> {
  const siblings = await siblingRows(staffIds);
  if (siblings.size === 0) return [];
  const ids = [...siblings.keys()];
  // Look a little wider so something just outside still reaches in by travel.
  const maxTravel = Math.max(...[...siblings.values()].map((v) => v.travelMs));
  from = new Date(from.getTime() - maxTravel);
  to = new Date(to.getTime() + maxTravel);
  const live = { in: ["PENDING_PAYMENT" as const, "CONFIRMED" as const, "COMPLETED" as const] };
  const [bookings, extras, timeOff] = await Promise.all([
    prisma.booking.findMany({
      where: { staffId: { in: ids }, status: live, startsAt: { lt: to }, endsAt: { gt: from } },
      select: { id: true, staffId: true, startsAt: true, endsAt: true },
    }),
    prisma.bookingExtraService.findMany({
      where: { staffId: { in: ids }, startsAt: { lt: to }, endsAt: { gt: from }, booking: { status: live } },
      select: { id: true, staffId: true, startsAt: true, endsAt: true },
    }),
    prisma.staffTimeOff.findMany({
      where: { staffId: { in: ids }, startsAt: { lt: to }, endsAt: { gt: from } },
      select: { id: true, staffId: true, startsAt: true, endsAt: true },
    }),
  ]);
  const out: ExternalBusy[] = [];
  const add = (id: string, staffId: string | null, s: Date | null, e: Date | null, kind: ExternalBusy["kind"]) => {
    const sib = staffId ? siblings.get(staffId) : null;
    if (!sib || !s || !e) return;
    out.push({
      id,
      staffId: sib.localId,
      kind,
      branchName: sib.branchName,
      startsAt: new Date(s.getTime() - sib.travelMs),
      endsAt: new Date(e.getTime() + sib.travelMs),
      travelMinutes: sib.travelMs / MIN,
    });
  };
  for (const b of bookings) add(`ext-b-${b.id}`, b.staffId, b.startsAt, b.endsAt, "OTHER_BRANCH_BOOKING");
  for (const x of extras) add(`ext-x-${x.id}`, x.staffId, x.startsAt, x.endsAt, "OTHER_BRANCH_BOOKING");
  for (const t of timeOff) add(`ext-t-${t.id}`, t.staffId, t.startsAt, t.endsAt, "OTHER_BRANCH_BUSY");
  return out;
}

/** The login behind a staff row — its own, or the linked row's that has it —
 * so a booking at any of their branches reaches them. */
export async function staffLoginUserId(staffId: string | null | undefined): Promise<string | null> {
  if (!staffId) return null;
  const s = await prisma.staff.findUnique({ where: { id: staffId }, select: { userId: true, branchGroup: true } });
  if (!s) return null;
  if (s.userId || !s.branchGroup) return s.userId;
  const withLogin = await prisma.staff.findFirst({ where: { branchGroup: s.branchGroup, userId: { not: null } }, select: { userId: true } });
  return withLogin?.userId ?? null;
}

/** The branches a staff login can switch between: where they have an active
 * Staff row, all under the same owner. */
export async function staffBranches(userId: string) {
  const home = await prisma.staff.findFirst({ where: { userId, active: true }, select: { branchGroup: true, business: { select: { id: true, name: true, ownerId: true } } } });
  if (!home) return [];
  if (!home.branchGroup) return [{ id: home.business.id, name: home.business.name }];
  const rows = await prisma.staff.findMany({
    where: { branchGroup: home.branchGroup, active: true, business: { ownerId: home.business.ownerId } },
    select: { business: { select: { id: true, name: true, createdAt: true } } },
  });
  return rows
    .map((r) => r.business)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .map((b) => ({ id: b.id, name: b.name }));
}

/** For someone whose hours are kept the same at every branch
 * (Staff.syncBranchHours): copies this row's whole schedule onto their other
 * active rows. A row with no schedule of its own follows its salon's opening
 * hours, so those are copied as the schedule — otherwise the other branches
 * would fall back to their own, different, opening hours. No-op when off. */
export async function mirrorBranchHours(staffId: string): Promise<number> {
  const s = await prisma.staff.findUnique({
    where: { id: staffId },
    select: { branchGroup: true, syncBranchHours: true, businessId: true, business: { select: { ownerId: true } } },
  });
  if (!s?.branchGroup || !s.syncBranchHours) return 0;
  const others = await prisma.staff.findMany({
    where: { branchGroup: s.branchGroup, id: { not: staffId }, active: true, business: { ownerId: s.business.ownerId } },
    select: { id: true },
  });
  if (others.length === 0) return 0;

  let rows: { weekday: number; openMinute: number; closeMinute: number; validFrom: string | null; validUntil: string | null }[] =
    await prisma.staffHours.findMany({
      where: { staffId },
      select: { weekday: true, openMinute: true, closeMinute: true, validFrom: true, validUntil: true },
    });
  if (!rows.some((r) => r.validFrom === null && r.validUntil === null)) {
    const salon = await prisma.businessHours.findMany({
      where: { businessId: s.businessId },
      select: { weekday: true, openMinute: true, closeMinute: true },
    });
    rows = [...rows, ...salon.map((h) => ({ ...h, validFrom: null, validUntil: null }))];
  }

  const ids = others.map((o) => o.id);
  await prisma.$transaction([
    prisma.staffHours.deleteMany({ where: { staffId: { in: ids } } }),
    ...(rows.length
      ? [prisma.staffHours.createMany({ data: ids.flatMap((id) => rows.map((r) => ({ ...r, staffId: id }))) })]
      : []),
  ]);
  return ids.length;
}
