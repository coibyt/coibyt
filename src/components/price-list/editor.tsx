"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Download,
  Eye,
  FileDown,
  ImagePlus,
  Languages,
  Loader2,
  PencilLine,
  Plus,
  QrCode,
  Save,
  Sparkles,
  Store,
  Trash2,
  Wand2,
  X,
  Palette,
  ArrowRight,
  FolderOpen,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { layoutPriceList } from "@/lib/price-list/layout";
import type { Page } from "@/lib/print/ops";
import { canvasMeasure, clearMeasureCache, ensureFonts, pageToPng } from "@/lib/print/canvas";
import { SHEET_LABELS } from "@/lib/price-list/i18n/sheet";
import type { PriceListUi } from "@/lib/price-list/i18n/types";
import {
  COLOR_SWATCHES,
  CURRENCIES,
  FORMATS,
  MAX_LANGUAGES,
  TEMPLATE_DEFAULT_COLOR,
  emptyDoc,
  newId,
  sanitizeDoc,
  withUtm,
  type FormatId,
  type PriceListDoc,
  type TemplateId,
} from "@/lib/price-list/types";
import { ServicesEditor } from "./services-editor";
import { CtaModal, Section, Toast, fileBaseName, fmt, normalizeLogo, saveBlob, trackTool } from "@/components/print-tools/shared";
import { PriceListPreview } from "./preview";

const DRAFT_KEY = "varaaai-price-list-draft-v1";
const TOOL = "price_list";
const track = (event: string) => trackTool(TOOL, event);

interface SalonImport {
  id: string;
  slug: string;
  name: string;
  approved: boolean;
  language: string;
  currency: string;
  address: string;
  phone: string;
  logo: string | null;
  categories: { name: string; services: { name: string; description: string; price: number; durationMin: number }[] }[];
}

export function PriceListEditor({
  locale,
  ui,
  isLoggedIn,
  ownsSalon,
  canHideFooter,
}: {
  locale: string;
  ui: PriceListUi;
  isLoggedIn: boolean;
  ownsSalon: boolean;
  canHideFooter: boolean;
}) {
  const [doc, setDoc] = useState<PriceListDoc>(() => emptyDoc(locale));
  const [hydrated, setHydrated] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [toast, setToast] = useState<{ text: string; tone: "ok" | "err" } | null>(null);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [busy, setBusy] = useState<null | "pdf" | "png" | "translate" | "import" | "save">(null);
  const [showCta, setShowCta] = useState(false);
  const [pngMenu, setPngMenu] = useState(false);
  const [drafts, setDrafts] = useState<{ id: string; title: string; updatedAt: string }[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [salonChoices, setSalonChoices] = useState<SalonImport[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const say = useCallback((text: string, tone: "ok" | "err" = "ok") => {
    setToast({ text, tone });
    window.setTimeout(() => setToast((t) => (t?.text === text ? null : t)), 4200);
  }, []);

  const update = useCallback((patch: Partial<PriceListDoc> | ((d: PriceListDoc) => PriceListDoc)) => {
    setDoc((d) => (typeof patch === "function" ? patch(d) : { ...d, ...patch }));
  }, []);

  // ---- restore the local draft, count the visit
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { doc?: unknown; draftId?: string | null };
        const restored = sanitizeDoc(parsed.doc, locale);
        if (restored.salonName || restored.categories.length) {
          setDoc(restored);
          if (parsed.draftId) setDraftId(parsed.draftId);
          say(ui.draftRestored);
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
      const payload = (d: PriceListDoc) => JSON.stringify({ doc: d, draftId });
      try {
        localStorage.setItem(DRAFT_KEY, payload(doc));
      } catch {
        try {
          localStorage.setItem(DRAFT_KEY, payload({ ...doc, logo: null }));
        } catch {
          // Storage full or blocked — nothing more to do.
        }
      }
    }, 500);
    return () => window.clearTimeout(t);
  }, [doc, draftId, hydrated]);

  // ---- logo image object
  useEffect(() => {
    if (!doc.logo) return setLogoImg(null);
    const img = new Image();
    img.onload = () => setLogoImg(img);
    img.src = doc.logo;
  }, [doc.logo]);

  // ---- QR target
  const qrData = useMemo(() => {
    if (doc.qr.mode === "none") return null;
    const url = doc.qr.url.trim();
    if (!/^https?:\/\/[^\s.]+\.[^\s]+/i.test(url) && !/^https?:\/\/localhost/i.test(url)) return null;
    return withUtm(url, doc.format);
  }, [doc.qr, doc.format]);
  const qrInvalid = doc.qr.mode !== "none" && doc.qr.url.trim() !== "" && !qrData;

  // ---- layout (debounced; waits for the fonts each script needs)
  const effectiveDoc = useMemo(() => ({ ...doc, showFooter: doc.showFooter || !canHideFooter }), [doc, canHideFooter]);
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    const t = window.setTimeout(async () => {
      const texts = [
        doc.salonName,
        doc.address,
        doc.phone,
        ...doc.categories.flatMap((c) => [...Object.values(c.names), ...c.services.flatMap((s) => [...Object.values(s.names), ...Object.values(s.descriptions)])]),
        ...doc.languages.flatMap((l) => Object.values(SHEET_LABELS[l] ?? {})),
        "0123456789.,€$₫",
      ];
      await ensureFonts(texts);
      if (cancelled) return;
      clearMeasureCache();
      const next = layoutPriceList({
        doc: effectiveDoc,
        labels: SHEET_LABELS,
        measure: canvasMeasure,
        qrData,
        logoAspect: logoImg ? logoImg.naturalWidth / Math.max(1, logoImg.naturalHeight) : null,
      });
      setPages(next);
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [effectiveDoc, doc, qrData, logoImg, hydrated]);

  // ---- account drafts
  const loadDrafts = useCallback(async () => {
    if (!isLoggedIn) return;
    const res = await fetch("/api/tools/price-list/drafts").catch(() => null);
    if (res?.ok) setDrafts((await res.json()).drafts);
  }, [isLoggedIn]);
  useEffect(() => {
    void loadDrafts();
  }, [loadDrafts]);

  const saveToAccount = useCallback(
    async (silent = false) => {
      if (!isLoggedIn) return;
      if (!silent) setBusy("save");
      try {
        const res = await fetch(draftId ? `/api/tools/price-list/drafts/${draftId}` : "/api/tools/price-list/drafts", {
          method: draftId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doc }),
        });
        if (res.status === 404 && draftId) {
          setDraftId(null);
          return;
        }
        if (!res.ok) throw new Error();
        const { draft } = await res.json();
        setDraftId(draft.id);
        setSavedAt(Date.now());
        if (!silent) say(ui.saved);
        void loadDrafts();
      } catch {
        if (!silent) say(`✕ ${ui.saveToAccount}`, "err");
      } finally {
        if (!silent) setBusy(null);
      }
    },
    [isLoggedIn, draftId, doc, say, ui, loadDrafts]
  );

  // Once a list lives in the account, keep it in sync as it's edited.
  const firstSync = useRef(true);
  useEffect(() => {
    if (!draftId || !isLoggedIn) return;
    if (firstSync.current) {
      firstSync.current = false;
      return;
    }
    const t = window.setTimeout(() => void saveToAccount(true), 3000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc]);

  const openDraft = async (id: string) => {
    if (!id) return;
    const res = await fetch(`/api/tools/price-list/drafts/${id}`).catch(() => null);
    if (!res?.ok) return;
    const { draft } = await res.json();
    firstSync.current = true;
    setDoc(sanitizeDoc(draft.doc, locale));
    setDraftId(draft.id);
    setSavedAt(new Date(draft.updatedAt).getTime());
  };

  const deleteDraft = async () => {
    if (!draftId || !window.confirm(ui.confirmDelete)) return;
    await fetch(`/api/tools/price-list/drafts/${draftId}`, { method: "DELETE" }).catch(() => null);
    setDraftId(null);
    setSavedAt(null);
    void loadDrafts();
  };

  const newList = () => {
    firstSync.current = true;
    setDraftId(null);
    setSavedAt(null);
    setDoc(emptyDoc(locale));
  };

  // ---- logo upload
  const onLogoFile = async (file: File | undefined) => {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) return say(ui.logoBadType, "err");
    if (file.size > 2 * 1024 * 1024) return say(ui.logoTooBig, "err");
    const src = await new Promise<string>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.readAsDataURL(file);
    });
    const out = await normalizeLogo(src);
    if (!out) return say(ui.logoBadType, "err");
    update({ logo: out.dataUrl });
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
  const otherLanguages = routing.locales.filter((l) => !doc.languages.includes(l));

  const setLanguages = (languages: string[]) => update({ languages });

  // ---- AI translate
  const translate = async () => {
    const [from, ...to] = doc.languages;
    if (!to.length) return;
    const items: { key: string; text: string }[] = [];
    for (const c of doc.categories) {
      if (c.names[from] && to.some((l) => !c.names[l])) items.push({ key: `c:${c.id}`, text: c.names[from] });
      for (const s of c.services) {
        if (s.names[from] && to.some((l) => !s.names[l])) items.push({ key: `s:${s.id}`, text: s.names[from] });
        if (s.descriptions[from] && to.some((l) => !s.descriptions[l])) items.push({ key: `d:${s.id}`, text: s.descriptions[from] });
      }
    }
    if (!items.length) return say(ui.translateDone);
    setBusy("translate");
    track("translate");
    try {
      const all: Record<string, Record<string, string>> = {};
      for (let i = 0; i < items.length; i += 120) {
        const res = await fetch("/api/tools/price-list/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, to, items: items.slice(i, i + 120) }),
        });
        if (res.status === 429) throw new Error("limit");
        if (!res.ok) throw new Error("fail");
        Object.assign(all, (await res.json()).translations);
      }
      const fill = (cur: Record<string, string>, key: string) => {
        const t = all[key];
        if (!t) return cur;
        const out = { ...cur };
        for (const l of to) if (!out[l] && t[l]) out[l] = t[l];
        return out;
      };
      update((d) => ({
        ...d,
        categories: d.categories.map((c) => ({
          ...c,
          names: fill(c.names, `c:${c.id}`),
          services: c.services.map((s) => ({ ...s, names: fill(s.names, `s:${s.id}`), descriptions: fill(s.descriptions, `d:${s.id}`) })),
        })),
      }));
      say(ui.translateDone);
    } catch (e) {
      say((e as Error).message === "limit" ? ui.translateLimit : ui.translateError, "err");
    } finally {
      setBusy(null);
    }
  };

  // ---- import from my salon
  const applySalon = async (s: SalonImport) => {
    setSalonChoices(null);
    const lang = s.language;
    const languages = [lang, ...doc.languages.filter((l) => l !== lang)].slice(0, MAX_LANGUAGES);
    const logo = s.logo ? await normalizeLogo(s.logo) : null;
    const prefix = lang === routing.defaultLocale ? "" : `/${lang}`;
    update((d) => ({
      ...d,
      salonName: s.name,
      address: s.address,
      phone: s.phone,
      currency: s.currency,
      languages,
      logo: logo?.dataUrl ?? d.logo,
      qr: { mode: "varaaai", url: `${window.location.origin}${prefix}/b/${s.slug}`, slug: s.slug },
      categories: s.categories.map((c) => ({
        id: newId(),
        names: { [lang]: c.name },
        services: c.services.map((x) => ({
          id: newId(),
          names: { [lang]: x.name },
          descriptions: x.description ? { [lang]: x.description } : {},
          price: x.price,
          priceFrom: false,
          durationMin: x.durationMin,
        })),
      })),
    }));
    say(ui.importDone);
    track("import");
  };

  const importSalon = async () => {
    const hasContent = doc.categories.some((c) => c.services.length);
    if (hasContent && !window.confirm(ui.importFromSalon + "?")) return;
    setBusy("import");
    try {
      const res = await fetch("/api/tools/price-list/my-salon");
      if (!res.ok) throw new Error();
      const { salons } = (await res.json()) as { salons: SalonImport[] };
      if (!salons.length) throw new Error();
      if (salons.length === 1) await applySalon(salons[0]);
      else setSalonChoices(salons);
    } catch {
      say(ui.importError, "err");
    } finally {
      setBusy(null);
    }
  };

  // ---- downloads
  const fileBase = fileBaseName(doc.salonName, "price-list");
  const afterDownload = () => {
    if (!canHideFooter) window.setTimeout(() => setShowCta(true), 600);
  };

  const downloadPdf = async () => {
    if (!pages.length) return;
    setBusy("pdf");
    try {
      const res = await fetch("/api/tools/render-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: doc.salonName || "Price list", logo: doc.logo, pages }),
      });
      if (!res.ok) throw new Error();
      saveBlob(await res.blob(), `${fileBase}.pdf`);
      track("download_pdf");
      afterDownload();
    } catch {
      say(ui.pdfError, "err");
    } finally {
      setBusy(null);
    }
  };

  const downloadPng = async (index: number) => {
    const page = pages[index];
    if (!page) return;
    setBusy("png");
    setPngMenu(false);
    try {
      const blob = await pageToPng(page, FORMATS[doc.format].pngScale, logoImg);
      if (!blob) throw new Error();
      saveBlob(blob, pages.length > 1 ? `${fileBase}-${index + 1}.png` : `${fileBase}.png`);
      track("download_png");
      afterDownload();
    } catch {
      say(ui.pdfError.replace("PDF", "PNG"), "err");
    } finally {
      setBusy(null);
    }
  };

  const totalServices = doc.categories.reduce((s, c) => s + c.services.length, 0);
  const templates: { id: TemplateId; label: string; swatch: string[] }[] = [
    { id: "minimal", label: ui.tMinimal, swatch: ["#ffffff", "#1b1f23", doc.template === "minimal" ? doc.color : TEMPLATE_DEFAULT_COLOR.minimal] },
    { id: "luxury", label: ui.tLuxury, swatch: ["#16120e", "#f4ede2", doc.template === "luxury" ? doc.color : TEMPLATE_DEFAULT_COLOR.luxury] },
    { id: "colorful", label: ui.tColorful, swatch: [doc.template === "colorful" ? doc.color : TEMPLATE_DEFAULT_COLOR.colorful, "#ffffff", "#1c2024"] },
  ];
  const formats: { id: FormatId; label: string }[] = [
    { id: "a4", label: ui.fA4 },
    { id: "a5", label: ui.fA5 },
    { id: "a3", label: ui.fA3 },
    { id: "square", label: ui.fSquare },
  ];

  const downloadButtons = (
    <div className="relative flex gap-2">
      <button type="button" onClick={downloadPdf} disabled={!!busy || !pages.length} className="btn-accent flex-1 !py-3 shadow-lg shadow-primary-900/20">
        {busy === "pdf" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
        {busy === "pdf" ? ui.generating : ui.downloadPdf}
      </button>
      <button
        type="button"
        onClick={() => (pages.length > 1 ? setPngMenu((v) => !v) : downloadPng(0))}
        disabled={!!busy || !pages.length}
        className="btn-outline flex-1 !py-3"
      >
        {busy === "png" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {ui.downloadPng}
      </button>
      {pngMenu && (
        <div className="absolute bottom-full right-0 z-30 mb-2 w-52 rounded-2xl border border-ink-100 bg-white p-1.5 shadow-xl">
          {pages.map((_, i) => (
            <button key={i} type="button" onClick={() => downloadPng(i)} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-ink-700 hover:bg-mist-50">
              <Download className="h-3.5 w-3.5 text-primary-600" /> {fmt(ui.pngPage, i + 1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Account bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-[22px] border border-ink-100 bg-white px-3 py-2.5 shadow-sm">
        {isLoggedIn ? (
          <>
            <FolderOpen className="ml-1 h-4 w-4 text-primary-600" />
            <select
              value={draftId ?? ""}
              onChange={(e) => (e.target.value ? openDraft(e.target.value) : newList())}
              className="min-w-0 max-w-[14rem] flex-1 rounded-full border border-ink-100 bg-mist-50 px-3 py-1.5 text-sm font-medium text-ink-700 sm:flex-none"
              aria-label={ui.myLists}
            >
              <option value="">{draftId ? ui.newList : ui.myLists}</option>
              {drafts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.title || ui.untitled}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => saveToAccount(false)} disabled={busy === "save"} className="btn-primary !px-4 !py-1.5 text-xs">
              {busy === "save" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {ui.saveToAccount}
            </button>
            {savedAt && (
              <span className="flex items-center gap-1 text-xs font-medium text-teal-700">
                <Check className="h-3.5 w-3.5" /> {ui.saved}
              </span>
            )}
            <div className="ml-auto flex items-center gap-1">
              <button type="button" onClick={newList} className="btn-ghost !px-3 !py-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" /> {ui.newList}
              </button>
              {draftId && (
                <button type="button" onClick={deleteDraft} className="btn-ghost !px-3 !py-1.5 text-xs text-berry-500">
                  <Trash2 className="h-3.5 w-3.5" /> {ui.deleteList}
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="flex flex-1 flex-wrap items-center gap-2 px-1 text-sm text-ink-700">
            <Save className="h-4 w-4 text-primary-600" />
            {ui.loginToSave}
            <Link href="/auth/sign-in" className="font-semibold text-primary-700 hover:underline">
              → {ui.saveToAccount}
            </Link>
          </p>
        )}
      </div>

      {/* Mobile tabs */}
      <div className="sticky top-16 z-20 -mx-4 mb-4 flex gap-2 border-b border-ink-100 bg-mist-50/95 px-4 py-2 backdrop-blur lg:hidden">
        {(["edit", "preview"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setMobileTab(t)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-colors ${
              mobileTab === t ? "bg-ink-900 text-white" : "bg-white text-ink-700"
            }`}
          >
            {t === "edit" ? <PencilLine className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {t === "edit" ? ui.editTab : `${ui.previewTab}${pages.length > 1 ? ` (${pages.length})` : ""}`}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* ---------------- editor column */}
        <div className={`min-w-0 space-y-5 ${mobileTab === "edit" ? "" : "hidden lg:block"}`}>
          <Section
            icon={Store}
            title={ui.sSalon}
            aside={
              ownsSalon ? (
                <button type="button" onClick={importSalon} disabled={busy === "import"} className="btn-outline !px-3.5 !py-1.5 text-xs">
                  {busy === "import" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 text-primary-600" />}
                  <span className="hidden sm:inline">{ui.importFromSalon}</span>
                  <span className="sm:hidden">{busy === "import" ? ui.importing : "VaraaAi"}</span>
                </button>
              ) : null
            }
          >
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="space-y-3">
                <label className="block">
                  <span className="label">{ui.salonName}</span>
                  <input className="input" value={doc.salonName} maxLength={120} placeholder={ui.salonNamePh} onChange={(e) => update({ salonName: e.target.value })} />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="label">{ui.address}</span>
                    <input className="input" value={doc.address} maxLength={200} onChange={(e) => update({ address: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="label">{ui.phone}</span>
                    <input className="input" value={doc.phone} maxLength={60} inputMode="tel" onChange={(e) => update({ phone: e.target.value })} />
                  </label>
                </div>
              </div>
              <div>
                <span className="label">{ui.logo}</span>
                <div className="flex items-center gap-3 sm:flex-col sm:items-stretch">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-ink-100 bg-mist-50 text-ink-400 transition-colors hover:border-primary-300 hover:text-primary-600 sm:h-28 sm:w-28"
                    aria-label={ui.uploadLogo}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {doc.logo ? <img src={doc.logo} alt="" className="h-full w-full object-contain p-2" /> : <ImagePlus className="h-7 w-7" />}
                  </button>
                  <div className="text-xs text-ink-400 sm:w-28">
                    <p>{ui.logoHint}</p>
                    {doc.logo && (
                      <button type="button" onClick={() => update({ logo: null })} className="mt-1 font-semibold text-berry-500 hover:underline">
                        {ui.removeLogo}
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

          <Section icon={Languages} title={ui.sLanguages}>
            <span className="label">{ui.displayLanguages}</span>
            <div className="flex flex-wrap items-center gap-2">
              {doc.languages.map((l, i) => (
                <span
                  key={l}
                  className={`inline-flex items-center gap-1.5 rounded-full py-1.5 pl-3 pr-1.5 text-sm font-semibold ${
                    i === 0 ? "bg-primary-600 text-white" : "border border-ink-100 bg-white text-ink-700"
                  }`}
                >
                  {languageName(l)}
                  {i === 0 && <span className="rounded-full bg-white/20 px-1.5 text-[10px] uppercase">{ui.mainLanguage}</span>}
                  {i > 0 && (
                    <button type="button" title={ui.mainLanguage} onClick={() => setLanguages([l, ...doc.languages.filter((x) => x !== l)])} className="rounded-full px-1 text-[10px] font-bold uppercase text-primary-600 hover:bg-primary-50">
                      ↑
                    </button>
                  )}
                  {doc.languages.length > 1 && (
                    <button type="button" aria-label={ui.remove} onClick={() => setLanguages(doc.languages.filter((x) => x !== l))} className={`flex h-6 w-6 items-center justify-center rounded-full ${i === 0 ? "hover:bg-white/20" : "hover:bg-mist-100"}`}>
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
                  aria-label={ui.addLanguage}
                >
                  <option value="">+ {ui.addLanguage}</option>
                  {otherLanguages
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
            <p className="mt-2 text-xs text-ink-400">{ui.languagesHint}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-end">
              <label className="block">
                <span className="label">{ui.currency}</span>
                <select className="input" value={doc.currency} onChange={(e) => update({ currency: e.target.value })}>
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              {doc.languages.length > 1 && (
                <div>
                  <button type="button" onClick={translate} disabled={busy === "translate"} className="btn !w-full bg-gradient-to-r from-primary-600 to-coral-500 text-white shadow-md hover:opacity-95 sm:!w-auto">
                    {busy === "translate" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    {busy === "translate" ? ui.translating : ui.autoTranslate}
                  </button>
                  <p className="mt-1.5 text-xs text-ink-400">{ui.autoTranslateHint}</p>
                </div>
              )}
            </div>
          </Section>

          <Section icon={PencilLine} title={ui.sServices} aside={<span className="text-xs font-semibold text-ink-400">{fmt(ui.servicesCount, totalServices)}</span>}>
            <ServicesEditor
              categories={doc.categories}
              languages={doc.languages}
              locale={locale}
              ui={ui}
              totalServices={totalServices}
              onChange={(categories) => update({ categories })}
            />
          </Section>

          <Section icon={QrCode} title={ui.sQr}>
            <div className="space-y-2">
              {(
                [
                  ...(doc.qr.slug ? [["varaaai", ui.qrVaraaai] as const] : []),
                  ["custom", ui.qrCustom] as const,
                  ["none", ui.qrNone] as const,
                ] as const
              ).map(([mode, label]) => (
                <label key={mode} className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${doc.qr.mode === mode ? "border-primary-400 bg-primary-50" : "border-ink-100 hover:border-primary-200"}`}>
                  <input
                    type="radio"
                    name="qr-mode"
                    checked={doc.qr.mode === mode}
                    onChange={() =>
                      update((d) => ({
                        ...d,
                        qr: {
                          ...d.qr,
                          mode,
                          url: mode === "varaaai" && d.qr.slug ? `${window.location.origin}${d.languages[0] === routing.defaultLocale ? "" : `/${d.languages[0]}`}/b/${d.qr.slug}` : mode === "custom" && d.qr.mode === "varaaai" ? "" : d.qr.url,
                        },
                      }))
                    }
                    className="h-4 w-4 accent-primary-600"
                  />
                  <span className="font-medium text-ink-900">{label}</span>
                </label>
              ))}
            </div>
            {doc.qr.mode === "custom" && (
              <div className="mt-3">
                <input
                  className={`input ${qrInvalid ? "!border-berry-400" : ""}`}
                  value={doc.qr.url}
                  placeholder={ui.qrUrlPh}
                  inputMode="url"
                  maxLength={500}
                  onChange={(e) => update((d) => ({ ...d, qr: { ...d.qr, url: e.target.value } }))}
                />
                {qrInvalid && <p className="mt-1 text-xs font-medium text-berry-500">{ui.qrInvalid}</p>}
              </div>
            )}
            {doc.qr.mode === "varaaai" && <p className="mt-2 break-all text-xs text-ink-400">{doc.qr.url}</p>}
            {!ownsSalon && (
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 p-4 text-white">
                <p className="font-bold">{ui.qrPromoTitle}</p>
                <p className="mt-1 text-sm text-primary-100">{ui.qrPromoBody}</p>
                <Link href="/business/apply" onClick={() => track("cta_click")} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary-800 hover:bg-peach-100">
                  {ui.qrPromoCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </Section>

          <Section icon={Palette} title={ui.sDesign}>
            <span className="label">{ui.template}</span>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => update((d) => ({ ...d, template: t.id, color: TEMPLATE_DEFAULT_COLOR[t.id] }))}
                  className={`rounded-2xl border p-2 text-left transition-all ${doc.template === t.id ? "border-primary-500 ring-2 ring-primary-200" : "border-ink-100 hover:border-primary-200"}`}
                >
                  <span className="relative block h-16 overflow-hidden rounded-xl" style={{ background: t.id === "colorful" ? "#fff7f4" : t.swatch[0] }}>
                    {t.id === "colorful" && <span className="absolute inset-x-0 top-0 h-7" style={{ background: t.swatch[0] }} />}
                    <span className="absolute left-2 top-2 h-1.5 w-10 rounded-full" style={{ background: t.id === "colorful" ? "#ffffff" : t.swatch[2] }} />
                    <span className="absolute left-2 top-5 h-2 w-14 rounded-full" style={{ background: t.id === "colorful" ? "#ffffff" : t.swatch[1], opacity: 0.85 }} />
                    {[0, 1, 2].map((r) => (
                      <span key={r} className="absolute left-2 right-2 flex justify-between" style={{ top: 32 + r * 8 }}>
                        <span className="h-1 w-12 rounded-full" style={{ background: t.id === "colorful" ? "#1c2024" : t.swatch[1], opacity: 0.5 }} />
                        <span className="h-1 w-4 rounded-full" style={{ background: t.id === "colorful" ? "#1c2024" : t.swatch[1], opacity: 0.7 }} />
                      </span>
                    ))}
                  </span>
                  <span className="mt-1.5 block text-center text-xs font-semibold text-ink-900">{t.label}</span>
                </button>
              ))}
            </div>

            <span className="label mt-5">{ui.color}</span>
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
              <label className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-[conic-gradient(red,yellow,lime,cyan,blue,magenta,red)] shadow" title={ui.color}>
                <input type="color" value={doc.color} onChange={(e) => update({ color: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" />
              </label>
            </div>

            <span className="label mt-5">{ui.format}</span>
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

            <label className={`mt-5 flex items-start gap-3 rounded-2xl border border-ink-100 px-4 py-3 text-sm ${canHideFooter ? "cursor-pointer" : "opacity-80"}`}>
              <input
                type="checkbox"
                checked={doc.showFooter || !canHideFooter}
                disabled={!canHideFooter}
                onChange={(e) => update({ showFooter: e.target.checked })}
                className="mt-0.5 h-4 w-4 accent-primary-600"
              />
              <span>
                <span className="font-medium text-ink-900">{ui.showFooter}</span>
                {!canHideFooter && (
                  <span className="mt-0.5 block text-xs text-ink-400">
                    {ui.footerLocked}{" "}
                    <Link href="/business/apply" onClick={() => track("cta_click")} className="font-semibold text-primary-700 hover:underline">
                      → VaraaAi
                    </Link>
                  </span>
                )}
              </span>
            </label>
          </Section>

          <div className="sticky bottom-3 z-20 lg:hidden">{downloadButtons}</div>
        </div>

        {/* ---------------- preview column */}
        <div className={`min-w-0 ${mobileTab === "preview" ? "" : "hidden lg:block"}`}>
          <div className="lg:sticky lg:top-20">
            <div className="rounded-[26px] bg-gradient-to-b from-mist-100 to-mist-50 p-3 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <Eye className="h-4 w-4 text-primary-600" /> {ui.preview}
                </p>
                <p className="text-xs font-medium text-ink-400">
                  {formats.find((f) => f.id === doc.format)?.label}
                  {pages.length > 1 ? ` · ${pages.length}×` : ""}
                </p>
              </div>
              <div className="max-h-[calc(100vh-15rem)] overflow-y-auto overscroll-contain px-1 pb-2 pt-1 [scrollbar-width:thin] max-lg:max-h-none">
                {pages.length ? (
                  <PriceListPreview pages={pages} logo={logoImg} pageLabel={(n) => fmt(ui.pageOf, n)} />
                ) : (
                  <div className="flex h-72 items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 hidden lg:block">{downloadButtons}</div>
            <div className="mt-4 lg:hidden">{downloadButtons}</div>
          </div>
        </div>
      </div>

      {/* Branch chooser for owners with several salons */}
      {salonChoices && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink-900/50 p-4 sm:items-center" onClick={() => setSalonChoices(null)}>
          <div className="w-full max-w-md rounded-[26px] bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 font-bold text-ink-900">{ui.importFromSalon}</p>
            <div className="space-y-2">
              {salonChoices.map((s) => (
                <button key={s.id} type="button" onClick={() => applySalon(s)} className="flex w-full items-center justify-between gap-3 rounded-2xl border border-ink-100 px-4 py-3 text-left hover:border-primary-300 hover:bg-primary-50">
                  <span>
                    <span className="block font-semibold text-ink-900">{s.name}</span>
                    <span className="block text-xs text-ink-400">{s.address}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* After-download call to action */}
      {showCta && (
        <CtaModal title={ui.ctaTitle} body={ui.ctaBody} button={ui.ctaButton} close={ui.close} onClose={() => setShowCta(false)} onClick={() => track("cta_click")} />
      )}

      {toast && <Toast text={toast.text} tone={toast.tone} />}
    </div>
  );
}
