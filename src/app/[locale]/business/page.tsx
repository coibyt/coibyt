import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Facebook,
  FileText,
  Gift,
  Globe,
  Handshake,
  Heart,
  Instagram,
  LayoutTemplate,
  Mail,
  MapPin,
  MessageCircle,
  Newspaper,
  QrCode,
  Receipt,
  ScanSearch,
  ShoppingBag,
  Sparkles,
  Star,
  UserCog,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { PlatformAffiliateCookieSetter } from "@/components/platform-affiliate-cookie-setter";
import { OfferCountdown } from "@/components/offer-countdown";
import { OpenSupportButton, SupportLauncher } from "@/components/support-launcher";
import { businessLandingStrings, type BusinessLandingStrings } from "@/lib/business-landing/strings";
import { supportCenterStrings } from "@/lib/support-ai/strings";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const pageUrl = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}/business`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = businessLandingStrings(locale);
  const title = `${t.hero.title} ${t.hero.titleAccent} — VaraaAi`;
  return {
    title,
    description: t.hero.subtitle,
    alternates: { canonical: pageUrl(locale) },
    openGraph: { title, description: t.hero.subtitle, url: pageUrl(locale), siteName: "VaraaAi", type: "website" },
  };
}

// Icons for each feature group's 6 features, in the order of the copy.
const GROUP_ICONS = [
  [CalendarDays, LayoutTemplate, Globe, MapPin, Bot, Newspaper],
  [CalendarDays, BellRing, UserCog, Receipt, Building2, BarChart3],
  [QrCode, Gift, Mail, Star, ShoppingBag, Handshake],
];
const GROUP_ACCENTS = [
  { chip: "bg-primary-100 text-primary-700", icon: "bg-primary-50 text-primary-600", glow: "from-primary-200/60" },
  { chip: "bg-teal-50 text-teal-600", icon: "bg-teal-50 text-teal-500", glow: "from-teal-100/80" },
  { chip: "bg-coral-50 text-coral-600", icon: "bg-coral-50 text-coral-500", glow: "from-peach-200/70" },
];
const TOOL_META = [
  { icon: FileText, href: "/tools/price-list", cls: "from-primary-500 to-primary-700" },
  { icon: QrCode, href: "/tools/qr-poster", cls: "from-coral-400 to-berry-500" },
  { icon: ScanSearch, href: "/salon-check", cls: "from-teal-400 to-teal-600" },
];

/** The pitch to salon owners: what VaraaAi does for them, free tools to try
 * right away, answers to the usual questions, and a support chat (AI first,
 * a person on request) for anything else before they sign up. */
export default async function BusinessLandingPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = businessLandingStrings(locale);
  const center = supportCenterStrings(locale);

  return (
    <div className="overflow-x-clip">
      <Suspense fallback={null}>
        <PlatformAffiliateCookieSetter />
      </Suspense>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-coral-500/25 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(255,217,201,0.12),transparent_45%)]" />
        <div className="container grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-peach-200 ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero.badge}
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
              <br />
              <span className="bg-gradient-to-r from-peach-200 via-coral-400 to-primary-300 bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/business/apply"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                {t.hero.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <OpenSupportButton className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-4 text-base font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-white/15 sm:w-auto">
                <MessageCircle className="h-5 w-5" />
                {t.hero.chatCta}
              </OpenSupportButton>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/70 lg:justify-start">
              {t.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center lg:justify-start">
              <OfferCountdown locale={locale} compact />
            </div>
          </div>

          <HeroVisual t={t} />
        </div>
      </section>

      {/* Audience + stats */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container py-10">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ink-400">{t.audienceLabel}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {t.audience.map((a) => (
              <span key={a} className="rounded-full bg-mist-50 px-4 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100">
                {a}
              </span>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-gradient-to-br from-primary-50 to-peach-50 p-5 text-center">
                <p className="font-serif text-3xl font-bold text-primary-700 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-ink-700 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature groups */}
      <section className="bg-mist-50/60 py-16 sm:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-ink-900 sm:text-4xl">{t.featuresTitle}</h2>
            <p className="mt-3 text-ink-400">{t.featuresSubtitle}</p>
          </div>

          <div className="mt-14 space-y-20 sm:space-y-28">
            {t.groups.map((g, gi) => {
              const accent = GROUP_ACCENTS[gi];
              return (
                <div key={g.title} className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <div className={`min-w-0 ${gi % 2 ? "lg:order-2" : ""}`}>
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${accent.chip}`}>
                      {g.eyebrow}
                    </span>
                    <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-ink-900 sm:text-3xl">{g.title}</h3>
                    <p className="mt-3 text-ink-700">{g.body}</p>
                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {g.features.map((f, fi) => {
                        const Icon = GROUP_ICONS[gi][fi];
                        return (
                          <div key={f.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100/60">
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}>
                              <Icon className="h-5 w-5" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-ink-900">{f.title}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{f.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className={`relative min-w-0 ${gi % 2 ? "lg:order-1" : ""}`}>
                    <div className={`pointer-events-none absolute inset-6 -z-0 rounded-[3rem] bg-gradient-to-br ${accent.glow} to-transparent blur-2xl`} />
                    <div className="relative">
                      {gi === 0 && <WebsiteVisual t={t} />}
                      {gi === 1 && <CalendarVisual t={t} />}
                      {gi === 2 && <LoyaltyVisual t={t} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free tools */}
      <section className="container py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-ink-900 sm:text-4xl">{t.toolsTitle}</h2>
          <p className="mt-3 text-ink-400">{t.toolsSubtitle}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.tools.map((tool, i) => {
            const meta = TOOL_META[i];
            return (
              <Link
                key={tool.title}
                href={meta.href}
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100 transition-shadow hover:shadow-popover"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${meta.cls}`}>
                  <meta.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg font-bold text-ink-900">{tool.title}</p>
                <p className="mt-2 flex-1 text-sm text-ink-400">{tool.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-600">
                  {tool.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Steps */}
      <section className="bg-gradient-to-b from-white to-primary-50/50 py-16 sm:py-24">
        <div className="container">
          <h2 className="text-center font-serif text-3xl font-bold text-ink-900 sm:text-4xl">{t.stepsTitle}</h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-7 hidden h-0.5 bg-gradient-to-r from-primary-200 via-coral-200 to-primary-200 md:block" />
            {t.steps.map((s, i) => (
              <div key={s.title} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 font-serif text-2xl font-bold text-white shadow-[0_10px_24px_-8px_rgba(64,50,92,0.7)]">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-ink-400">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/business/apply"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-8 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02]"
            >
              {t.hero.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Support chat */}
      <section className="container py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500 p-6 text-white sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-peach-200/20 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                {t.chat.eyebrow}
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">{t.chat.title}</h2>
              <p className="mt-3 text-white/80">{t.chat.body}</p>
              <ul className="mt-6 space-y-2">
                {t.chat.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/90">
                      <Check className="h-3.5 w-3.5 text-primary-900" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <OpenSupportButton className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-primary-700 shadow-lg transition-transform hover:scale-[1.02]">
                <MessageCircle className="h-5 w-5" />
                {t.chat.open}
              </OpenSupportButton>
            </div>
            <ChatPreview t={t} aiName={center.aiName} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container pb-16 sm:pb-24">
        <h2 className="text-center font-serif text-3xl font-bold text-ink-900 sm:text-4xl">{t.faqTitle}</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {t.faq.map((f) => (
            <details key={f.q} className="group rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-100 open:ring-primary-200">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/30 blur-3xl" />
        <div className="container flex flex-col items-center gap-5 py-16 text-center sm:py-24">
          <Heart className="h-9 w-9 text-coral-400" />
          <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight sm:text-5xl">{t.final.title}</h2>
          <p className="max-w-lg text-white/75">{t.final.body}</p>
          <OfferCountdown locale={locale} compact />
          <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/business/apply"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              {t.final.cta}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <OpenSupportButton className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white ring-1 ring-white/25 hover:bg-white/10 sm:w-auto">
              <MessageCircle className="h-5 w-5" />
              {t.final.chat}
            </OpenSupportButton>
          </div>
        </div>
      </section>

      <SupportLauncher
        locale={locale}
        center={center}
        suggestions={t.chat.suggestions}
        labels={{
          launcher: t.chat.launcher,
          teaser: t.chat.teaser,
          headerTitle: t.chat.headerTitle,
          aiOnline: t.chat.aiOnline,
          teamReplies: t.chat.teamReplies,
        }}
      />
    </div>
  );
}

/* ---------- illustrations (decorative, built from the page's own copy) ---------- */

function HeroVisual({ t }: { t: BusinessLandingStrings }) {
  const prices = ["45 €", "79 €", "65 €"];
  return (
    <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-[24rem]" aria-hidden>
      <div className="relative rounded-[2.75rem] bg-gradient-to-b from-white/25 to-white/5 p-2.5 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/20">
        <div className="overflow-hidden rounded-[2.25rem] bg-white text-ink-900">
          <div className="relative h-32 bg-gradient-to-br from-primary-400 via-coral-400 to-peach-200">
            <div className="absolute inset-x-0 top-3 mx-auto h-1.5 w-16 rounded-full bg-black/20" />
          </div>
          <div className="relative z-10 -mt-9 px-5 pb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white font-serif text-2xl font-bold text-primary-600 shadow-card ring-4 ring-white">
              L
            </div>
            <p className="mt-3 font-serif text-lg font-bold">{t.mock.salon}</p>
            <p className="flex items-center gap-1 text-xs text-ink-400">
              <MapPin className="h-3 w-3" /> {t.mock.city}
              <span className="ml-2 flex items-center gap-0.5 text-amber-500">
                <Star className="h-3 w-3 fill-current" /> 4.9
              </span>
            </p>
            <div className="mt-4 space-y-2">
              {t.mock.services.map((s, i) => (
                <div key={s} className="flex items-center justify-between rounded-xl bg-mist-50 px-3 py-2.5">
                  <div>
                    <p className="text-xs font-semibold">{s}</p>
                    <p className="text-[10px] text-ink-400">{[45, 90, 60][i]} min</p>
                  </div>
                  <span className="rounded-full bg-primary-500 px-2.5 py-1 text-[10px] font-bold text-white">{prices[i]}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-full bg-ink-900 py-2.5 text-center text-xs font-bold text-white">{t.mock.book}</div>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 top-14 hidden w-60 animate-slide-up items-start gap-2.5 rounded-2xl bg-white p-3 text-ink-900 shadow-popover sm:flex lg:-left-16">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CalendarDays className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold">{t.mock.newBooking}</p>
          <p className="truncate text-[11px] text-ink-400">{t.mock.newBookingBody}</p>
        </div>
      </div>

      <div className="absolute -right-4 top-1/2 hidden w-56 rounded-2xl bg-white p-3 text-ink-900 shadow-popover sm:block lg:-right-12">
        <div className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-xs leading-snug">“{t.mock.review}”</p>
      </div>

      <div className="absolute -bottom-5 left-4 flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-800 px-3.5 py-2.5 text-white shadow-popover sm:-left-8">
        <QrCode className="h-5 w-5 text-peach-200" />
        <div>
          <p className="text-xs font-bold">{t.mock.points}</p>
          <div className="mt-1 flex gap-1">
            {[1, 1, 1, 0, 0].map((on, i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${on ? "bg-peach-200" : "bg-white/25"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteVisual({ t }: { t: BusinessLandingStrings }) {
  return (
    <div className="mx-auto max-w-lg" aria-hidden>
      <div className="overflow-hidden rounded-3xl bg-white shadow-popover ring-1 ring-ink-100">
        <div className="flex items-center gap-2 border-b border-ink-100 bg-mist-50 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-[11px] text-ink-400 ring-1 ring-ink-100">
            varaaai.com/site/lumi-nails
          </span>
        </div>
        <div className="relative h-40 bg-gradient-to-br from-primary-700 via-primary-500 to-coral-400 p-6 text-white">
          <p className="font-serif text-2xl font-bold">{t.mock.salon}</p>
          <p className="text-xs text-white/80">{t.mock.city}</p>
          <span className="mt-4 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary-700">{t.mock.book}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 p-4">
          {t.mock.services.map((s, i) => (
            <div key={s} className="rounded-xl bg-mist-50 p-2.5">
              <div className={`h-12 rounded-lg bg-gradient-to-br ${["from-peach-200 to-coral-400", "from-primary-200 to-primary-500", "from-teal-100 to-teal-400"][i]}`} />
              <p className="mt-2 truncate text-[11px] font-semibold text-ink-900">{s}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {[
          { Icon: Facebook, label: "Facebook" },
          { Icon: Instagram, label: "Instagram" },
          { Icon: MapPin, label: "Google" },
          { Icon: Globe, label: "Website" },
        ].map(({ Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 shadow-card ring-1 ring-ink-100">
            <Icon className="h-3.5 w-3.5 text-primary-500" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function CalendarVisual({ t }: { t: BusinessLandingStrings }) {
  const cols = [
    { name: "Linh", color: "border-primary-500 bg-primary-50", blocks: [{ top: 6, h: 22, s: 0 }, { top: 40, h: 30, s: 1 }] },
    { name: "Mai", color: "border-teal-400 bg-teal-50", blocks: [{ top: 16, h: 28, s: 2 }, { top: 60, h: 18, s: 0 }] },
    { name: "Anna", color: "border-coral-400 bg-coral-50", blocks: [{ top: 2, h: 18, s: 0 }, { top: 30, h: 26, s: 1 }] },
  ];
  return (
    <div className="relative mx-auto max-w-lg" aria-hidden>
      <div className="rounded-3xl bg-white p-5 shadow-popover ring-1 ring-ink-100">
        <div className="flex items-center justify-between">
          <p className="font-bold text-ink-900">{t.mock.today}</p>
          <div className="flex gap-1">
            {["D", "W", "M"].map((v, i) => (
              <span key={v} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${i === 0 ? "bg-ink-900 text-white" : "bg-mist-100 text-ink-400"}`}>
                {v}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[2.25rem_1fr_1fr_1fr] gap-2">
          <div />
          {cols.map((c) => (
            <p key={c.name} className="text-center text-[11px] font-bold text-ink-700">
              {c.name}
            </p>
          ))}
          <div className="relative h-56 text-[10px] text-ink-400">
            {["09", "11", "13", "15", "17"].map((h, i) => (
              <span key={h} className="absolute" style={{ top: `${i * 22}%` }}>
                {h}:00
              </span>
            ))}
          </div>
          {cols.map((c) => (
            <div key={c.name} className="relative h-56 rounded-xl bg-mist-50/70">
              {c.blocks.map((b, i) => (
                <div
                  key={i}
                  className={`absolute inset-x-1 rounded-lg border-l-4 p-1.5 ${c.color}`}
                  style={{ top: `${b.top}%`, height: `${b.h}%` }}
                >
                  <p className="truncate text-[10px] font-semibold text-ink-900">{t.mock.services[b.s]}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 -right-2 flex max-w-[15rem] items-center gap-2.5 rounded-2xl bg-white p-3 shadow-popover ring-1 ring-ink-100 sm:-right-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-500">
          <BellRing className="h-[18px] w-[18px]" />
        </span>
        <p className="text-xs font-semibold text-ink-900">{t.mock.reminder}</p>
      </div>
      <div className="absolute -top-8 right-4 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-popover ring-1 ring-ink-100 sm:-right-4">
        <BarChart3 className="h-[18px] w-[18px] text-primary-500" />
        <div>
          <p className="text-[10px] text-ink-400">{t.mock.revenue}</p>
          <p className="text-sm font-bold text-ink-900">4 280 €</p>
        </div>
      </div>
    </div>
  );
}

function LoyaltyVisual({ t }: { t: BusinessLandingStrings }) {
  return (
    <div className="relative mx-auto max-w-md pb-10" aria-hidden>
      <div className="relative z-10 rotate-[-4deg] rounded-3xl bg-gradient-to-br from-primary-800 via-primary-600 to-primary-400 p-6 text-white shadow-popover">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-peach-200">{t.mock.loyaltyCard}</p>
          <QrCode className="h-6 w-6 text-white/80" />
        </div>
        <p className="mt-6 font-serif text-2xl font-bold">{t.mock.salon}</p>
        <div className="mt-5 flex gap-2">
          {[1, 1, 1, 1, 0].map((on, i) => (
            <span
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${on ? "bg-peach-200 text-primary-800" : "border-2 border-dashed border-white/40"}`}
            >
              {on ? <Check className="h-4 w-4" /> : <Gift className="h-4 w-4 text-white/60" />}
            </span>
          ))}
        </div>
      </div>
      <div className="relative -mt-10 ml-auto w-[85%] rotate-[3deg] rounded-3xl bg-gradient-to-br from-[#2a2036] to-[#1a1326] p-6 text-white shadow-popover ring-1 ring-[#c9a96e]/40">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e8d3a6]">{t.mock.giftCard}</p>
        <p className="mt-6 font-serif text-4xl font-bold text-[#e8d3a6]">50 €</p>
        <p className="mt-1 text-xs text-white/60">{t.mock.salon}</p>
      </div>
      <div className="absolute -left-2 bottom-0 z-20 flex max-w-[15rem] items-start gap-2.5 rounded-2xl bg-white p-3 shadow-popover ring-1 ring-ink-100 sm:-left-8">
        <div className="flex gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <p className="text-[11px] leading-snug text-ink-700">“{t.mock.review}”</p>
      </div>
    </div>
  );
}

function ChatPreview({ t, aiName }: { t: BusinessLandingStrings; aiName: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 text-ink-900 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] sm:p-5" aria-hidden>
      <div className="flex items-center gap-2.5 border-b border-ink-100 pb-3">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-primary-400 text-white">
          <Sparkles className="h-4 w-4" />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
        </span>
        <div>
          <p className="text-sm font-bold">{t.chat.headerTitle}</p>
          <p className="text-[11px] text-emerald-600">{t.chat.aiOnline}</p>
        </div>
      </div>
      <div className="space-y-3 pt-4">
        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-md bg-primary-500 px-3.5 py-2 text-sm text-white">{t.chat.suggestions[0]}</p>
        </div>
        <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-gradient-to-br from-primary-50 to-peach-50 px-3.5 py-2.5 text-sm ring-1 ring-primary-100">
          <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-primary-600">
            <Sparkles className="h-3 w-3" />
            {aiName}
          </p>
          {t.faq[0].a}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {t.chat.suggestions.slice(1, 3).map((s) => (
            <span key={s} className="rounded-full border border-primary-200 bg-primary-50 px-2.5 py-1 text-[11px] font-medium text-primary-700">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
