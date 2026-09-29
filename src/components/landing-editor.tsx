"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { LandingSectionCard, type LandingSectionValue } from "@/components/landing-section-card";
import { LandingHighlightsManager, type HighlightRow } from "@/components/landing-highlights-manager";
import { HeroSlidesManager } from "@/components/hero-slides-manager";

export interface LandingData {
  id: string;
  heroLayout: LandingSectionValue["layout"];
  heroTitle: string | null;
  heroText: string | null;
  heroButtonLabel: string | null;
  heroButtonTarget: LandingSectionValue["buttonTarget"];
  heroButtonUrl: string | null;
  introEnabled: boolean;
  introLayout: LandingSectionValue["layout"];
  introTitle: string | null;
  introText: string | null;
  introButtonLabel: string | null;
  introButtonTarget: LandingSectionValue["buttonTarget"];
  introButtonUrl: string | null;
  highlightsEnabled: boolean;
  highlightsTitle: string | null;
  heroImageUrl: string | null;
  heroSlideUrls: (string | null)[];
  introImageUrl: string | null;
  highlights: HighlightRow[];
}

export function LandingEditor({ landing }: { landing: LandingData }) {
  const tDash = useTranslations("dashboard");
  const router = useRouter();

  const [hero, setHero] = useState<LandingSectionValue>({
    layout: landing.heroLayout,
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
  const [introEnabled, setIntroEnabled] = useState(landing.introEnabled);
  const [savingHero, setSavingHero] = useState(false);
  const [savingIntro, setSavingIntro] = useState(false);

  async function saveHero() {
    setSavingHero(true);
    await fetch("/api/business/landing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        heroLayout: hero.layout,
        heroTitle: hero.title,
        heroText: hero.text,
        heroButtonLabel: hero.buttonLabel,
        heroButtonTarget: hero.buttonTarget,
        heroButtonUrl: hero.buttonUrl,
      }),
    });
    setSavingHero(false);
    router.refresh();
  }

  async function saveIntro() {
    setSavingIntro(true);
    await fetch("/api/business/landing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        introEnabled,
        introLayout: intro.layout,
        introTitle: intro.title,
        introText: intro.text,
        introButtonLabel: intro.buttonLabel,
        introButtonTarget: intro.buttonTarget,
        introButtonUrl: intro.buttonUrl,
      }),
    });
    setSavingIntro(false);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <LandingSectionCard
        heading={tDash("landing.heroTitle")}
        imageSlot="hero"
        initialImageUrl={landing.heroImageUrl}
        value={hero}
        onChange={(patch) => setHero((h) => ({ ...h, ...patch }))}
        onSave={saveHero}
        saving={savingHero}
        imageArea={<HeroSlidesManager initialUrls={landing.heroSlideUrls} />}
      />
      <LandingSectionCard
        heading={tDash("landing.introTitle")}
        imageSlot="intro"
        initialImageUrl={landing.introImageUrl}
        value={intro}
        onChange={(patch) => setIntro((i) => ({ ...i, ...patch }))}
        onSave={saveIntro}
        saving={savingIntro}
        enabled={introEnabled}
        onToggleEnabled={setIntroEnabled}
      />
      <LandingHighlightsManager
        landingPageId={landing.id}
        sectionTitle={landing.highlightsTitle ?? ""}
        sectionEnabled={landing.highlightsEnabled}
        highlights={landing.highlights}
      />
    </div>
  );
}
