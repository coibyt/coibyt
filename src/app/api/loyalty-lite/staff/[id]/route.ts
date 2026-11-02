import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { currentLiteOwner, newAccessToken } from "@/lib/loyalty-lite";

const schema = z.object({
  password: z.string().min(8).max(200).optional(),
  active: z.boolean().optional(),
});

/** Reset a staff password or pause the login. Either signs them out (new token). */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { password, active } = parsed.data;
  const r = await prisma.liteStaff.updateMany({
    where: { id, liteSalonId: salon.id },
    data: {
      ...(password ? { passwordHash: await bcrypt.hash(password, 10) } : {}),
      ...(active !== undefined ? { active } : {}),
      accessToken: newAccessToken(),
    },
  });
  if (!r.count) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await prisma.liteStaff.deleteMany({ where: { id, liteSalonId: salon.id } });
  return NextResponse.json({ ok: true });
}
