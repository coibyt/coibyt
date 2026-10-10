import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { productReviewSchema } from "@/lib/validations";
import { MAX_PRODUCT_IMAGE_BYTES, ALLOWED_PRODUCT_IMAGE_TYPES, MAX_REVIEW_IMAGES } from "@/lib/product-images";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const product = await prisma.product.findFirst({ where: { id: productId, active: true } });
  if (!product) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const existing = await prisma.productReview.findUnique({
    where: { productId_customerId: { productId, customerId: session.user.id } },
  });
  if (existing) return NextResponse.json({ error: "ALREADY_REVIEWED" }, { status: 409 });

  const form = await req.formData();
  const parsed = productReviewSchema.safeParse({
    rating: form.get("rating"),
    comment: form.get("comment") || undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const images = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (images.length > MAX_REVIEW_IMAGES) {
    return NextResponse.json({ error: "TOO_MANY_IMAGES" }, { status: 400 });
  }
  for (const img of images) {
    if (img.size > MAX_PRODUCT_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_PRODUCT_IMAGE_TYPES.has(img.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
  }
  const imageRows = await Promise.all(
    images.map(async (img) => ({
      imageData: Buffer.from(await img.arrayBuffer()),
      imageMimeType: img.type,
    }))
  );

  const review = await prisma.productReview.create({
    data: {
      productId,
      businessId: product.businessId,
      customerId: session.user.id,
      rating: parsed.data.rating,
      comment: parsed.data.comment || null,
      images: { create: imageRows },
    },
    include: { images: { select: { id: true } } },
  });

  return NextResponse.json(
    { review: { ...review, imageIds: review.images.map((i) => i.id) } },
    { status: 201 }
  );
}
