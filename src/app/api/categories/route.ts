import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — powers the search bar's suggestion dropdown. */
export async function GET() {
  const categories = await prisma.category.findMany({
    select: { slug: true, nameVi: true, nameEn: true, icon: true },
    orderBy: { nameVi: "asc" },
  });
  return NextResponse.json({ categories });
}
