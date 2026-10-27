import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** The owner/staff's inbox — every customer conversation for this business,
 * newest activity first, with a preview of the last message and how many
 * are still unread from the customer's side, plus a few inbox stats. */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.customers)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [conversations, aiReplies30] = await Promise.all([
    prisma.conversation.findMany({
      where: { businessId: access.business.id },
      include: {
        customer: { select: { id: true, name: true, email: true, isGuest: true, guestContactEmail: true, image: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, senderType: true, createdAt: true, imageMimeType: true },
        },
        _count: {
          select: { messages: { where: { senderType: "CUSTOMER", readAt: null } } },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.message.count({
      where: { senderType: "AI", createdAt: { gte: since }, conversation: { businessId: access.business.id } },
    }),
  ]);

  return NextResponse.json({
    aiChatEnabled: access.business.aiChatEnabled,
    stats: { aiReplies30 },
    conversations: conversations.map((c) => ({
      id: c.id,
      customerId: c.customer.id,
      customerName: c.customer.name,
      customerImage: c.customer.image,
      isGuest: c.customer.isGuest,
      // The synthetic @guest.varaaai.com address is never useful to show —
      // show the real email the guest typed in instead (see
      // User.guestContactEmail), or the real account email otherwise.
      customerEmail: access.canViewCustomerContactInfo
        ? c.customer.isGuest
          ? c.customer.guestContactEmail
          : c.customer.email
        : null,
      aiPaused: c.aiPaused,
      lastMessage: c.messages[0]
        ? {
            content: c.messages[0].content,
            hasImage: !!c.messages[0].imageMimeType,
            senderType: c.messages[0].senderType,
            createdAt: c.messages[0].createdAt.toISOString(),
          }
        : null,
      unreadCount: c._count.messages,
      updatedAt: c.updatedAt.toISOString(),
    })),
  });
}
