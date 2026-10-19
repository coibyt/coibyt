import { NextResponse } from "next/server";
import { getConversationAccess } from "@/lib/chat-access";
import { prisma } from "@/lib/prisma";
import { sendMail, newChatMessageEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";
import { generateChatReply, getAiAssistantUserId } from "@/lib/chat-ai";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const access = await getConversationAccess(id, searchParams.get("guestId"));
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const afterId = searchParams.get("after"); // for polling: only messages newer than this one

  const messages = await prisma.message.findMany({
    where: {
      conversationId: id,
      ...(afterId ? { id: { gt: afterId } } : {}),
    },
    select: {
      id: true,
      senderType: true,
      senderId: true,
      content: true,
      imageMimeType: true,
      createdAt: true,
      sender: { select: { image: true } },
    },
    orderBy: { createdAt: "asc" },
    ...(afterId ? {} : { take: 100 }),
  });

  // Mark the other side's messages as read now that this side has fetched
  // them — from the customer's view, an AI reply counts as "the business
  // side" too, same as a message the owner typed themselves.
  const otherTypes: ("CUSTOMER" | "BUSINESS" | "AI")[] =
    access.role === "CUSTOMER" ? ["BUSINESS", "AI"] : ["CUSTOMER"];
  await prisma.message.updateMany({
    where: { conversationId: id, senderType: { in: otherTypes }, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      senderType: m.senderType,
      senderId: m.senderId,
      senderImage: m.sender.image,
      content: m.content,
      hasImage: !!m.imageMimeType,
      createdAt: m.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const form = await req.formData();
  const guestId = form.get("guestId");
  const access = await getConversationAccess(id, typeof guestId === "string" ? guestId : null);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const content = form.get("content");
  const image = form.get("image");

  const text = typeof content === "string" ? content.trim() : "";
  let imageBuffer: Buffer | null = null;
  let imageMimeType: string | null = null;

  if (image instanceof File && image.size > 0) {
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
    imageBuffer = Buffer.from(await image.arrayBuffer());
    imageMimeType = image.type;
  }

  if (!text && !imageBuffer) {
    return NextResponse.json({ error: "EMPTY_MESSAGE" }, { status: 400 });
  }

  const previousCustomerMessage =
    access.role === "CUSTOMER"
      ? await prisma.message.findFirst({
          where: { conversationId: id, senderType: "CUSTOMER" },
          orderBy: { createdAt: "desc" },
          select: { createdAt: true },
        })
      : null;

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.message.create({
      data: {
        conversationId: id,
        senderType: access.role,
        senderId: access.userId,
        content: text || null,
        imageData: imageBuffer,
        imageMimeType,
      },
    });
    await tx.conversation.update({ where: { id }, data: { updatedAt: new Date() } });
    return created;
  });

  // Email the salon owner only for a customer's very first message in this
  // conversation — never for every message.
  if (access.role === "CUSTOMER" && !previousCustomerMessage) {
    try {
      const [business, customer] = await Promise.all([
        prisma.business.findUnique({
          where: { id: access.conversation.businessId },
          include: { owner: { select: { name: true, email: true } } },
        }),
        prisma.user.findUnique({ where: { id: access.userId }, select: { name: true } }),
      ]);
      if (business) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
        const locale = localeForCountry(business.country);
        await sendMail({
          to: business.owner.email,
          ...newChatMessageEmail({
            ownerName: business.owner.name,
            customerName: customer?.name ?? "—",
            locale,
            messagesUrl: `${siteUrl}/${locale}/business/dashboard/messages`,
            preview: text,
          }),
        });
      }
    } catch (err) {
      console.error("[chat new-message email]", err);
    }
  }

  // Fire-and-forget: the customer's own send() shouldn't wait on an LLM
  // call. Only ever triggered by a customer's own text message, and only
  // when the salon's AI mode is on and hasn't been paused in this specific
  // thread (see Conversation.aiPaused).
  if (access.role === "CUSTOMER" && !access.conversation.aiPaused && text) {
    triggerAiReply({ conversationId: id, businessId: access.conversation.businessId, customerMessage: text }).catch(
      (err) => console.error("[chat ai-reply]", err)
    );
  }

  const sender = await prisma.user.findUnique({
    where: { id: access.userId },
    select: { image: true },
  });

  return NextResponse.json({
    message: {
      id: message.id,
      senderType: message.senderType,
      senderId: message.senderId,
      senderImage: sender?.image ?? null,
      content: message.content,
      hasImage: !!imageBuffer,
      createdAt: message.createdAt.toISOString(),
    },
  });
}

async function triggerAiReply(params: { conversationId: string; businessId: string; customerMessage: string }) {
  const business = await prisma.business.findUnique({
    where: { id: params.businessId },
    select: { name: true, aiChatEnabled: true, timezone: true },
  });
  if (!business?.aiChatEnabled) return;

  const recent = await prisma.message.findMany({
    where: { conversationId: params.conversationId, content: { not: null } },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { senderType: true, content: true },
  });
  const recentHistory = recent
    .reverse()
    .map((m) => ({
      role: (m.senderType === "CUSTOMER" ? "customer" : "assistant") as "customer" | "assistant",
      content: m.content!,
    }));

  const reply = await generateChatReply({
    businessId: params.businessId,
    businessName: business.name,
    businessTimezone: business.timezone,
    customerMessage: params.customerMessage,
    recentHistory,
  });
  if (!reply) return;

  const aiUserId = await getAiAssistantUserId();
  await prisma.$transaction([
    prisma.message.create({
      data: {
        conversationId: params.conversationId,
        senderType: "AI",
        senderId: aiUserId,
        content: reply,
      },
    }),
    prisma.conversation.update({ where: { id: params.conversationId }, data: { updatedAt: new Date() } }),
  ]);
}
