import { NextResponse } from "next/server";
import { getConversationAccess } from "@/lib/chat-access";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getConversationAccess(id);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const afterId = searchParams.get("after"); // for polling: only messages newer than this one

  const messages = await prisma.message.findMany({
    where: {
      conversationId: id,
      ...(afterId ? { id: { gt: afterId } } : {}),
    },
    select: {
      id: true,
      senderType: true,
      senderId: true,
      content: true,
      imageMimeType: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
    ...(afterId ? {} : { take: 100 }),
  });

  // Mark the other side's messages as read now that this side has fetched them.
  const otherType = access.role === "CUSTOMER" ? "BUSINESS" : "CUSTOMER";
  await prisma.message.updateMany({
    where: { conversationId: id, senderType: otherType, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      senderType: m.senderType,
      senderId: m.senderId,
      content: m.content,
      hasImage: !!m.imageMimeType,
      createdAt: m.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getConversationAccess(id);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const form = await req.formData();
  const content = form.get("content");
  const image = form.get("image");

  const text = typeof content === "string" ? content.trim() : "";
  let imageBuffer: Buffer | null = null;
  let imageMimeType: string | null = null;

  if (image instanceof File && image.size > 0) {
    if (image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_IMAGE_TYPES.has(image.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
    imageBuffer = Buffer.from(await image.arrayBuffer());
    imageMimeType = image.type;
  }

  if (!text && !imageBuffer) {
    return NextResponse.json({ error: "EMPTY_MESSAGE" }, { status: 400 });
  }

  const message = await prisma.$transaction(async (tx) => {
    const created = await tx.message.create({
      data: {
        conversationId: id,
        senderType: access.role,
        senderId: access.userId,
        content: text || null,
        imageData: imageBuffer,
        imageMimeType,
      },
    });
    await tx.conversation.update({ where: { id }, data: { updatedAt: new Date() } });
    return created;
  });

  return NextResponse.json({
    message: {
      id: message.id,
      senderType: message.senderType,
      senderId: message.senderId,
      content: message.content,
      hasImage: !!imageBuffer,
      createdAt: message.createdAt.toISOString(),
    },
  });
}
