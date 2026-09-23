import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — powers the homepage's "popular near you" section. Filtering by
 * country is optional so the section can still show something before the
 * visitor's location is known (or if they never grant it). */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country")?.trim().toUpperCase();

  const businesses = await prisma.business.findMany({
    where: { status: "APPROVED", ...(country ? { country } : {}) },
    take: 8,
    orderBy: { createdAt: "desc" },
    include: {
      reviews: { select: { rating: true } },
      categories: { include: { category: true } },
    },
  });

  return NextResponse.json({ businesses });
}
