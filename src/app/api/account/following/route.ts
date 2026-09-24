import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const follows = await prisma.businessFollow.findMany({
    where: { customerId: session.user.id },
    include: {
      business: { select: { name: true, slug: true, logoUrl: true, city: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    businesses: follows.map((f) => ({
      slug: f.business.slug,
      name: f.business.name,
      logoUrl: f.business.logoUrl,
      city: f.business.city,
    })),
  });
}
