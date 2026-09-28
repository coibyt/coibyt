import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

/** Every salon owner who has written to support, most recently active first. */
export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const threads = await prisma.supportThread.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      owner: { select: { name: true, email: true, businesses: { select: { name: true } } } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: { select: { messages: { where: { fromAdmin: false, readAt: null } } } },
    },
  });

  return NextResponse.json({
    threads: threads.map((t) => ({
      id: t.id,
      ownerName: t.owner.name,
      ownerEmail: t.owner.email,
      businessNames: t.owner.businesses.map((b) => b.name),
      lastMessage: t.messages[0]?.content ?? "",
      lastMessageAt: t.messages[0]?.createdAt.toISOString() ?? t.updatedAt.toISOString(),
      unread: t._count.messages,
    })),
  });
}
