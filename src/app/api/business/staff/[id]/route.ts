import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { staffSchema } from "@/lib/validations";

async function assertOwnership(businessId: string, staffId: string) {
  return prisma.staff.findFirst({ where: { id: staffId, businessId } });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const existingStaff = await assertOwnership(owned.businessId, id);
  if (!existingStaff) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = staffSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { serviceIds, email, password, ...data } = parsed.data;

  let userId: string | undefined | null = undefined;
  if (email !== undefined) {
    if (!email) {
      // Clearing the login entirely — the staff row keeps existing, they
      // just lose dashboard access until a new login is set.
      userId = null;
    } else if (existingStaff.userId) {
      const other = await prisma.user.findUnique({ where: { email } });
      if (other && other.id !== existingStaff.userId) {
        return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
      }
      await prisma.user.update({ where: { id: existingStaff.userId }, data: { email } });
    } else {
      if (!password) {
        return NextResponse.json({ error: "PASSWORD_REQUIRED" }, { status: 400 });
      }
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
      }
      const user = await prisma.user.create({
        data: {
          name: data.name ?? existingStaff.name,
          email,
          password: await bcrypt.hash(password, 12),
          role: "STAFF",
          emailVerified: new Date(),
        },
      });
      userId = user.id;
    }
  }
  if (password && existingStaff.userId) {
    await prisma.user.update({
      where: { id: existingStaff.userId },
      data: { password: await bcrypt.hash(password, 12) },
    });
  }

  const staff = await prisma.$transaction(async (tx) => {
    if (serviceIds) {
      await tx.staffService.deleteMany({ where: { staffId: id } });
      await tx.staffService.createMany({
        data: serviceIds.map((serviceId) => ({ serviceId, staffId: id })),
      });
    }
    return tx.staff.update({
      where: { id },
      data: { ...data, ...(userId !== undefined ? { userId } : {}) },
    });
  });

  return NextResponse.json({ staff });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(owned.businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  await prisma.staff.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
