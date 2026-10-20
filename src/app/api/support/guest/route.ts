import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { newGuestToken, SUPPORT_GUEST_COOKIE } from "@/lib/support";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(180),
  locale: z.string().max(8).optional(),
});

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

async function setGuestCookie(token: string) {
  (await cookies()).set(SUPPORT_GUEST_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

/** A visitor without an account starts a support chat by giving a name and
 * an email (so the team can answer them by email too). The thread is then
 * identified by an httpOnly cookie. */
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  if (!rateLimit(`support-guest:${await clientIp()}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }
  const { name, email, locale } = parsed.data;

  // Same browser coming back: keep its thread, just refresh the details.
  const existing = (await cookies()).get(SUPPORT_GUEST_COOKIE)?.value;
  if (existing) {
    const updated = await prisma.supportThread.updateMany({
      where: { guestToken: existing },
      data: { guestName: name, guestEmail: email.toLowerCase(), ...(locale ? { locale } : {}) },
    });
    if (updated.count) return NextResponse.json({ ok: true });
  }

  const token = newGuestToken();
  await prisma.supportThread.create({
    data: { guestToken: token, guestName: name, guestEmail: email.toLowerCase(), locale: locale ?? "vi" },
  });
  await setGuestCookie(token);
  return NextResponse.json({ ok: true });
}

/** The link in a reply email: restores the guest's chat in this browser. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t") ?? "";
  const locale = (url.searchParams.get("l") ?? "vi").replace(/[^a-z-]/gi, "").slice(0, 8) || "vi";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  const target = `${site}${locale === "vi" ? "" : `/${locale}`}/support`;
  if (token) {
    const thread = await prisma.supportThread.findUnique({ where: { guestToken: token }, select: { id: true } });
    if (thread) await setGuestCookie(token);
  }
  return NextResponse.redirect(target);
}
