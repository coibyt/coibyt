import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const campaigns = await prisma.emailCampaign.findMany({
    where: { businessId: owned.businessId },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, subject: true, recipientCount: true, createdAt: true },
  });

  return NextResponse.json({ campaigns });
}
