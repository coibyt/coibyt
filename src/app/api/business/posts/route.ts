import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { postInclude, toFanPost } from "@/lib/fanpage-data";
import { MAX_POST_IMAGES } from "@/lib/fanpage-strings";
import { readPostOptions } from "@/lib/fanpage-post-options";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

/** The owner's own Fanpage posts — scheduled ones included — pinned first,
 * then newest, for the management view. */
export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const session = await auth();

  const posts = await prisma.post.findMany({
    where: { businessId: owned.businessId },
    include: postInclude(session?.user?.id ?? null),
    orderBy: [{ pinned: "desc" }, { publishAt: "desc" }],
  });
  return NextResponse.json({ posts: posts.map(toFanPost) });
}

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const session = await auth();

  const form = await req.formData();
  const content = form.get("content");
  const images = form.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  const text = typeof content === "string" ? content.trim() : "";

  const read = readPostOptions(form);
  if ("error" in read) return NextResponse.json({ error: read.error }, { status: 400 });
  const { options } = read;
  // A schedule in the past just means "now".
  const publishAt = options.publishAt && options.publishAt > new Date() ? options.publishAt : new Date();

  if (!text && !options.videoUrl && images.length === 0) {
    return NextResponse.json({ error: "EMPTY_POST" }, { status: 400 });
  }
  if (images.length > MAX_POST_IMAGES) {
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
      videoUrl: options.videoUrl ?? null,
      tag: options.tag ?? null,
      ctaType: options.ctaType ?? null,
      pinned: options.pinned ?? false,
      publishAt,
      images: { create: imageRows },
    },
    include: postInclude(session?.user?.id ?? null),
  });

  return NextResponse.json({ post: toFanPost(post) });
}
