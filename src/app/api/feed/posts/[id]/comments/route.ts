import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_COMMENT_LENGTH = 1000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const comments = await prisma.postComment.findMany({
    where: { postId: id },
    include: { author: { select: { name: true } }, images: { select: { id: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      authorName: c.author.name,
      imageId: c.images[0]?.id ?? null,
      createdAt: c.createdAt.toISOString(),
    })),
  });
}

/** Multipart so a comment can carry an optional photo alongside its text —
 * same client/server shape as a chat message (see
 * /api/chat/conversations/[id]/messages), just with content required
 * unless a photo is attached. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const form = await req.formData();
  const rawContent = form.get("content");
  const content = typeof rawContent === "string" ? rawContent.trim() : "";
  if (content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  const image = form.get("image");
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

  if (!content && !imageBuffer) {
    return NextResponse.json({ error: "EMPTY_COMMENT" }, { status: 400 });
  }

  const comment = await prisma.postComment.create({
    data: {
      postId: id,
      authorId: session.user.id,
      content,
      images:
        imageBuffer && imageMimeType
          ? { create: [{ imageData: imageBuffer, imageMimeType }] }
          : undefined,
    },
    include: { author: { select: { name: true } }, images: { select: { id: true } } },
  });

  return NextResponse.json({
    comment: {
      id: comment.id,
      content: comment.content,
      authorName: comment.author.name,
      imageId: comment.images[0]?.id ?? null,
      createdAt: comment.createdAt.toISOString(),
    },
  });
}
