import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** The owner/staff's inbox — every customer conversation for this business,
 * newest activity first, with a preview of the last message and how many
 * are still unread from the customer's side. */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.customers)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const conversations = await prisma.conversation.findMany({
    where: { businessId: access.business.id },
    include: {
      customer: { select: { id: true, name: true } },
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
  });

  return NextResponse.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      customerId: c.customer.id,
      customerName: c.customer.name,
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
