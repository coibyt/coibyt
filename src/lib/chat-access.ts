import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess } from "@/lib/current-business";

/** Resolves whether the signed-in (or anonymous guest) user may read/write
 * a conversation — the customer side of it (by session, or by a guestId the
 * client passes explicitly, see POST /api/chat/start), or the business side
 * (owner, or staff granted the Customers permission, since chat is
 * fundamentally customer communication).
 *
 * `guestId` is never trusted blindly: it must both match the conversation's
 * own customerId AND belong to a row actually flagged `isGuest` — otherwise
 * knowing (or guessing) a real customer's id would let a stranger read
 * their chat. */
export async function getConversationAccess(conversationId: string, guestId?: string | null) {
  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation) return null;

  const session = await auth();
  if (session?.user && conversation.customerId === session.user.id) {
    return { conversation, role: "CUSTOMER" as const, userId: session.user.id };
  }

  if (guestId && conversation.customerId === guestId) {
    const guest = await prisma.user.findUnique({ where: { id: guestId }, select: { isGuest: true } });
    if (guest?.isGuest) {
      return { conversation, role: "CUSTOMER" as const, userId: guestId };
    }
  }

  if (session?.user) {
    const access = await getBusinessAccess();
    if (
      access &&
      access.business.id === conversation.businessId &&
      (access.isOwner || access.permissions.customers)
    ) {
      return { conversation, role: "BUSINESS" as const, userId: session.user.id };
    }
  }

  return null;
}
