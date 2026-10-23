import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { SearchBarHero } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { FeaturedNearby } from "@/components/featured-nearby";
import { Link } from "@/i18n/navigation";
import { OfferCountdown } from "@/components/offer-countdown";
import { categoryName } from "@/lib/category-names";
import { ArrowRight, CalendarCheck, Check, MessageCircle, ShieldCheck, Sparkles, Store } from "lucide-react";
import { OpenSupportButton, SupportLauncher } from "@/components/support-launcher";
import { businessLandingStrings } from "@/lib/business-landing/strings";
import { homePromoStrings } from "@/lib/business-landing/home-promo";
import { supportCenterStrings } from "@/lib/support-ai/strings";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: alternatesFor("", locale) };
}

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
  const promo = homePromoStrings(locale);
  const chat = businessLandingStrings(locale).chat;

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
          <Link
            href="/business"
            className="group mt-2 inline-flex max-w-full items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-5 text-left shadow-[0_12px_32px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/40 transition-transform hover:scale-[1.02]"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-coral-500 text-white">
              <Store className="h-[18px] w-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-ping rounded-full bg-coral-400" />
            </span>
            <span className="min-w-0 text-sm font-bold text-primary-800 sm:text-base">{promo.pill}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-coral-500 transition-transform group-hover:translate-x-1" />
          </Link>
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

      <section className="container pb-14 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#1a1326] p-6 text-white sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-coral-500/30 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-peach-200 ring-1 ring-white/15">
                <Sparkles className="h-3.5 w-3.5" />
                {promo.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{promo.title}</h2>
              <p className="mt-3 max-w-xl text-white/75">{promo.body}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/business"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02]"
                >
                  {promo.cta}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <OpenSupportButton className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15">
                  <MessageCircle className="h-5 w-5" />
                  {promo.chat}
                </OpenSupportButton>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {promo.points.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/90">
                    <Check className="h-4 w-4 text-primary-900" />
                  </span>
                  <span className="text-sm font-semibold">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

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
            <Link href="/business" className="inline-flex items-center gap-1.5 text-sm font-bold text-white underline-offset-4 hover:underline">
              {promo.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/salon-check" className="text-sm font-medium text-peach-200 underline-offset-4 hover:underline">
              {locale === "vi"
                ? "Hoặc kiểm tra miễn phí salon của bạn trông thế nào trên mạng"
                : "Or get a free check of how your salon looks online"}
            </Link>
          </div>
        </div>
      </section>

      <SupportLauncher
        locale={locale}
        center={supportCenterStrings(locale)}
        suggestions={chat.suggestions}
        labels={{
          launcher: chat.launcher,
          teaser: chat.teaser,
          headerTitle: chat.headerTitle,
          aiOnline: chat.aiOnline,
          teamReplies: chat.teamReplies,
        }}
      />
    </div>
  );
}
