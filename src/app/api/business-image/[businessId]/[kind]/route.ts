import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ businessId: string; kind: string }> }
) {
  const { businessId, kind } = await params;
  const imageKind = kind === "logo" ? "LOGO" : kind === "cover" ? "COVER" : null;
  if (!imageKind) return NextResponse.json({ error: "INVALID_KIND" }, { status: 400 });

  const image = await prisma.businessImage.findUnique({
    where: { businessId_kind: { businessId, kind: imageKind } },
  });
  if (!image) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mimeType,
      // Safe to cache for a year: a re-upload gets a new ?v= query string
      // (see the upload route), so this exact URL only ever serves one image.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
