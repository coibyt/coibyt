import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { DEFAULT_REWARD, LITE_COOKIE, cookieOptions, liteLocale, newAccessToken } from "@/lib/loyalty-lite";
import { liteOwnerEmail } from "@/lib/email/loyalty-lite-emails";

/** Loyalty Lite sign-up: salon name + email. A new email gets in straight
 * away (cookie) plus a welcome email with the sign-in link; a known email
 * only gets the sign-in link by email, so nobody can open someone else's. */
const schema = z.object({
  salonName: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(191),
  ownerName: z.string().trim().max(120).optional(),
  locale: z.string().max(8).default("vi"),
});

const recent = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 8;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (tooMany(ip)) return NextResponse.json({ error: "TOO_MANY" }, { status: 429 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { salonName, email, ownerName } = parsed.data;
  const locale = liteLocale(parsed.data.locale);

  const existing = await prisma.liteSalon.findUnique({ where: { email } });
  if (existing) {
    await sendMail({ to: existing.email, ...liteOwnerEmail(existing, "signin") }).catch((err) => console.error("[lite] signin mail", err));
    return NextResponse.json({ status: "CHECK_EMAIL" });
  }

  const salon = await prisma.liteSalon.create({
    data: { email, salonName, ownerName: ownerName || null, locale, accessToken: newAccessToken(), rewardText: DEFAULT_REWARD[locale] },
  });
  (await cookies()).set(LITE_COOKIE, salon.accessToken, cookieOptions);
  await sendMail({ to: salon.email, ...liteOwnerEmail(salon, "welcome") }).catch((err) => console.error("[lite] welcome mail", err));
  return NextResponse.json({ status: "CREATED" });
}
