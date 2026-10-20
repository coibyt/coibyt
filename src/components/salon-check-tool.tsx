"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BellRing,
  Bot,
  Check,
  ChevronDown,
  Facebook,
  FileDown,
  Gift,
  Globe,
  Instagram,
  Lightbulb,
  Loader2,
  MapPin,
  Megaphone,
  RotateCcw,
  ScanSearch,
  Search,
  Smartphone,
  Sparkles,
  Tag,
  Target,
  X,
  Youtube,
  CalendarDays,
  Mail,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { googleMapsSearchUrl } from "@/lib/salon-check";
import { salonCheckStrings, type SalonCheckStrings } from "@/lib/salon-check-strings";
import { AddressAutocomplete, type AddressSuggestion } from "@/components/address-autocomplete";
import { OfferCountdown } from "@/components/offer-countdown";

type GoogleStatus = "yes" | "no" | "unsure";
type SocialStatus = "ok" | "unreachable" | "unverified" | "missing" | "unknown";

interface WebsiteResult {
  provided: boolean;
  reachable: boolean;
  https: boolean;
  mobileFriendly: boolean;
  hasOpenGraph: boolean;
  hasBookingLink: boolean;
  hasPricing: boolean;
  hasHours: boolean;
  hasContact: boolean;
  score: number;
}

type GoogleResult =
  | { real: true; found: boolean; rating: number | null; reviewCount: number | null; photoCount: number | null; score: number }
  | { real: false; status: GoogleStatus; score: number };

interface SocialResult {
  url: string | null;
  status: SocialStatus;
  followers: number | null;
  score: number | null;
}

interface SalonCheckResult {
  name: string;
  address: string;
  overallScore: number;
  aiSummary: string | null;
  website: WebsiteResult;
  google: GoogleResult;
  facebook: SocialResult;
  instagram: SocialResult;
  seoKeywords: string[];
}

interface Opportunity {
  id: string;
  severity: "high" | "medium" | "low";
  text: string;
  suggestion: string;
}

function band(score: number, t: SalonCheckStrings) {
  if (score >= 85) return { label: t.bandExcellent, text: "text-emerald-600", chip: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" };
  if (score >= 70) return { label: t.bandGood, text: "text-primary-600", chip: "bg-primary-50 text-primary-700", bar: "bg-primary-500" };
  if (score >= 50) return { label: t.bandNeedsWork, text: "text-coral-600", chip: "bg-coral-50 text-coral-600", bar: "bg-coral-400" };
  return { label: t.bandUrgent, text: "text-berry-600", chip: "bg-berry-50 text-berry-600", bar: "bg-berry-500" };
}

function channelLabel(score: number, t: SalonCheckStrings) {
  if (score >= 80) return t.strongLabel;
  if (score >= 55) return t.okLabel;
  return t.weakLabel;
}

function toHashtag(keyword: string) {
  return `#${keyword
    .normalize("NFC")
    .replace(/[^\p{L}\p{N}]+/gu, "")
    .toLowerCase()}`;
}

/** Counts up from 0 to `target` once, for the score dial. */
function useCountUp(target: number, ms = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

function ScoreDial({ score }: { score: number }) {
  const shown = useCountUp(score);
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-44 w-44 shrink-0">
      <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffbfa3" />
            <stop offset="55%" stopColor="#ec6a47" />
            <stop offset="100%" stopColor="#8b76b9" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="url(#dialGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold tabular-nums text-white">{shown}</span>
        <span className="text-xs font-semibold text-white/60">/ 100</span>
      </div>
    </div>
  );
}

const SEVERITY: Record<Opportunity["severity"], { chip: string; ring: string; num: string }> = {
  high: { chip: "bg-berry-50 text-berry-600", ring: "ring-berry-100", num: "bg-berry-500" },
  medium: { chip: "bg-coral-50 text-coral-600", ring: "ring-coral-100", num: "bg-coral-500" },
  low: { chip: "bg-mist-100 text-ink-700", ring: "ring-ink-100", num: "bg-ink-700" },
};

/** The free salon check: a short form (name, address, type, optional
 * website, Google profile), an animated check, and a full report — score,
 * per-channel details, top opportunities, action plan, keywords, marketing
 * ideas and how VaraaAi solves them. */
export function SalonCheckTool({ locale }: { locale: string }) {
  const t = salonCheckStrings(locale);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressCity, setAddressCity] = useState<string | null>(null);
  const [addressCountryCode, setAddressCountryCode] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [website, setWebsite] = useState("");
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus>("unsure");

  const [phase, setPhase] = useState<"form" | "checking" | "result">("form");
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<SalonCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openChannel, setOpenChannel] = useState<string | null>(null);

  const STEPS = [t.stepWebsite, t.stepGoogle, t.stepSocial, t.stepSeo, t.stepSummarizing];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPhase("checking");
    setStep(0);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const minAnimation = new Promise<void>((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setStep(i);
        if (i >= STEPS.length - 1) clearInterval(interval);
      }, 800);
      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, STEPS.length * 800);
    });

    const fetchPromise = fetch("/api/salon-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        address,
        category: category || undefined,
        website: website || undefined,
        googleStatus,
        locale,
        city: addressCity || undefined,
        countryCode: addressCountryCode || undefined,
      }),
    }).catch(() => null);

    const [, res] = await Promise.all([minAnimation, fetchPromise]);
    if (!res?.ok) {
      setError(t.error);
      setPhase("form");
      return;
    }
    setResult((await res.json()) as SalonCheckResult);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setPhase("form");
    setResult(null);
    setStep(0);
    setOpenChannel(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onAddressSelect(s: AddressSuggestion) {
    setAddress(s.displayName);
    setAddressCity(s.city);
    setAddressCountryCode(s.countryCode);
  }

  /* ---------- result ---------- */
  if (phase === "result" && result) {
    return <Report result={result} t={t} locale={locale} openChannel={openChannel} setOpenChannel={setOpenChannel} reset={reset} />;
  }

  /* ---------- form + checking ---------- */
  const panel = phase === "checking" ? (
          <div className="rounded-[2rem] bg-white p-7 text-ink-900 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)]">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary-200/60 [animation-duration:1.8s]" />
              <span className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-100 to-peach-100" />
              <ScanSearch className="relative h-10 w-10 text-primary-600" />
            </div>
            <p className="mt-5 text-center text-xl font-extrabold">{t.checkingTitle}</p>
            <p className="mt-1 text-center text-sm text-ink-400">{t.checkingSubtitle}</p>
            <div className="mt-6 space-y-3">
              {STEPS.map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-colors ${
                    i < step ? "bg-emerald-50" : i === step ? "bg-primary-50" : "bg-mist-50"
                  }`}
                >
                  {i < step ? (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                  ) : i === step ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                  ) : (
                    <span className="h-6 w-6 rounded-full border-2 border-ink-100" />
                  )}
                  <span className={`font-semibold ${i <= step ? "text-ink-900" : "text-ink-400"}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5 rounded-[2rem] bg-white p-6 text-ink-900 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="text-xl font-extrabold">{t.formTitle}</p>
            </div>

            <div>
              <label className="label">{t.formNameLabel}</label>
              <input required className="input" placeholder={t.formNamePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="label">{t.formAddressLabel}</label>
              <AddressAutocomplete
                value={address}
                onChange={(v) => {
                  setAddress(v);
                  setAddressCity(null);
                  setAddressCountryCode(null);
                }}
                onSelect={onAddressSelect}
                pin={null}
              />
            </div>

            <div>
              <label className="label">{t.formCategoryLabel}</label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {t.categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                      category === c ? "bg-primary-500 text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:ring-primary-300"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <input className="input" placeholder={t.formCategoryPlaceholder} value={category} onChange={(e) => setCategory(e.target.value)} />
              <p className="mt-1 text-xs text-ink-400">{t.formCategoryHint}</p>
            </div>

            <div>
              <label className="label">
                {t.formWebsiteLabel} <span className="font-normal text-ink-400">· {t.optional}</span>
              </label>
              <div className="relative">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input className="input !pl-10" placeholder="salon.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <p className="mt-1 text-xs text-ink-400">{t.formWebsiteHint}</p>
            </div>

            <div>
              <p className="label">{t.formGoogleQuestion}</p>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-mist-50 p-1 ring-1 ring-ink-100">
                {(["yes", "unsure", "no"] as GoogleStatus[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setGoogleStatus(v)}
                    className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition-all ${
                      googleStatus === v ? "bg-white text-primary-700 shadow-card ring-1 ring-primary-200" : "text-ink-700 hover:text-ink-900"
                    }`}
                  >
                    {v === "yes" ? t.formGoogleYes : v === "no" ? t.formGoogleNo : t.formGoogleUnsure}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-sm text-berry-500">{error}</p>}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 py-4 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.01]"
            >
              <ScanSearch className="h-5 w-5" />
              {t.submitButton}
            </button>
            <p className="text-center text-xs text-ink-400">{t.noSignupNote}</p>
          </form>
        );

  return (
    <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary-500/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-coral-500/25 blur-3xl" />
      <div className="container grid items-start gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_440px] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-0">
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:pt-6 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-peach-200 ring-1 ring-white/15">
            <ScanSearch className="h-3.5 w-3.5" />
            {t.badge}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t.title}{" "}
            <span className="bg-gradient-to-r from-peach-200 via-coral-400 to-primary-300 bg-clip-text text-transparent">{t.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0">{t.subtitle}</p>
        </div>

        {/* On phones the form comes right after the heading; on desktop it sits on the right. */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">{panel}</div>

        <div className="lg:col-start-1 lg:row-start-2">
          <div className="mx-auto mt-2 max-w-xl rounded-3xl lg:mt-8 bg-white/[0.06] p-5 text-left ring-1 ring-white/10 lg:mx-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">{t.weCheck}</p>
            <ul className="mt-3 space-y-2.5">
              {[Globe, MapPin, Instagram, Target].map((Icon, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-4 w-4 text-peach-200" />
                  </span>
                  <span className="pt-1">{t.checkItems[i]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-3 lg:mx-0">
            {t.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.06] px-3 py-3 text-center ring-1 ring-white/10">
                <p className="text-2xl font-extrabold">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Report({
  result,
  t,
  locale,
  openChannel,
  setOpenChannel,
  reset,
}: {
  result: SalonCheckResult;
  t: SalonCheckStrings;
  locale: string;
  openChannel: string | null;
  setOpenChannel: (k: string | null) => void;
  reset: () => void;
}) {
  const c = t.checks;
  const b = band(result.overallScore, t);
  const channels = [
    { key: "website", icon: Globe, label: t.channelWebsite, score: result.website.score as number | null },
    { key: "google", icon: MapPin, label: t.channelGoogle, score: result.google.score as number | null },
    { key: "facebook", icon: Facebook, label: t.channelFacebook, score: result.facebook.score },
    { key: "instagram", icon: Instagram, label: t.channelInstagram, score: result.instagram.score },
  ];

  const opportunities: Opportunity[] = [];
  if (!result.website.provided) {
    opportunities.push({ id: "website_missing", severity: "high", text: c.websiteMissing.status, suggestion: c.websiteMissing.suggestion });
  } else if (!result.website.reachable) {
    opportunities.push({ id: "website_unreachable", severity: "high", text: c.websiteUnreachable.status, suggestion: c.websiteUnreachable.suggestion });
  } else {
    const w = result.website;
    if (!w.hasBookingLink) opportunities.push({ id: "booking", severity: "high", text: c.booking.fail, suggestion: c.booking.suggestion });
    if (!w.hasHours) opportunities.push({ id: "hours", severity: "medium", text: c.hours.fail, suggestion: c.hours.suggestion });
    if (!w.hasContact) opportunities.push({ id: "contact", severity: "medium", text: c.contact.fail, suggestion: c.contact.suggestion });
    if (!w.hasPricing) opportunities.push({ id: "pricing", severity: "medium", text: c.pricing.fail, suggestion: c.pricing.suggestion });
    if (!w.mobileFriendly) opportunities.push({ id: "mobile", severity: "medium", text: c.mobile.fail, suggestion: c.mobile.suggestion });
    if (!w.https) opportunities.push({ id: "https", severity: "low", text: c.https.fail, suggestion: c.https.suggestion });
    if (!w.hasOpenGraph) opportunities.push({ id: "og", severity: "low", text: c.og.fail, suggestion: c.og.suggestion });
  }
  if (result.google.real) {
    if (!result.google.found) opportunities.push({ id: "google_not_found", severity: "high", text: t.googleNotFoundReal, suggestion: c.googleSuggestionNo });
  } else if (result.google.status === "no") {
    opportunities.push({ id: "google_no", severity: "high", text: c.googleNo, suggestion: c.googleSuggestionNo });
  } else if (result.google.status === "unsure") {
    opportunities.push({ id: "google_unsure", severity: "medium", text: c.googleUnsure, suggestion: c.googleSuggestionUnsure });
  }
  for (const [key, platform] of [["facebook", "Facebook"], ["instagram", "Instagram"]] as const) {
    const social = result[key];
    if (social.status === "missing") {
      opportunities.push({ id: `${key}_missing`, severity: "medium", text: c.socialMissing(platform), suggestion: c.socialMissingSuggestion(platform) });
    } else if (social.status === "unreachable") {
      opportunities.push({ id: `${key}_unreachable`, severity: "medium", text: c.socialUnreachable(platform), suggestion: c.socialUnreachableSuggestion(platform) });
    }
  }
  const rank = { high: 0, medium: 1, low: 2 };
  opportunities.sort((a, b2) => rank[a.severity] - rank[b2.severity]);
  const top = opportunities.slice(0, 3);

  function details(key: string): { good: string[]; bad: string[] } {
    if (key === "website") {
      const w = result.website;
      if (!w.provided) return { good: [], bad: [c.websiteMissing.status] };
      if (!w.reachable) return { good: [], bad: [c.websiteUnreachable.status] };
      const good: string[] = [];
      const bad: string[] = [];
      (w.https ? good : bad).push(w.https ? c.https.pass : c.https.fail);
      (w.mobileFriendly ? good : bad).push(w.mobileFriendly ? c.mobile.pass : c.mobile.fail);
      (w.hasOpenGraph ? good : bad).push(w.hasOpenGraph ? c.og.pass : c.og.fail);
      (w.hasBookingLink ? good : bad).push(w.hasBookingLink ? c.booking.pass : c.booking.fail);
      (w.hasPricing ? good : bad).push(w.hasPricing ? c.pricing.pass : c.pricing.fail);
      (w.hasHours ? good : bad).push(w.hasHours ? c.hours.pass : c.hours.fail);
      (w.hasContact ? good : bad).push(w.hasContact ? c.contact.pass : c.contact.fail);
      return { good, bad };
    }
    if (key === "google") {
      const g = result.google;
      if (g.real) {
        if (!g.found) return { good: [], bad: [t.googleNotFoundReal] };
        const good = [t.googleFoundReal];
        if (g.rating !== null) good.push(`${t.ratingLabel}: ${g.rating}`);
        if (g.reviewCount !== null) good.push(`${t.reviewCountLabel}: ${g.reviewCount}`);
        if (g.photoCount !== null) good.push(`${t.photoCountLabel}: ${g.photoCount}`);
        return { good, bad: [] };
      }
      if (g.status === "yes") return { good: [c.googleYes], bad: [] };
      if (g.status === "no") return { good: [], bad: [c.googleNo] };
      return { good: [], bad: [c.googleUnsure] };
    }
    const platform = key === "facebook" ? "Facebook" : "Instagram";
    const social = key === "facebook" ? result.facebook : result.instagram;
    if (social.status === "unknown") return { good: [], bad: [t.notCheckedBody(platform)] };
    if (social.status === "ok") return { good: [c.socialOk(platform)], bad: [] };
    if (social.status === "missing") return { good: [], bad: [c.socialMissing(platform)] };
    if (social.status === "unreachable") return { good: [], bad: [c.socialUnreachable(platform)] };
    return { good: [c.socialUnverified(platform)], bad: [] };
  }

  const featureIcons = [CalendarDays, BellRing, Bot, Mail, Gift, Smartphone];

  return (
    <div className="bg-mist-50/60">
      {/* Score */}
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="container flex flex-col items-center gap-8 py-12 text-center sm:py-16 md:flex-row md:text-left">
          <ScoreDial score={result.overallScore} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-peach-200">{t.reportFor}</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{result.name}</h1>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/60 md:justify-start">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{result.address}</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="text-sm text-white/70">{t.scorePrefix}:</span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${b.chip}`}>{b.label}</span>
            </div>
            {result.aiSummary && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{result.aiSummary}</p>}
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
              >
                <FileDown className="h-4 w-4" />
                {t.printButton}
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/15"
              >
                <RotateCcw className="h-4 w-4" />
                {t.checkAnotherButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container space-y-14 py-12">
        {/* Channels */}
        <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((ch) => {
            const d = details(ch.key);
            const open = openChannel === ch.key;
            const known = ch.score !== null;
            const cb = known ? band(ch.score!, t) : null;
            return (
              <div key={ch.key} className="flex flex-col rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <ch.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-ink-900">{ch.label}</span>
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${cb ? cb.chip : "bg-mist-100 text-ink-400"}`}>
                    {known ? channelLabel(ch.score!, t) : t.notChecked}
                  </span>
                </div>
                <p className="mt-4 text-4xl font-extrabold tabular-nums text-ink-900">
                  {known ? ch.score : "—"}
                  {known && <span className="text-base font-semibold text-ink-400"> /100</span>}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist-100">
                  <div className={`h-full rounded-full ${cb ? cb.bar : "bg-ink-100"}`} style={{ width: `${known ? ch.score : 0}%` }} />
                </div>
                <button
                  type="button"
                  onClick={() => setOpenChannel(open ? null : ch.key)}
                  className="mt-4 flex items-center gap-1 self-start text-xs font-bold text-primary-600 print:hidden"
                >
                  {open ? t.hideDetails : t.viewDetails}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div className="mt-3 space-y-2.5 border-t border-ink-100 pt-3 text-xs">
                    {d.good.length > 0 && (
                      <div className="space-y-1">
                        <p className="font-bold text-emerald-600">{t.goodThings}</p>
                        {d.good.map((line, i) => (
                          <p key={i} className="flex items-start gap-1.5 text-ink-700">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" /> {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {d.bad.length > 0 && (
                      <div className="space-y-1">
                        <p className="font-bold text-berry-600">{t.needsWork}</p>
                        {d.bad.map((line, i) => (
                          <p key={i} className="flex items-start gap-1.5 text-ink-700">
                            <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-berry-500" /> {line}
                          </p>
                        ))}
                      </div>
                    )}
                    {ch.key === "google" && (
                      <>
                        {!result.google.real && <p className="text-ink-400">{t.disclaimerGoogle}</p>}
                        <a
                          href={googleMapsSearchUrl(result.name, result.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-primary-600 hover:underline"
                        >
                          {t.viewOnGoogleMaps} <ArrowRight className="h-3 w-3" />
                        </a>
                      </>
                    )}
                    {(ch.key === "facebook" || ch.key === "instagram") && known && <p className="text-ink-400">{t.disclaimerSocial}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Opportunities */}
        {top.length > 0 ? (
          <div>
            <SectionTitle icon={Lightbulb} title={t.opportunitiesTitle} subtitle={t.opportunitiesSubtitle} />
            <div className="grid gap-4 lg:grid-cols-3">
              {top.map((op, i) => {
                const sv = SEVERITY[op.severity];
                return (
                  <div key={op.id} className={`flex flex-col rounded-3xl bg-white p-6 shadow-card ring-1 ${sv.ring}`}>
                    <div className="flex items-center justify-between">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold text-white ${sv.num}`}>{i + 1}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${sv.chip}`}>
                        {op.severity === "high" ? t.impactHigh : op.severity === "medium" ? t.impactMedium : t.impactLow}
                      </span>
                    </div>
                    <p className="mt-4 font-bold leading-snug text-ink-900">{op.text}</p>
                    <div className="mt-4 rounded-2xl bg-mist-50 p-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">{t.whatToDo}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-700">{op.suggestion}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
            <Sparkles className="h-7 w-7 shrink-0 text-emerald-600" />
            <div>
              <p className="font-bold text-ink-900">{t.allGoodTitle}</p>
              <p className="text-sm text-ink-700">{t.allGoodBody}</p>
            </div>
          </div>
        )}

        {/* Action plan */}
        {opportunities.length > top.length && (
          <div>
            <SectionTitle icon={Check} title={t.actionPlanTitle} subtitle={t.actionPlanSubtitle} />
            <ol className="divide-y divide-ink-100 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100">
              {opportunities.map((op, i) => (
                <li key={op.id} className="flex items-start gap-3 px-5 py-4 text-sm text-ink-700">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-[11px] font-bold text-primary-700">
                    {i + 1}
                  </span>
                  <span className="flex-1">{op.suggestion}</span>
                  <span className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:inline ${SEVERITY[op.severity].chip}`}>
                    {op.severity === "high" ? t.impactHigh : op.severity === "medium" ? t.impactMedium : t.impactLow}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Keywords + marketing */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
            <SectionTitle icon={Search} title={t.seoTitle} subtitle={t.seoSubtitle} small />
            {result.seoKeywords.length === 0 ? (
              <p className="text-sm text-ink-400">{t.seoEmpty}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {result.seoKeywords.map((kw) => (
                  <span key={kw} className="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-100">
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
            <SectionTitle icon={Megaphone} title={t.marketingTitle} subtitle={t.marketingSubtitle} small />
            <div className="grid gap-3 sm:grid-cols-2">
              <Idea icon={Facebook} title={t.fbFanpageTitle} body={t.fbFanpageBody} tags={result.seoKeywords} />
              <Idea icon={Youtube} title={t.youtubeTitle} body={t.youtubeBody} tags={result.seoKeywords.slice(0, 4).map(toHashtag)} />
              <div className="sm:col-span-2">
                <Idea icon={Tag} title={t.hookServiceTitle} body={t.hookServiceBody} tags={[]} />
              </div>
            </div>
          </div>
        </div>

        {/* VaraaAi */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[#1a1326] p-6 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-coral-500/25 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-peach-200 ring-1 ring-white/15">
              <Sparkles className="h-3.5 w-3.5" /> VaraaAi
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">{t.varaaTitle}</h2>
            <p className="mt-2 max-w-2xl text-white/75">{t.varaaSubtitle}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.varaaFeatures.map((f, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={f.title} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-5 w-5 text-peach-200" />
                    </span>
                    <p className="mt-3 font-bold">{f.title}</p>
                    <p className="mt-1 text-sm text-white/70">{f.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-white/[0.06] p-6 text-center ring-1 ring-white/10 sm:p-8">
              <p className="text-2xl font-extrabold sm:text-3xl">{t.ctaTitle}</p>
              <p className="max-w-xl text-white/75">{t.ctaSubtitle}</p>
              <OfferCountdown locale={locale} compact />
              <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row print:hidden">
                <Link
                  href="/business/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02]"
                >
                  {t.ctaButton}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/business"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-white ring-1 ring-white/25 hover:bg-white/10"
                >
                  {t.ctaLearn}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center print:hidden">
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-400 hover:text-ink-900">
            <RotateCcw className="h-4 w-4" />
            {t.checkAnotherButton}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  small = false,
}: {
  icon: typeof Search;
  title: string;
  subtitle: string;
  small?: boolean;
}) {
  return (
    <div className="mb-5">
      <h2 className={`flex items-center gap-2 font-extrabold tracking-tight text-ink-900 ${small ? "text-lg" : "text-2xl sm:text-3xl"}`}>
        <Icon className={`${small ? "h-5 w-5" : "h-6 w-6"} text-primary-500`} />
        {title}
      </h2>
      <p className="mt-1 text-sm text-ink-400">{subtitle}</p>
    </div>
  );
}

function Idea({ icon: Icon, title, body, tags }: { icon: typeof Search; title: string; body: string; tags: string[] }) {
  return (
    <div className="h-full rounded-2xl bg-mist-50 p-4">
      <p className="flex items-center gap-2 font-bold text-ink-900">
        <Icon className="h-4 w-4 text-primary-500" />
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{body}</p>
      {tags.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((x) => (
            <span key={x} className="rounded-full bg-white px-2.5 py-1 text-xs text-ink-700 ring-1 ring-ink-100">
              {x}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
