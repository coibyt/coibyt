import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateSupportReply, type SupportAiContext } from "@/lib/support-ai/reply";

/** The signed-in user's id if they run at least one salon — the only people
 * who get the owner-side Support hub. */
export async function requireSupportOwner(): Promise<string | null> {
  const session = await auth();
  if (!session?.user) return null;
  const owned = await prisma.business.count({ where: { ownerId: session.user.id } });
  return owned > 0 ? session.user.id : null;
}

/** The signed-in user's id if they run a salon or work at one (staff with a
 * login) -- who gets the dashboard's help widget. */
export async function requireSupportMember(): Promise<string | null> {
  const session = await auth();
  if (!session?.user) return null;
  const [owned, staff] = await Promise.all([
    prisma.business.count({ where: { ownerId: session.user.id } }),
    prisma.staff.count({ where: { userId: session.user.id } }),
  ]);
  return owned > 0 || staff > 0 ? session.user.id : null;
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

/** Unread messages waiting for a person on the admin team. */
export async function adminSupportUnreadCount(): Promise<number> {
  return prisma.supportMessage.count({ where: { fromAdmin: false, readAt: null } });
}

/* ---------- who is writing in ---------- */

/** Cookie holding a visitor's guest thread token (no account needed). */
export const SUPPORT_GUEST_COOKIE = "varaaai_support";

export function newGuestToken() {
  return randomBytes(24).toString("base64url");
}

export interface SupportVisitor {
  userId: string | null;
  guestToken: string | null;
}

/** The signed-in user, or the guest whose cookie identifies their thread. */
export async function currentSupportVisitor(): Promise<SupportVisitor | null> {
  const session = await auth();
  if (session?.user?.id) return { userId: session.user.id, guestToken: null };
  const token = (await cookies()).get(SUPPORT_GUEST_COOKIE)?.value;
  return token ? { userId: null, guestToken: token } : null;
}

/** The visitor's thread; created on first use for a signed-in user. Guests
 * only ever get a thread through POST /api/support/guest. */
export async function findSupportThread(visitor: SupportVisitor, opts: { create?: boolean; locale?: string } = {}) {
  if (visitor.userId) {
    const found = await prisma.supportThread.findUnique({ where: { ownerId: visitor.userId } });
    if (found || !opts.create) return found;
    return prisma.supportThread.create({ data: { ownerId: visitor.userId, locale: opts.locale ?? "vi" } });
  }
  if (visitor.guestToken) return prisma.supportThread.findUnique({ where: { guestToken: visitor.guestToken } });
  return null;
}

/* ---------- AI switch ---------- */

const AI_KEY = "supportAi";

/** Whether the AI assistant answers support chats (admin switch, off by default). */
export async function supportAiEnabled(): Promise<boolean> {
  const row = await prisma.platformSetting.findUnique({ where: { key: AI_KEY } });
  return row?.value === "on";
}

export async function setSupportAiEnabled(on: boolean) {
  await prisma.platformSetting.upsert({
    where: { key: AI_KEY },
    update: { value: on ? "on" : "off" },
    create: { key: AI_KEY, value: on ? "on" : "off" },
  });
}

/* ---------- the AI's turn ---------- */

async function aiContext(threadId: string): Promise<SupportAiContext | null> {
  const thread = await prisma.supportThread.findUnique({
    where: { id: threadId },
    select: {
      locale: true,
      guestName: true,
      owner: {
        select: {
          name: true,
          businesses: { select: { name: true } },
          staffProfile: { select: { business: { select: { name: true } } } },
        },
      },
    },
  });
  if (!thread) return null;
  if (!thread.owner) return { role: "guest", name: thread.guestName ?? "", businessNames: [], locale: thread.locale };
  const businessNames = thread.owner.businesses.map((b) => b.name);
  if (!businessNames.length && thread.owner.staffProfile) {
    return { role: "staff", name: thread.owner.name, businessNames: [thread.owner.staffProfile.business.name], locale: thread.locale };
  }
  return {
    role: businessNames.length ? "owner" : "customer",
    name: thread.owner.name,
    businessNames,
    locale: thread.locale,
  };
}

/** Lets the AI answer the thread's latest message, if the admin switch is on
 * and nobody paused the AI in this thread. Returns the AI's message, or null
 * when it stayed quiet or failed (then a person needs to answer). The user's
 * message it answered is marked read, so it doesn't wait in the admin inbox. */
export async function runSupportAi(threadId: string) {
  const [enabled, thread] = await Promise.all([
    supportAiEnabled(),
    prisma.supportThread.findUnique({ where: { id: threadId }, select: { aiPaused: true } }),
  ]);
  if (!enabled || !thread || thread.aiPaused) return null;

  const [context, recent] = await Promise.all([
    aiContext(threadId),
    prisma.supportMessage.findMany({
      where: { threadId },
      orderBy: { createdAt: "desc" },
      take: 12,
      select: { id: true, fromAdmin: true, content: true },
    }),
  ]);
  if (!context || !recent.length || recent[0].fromAdmin) return null;

  const reply = await generateSupportReply({
    context,
    history: recent.reverse().map((m) => ({ fromUser: !m.fromAdmin, content: m.content })),
  });
  if (!reply) return null;

  const [message] = await prisma.$transaction([
    prisma.supportMessage.create({
      data: { threadId, fromAdmin: true, fromAi: true, content: reply },
    }),
    prisma.supportMessage.updateMany({
      where: { threadId, fromAdmin: false, readAt: null },
      data: { readAt: new Date() },
    }),
    prisma.supportThread.update({ where: { id: threadId }, data: { updatedAt: new Date() } }),
  ]);
  return message;
}

export function supportMessageDto(m: { id: string; fromAdmin: boolean; fromAi: boolean; content: string; createdAt: Date }) {
  return { id: m.id, fromAdmin: m.fromAdmin, fromAi: m.fromAi, content: m.content, createdAt: m.createdAt.toISOString() };
}
