import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** The signed-in user's id if they run at least one salon — the only people
 * who get the owner-side Support hub. */
export async function requireSupportOwner(): Promise<string | null> {
  const session = await auth();
  if (!session?.user) return null;
  const owned = await prisma.business.count({ where: { ownerId: session.user.id } });
  return owned > 0 ? session.user.id : null;
}

/** What the sidebar badge on "Support" shows for an owner: announcements they
 * haven't opened yet plus admin replies they haven't read. */
export async function ownerSupportUnreadCount(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { announcementsSeenAt: true },
  });
  const [announcements, replies] = await Promise.all([
    prisma.announcement.count({
      where: user?.announcementsSeenAt ? { createdAt: { gt: user.announcementsSeenAt } } : {},
    }),
    prisma.supportMessage.count({
      where: { fromAdmin: true, readAt: null, thread: { ownerId: userId } },
    }),
  ]);
  return announcements + replies;
}

/** Unread salon-owner messages waiting for an admin. */
export async function adminSupportUnreadCount(): Promise<number> {
  return prisma.supportMessage.count({ where: { fromAdmin: false, readAt: null } });
}
