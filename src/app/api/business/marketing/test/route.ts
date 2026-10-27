import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { campaignColumns, campaignContentSchema } from "@/lib/marketing-campaign";
import { renderCampaign, salonSelect } from "@/lib/marketing-send";

const lastTest = new Map<string, number>();

/** Sends the campaign to the owner's own inbox, free, to check it before it
 * goes out. At most one test every 20 seconds. */
export async function POST(req: Request) {
  const access = await getBusinessAccess();
  const session = await auth();
  if (!access?.isOwner || !session?.user?.email) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  if (Date.now() - (lastTest.get(session.user.id) ?? 0) < 20_000) {
    return NextResponse.json({ error: "TOO_SOON" }, { status: 429 });
  }

  const parsed = campaignContentSchema.safeParse((await req.json().catch(() => null))?.content);
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const business = await prisma.business.findUniqueOrThrow({
    where: { id: access.business.id },
    select: { ...salonSelect, defaultLocale: true },
  });
  const mail = renderCampaign(campaignColumns(parsed.data), business, null, business.defaultLocale, session.user.name ?? "");
  lastTest.set(session.user.id, Date.now());
  await sendMail({ to: session.user.email, subject: `[TEST] ${mail.subject}`, html: mail.html });
  return NextResponse.json({ ok: true, to: session.user.email });
}
