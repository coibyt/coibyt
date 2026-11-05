import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { LITE_COOKIE, cookieOptions, currentLiteOwner, liteEmailTaken, newAccessToken } from "@/lib/loyalty-lite";
import { liteEmailChangedEmail, liteOwnerEmail } from "@/lib/email/loyalty-lite-emails";

/** The owner's own account: name, sign-in email and password. */
const schema = z.object({
  ownerName: z.string().trim().max(120).optional(),
  email: z.string().trim().toLowerCase().email().max(191).optional(),
  password: z.string().min(8).max(200).optional(),
  removePassword: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { ownerName, email, password, removePassword } = parsed.data;
  // A trial saves itself first (/api/loyalty-lite/save): no password or email change before that.
  if (!salon.email && (email || password)) return NextResponse.json({ error: "TRIAL" }, { status: 409 });

  const emailChanged = !!email && email !== salon.email;
  if (emailChanged && (await liteEmailTaken(email, { salonId: salon.id }))) return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });

  const updated = await prisma.liteSalon.update({
    where: { id: salon.id },
    data: {
      ...(ownerName !== undefined ? { ownerName: ownerName || null } : {}),
      ...(emailChanged ? { email, emailVerifiedAt: null } : {}),
      ...(password ? { passwordHash: await bcrypt.hash(password, 10) } : removePassword ? { passwordHash: null } : {}),
    },
  });
  if (emailChanged && updated.email && salon.email) {
    // The new address gets a sign-in link (and so proves it works); the old one a heads-up.
    await sendMail({ to: updated.email, ...liteOwnerEmail(updated, "signin") }).catch((err) => console.error("[lite] new email", err));
    await sendMail({ to: salon.email, ...liteEmailChangedEmail(updated, salon.email, updated.email) }).catch((err) => console.error("[lite] old email", err));
  }
  return NextResponse.json({ email: updated.email, ownerName: updated.ownerName, hasPassword: !!updated.passwordHash });
}

/** Sign out every device: a new access token (old emailed links stop
 * working too); this browser stays signed in with the new one. */
export async function POST() {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const updated = await prisma.liteSalon.update({ where: { id: salon.id }, data: { accessToken: newAccessToken() } });
  (await cookies()).set(LITE_COOKIE, updated.accessToken, cookieOptions);
  return NextResponse.json({ ok: true });
}
