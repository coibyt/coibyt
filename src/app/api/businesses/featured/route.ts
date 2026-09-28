import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — powers the homepage's "popular near you" section. Filtering by
 * country is optional so the section can still show something before the
 * visitor's location is known (or if they never grant it). */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country")?.trim().toUpperCase();

  // Only salons with at least this many followers earn a homepage spot.
  const MIN_FOLLOWERS = 2;
  const popular = await prisma.businessFollow.groupBy({
    by: ["businessId"],
    _count: { _all: true },
    having: { businessId: { _count: { gte: MIN_FOLLOWERS } } },
  });

  const businesses = await prisma.business.findMany({
    where: {
      status: "APPROVED",
      id: { in: popular.map((p) => p.businessId) },
      ...(country ? { country } : {}),
    },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: {
      reviews: { select: { rating: true } },
      categories: { include: { category: true } },
    },
  });

  return NextResponse.json({ businesses });
}
