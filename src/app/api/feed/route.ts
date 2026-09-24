import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** The signed-in customer's feed — posts from every business they follow,
 * newest first. */
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const follows = await prisma.businessFollow.findMany({
    where: { customerId: session.user.id },
    select: { businessId: true },
  });
  const businessIds = follows.map((f) => f.businessId);
  if (businessIds.length === 0) return NextResponse.json({ posts: [] });

  const posts = await prisma.post.findMany({
    where: { businessId: { in: businessIds } },
    include: {
      business: { select: { name: true, slug: true, logoUrl: true } },
      images: { select: { id: true } },
      _count: { select: { comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json({
    posts: posts.map((p) => ({
      id: p.id,
      content: p.content,
      videoUrl: p.videoUrl,
      imageIds: p.images.map((i) => i.id),
      commentCount: p._count.comments,
      createdAt: p.createdAt.toISOString(),
      businessName: p.business.name,
      businessSlug: p.business.slug,
      businessLogoUrl: p.business.logoUrl,
    })),
  });
}
