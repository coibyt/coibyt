import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { LITE_STAFF_SELECT as staffSelect, currentLiteOwner, liteEmailTaken, newAccessToken } from "@/lib/loyalty-lite";
import { liteStaffEmail } from "@/lib/email/loyalty-lite-emails";

/** The owner's staff logins for scanning and stamping cards. */
export async function GET() {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const staff = await prisma.liteStaff.findMany({ where: { liteSalonId: salon.id }, select: staffSelect, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ staff });
}

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(191),
  password: z.string().min(8).max(200),
});

export async function POST(req: Request) {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { name, email, password } = parsed.data;
  if (await liteEmailTaken(email)) return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
  if ((await prisma.liteStaff.count({ where: { liteSalonId: salon.id } })) >= 30) return NextResponse.json({ error: "LIMIT" }, { status: 409 });

  const staff = await prisma.liteStaff.create({
    data: { liteSalonId: salon.id, name, email, passwordHash: await bcrypt.hash(password, 10), accessToken: newAccessToken() },
    select: staffSelect,
  });
  await sendMail({ to: email, ...liteStaffEmail(salon, staff) }).catch((err) => console.error("[lite] staff mail", err));
  return NextResponse.json({ staff }, { status: 201 });
}
