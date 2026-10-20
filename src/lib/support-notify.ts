import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { button, emailLayout, esc, greeting, para, quote, SITE_URL } from "@/lib/email/ui";

async function threadPeople(threadId: string) {
  return prisma.supportThread.findUnique({
    where: { id: threadId },
    select: {
      locale: true,
      guestName: true,
      guestEmail: true,
      guestToken: true,
      owner: { select: { name: true, email: true, businesses: { select: { name: true } } } },
    },
  });
}

/** Emails every admin that a support message is waiting for a person — the
 * AI was off, paused, or couldn't answer, or the visitor asked for a person. */
export async function notifyAdminsOfSupportMessage(
  threadId: string,
  content: string,
  siteUrl: string,
  opts: { wantsHuman?: boolean } = {}
) {
  const [thread, admins] = await Promise.all([
    threadPeople(threadId),
    prisma.user.findMany({ where: { role: "ADMIN" }, select: { email: true } }),
  ]);
  if (!thread) return;
  const name = thread.owner?.name ?? thread.guestName ?? "Khách";
  const email = thread.owner?.email ?? thread.guestEmail ?? "";
  const kind = thread.owner ? (thread.owner.businesses.length ? "Chủ salon" : "Khách hàng") : "Khách chưa có tài khoản";
  const salons = thread.owner?.businesses.map((b) => b.name).join(", ");
  const preview = esc(content.slice(0, 300));

  for (const admin of admins) {
    await sendMail({
      to: admin.email,
      subject: opts.wantsHuman ? `${name} muốn gặp nhân viên hỗ trợ` : `Tin nhắn hỗ trợ mới từ ${name}`,
      html: emailLayout({
        locale: "vi",
        preheader: `${name}: ${content.slice(0, 90)}`,
        brand: null,
        hero: {
          eyebrow: kind,
          title: opts.wantsHuman ? "Cần nhân viên trả lời" : "Tin nhắn hỗ trợ mới",
          tone: opts.wantsHuman ? "alert" : "brand",
          badge: "💬",
        },
        body: [
          para(`<strong>${esc(name)}</strong> (${esc(email)})${salons ? ` · ${esc(salons)}` : ""} vừa nhắn cho đội hỗ trợ:`),
          quote(preview),
          button(`${siteUrl}/admin/support`, "Mở hộp thư hỗ trợ"),
        ].join(""),
      }),
    });
  }
}

const REPLY = {
  vi: {
    subject: "Đội ngũ VaraaAi đã trả lời bạn",
    eyebrow: "Hỗ trợ",
    title: "Bạn có câu trả lời mới",
    hi: "Xin chào",
    body: "Đội ngũ hỗ trợ VaraaAi vừa trả lời tin nhắn của bạn:",
    cta: "Xem và trả lời",
  },
  en: {
    subject: "The VaraaAi team replied to you",
    eyebrow: "Support",
    title: "You have a new reply",
    hi: "Hi",
    body: "The VaraaAi support team just answered your message:",
    cta: "View and reply",
  },
  fi: {
    subject: "VaraaAi-tiimi vastasi sinulle",
    eyebrow: "Tuki",
    title: "Sait uuden vastauksen",
    hi: "Hei",
    body: "VaraaAin tukitiimi vastasi juuri viestiisi:",
    cta: "Katso ja vastaa",
  },
};

/** Emails the visitor when a person on the team replies, so a guest who has
 * left the page still gets the answer. Guests get a link that restores their
 * chat on any device. */
export async function notifyVisitorOfReply(threadId: string, content: string) {
  const thread = await threadPeople(threadId);
  if (!thread) return;
  const to = thread.owner?.email ?? thread.guestEmail;
  if (!to) return;
  const locale = thread.locale;
  const t = (REPLY as Record<string, (typeof REPLY)["en"]>)[locale] ?? REPLY.en;
  const prefix = locale === "vi" ? "" : `/${locale}`;
  const url =
    !thread.owner && thread.guestToken
      ? `${SITE_URL}/api/support/guest?t=${encodeURIComponent(thread.guestToken)}&l=${encodeURIComponent(locale)}`
      : `${SITE_URL}${prefix}/support`;

  await sendMail({
    to,
    subject: t.subject,
    html: emailLayout({
      locale,
      preheader: content.slice(0, 110),
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, tone: "brand", badge: "💬" },
      body: [
        greeting(t.hi, thread.owner?.name ?? thread.guestName ?? ""),
        para(t.body),
        quote(esc(content.length > 600 ? `${content.slice(0, 597)}…` : content)),
        button(url, t.cta),
      ].join(""),
    }),
  });
}
