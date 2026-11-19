/** Link previews of the three Academy tabs (owner, 2026-11-19): a shared
 * /academy?tab=pro|owner|customer link shows its own banner, title and text on
 * Facebook, Messenger, Zalo, WhatsApp and X. Banners are drawn by
 * scripts/og/build-academy-og.mjs into public/og/academy-<tab>-<lang>.jpg. */
import type { Audience } from "@/lib/academy/types";

type TabCopy = Record<Audience, { title: string; description: string }>;

const vi: TabCopy = {
  pro: {
    title: "Học nail & mi chuẩn châu Âu — miễn phí | Học viện VaraaAi",
    description:
      "Hơn 40 video tiếng Việt: thầy giảng lý thuyết và hướng dẫn thực hành từng bước — sơn gel, builder gel, đắp bột, nối mi, vệ sinh an toàn. Miễn phí, học ngay trên điện thoại.",
  },
  owner: {
    title: "Chủ salon: quản lý tiệm nhẹ nhàng hơn với VaraaAi — video từng bước",
    description:
      "Video có người hướng dẫn: nhận lịch hẹn online, thẻ khách quen, poster QR, báo cáo doanh thu và đào tạo nhân viên miễn phí ngay trên điện thoại.",
  },
  customer: {
    title: "Đặt lịch làm đẹp chỉ trong 1 phút — video hướng dẫn VaraaAi",
    description: "Video ngắn có người hướng dẫn: tìm salon, đặt lịch online, thẻ tích điểm và thẻ quà tặng. Miễn phí, không cần đăng nhập.",
  },
};

const en: TabCopy = {
  pro: {
    title: "Nails & lashes, the European way — free | VaraaAi Academy",
    description:
      "40+ narrated videos (Vietnamese): a mentor explains the theory and shows each step — gel polish, builder gel, acrylic, lash extensions, hygiene and safety. Free, on your phone.",
  },
  owner: {
    title: "Salon owners: run your salon the easy way with VaraaAi",
    description: "Narrated step-by-step videos: online booking, loyalty cards, QR posters, income reports and free staff training — all on your phone.",
  },
  customer: {
    title: "Book your beauty visit in one minute — VaraaAi video guides",
    description: "Short narrated videos: find a salon, book online, loyalty cards and gift cards. Free, no sign-in needed.",
  },
};

const fi: TabCopy = {
  pro: {
    title: "Kynnet ja ripset eurooppalaisittain — ilmaiseksi | VaraaAi-akatemia",
    description:
      "Yli 40 opetusvideota (vietnamiksi): mentori selittää teorian ja näyttää jokaisen työvaiheen — geelilakkaus, rakennegeeli, akryyli, ripsienpidennykset, hygienia. Ilmainen, puhelimella.",
  },
  owner: {
    title: "Salongin omistajat: pyöritä salonkia helpommin VaraaAilla",
    description: "Opastetut videot vaihe vaiheelta: verkkoajanvaraus, kanta-asiakaskortit, QR-julisteet, tuloraportit ja ilmainen henkilöstön koulutus.",
  },
  customer: {
    title: "Varaa kauneusaika minuutissa — VaraaAin video-ohjeet",
    description: "Lyhyet opastetut videot: löydä salonki, varaa verkossa, kanta-asiakaskortit ja lahjakortit. Ilmainen, ei kirjautumista.",
  },
};

export const isAudience = (v: unknown): v is Audience => v === "pro" || v === "owner" || v === "customer";

export function academyTabOg(tab: Audience, locale: string) {
  const lang = locale === "vi" || locale === "fi" ? locale : "en";
  const copy = (lang === "vi" ? vi : lang === "fi" ? fi : en)[tab];
  return { ...copy, image: { url: `/og/academy-${tab}-${lang}.jpg`, width: 1200, height: 630, alt: copy.title } };
}
