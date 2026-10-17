import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendGoogleReviewRequest } from "@/lib/google-review";

const schema = z.object({ status: z.enum(["APPROVED", "HIDDEN"]) });

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
    data: { status: parsed.data.status },
  });

  // Whichever way the salon decides — publish or hide — the customer gets
  // the same one-time invitation to post on Google too. Tying it to
  // "published" only would mean soliciting just the reviews the salon liked,
  // which Google's review policy forbids.
  try {
    await sendGoogleReviewRequest(id);
  } catch (err) {
    console.error("[review status google request]", err);
  }

  return NextResponse.json({ review: updated });
}
