import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { LITE_COOKIE, cookieOptions } from "@/lib/loyalty-lite";
import { liteOwnerEmail } from "@/lib/email/loyalty-lite-emails";

/** Loyalty Lite sign-in with email + password — the owner (once they set a
 * password under Profile) or a staff login. With `link: true` instead, an
 * owner gets a sign-in link by email (the answer is the same either way, so
 * it doesn't reveal which emails exist). */
const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  password: z.string().max(200).optional(),
  link: z.boolean().optional(),
});

const recent = new Map<string, number[]>();
function tooMany(key: string) {
  const now = Date.now();
  const list = (recent.get(key) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  list.push(now);
  recent.set(key, list);
  return list.length > 10;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { email, password, link } = parsed.data;
  if (tooMany(ip) || tooMany(email)) return NextResponse.json({ error: "TOO_MANY" }, { status: 429 });

  if (link) {
    const salon = await prisma.liteSalon.findUnique({ where: { email } });
    if (salon) await sendMail({ to: email, ...liteOwnerEmail(salon, "signin") }).catch((err) => console.error("[lite] link mail", err));
    return NextResponse.json({ status: "CHECK_EMAIL" });
  }
  if (!password) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const [salon, staff] = await Promise.all([prisma.liteSalon.findUnique({ where: { email } }), prisma.liteStaff.findUnique({ where: { email } })]);
  let token: string | null = null;
  if (salon?.passwordHash && (await bcrypt.compare(password, salon.passwordHash))) token = salon.accessToken;
  else if (staff?.active && (await bcrypt.compare(password, staff.passwordHash))) token = staff.accessToken;
  if (!token) return NextResponse.json({ error: "WRONG" }, { status: 401 });

  (await cookies()).set(LITE_COOKIE, token, cookieOptions);
  return NextResponse.json({ ok: true });
}
