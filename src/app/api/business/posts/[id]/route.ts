import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { postInclude, toFanPost } from "@/lib/fanpage-data";
import { readPostOptions } from "@/lib/fanpage-post-options";

async function ownedPost(id: string) {
  const owned = await requireOwnerOnly();
  if (!owned) return { error: NextResponse.json({ error: "FORBIDDEN" }, { status: 403 }) };
  const post = await prisma.post.findUnique({ where: { id }, select: { businessId: true, content: true, videoUrl: true } });
  if (!post || post.businessId !== owned.businessId) {
    return { error: NextResponse.json({ error: "NOT_FOUND" }, { status: 404 }) };
  }
  return { post };
}

/** Edits a post's text, video, label, button, pin or schedule (multipart,
 * only the fields sent change — the pin switch sends just `pinned`). */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const found = await ownedPost(id);
  if ("error" in found) return found.error;

  const form = await req.formData();
  const read = readPostOptions(form);
  if ("error" in read) return NextResponse.json({ error: read.error }, { status: 400 });
  const { options } = read;
  const content = form.has("content") ? String(form.get("content") ?? "").trim() || null : undefined;

  const imageCount = await prisma.postImage.count({ where: { postId: id } });
  const nextContent = content !== undefined ? content : found.post.content;
  const nextVideo = options.videoUrl !== undefined ? options.videoUrl : found.post.videoUrl;
  if (!nextContent && !nextVideo && imageCount === 0) {
    return NextResponse.json({ error: "EMPTY_POST" }, { status: 400 });
  }

  const session = await auth();
  const post = await prisma.post.update({
    where: { id },
    data: { ...options, ...(content !== undefined ? { content } : {}) },
    include: postInclude(session?.user?.id ?? null),
  });
  return NextResponse.json({ post: toFanPost(post) });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const found = await ownedPost(id);
  if ("error" in found) return found.error;

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
