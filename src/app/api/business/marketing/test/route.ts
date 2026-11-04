import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { getBusinessAccess } from "@/lib/current-business";
import { sendMarketingMail } from "@/lib/marketing-mailer";
import { campaignColumns, campaignContentSchema } from "@/lib/marketing-campaign";
import { campaignSalon, renderCampaign, sampleLoyaltyCard } from "@/lib/marketing-send";
import { profileLockedError } from "@/lib/profile-completeness";

const lastTest = new Map<string, number>();
const testsToday = new Map<string, { day: string; n: number }>();
const MAX_TESTS_PER_DAY = 40;

/** Sends the campaign, free, to check it before it goes out — to the
 * owner's own inbox or any address they type. At most one test every 20
 * seconds and 40 a day. */
export async function POST(req: Request) {
  const access = await getBusinessAccess();
  const session = await auth();
  if (!access?.isOwner || !session?.user?.email) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const locked = await profileLockedError(access.business.id);
  if (locked) return NextResponse.json(locked, { status: 403 });

  const userId = session.user.id;
  const day = new Date().toISOString().slice(0, 10);
  const used = testsToday.get(userId);
  if (Date.now() - (lastTest.get(userId) ?? 0) < 20_000 || (used?.day === day && used.n >= MAX_TESTS_PER_DAY)) {
    return NextResponse.json({ error: "TOO_SOON" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = campaignContentSchema.safeParse(body?.content);
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const to = z.string().trim().toLowerCase().email().max(191).safeParse(body?.to || session.user.email);
  if (!to.success) return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });

  const business = await campaignSalon(access.business.id, parsed.data.sender);
  const loyalty = parsed.data.loyaltyCard ? await sampleLoyaltyCard(access.business.id, session.user.name ?? "") : null;
  const mail = renderCampaign(campaignColumns(parsed.data), business, null, business.defaultLocale, session.user.name ?? "", loyalty);
  lastTest.set(userId, Date.now());
  testsToday.set(userId, { day, n: used?.day === day ? used.n + 1 : 1 });
  // From the marketing mailbox, exactly like the real send.
  await sendMarketingMail({ to: to.data, subject: `[TEST] ${mail.subject}`, html: mail.html, fromName: business.name });
  return NextResponse.json({ ok: true, to: to.data });
}
