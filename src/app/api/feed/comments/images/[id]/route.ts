import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Comment photos are public, same reasoning as PostImage — a comment can
 * only exist under a post that's already publicly listed. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const image = await prisma.postCommentImage.findUnique({
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
