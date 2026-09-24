import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ reply: z.string().min(1).max(2000) });

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("reviews");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const review = await prisma.review.findFirst({
    where: { id, businessId },
  });
  if (!review) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.review.update({
    where: { id },
    data: { ownerReply: parsed.data.reply },
  });
  return NextResponse.json({ review: updated });
}
