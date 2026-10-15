import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }
  // Reviews need a Google-verified identity — see the Google provider's
  // allowDangerousEmailAccountLinking note in src/auth.ts for why signing in
  // with Google here doesn't conflict with an existing password account.
  if (session.user.provider !== "google") {
    return NextResponse.json({ error: "GOOGLE_REQUIRED" }, { status: 403 });
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

  const [review, business] = await Promise.all([
    prisma.review.create({
      data: {
        bookingId,
        businessId: booking.businessId,
        customerId: session.user.id,
        rating,
        comment,
      },
    }),
    prisma.business.findUnique({
      where: { id: booking.businessId },
      select: { googlePlaceId: true, googleMapsUrl: true },
    }),
  ]);

  // Lets the client offer "share this on Google" right away — the business's
  // Place ID builds a direct link to Google's own review composer; a plain
  // Maps URL is a reasonable fallback when no Place ID is set yet.
  const googleReviewUrl = business?.googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${encodeURIComponent(business.googlePlaceId)}`
    : (business?.googleMapsUrl ?? null);

  return NextResponse.json({ review, googleReviewUrl }, { status: 201 });
}
