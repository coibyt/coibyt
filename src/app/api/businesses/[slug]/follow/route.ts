import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Whether the signed-in customer follows this business, and how many
 * followers it has in total — public, no auth required for the count. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const business = await prisma.business.findUnique({ where: { slug }, select: { id: true } });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const session = await auth();
  const [followerCount, own] = await Promise.all([
    prisma.businessFollow.count({ where: { businessId: business.id } }),
    session?.user
      ? prisma.businessFollow.findUnique({
          where: { businessId_customerId: { businessId: business.id, customerId: session.user.id } },
        })
      : null,
  ]);

  return NextResponse.json({ followerCount, isFollowing: !!own });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const business = await prisma.business.findUnique({ where: { slug }, select: { id: true } });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.businessFollow.upsert({
    where: { businessId_customerId: { businessId: business.id, customerId: session.user.id } },
    update: {},
    create: { businessId: business.id, customerId: session.user.id },
  });

  const followerCount = await prisma.businessFollow.count({ where: { businessId: business.id } });
  return NextResponse.json({ isFollowing: true, followerCount });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const business = await prisma.business.findUnique({ where: { slug }, select: { id: true } });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.businessFollow
    .delete({
      where: { businessId_customerId: { businessId: business.id, customerId: session.user.id } },
    })
    .catch(() => {
      // Wasn't following — fine, DELETE is idempotent from the caller's POV.
    });

  const followerCount = await prisma.businessFollow.count({ where: { businessId: business.id } });
  return NextResponse.json({ isFollowing: false, followerCount });
}
