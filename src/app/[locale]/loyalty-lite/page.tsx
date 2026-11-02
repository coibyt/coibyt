import type { Metadata } from "next";
import { BellRing, Camera, Check, ChevronDown, Gift, Mail, QrCode, ShieldCheck, Smartphone, Sparkles, Stamp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteSerif } from "@/lib/site-fonts";
import { currentLiteSalon, DEFAULT_REWARD, liteLocale } from "@/lib/loyalty-lite";
import { liteStrings } from "@/lib/loyalty-lite-strings";
import { ogImage } from "@/lib/og-image";
import { LiteMemberCard } from "@/components/loyalty-lite/member-card";
import { LiteSignupForm } from "@/components/loyalty-lite/signup-form";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = liteStrings(locale);
  return { title: t.metaTitle, description: t.metaDescription, openGraph: { title: t.metaTitle, description: t.metaDescription, images: [ogImage(locale)] } };
}

/** Loyalty Lite: try VaraaAi's loyalty cards with only a salon name and an
 * email (src/lib/loyalty-lite.ts). */
export default async function LoyaltyLitePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ link?: string }> }) {
  const { locale } = await params;
  const { link } = await searchParams;
  const t = liteStrings(locale);
  const signedIn = await currentLiteSalon();
  const labels = { member: t.cardMember, code: t.cardCode, reward: t.cardReward, progress: t.cardProgress.replace("{n}", "7").replace("{total}", "10") };
  const featIcons = [Smartphone, BellRing, QrCode, ShieldCheck];
  const howIcons = [Gift, Mail, Stamp];

  return (
    <div className={`${siteSerif.variable} bg-[#faf8fd]`}>
      {/* Hero + sign-up */}
      <section className="relative overflow-hidden bg-[#1f182d] text-white">
        <div className="pointer-events-none absolute -left-24 -top-32 h-96 w-96 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#c9a96e]/20 blur-3xl" />
        <div className="container relative grid gap-10 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#e8d3a6]/30 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-[#e8d3a6]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              {t.heroTitle[0]}
              <span className="block bg-gradient-to-r from-[#f6e7c3] to-[#d9b25c] bg-clip-text italic text-transparent">{t.heroTitle[1]}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">{t.heroSub}</p>
            <ul className="mt-6 space-y-2.5">
              {t.heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-white/85">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a96e]/25 text-[#e8d3a6]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 hidden max-w-sm rotate-[-3deg] lg:block">
              <LiteMemberCard salonName="Moja Beauty" customerName="Sara Pentti" token="K7Q2M9XPRA" stamps={7} required={10} reward={DEFAULT_REWARD[liteLocale(locale)]} labels={labels} compact />
            </div>
          </div>

          <div id="start" className="scroll-mt-24 rounded-[2rem] bg-white p-6 text-ink-900 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:p-8">
            {signedIn ? (
              <div className="py-4 text-center">
                <p className="text-sm text-ink-500">{t.signedInAs}</p>
                <p className="mt-1 font-serif text-3xl">{signedIn.salonName}</p>
                <Link href="/loyalty-lite/studio" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#1f182d] px-6 text-sm font-bold text-white">
                  <Stamp className="h-4 w-4 text-[#e8d3a6]" />
                  {t.openStudio}
                </Link>
              </div>
            ) : (
              <>
                <p className="font-serif text-2xl">{t.formTitle}</p>
                <p className="mb-5 mt-1 text-sm text-ink-400">{t.formSub}</p>
                <LiteSignupForm locale={locale} t={t} expired={link === "expired"} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="container py-16">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#b08a3e]">{t.howEyebrow}</p>
        <h2 className="mt-2 text-center font-serif text-3xl text-ink-900 sm:text-4xl">{t.howTitle}</h2>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {t.how.map(([title, body], i) => {
            const Icon = howIcons[i];
            return (
              <li key={title} className="relative rounded-[1.75rem] border border-ink-100 bg-white p-6">
                <span className="absolute right-5 top-4 font-serif text-5xl italic leading-none text-[#efe4cc]">{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 font-bold text-ink-900">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#b08a3e]">{t.featEyebrow}</p>
          <h2 className="mx-auto mt-2 max-w-2xl text-center font-serif text-3xl text-ink-900 sm:text-4xl">{t.featTitle}</h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
            {t.feats.map(([title, body], i) => {
              const Icon = featIcons[i];
              return (
                <div key={title} className="flex gap-4 rounded-[1.5rem] bg-[#faf8fd] p-5 ring-1 ring-ink-100">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f6efe1] text-[#8a6a2c]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free vs full */}
      <section className="container py-16">
        <h2 className="text-center font-serif text-3xl text-ink-900 sm:text-4xl">{t.compareTitle}</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-[2rem] border border-ink-100 bg-white p-7">
            <p className="text-sm font-bold text-ink-500">{t.freeName}</p>
            <p className="mt-1 font-serif text-4xl text-ink-900">{t.freePrice}</p>
            <ul className="mt-5 space-y-2.5">
              {t.freeItems.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {x}
                </li>
              ))}
            </ul>
            <a href="#start" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#1f182d] px-5 text-sm font-bold text-white">
              {t.submit}
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1f182d] to-[#40325c] p-7 text-white">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a96e]/25 blur-3xl" />
            <p className="relative text-sm font-bold text-[#e8d3a6]">{t.fullName}</p>
            <p className="relative mt-1 font-serif text-4xl">{t.fullPrice}</p>
            <ul className="relative mt-5 space-y-2.5">
              {t.fullItems.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-white/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#e8d3a6]" />
                  {x}
                </li>
              ))}
            </ul>
            <Link href="/business" className="relative mt-6 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-5 text-sm font-bold text-white">
              {t.fullCta}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16">
        <div className="container max-w-3xl">
          <h2 className="text-center font-serif text-3xl text-ink-900">{t.faqTitle}</h2>
          <div className="mt-8 space-y-3">
            {t.faq.map(([q, a]) => (
              <details key={q} className="group rounded-3xl border border-ink-100 bg-[#faf8fd] p-5 open:border-[#ecd9ad] open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-900">
                  {q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-ink-300 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-[2rem] bg-[#1f182d] p-8 text-center text-white">
            <Camera className="h-8 w-8 text-[#e8d3a6]" />
            <p className="font-serif text-2xl">{t.formTitle}</p>
            <a href="#start" className="inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-6 text-sm font-bold">
              {t.submit}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
