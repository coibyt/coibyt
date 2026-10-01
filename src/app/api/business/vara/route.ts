import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "BUSINESS_OWNER") {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const userId = session.user.id;

  const [user, referredBusinesses, clickCount, recentTransactions] = await Promise.all([
    prisma.user.findUniqueOrThrow({ where: { id: userId } }),
    prisma.business.findMany({
      where: { referredByOwnerId: userId },
      select: { referralBonusAwarded: true },
    }),
    prisma.referralClick.count({ where: { ownerId: userId } }),
    prisma.varaPointTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  return NextResponse.json({
    varaPoints: user.varaPoints,
    referralCode: user.referralCode,
    checkedInToday: user.varaLastCheckinDate === today,
    referredSignupCount: referredBusinesses.length,
    referredQualifiedCount: referredBusinesses.filter((b) => b.referralBonusAwarded).length,
    referralClickCount: clickCount,
    recentTransactions: recentTransactions.map((t) => ({
      id: t.id,
      amount: t.amount,
      reason: t.reason,
      createdAt: t.createdAt.toISOString(),
    })),
  });
}
