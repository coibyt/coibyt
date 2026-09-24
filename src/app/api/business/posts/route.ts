import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_IMAGES = 6;

/** The owner's own Fanpage posts, newest first, for the management view. */
export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const posts = await prisma.post.findMany({
    where: { businessId: owned.businessId },
    include: {
      images: { select: { id: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    posts: posts.map((p) => ({
      id: p.id,
      content: p.content,
      videoUrl: p.videoUrl,
      imageIds: p.images.map((i) => i.id),
      commentCount: p._count.comments,
      createdAt: p.createdAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const form = await req.formData();
  const content = form.get("content");
  const videoUrl = form.get("videoUrl");
  const images = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  const text = typeof content === "string" ? content.trim() : "";
  const video = typeof videoUrl === "string" ? videoUrl.trim() : "";

  if (video) {
    try {
      new URL(video);
    } catch {
      return NextResponse.json({ error: "INVALID_VIDEO_URL" }, { status: 400 });
    }
  }
  if (!text && !video && images.length === 0) {
    return NextResponse.json({ error: "EMPTY_POST" }, { status: 400 });
  }
  if (images.length > MAX_IMAGES) {
    return NextResponse.json({ error: "TOO_MANY_IMAGES" }, { status: 400 });
  }
  for (const img of images) {
    if (img.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "FILE_TOO_LARGE" }, { status: 400 });
    }
    if (!ALLOWED_IMAGE_TYPES.has(img.type)) {
      return NextResponse.json({ error: "UNSUPPORTED_TYPE" }, { status: 400 });
    }
  }

  const imageRows = await Promise.all(
    images.map(async (img) => ({
      imageData: Buffer.from(await img.arrayBuffer()),
      imageMimeType: img.type,
    }))
  );

  const post = await prisma.post.create({
    data: {
      businessId: owned.businessId,
      content: text || null,
      videoUrl: video || null,
      images: { create: imageRows },
    },
    include: { images: { select: { id: true } } },
  });

  return NextResponse.json({
    post: {
      id: post.id,
      content: post.content,
      videoUrl: post.videoUrl,
      imageIds: post.images.map((i) => i.id),
      commentCount: 0,
      createdAt: post.createdAt.toISOString(),
    },
  });
}
