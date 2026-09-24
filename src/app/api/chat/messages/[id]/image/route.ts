import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getConversationAccess } from "@/lib/chat-access";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const message = await prisma.message.findUnique({
    where: { id },
    select: { conversationId: true, imageData: true, imageMimeType: true },
  });
  if (!message || !message.imageData) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const access = await getConversationAccess(message.conversationId);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  return new NextResponse(new Uint8Array(message.imageData), {
    headers: {
      "Content-Type": message.imageMimeType ?? "application/octet-stream",
      // A message's image never changes once sent, but it's only ever
      // visible to the two participants, so keep it out of shared caches.
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
