import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LITE_COOKIE, cookieOptions, liteStudioUrl } from "@/lib/loyalty-lite";
import { SITE_URL } from "@/lib/email/ui";

/** The link in Loyalty Lite emails: signs this browser in and opens the studio. */
export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get("t") ?? "";
  const salon = /^[a-f0-9]{48}$/.test(t) ? await prisma.liteSalon.findUnique({ where: { accessToken: t } }) : null;
  if (!salon) return NextResponse.redirect(`${SITE_URL}/loyalty-lite?link=expired`);
  if (!salon.emailVerifiedAt) await prisma.liteSalon.update({ where: { id: salon.id }, data: { emailVerifiedAt: new Date() } });
  const res = NextResponse.redirect(liteStudioUrl(salon.locale));
  res.cookies.set(LITE_COOKIE, salon.accessToken, cookieOptions);
  return res;
}
