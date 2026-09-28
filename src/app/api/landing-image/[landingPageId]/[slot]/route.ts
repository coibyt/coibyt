import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — the landing page itself is public once published, so its images
 * must be servable without a session. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ landingPageId: string; slot: string }> }
) {
  const { landingPageId, slot } = await params;

  const image = await prisma.landingImage.findUnique({
    where: { landingPageId_slot: { landingPageId, slot } },
  });
  if (!image) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
