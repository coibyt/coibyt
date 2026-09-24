import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MAX_COMMENT_LENGTH = 1000;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const comments = await prisma.postComment.findMany({
    where: { postId: id },
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      authorName: c.author.name,
      createdAt: c.createdAt.toISOString(),
    })),
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (!content) return NextResponse.json({ error: "EMPTY_COMMENT" }, { status: 400 });
  if (content.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  const comment = await prisma.postComment.create({
    data: { postId: id, authorId: session.user.id, content },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({
    comment: {
      id: comment.id,
      content: comment.content,
      authorName: comment.author.name,
      createdAt: comment.createdAt.toISOString(),
    },
  });
}
