import { NextResponse } from "next/server";
import { z } from "zod";
import { getConversationAccess } from "@/lib/chat-access";
import { prisma } from "@/lib/prisma";
import { sendMail, customerWantsHumanEmail } from "@/lib/mailer";
import { sendPushToUser } from "@/lib/push";
import { localeForCountry } from "@/lib/countries";
import { getAiAssistantUserId } from "@/lib/chat-ai";

const schema = z.object({ guestId: z.string().optional() });

/** Customer-triggered escalation out of AI mode — "talk to the real owner".
 * Pauses the AI for this one thread, drops a visible note in the shared
 * history, and alerts the owner by email + push (best-effort, never blocks
 * the response customers see). */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  const guestId = parsed.success ? parsed.data.guestId : undefined;
  const access = await getConversationAccess(id, guestId);
  if (!access || access.role !== "CUSTOMER") {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const [business, customer, aiUserId] = await Promise.all([
    prisma.business.findUnique({
      where: { id: access.conversation.businessId },
      include: { owner: { select: { id: true, name: true, email: true } } },
    }),
    prisma.user.findUnique({ where: { id: access.userId }, select: { name: true } }),
    getAiAssistantUserId(),
  ]);
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const locale = localeForCountry(business.country);
  const noteText =
    locale === "vi"
      ? `${customer?.name ?? "Khách"} đã yêu cầu nói chuyện trực tiếp với chủ salon.`
      : `${customer?.name ?? "The customer"} asked to talk to the salon owner directly.`;

  await prisma.$transaction([
    prisma.conversation.update({ where: { id }, data: { aiPaused: true } }),
    prisma.message.create({
      data: { conversationId: id, senderType: "AI", senderId: aiUserId, content: noteText },
    }),
  ]);

  // Each channel gets its own try/catch — email and push are both
  // best-effort and independent, so one failing (e.g. SMTP misconfigured)
  // must never stop the other from being attempted.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const messagesUrl = `${siteUrl}/${locale}/business/dashboard/messages`;
  try {
    await sendMail({
      to: business.owner.email,
      ...customerWantsHumanEmail({
        ownerName: business.owner.name,
        customerName: customer?.name ?? "—",
        locale,
        messagesUrl,
      }),
    });
  } catch (err) {
    console.error("[chat request-human email]", err);
  }
  try {
    await sendPushToUser(business.owner.id, {
      title: locale === "vi" ? "Khách muốn nói chuyện trực tiếp" : "A customer wants to talk directly",
      body: noteText,
      url: messagesUrl,
    });
  } catch (err) {
    console.error("[chat request-human push]", err);
  }

  return NextResponse.json({ ok: true });
}
