import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { token, newPassword } = parsed.data;

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: { select: { id: true, email: true } } },
  });
  if (!record || record.expires < new Date()) {
    return NextResponse.json({ error: "INVALID_TOKEN" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { password: hashed } }),
    // Every outstanding reset link for this user is spent the moment one is
    // used, not just this one — closes off any other copy that may have
    // been forwarded or leaked.
    prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } }),
  ]);

  return NextResponse.json({ ok: true, email: record.user.email });
}
