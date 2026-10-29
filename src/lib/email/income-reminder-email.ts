import { C, button, emailLayout, esc, notice, para, sectionTitle, steps } from "@/lib/email/ui";
import { formatInTimeZone } from "date-fns-tz";
import { formatMoney } from "@/lib/money";
import type { OverdueBooking } from "@/lib/income-reminders";

/** The daily email to a staff member who hasn't reported the income of
 * bookings that ended over 24 hours ago: which ones, and how to report. In
 * the staff member's own language. */

const T = {
  vi: {
    subject: (n: number) => `Nhắc nhở: bạn còn ${n} lịch hẹn chưa báo cáo doanh thu`,
    push: (n: number) => `${n} lịch hẹn đã xong hơn 24 giờ — bấm để báo cáo doanh thu.`,
    eyebrow: "Báo cáo doanh thu",
    title: (n: number) => `Bạn còn ${n} lịch hẹn chưa báo cáo`,
    intro: (name: string, salon: string) =>
      `Chào ${name}, các lịch hẹn dưới đây tại ${salon} đã kết thúc hơn 24 giờ nhưng chưa có báo cáo thu nhập. Hãy báo cáo để chủ salon đối chiếu và duyệt.`,
    listTitle: "Lịch hẹn chưa báo cáo",
    due: "Cần thu",
    report: "Báo cáo ngay",
    howTitle: "Cách báo cáo doanh thu",
    steps: [
      { title: "Mở trang Doanh thu của tôi", body: "Bấm nút “Báo cáo ngay” bên trên, hoặc đăng nhập VaraaAi → Bảng điều khiển → Doanh thu của tôi." },
      { title: "Chọn lịch hẹn chưa báo cáo", body: "Trong mục “Chưa báo cáo”, bấm “Báo cáo” bên cạnh khách hàng. Bạn cũng có thể mở lịch hẹn trên trang Lịch hẹn và bấm “Báo cáo thu nhập”." },
      { title: "Nhập số tiền đã thu", body: "Điền tiền mặt, ngân hàng, thẻ quà tặng (chọn % giảm giá nếu có) và tiền tip của bạn. Tổng thu sẽ tự cộng." },
      { title: "Thêm ảnh và gửi", body: "Chụp ảnh biên lai hoặc máy quẹt thẻ nếu có, rồi bấm “Gửi báo cáo”. Khi chủ salon duyệt, bạn sẽ thấy dấu tích xanh." },
    ],
    why: "Bạn nhận email này mỗi ngày cho đến khi các lịch hẹn trên được báo cáo, vì chủ salon đã bật nhắc nhở báo cáo doanh thu.",
  },
  en: {
    subject: (n: number) => `Reminder: ${n} ${n === 1 ? "booking" : "bookings"} without an income report`,
    push: (n: number) => `${n} ${n === 1 ? "booking" : "bookings"} ended over 24 hours ago — tap to report the income.`,
    eyebrow: "Income report",
    title: (n: number) => `${n} ${n === 1 ? "booking still needs" : "bookings still need"} a report`,
    intro: (name: string, salon: string) =>
      `Hi ${name}, the bookings below at ${salon} ended over 24 hours ago but have no income report yet. Please report them so the owner can check and approve.`,
    listTitle: "Bookings to report",
    due: "Due",
    report: "Report now",
    howTitle: "How to report income",
    steps: [
      { title: "Open My income", body: "Tap “Report now” above, or sign in to VaraaAi → Dashboard → My income." },
      { title: "Pick a booking to report", body: "Under “Not reported”, tap “Report” next to the customer. You can also open the booking on the Bookings page and tap “Report income”." },
      { title: "Enter what you collected", body: "Fill in cash, bank, gift cards (with their discount, if any) and your tip. The total adds itself up." },
      { title: "Add photos and send", body: "Add a photo of the receipt or card terminal slip if you have one, then tap “Send report”. Once the owner approves it you'll see a green tick." },
    ],
    why: "You get this email once a day until these bookings are reported, because the salon owner has turned on income report reminders.",
  },
  fi: {
    subject: (n: number) => `Muistutus: ${n} varausta ilman tuloraporttia`,
    push: (n: number) => `${n} varausta päättyi yli 24 tuntia sitten — raportoi tulot napauttamalla.`,
    eyebrow: "Tuloraportti",
    title: (n: number) => `${n} varausta odottaa raporttia`,
    intro: (name: string, salon: string) =>
      `Hei ${name}, alla olevat varaukset paikassa ${salon} päättyivät yli 24 tuntia sitten, mutta niistä ei ole vielä tuloraporttia. Raportoi ne, jotta omistaja voi tarkistaa ja hyväksyä ne.`,
    listTitle: "Raportoimattomat varaukset",
    due: "Perittävä",
    report: "Raportoi nyt",
    howTitle: "Näin raportoit tulot",
    steps: [
      { title: "Avaa Omat tuloni", body: "Napauta yllä ”Raportoi nyt” tai kirjaudu VaraaAi → Hallintapaneeli → Omat tuloni." },
      { title: "Valitse varaus", body: "Kohdassa ”Raportoimatta” napauta ”Raportoi” asiakkaan kohdalla. Voit myös avata varauksen Varaukset-sivulla ja napauttaa ”Raportoi tulot”." },
      { title: "Syötä saamasi summat", body: "Täytä käteinen, pankki, lahjakortit (alennuksineen) ja tippisi. Yhteissumma lasketaan itse." },
      { title: "Lisää kuvat ja lähetä", body: "Lisää kuva kuitista tai maksupäätteen kuitista, jos sinulla on, ja napauta ”Lähetä raportti”. Kun omistaja hyväksyy, näet vihreän merkin." },
    ],
    why: "Saat tämän viestin kerran päivässä, kunnes varaukset on raportoitu, koska salongin omistaja on ottanut tuloraporttimuistutukset käyttöön.",
  },
};

function strings(locale: string) {
  return (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
}

export function incomeReminderEmail(p: {
  locale: string;
  timezone: string;
  salon: { name: string; logoUrl: string | null; city: string | null };
  staffName: string;
  bookings: OverdueBooking[];
  reportUrl: string;
}) {
  const t = strings(p.locale);
  const n = p.bookings.length;
  const shown = p.bookings.slice(0, 15);
  const rows = shown
    .map(
      (b) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid ${C.hair};vertical-align:top">
          <div style="font-size:15px;font-weight:700;color:${C.ink}">${esc(b.customerName || "—")}</div>
          <div style="font-size:13px;color:${C.muted};margin-top:2px">${esc(b.serviceName)} · ${esc(formatInTimeZone(b.startsAt, p.timezone, "dd.MM.yyyy HH:mm"))}</div>
        </td>
        <td align="right" style="padding:12px 0 12px 12px;border-bottom:1px solid ${C.hair};vertical-align:top;white-space:nowrap">
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted}">${esc(t.due)}</div>
          <div style="font-size:15px;font-weight:700;color:${C.ink}">${esc(formatMoney(b.expectedCents, b.currency, p.locale))}</div>
        </td>
      </tr>`
    )
    .join("");

  const body = [
    para(esc(t.intro(p.staffName, p.salon.name))),
    sectionTitle(esc(t.listTitle), 22),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>`,
    n > shown.length ? para(`+ ${n - shown.length}…`, { muted: true, small: true, mt: 8 }) : "",
    button(p.reportUrl, esc(t.report), { variant: "gold" }),
    sectionTitle(esc(t.howTitle), 30),
    steps(t.steps.map((s) => ({ title: esc(s.title), body: esc(s.body) }))),
    notice(null, esc(t.why), "info", 22),
  ].join("");

  return {
    subject: t.subject(n),
    pushBody: t.push(n),
    html: emailLayout({
      locale: p.locale,
      preheader: t.push(n),
      brand: { name: p.salon.name, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: { eyebrow: esc(t.eyebrow), title: esc(t.title(n)), tone: "gold", badge: "!" },
      body,
    }),
  };
}
