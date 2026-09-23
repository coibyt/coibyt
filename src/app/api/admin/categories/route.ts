import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { z } from "zod";

const schema = z.object({
  nameVi: z.string().min(2).max(100),
  nameEn: z.string().min(2).max(100),
  icon: z.string().max(60).optional(),
});

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { nameVi: "asc" } });
  return NextResponse.json({ categories });
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const category = await prisma.category.create({
    data: { ...parsed.data, slug: slugify(parsed.data.nameEn) },
  });
  return NextResponse.json({ category }, { status: 201 });
}
