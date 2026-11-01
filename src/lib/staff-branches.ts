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

/** Longest the owner can block around a booking at another branch, either
 * side (BranchBusyAdjust). */
export const MAX_BUSY_ADJUST_MINUTES = 240;
const ADJUST_REACH = MAX_BUSY_ADJUST_MINUTES * MIN;

/** The owner's own before/after minutes for locked blocks on these rows'
 * calendars, by `${localStaffId}|${sourceKey}`. */
export async function busyAdjustments(localStaffIds: string[]) {
  const rows = localStaffIds.length
    ? await prisma.branchBusyAdjust.findMany({
        where: { staffId: { in: localStaffIds } },
        select: { staffId: true, sourceKey: true, beforeMinutes: true, afterMinutes: true },
      })
    : [];
  return new Map(rows.map((r) => [`${r.staffId}|${r.sourceKey}`, { beforeMs: r.beforeMinutes * MIN, afterMs: r.afterMinutes * MIN }]));
}
export type BusyAdjustments = Awaited<ReturnType<typeof busyAdjustments>>;

/** The time something at another branch takes on this branch's calendar:
 * widened by the travel time, or by the owner's own minutes for it. */
export function widenBusy(adjusts: BusyAdjustments, localStaffId: string, sourceKey: string, travelMs: number, start: Date, end: Date) {
  const a = adjusts.get(`${localStaffId}|${sourceKey}`);
  return {
    start: new Date(start.getTime() - (a?.beforeMs ?? travelMs)),
    end: new Date(end.getTime() + (a?.afterMs ?? travelMs)),
    adjusted: !!a,
  };
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
  // Anything near enough to reach in, then each checked with its own margins.
  const reach = Math.max(travel, ADJUST_REACH);
  const window = { startsAt: { lt: new Date(end.getTime() + reach) }, endsAt: { gt: new Date(start.getTime() - reach) } };
  const live = { in: ["PENDING_PAYMENT" as const, "CONFIRMED" as const] };
  const [b, x, t, adjusts] = await Promise.all([
    prisma.booking.findMany({ where: { staffId: ids, status: live, ...window }, select: { id: true, startsAt: true, endsAt: true } }),
    prisma.bookingExtraService.findMany({ where: { staffId: ids, ...window, booking: { status: live } }, select: { id: true, startsAt: true, endsAt: true } }),
    prisma.staffTimeOff.findMany({ where: { staffId: ids, ...window }, select: { id: true, startsAt: true, endsAt: true } }),
    busyAdjustments([staffId]),
  ]);
  const items = [
    ...b.map((r) => ({ key: `b-${r.id}`, s: r.startsAt, e: r.endsAt })),
    ...x.map((r) => ({ key: `x-${r.id}`, s: r.startsAt, e: r.endsAt })),
    ...t.map((r) => ({ key: `t-${r.id}`, s: r.startsAt, e: r.endsAt })),
  ];
  return items.some((i) => {
    if (!i.s || !i.e) return false;
    const w = widenBusy(adjusts, staffId, i.key, travel, i.s, i.e);
    return w.start < end && w.end > start;
  });
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
  /** "b-…", "x-…" or "t-…": what it is at the other branch (BranchBusyAdjust). */
  sourceKey: string;
  /** Widened by the travel time either side, or the owner's own minutes. */
  startsAt: Date;
  endsAt: Date;
  /** The booking or blocked time itself, at the other branch. */
  coreStartsAt: Date;
  coreEndsAt: Date;
  travelMinutes: number;
  /** The owner set this block's length on this branch's calendar. */
  adjusted: boolean;
}

/** Time these staff members are taken at their other branches in [from, to):
 * bookings (and split-off extra services) there, and time blocked there —
 * each widened by their travel time between branches, or by what the owner
 * set for that block here. */
export async function externalBusy(staffIds: string[], from: Date, to: Date): Promise<ExternalBusy[]> {
  const siblings = await siblingRows(staffIds);
  if (siblings.size === 0) return [];
  const ids = [...siblings.keys()];
  // Look a little wider so something just outside still reaches in.
  const reach = Math.max(ADJUST_REACH, ...[...siblings.values()].map((v) => v.travelMs));
  from = new Date(from.getTime() - reach);
  to = new Date(to.getTime() + reach);
  const live = { in: ["PENDING_PAYMENT" as const, "CONFIRMED" as const, "COMPLETED" as const] };
  const [bookings, extras, timeOff, adjusts] = await Promise.all([
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
    busyAdjustments(staffIds),
  ]);
  const out: ExternalBusy[] = [];
  const add = (sourceKey: string, staffId: string | null, s: Date | null, e: Date | null, kind: ExternalBusy["kind"]) => {
    const sib = staffId ? siblings.get(staffId) : null;
    if (!sib || !s || !e) return;
    const w = widenBusy(adjusts, sib.localId, sourceKey, sib.travelMs, s, e);
    out.push({
      id: `ext-${sourceKey}`,
      staffId: sib.localId,
      kind,
      branchName: sib.branchName,
      sourceKey,
      startsAt: w.start,
      endsAt: w.end,
      coreStartsAt: s,
      coreEndsAt: e,
      travelMinutes: sib.travelMs / MIN,
      adjusted: w.adjusted,
    });
  };
  for (const b of bookings) add(`b-${b.id}`, b.staffId, b.startsAt, b.endsAt, "OTHER_BRANCH_BOOKING");
  for (const x of extras) add(`x-${x.id}`, x.staffId, x.startsAt, x.endsAt, "OTHER_BRANCH_BOOKING");
  for (const t of timeOff) add(`t-${t.id}`, t.staffId, t.startsAt, t.endsAt, "OTHER_BRANCH_BUSY");
  return out;
}

/** The thing behind a locked block — a booking, extra service or blocked
 * time of the same person at another branch — with its own times, or null
 * when it isn't one for this branch's row of the person. */
export async function externalSource(localStaffId: string, sourceKey: string) {
  const local = await prisma.staff.findUnique({ where: { id: localStaffId }, select: { branchGroup: true } });
  if (!local?.branchGroup) return null;
  const id = sourceKey.slice(2);
  const kind = sourceKey.slice(0, 2);
  const row =
    kind === "b-"
      ? await prisma.booking.findUnique({ where: { id }, select: { staffId: true, startsAt: true, endsAt: true } })
      : kind === "x-"
        ? await prisma.bookingExtraService.findUnique({ where: { id }, select: { staffId: true, startsAt: true, endsAt: true } })
        : kind === "t-"
          ? await prisma.staffTimeOff.findUnique({ where: { id }, select: { staffId: true, startsAt: true, endsAt: true } })
          : null;
  if (!row?.staffId || !row.startsAt || !row.endsAt || row.staffId === localStaffId) return null;
  const owner = await prisma.staff.findUnique({ where: { id: row.staffId }, select: { branchGroup: true } });
  if (owner?.branchGroup !== local.branchGroup) return null;
  return { startsAt: row.startsAt, endsAt: row.endsAt };
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

const sameName = (s: string) => s.trim().toLowerCase();

/** This person's other active rows, when their branches are kept in sync
 * (Staff.syncBranchHours, which since 2026-11 covers hours, services, own
 * prices and profile). Null when off or alone. */
async function syncedSiblings(staffId: string) {
  const s = await prisma.staff.findUnique({
    where: { id: staffId },
    select: { branchGroup: true, syncBranchHours: true, businessId: true, business: { select: { ownerId: true } } },
  });
  if (!s?.branchGroup || !s.syncBranchHours) return null;
  const others = await prisma.staff.findMany({
    where: { branchGroup: s.branchGroup, id: { not: staffId }, active: true, business: { ownerId: s.business.ownerId } },
    select: { id: true, businessId: true },
  });
  return others.length ? { businessId: s.businessId, others } : null;
}

/** Copies which services this person does — and their own price and time
 * for each — to their other branches, matching services by name. Services
 * one branch has and the other doesn't are left alone. No-op when off. */
export async function mirrorStaffServices(staffId: string): Promise<number> {
  const found = await syncedSiblings(staffId);
  if (!found) return 0;
  const [mine, here] = await Promise.all([
    prisma.staffService.findMany({
      where: { staffId },
      select: { priceCentsOverride: true, durationMinOverride: true, service: { select: { name: true, active: true } } },
    }),
    prisma.service.findMany({ where: { businessId: found.businessId, active: true }, select: { name: true } }),
  ]);
  const offered = new Map(mine.filter((m) => m.service.active).map((m) => [sameName(m.service.name), m]));
  const known = new Set(here.map((s) => sameName(s.name)));
  for (const o of found.others) {
    const there = await prisma.service.findMany({ where: { businessId: o.businessId, active: true }, select: { id: true, name: true } });
    const shared = there.filter((s) => known.has(sameName(s.name)));
    if (shared.length === 0) continue;
    const rows = shared.flatMap((s) => {
      const m = offered.get(sameName(s.name));
      return m ? [{ staffId: o.id, serviceId: s.id, priceCentsOverride: m.priceCentsOverride, durationMinOverride: m.durationMinOverride }] : [];
    });
    await prisma.$transaction([
      prisma.staffService.deleteMany({ where: { staffId: o.id, serviceId: { in: shared.map((s) => s.id) } } }),
      ...(rows.length ? [prisma.staffService.createMany({ data: rows })] : []),
    ]);
  }
  return found.others.length;
}

/** Copies this person's profile — name, title, bio, photo, videos, note to
 * customers and booking lead time — to their other branches. No-op when off. */
export async function mirrorStaffProfile(staffId: string): Promise<number> {
  const found = await syncedSiblings(staffId);
  if (!found) return 0;
  const [s, avatar] = await Promise.all([
    prisma.staff.findUniqueOrThrow({
      where: { id: staffId },
      select: { name: true, title: true, bio: true, avatarUrl: true, staffMessage: true, videoUrls: true, leadTimeMinutes: true },
    }),
    prisma.staffAvatar.findUnique({ where: { staffId } }),
  ]);
  for (const o of found.others) {
    // A photo stored here is served per row, so point at the copy's own.
    const avatarUrl = s.avatarUrl?.includes(`/api/staff-avatar/${staffId}`) ? `/api/staff-avatar/${o.id}?v=${Date.now()}` : s.avatarUrl;
    await prisma.staff.update({
      where: { id: o.id },
      data: { name: s.name, title: s.title, bio: s.bio, avatarUrl, staffMessage: s.staffMessage, videoUrls: s.videoUrls ?? undefined, leadTimeMinutes: s.leadTimeMinutes },
    });
    if (avatar) {
      await prisma.staffAvatar.upsert({
        where: { staffId: o.id },
        update: { data: avatar.data, mimeType: avatar.mimeType },
        create: { staffId: o.id, data: avatar.data, mimeType: avatar.mimeType },
      });
    } else {
      await prisma.staffAvatar.deleteMany({ where: { staffId: o.id } });
    }
  }
  return found.others.length;
}

/** Everything at once — used when syncing is switched on. */
export async function mirrorStaffEverywhere(staffId: string) {
  await mirrorBranchHours(staffId);
  await mirrorStaffServices(staffId);
  await mirrorStaffProfile(staffId);
}
