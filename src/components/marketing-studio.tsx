"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarClock,
  Check,
  Coins,
  Copy,
  Eye,
  FlaskConical,
  Gift,
  Heart,
  ImagePlus,
  Inbox,
  Link2,
  Loader2,
  Mail,
  MailOpen,
  Monitor,
  MousePointerClick,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Trash2,
  UserPlus,
  Users,
  UserRoundCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { marketingStudioStrings, type CampaignTemplate } from "@/lib/marketing-studio-strings";
import { EMAIL_COOLDOWN_BYPASS_POINTS, EMAIL_SENT_POINTS, SEGMENTS, type Segment } from "@/lib/marketing-segments";

type Counts = Record<Segment, { eligible: number; cooldown: number }>;

interface Content {
  subject: string;
  preheader: string;
  headline: string;
  message: string;
  imageId: string | null;
  ctaKind: "NONE" | "BOOK" | "URL";
  ctaLabel: string;
  ctaUrl: string;
  offerTitle: string;
  offerCode: string;
  offerExpires: string | null;
  segment: Segment;
  includeCooldown: boolean;
}

interface Campaign extends Omit<Content, "preheader" | "headline" | "ctaLabel" | "ctaUrl" | "offerTitle" | "offerCode"> {
  id: string;
  preheader: string | null;
  headline: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  offerTitle: string | null;
  offerCode: string | null;
  status: "SENT" | "SCHEDULED" | "SENDING" | "CANCELLED" | "FAILED";
  scheduledAt: string | null;
  sentAt: string | null;
  createdAt: string;
  recipientCount: number;
  openCount: number;
  clickCount: number;
}

const EMPTY: Content = {
  subject: "",
  preheader: "",
  headline: "",
  message: "",
  imageId: null,
  ctaKind: "BOOK",
  ctaLabel: "",
  ctaUrl: "",
  offerTitle: "",
  offerCode: "",
  offerExpires: null,
  segment: "ALL",
  includeCooldown: false,
};

const SEGMENT_ICONS: Record<Segment, LucideIcon> = {
  ALL: Users,
  RECENT: Sparkles,
  LAPSED: Heart,
  LOYAL: Star,
  NEW: UserPlus,
  MEMBERS: UserRoundCheck,
};

const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";

function pct(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

function tomorrowAt10() {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
  d.setHours(10, 0, 0, 0);
  const z = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(d.getHours())}:${z(d.getMinutes())}`;
}

/** Shrinks a photo to at most 1200px wide before upload (GIFs keep their animation). */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "image/gif") return file;
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / bmp.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.86));
}

function StepCard({ n, title, hint, children, S }: { n: number; title: string; hint?: string; children: React.ReactNode; S: ReturnType<typeof marketingStudioStrings> }) {
  return (
    <section className="rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)] sm:p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-sm font-bold text-[#e8d3a6]">
          {n}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08a3e]">{fill(S.step, { n })}</p>
          <h2 className="text-base font-bold text-ink-900">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children, right }: { label: string; hint?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between gap-2">
        <label className="text-xs font-semibold text-ink-700">{label}</label>
        {right}
      </div>
      {children}
      {hint && <p className="mt-1 text-[11px] text-ink-400">{hint}</p>}
    </div>
  );
}

const INPUT =
  "w-full rounded-2xl border border-ink-100 bg-mist-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";

/** The email as the customer will get it, refreshed as the owner types. */
function EmailPreview({
  html,
  subject,
  preheader,
  salonName,
  logoUrl,
  loading,
  S,
}: {
  html: string;
  subject: string;
  preheader: string;
  salonName: string;
  logoUrl: string | null;
  loading: boolean;
  S: ReturnType<typeof marketingStudioStrings>;
}) {
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const frame = useRef<HTMLIFrameElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(900);
  const [boxWidth, setBoxWidth] = useState(400);

  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setBoxWidth(e.contentRect.width));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const frameWidth = device === "mobile" ? 360 : 680;
  const scale = Math.min(1, (device === "mobile" ? boxWidth - 24 : boxWidth) / frameWidth);

  const measure = useCallback(() => {
    const doc = frame.current?.contentDocument;
    if (doc?.body) setHeight(doc.documentElement.scrollHeight);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <Eye className="h-4 w-4 text-primary-500" />
          {S.previewTitle}
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-300" />}
        </p>
        <div className="flex rounded-full bg-mist-50 p-1 ring-1 ring-ink-100">
          {(["mobile", "desktop"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                device === d ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-700"
              }`}
            >
              {d === "mobile" ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
              {d === "mobile" ? S.previewMobile : S.previewDesktop}
            </button>
          ))}
        </div>
      </div>

      {/* Inbox row */}
      <div className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-3">
        {logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
            {salonName.trim()[0]?.toUpperCase() ?? "S"}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-sm font-bold text-ink-900">{salonName}</p>
            <span className="shrink-0 text-[11px] text-ink-400">{S.previewNow}</span>
          </div>
          <p className="truncate text-[13px] font-semibold text-ink-900">{subject || "…"}</p>
          <p className="truncate text-xs text-ink-400">{preheader || "…"}</p>
        </div>
      </div>

      <div ref={box} className={device === "mobile" ? "rounded-[2.5rem] bg-[#1f182d] p-3 shadow-2xl" : "overflow-hidden rounded-2xl border border-ink-100 shadow-xl"}>
        {device === "mobile" && <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-white/20" />}
        <div
          className={`mx-auto overflow-hidden bg-[#f4f1f8] ${device === "mobile" ? "rounded-[1.75rem]" : ""}`}
          style={{ width: frameWidth * scale, height: Math.min(height, device === "mobile" ? 1400 : 2000) * scale }}
        >
          <iframe
            ref={frame}
            title={S.previewTitle}
            srcDoc={html}
            onLoad={measure}
            sandbox="allow-same-origin"
            className="origin-top-left border-0"
            style={{ width: frameWidth, height, transform: `scale(${scale})` }}
          />
        </div>
      </div>
    </div>
  );
}

export function MarketingStudio({
  locale,
  isOwner,
  initialCounts,
  salon,
}: {
  locale: string;
  isOwner: boolean;
  initialCounts: Counts;
  salon: { name: string; logoUrl: string | null };
}) {
  const S = marketingStudioStrings(locale);
  const [tab, setTab] = useState<"compose" | "campaigns">("compose");
  const [counts, setCounts] = useState<Counts>(initialCounts);
  const [points, setPoints] = useState<number | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [c, setC] = useState<Content>(EMPTY);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [offerOn, setOfferOn] = useState(false);
  const [mode, setMode] = useState<"now" | "later">("now");
  const [when, setWhen] = useState(tomorrowAt10);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [testing, setTesting] = useState(false);
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);
  const [preview, setPreview] = useState<{ html: string; subject: string }>({ html: "", subject: "" });
  const [previewLoading, setPreviewLoading] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [viewing, setViewing] = useState<{ html: string; subject: string; preheader: string } | null>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Content>(k: K, v: Content[K]) => setC((prev) => ({ ...prev, [k]: v }));

  const loadCampaigns = useCallback(async () => {
    const res = await fetch("/api/business/marketing/campaigns");
    if (res.ok) setCampaigns((await res.json()).campaigns);
  }, []);
  const loadCounts = useCallback(async () => {
    const res = await fetch("/api/business/marketing/recipients");
    if (res.ok) setCounts((await res.json()).segments);
  }, []);
  const loadPoints = useCallback(async () => {
    const res = await fetch("/api/business/vara");
    if (res.ok) setPoints((await res.json()).varaPoints);
  }, []);

  useEffect(() => {
    loadCampaigns();
    loadPoints();
  }, [loadCampaigns, loadPoints]);

  // What actually goes in the email: the offer only when switched on.
  const payload = useMemo(
    () => ({ ...c, offerTitle: offerOn ? c.offerTitle : "", offerCode: offerOn ? c.offerCode : "", offerExpires: offerOn ? c.offerExpires : null }),
    [c, offerOn]
  );

  // Live preview, a moment after the owner stops typing.
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setPreviewLoading(true);
      const res = await fetch("/api/business/marketing/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: payload }),
        signal: ctrl.signal,
      }).catch(() => null);
      if (res?.ok) setPreview(await res.json());
      setPreviewLoading(false);
    }, 450);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [payload]);

  const seg = counts[c.segment];
  const recipients = seg.eligible + (c.includeCooldown ? seg.cooldown : 0);
  const cost = seg.eligible * EMAIL_SENT_POINTS + (c.includeCooldown ? seg.cooldown * EMAIL_COOLDOWN_BYPASS_POINTS : 0);
  const left = points !== null ? points - cost : null;
  const ready = c.subject.trim() !== "" && c.message.trim() !== "";
  const canSend = isOwner && ready && recipients > 0 && (left === null || left >= 0);

  const sentCampaigns = (campaigns ?? []).filter((x) => x.status === "SENT");
  const totalSent = sentCampaigns.reduce((a, x) => a + x.recipientCount, 0);
  const tracked = sentCampaigns.filter((x) => x.sentAt);
  const avgOpen = pct(
    tracked.reduce((a, x) => a + x.openCount, 0),
    tracked.reduce((a, x) => a + x.recipientCount, 0)
  );
  const reach = counts.ALL.eligible + counts.ALL.cooldown;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  function insertName(target: "subject" | "message") {
    const el = target === "subject" ? subjectRef.current : messageRef.current;
    const value = c[target];
    const pos = el?.selectionStart ?? value.length;
    const next = `${value.slice(0, pos)}{ten}${value.slice(pos)}`;
    set(target, next);
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(pos + 5, pos + 5);
    });
  }

  function applyTemplate(t: CampaignTemplate) {
    setC((prev) => ({
      ...prev,
      subject: t.subject,
      preheader: t.preheader,
      headline: t.headline,
      message: t.message,
      offerTitle: t.offerTitle ?? "",
      ctaKind: "BOOK",
      ctaLabel: "",
    }));
    setOfferOn(!!t.offerTitle);
  }

  async function upload(file: File) {
    setUploading(true);
    setImageError(false);
    const form = new FormData();
    const blob = await shrink(file).catch(() => file);
    form.append("file", blob, file.name.replace(/\.\w+$/, blob.type === "image/gif" ? ".gif" : ".jpg"));
    const res = await fetch("/api/business/marketing/image", { method: "POST", body: form }).catch(() => null);
    setUploading(false);
    if (!res?.ok) return setImageError(true);
    const d = await res.json();
    set("imageId", d.id);
    setImageUrl(d.url);
  }

  async function sendTest() {
    setTesting(true);
    setFlash(null);
    const res = await fetch("/api/business/marketing/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: payload }),
    }).catch(() => null);
    setTesting(false);
    const d = await res?.json().catch(() => ({}));
    if (res?.ok) setFlash({ ok: true, text: fill(S.testSent, { email: d.to }) });
    else setFlash({ ok: false, text: res?.status === 429 ? S.testTooSoon : S.errGeneric });
  }

  async function send() {
    setBusy(true);
    setFlash(null);
    const res = await fetch("/api/business/marketing/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: payload, scheduleAt: mode === "later" ? new Date(when).toISOString() : null }),
    }).catch(() => null);
    setBusy(false);
    setConfirming(false);
    const d = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setFlash({
        ok: false,
        text:
          d?.error === "INSUFFICIENT_VARA_POINTS"
            ? fill(S.errInsufficient, { required: d.required, available: d.available })
            : d?.error === "NO_RECIPIENTS"
              ? S.errNoRecipients
              : d?.error === "INVALID_SCHEDULE"
                ? S.errSchedule
                : S.errGeneric,
      });
      return;
    }
    setFlash({ ok: true, text: d.scheduled ? S.scheduled : fill(S.sent, { n: d.sent }) });
    setC(EMPTY);
    setOfferOn(false);
    setImageUrl(null);
    setMode("now");
    loadCampaigns();
    loadCounts();
    loadPoints();
  }

  async function view(x: Campaign) {
    const res = await fetch("/api/business/marketing/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: toContent(x) }),
    }).catch(() => null);
    if (res?.ok) {
      const d = await res.json();
      setViewing({ html: d.html, subject: d.subject, preheader: x.preheader ?? "" });
    }
  }

  function toContent(x: Campaign): Content {
    return {
      subject: x.subject,
      preheader: x.preheader ?? "",
      headline: x.headline ?? "",
      message: x.message ?? "",
      imageId: x.imageId,
      ctaKind: x.ctaKind,
      ctaLabel: x.ctaLabel ?? "",
      ctaUrl: x.ctaUrl ?? "",
      offerTitle: x.offerTitle ?? "",
      offerCode: x.offerCode ?? "",
      offerExpires: x.offerExpires,
      segment: x.segment,
      includeCooldown: false,
    };
  }

  function reuse(x: Campaign) {
    setC(toContent(x));
    setOfferOn(!!(x.offerTitle || x.offerCode));
    setImageUrl(x.imageId ? `/api/marketing-image/${x.imageId}` : null);
    setTab("compose");
    top.current?.scrollIntoView({ behavior: "smooth" });
  }

  async function cancelSchedule(id: string) {
    const res = await fetch(`/api/business/marketing/campaigns/${id}`, { method: "DELETE" });
    if (res.ok) loadCampaigns();
  }

  const previewPanel = (
    <EmailPreview
      html={preview.html}
      subject={preview.subject}
      preheader={c.preheader || c.message.split("\n")[0]}
      salonName={salon.name}
      logoUrl={salon.logoUrl}
      loading={previewLoading}
      S={S}
    />
  );

  const STATUS_STYLE: Record<Campaign["status"], string> = {
    SENT: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    SCHEDULED: "bg-amber-50 text-amber-700 ring-amber-200",
    SENDING: "bg-primary-100 text-primary-700 ring-primary-200",
    CANCELLED: "bg-ink-100 text-ink-400 ring-ink-100",
    FAILED: "bg-berry-50 text-berry-500 ring-berry-100",
  };

  return (
    <div ref={top} className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
            <Mail className="h-4 w-4" />
            {S.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{S.sub}</p>

          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Users, label: S.statReach, value: reach.toLocaleString(locale) },
              { icon: Coins, label: S.statPoints, value: points === null ? "…" : points.toLocaleString(locale), href: "#vara-points", link: S.earnPoints },
              { icon: Send, label: S.statSent, value: totalSent.toLocaleString(locale) },
              { icon: MailOpen, label: S.statOpen, value: `${avgOpen}%` },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 backdrop-blur">
                <s.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 text-2xl font-bold tabular-nums">{s.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{s.label}</p>
                {s.href && (
                  <a href={s.href} className="mt-1 inline-block text-[11px] font-semibold text-[#e8d3a6] underline-offset-2 hover:underline">
                    {s.link} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 rounded-full bg-white p-1 shadow-sm ring-1 ring-ink-100 sm:inline-flex">
        {(["compose", "campaigns"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-5 ${
              tab === k ? "bg-[#1f182d] text-white shadow" : "text-ink-400 hover:text-ink-900"
            }`}
          >
            {k === "compose" ? <Sparkles className="h-4 w-4" /> : <Inbox className="h-4 w-4" />}
            {k === "compose" ? S.tabCompose : S.tabCampaigns}
            {k === "campaigns" && campaigns && campaigns.length > 0 && (
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${tab === k ? "bg-white/15" : "bg-mist-50"}`}>{campaigns.length}</span>
            )}
          </button>
        ))}
      </div>

      {flash && (
        <div
          className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${
            flash.ok ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-berry-50 text-berry-500 ring-1 ring-berry-100"
          }`}
        >
          {flash.ok ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
          <span className="flex-1">{flash.text}</span>
          <button type="button" onClick={() => setFlash(null)} aria-label={S.close}>
            <X className="h-4 w-4 opacity-60" />
          </button>
        </div>
      )}

      {tab === "compose" ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px]">
          <div className="min-w-0 space-y-5">
            {!isOwner && (
              <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">{S.readOnly}</p>
            )}

            {/* 1. Audience */}
            <StepCard n={1} title={S.audienceTitle} hint={S.audienceHint} S={S}>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SEGMENTS.map((s) => {
                  const Icon = SEGMENT_ICONS[s];
                  const on = c.segment === s;
                  const n = counts[s].eligible + counts[s].cooldown;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setC((prev) => ({ ...prev, segment: s, includeCooldown: false }))}
                      className={`group relative rounded-2xl border p-3.5 text-left transition ${
                        on
                          ? "border-primary-400 bg-gradient-to-br from-primary-100/70 to-white ring-2 ring-primary-200"
                          : "border-ink-100 bg-white hover:border-primary-200 hover:bg-mist-50/50"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${on ? "bg-primary-500 text-white" : "bg-mist-50 text-primary-500"}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        {on && <Check className="h-4 w-4 text-primary-500" />}
                      </span>
                      <span className="mt-2.5 block text-sm font-bold text-ink-900">{S.segments[s][0]}</span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-ink-400">{S.segments[s][1]}</span>
                      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${n > 0 ? "bg-[#fbf3e1] text-[#8a6a2b]" : "bg-ink-100 text-ink-400"}`}>
                        {n === 1 ? S.customersOne : fill(S.customers, { n })}
                      </span>
                    </button>
                  );
                })}
              </div>
              {seg.cooldown > 0 && (
                <div className="mt-4 rounded-2xl bg-mist-50/70 p-3.5 text-xs text-ink-700 ring-1 ring-ink-100">
                  <p>{fill(S.cooldownNote, { n: seg.cooldown })}</p>
                  <label className="mt-2 flex items-center gap-2 font-semibold">
                    <input
                      type="checkbox"
                      checked={c.includeCooldown}
                      onChange={(e) => set("includeCooldown", e.target.checked)}
                      className="h-4 w-4 rounded border-ink-200 accent-primary-500"
                    />
                    {fill(S.includeCooldown, { n: seg.cooldown, p: EMAIL_COOLDOWN_BYPASS_POINTS })}
                  </label>
                </div>
              )}
            </StepCard>

            {/* 2. Templates + content */}
            <StepCard n={2} title={S.contentTitle} S={S}>
              <p className="text-xs font-semibold text-ink-700">{S.templatesTitle}</p>
              <p className="text-[11px] text-ink-400">{S.templatesHint}</p>
              <div className="-mx-1 mt-2.5 flex gap-2 overflow-x-auto px-1 pb-2">
                {S.templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => applyTemplate(t)}
                    className="flex shrink-0 items-center gap-2 rounded-2xl border border-ink-100 bg-gradient-to-b from-white to-mist-50/60 px-3.5 py-2.5 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-[#d9b25c] hover:shadow-md"
                  >
                    <span className="text-lg leading-none">{t.emoji}</span>
                    {t.name}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-4">
                <Field
                  label={S.subject}
                  right={
                    <span className="flex items-center gap-2">
                      <button type="button" onClick={() => insertName("subject")} className="rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-200">
                        + {S.insertName}
                      </button>
                      <span className={`text-[11px] tabular-nums ${c.subject.length > 70 ? "text-amber-600" : "text-ink-300"}`}>{c.subject.length}/150</span>
                    </span>
                  }
                >
                  <input ref={subjectRef} value={c.subject} onChange={(e) => set("subject", e.target.value)} maxLength={150} placeholder={S.subjectPh} className={INPUT} />
                </Field>
                <Field label={S.preheader}>
                  <input value={c.preheader} onChange={(e) => set("preheader", e.target.value)} maxLength={200} placeholder={S.preheaderPh} className={INPUT} />
                </Field>
                <Field label={S.headline}>
                  <input value={c.headline} onChange={(e) => set("headline", e.target.value)} maxLength={160} placeholder={S.headlinePh} className={INPUT} />
                </Field>
                <Field
                  label={S.message}
                  hint={S.nameHint}
                  right={
                    <button type="button" onClick={() => insertName("message")} className="rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-bold text-primary-700 hover:bg-primary-200">
                      + {S.insertName}
                    </button>
                  }
                >
                  <textarea ref={messageRef} value={c.message} onChange={(e) => set("message", e.target.value)} maxLength={5000} rows={8} placeholder={S.messagePh} className={`${INPUT} resize-y leading-relaxed`} />
                </Field>

                <Field label={S.image} hint={S.imageHint}>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) upload(f);
                      e.target.value = "";
                    }}
                  />
                  {imageUrl ? (
                    <div className="relative overflow-hidden rounded-2xl border border-ink-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="" className="max-h-56 w-full object-cover" />
                      <div className="absolute right-2 top-2 flex gap-1.5">
                        <button type="button" onClick={() => fileRef.current?.click()} className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink-900 shadow backdrop-blur">
                          {S.imageChange}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            set("imageId", null);
                            setImageUrl(null);
                          }}
                          aria-label={S.imageRemove}
                          className="rounded-full bg-white/90 p-1.5 text-berry-500 shadow backdrop-blur"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading || !isOwner}
                      className="flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-ink-100 bg-mist-50/40 py-7 text-sm font-semibold text-ink-400 transition hover:border-primary-300 hover:text-primary-600 disabled:opacity-60"
                    >
                      {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
                      {S.imageAdd}
                    </button>
                  )}
                  {imageError && <p className="mt-1.5 text-xs text-berry-500">{S.imageError}</p>}
                </Field>
              </div>
            </StepCard>

            {/* 3. Offer + button */}
            <StepCard n={3} title={S.offerTitle} S={S}>
              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#fffaf0] to-[#f8eedb] p-4 ring-1 ring-[#ecd9ad]">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#b08a3e] shadow-sm">
                    <Gift className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-900">{S.offerToggle}</span>
                    <span className="block text-[11px] text-[#8a6a2b]">{S.offerToggleHint}</span>
                  </span>
                </span>
                <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${offerOn ? "bg-[#c99a3f]" : "bg-ink-100"}`}>
                  <input type="checkbox" checked={offerOn} onChange={(e) => setOfferOn(e.target.checked)} className="sr-only" />
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${offerOn ? "left-[22px]" : "left-0.5"}`} />
                </span>
              </label>
              {offerOn && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label={S.offerName}>
                      <input value={c.offerTitle} onChange={(e) => set("offerTitle", e.target.value)} maxLength={80} placeholder={S.offerNamePh} className={INPUT} />
                    </Field>
                  </div>
                  <Field label={S.offerCode}>
                    <input
                      value={c.offerCode}
                      onChange={(e) => set("offerCode", e.target.value.toUpperCase().replace(/\s+/g, ""))}
                      maxLength={40}
                      placeholder="VIP20"
                      className={`${INPUT} font-mono tracking-widest`}
                    />
                  </Field>
                  <Field label={S.offerExpires}>
                    <input type="date" value={c.offerExpires ?? ""} onChange={(e) => set("offerExpires", e.target.value || null)} className={INPUT} />
                  </Field>
                </div>
              )}

              <div className="mt-5">
                <p className="mb-1.5 text-xs font-semibold text-ink-700">{S.cta}</p>
                <div className="grid grid-cols-3 gap-1 rounded-2xl bg-mist-50 p-1 ring-1 ring-ink-100">
                  {(["BOOK", "URL", "NONE"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => set("ctaKind", k)}
                      className={`rounded-xl px-2 py-2 text-xs font-semibold transition ${c.ctaKind === k ? "bg-white text-ink-900 shadow-sm" : "text-ink-400 hover:text-ink-700"}`}
                    >
                      {k === "BOOK" ? S.ctaBook : k === "URL" ? S.ctaUrl : S.ctaNone}
                    </button>
                  ))}
                </div>
                {c.ctaKind !== "NONE" && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label={S.ctaLabel}>
                      <input
                        value={c.ctaLabel}
                        onChange={(e) => set("ctaLabel", e.target.value)}
                        maxLength={60}
                        placeholder={c.ctaKind === "URL" ? S.ctaLabelUrl : S.ctaLabelBook}
                        className={INPUT}
                      />
                    </Field>
                    {c.ctaKind === "URL" && (
                      <Field label="URL">
                        <div className="relative">
                          <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                          <input value={c.ctaUrl} onChange={(e) => set("ctaUrl", e.target.value)} maxLength={500} placeholder="https://" className={`${INPUT} pl-10`} />
                        </div>
                      </Field>
                    )}
                  </div>
                )}
              </div>
            </StepCard>

            {/* 4. Send */}
            <StepCard n={4} title={S.sendTitle} S={S}>
              <div className="grid grid-cols-2 gap-2">
                {(["now", "later"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                      mode === m ? "border-primary-400 bg-primary-100/60 text-primary-700 ring-2 ring-primary-200" : "border-ink-100 text-ink-400 hover:text-ink-700"
                    }`}
                  >
                    {m === "now" ? <Send className="h-4 w-4" /> : <CalendarClock className="h-4 w-4" />}
                    {m === "now" ? S.sendNow : S.schedule}
                  </button>
                ))}
              </div>
              {mode === "later" && (
                <div className="mt-3">
                  <Field label={S.scheduleAt} hint={S.scheduleHint}>
                    <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className={INPUT} />
                  </Field>
                </div>
              )}

              <dl className="mt-4 grid grid-cols-3 divide-x divide-ink-100 rounded-2xl bg-mist-50/60 py-3 text-center ring-1 ring-ink-100">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.recipients}</dt>
                  <dd className="mt-1 text-lg font-bold text-ink-900">{recipients}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.cost}</dt>
                  <dd className="mt-1 text-lg font-bold text-ink-900">{cost}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.balance}</dt>
                  <dd className={`mt-1 text-lg font-bold ${left !== null && left < 0 ? "text-berry-500" : "text-ink-900"}`}>{left ?? "…"}</dd>
                </div>
              </dl>
              {left !== null && left < 0 && (
                <p className="mt-2 text-xs font-medium text-berry-500">{fill(S.errInsufficient, { required: cost, available: points ?? 0 })}</p>
              )}
              {!ready && <p className="mt-2 text-xs text-ink-400">{S.missing}</p>}

              {confirming ? (
                <div className="mt-4 rounded-2xl bg-[#1f182d] p-4 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8d3a6]">{S.confirmTitle}</p>
                  <p className="mt-1.5 text-sm text-white/80">
                    {mode === "now"
                      ? fill(S.confirmNow, { n: recipients, cost })
                      : fill(S.confirmLater, { n: recipients, cost, time: dateFmt.format(new Date(when)) })}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={send} disabled={busy} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-70 ${GOLD_BTN}`}>
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      {mode === "now" ? S.confirm : S.confirmSchedule}
                    </button>
                    <button type="button" onClick={() => setConfirming(false)} disabled={busy} className="rounded-full px-4 py-2.5 text-sm font-semibold text-white/70 ring-1 ring-white/20 hover:text-white">
                      {S.cancel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    disabled={!canSend}
                    onClick={() => setConfirming(true)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-45 ${GOLD_BTN}`}
                  >
                    {mode === "now" ? <Send className="h-4 w-4" /> : <CalendarClock className="h-4 w-4" />}
                    {fill(mode === "now" ? S.sendBtn : S.scheduleBtn, { n: recipients })}
                  </button>
                  <button
                    type="button"
                    onClick={sendTest}
                    disabled={!isOwner || !ready || testing}
                    className="flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-mist-50 disabled:opacity-45"
                  >
                    {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FlaskConical className="h-4 w-4" />}
                    {S.testSend}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobilePreview(true)}
                    className="flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-200 lg:hidden"
                  >
                    <Eye className="h-4 w-4" />
                    {S.previewOpen}
                  </button>
                </div>
              )}
            </StepCard>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 rounded-3xl border border-ink-100 bg-gradient-to-b from-white to-mist-50/60 p-4">{previewPanel}</div>
          </aside>
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns === null ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-ink-300" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Mail className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
              <button type="button" onClick={() => setTab("compose")} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                <Sparkles className="h-4 w-4" />
                {S.tabCompose}
              </button>
            </div>
          ) : (
            <>
              {campaigns.map((x) => {
                const openP = pct(x.openCount, x.recipientCount);
                const clickP = pct(x.clickCount, x.recipientCount);
                const time = x.status === "SCHEDULED" && x.scheduledAt ? x.scheduledAt : x.sentAt ?? x.createdAt;
                return (
                  <article key={x.id} className="rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)]">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${STATUS_STYLE[x.status] ?? STATUS_STYLE.SENT}`}>
                            {S[`status${x.status}` as "statusSENT"] ?? x.status}
                          </span>
                          <span className="rounded-full bg-mist-50 px-2.5 py-0.5 text-[11px] font-semibold text-ink-400">{S.segments[x.segment]?.[0] ?? x.segment}</span>
                          <span className="text-[11px] text-ink-400" suppressHydrationWarning>
                            {fill(x.status === "SCHEDULED" ? S.scheduledFor : S.sentOn, { time: dateFmt.format(new Date(time)) })}
                          </span>
                        </div>
                        <p className="mt-2 truncate text-base font-bold text-ink-900">{x.subject}</p>
                        {x.headline && <p className="truncate text-sm text-ink-400">{x.headline}</p>}
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <button type="button" onClick={() => view(x)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
                          <Eye className="h-3.5 w-3.5" />
                          {S.view}
                        </button>
                        {isOwner && (
                          <button type="button" onClick={() => reuse(x)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100/50">
                            <Copy className="h-3.5 w-3.5" />
                            {S.reuse}
                          </button>
                        )}
                        {isOwner && x.status === "SCHEDULED" && (
                          <button type="button" onClick={() => cancelSchedule(x.id)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-berry-500 ring-1 ring-berry-100 hover:bg-berry-50">
                            <X className="h-3.5 w-3.5" />
                            {S.cancelSchedule}
                          </button>
                        )}
                      </div>
                    </div>
                    {x.status === "SENT" && (
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                          { icon: Users, label: S.recipients, value: x.recipientCount, bar: null },
                          { icon: MailOpen, label: S.opens, value: `${x.openCount} · ${openP}%`, bar: openP },
                          { icon: MousePointerClick, label: S.clicks, value: `${x.clickCount} · ${clickP}%`, bar: clickP },
                        ].map((s) => (
                          <div key={s.label} className="rounded-2xl bg-mist-50/60 p-3 ring-1 ring-ink-100">
                            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                              <s.icon className="h-3.5 w-3.5" />
                              {s.label}
                            </p>
                            <p className="mt-1 text-base font-bold tabular-nums text-ink-900">{s.value}</p>
                            {s.bar !== null && (
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-100">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" style={{ width: `${Math.max(s.bar, 2)}%` }} />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
              <p className="px-1 text-[11px] text-ink-400">{S.trackingNote}</p>
            </>
          )}
        </div>
      )}

      {/* Phone-sized preview sheet, and a sent campaign's preview */}
      {(mobilePreview || viewing) && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => (setMobilePreview(false), setViewing(null))}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white p-4 sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex justify-end">
              <button type="button" onClick={() => (setMobilePreview(false), setViewing(null))} aria-label={S.close} className="rounded-full p-2 text-ink-400 hover:bg-mist-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            {viewing ? (
              <EmailPreview html={viewing.html} subject={viewing.subject} preheader={viewing.preheader} salonName={salon.name} logoUrl={salon.logoUrl} loading={false} S={S} />
            ) : (
              previewPanel
            )}
          </div>
        </div>
      )}
    </div>
  );
}
