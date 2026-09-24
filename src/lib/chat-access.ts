import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess } from "@/lib/current-business";

/** Resolves whether the signed-in user may read/write a conversation —
 * either as the customer side of it, or as the business side (owner, or
 * staff granted the Customers permission, since chat is fundamentally
 * customer communication). */
export async function getConversationAccess(conversationId: string) {
  const session = await auth();
  if (!session?.user) return null;

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) return null;

  if (conversation.customerId === session.user.id) {
    return { conversation, role: "CUSTOMER" as const, userId: session.user.id };
  }

  const access = await getBusinessAccess();
  if (
    access &&
    access.business.id === conversation.businessId &&
    (access.isOwner || access.permissions.customers)
  ) {
    return { conversation, role: "BUSINESS" as const, userId: session.user.id };
  }

  return null;
}
