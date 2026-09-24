import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ businessSlug: z.string().min(1) });

/** Finds or creates the (business, customer) conversation for the signed-in
 * user — one thread per pair, so "open chat" always lands on the same
 * history instead of spawning duplicates. */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const business = await prisma.business.findUnique({
    where: { slug: parsed.data.businessSlug },
    select: { id: true },
  });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const conversation = await prisma.conversation.upsert({
    where: { businessId_customerId: { businessId: business.id, customerId: session.user.id } },
    update: {},
    create: { businessId: business.id, customerId: session.user.id },
  });

  return NextResponse.json({ conversationId: conversation.id });
}
