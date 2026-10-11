import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public — a profile photo shows up in chat and fanpage comments on pages
 * other people view, same reasoning as StaffAvatar. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const avatar = await prisma.userAvatar.findUnique({ where: { userId } });
  if (!avatar) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(avatar.imageData), {
    headers: {
      "Content-Type": avatar.imageMimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
