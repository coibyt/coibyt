import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  currentSupportVisitor,
  findSupportThread,
  runSupportAi,
  supportAiEnabled,
  supportMessageDto,
} from "@/lib/support";
import { notifyAdminsOfSupportMessage } from "@/lib/support-notify";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const postSchema = z.object({
  content: z.string().trim().min(1).max(4000),
  locale: z.string().max(8).optional(),
});

const HOUR_MS = 60 * 60 * 1000;

/** The visitor's own support thread with the VaraaAi team — a signed-in user
 * (salon owner or customer) or a guest identified by cookie. `after` is the
 * id of the newest message already on screen (for polling). */
export async function GET(req: Request) {
  const visitor = await currentSupportVisitor();
  if (!visitor) return NextResponse.json({ messages: [], aiActive: false, started: false });

  const thread = await findSupportThread(visitor);
  const aiOn = await supportAiEnabled();
  if (!thread) return NextResponse.json({ messages: [], aiActive: aiOn, started: !!visitor.userId });

  const after = new URL(req.url).searchParams.get("after");
  const messages = await prisma.supportMessage.findMany({
    where: { threadId: thread.id, ...(after ? { id: { gt: after } } : {}) },
    orderBy: { createdAt: "asc" },
    ...(after ? {} : { take: 200 }),
  });

  // Opening the thread means the visitor has now seen the team's replies.
  await prisma.supportMessage.updateMany({
    where: { threadId: thread.id, fromAdmin: true, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({
    messages: messages.map(supportMessageDto),
    aiActive: aiOn && !thread.aiPaused,
    started: true,
  });
}

export async function POST(req: Request) {
  const visitor = await currentSupportVisitor();
  if (!visitor) return NextResponse.json({ error: "NO_THREAD" }, { status: 403 });

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const thread = await findSupportThread(visitor, { create: true, locale: parsed.data.locale });
  if (!thread) return NextResponse.json({ error: "NO_THREAD" }, { status: 403 });

  // Only the first message the admins haven't opened yet triggers an email —
  // a burst of messages shouldn't produce a burst of emails.
  const alreadyWaiting = await prisma.supportMessage.count({
    where: { threadId: thread.id, fromAdmin: false, readAt: null },
  });

  const message = await prisma.supportMessage.create({
    data: { threadId: thread.id, fromAdmin: false, content: parsed.data.content },
  });
  await prisma.supportThread.update({
    where: { id: thread.id },
    data: { updatedAt: new Date(), ...(parsed.data.locale ? { locale: parsed.data.locale } : {}) },
  });

  // The AI costs a model call per message, so keep one visitor from running
  // it unbounded; past the limit the message simply waits for a person.
  const ip = await clientIp();
  const aiAllowed = rateLimit(`support-ai:${thread.id}`, 30, HOUR_MS) && rateLimit(`support-ai-ip:${ip}`, 60, HOUR_MS);
  const aiMessage = aiAllowed ? await runSupportAi(thread.id) : null;

  if (!aiMessage && alreadyWaiting === 0) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await notifyAdminsOfSupportMessage(thread.id, parsed.data.content, siteUrl).catch((err) =>
      console.error("[support new-message email]", err)
    );
  }

  return NextResponse.json({
    messages: [message, ...(aiMessage ? [aiMessage] : [])].map(supportMessageDto),
  });
}
