import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { currentLiteOwner, liteEmailTaken } from "@/lib/loyalty-lite";
import { liteOwnerEmail } from "@/lib/email/loyalty-lite-emails";

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(191),
  salonName: z.string().trim().min(2).max(120),
  ownerName: z.string().trim().max(120).optional(),
});

/** A trial salon saves itself with an email: everything it did stays, and
 * the email gets the welcome with the sign-in link for other devices. An
 * email that already has a Lite salon (or staff login) can't take it over. */
export async function POST(req: Request) {
  const salon = await currentLiteOwner();
  if (!salon) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (salon.email) return NextResponse.json({ error: "ALREADY_SAVED" }, { status: 409 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { email, salonName, ownerName } = parsed.data;
  if (await liteEmailTaken(email)) return NextResponse.json({ error: "EMAIL_TAKEN" }, { status: 409 });

  const saved = await prisma.liteSalon.update({
    where: { id: salon.id },
    data: { email, salonName, ...(ownerName ? { ownerName } : {}), savedAt: new Date() },
  });
  await sendMail({ to: email, ...liteOwnerEmail({ ...saved, email }, "welcome") }).catch((err) => console.error("[lite] save mail", err));
  return NextResponse.json({ email, salonName: saved.salonName });
}
