import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentSupportVisitor, findSupportThread, supportMessageDto } from "@/lib/support";
import { notifyAdminsOfSupportMessage } from "@/lib/support-notify";

const HANDOFF: Record<string, string> = {
  vi: "Mình đã chuyển cuộc trò chuyện cho đội ngũ VaraaAi. Một nhân viên sẽ trả lời bạn ngay tại đây sớm nhất có thể, và bạn cũng sẽ nhận được email khi có câu trả lời.",
  en: "I've passed this conversation to the VaraaAi team. A person will reply right here as soon as possible, and you'll also get an email when they do.",
  fi: "Siirsin keskustelun VaraaAi-tiimille. Henkilö vastaa sinulle tässä mahdollisimman pian, ja saat myös sähköpostin, kun vastaus tulee.",
};

/** The visitor taps "Talk to a person": the AI goes quiet in this thread and
 * the admins are emailed right away. */
export async function POST(req: Request) {
  const visitor = await currentSupportVisitor();
  if (!visitor) return NextResponse.json({ error: "NO_THREAD" }, { status: 403 });
  const thread = await findSupportThread(visitor, { create: true });
  if (!thread) return NextResponse.json({ error: "NO_THREAD" }, { status: 403 });

  const lastUserMessage = await prisma.supportMessage.findFirst({
    where: { threadId: thread.id, fromAdmin: false },
    orderBy: { createdAt: "desc" },
    select: { id: true, content: true },
  });

  const [, message] = await prisma.$transaction([
    prisma.supportThread.update({ where: { id: thread.id }, data: { aiPaused: true, updatedAt: new Date() } }),
    prisma.supportMessage.create({
      data: { threadId: thread.id, fromAdmin: true, fromAi: true, content: HANDOFF[thread.locale] ?? HANDOFF.en },
    }),
    // The question the AI couldn't settle goes back into the admin inbox.
    ...(lastUserMessage
      ? [prisma.supportMessage.update({ where: { id: lastUserMessage.id }, data: { readAt: null } })]
      : []),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  await notifyAdminsOfSupportMessage(thread.id, lastUserMessage?.content ?? "(chưa có câu hỏi)", siteUrl, {
    wantsHuman: true,
  }).catch((err) => console.error("[support human email]", err));

  return NextResponse.json({ message: supportMessageDto(message) });
}
