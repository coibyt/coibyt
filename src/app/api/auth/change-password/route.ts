import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });
  if (!user) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // A Google-only account has no password yet — let them set one for the
  // first time without proving a "current" one that never existed.
  if (user.password) {
    const valid = currentPassword && (await bcrypt.compare(currentPassword, user.password));
    if (!valid) return NextResponse.json({ error: "INVALID_CURRENT_PASSWORD" }, { status: 403 });
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({ where: { id: session.user.id }, data: { password: hashed } });

  return NextResponse.json({ ok: true });
}
