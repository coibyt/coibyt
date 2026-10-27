import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public: pictures in marketing emails are loaded by the recipient's mail app. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const img = await prisma.marketingImage.findUnique({ where: { id }, select: { data: true, mimeType: true } });
  if (!img) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return new NextResponse(new Uint8Array(img.data), {
    headers: { "Content-Type": img.mimeType, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
