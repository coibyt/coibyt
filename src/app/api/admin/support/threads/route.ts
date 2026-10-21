import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

/** Everyone who has written to support — salon owners, customers and guests
 * without an account — most recently active first. */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const threads = await prisma.supportThread.findMany({
    orderBy: { updatedAt: "desc" },
    take: 300,
    include: {
      owner: {
        select: {
          name: true,
          email: true,
          businesses: { select: { name: true } },
          staffProfile: { select: { business: { select: { name: true } } } },
        },
      },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: { where: { fromAdmin: false, readAt: null } } } },
    },
  });

  return NextResponse.json({
    threads: threads
      .filter((t) => t.messages.length > 0)
      .map((t) => ({
        id: t.id,
        kind: t.owner
          ? t.owner.businesses.length
            ? "owner"
            : t.owner.staffProfile
              ? "staff"
              : "customer"
          : "guest",
        name: t.owner?.name ?? t.guestName ?? "Khách",
        email: t.owner?.email ?? t.guestEmail ?? "",
        businessNames: t.owner
          ? t.owner.businesses.length
            ? t.owner.businesses.map((b) => b.name)
            : t.owner.staffProfile
              ? [t.owner.staffProfile.business.name]
              : []
          : [],
        locale: t.locale,
        aiPaused: t.aiPaused,
        lastMessage: t.messages[0]?.content ?? "",
        lastFromAi: t.messages[0]?.fromAi ?? false,
        lastMessageAt: t.messages[0]?.createdAt.toISOString() ?? t.updatedAt.toISOString(),
        unread: t._count.messages,
      })),
  });
}
