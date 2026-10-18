import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { SearchBarHero } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { FeaturedNearby } from "@/components/featured-nearby";
import { Link } from "@/i18n/navigation";
import { OfferCountdown } from "@/components/offer-countdown";
import { categoryName } from "@/lib/category-names";
import { CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";

const PERKS: Record<"vi" | "en" | "fi", { icon: typeof CalendarCheck; title: string; body: string }[]> = {
  vi: [
    { icon: CalendarCheck, title: "Đặt lịch 24/7", body: "Xem giờ trống thật của salon và giữ chỗ ngay, kể cả lúc salon đã đóng cửa." },
    { icon: MessageCircle, title: "Hỏi salon trực tiếp", body: "Nhắn tin với salon ngay trên trang, không cần gọi điện." },
    { icon: ShieldCheck, title: "Đánh giá từ khách thật", body: "Chỉ khách đã đặt lịch mới được viết đánh giá." },
  ],
  en: [
    { icon: CalendarCheck, title: "Book any time", body: "See the salon's real free times and grab a slot, even after closing hours." },
    { icon: MessageCircle, title: "Ask the salon directly", body: "Message the salon right on its page — no phone call needed." },
    { icon: ShieldCheck, title: "Reviews from real clients", body: "Only people who actually booked can leave a review." },
  ],
  fi: [
    { icon: CalendarCheck, title: "Varaa milloin vain", body: "Näet salongin todelliset vapaat ajat ja varaat heti, myös aukioloaikojen ulkopuolella." },
    { icon: MessageCircle, title: "Kysy salongilta suoraan", body: "Lähetä viesti salongille sen omalla sivulla — ei tarvitse soittaa." },
    { icon: ShieldCheck, title: "Arvostelut oikeilta asiakkailta", body: "Vain varauksen tehneet voivat jättää arvostelun." },
  ],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, categories] = await Promise.all([
    getTranslations("home"),
    prisma.category.findMany({ take: 8 }),
  ]);
  const perks = PERKS[(locale as "vi" | "en" | "fi")] ?? PERKS.en;

  return (
    <div>
      <section className="relative overflow-hidden bg-primary-800">
        <div className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-coral-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary-400/30 blur-3xl" />
        <div className="container relative flex flex-col items-center gap-7 pb-16 pt-14 text-center sm:pb-24 sm:pt-24">
          <h1 className="max-w-3xl whitespace-pre-line text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <div className="w-full max-w-2xl">
            <SearchBarHero />
          </div>
          {categories.length > 0 && (
            <div className="flex max-w-2xl flex-wrap justify-center gap-2">
              {categories.slice(0, 5).map((c) => (
                <Link
                  key={c.id}
                  href={`/search?category=${c.slug}`}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
                >
                  {categoryName(locale, c)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container py-14 sm:py-20">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          {t("categoriesTitle")}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              slug={c.slug}
              name={categoryName(locale, c)}
              icon={c.icon}
            />
          ))}
        </div>
      </section>

      <FeaturedNearby locale={locale} title={t("featuredTitle")} />

      <section className="bg-peach-50">
        <div className="container grid gap-8 py-14 sm:grid-cols-3 sm:py-16">
          {perks.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-sm">
                <p.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-900">
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="container relative flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {t("ctaBusinessTitle")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary-100">{t("ctaBusinessSubtitle")}</p>
            <div className="mt-5">
              <OfferCountdown locale={locale} compact />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <Link href="/business/apply" className="btn-accent !px-7 !py-3.5 text-base">
              {t("ctaBusinessButton")}
            </Link>
            <Link href="/salon-check" className="text-sm font-medium text-peach-200 underline-offset-4 hover:underline">
              {locale === "vi"
                ? "Hoặc kiểm tra miễn phí salon của bạn trông thế nào trên mạng"
                : "Or get a free check of how your salon looks online"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
