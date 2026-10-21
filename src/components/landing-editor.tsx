"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import {
  BookOpen,
  Check,
  ChevronDown,
  Images,
  LayoutTemplate,
  Lightbulb,
  Loader2,
  MessageSquareQuote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { LandingSectionCard, type LandingLayout, type LandingSectionValue } from "@/components/landing-section-card";
import { LandingHighlightsManager, type HighlightRow } from "@/components/landing-highlights-manager";
import { HeroSlidesManager, ImageSlotsManager } from "@/components/hero-slides-manager";
import { landingEditorStrings } from "@/lib/landing-editor-strings";
import { SITE_THEME_KEYS, themeColor, type SiteThemeKey } from "@/lib/site-theme";

export interface LandingData {
  id: string;
  theme: SiteThemeKey;
  heroLayout: LandingLayout;
  heroEyebrow: string | null;
  heroTitle: string | null;
  heroText: string | null;
  heroButtonLabel: string | null;
  heroButtonTarget: LandingSectionValue["buttonTarget"];
  heroButtonUrl: string | null;
  introEnabled: boolean;
  introLayout: LandingLayout;
  introTitle: string | null;
  introText: string | null;
  introButtonLabel: string | null;
  introButtonTarget: LandingSectionValue["buttonTarget"];
  introButtonUrl: string | null;
  highlightsEnabled: boolean;
  highlightsTitle: string | null;
  servicesEnabled: boolean;
  servicesTitle: string | null;
  teamEnabled: boolean;
  reviewsEnabled: boolean;
  galleryEnabled: boolean;
  galleryTitle: string | null;
  heroImageUrl: string | null;
  heroSlideUrls: (string | null)[];
  introImageUrl: string | null;
  galleryUrls: (string | null)[];
  highlights: HighlightRow[];
  counts: { services: number; staff: number; reviews: number };
}

type Toggle = "introEnabled" | "highlightsEnabled" | "servicesEnabled" | "teamEnabled" | "reviewsEnabled" | "galleryEnabled";

async function putLanding(body: Record<string, unknown>) {
  return fetch("/api/business/landing", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function LandingEditor({ landing }: { landing: LandingData }) {
  const L = landingEditorStrings(useLocale());
  const router = useRouter();

  const [theme, setTheme] = useState<SiteThemeKey>(landing.theme);
  const [savingTheme, setSavingTheme] = useState<SiteThemeKey | null>(null);
  const [toggles, setToggles] = useState<Record<Toggle, boolean>>({
    introEnabled: landing.introEnabled,
    highlightsEnabled: landing.highlightsEnabled,
    servicesEnabled: landing.servicesEnabled,
    teamEnabled: landing.teamEnabled,
    reviewsEnabled: landing.reviewsEnabled,
    galleryEnabled: landing.galleryEnabled,
  });

  const [hero, setHero] = useState<LandingSectionValue>({
    layout: landing.heroLayout,
    eyebrow: landing.heroEyebrow ?? "",
    title: landing.heroTitle ?? "",
    text: landing.heroText ?? "",
    buttonLabel: landing.heroButtonLabel ?? "",
    buttonTarget: landing.heroButtonTarget,
    buttonUrl: landing.heroButtonUrl ?? "",
  });
  const [intro, setIntro] = useState<LandingSectionValue>({
    layout: landing.introLayout,
    title: landing.introTitle ?? "",
    text: landing.introText ?? "",
    buttonLabel: landing.introButtonLabel ?? "",
    buttonTarget: landing.introButtonTarget,
    buttonUrl: landing.introButtonUrl ?? "",
  });
  const [savingHero, setSavingHero] = useState(false);
  const [savingIntro, setSavingIntro] = useState(false);

  async function pickTheme(next: SiteThemeKey) {
    if (next === theme) return;
    const prev = theme;
    setTheme(next);
    setSavingTheme(next);
    const res = await putLanding({ theme: next }).catch(() => null);
    setSavingTheme(null);
    if (!res?.ok) setTheme(prev);
  }

  async function toggle(key: Toggle, value: boolean) {
    setToggles((t) => ({ ...t, [key]: value }));
    const res = await putLanding({ [key]: value }).catch(() => null);
    if (!res?.ok) setToggles((t) => ({ ...t, [key]: !value }));
  }

  async function saveHero() {
    setSavingHero(true);
    await putLanding({
      heroLayout: hero.layout,
      heroEyebrow: hero.eyebrow,
      heroTitle: hero.title,
      heroText: hero.text,
      heroButtonLabel: hero.buttonLabel,
      heroButtonTarget: hero.buttonTarget,
      heroButtonUrl: hero.buttonUrl,
    });
    setSavingHero(false);
    router.refresh();
  }

  async function saveIntro() {
    setSavingIntro(true);
    await putLanding({
      introLayout: intro.layout === "FULL" ? "IMAGE_LEFT" : intro.layout,
      introTitle: intro.title,
      introText: intro.text,
      introButtonLabel: intro.buttonLabel,
      introButtonTarget: intro.buttonTarget,
      introButtonUrl: intro.buttonUrl,
    });
    setSavingIntro(false);
    router.refresh();
  }

  const layoutLabels = { FULL: L.layoutFull };

  return (
    <div className="space-y-8">
      {/* ---------- Theme ---------- */}
      <section className="card space-y-5 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-ink-900">{L.themeTitle}</h2>
          <p className="mt-1 text-sm text-ink-400">{L.themeHint}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SITE_THEME_KEYS.map((key) => {
            const on = theme === key;
            const [name, mood] = L.themes[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => pickTheme(key)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all ${
                  on ? "border-primary-500 ring-4 ring-primary-100" : "border-ink-100 hover:-translate-y-0.5 hover:shadow-card"
                }`}
              >
                <ThemeMiniature theme={key} />
                <div className="flex items-start justify-between gap-2 bg-white px-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink-900">{name}</span>
                    <span className="block truncate text-[11px] text-ink-400">{mood}</span>
                  </span>
                  {savingTheme === key ? (
                    <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-primary-500" />
                  ) : on ? (
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------- Sections ---------- */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-ink-900">{L.sectionsTitle}</h2>
          <p className="mt-1 text-sm text-ink-400">{L.sectionsHint}</p>
        </div>

        <Panel icon={LayoutTemplate} title={L.heroName} description={L.heroDesc} badge={L.always} defaultOpen>
          <p className="mb-5 flex items-start gap-2 rounded-2xl bg-peach-50 px-4 py-3 text-xs text-ink-700">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" />
            {L.tip}
          </p>
          <LandingSectionCard
            imageSlot="hero"
            initialImageUrl={landing.heroImageUrl}
            value={hero}
            onChange={(patch) => setHero((h) => ({ ...h, ...patch }))}
            onSave={saveHero}
            saving={savingHero}
            imageArea={<HeroSlidesManager initialUrls={landing.heroSlideUrls} />}
            layouts={["FULL", "IMAGE_RIGHT", "IMAGE_LEFT", "TEXT_ONLY"]}
            layoutLabels={layoutLabels}
            eyebrowLabel={L.eyebrow}
            eyebrowPlaceholder={L.eyebrowPh}
          />
        </Panel>

        <Panel
          icon={BookOpen}
          title={L.introName}
          description={L.introDesc}
          enabled={toggles.introEnabled}
          onToggle={(v) => toggle("introEnabled", v)}
          L={L}
        >
          <LandingSectionCard
            imageSlot="intro"
            initialImageUrl={landing.introImageUrl}
            value={intro}
            onChange={(patch) => setIntro((i) => ({ ...i, ...patch }))}
            onSave={saveIntro}
            saving={savingIntro}
            layouts={["IMAGE_LEFT", "IMAGE_RIGHT", "TEXT_ONLY"]}
            layoutLabels={layoutLabels}
          />
        </Panel>

        <Panel
          icon={Sparkles}
          title={L.servicesName}
          description={L.servicesDesc}
          badge={L.auto}
          count={landing.counts.services}
          enabled={toggles.servicesEnabled}
          onToggle={(v) => toggle("servicesEnabled", v)}
          L={L}
        >
          <TitleField initial={landing.servicesTitle} field="servicesTitle" label={L.sectionTitle} saveLabel={L.save} />
          <Link href="/business/dashboard/services" className="mt-4 inline-flex text-sm font-semibold text-primary-600 hover:underline">
            {L.servicesLink} →
          </Link>
        </Panel>

        <Panel
          icon={Star}
          title={L.highlightsName}
          description={L.highlightsDesc}
          count={landing.highlights.length}
          enabled={toggles.highlightsEnabled}
          onToggle={(v) => toggle("highlightsEnabled", v)}
          L={L}
        >
          <LandingHighlightsManager
            landingPageId={landing.id}
            sectionTitle={landing.highlightsTitle ?? ""}
            sectionEnabled={landing.highlightsEnabled}
            highlights={landing.highlights}
            embedded
          />
        </Panel>

        <Panel
          icon={Images}
          title={L.galleryName}
          description={L.galleryDesc}
          count={landing.galleryUrls.filter(Boolean).length}
          enabled={toggles.galleryEnabled}
          onToggle={(v) => toggle("galleryEnabled", v)}
          L={L}
        >
          <div className="space-y-5">
            <TitleField initial={landing.galleryTitle} field="galleryTitle" label={L.sectionTitle} saveLabel={L.save} />
            <ImageSlotsManager
              initialUrls={landing.galleryUrls}
              slotPrefix="gallery-"
              count={8}
              label={L.galleryPhotos}
              hint={L.galleryHint}
            />
          </div>
        </Panel>

        <Panel
          icon={Users}
          title={L.teamName}
          description={L.teamDesc}
          badge={L.auto}
          count={landing.counts.staff}
          enabled={toggles.teamEnabled}
          onToggle={(v) => toggle("teamEnabled", v)}
          L={L}
        >
          <Link href="/business/dashboard/staff" className="inline-flex text-sm font-semibold text-primary-600 hover:underline">
            {L.teamLink} →
          </Link>
        </Panel>

        <Panel
          icon={MessageSquareQuote}
          title={L.reviewsName}
          description={L.reviewsDesc}
          badge={L.auto}
          count={landing.counts.reviews}
          enabled={toggles.reviewsEnabled}
          onToggle={(v) => toggle("reviewsEnabled", v)}
          L={L}
        >
          <Link href="/business/dashboard/reviews" className="inline-flex text-sm font-semibold text-primary-600 hover:underline">
            {L.reviewsLink} →
          </Link>
        </Panel>
      </section>
    </div>
  );
}

/** A tiny drawing of the public site in one palette. */
function ThemeMiniature({ theme }: { theme: SiteThemeKey }) {
  const c = (k: Parameters<typeof themeColor>[1]) => themeColor(theme, k);
  return (
    <div className="relative h-28 overflow-hidden" style={{ background: c("bg") }}>
      <div className="flex h-4 items-center justify-between px-2" style={{ background: c("deep") }}>
        <span className="h-1 w-6 rounded-full" style={{ background: c("gold") }} />
        <span className="h-1 w-4 rounded-full opacity-50" style={{ background: c("deepInk") }} />
      </div>
      <div className="absolute right-0 top-4 h-full w-[42%]" style={{ background: c("surface") }} />
      <div className="relative flex gap-2 px-2.5 pt-3">
        <div className="flex-1 space-y-1.5 pt-1">
          <span className="block h-[3px] w-7 rounded-full" style={{ background: c("gold") }} />
          <span className="block h-2 w-full rounded-sm" style={{ background: c("ink") }} />
          <span className="block h-2 w-3/4 rounded-sm" style={{ background: c("ink") }} />
          <span className="block h-1 w-full rounded-full opacity-40" style={{ background: c("muted") }} />
          <span className="mt-2 block h-3.5 w-12 rounded-full" style={{ background: c("accent") }} />
        </div>
        <div
          className="h-[4.25rem] w-11 rounded-b-md rounded-t-full"
          style={{ background: `linear-gradient(160deg, ${c("accent")}, ${c("gold")})`, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}

function Panel({
  icon: Icon,
  title,
  description,
  badge,
  count,
  enabled,
  onToggle,
  defaultOpen = false,
  L,
  children,
}: {
  icon: typeof Star;
  title: string;
  description: string;
  badge?: string;
  count?: number;
  enabled?: boolean;
  onToggle?: (v: boolean) => void;
  defaultOpen?: boolean;
  L?: ReturnType<typeof landingEditorStrings>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const off = enabled === false;
  return (
    <div className={`overflow-hidden rounded-3xl border bg-white transition-shadow ${open ? "border-ink-100 shadow-card" : "border-ink-100"}`}>
      <div className="flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${
              off ? "bg-mist-100 text-ink-400" : "bg-primary-50 text-primary-600"
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className={`font-semibold ${off ? "text-ink-400" : "text-ink-900"}`}>{title}</span>
              {badge && <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-semibold text-ink-700">{badge}</span>}
              {count !== undefined && count > 0 && L && (
                <span className="text-xs text-ink-400">
                  · {count} {L.items}
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-xs text-ink-400 sm:text-sm">{description}</span>
          </span>
          <ChevronDown className={`h-5 w-5 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {onToggle && (
          <button
            type="button"
            role="switch"
            aria-checked={!!enabled}
            aria-label={enabled ? L?.shown : L?.hidden}
            title={enabled ? L?.shown : L?.hidden}
            onClick={() => onToggle(!enabled)}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${enabled ? "bg-primary-500" : "bg-ink-100"}`}
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled ? "left-6" : "left-1"}`} />
          </button>
        )}
      </div>
      {open && <div className={`border-t border-ink-100 p-4 sm:p-6 ${off ? "opacity-60" : ""}`}>{children}</div>}
    </div>
  );
}

function TitleField({
  initial,
  field,
  label,
  saveLabel,
}: {
  initial: string | null;
  field: "servicesTitle" | "galleryTitle";
  label: string;
  saveLabel: string;
}) {
  const [value, setValue] = useState(initial ?? "");
  const [state, setState] = useState<"idle" | "saving" | "saved">("idle");
  async function save() {
    setState("saving");
    await putLanding({ [field]: value });
    setState("saved");
    setTimeout(() => setState("idle"), 1800);
  }
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2">
        <input className="input flex-1" value={value} maxLength={150} onChange={(e) => setValue(e.target.value)} />
        <button type="button" onClick={save} disabled={state === "saving"} className="btn-outline shrink-0 !px-4 text-sm">
          {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : state === "saved" ? <Check className="h-4 w-4" /> : null}
          {saveLabel}
        </button>
      </div>
    </div>
  );
}
