import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireSupportOwner } from "@/lib/support";
import { sendMail } from "@/lib/mailer";
import { button, emailLayout, esc, para, quote } from "@/lib/email/ui";

const postSchema = z.object({ content: z.string().trim().min(1).max(4000) });

function toDto(m: { id: string; fromAdmin: boolean; content: string; createdAt: Date }) {
  return { id: m.id, fromAdmin: m.fromAdmin, content: m.content, createdAt: m.createdAt.toISOString() };
}

/** The salon owner's own support thread with the admin team. `after` is the
 * id of the newest message already on screen (for polling). */
export async function GET(req: Request) {
  const ownerId = await requireSupportOwner();
  if (!ownerId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const thread = await prisma.supportThread.findUnique({ where: { ownerId } });
  if (!thread) return NextResponse.json({ messages: [] });

  const after = new URL(req.url).searchParams.get("after");
  const messages = await prisma.supportMessage.findMany({
    where: { threadId: thread.id, ...(after ? { id: { gt: after } } : {}) },
    orderBy: { createdAt: "asc" },
    ...(after ? {} : { take: 200 }),
  });

  // Opening the thread means the owner has now seen the admin's replies.
  await prisma.supportMessage.updateMany({
    where: { threadId: thread.id, fromAdmin: true, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ messages: messages.map(toDto) });
}

export async function POST(req: Request) {
  const ownerId = await requireSupportOwner();
  if (!ownerId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const thread = await prisma.supportThread.upsert({
    where: { ownerId },
    update: {},
    create: { ownerId },
  });

  // Only the first message the admins haven't opened yet triggers an email —
  // a burst of messages shouldn't produce a burst of emails.
  const alreadyWaiting = await prisma.supportMessage.count({
    where: { threadId: thread.id, fromAdmin: false, readAt: null },
  });

  const message = await prisma.supportMessage.create({
    data: { threadId: thread.id, fromAdmin: false, content: parsed.data.content },
  });
  await prisma.supportThread.update({ where: { id: thread.id }, data: { updatedAt: new Date() } });

  if (alreadyWaiting === 0) {
    try {
      const [owner, admins] = await Promise.all([
        prisma.user.findUnique({ where: { id: ownerId }, select: { name: true, email: true } }),
        prisma.user.findMany({ where: { role: "ADMIN" }, select: { email: true } }),
      ]);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
      const preview = esc(parsed.data.content.slice(0, 300));
      for (const admin of admins) {
        await sendMail({
          to: admin.email,
          subject: `Tin nhắn hỗ trợ mới từ ${owner?.name ?? "chủ salon"}`,
          html: emailLayout({
            locale: "vi",
            preheader: `${owner?.name ?? ""}: ${parsed.data.content.slice(0, 90)}`,
            brand: null,
            hero: { eyebrow: "Hỗ trợ chủ salon", title: "Tin nhắn hỗ trợ mới", tone: "brand", badge: "💬" },
            body: [
              para(`<strong>${esc(owner?.name ?? "")}</strong> (${esc(owner?.email ?? "")}) vừa nhắn cho đội hỗ trợ:`),
              quote(preview),
              button(`${siteUrl}/admin/support`, "Mở hộp thư hỗ trợ"),
            ].join(""),
          }),
        });
      }
    } catch (err) {
      console.error("[support new-message email]", err);
    }
  }

  return NextResponse.json({ message: toDto(message) });
}
