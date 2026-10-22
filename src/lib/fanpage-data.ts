import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

/** One post as the fanpage, the customer feed and the dashboard show it. */
export interface FanPost {
  id: string;
  content: string | null;
  videoUrl: string | null;
  imageIds: string[];
  tag: string | null;
  ctaType: string | null;
  pinned: boolean;
  publishAt: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  business: { name: string; slug: string; logoUrl: string | null; phone: string | null };
}

/** One comment under a post. */
export interface FanComment {
  id: string;
  content: string;
  authorName: string;
  authorImage: string | null;
  imageId: string | null;
  createdAt: string;
  /** Written by the salon itself (its owner) — shown with the salon's name. */
  asBusiness: boolean;
  /** The viewer wrote it, or owns the salon. */
  canDelete: boolean;
}

export function postInclude(viewerId: string | null) {
  return Prisma.validator<Prisma.PostInclude>()({
    business: { select: { name: true, slug: true, logoUrl: true, phone: true } },
    images: { select: { id: true }, orderBy: { id: "asc" } },
    _count: { select: { comments: true, likes: true } },
    likes: { where: { userId: viewerId ?? "" }, select: { id: true } },
  });
}

type PostWithInclude = Prisma.PostGetPayload<{ include: ReturnType<typeof postInclude> }>;

export function toFanPost(p: PostWithInclude): FanPost {
  return {
    id: p.id,
    content: p.content,
    videoUrl: p.videoUrl,
    imageIds: p.images.map((i) => i.id),
    tag: p.tag,
    ctaType: p.ctaType,
    pinned: p.pinned,
    publishAt: p.publishAt.toISOString(),
    likeCount: p._count.likes,
    commentCount: p._count.comments,
    liked: p.likes.length > 0,
    business: p.business,
  };
}

/** Live posts (not still scheduled) only. */
export function livePosts(): Prisma.PostWhereInput {
  return { publishAt: { lte: new Date() } };
}

/** A salon's live posts for its public fanpage: pinned first, then newest. */
export async function getFanpagePosts(businessId: string, viewerId: string | null, take = 30) {
  const posts = await prisma.post.findMany({
    where: { businessId, ...livePosts() },
    include: postInclude(viewerId),
    orderBy: [{ pinned: "desc" }, { publishAt: "desc" }],
    take,
  });
  return posts.map(toFanPost);
}

export async function getComments(postId: string, viewerId: string | null): Promise<FanComment[]> {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { business: { select: { ownerId: true, name: true, logoUrl: true } } },
  });
  if (!post) return [];
  const isOwner = !!viewerId && viewerId === post.business.ownerId;
  const comments = await prisma.postComment.findMany({
    where: { postId },
    include: { author: { select: { name: true, image: true } }, images: { select: { id: true } } },
    orderBy: { createdAt: "asc" },
  });
  return comments.map((c) => toFanComment(c, post.business, viewerId, isOwner));
}

export function toFanComment(
  c: Prisma.PostCommentGetPayload<{ include: { author: { select: { name: true; image: true } }; images: { select: { id: true } } } }>,
  business: { name: string; logoUrl: string | null },
  viewerId: string | null,
  viewerIsOwner: boolean
): FanComment {
  return {
    id: c.id,
    content: c.content,
    authorName: c.asBusiness ? business.name : c.author.name,
    authorImage: c.asBusiness ? business.logoUrl : c.author.image,
    imageId: c.images[0]?.id ?? null,
    createdAt: c.createdAt.toISOString(),
    asBusiness: c.asBusiness,
    canDelete: viewerIsOwner || (!!viewerId && viewerId === c.authorId),
  };
}
