import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** The signed-in customer's own inbox — every salon conversation they're
 * part of, newest activity first. Mirrors /api/business/chat/conversations
 * but scoped to the customer side of each thread. */
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { customerId: session.user.id },
    include: {
      business: { select: { name: true, slug: true, logoUrl: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, senderType: true, createdAt: true, imageMimeType: true },
      },
      _count: {
        select: { messages: { where: { senderType: "BUSINESS", readAt: null } } },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      businessName: c.business.name,
      businessSlug: c.business.slug,
      businessLogoUrl: c.business.logoUrl,
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
