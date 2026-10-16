import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  businessSlug: z.string().min(1),
  // Returning guest — reuses their existing identity instead of creating a
  // new one every visit (see useGuestChat, which persists this in
  // localStorage once issued).
  guestId: z.string().optional(),
  // First-time guest — the only thing asked of them before they can chat,
  // so the salon owner has at least a name to go on in their inbox.
  guestName: z.string().min(1).max(100).optional(),
});

/** Finds or creates the (business, customer) conversation — one thread per
 * pair, so "open chat" always lands on the same history instead of
 * spawning duplicates. Works for a signed-in customer OR an anonymous
 * guest: no account/registration required to start chatting. */
export async function POST(req: Request) {
  const session = await auth();
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { businessSlug, guestId, guestName } = parsed.data;

  const business = await prisma.business.findUnique({
    where: { slug: businessSlug },
    select: { id: true, aiChatEnabled: true },
  });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  let customerId: string;
  let newGuestId: string | undefined;

  if (session?.user) {
    customerId = session.user.id;
  } else {
    const existingGuest = guestId
      ? await prisma.user.findUnique({ where: { id: guestId }, select: { id: true, isGuest: true } })
      : null;

    if (existingGuest?.isGuest) {
      customerId = existingGuest.id;
    } else {
      if (!guestName) {
        return NextResponse.json({ error: "GUEST_NAME_REQUIRED" }, { status: 400 });
      }
      const guest = await prisma.user.create({
        data: {
          name: guestName,
          // Synthetic and never actually reachable — never used to send
          // mail, only to satisfy User.email's unique/required constraint.
          email: `guest-${randomBytes(12).toString("hex")}@guest.varaaai.com`,
          isGuest: true,
        },
        select: { id: true },
      });
      customerId = guest.id;
      newGuestId = guest.id;
    }
  }

  const conversation = await prisma.conversation.upsert({
    where: { businessId_customerId: { businessId: business.id, customerId } },
    update: {},
    create: { businessId: business.id, customerId },
  });

  return NextResponse.json({
    conversationId: conversation.id,
    guestId: newGuestId,
    aiChatEnabled: business.aiChatEnabled,
    aiPaused: conversation.aiPaused,
  });
}
