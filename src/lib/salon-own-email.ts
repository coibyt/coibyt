import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { SITE_URL, button, emailLayout, esc, greeting, notice, para } from "@/lib/email/ui";

/** A salon's own address on its marketing emails (Business.marketingEmail):
 * allowed by the admin, proven by a link we email to it, then the Reply-To
 * of the salon's campaigns. */

const T = {
  vi: {
    subject: "Xác minh email của salon trên VaraaAi",
    eyebrow: "Xác minh email",
    title: "Xác nhận đây là email của salon",
    intro: (salon: string) => `${salon} muốn dùng địa chỉ này cho email chăm sóc khách hàng gửi từ VaraaAi.`,
    body: "Bấm nút bên dưới để xác minh. Sau đó, khi khách trả lời email chăm sóc của salon, thư trả lời sẽ về thẳng hộp thư này.",
    cta: "Xác minh email",
    ignore: "Nếu bạn không yêu cầu việc này, hãy bỏ qua email — sẽ không có gì thay đổi.",
    hi: "Xin chào",
  },
  en: {
    subject: "Verify your salon's email on VaraaAi",
    eyebrow: "Verify email",
    title: "Confirm this is the salon's email",
    intro: (salon: string) => `${salon} wants to use this address on the customer emails it sends from VaraaAi.`,
    body: "Press the button below to verify it. After that, when customers reply to the salon's emails, their replies come straight to this inbox.",
    cta: "Verify email",
    ignore: "If you didn't ask for this, just ignore this email — nothing will change.",
    hi: "Hi",
  },
  fi: {
    subject: "Vahvista salongin sähköposti VaraaAissa",
    eyebrow: "Vahvista sähköposti",
    title: "Vahvista, että tämä on salongin sähköposti",
    intro: (salon: string) => `${salon} haluaa käyttää tätä osoitetta VaraaAista lähettämissään asiakasviesteissä.`,
    body: "Vahvista painamalla alla olevaa painiketta. Sen jälkeen asiakkaiden vastaukset salongin viesteihin tulevat suoraan tähän postilaatikkoon.",
    cta: "Vahvista sähköposti",
    ignore: "Jos et pyytänyt tätä, voit jättää viestin huomiotta — mikään ei muutu.",
    hi: "Hei",
  },
};

export function ownEmailVerifyUrl(token: string) {
  return `${SITE_URL}/api/business/marketing/own-email/verify?t=${token}`;
}

/** Saves the address as not yet verified and emails it the link. */
export async function requestOwnEmail(businessId: string, email: string) {
  const token = randomBytes(24).toString("hex");
  const b = await prisma.business.update({
    where: { id: businessId },
    data: { marketingEmail: email, marketingEmailToken: token, marketingEmailVerifiedAt: null },
    select: { name: true, defaultLocale: true, owner: { select: { name: true } } },
  });
  const locale = b.defaultLocale;
  const t = (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
  await sendMail({
    to: email,
    subject: t.subject,
    html: emailLayout({
      locale,
      preheader: t.intro(b.name),
      brand: { name: b.name },
      hero: { eyebrow: t.eyebrow, title: t.title, intro: esc(t.intro(b.name)), tone: "brand", badge: "@" },
      body: [greeting(t.hi, b.owner.name), para(esc(t.body)), button(ownEmailVerifyUrl(token), esc(t.cta), { variant: "dark" }), notice(null, esc(t.ignore), "info", 24)].join(""),
    }),
  });
}

/** The salon whose link this is, now verified; null for a wrong or used link. */
export async function verifyOwnEmail(token: string) {
  if (!/^[a-f0-9]{48}$/.test(token)) return null;
  const b = await prisma.business.findFirst({ where: { marketingEmailToken: token }, select: { id: true, defaultLocale: true } });
  if (!b) return null;
  await prisma.business.update({ where: { id: b.id }, data: { marketingEmailVerifiedAt: new Date(), marketingEmailToken: null } });
  return b;
}
