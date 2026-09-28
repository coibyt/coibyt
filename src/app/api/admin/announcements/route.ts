import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(1).max(150),
  body: z.string().trim().min(1).max(5000),
});

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const announcement = await prisma.announcement.create({ data: parsed.data });
  return NextResponse.json({ announcement }, { status: 201 });
}
