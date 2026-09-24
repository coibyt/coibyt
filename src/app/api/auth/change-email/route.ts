import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email-verification";

const schema = z.object({
  newEmail: z.string().email(),
  currentPassword: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { newEmail, currentPassword } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true, name: true, email: true, locale: true },
  });
  if (!user) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  if (user.password) {
    const valid = currentPassword && (await bcrypt.compare(currentPassword, user.password));
    if (!valid) return NextResponse.json({ error: "INVALID_CURRENT_PASSWORD" }, { status: 403 });
  }

  if (newEmail === user.email) {
    return NextResponse.json({ error: "SAME_EMAIL" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: newEmail } });
  if (existing) return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });

  // Stage the change instead of applying it immediately — `email` keeps
  // working as the login until the new address is actually confirmed via
  // the link sent below, so a mistyped or unreachable new address can never
  // lock the owner out.
  await prisma.user.update({
    where: { id: session.user.id },
    data: { pendingEmail: newEmail },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  await sendVerificationEmail({ email: newEmail, name: user.name, locale: user.locale, siteUrl });

  return NextResponse.json({ ok: true });
}
