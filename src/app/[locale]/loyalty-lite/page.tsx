import type { Metadata } from "next";
import { Check, ChevronDown, Sparkles, Stamp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteSerif } from "@/lib/site-fonts";
import { currentLiteSalon } from "@/lib/loyalty-lite";
import { liteStrings } from "@/lib/loyalty-lite-strings";
import { ogImage } from "@/lib/og-image";
import { LiteSignupForm } from "@/components/loyalty-lite/signup-form";
import { LiteSignupPopup } from "@/components/loyalty-lite/signup-popup";
import { LiteVisitTracker } from "@/components/loyalty-lite/visit-tracker";
import { LiteOr, LiteTryNow } from "@/components/loyalty-lite/try-now";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = liteStrings(locale);
  return { title: t.metaTitle, description: t.metaDescription, openGraph: { title: t.metaTitle, description: t.metaDescription, images: [ogImage(locale)] } };
}

/** Loyalty Lite: try VaraaAi's loyalty cards with only a salon name and an
 * email (src/lib/loyalty-lite.ts). One big sign-up box in the loyalty
 * card's pink, and the questions underneath. */
export default async function LoyaltyLitePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ link?: string; login?: string }> }) {
  const { locale } = await params;
  const { link, login } = await searchParams;
  const t = liteStrings(locale);
  const signedIn = await currentLiteSalon();

  return (
    <div className={`${siteSerif.variable} relative overflow-hidden bg-gradient-to-b from-[#fdf2f8] via-[#fbeaf4] to-white`}>
      <LiteVisitTracker />
      {/* Visitors without an account meet the sign-up card first, like a welcome screen. */}
      {!signedIn && <LiteSignupPopup locale={locale} t={t} expired={link === "expired"} initialMode={login ? "login" : "signup"} />}
      {/* The glows run behind the whole page, so there is no seam between sections. */}
      <section className="relative">
        <div className="pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#f6c6e0]/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-[26rem] w-[26rem] rounded-full bg-[#e9b8f0]/45 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#f5d9a8]/40 blur-3xl" />

        <div className="container relative max-w-2xl py-10 text-center sm:py-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a3155f] shadow-sm ring-1 ring-[#f3c4dd]">
            <Sparkles className="h-3.5 w-3.5" />
            {t.eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-[#4a1236] sm:text-5xl">
            {t.heroTitle[0]}
            <span className="block bg-gradient-to-r from-[#d6337f] to-[#8e1d6d] bg-clip-text italic text-transparent">{t.heroTitle[1]}</span>
          </h1>
          <ul className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2">
            {t.heroPoints.map((p) => (
              <li key={p} className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#7a1d55] ring-1 ring-[#f3c4dd]">
                <Check className="h-3.5 w-3.5 text-[#d6337f]" />
                {p}
              </li>
            ))}
          </ul>

          {/* The sign-up box */}
          <div
            id="start"
            className="relative mx-auto mt-8 scroll-mt-24 overflow-hidden rounded-[2.25rem] bg-white text-left shadow-[0_40px_90px_-40px_rgba(163,21,95,0.55)] ring-1 ring-[#f3c4dd]"
          >
            <div className="flex items-center gap-4 bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#8e1d6d] px-6 py-5 text-white sm:px-9">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                <Stamp className="h-6 w-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-2xl leading-tight sm:text-3xl">{t.formTitle}</span>
                <span className="block text-sm text-white/85">{t.formSub}</span>
              </span>
            </div>
            <div className="p-6 sm:p-9">
              {signedIn ? (
                <div className="py-4 text-center">
                  <p className="text-sm text-ink-500">{t.signedInAs}</p>
                  <p className="mt-1 font-serif text-3xl text-[#4a1236]">{signedIn.salonName}</p>
                  <Link
                    href="/loyalty-lite/studio"
                    className="mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e0559b] to-[#a3155f] px-8 text-base font-bold text-white shadow-[0_16px_32px_-14px_rgba(163,21,95,0.9)]"
                  >
                    <Stamp className="h-5 w-5" />
                    {t.openStudio}
                  </Link>
                </div>
              ) : (
                <>
                  {!login && (
                    <>
                      <LiteTryNow locale={locale} t={t} />
                      <LiteOr label={t.tryOr} />
                    </>
                  )}
                  <LiteSignupForm locale={locale} t={t} expired={link === "expired"} initialMode={login ? "login" : "signup"} />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="pb-20">
        <div className="container max-w-2xl">
          <h2 className="text-center font-serif text-3xl text-[#4a1236]">{t.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {t.faq.map(([q, a]) => (
              <details key={q} className="group rounded-3xl bg-white p-5 ring-1 ring-[#f3c4dd] open:shadow-[0_18px_40px_-30px_rgba(163,21,95,0.6)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[#4a1236]">
                  {q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#d6337f] transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
