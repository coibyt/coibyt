import { SITE_URL, button, emailLayout, esc, greeting, panel, para, rows, type HeroTone } from "@/lib/email/ui";
import { formatMoney } from "@/lib/money";

/** Sent to a customer when the salon moves their product order on:
 * confirmed, completed (ready / handed over) or cancelled. */

type Status = "CONFIRMED" | "COMPLETED" | "CANCELLED";

const T = {
  vi: {
    subject: { CONFIRMED: "{salon} đã xác nhận đơn hàng của bạn", COMPLETED: "Đơn hàng tại {salon} đã hoàn tất", CANCELLED: "Đơn hàng tại {salon} đã bị hủy" },
    title: { CONFIRMED: "Đơn hàng đã được xác nhận", COMPLETED: "Đơn hàng đã hoàn tất — cảm ơn bạn!", CANCELLED: "Đơn hàng đã bị hủy" },
    intro: {
      CONFIRMED: "Salon đã nhận và xác nhận đơn hàng của bạn. Bạn có thể nhận hàng tại salon theo hình thức thanh toán đã chọn.",
      COMPLETED: "Đơn hàng của bạn đã được giao xong. Cảm ơn bạn đã mua sắm tại salon — hẹn gặp lại bạn!",
      CANCELLED: "Đơn hàng của bạn đã được hủy. Nếu có thắc mắc, hãy liên hệ trực tiếp với salon.",
    },
    eyebrow: "Đơn hàng #{id}",
    hi: "Xin chào",
    total: "Tổng cộng",
    payment: "Thanh toán",
    methods: { CASH: "Tiền mặt tại salon", BANK_TRANSFER: "Chuyển khoản", CHAT: "Trao đổi qua tin nhắn" } as Record<string, string>,
    visit: "Xem trang của salon",
  },
  en: {
    subject: { CONFIRMED: "{salon} confirmed your order", COMPLETED: "Your order at {salon} is complete", CANCELLED: "Your order at {salon} was cancelled" },
    title: { CONFIRMED: "Your order is confirmed", COMPLETED: "Order complete — thank you!", CANCELLED: "Your order was cancelled" },
    intro: {
      CONFIRMED: "The salon has received and confirmed your order. You can collect it at the salon using the payment method you chose.",
      COMPLETED: "Your order has been handed over. Thank you for shopping with us — see you again soon!",
      CANCELLED: "Your order has been cancelled. If you have any questions, please contact the salon directly.",
    },
    eyebrow: "Order #{id}",
    hi: "Hi",
    total: "Total",
    payment: "Payment",
    methods: { CASH: "Cash at the salon", BANK_TRANSFER: "Bank transfer", CHAT: "Arranged by message" } as Record<string, string>,
    visit: "Visit the salon's page",
  },
  fi: {
    subject: { CONFIRMED: "{salon} vahvisti tilauksesi", COMPLETED: "Tilauksesi salongissa {salon} on valmis", CANCELLED: "Tilauksesi salongissa {salon} peruttiin" },
    title: { CONFIRMED: "Tilauksesi on vahvistettu", COMPLETED: "Tilaus valmis — kiitos!", CANCELLED: "Tilauksesi peruttiin" },
    intro: {
      CONFIRMED: "Salonki on vastaanottanut ja vahvistanut tilauksesi. Voit noutaa sen salongista valitsemallasi maksutavalla.",
      COMPLETED: "Tilauksesi on luovutettu. Kiitos ostoksistasi — nähdään pian!",
      CANCELLED: "Tilauksesi on peruttu. Jos sinulla on kysyttävää, ota yhteyttä suoraan salonkiin.",
    },
    eyebrow: "Tilaus #{id}",
    hi: "Hei",
    total: "Yhteensä",
    payment: "Maksu",
    methods: { CASH: "Käteinen salongissa", BANK_TRANSFER: "Tilisiirto", CHAT: "Sovitaan viestillä" } as Record<string, string>,
    visit: "Salongin sivu",
  },
};

const TONE: Record<Status, HeroTone> = { CONFIRMED: "brand", COMPLETED: "success", CANCELLED: "alert" };
const BADGE: Record<Status, string> = { CONFIRMED: "✓", COMPLETED: "♥", CANCELLED: "✕" };

export function orderNumber(id: string) {
  return id.slice(-6).toUpperCase();
}

export function orderStatusEmail(p: {
  locale: string;
  status: Status;
  orderId: string;
  customerName: string;
  salon: { name: string; slug: string; logoUrl: string | null; city: string | null };
  items: { name: string; qty: number; totalCents: number }[];
  totalCents: number;
  currency: string;
  paymentMethod: string;
}) {
  const t = (T as Record<string, (typeof T)["en"]>)[p.locale] ?? T.en;
  const fillSalon = (s: string) => s.replace("{salon}", p.salon.name);
  const money = (c: number) => esc(formatMoney(c, p.currency, p.locale));
  const body = [
    greeting(t.hi, p.customerName),
    para(esc(t.intro[p.status])),
    panel(
      rows([
        ...p.items.map((it) => ({ label: `${esc(it.name)} × ${it.qty}`, value: money(it.totalCents) })),
        { label: t.payment, value: esc(t.methods[p.paymentMethod] ?? p.paymentMethod) },
        { label: t.total, value: money(p.totalCents), strong: true },
      ])
    ),
    button(`${SITE_URL}/b/${p.salon.slug}`, esc(t.visit), { variant: "light" }),
  ].join("");
  return {
    subject: fillSalon(t.subject[p.status]),
    html: emailLayout({
      locale: p.locale,
      preheader: t.intro[p.status],
      brand: { name: p.salon.name, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: { eyebrow: esc(t.eyebrow.replace("{id}", orderNumber(p.orderId))), title: esc(t.title[p.status]), tone: TONE[p.status], badge: BADGE[p.status] },
      body,
    }),
  };
}
