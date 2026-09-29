import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — staff avatars show on the salon's public booking page and its
 * /site/*\/about page, both reachable without a session. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ staffId: string }> }
) {
  const { staffId } = await params;

  const avatar = await prisma.staffAvatar.findUnique({ where: { staffId } });
  if (!avatar) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(avatar.data), {
    headers: {
      "Content-Type": avatar.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
