import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { joinWaitlist, WAITLIST_MAX_WEEKS } from "@/lib/waitlist";

const schema = z.object({
  slug: z.string().min(1).max(120),
  serviceId: z.string().cuid().optional().nullable(),
  staffId: z.string().cuid().optional().nullable(),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().max(30).optional().nullable(),
  email: z.string().trim().email().max(191),
  weeks: z.number().int().min(1).max(WAITLIST_MAX_WEEKS),
  note: z.string().trim().max(300).optional().nullable(),
});

/** The booking page's "join the wait list" form (src/lib/waitlist.ts). */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;

  const business = await prisma.business.findUnique({
    where: { slug: d.slug },
    select: { id: true, status: true, timezone: true },
  });
  if (!business || business.status !== "APPROVED") return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // Only this salon's own service / staff can be waited for.
  if (d.serviceId) {
    const ok = await prisma.service.findFirst({ where: { id: d.serviceId, businessId: business.id }, select: { id: true } });
    if (!ok) return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });
  }
  if (d.staffId) {
    const ok = await prisma.staff.findFirst({ where: { id: d.staffId, businessId: business.id }, select: { id: true } });
    if (!ok) return NextResponse.json({ error: "STAFF_NOT_FOUND" }, { status: 404 });
  }

  const session = await auth();
  const entry = await joinWaitlist({
    businessId: business.id,
    serviceId: d.serviceId,
    staffId: d.staffId,
    userId: session?.user?.id ?? null,
    name: d.name,
    phone: d.phone,
    email: d.email,
    weeks: d.weeks,
    note: d.note,
    timezone: business.timezone,
  });
  return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
}
