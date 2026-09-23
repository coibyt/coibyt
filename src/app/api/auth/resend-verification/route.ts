import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email-verification";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, locale: true, emailVerified: true },
  });
  if (!user) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (user.emailVerified) return NextResponse.json({ error: "ALREADY_VERIFIED" }, { status: 409 });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    locale: user.locale,
    siteUrl,
  });

  return NextResponse.json({ ok: true });
}
