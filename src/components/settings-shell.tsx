"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  Check,
  ChevronRight,
  Circle,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Globe,
  LayoutTemplate,
  MapPin,
  Phone,
  QrCode,
  Scissors,
  Settings2,
  ShieldCheck,
  Store,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import {
  settingsStrings,
  type ChecklistId,
  type SettingsSectionId,
} from "@/lib/settings-strings";

export const SECTION_ICONS: Record<SettingsSectionId, LucideIcon> = {
  profile: Store,
  contact: Phone,
  booking: CalendarClock,
  payments: CreditCard,
  website: Globe,
  branches: Building2,
  account: ShieldCheck,
};

/** Where each checklist item is fixed: a section on this page, or another
 * dashboard page. */
const CHECK_TARGET: Record<ChecklistId, string> = {
  logo: "#profile",
  cover: "#profile",
  description: "#profile",
  location: "#profile",
  categories: "#profile",
  phone: "#contact",
  social: "#contact",
  policy: "#booking",
  bank: "#payments",
  invoice: "#payments",
  hours: "/business/dashboard/hours",
  services: "/business/dashboard/services",
  staff: "/business/dashboard/staff",
};

/** Salon header: cover, logo, status, public link + QR, and how complete
 * the profile is with a checklist of what's missing. */
export function SettingsHero({
  locale,
  salon,
  publicUrl,
  checklist,
}: {
  locale: string;
  salon: {
    name: string;
    city: string | null;
    logoUrl: string | null;
    coverUrl: string | null;
    status: string;
  };
  publicUrl: string;
  checklist: { id: ChecklistId; done: boolean }[];
}) {
  const S = settingsStrings(locale);
  const [toast, setToast] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const done = checklist.filter((c) => c.done).length;
  const pct = Math.round((done / checklist.length) * 100);
  const missing = checklist.filter((c) => !c.done);
  const r = 34;
  const circ = 2 * Math.PI * r;

  function copy() {
    navigator.clipboard.writeText(publicUrl).catch(() => {});
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }

  async function openQr() {
    setQr(
      await QRCode.toDataURL(publicUrl, {
        width: 720,
        margin: 2,
        color: { dark: "#1f182d", light: "#ffffff" },
      }),
    );
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* Salon card */}
      <section className="relative min-h-[240px] overflow-hidden rounded-[2rem] bg-[#1f182d] text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)]">
        {salon.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={salon.coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
        ) : (
          // No cover yet: the salon's initial as a large monogram.
          <span className="pointer-events-none absolute -top-16 right-4 select-none font-serif text-[18rem] italic leading-none text-[#e8d3a6]/[0.07]">
            {salon.name.trim()[0]?.toUpperCase()}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f182d] via-[#1f182d]/75 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#624f89]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-[#c9a96e]/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
            <Settings2 className="h-4 w-4" />
            {S.eyebrow}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {salon.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={salon.logoUrl}
                alt=""
                className="h-16 w-16 shrink-0 rounded-2xl bg-white object-cover ring-2 ring-white/30"
              />
            ) : (
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#624f89] to-[#40325c] font-serif text-2xl font-bold ring-2 ring-white/20">
                {salon.name.trim()[0]?.toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <h1 className="truncate font-serif text-2xl leading-tight sm:text-3xl">
                {salon.name}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-white/70">
                {salon.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {salon.city}
                  </span>
                )}
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    salon.status === "APPROVED"
                      ? "bg-emerald-400/20 text-emerald-200"
                      : "bg-amber-400/20 text-amber-200"
                  }`}
                >
                  {salon.status === "APPROVED" ? (
                    <BadgeCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Clock className="h-3.5 w-3.5" />
                  )}
                  {S.status[salon.status] ?? salon.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.08] p-2 pl-4 ring-1 ring-white/15 backdrop-blur">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {S.publicPage}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <code className="min-w-0 flex-1 basis-full truncate text-sm text-[#e8d3a6] sm:basis-auto">
                {publicUrl.replace(/^https?:\/\//, "")}
              </code>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={copy}
                  title={S.copy}
                  aria-label={S.copy}
                  className="rounded-xl bg-white/10 p-2 hover:bg-white/20"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={openQr}
                  title={S.qr}
                  aria-label={S.qr}
                  className="rounded-xl bg-white/10 p-2 hover:bg-white/20"
                >
                  <QrCode className="h-4 w-4" />
                </button>
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-3 py-2 text-xs font-bold text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {S.view}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Completeness */}
      <section className="rounded-[2rem] border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)]">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke="#efeaf5"
                strokeWidth="8"
              />
              <circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke="url(#settingsGold)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(circ * pct) / 100} ${circ}`}
              />
              <defs>
                <linearGradient id="settingsGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d9b25c" />
                  <stop offset="1" stopColor="#624f89" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-ink-900">
              {pct}%
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-ink-900">{S.completeTitle}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-400">
              {missing.length ? S.completeText : S.completeDone}
            </p>
          </div>
        </div>
        {missing.length > 0 && (
          <>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">
              {fill(S.todo, { n: missing.length })}
            </p>
            <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto pr-1">
              {missing.map((c) => {
                const target = CHECK_TARGET[c.id];
                const inner = (
                  <>
                    <Circle className="h-4 w-4 shrink-0 text-ink-200" />
                    <span className="min-w-0 flex-1 truncate">
                      {S.checklist[c.id]}
                    </span>
                    <span className="flex shrink-0 items-center text-xs font-semibold text-primary-600">
                      {S.fix}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </>
                );
                const cls =
                  "flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-ink-700 transition hover:bg-mist-50";
                return (
                  <li key={c.id}>
                    {target.startsWith("#") ? (
                      <a href={target} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <Link href={target} className={cls}>
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {done > 0 && (
          <p className="mt-3 flex flex-wrap gap-1.5">
            {checklist
              .filter((c) => c.done)
              .map((c) => (
                <span
                  key={c.id}
                  className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"
                >
                  <Check className="h-3 w-3" />
                  {S.checklist[c.id]}
                </span>
              ))}
          </p>
        )}
      </section>

      {qr && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/60 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setQr(null)}
        >
          <div
            className="w-full max-w-md rounded-t-[2rem] bg-white p-6 sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-lg font-bold text-ink-900">{S.qrTitle}</h3>
              <button
                type="button"
                onClick={() => setQr(null)}
                aria-label={S.close}
                className="rounded-full p-1.5 text-ink-400 hover:bg-mist-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#1f182d] to-[#624f89] p-6 text-center">
              <p className="font-serif text-xl italic text-[#e8d3a6]">
                {salon.name}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qr}
                alt="QR"
                className="mx-auto mt-4 w-56 rounded-2xl bg-white p-2"
              />
            </div>
            <p className="mt-4 text-sm text-ink-400">{S.qrHint}</p>
            <a
              href={qr}
              download="qr-booking.png"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] px-5 py-3 text-sm font-bold text-white"
            >
              <Download className="h-4 w-4" />
              {S.downloadQr}
            </a>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {S.copied}
        </div>
      )}
    </div>
  );
}

/** Section menu: a sticky side list on wide screens, a scrolling chip bar
 * on phones, highlighting the section in view. */
export function SettingsNav({
  locale,
  sections,
  variant,
}: {
  locale: string;
  sections: SettingsSectionId[];
  variant: "bar" | "side";
}) {
  const S = settingsStrings(locale);
  const [active, setActive] = useState<SettingsSectionId>(sections[0]);
  const bar = useRef<HTMLElement>(null);

  // Keep the highlighted chip in view in the phone bar (horizontal only).
  useEffect(() => {
    const el = bar.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (bar.current && el) bar.current.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const els = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SettingsSectionId);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  if (variant === "bar") {
    return (
      <nav ref={bar} className="sticky top-16 z-20 -mx-4 overflow-x-auto bg-white/85 px-4 py-2 backdrop-blur xl:hidden">
        <div className="flex w-max gap-1.5">
          {sections.map((id) => {
            const Icon = SECTION_ICONS[id];
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  active === id
                    ? "bg-[#1f182d] text-white"
                    : "bg-mist-50 text-ink-700 ring-1 ring-ink-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {S.sections[id][0]}
              </a>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-24 hidden xl:block">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
        {S.menu}
      </p>
      <ul className="space-y-0.5">
        {sections.map((id) => {
          const Icon = SECTION_ICONS[id];
          const on = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                  on
                    ? "bg-[#1f182d] text-white shadow"
                    : "text-ink-700 hover:bg-mist-50"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${on ? "text-[#e8d3a6]" : "text-ink-400"}`}
                />
                {S.sections[id][0]}
              </a>
            </li>
          );
        })}
      </ul>
      <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-ink-400">
        {S.quickTitle}
      </p>
      <ul className="space-y-0.5">
        {(
          [
            ["/business/dashboard/hours", Clock, S.quick.hours],
            ["/business/dashboard/services", Scissors, S.quick.services],
            ["/business/dashboard/staff", Users, S.quick.staff],
            ["/business/dashboard/landing", LayoutTemplate, S.quick.landing],
          ] as [string, LucideIcon, string][]
        ).map(([href, Icon, label]) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm text-ink-700 hover:bg-mist-50"
            >
              <Icon className="h-4 w-4 text-ink-400" />
              {label}
              <ChevronRight className="ml-auto h-3.5 w-3.5 text-ink-300" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** One group of settings with its own heading; the cards inside get the
 * page's rounded, airy card style. */
export function SettingsSection({
  id,
  locale,
  children,
}: {
  id: SettingsSectionId;
  locale: string;
  children: React.ReactNode;
}) {
  const S = settingsStrings(locale);
  const Icon = SECTION_ICONS[id];
  const [title, sub] = S.sections[id];
  return (
    <section id={id} className="scroll-mt-32 xl:scroll-mt-24">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-ink-900">{title}</h2>
          <p className="text-xs text-ink-400">{sub}</p>
        </div>
      </div>
      <div className="space-y-4 [&_.card]:rounded-3xl [&_.card]:p-6 [&_.card]:shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)] [&_.input]:rounded-2xl [&_.input]:bg-mist-50/40 [&_.input]:py-3 [&_.input:focus]:bg-white">
        {children}
      </div>
    </section>
  );
}
