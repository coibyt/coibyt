"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  Eye,
  FileDown,
  ImagePlus,
  Languages,
  Link2,
  Loader2,
  Palette,
  PencilLine,
  QrCode,
  Sparkles,
  Star,
  Store,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { canvasMeasure, clearMeasureCache, ensureFonts, pageToPng } from "@/lib/print/canvas";
import type { Page } from "@/lib/print/ops";
import { layoutPoster } from "@/lib/qr-poster/layout";
import { POSTER_LABELS } from "@/lib/qr-poster/i18n/sheet";
import type { PosterUi } from "@/lib/qr-poster/i18n/types";
import type { PriceListUi } from "@/lib/price-list/i18n/types";
import { COLOR_SWATCHES } from "@/lib/price-list/types";
import {
  MAX_LANGUAGES,
  POSTER_DEFAULT_COLOR,
  POSTER_FORMATS,
  SEASON_DEFAULT_COLOR,
  bookingQrData,
  emptyPoster,
  sanitizePoster,
  validUrl,
  type PosterDoc,
  type PosterFormat,
  type PosterTemplate,
  type Season,
} from "@/lib/qr-poster/types";
import { PriceListPreview } from "@/components/price-list/preview";
import { CtaModal, Section, Toast, fileBaseName, normalizeLogo, readLogoFile, saveBlob, trackTool } from "@/components/print-tools/shared";

const DRAFT_KEY = "varaaai-qr-poster-draft-v1";
const track = (event: string) => trackTool("qr_poster", event);

interface SalonInfo {
  id: string;
  slug: string;
  name: string;
  approved: boolean;
  language: string;
  phone: string;
  logo: string | null;
  hours: { weekday: number; openMinute: number; closeMinute: number }[];
}

/** "Mon–Fri 9:00–19:00 · Sat 10:00–16:00" in the poster's main language. */
function formatHours(hours: SalonInfo["hours"], lang: string) {
  if (!hours.length) return "";
  const day = (d: number) => {
    try {
      return new Intl.DateTimeFormat(lang, { weekday: "short" }).format(new Date(Date.UTC(2024, 0, 7 + d)));
    } catch {
      return String(d);
    }
  };
  const hm = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;
  const order = [1, 2, 3, 4, 5, 6, 0];
  const byDay = new Map(hours.map((h) => [h.weekday, `${hm(h.openMinute)}–${hm(h.closeMinute)}`]));
  const groups: { from: number; to: number; time: string }[] = [];
  for (const d of order) {
    const t = byDay.get(d);
    if (!t) continue;
    const last = groups[groups.length - 1];
    if (last && last.time === t && order.indexOf(d) === order.indexOf(last.to) + 1) last.to = d;
    else groups.push({ from: d, to: d, time: t });
  }
  return groups.map((g) => `${day(g.from)}${g.from !== g.to ? `–${day(g.to)}` : ""} ${g.time}`).join(" · ");
}

export function QrPosterEditor({
  locale,
  ui,
  pl,
  ownsSalon,
  canHideFooter,
}: {
  locale: string;
  ui: PosterUi;
  /** Labels shared with the price-list tool. */
  pl: PriceListUi;
  ownsSalon: boolean;
  canHideFooter: boolean;
}) {
  const presetsFor = (l: string) => (POSTER_LABELS[l] ?? POSTER_LABELS.en).presets;
  const [doc, setDoc] = useState<PosterDoc>(() => emptyPoster(locale, presetsFor(locale)[0]));
  const [hydrated, setHydrated] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [toast, setToast] = useState<{ text: string; tone: "ok" | "err" } | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [busy, setBusy] = useState<null | "pdf" | "png" | "import">(null);
  const [showCta, setShowCta] = useState(false);
  const [salonChoices, setSalonChoices] = useState<SalonInfo[] | null>(null);
  const [origin, setOrigin] = useState("https://varaaai.com");
  const fileRef = useRef<HTMLInputElement>(null);

  const say = useCallback((text: string, tone: "ok" | "err" = "ok") => {
    setToast({ text, tone });
    window.setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 4200);
  }, []);
  const update = useCallback((patch: Partial<PosterDoc> | ((d: PosterDoc) => PosterDoc)) => {
    setDoc((d) => (typeof patch === "function" ? patch(d) : { ...d, ...patch }));
  }, []);

  // ---- restore the local draft, count the visit
  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const restored = sanitizePoster(JSON.parse(raw), locale, presetsFor(locale)[0]);
        if (restored.salonName || restored.booking.url || restored.booking.slug) {
          setDoc(restored);
          say(pl.draftRestored);
        }
      }
    } catch {
      // Private mode / blocked storage — start fresh.
    }
    setHydrated(true);
    track("open");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- autosave to this browser
  useEffect(() => {
    if (!hydrated) return;
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(doc));
      } catch {
        try {
          localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...doc, logo: null }));
        } catch {
          // Storage full or blocked.
        }
      }
    }, 500);
    return () => window.clearTimeout(t);
  }, [doc, hydrated]);

  useEffect(() => {
    if (!doc.logo) return setLogoImg(null);
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = doc.logo;
  }, [doc.logo]);

  const qrData = useMemo(() => bookingQrData(doc, origin), [doc, origin]);
  const effectiveDoc = useMemo(
    () => ({ ...doc, showFooter: doc.showFooter || !canHideFooter, qrLogo: doc.qrLogo && !!doc.logo }),
    [doc, canHideFooter]
  );

  // ---- layout (debounced; waits for the fonts each script needs)
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    const t = window.setTimeout(async () => {
      const texts = [
        doc.salonName,
        ...Object.values(doc.titles),
        ...Object.values(doc.lines),
        ...doc.languages.flatMap((l) => {
          const w = POSTER_LABELS[l] ?? POSTER_LABELS.en;
          return [...w.presets, w.sub, w.review, w.footer];
        }),
        "varaaai.com/q 0123456789",
      ];
      await ensureFonts(texts);
      if (cancelled) return;
      clearMeasureCache();
      setPages(
        layoutPoster({
          doc: effectiveDoc,
          labels: POSTER_LABELS,
          measure: canvasMeasure,
          // A placeholder QR keeps the preview useful before a link is in.
          qrData: qrData ?? `${origin}/`,
          logoAspect: logoImg ? logoImg.naturalWidth / Math.max(1, logoImg.naturalHeight) : null,
        })
      );
    }, 220);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [effectiveDoc, doc, qrData, logoImg, hydrated, origin]);

  // ---- logo
  const onLogoFile = async (file: File | undefined) => {
    if (!file) return;
    const r = await readLogoFile(file);
    if ("error" in r) return say(r.error === "size" ? pl.logoTooBig : pl.logoBadType, "err");
    update({ logo: r.dataUrl });
  };

  // ---- languages
  const languageName = useMemo(() => {
    let dn: Intl.DisplayNames | null = null;
    try {
      dn = new Intl.DisplayNames([locale], { type: "language" });
    } catch {}
    return (code: string) => {
      const n = dn?.of(code) ?? code;
      return n.charAt(0).toLocaleUpperCase(locale) + n.slice(1);
    };
  }, [locale]);
  const setLanguages = (languages: string[]) =>
    update((d) => {
      const titles = { ...d.titles };
      for (const l of languages) if (!titles[l]) titles[l] = presetsFor(l)[0];
      return { ...d, languages, titles };
    });

  // ---- import from my salon
  const applySalon = async (s: SalonInfo) => {
    setSalonChoices(null);
    const logo = s.logo ? await normalizeLogo(s.logo) : null;
    update((d) => ({
      ...d,
      salonName: s.name,
      logo: logo?.dataUrl ?? d.logo,
      booking: { mode: "varaaai", url: "", slug: s.slug },
      lines: { ...d.lines, phone: s.phone || d.lines.phone, hours: formatHours(s.hours, d.languages[0]) || d.lines.hours },
    }));
    say(pl.importDone);
  };
  const importSalon = async () => {
    setBusy("import");
    try {
      const res = await fetch("/api/tools/price-list/my-salon");
      if (!res.ok) throw new Error();
      const { salons } = (await res.json()) as { salons: SalonInfo[] };
      if (!salons.length) throw new Error();
      if (salons.length === 1) await applySalon(salons[0]);
      else setSalonChoices(salons);
    } catch {
      say(pl.importError, "err");
    } finally {
      setBusy(null);
    }
  };

  // ---- downloads
  const F = POSTER_FORMATS[doc.format];
  const fileBase = `${fileBaseName(doc.salonName, "qr-poster")}-${F.code}${doc.format === "sticker" && doc.stickerSheet ? "-a4" : ""}`;
  const afterDownload = () => {
    if (!canHideFooter) window.setTimeout(() => setShowCta(true), 600);
  };
  const canDownload = !!qrData && pages.length > 0 && !busy;

  const downloadPdf = async () => {
    if (!canDownload) return;
    setBusy("pdf");
    try {
      const res = await fetch("/api/tools/render-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: doc.salonName || "QR poster", logo: doc.logo, pages }),
      });
      if (!res.ok) throw new Error();
      saveBlob(await res.blob(), `${fileBase}.pdf`);
      track("download_pdf");
      afterDownload();
    } catch {
      say(pl.pdfError, "err");
    } finally {
      setBusy(null);
    }
  };

  const downloadPng = async () => {
    if (!canDownload) return;
    setBusy("png");
    try {
      const page = pages[0];
      const scale = doc.format === "sticker" && doc.stickerSheet ? 2.5 : F.pngScale;
      const blob = await pageToPng(page, scale, logoImg);
      if (!blob) throw new Error();
      saveBlob(blob, `${fileBase}.png`);
      track("download_png");
      afterDownload();
    } catch {
      say(pl.pdfError.replace("PDF", "PNG"), "err");
    } finally {
      setBusy(null);
    }
  };

  const templates: { id: PosterTemplate; label: string; bg: string; fg: string; accent: string }[] = [
    { id: "minimal", label: pl.tMinimal, bg: "#ffffff", fg: "#16191d", accent: POSTER_DEFAULT_COLOR.minimal },
    { id: "luxury", label: pl.tLuxury, bg: "#0f0d0b", fg: "#f6efe3", accent: POSTER_DEFAULT_COLOR.luxury },
    { id: "pastel", label: ui.tPastel, bg: "#fbe3ee", fg: "#2a2431", accent: POSTER_DEFAULT_COLOR.pastel },
    { id: "seasonal", label: ui.tSeasonal, bg: "#0f3b2e", fg: "#fffaf0", accent: SEASON_DEFAULT_COLOR.christmas },
  ];
  const seasons: { id: Season; label: string }[] = [
    { id: "christmas", label: ui.sChristmas },
    { id: "blackfriday", label: ui.sBlackFriday },
    { id: "tet", label: ui.sTet },
  ];
  const formats: { id: PosterFormat; label: string }[] = [
    { id: "a4", label: pl.fA4 },
    { id: "a5", label: pl.fA5 },
    { id: "a6", label: ui.fA6 },
    { id: "tent", label: ui.fTent },
    { id: "sticker", label: ui.fSticker },
    { id: "square", label: pl.fSquare },
    { id: "story", label: ui.fStory },
  ];
  const reviewInvalid = doc.review.enabled && doc.review.url.trim() !== "" && !validUrl(doc.review.url);
  const linkInvalid = doc.booking.mode === "custom" && doc.booking.url.trim() !== "" && !validUrl(doc.booking.url);

  const downloadButtons = (
    <div className="flex gap-2">
      <button type="button" onClick={downloadPdf} disabled={!canDownload} className="btn-accent flex-1 !py-3 shadow-lg shadow-primary-900/20">
        {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
        {busy === "pdf" ? pl.generating : pl.downloadPdf}
      </button>
      <button type="button" onClick={downloadPng} disabled={!canDownload} className="btn-outline flex-1 !py-3">
        {busy === "png" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {pl.downloadPng}
      </button>
    </div>
  );

  const toggle = (checked: boolean, onChange: (v: boolean) => void, label: string, hint?: string, disabled = false) => (
    <label className={`flex items-start gap-3 rounded-2xl border border-ink-100 px-4 py-3 text-sm ${disabled ? "opacity-60" : "cursor-pointer hover:border-primary-200"}`}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary-600" />
      <span>
        <span className="font-medium text-ink-900">{label}</span>
        {hint && <span className="mt-0.5 block text-xs text-ink-400">{hint}</span>}
      </span>
    </label>
  );

  return (
    <div>
      {/* Mobile tabs */}
      <div className="sticky top-16 z-20 -mx-4 mb-4 flex gap-2 border-b border-ink-100 bg-mist-50/95 px-4 py-2 backdrop-blur lg:hidden">
        {(["edit", "preview"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-colors ${mobileTab === t ? "bg-ink-900 text-white" : "bg-white text-ink-700"}`}
          >
            {t === "edit" ? <PencilLine className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {t === "edit" ? pl.editTab : pl.previewTab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className={`min-w-0 space-y-5 ${mobileTab === "edit" ? "" : "hidden lg:block"}`}>
          {/* Salon */}
          <Section
            icon={Store}
            title={pl.sSalon}
            aside={
              ownsSalon ? (
                <button type="button" onClick={importSalon} disabled={busy === "import"} className="btn-outline !px-3.5 !py-1.5 text-xs">
                  {busy === "import" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-primary-600" />}
                  <span className="hidden sm:inline">{pl.importFromSalon}</span>
                  <span className="sm:hidden">VaraaAi</span>
                </button>
              ) : null
            }
          >
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <label className="block">
                <span className="label">{pl.salonName}</span>
                <input className="input" value={doc.salonName} maxLength={120} placeholder={pl.salonNamePh} onChange={(e) => update({ salonName: e.target.value })} />
              </label>
              <div>
                <span className="label">{pl.logo}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    aria-label={pl.uploadLogo}
                    className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-ink-100 bg-mist-50 text-ink-400 transition-colors hover:border-primary-300 hover:text-primary-600"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {doc.logo ? <img src={doc.logo} alt="" className="h-full w-full object-contain p-2" /> : <ImagePlus className="h-6 w-6" />}
                  </button>
                  <div className="text-xs text-ink-400 sm:w-28">
                    <p>{pl.logoHint}</p>
                    {doc.logo && (
                      <button type="button" onClick={() => update({ logo: null, qrLogo: false })} className="mt-1 font-semibold text-berry-500 hover:underline">
                        {pl.removeLogo}
                      </button>
                    )}
                  </div>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  className="hidden"
                  onChange={(e) => {
                    void onLogoFile(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          </Section>

          {/* Link & QR */}
          <Section icon={QrCode} title={ui.sLink}>
            <div className="space-y-2">
              {(
                [
                  ...(doc.booking.slug ? [["varaaai", pl.qrVaraaai] as const] : []),
                  ["custom", pl.qrCustom] as const,
                ] as const
              ).map(([mode, label]) => (
                <label
                  key={mode}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${doc.booking.mode === mode ? "border-primary-400 bg-primary-50" : "border-ink-100 hover:border-primary-200"}`}
                >
                  <input type="radio" name="booking-mode" checked={doc.booking.mode === mode} onChange={() => update((d) => ({ ...d, booking: { ...d.booking, mode } }))} className="h-4 w-4 accent-primary-600" />
                  <span className="font-medium text-ink-900">{label}</span>
                </label>
              ))}
            </div>
            {doc.booking.mode === "custom" ? (
              <div className="mt-3">
                <input
                  className={`input ${linkInvalid ? "!border-berry-400" : ""}`}
                  value={doc.booking.url}
                  placeholder={pl.qrUrlPh}
                  inputMode="url"
                  maxLength={500}
                  onChange={(e) => update((d) => ({ ...d, booking: { ...d.booking, url: e.target.value } }))}
                />
                {linkInvalid && <p className="mt-1 text-xs font-medium text-berry-500">{pl.qrInvalid}</p>}
              </div>
            ) : (
              <p className="mt-2 flex items-start gap-1.5 text-xs text-teal-700">
                <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {ui.varaaaiLinkHint}
              </p>
            )}

            <div className="mt-4 space-y-2">
              {toggle(doc.qrLogo && !!doc.logo, (v) => update({ qrLogo: v }), ui.qrLogo, ui.qrLogoHint, !doc.logo)}
              {toggle(doc.review.enabled, (v) => update((d) => ({ ...d, review: { ...d.review, enabled: v } })), ui.reviewToggle, ui.reviewHint)}
              {doc.review.enabled && (
                <div>
                  <div className="relative">
                    <Star className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-amber-400 text-amber-400" />
                    <input
                      className={`input !pl-10 ${reviewInvalid ? "!border-berry-400" : ""}`}
                      value={doc.review.url}
                      placeholder={ui.reviewPh}
                      inputMode="url"
                      maxLength={500}
                      onChange={(e) => update((d) => ({ ...d, review: { ...d.review, url: e.target.value } }))}
                    />
                  </div>
                  {reviewInvalid && <p className="mt-1 text-xs font-medium text-berry-500">{pl.qrInvalid}</p>}
                </div>
              )}
            </div>

            {!ownsSalon && (
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-4 text-white">
                <p className="font-bold">{pl.qrPromoTitle}</p>
                <p className="mt-1 text-sm text-primary-100">{pl.qrPromoBody}</p>
                <Link href="/business/apply" onClick={() => track("cta_click")} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-800 hover:bg-peach-100">
                  {pl.qrPromoCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </Section>

          {/* Text */}
          <Section icon={Languages} title={ui.sContent}>
            <span className="label">{pl.displayLanguages}</span>
            <div className="flex flex-wrap items-center gap-2">
              {doc.languages.map((l, i) => (
                <span
                  key={l}
                  className={`inline-flex items-center gap-1.5 rounded-full py-1.5 pl-3 pr-1.5 text-sm font-semibold ${i === 0 ? "bg-primary-600 text-white" : "border border-ink-100 bg-white text-ink-700"}`}
                >
                  {languageName(l)}
                  {i === 0 && <span className="rounded-full bg-white/20 px-1.5 text-[10px] uppercase">{pl.mainLanguage}</span>}
                  {i > 0 && (
                    <button type="button" title={pl.mainLanguage} onClick={() => setLanguages([l, ...doc.languages.filter((x) => x !== l)])} className="rounded-full px-1 text-[10px] font-bold uppercase text-primary-600 hover:bg-primary-50">
                      ↑
                    </button>
                  )}
                  {doc.languages.length > 1 && (
                    <button type="button" aria-label={pl.remove} onClick={() => setLanguages(doc.languages.filter((x) => x !== l))} className={`flex h-6 w-6 items-center justify-center rounded-full ${i === 0 ? "hover:bg-white/20" : "hover:bg-mist-100"}`}>
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </span>
              ))}
              {doc.languages.length < MAX_LANGUAGES && (
                <select
                  value=""
                  onChange={(e) => e.target.value && setLanguages([...doc.languages, e.target.value])}
                  className="rounded-full border border-dashed border-primary-300 bg-white px-3 py-1.5 text-sm font-semibold text-primary-700"
                  aria-label={pl.addLanguage}
                >
                  <option value="">+ {pl.addLanguage}</option>
                  {routing.locales
                    .filter((l) => !doc.languages.includes(l))
                    .map((l) => ({ l, n: languageName(l) }))
                    .sort((a, b) => a.n.localeCompare(b.n, locale))
                    .map(({ l, n }) => (
                      <option key={l} value={l}>
                        {n}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <p className="mt-2 text-xs text-ink-400">{pl.languagesHint}</p>

            <span className="label mt-5">{ui.headline}</span>
            <p className="-mt-1 mb-2 text-xs text-ink-400">{ui.headlineHint}</p>
            <div className="space-y-3">
              {doc.languages.map((l) => (
                <div key={l} className="rounded-2xl bg-mist-50 p-3">
                  <div className="flex items-center gap-2">
                    {doc.languages.length > 1 && <span className="w-7 shrink-0 text-center text-[10px] font-bold uppercase text-ink-400">{l}</span>}
                    <input
                      className="input !py-2 font-semibold"
                      value={doc.titles[l] ?? ""}
                      maxLength={120}
                      dir={l === "ar" || l === "he" ? "rtl" : "ltr"}
                      lang={l}
                      onChange={(e) => update((d) => ({ ...d, titles: { ...d.titles, [l]: e.target.value } }))}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {presetsFor(l).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => update((d) => ({ ...d, titles: { ...d.titles, [l]: p } }))}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${(doc.titles[l] ?? "") === p ? "border-primary-400 bg-primary-600 text-white" : "border-ink-100 bg-white text-ink-700 hover:border-primary-300"}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <span className="label mt-5">{ui.extraLines}</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["offer", ui.offer, ui.offerPh],
                  ["hours", ui.hours, ui.hoursPh],
                  ["phone", pl.phone, ""],
                  ["wifi", ui.wifi, ui.wifiPh],
                ] as const
              ).map(([key, label, ph]) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-xs font-semibold text-ink-700">{label}</span>
                  <input
                    className="input !py-2"
                    value={doc.lines[key]}
                    placeholder={ph}
                    maxLength={key === "phone" ? 60 : 120}
                    inputMode={key === "phone" ? "tel" : undefined}
                    onChange={(e) => update((d) => ({ ...d, lines: { ...d.lines, [key]: e.target.value } }))}
                  />
                </label>
              ))}
            </div>
          </Section>

          {/* Design */}
          <Section icon={Palette} title={pl.sDesign}>
            <span className="label">{pl.template}</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    update((d) => ({ ...d, template: t.id, color: t.id === "seasonal" ? SEASON_DEFAULT_COLOR[d.season] : POSTER_DEFAULT_COLOR[t.id] }))
                  }
                  className={`rounded-2xl border p-2 text-left transition-all ${doc.template === t.id ? "border-primary-500 ring-2 ring-primary-200" : "border-ink-100 hover:border-primary-200"}`}
                >
                  <span className="relative flex h-20 flex-col items-center justify-center gap-1.5 overflow-hidden rounded-xl" style={{ background: t.bg }}>
                    <span className="h-1.5 w-12 rounded-full" style={{ background: t.fg, opacity: 0.85 }} />
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
                      <QrCode className="h-6 w-6 text-ink-900" />
                    </span>
                    <span className="h-1 w-8 rounded-full" style={{ background: t.accent }} />
                  </span>
                  <span className="mt-1.5 block text-center text-xs font-semibold text-ink-900">{t.label}</span>
                </button>
              ))}
            </div>

            {doc.template === "seasonal" && (
              <>
                <span className="label mt-4">{ui.season}</span>
                <div className="flex flex-wrap gap-2">
                  {seasons.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => update((d) => ({ ...d, season: s.id, color: SEASON_DEFAULT_COLOR[s.id] }))}
                      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${doc.season === s.id ? "border-primary-500 bg-primary-50 text-primary-800" : "border-ink-100 text-ink-700 hover:border-primary-200"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            <span className="label mt-5">{pl.color}</span>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => update({ color: c })}
                  aria-label={c}
                  className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${doc.color.toLowerCase() === c ? "border-ink-900 ring-2 ring-white ring-offset-2 ring-offset-ink-900" : "border-white shadow"}`}
                  style={{ background: c }}
                />
              ))}
              <label className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)] shadow" title={pl.color}>
                <input type="color" value={doc.color} onChange={(e) => update({ color: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" />
              </label>
            </div>

            <span className="label mt-5">{pl.format}</span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {formats.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => update({ format: f.id })}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${doc.format === f.id ? "border-primary-500 bg-primary-50 text-primary-800" : "border-ink-100 text-ink-700 hover:border-primary-200"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {doc.format === "sticker" && <div className="mt-3">{toggle(doc.stickerSheet, (v) => update({ stickerSheet: v }), ui.stickerSheet)}</div>}
            {doc.format === "tent" && <p className="mt-3 rounded-xl bg-mist-50 px-3 py-2 text-xs text-ink-700">{ui.tentHint}</p>}

            <div className="mt-5">
              {toggle(
                doc.showFooter || !canHideFooter,
                (v) => update({ showFooter: v }),
                pl.showFooter,
                canHideFooter ? undefined : pl.footerLocked,
                !canHideFooter
              )}
            </div>
          </Section>

          <div className="sticky bottom-3 z-20 lg:hidden">{downloadButtons}</div>
        </div>

        {/* Preview */}
        <div className={`min-w-0 ${mobileTab === "preview" ? "" : "hidden lg:block"}`}>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-[26px] bg-gradient-to-b from-mist-100 to-mist-50 p-3 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <Eye className="h-4 w-4 text-primary-600" /> {pl.preview}
                </p>
                <p className="text-xs font-medium text-ink-400">{formats.find((f) => f.id === doc.format)?.label}</p>
              </div>
              {!qrData && <p className="mb-3 rounded-xl bg-peach-100 px-3 py-2 text-xs font-semibold text-coral-600">{ui.needLink}</p>}
              <div className={`max-h-[calc(100vh-15rem)] overflow-y-auto overscroll-contain px-1 pb-2 pt-1 max-lg:max-h-none ${qrData ? "" : "opacity-60"}`}>
                {pages.length ? (
                  <PriceListPreview pages={pages} logo={logoImg} pageLabel={(n) => String(n)} />
                ) : (
                  <div className="flex h-72 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">{downloadButtons}</div>
          </div>
        </div>
      </div>

      {salonChoices && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink-900/50 p-4 sm:items-center" onClick={() => setSalonChoices(null)}>
          <div className="w-full max-w-md rounded-[26px] bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 font-bold text-ink-900">{pl.importFromSalon}</p>
            <div className="space-y-2">
              {salonChoices.map((s) => (
                <button key={s.id} type="button" onClick={() => applySalon(s)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-ink-100 px-4 py-3 text-left hover:border-primary-300 hover:bg-primary-50">
                  <span className="font-semibold text-ink-900">{s.name}</span>
                  <ArrowRight className="h-4 w-4 text-primary-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCta && <CtaModal title={ui.ctaTitle} body={ui.ctaBody} button={pl.ctaButton} close={pl.close} onClose={() => setShowCta(false)} onClick={() => track("cta_click")} />}
      {toast && <Toast text={toast.text} tone={toast.tone} />}
    </div>
  );
}
