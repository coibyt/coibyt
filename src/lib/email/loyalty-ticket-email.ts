import { C, buttonRow, emailLayout, esc, headingFont, notice, para } from "@/lib/email/ui";
import { givenName } from "@/lib/given-name";
import { REFERRAL_TICKETS } from "@/lib/loyalty-referral-constants";

/** The email a customer gets each time tickets land on their loyalty card:
 * after the salon scans it at a visit, or when a friend they invited has had
 * their first visit. Shows where the card stands now — tickets collected,
 * how many are left, or that the reward is ready. Written in the salon's own
 * customer language. */

const T = {
  vi: {
    subjectScan: (b: string, p: number, n: number) => `+1 vé tại ${b} — bạn đang có ${p}/${n} vé`,
    subjectReferral: (f: string, t: number) => `${f} đã ghé salon — bạn được tặng +${t} vé!`,
    subjectReady: (b: string) => `Chúc mừng! Bạn đã đủ vé để nhận ưu đãi tại ${b}`,
    eyebrow: "Thẻ tích điểm",
    titleScan: (first: string) => `+1 vé cho ${first}!`,
    titleReferral: (t: number) => `Bạn được tặng +${t} vé!`,
    introScan: (b: string) => `Cảm ơn bạn đã ghé ${b}. Nhân viên vừa quét thẻ của bạn thành công và cộng thêm 1 vé.`,
    introReferral: (f: string, b: string, t: number) =>
      `Cảm ơn bạn đã giới thiệu ${f} đến ${b}. Bạn của bạn vừa hoàn thành dịch vụ, nên thẻ của bạn được cộng thêm ${t} vé.`,
    tickets: "Vé đã tích",
    left: (left: number, pct: number) => `Còn ${left} vé nữa là bạn được giảm ${pct}%.`,
    readyTitle: "Bạn đã đủ vé!",
    ready: (pct: number) => `Lần tới đến salon bạn được giảm ${pct}% — nhân viên sẽ áp dụng khi bạn thanh toán. Sau đó thẻ bắt đầu lại để bạn tiếp tục tích vé.`,
    viewCard: "Xem thẻ của tôi",
    book: "Đặt lịch tiếp theo",
    inviteTitle: (t: number) => `Giới thiệu bạn bè, nhận thêm ${t} vé`,
    inviteBody: (t: number) =>
      `Gửi link mời trên trang thẻ của bạn cho bạn bè. Khi họ đặt lịch qua link và hoàn thành lần hẹn đầu tiên, bạn được tặng ${t} vé.`,
    why: (b: string) => `Bạn nhận email này vì có thẻ tích điểm tại ${b}.`,
    friend: "Bạn của bạn",
  },
  en: {
    subjectScan: (b: string, p: number, n: number) => `+1 ticket at ${b} — you now have ${p}/${n}`,
    subjectReferral: (f: string, t: number) => `${f} visited us — you get +${t} tickets!`,
    subjectReady: (b: string) => `Congratulations! Your reward at ${b} is ready`,
    eyebrow: "Loyalty card",
    titleScan: (first: string) => `+1 ticket for ${first}!`,
    titleReferral: (t: number) => `You got +${t} tickets!`,
    introScan: (b: string) => `Thank you for visiting ${b}. Your card was just scanned and 1 ticket has been added.`,
    introReferral: (f: string, b: string, t: number) =>
      `Thank you for recommending ${b} to ${f}. Your friend has just had their first visit, so ${t} tickets have been added to your card.`,
    tickets: "Tickets collected",
    left: (left: number, pct: number) => `${left} more ${left === 1 ? "ticket" : "tickets"} and you get ${pct}% off.`,
    readyTitle: "Your reward is ready!",
    ready: (pct: number) => `On your next visit you get ${pct}% off — the staff will apply it when you pay. Then your card starts again so you can keep collecting.`,
    viewCard: "View my card",
    book: "Book your next visit",
    inviteTitle: (t: number) => `Invite friends, get ${t} more tickets`,
    inviteBody: (t: number) =>
      `Send the invite link on your card page to friends. When they book through it and have their first visit, you get ${t} tickets.`,
    why: (b: string) => `You're receiving this because you have a loyalty card at ${b}.`,
    friend: "Your friend",
  },
  fi: {
    subjectScan: (b: string, p: number, n: number) => `+1 lippu paikassa ${b} — sinulla on nyt ${p}/${n}`,
    subjectReferral: (f: string, t: number) => `${f} kävi luonamme — saat +${t} lippua!`,
    subjectReady: (b: string) => `Onnittelut! Etusi paikassa ${b} on valmis`,
    eyebrow: "Kanta-asiakaskortti",
    titleScan: (first: string) => `+1 lippu, ${first}!`,
    titleReferral: (t: number) => `Sait +${t} lippua!`,
    introScan: (b: string) => `Kiitos käynnistä paikassa ${b}. Korttisi skannattiin juuri ja siihen lisättiin 1 lippu.`,
    introReferral: (f: string, b: string, t: number) =>
      `Kiitos, että suosittelit paikkaa ${b} ystävällesi ${f}. Ystäväsi kävi juuri ensimmäistä kertaa, joten korttiisi lisättiin ${t} lippua.`,
    tickets: "Kerätyt liput",
    left: (left: number, pct: number) => `Vielä ${left} ${left === 1 ? "lippu" : "lippua"}, niin saat ${pct} % alennuksen.`,
    readyTitle: "Etusi on valmis!",
    ready: (pct: number) => `Seuraavalla käynnillä saat ${pct} % alennuksen — henkilökunta huomioi sen maksaessasi. Sen jälkeen kortti alkaa alusta ja voit jatkaa keräämistä.`,
    viewCard: "Näytä korttini",
    book: "Varaa seuraava aika",
    inviteTitle: (t: number) => `Kutsu ystäviä, saat ${t} lippua lisää`,
    inviteBody: (t: number) =>
      `Lähetä korttisivusi kutsulinkki ystäville. Kun he varaavat sen kautta ja käyvät ensimmäistä kertaa, saat ${t} lippua.`,
    why: (b: string) => `Saat tämän viestin, koska sinulla on kanta-asiakaskortti paikassa ${b}.`,
    friend: "Ystäväsi",
  },
};

function strings(locale: string) {
  return (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
}

/** One slot per ticket (up to 12): gold when collected, dashed when not. */
function ticketRow(points: number, required: number) {
  const shown = Math.min(required, 12);
  const filled = Math.round((Math.min(points, required) / required) * shown);
  const cells = Array.from({ length: shown }, (_, i) => {
    const on = i < filled;
    return `<td style="padding:3px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="26" height="26" align="center" valign="middle" bgcolor="${on ? C.gold : "#ffffff"}" style="width:26px;height:26px;border-radius:50%;${on ? `background:${C.gold};background-image:linear-gradient(135deg,#e8d3a6,#c9a96e 55%,#a8843f);color:${C.night}` : "border:1.5px dashed #cdbfe0;color:#a99bbd"};font-size:11px;font-weight:800;line-height:26px">${on ? "★" : i + 1}</td></tr></table></td>`;
  }).join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:14px auto 0"><tr>${cells}</tr></table>`;
}

export function loyaltyTicketEmail(p: {
  locale: string;
  kind: "scan" | "referral";
  salon: { name: string; logoUrl: string | null; city: string | null };
  customerName: string;
  /** Who was invited, for a referral bonus. */
  friendName?: string | null;
  ticketsAdded: number;
  points: number;
  pointsRequired: number;
  discountPercent: number;
  rewardReady: boolean;
  cardUrl: string;
  bookUrl: string;
}) {
  const t = strings(p.locale);
  const font = headingFont(p.locale);
  const first = givenName(p.customerName) || p.customerName;
  const friend = p.friendName?.trim() || t.friend;
  const salon = p.salon.name;
  const left = Math.max(0, p.pointsRequired - p.points);

  const progress = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 4px;border-collapse:separate"><tr>
    <td align="center" bgcolor="#2a1d3d" style="background:#2a1d3d;background-image:linear-gradient(140deg,#1f182d 0%,#40325c 55%,#6d2a6f 100%);border:1px solid ${C.gold};border-radius:22px;padding:24px 18px 22px">
      <div style="font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:rgba(255,255,255,.6)">${esc(t.tickets)}</div>
      <div style="font-family:${font};font-size:46px;line-height:1.1;font-weight:700;color:#ffffff;margin-top:6px">${p.points}<span style="font-size:24px;color:#e8d3a6"> / ${p.pointsRequired}</span></div>
      ${ticketRow(p.points, p.pointsRequired)}
      <div style="margin-top:14px;font-size:14px;line-height:1.6;color:#e8d3a6;font-weight:600">${
        p.rewardReady ? `♛ ${esc(t.readyTitle)}` : esc(t.left(left, p.discountPercent))
      }</div>
    </td></tr></table>`;

  const body = [
    progress,
    p.rewardReady ? notice(esc(t.readyTitle), esc(t.ready(p.discountPercent)), "success", 20) : "",
    `<div style="height:22px;line-height:22px;font-size:1px">&nbsp;</div>`,
    buttonRow(
      [
        { href: p.cardUrl, label: esc(t.viewCard), variant: "gold" },
        { href: p.bookUrl, label: esc(t.book), variant: "dark" },
      ],
      "center"
    ),
    notice(esc(t.inviteTitle(REFERRAL_TICKETS)), esc(t.inviteBody(REFERRAL_TICKETS)), "gold", 26),
    para(esc(t.why(salon)), { muted: true, small: true, mt: 22 }),
  ].join("");

  const subject = p.rewardReady
    ? t.subjectReady(salon)
    : p.kind === "referral"
      ? t.subjectReferral(friend, p.ticketsAdded)
      : t.subjectScan(salon, p.points, p.pointsRequired);

  return {
    subject,
    html: emailLayout({
      locale: p.locale,
      preheader: p.rewardReady ? t.ready(p.discountPercent) : t.left(left, p.discountPercent),
      brand: { name: salon, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: {
        eyebrow: esc(t.eyebrow),
        title: esc(p.kind === "referral" ? t.titleReferral(p.ticketsAdded) : t.titleScan(first)),
        intro: esc(p.kind === "referral" ? t.introReferral(friend, salon, p.ticketsAdded) : t.introScan(salon)),
        tone: "gold",
        badge: p.kind === "referral" ? "♥" : "★",
      },
      body,
    }),
  };
}
