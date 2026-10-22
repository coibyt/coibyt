import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { livePosts, postInclude, toFanPost } from "@/lib/fanpage-data";

/** The signed-in customer's feed — live posts from every business they
 * follow, newest first. */
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
    where: { businessId: { in: businessIds }, ...livePosts() },
    include: postInclude(session.user.id),
    orderBy: { publishAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ posts: posts.map(toFanPost) });
}
