import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/password-reset";

const schema = z.object({ email: z.string().email() });

/** Always responds the same way whether or not the email exists — never
 * lets a stranger use this to discover which addresses have an account. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (user) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await sendPasswordResetEmail({
      userId: user.id,
      email: user.email,
      name: user.name,
      locale: user.locale,
      siteUrl,
    });
  }

  return NextResponse.json({ ok: true });
}
