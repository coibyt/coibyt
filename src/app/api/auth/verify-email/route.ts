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

  const user = await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } }).catch(() => {
    // Already consumed by a concurrent request — fine, the update above is idempotent.
  });

  const business = await prisma.business.findUnique({ where: { ownerId: user.id } });
  if (business && business.status === "PENDING") {
    await approveBusiness(business.id);
  }

  return NextResponse.redirect(`${siteUrl}/auth/verify-email?status=success`);
}
