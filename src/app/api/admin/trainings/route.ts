import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(1).max(150),
  description: z.string().trim().max(2000).optional(),
  url: z.string().trim().url().max(190),
});

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const last = await prisma.trainingResource.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  const training = await prisma.trainingResource.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description || null,
      url: parsed.data.url,
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
  });
  return NextResponse.json({ training }, { status: 201 });
}
