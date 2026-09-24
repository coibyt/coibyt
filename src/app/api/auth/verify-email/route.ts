import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { approveBusiness } from "@/lib/approve-business";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/auth/verify-email?status=invalid`);
  }

  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expires < new Date()) {
    return NextResponse.redirect(`${siteUrl}/auth/verify-email?status=invalid`);
  }

  // Two cases share this one link format: verifying a brand-new account's
  // own email (record.identifier already matches a User.email), or
  // confirming a pending email CHANGE (record.identifier matches someone's
  // staged User.pendingEmail instead — see /api/auth/change-email, which
  // never touches the real `email` column until this point).
  const userByEmail = await prisma.user.findUnique({ where: { email: record.identifier } });
  let isEmailChange = false;
  const user = userByEmail
    ? await prisma.user.update({
        where: { id: userByEmail.id },
        data: { emailVerified: new Date() },
      })
    : await (async () => {
        const pending = await prisma.user.findFirst({ where: { pendingEmail: record.identifier } });
        if (!pending) return null;
        isEmailChange = true;
        return prisma.user.update({
          where: { id: pending.id },
          data: { email: record.identifier, pendingEmail: null, emailVerified: new Date() },
        });
      })();

  if (!user) {
    return NextResponse.redirect(`${siteUrl}/auth/verify-email?status=invalid`);
  }

  await prisma.verificationToken.delete({ where: { token } }).catch(() => {
    // Already consumed by a concurrent request — fine, the update above is idempotent.
  });

  const business = await prisma.business.findUnique({ where: { ownerId: user.id } });
  if (business && business.status === "PENDING") {
    await approveBusiness(business.id);
  }

  return NextResponse.redirect(
    `${siteUrl}/auth/verify-email?status=success${isEmailChange ? "&reason=email_change" : ""}`
  );
}
