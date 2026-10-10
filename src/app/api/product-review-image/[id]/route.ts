import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Review photos are public, same reasoning as ProductImage. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const image = await prisma.productReviewImage.findUnique({
    where: { id },
    select: { imageData: true, imageMimeType: true },
  });
  if (!image) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(image.imageData), {
    headers: {
      "Content-Type": image.imageMimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
