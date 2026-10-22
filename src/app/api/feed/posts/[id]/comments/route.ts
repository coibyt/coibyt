import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getComments, livePosts, toFanComment } from "@/lib/fanpage-data";

const MAX_COMMENT_LENGTH = 1000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** Public, like the fanpage itself — anyone can read a post's comments. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  return NextResponse.json({ comments: await getComments(id, session?.user?.id ?? null) });
}

/** Multipart so a comment can carry an optional photo alongside its text —
 * same client/server shape as a chat message (see
 * /api/chat/conversations/[id]/messages), just with content required
 * unless a photo is attached. The salon's owner commenting on their own
 * post replies as the salon. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const post = await prisma.post.findFirst({
    where: { id, ...livePosts() },
    select: { id: true, business: { select: { ownerId: true, name: true, logoUrl: true } } },
  });
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

  const isOwner = session.user.id === post.business.ownerId;
  const comment = await prisma.postComment.create({
    data: {
      postId: id,
      authorId: session.user.id,
      content,
      asBusiness: isOwner,
      images:
        imageBuffer && imageMimeType
          ? { create: [{ imageData: imageBuffer, imageMimeType }] }
          : undefined,
    },
    include: { author: { select: { name: true, image: true } }, images: { select: { id: true } } },
  });

  return NextResponse.json({ comment: toFanComment(comment, post.business, session.user.id, isOwner) });
}

/** `?commentId=` — by the comment's author, or by the salon's owner
 * moderating their own fanpage. */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const commentId = new URL(req.url).searchParams.get("commentId");
  const comment = commentId
    ? await prisma.postComment.findFirst({
        where: { id: commentId, postId: id },
        select: { id: true, authorId: true, post: { select: { business: { select: { ownerId: true } } } } },
      })
    : null;
  if (!comment) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (comment.authorId !== session.user.id && comment.post.business.ownerId !== session.user.id) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  await prisma.postComment.delete({ where: { id: comment.id } });
  return NextResponse.json({ ok: true });
}
