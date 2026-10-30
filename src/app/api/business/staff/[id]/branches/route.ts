import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { BRANCH_TRAVEL_CHOICES, mirrorBranchHours, newBranchGroup } from "@/lib/staff-branches";

/** Which of the owner's other branches this staff member also works at. */
async function load(id: string) {
  const owned = await requireOwnerOnly();
  const session = await auth();
  if (!owned || !session?.user) return null;
  const staff = await prisma.staff.findFirst({ where: { id, businessId: owned.businessId } });
  if (!staff) return null;
  const branches = await prisma.business.findMany({
    where: { ownerId: session.user.id, id: { not: owned.businessId } },
    select: { id: true, name: true, city: true },
    orderBy: { createdAt: "asc" },
  });
  const linked = staff.branchGroup
    ? await prisma.staff.findMany({ where: { branchGroup: staff.branchGroup, id: { not: staff.id } }, select: { id: true, businessId: true, active: true } })
    : [];
  return { staff, branches, linked };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await load(id);
  if (!found) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({
    travelMinutes: found.staff.branchTravelMinutes,
    syncHours: found.staff.syncBranchHours,
    branches: found.branches.map((b) => ({
      id: b.id,
      name: b.name,
      city: b.city,
      on: found.linked.some((l) => l.businessId === b.id && l.active),
    })),
  });
}

const schema = z.object({
  businessIds: z.array(z.string().cuid()).max(50),
  // Travel time between branches; kept the same on all of the person's rows.
  travelMinutes: z
    .number()
    .int()
    .refine((n) => BRANCH_TRAVEL_CHOICES.includes(n))
    .optional(),
  // Keep this person's working hours the same at every branch; turning it on
  // copies this branch's hours to the others.
  syncHours: z.boolean().optional(),
});

/** Sets the other branches this person works at. A branch they're new to gets
 * a Staff row copied from this one (profile, photo, and the services there
 * with the same names); a branch they leave has its row switched off, never
 * deleted, since its bookings point at it. */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await load(id);
  if (!found) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { staff, branches, linked } = found;
  const allowed = new Set(branches.map((b) => b.id));
  const wanted = new Set(parsed.data.businessIds.filter((b) => allowed.has(b)));

  const group = staff.branchGroup ?? newBranchGroup();
  const travel = parsed.data.travelMinutes ?? staff.branchTravelMinutes;
  if (!staff.branchGroup) await prisma.staff.update({ where: { id: staff.id }, data: { branchGroup: group } });
  if (travel !== staff.branchTravelMinutes) {
    await prisma.staff.updateMany({ where: { branchGroup: group }, data: { branchTravelMinutes: travel } });
  }
  const sync = parsed.data.syncHours ?? staff.syncBranchHours;
  if (sync !== staff.syncBranchHours) {
    await prisma.staff.updateMany({ where: { branchGroup: group }, data: { syncBranchHours: sync } });
  }

  const [avatar, myServices] = await Promise.all([
    prisma.staffAvatar.findUnique({ where: { staffId: staff.id } }),
    prisma.staffService.findMany({ where: { staffId: staff.id }, include: { service: { select: { name: true } } } }),
  ]);

  for (const businessId of wanted) {
    const row = linked.find((l) => l.businessId === businessId);
    if (row) {
      if (!row.active) await prisma.staff.update({ where: { id: row.id }, data: { active: true } });
      continue;
    }
    const copy = await prisma.staff.create({
      data: {
        businessId,
        branchGroup: group,
        branchTravelMinutes: travel,
        syncBranchHours: sync,
        name: staff.name,
        title: staff.title,
        bio: staff.bio,
        leadTimeMinutes: staff.leadTimeMinutes,
        staffMessage: staff.staffMessage,
        videoUrls: staff.videoUrls ?? undefined,
        canViewServices: staff.canViewServices,
        canViewProducts: staff.canViewProducts,
        canViewBookings: staff.canViewBookings,
        canViewCustomers: staff.canViewCustomers,
        canViewHours: staff.canViewHours,
        canViewReviews: staff.canViewReviews,
        canViewCustomerContactInfo: staff.canViewCustomerContactInfo,
        canViewAllBookings: staff.canViewAllBookings,
        canViewAllPagesReadOnly: staff.canViewAllPagesReadOnly,
      },
    });
    if (avatar) await prisma.staffAvatar.create({ data: { staffId: copy.id, data: avatar.data, mimeType: avatar.mimeType } });
    // The same services there, matched by name, with the same own price/time.
    if (myServices.length) {
      const there = await prisma.service.findMany({ where: { businessId, active: true }, select: { id: true, name: true } });
      const byName = new Map(there.map((s) => [s.name.trim().toLowerCase(), s.id]));
      const rows = myServices
        .map((m) => ({ serviceId: byName.get(m.service.name.trim().toLowerCase()), m }))
        .filter((x): x is { serviceId: string; m: (typeof myServices)[number] } => !!x.serviceId)
        .map(({ serviceId, m }) => ({ staffId: copy.id, serviceId, priceCentsOverride: m.priceCentsOverride, durationMinOverride: m.durationMinOverride }));
      if (rows.length) await prisma.staffService.createMany({ data: rows, skipDuplicates: true });
    }
  }
  for (const l of linked) {
    if (allowed.has(l.businessId) && !wanted.has(l.businessId) && l.active) {
      await prisma.staff.update({ where: { id: l.id }, data: { active: false } });
    }
  }
  // This branch's hours go to the others — new ones included — whenever the
  // hours are kept in sync.
  if (sync) await mirrorBranchHours(staff.id);
  return NextResponse.json({ ok: true, businessIds: [...wanted], travelMinutes: travel, syncHours: sync });
}
