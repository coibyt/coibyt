import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { staffSchema } from "@/lib/validations";

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const staff = await prisma.staff.findMany({
    where: { businessId: owned.businessId },
    include: { services: { select: { serviceId: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ staff });
}

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const body = await req.json();
  const parsed = staffSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { serviceIds, avatarUrl, email, password, ...data } = parsed.data;

  let userId: string | undefined;
  if (email) {
    if (!password) {
      return NextResponse.json({ error: "PASSWORD_REQUIRED" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
    }
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email,
        password: await bcrypt.hash(password, 12),
        role: "STAFF",
        emailVerified: new Date(),
      },
    });
    userId = user.id;
  }

  const staff = await prisma.staff.create({
    data: {
      ...data,
      avatarUrl: avatarUrl || undefined,
      businessId: owned.businessId,
      userId,
      services: serviceIds
        ? { create: serviceIds.map((serviceId) => ({ serviceId })) }
        : undefined,
    },
  });
  return NextResponse.json({ staff }, { status: 201 });
}
