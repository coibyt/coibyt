"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  BookOpen,
  Camera,
  CameraOff,
  Check,
  ChevronRight,
  Crown,
  ExternalLink,
  Gift,
  Lightbulb,
  Loader2,
  LogOut,
  Mail,
  Plus,
  QrCode,
  Search,
  Settings2,
  Sparkles,
  Stamp,
  Trash2,
  UserRound,
  Users,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";
import { LiteMemberCard } from "@/components/loyalty-lite/member-card";
import { LiteProfilePanel } from "@/components/loyalty-lite/profile-panel";
import { LiteTrialSave } from "@/components/loyalty-lite/trial-save";

export interface LiteCardRow {
  id: string;
  token: string;
  customerName: string;
  customerEmail: string | null;
  stamps: number;
  totalStamps: number;
  rewardsUsed: number;
  lastStampAt: string | null;
  createdAt: string;
  /** The trial's sample card: not a real customer. */
  sample: boolean;
}

type Tab = "cards" | "guide" | "profile";
/** Which section a message belongs to — it shows inside that section. */
type Area = "scan" | "new" | "program" | "cards";
type Flash = { ok: boolean; text: string } | null;

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));

/** BarcodeDetector isn't in TypeScript's DOM types yet. */
type Detector = { detect: (src: HTMLVideoElement) => Promise<{ rawValue: string }[]> };
type DetectorCtor = new (o: { formats: string[] }) => Detector;

/** Loyalty Lite's studio (/loyalty-lite/studio): scan and stamp, give cards,
 * the customer list, the stamp card's settings, a guide and the upgrade. */
export function LiteStudio({
  locale,
  t,
  initial,
  cardBase,
  maxCards,
  stamps30,
  role,
  staffName,
  account,
  trialFreeCards,
}: {
  locale: string;
  t: LiteStrings;
  /** email null: a trial that hasn't saved itself yet. */
  initial: { salonName: string; email: string | null; stampsRequired: number; rewardText: string; upgraded: boolean; cards: LiteCardRow[] };
  /** The card page URL without the token. */
  cardBase: string;
  maxCards: number;
  stamps30: number;
  /** Staff scan, stamp and give cards; the program, deleting and Profile are the owner's. */
  role: "owner" | "staff";
  staffName: string | null;
  account: { ownerName: string; hasPassword: boolean };
  /** Real cards a trial may give before it saves an email. */
  trialFreeCards: number;
}) {
  const isOwner = role === "owner";
  const [savedEmail, setSavedEmail] = useState(initial.email);
  const [trialUrgent, setTrialUrgent] = useState(false);
  const trialRef = useRef<HTMLDivElement>(null);
  const trial = isOwner && !savedEmail;
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("cards");
  const [area, setArea] = useState<Area>("scan");
  const [salon, setSalon] = useState({ salonName: initial.salonName, stampsRequired: initial.stampsRequired, rewardText: initial.rewardText });
  const [cards, setCards] = useState<LiteCardRow[]>(initial.cards);
  const [stampCount, setStampCount] = useState(stamps30);
  const [busy, setBusy] = useState<string | null>(null);
  const [flash, setFlash] = useState<Flash>(null);
  const N = salon.stampsRequired;
  const labels = (c: { stamps: number }) => ({ member: t.cardMember, code: t.cardCode, reward: t.cardReward, progress: fill(t.cardProgress, { n: Math.min(c.stamps, N), total: N }) });

  // Scan
  const [code, setCode] = useState("");
  const [found, setFound] = useState<LiteCardRow | null>(null);
  const [camera, setCamera] = useState(false);
  const [canDetect, setCanDetect] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // New card
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created, setCreated] = useState<{ card: LiteCardRow; qr: string } | null>(null);

  // List
  const [q, setQ] = useState("");

  useEffect(() => {
    setCanDetect(typeof window !== "undefined" && "BarcodeDetector" in window && !!navigator.mediaDevices?.getUserMedia);
    return () => streamRef.current?.getTracks().forEach((tr) => tr.stop());
  }, []);

  function upsert(card: LiteCardRow) {
    setCards((list) => [card, ...list.filter((c) => c.id !== card.id)]);
    setFound((f) => (f && f.id === card.id ? card : f));
  }

  async function lookup(value: string) {
    setBusy("lookup");
    setArea("scan");
    setFlash(null);
    const res = await fetch("/api/loyalty-lite/lookup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code: value }) }).catch(() => null);
    setBusy(null);
    if (res?.status === 401) return router.refresh();
    if (!res?.ok) {
      setFound(null);
      setFlash({ ok: false, text: t.notFound });
      return;
    }
    setFound((await res.json()).card);
  }

  async function act(card: LiteCardRow, action: "stamp" | "redeem" | "resend", where: Area = "cards") {
    setBusy(`${action}-${card.id}`);
    setArea(where);
    setFlash(null);
    const res = await fetch(`/api/loyalty-lite/cards/${card.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      setFlash({ ok: false, text: d?.error === "TOO_SOON" ? t.tooSoon : d?.error === "REWARD_READY" ? t.rewardFirst : t.errGeneric });
      return;
    }
    if (action === "resend") return setFlash({ ok: true, text: t.resent });
    upsert(d.card);
    if (action === "stamp") {
      setStampCount((n) => n + 1);
      setFlash({ ok: true, text: d.ready ? fill(t.stampedReady, { reward: salon.rewardText }) : fill(t.stamped, { n: d.stamps, total: N }) });
    } else {
      setFlash({ ok: true, text: t.redeemed });
    }
  }

  async function startCamera() {
    setArea("scan");
    setFlash(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      setCamera(true);
      requestAnimationFrame(async () => {
        const v = videoRef.current;
        if (!v) return;
        v.srcObject = stream;
        await v.play().catch(() => {});
        const detector = new (window as unknown as { BarcodeDetector: DetectorCtor }).BarcodeDetector({ formats: ["qr_code"] });
        const tick = async () => {
          if (!streamRef.current) return;
          const codes = await detector.detect(v).catch(() => []);
          if (codes[0]?.rawValue) {
            stopCamera();
            setCode(codes[0].rawValue.split("/").pop() ?? "");
            lookup(codes[0].rawValue);
            return;
          }
          setTimeout(tick, 250);
        };
        tick();
      });
    } catch {
      setFlash({ ok: false, text: t.scanNoCamera });
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    setCamera(false);
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy("create");
    setArea("new");
    setFlash(null);
    const res = await fetch("/api/loyalty-lite/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: name, customerEmail: email }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      if (d?.error === "NEED_EMAIL") {
        // The trial's free cards are used: save the salon first.
        setTrialUrgent(true);
        trialRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setFlash({ ok: false, text: fill(t.trialNeed, { max: trialFreeCards }) });
        return;
      }
      setFlash({ ok: false, text: d?.error === "LIMIT" ? t.limit : d?.error === "DUPLICATE" ? t.duplicate : t.errGeneric });
      return;
    }
    upsert(d.card);
    const qr = await QRCode.toDataURL(cardBase + d.card.token, { width: 360, margin: 1, color: { dark: "#1f182d", light: "#ffffff" } });
    setCreated({ card: d.card, qr });
    setFlash({ ok: true, text: fill(d.emailed ? t.createdEmailed : t.created, { name: d.card.customerName }) });
    setName("");
    setEmail("");
  }

  async function saveProgram(e: React.FormEvent) {
    e.preventDefault();
    setBusy("program");
    setArea("program");
    setFlash(null);
    const res = await fetch("/api/loyalty-lite/program", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(salon) }).catch(() => null);
    setBusy(null);
    setFlash(res?.ok ? { ok: true, text: t.saved } : { ok: false, text: t.errGeneric });
    if (res?.ok) setSalon(await res.json());
  }

  async function remove(card: LiteCardRow) {
    if (!confirm(fill(t.removeConfirm, { name: card.customerName }))) return;
    setBusy(`del-${card.id}`);
    await fetch(`/api/loyalty-lite/cards/${card.id}`, { method: "DELETE" }).catch(() => null);
    setBusy(null);
    setCards((list) => list.filter((c) => c.id !== card.id));
  }

  async function signOut() {
    // A trial lives only in this browser until it's saved.
    if (trial && !confirm(t.trialSignOut)) return;
    await fetch("/api/loyalty-lite/logout", { method: "POST" }).catch(() => null);
    router.push("/loyalty-lite");
    router.refresh();
  }

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? cards.filter((c) => [c.customerName, c.customerEmail ?? "", c.token].some((x) => x.toLowerCase().includes(s))) : cards;
  }, [cards, q]);
  const ready = cards.filter((c) => c.stamps >= N).length;
  const redeemed = cards.reduce((sum, c) => sum + c.rewardsUsed, 0);
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });
  const upgradeHref = `/business/apply?name=${encodeURIComponent(salon.salonName)}&email=${encodeURIComponent(savedEmail ?? "")}`;
  const realCards = cards.filter((c) => !c.sample).length;

  const tabs: { key: Tab; label: string; icon: typeof Stamp }[] = [
    { key: "cards", label: t.tabCards, icon: Users },
    { key: "guide", label: t.tabGuide, icon: BookOpen },
    ...(isOwner ? [{ key: "profile" as const, label: t.tabProfile, icon: UserRound }] : []),
  ];

  const field = "mt-1 h-11 w-full rounded-2xl border border-[#f3c4dd] bg-white px-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-[#d6337f] focus:outline-none focus:ring-4 focus:ring-[#d6337f]/15";
  const gold = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_-14px_rgba(163,21,95,0.9)] transition hover:brightness-105 disabled:opacity-60";
  const dark = "inline-flex items-center justify-center gap-2 rounded-full bg-[#a3155f] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#7a1d55] disabled:opacity-60";

  function Flash({ at }: { at: Area }) {
    if (!flash || area !== at) return null;
    return (
      <p role="status" className={`mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${flash.ok ? "bg-emerald-50 text-emerald-800" : "bg-berry-50 text-berry-700"}`}>
        {flash.ok ? <Check className="h-4 w-4 shrink-0" /> : null}
        {flash.text}
      </p>
    );
  }

  /** A section's title with its icon. */
  function Head({ icon: Icon, title, sub }: { icon: typeof Stamp; title: string; sub: string }) {
    return (
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e0559b] to-[#a3155f] text-[#ffe3f1]">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-serif text-2xl leading-tight text-ink-900">{title}</p>
          <p className="mt-1 text-sm text-ink-400">{sub}</p>
        </div>
      </div>
    );
  }

  function CardActions({ card, where }: { card: LiteCardRow; where: Area }) {
    const full = card.stamps >= N;
    return (
      <div className="flex flex-wrap gap-2">
        {full ? (
          <button type="button" disabled={!!busy} onClick={() => act(card, "redeem", where)} className={gold}>
            {busy === `redeem-${card.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gift className="h-4 w-4" />}
            {t.redeem}
          </button>
        ) : (
          <button type="button" disabled={!!busy} onClick={() => act(card, "stamp", where)} className={dark}>
            {busy === `stamp-${card.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Stamp className="h-4 w-4 text-[#ffe3f1]" />}
            {t.stamp}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#e0559b] via-[#c42d7f] to-[#8e1d6d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(163,21,95,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#ffd1e8]/30 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#ffe3f1]">
              <Stamp className="h-4 w-4" />
              {t.studioEyebrow}
            </p>
            {staffName && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
                <UserRound className="h-3 w-3" />
                {fill(t.staffBadge, { name: staffName })}
              </p>
            )}
            <h1 className="mt-2 truncate font-serif text-3xl sm:text-4xl">{salon.salonName}</h1>
            <p className="mt-1 text-sm text-white/60">
              {fill(t.programLine, { n: N, reward: salon.rewardText })}
            </p>
          </div>
          <button type="button" onClick={signOut} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/20">
            <LogOut className="h-3.5 w-3.5" />
            {t.signOut}
          </button>
        </div>
        <dl className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            [t.statCards, `${realCards}`, `/${(trial ? trialFreeCards : maxCards).toLocaleString(locale)}`],
            [t.statStamps, `${stampCount}`, ""],
            [t.statReady, `${ready}`, ""],
            [t.statRewards, `${redeemed}`, ""],
          ].map(([k, v, suffix]) => (
            <div key={k} className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">
              <dt className="text-[11px] text-white/55">{k}</dt>
              <dd className="mt-0.5 text-2xl font-bold">
                {v}
                <span className="text-sm font-semibold text-white/40">{suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {trial && (
        <LiteTrialSave
          ref={trialRef}
          t={t}
          salonName={salon.salonName}
          used={realCards}
          max={trialFreeCards}
          urgent={trialUrgent || realCards >= trialFreeCards}
          onSaved={(v) => {
            setSavedEmail(v.email);
            setSalon((s) => ({ ...s, salonName: v.salonName }));
            setTrialUrgent(false);
            setArea("new");
            setFlash({ ok: true, text: fill(t.trialSaved, { email: v.email }) });
            router.refresh();
          }}
        />
      )}

      {initial.upgraded && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-emerald-50 p-5 ring-1 ring-emerald-200">
          <div>
            <p className="font-bold text-emerald-900">{t.upgradedTitle}</p>
            <p className="text-sm text-emerald-800">{t.upgradedText}</p>
          </div>
          <Link href="/business/dashboard/loyalty" className={dark}>
            {t.upgradedCta}
          </Link>
        </section>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
            <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
              <Head icon={QrCode} title={t.scanTitle} sub={t.scanSub} />
              {canDetect ? (
                <div className="mt-4">
                  {camera ? (
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-3xl bg-black">
                        <video ref={videoRef} playsInline muted className="aspect-square w-full object-cover sm:aspect-video" />
                        <div className="pointer-events-none absolute inset-[18%] rounded-3xl border-2 border-[#e8d3a6] shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]" />
                      </div>
                      <button type="button" onClick={stopCamera} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500">
                        <CameraOff className="h-4 w-4" />
                        {t.scanStop}
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={startCamera} className={`${dark} w-full py-3.5`}>
                      <Camera className="h-5 w-5 text-[#ffe3f1]" />
                      {t.scanCamera}
                    </button>
                  )}
                </div>
              ) : (
                <p className="mt-4 flex gap-2 rounded-2xl bg-[#fdf2f8] p-3.5 text-xs leading-relaxed text-[#7a1d55]">
                  <Camera className="mt-px h-4 w-4 shrink-0 text-[#c42d7f]" />
                  {t.scanNoCamera}
                </p>
              )}
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  lookup(code);
                }}
              >
                <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder={t.codePh} className={`${field} mt-0 font-mono tracking-wider`} />
                <button type="submit" disabled={!code.trim() || !!busy} className={`${gold} shrink-0`}>
                  {busy === "lookup" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="hidden sm:inline">{t.find}</span>
                </button>
              </form>

              <Flash at="scan" />
              {found && (
                <div className="mt-6 grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <LiteMemberCard salonName={salon.salonName} customerName={found.customerName} token={found.token} stamps={found.stamps} required={N} reward={salon.rewardText} labels={labels(found)} compact />
                  <div className="space-y-3">
                    <p className="text-lg font-bold text-ink-900">{found.customerName}</p>
                    {found.customerEmail && <p className="text-sm text-ink-400">{found.customerEmail}</p>}
                    <p className={`text-sm font-semibold ${found.stamps >= N ? "text-emerald-700" : "text-ink-700"}`}>
                      {found.stamps >= N ? t.ready : fill(t.stampsOf, { n: found.stamps, total: N })}
                    </p>
                    <CardActions card={found} where="scan" />
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
              <Head icon={Plus} title={t.newTitle} sub={t.newSub} />
              <form onSubmit={create} className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-bold text-ink-700">
                  {t.customerName}
                  <input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className={field} />
                </label>
                <label className="block text-xs font-bold text-ink-700">
                  {t.customerEmail}
                  <input type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={!!busy || cards.length >= maxCards} className={gold}>
                    {busy === "create" ? <Loader2 className="h-4 w-4 animate-spin" /> : email ? <Mail className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    {email ? t.create : t.createNoEmail}
                  </button>
                </div>
              </form>
              <Flash at="new" />
              {created && (
                <div className="mt-6 grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <LiteMemberCard
                    salonName={salon.salonName}
                    customerName={created.card.customerName}
                    token={created.card.token}
                    stamps={created.card.stamps}
                    required={N}
                    reward={salon.rewardText}
                    qr={created.qr}
                    labels={labels(created.card)}
                  />
                  <div className="space-y-3 text-sm text-ink-600">
                    <p className="font-bold text-ink-900">{t.showQr}</p>
                    <a href={cardBase + created.card.token} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:underline">
                      <ExternalLink className="h-4 w-4" />
                      {t.openCard}
                    </a>
                    <CardActions card={created.card} where="new" />
                  </div>
                </div>
              )}
            </section>

            {isOwner && (
            <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
              <Head icon={Settings2} title={t.programTitle} sub={t.programSub} />
              <form onSubmit={saveProgram} className="mt-5 space-y-4">
                <label className="block text-xs font-bold text-ink-700">
                  {t.salonName}
                  <input required minLength={2} maxLength={120} value={salon.salonName} onChange={(e) => setSalon((s) => ({ ...s, salonName: e.target.value }))} className={field} />
                </label>
                <div>
                  <p className="text-xs font-bold text-ink-700">{t.stampsRequired}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {Array.from({ length: 18 }, (_, i) => i + 3).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setSalon((s) => ({ ...s, stampsRequired: n }))}
                        className={`h-10 w-10 rounded-xl text-sm font-bold ring-1 transition ${
                          salon.stampsRequired === n ? "bg-[#a3155f] text-[#ffe3f1] ring-[#a3155f]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block text-xs font-bold text-ink-700">
                  {t.rewardText}
                  <input required minLength={2} maxLength={80} value={salon.rewardText} onChange={(e) => setSalon((s) => ({ ...s, rewardText: e.target.value }))} placeholder={t.rewardPh} className={field} />
                </label>
                <button type="submit" disabled={!!busy} className={gold}>
                  {busy === "program" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {t.save}
                </button>
              </form>
              <Flash at="program" />
            </section>
            )}

          {/* Customers and the guide */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 pt-2">
            {tabs.map((x) => {
              const on = tab === x.key;
              return (
                <button
                  key={x.key}
                  type="button"
                  onClick={() => {
                    setTab(x.key);
                      }}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                    on ? "bg-[#a3155f] text-white ring-[#a3155f]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  <x.icon className={`h-4 w-4 ${on ? "text-[#ffe3f1]" : "text-ink-400"}`} />
                  {x.label}
                  {x.key === "cards" && <span className={`rounded-full px-1.5 text-[10px] font-bold leading-4 ${on ? "bg-white/15" : "bg-mist-50"}`}>{cards.length}</span>}
                </button>
              );
            })}
          </div>

          {tab === "cards" && (
            <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.searchPh} className={`${field} mt-0 pl-10`} />
              </div>
              <Flash at="cards" />
              {shown.length === 0 ? (
                <p className="mt-6 text-center text-sm text-ink-400">{t.noCards}</p>
              ) : (
                <ul className="mt-4 divide-y divide-ink-100">
                  {shown.map((c) => {
                    const full = c.stamps >= N;
                    return (
                      <li key={c.id} className="flex flex-wrap items-center gap-3 py-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e0559b] to-[#a3155f] font-serif text-lg text-[#ffe3f1]">
                          {c.customerName.trim()[0]?.toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-bold text-ink-900">{c.customerName}</span>
                            {c.sample && (
                              <span className="shrink-0 rounded-full bg-[#fbf3e1] px-2 py-0.5 text-[10px] font-bold text-[#8a6a2b]">{t.sampleBadge}</span>
                            )}
                            {full && <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">{t.ready}</span>}
                          </span>
                          <span className="block truncate text-xs text-ink-400">
                            {c.customerEmail ?? c.token}
                            {c.lastStampAt ? ` · ${fill(t.lastVisit, { date: dateFmt.format(new Date(c.lastStampAt)) })}` : ""}
                          </span>
                          <span className="mt-1.5 flex items-center gap-2">
                            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-mist-50">
                              <span className="block h-full rounded-full bg-gradient-to-r from-[#e0559b] to-[#a3155f]" style={{ width: `${(Math.min(c.stamps, N) / N) * 100}%` }} />
                            </span>
                            <span className="text-[11px] font-semibold tabular-nums text-ink-500">{fill(t.stampsOf, { n: Math.min(c.stamps, N), total: N })}</span>
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={!!busy}
                            onClick={() => act(c, full ? "redeem" : "stamp")}
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${full ? "bg-gradient-to-r from-[#e0559b] to-[#a3155f] text-white" : "bg-[#a3155f] text-white"}`}
                          >
                            {busy === `stamp-${c.id}` || busy === `redeem-${c.id}` ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : full ? t.redeem : t.stamp}
                          </button>
                          <a href={cardBase + c.token} target="_blank" rel="noreferrer" title={t.openCard} className="rounded-full p-2 text-ink-400 hover:bg-mist-50 hover:text-ink-700">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          {c.customerEmail && (
                            <button type="button" title={t.resend} disabled={!!busy} onClick={() => act(c, "resend")} className="rounded-full p-2 text-ink-400 hover:bg-mist-50 hover:text-ink-700">
                              <Mail className="h-4 w-4" />
                            </button>
                          )}
                          {isOwner && (
                            <button type="button" title={t.remove} disabled={!!busy} onClick={() => remove(c)} className="rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}

          {tab === "guide" && (
            <section className="space-y-4">
              <div className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
                <p className="font-serif text-2xl text-ink-900">{t.guideTitle}</p>
                <ol className="relative mt-5 space-y-5 before:absolute before:bottom-4 before:left-[15px] before:top-3 before:w-px before:bg-gradient-to-b before:from-[#e0559b] before:to-[#f3c4dd]">
                  {t.guide.map(([title, body], i) => (
                    <li key={title} className="relative flex gap-3">
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#e0559b] to-[#a3155f] text-xs font-extrabold text-white ring-4 ring-white">{i + 1}</span>
                      <div className="pt-1">
                        <p className="text-sm font-bold text-ink-900">{title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-ink-600">{body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-[2rem] bg-[#a3155f] p-5 text-white sm:p-6">
                <p className="flex items-center gap-2 font-bold text-[#ffe3f1]">
                  <Lightbulb className="h-4 w-4" />
                  {t.tipsTitle}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  {t.tips.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd1e8]" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {tab === "profile" && isOwner && !savedEmail && <p className="rounded-3xl bg-white p-6 text-sm text-ink-600 ring-1 ring-[#f3c4dd]">{t.trialProfile}</p>}
          {tab === "profile" && isOwner && savedEmail && (
            <LiteProfilePanel locale={locale} t={t} initial={{ ownerName: account.ownerName, email: savedEmail, hasPassword: account.hasPassword }} onSignOut={signOut} />
          )}
        </div>

        {/* Upgrade */}
        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-[#f3c4dd] bg-gradient-to-br from-[#fff5fa] to-[#fbe3ef] p-5">
            <p className="text-xs font-bold text-[#a3155f]">{fill(t.usage, { n: cards.length, max: maxCards.toLocaleString(locale) })}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-gradient-to-r from-[#e0559b] to-[#a3155f]" style={{ width: `${Math.min(100, (cards.length / maxCards) * 100)}%` }} />
            </div>
            <p className="mt-5 flex items-center gap-2 font-serif text-xl text-ink-900">
              <Crown className="h-5 w-5 text-[#c42d7f]" />
              {t.upgradeTitle}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#7a1d55]">{t.upgradeSub}</p>
            <ul className="mt-3 space-y-1.5">
              {t.fullItems.slice(0, 4).map((x) => (
                <li key={x} className="flex gap-2 text-xs text-[#7a1d55]">
                  <Check className="mt-px h-3.5 w-3.5 shrink-0 text-[#c42d7f]" />
                  {x}
                </li>
              ))}
            </ul>
            {isOwner && !initial.upgraded && (
              <Link href={upgradeHref} className={`${dark} mt-5 w-full`}>
                {t.upgradeCta}
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
