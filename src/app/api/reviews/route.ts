import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const parsed = reviewSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { bookingId, rating, comment } = parsed.data;

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, customerId: session.user.id },
    include: { review: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (booking.status !== "COMPLETED") {
    return NextResponse.json({ error: "BOOKING_NOT_COMPLETED" }, { status: 409 });
  }
  if (booking.review) {
    return NextResponse.json({ error: "ALREADY_REVIEWED" }, { status: 409 });
  }

  const review = await prisma.review.create({
    data: {
      bookingId,
      businessId: booking.businessId,
      customerId: session.user.id,
      rating,
      comment,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
