"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  Clock,
  Contact,
  Gift,
  Globe,
  Handshake,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  MessageCircle,
  Newspaper,
  QrCode,
  Receipt,
  Scissors,
  Search,
  Share2,
  ShoppingBag,
  Star,
  Store,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { OpenSupportButton } from "@/components/support-launcher";
import { ScreenMock, type MockBlock } from "@/components/help/screen-mock";
import type { GuideGroup, GuideIcon } from "@/lib/help/guides";

export interface HelpGuide {
  id: string;
  group: GuideGroup;
  icon: GuideIcon;
  title: string;
  why: string;
  href: string;
  steps: string[];
  tips: string[];
  screen: { page: string; blocks: MockBlock[] };
}

export interface HelpLabels {
  search: string;
  noResults: string;
  quickStart: string;
  quickStartBody: string;
  open: string;
  tips: string;
  contents: string;
  stepsLabel: string;
  askAi: string;
}

const ICONS: Record<GuideIcon, typeof Store> = {
  store: Store,
  image: ImageIcon,
  scissors: Scissors,
  users: Users,
  clock: Clock,
  wallet: Wallet,
  share: Share2,
  globe: Globe,
  bot: Bot,
  newspaper: Newspaper,
  calendar: CalendarDays,
  receipt: Receipt,
  contact: Contact,
  bell: Bell,
  star: Star,
  qr: QrCode,
  gift: Gift,
  mail: Mail,
  bag: ShoppingBag,
  handshake: Handshake,
  building: Building2,
  tools: Wrench,
  chart: BarChart3,
};

const GROUP_STYLE: Record<GuideGroup, string> = {
  start: "bg-primary-50 text-primary-600",
  customers: "bg-teal-50 text-teal-600",
  daily: "bg-peach-100 text-coral-600",
  retain: "bg-berry-50 text-berry-500",
  grow: "bg-mist-100 text-ink-700",
};

const QUICK_START = ["register", "profile", "services", "staff", "hours", "share"];

const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\u0111/g, "d").toLowerCase();

/** The help centre's searchable body: quick-start strip, table of contents
 * and every guide with its steps and illustrated screen. */
export function HelpCenter({
  guides,
  groups,
  labels,
}: {
  guides: HelpGuide[];
  groups: { id: GuideGroup; title: string; body: string }[];
  labels: HelpLabels;
}) {
  const [query, setQuery] = useState("");
  const shown = useMemo(() => {
    const q = fold(query.trim());
    if (!q) return guides;
    return guides.filter((g) => fold([g.title, g.why, ...g.steps, ...g.tips].join(" ")).includes(q));
  }, [guides, query]);
  const byId = new Map(guides.map((g) => [g.id, g]));

  return (
    <>
      <div className="relative mx-auto -mt-7 max-w-2xl px-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-popover ring-1 ring-ink-100">
          <Search className="h-5 w-5 shrink-0 text-primary-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search}
            className="min-w-0 flex-1 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400"
          />
        </div>
      </div>

      {!query && (
        <section className="container py-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{labels.quickStart}</h2>
            <p className="mt-2 text-ink-400">{labels.quickStartBody}</p>
          </div>
          <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {QUICK_START.map((id, i) => {
              const g = byId.get(id);
              if (!g) return null;
              const Icon = ICONS[g.icon];
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="group flex h-full flex-col rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100 transition-all hover:-translate-y-0.5 hover:shadow-popover"
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <Icon className="h-5 w-5 text-primary-300" />
                    </span>
                    <span className="mt-3 text-sm font-bold leading-snug text-ink-900">{g.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      <section className="container grid gap-10 pb-16 pt-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto pr-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">{labels.contents}</p>
            {groups.map((gr) => {
              const items = shown.filter((g) => g.group === gr.id);
              if (!items.length) return null;
              return (
                <div key={gr.id}>
                  <p className="mb-1.5 text-sm font-bold text-ink-900">{gr.title}</p>
                  <ul className="space-y-0.5 border-l border-ink-100">
                    {items.map((g) => (
                      <li key={g.id}>
                        <a href={`#${g.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm text-ink-400 hover:border-primary-500 hover:text-primary-700">
                          {g.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </nav>

        <div className="min-w-0 space-y-14">
          {shown.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-card ring-1 ring-ink-100">
              <p className="text-ink-700">{labels.noResults}</p>
              <OpenSupportButton className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-bold text-white">
                <MessageCircle className="h-4 w-4" />
                {labels.askAi}
              </OpenSupportButton>
            </div>
          )}

          {groups.map((gr) => {
            const items = shown.filter((g) => g.group === gr.id);
            if (!items.length) return null;
            return (
              <div key={gr.id} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{gr.title}</h2>
                  <p className="mt-1 text-ink-400">{gr.body}</p>
                </div>
                {items.map((g) => {
                  const Icon = ICONS[g.icon];
                  return (
                    <article
                      key={g.id}
                      id={g.id}
                      className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100"
                    >
                      <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                        <div className="min-w-0">
                          <div className="flex items-start gap-3">
                            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${GROUP_STYLE[g.group]}`}>
                              <Icon className="h-5 w-5" />
                            </span>
                            <div className="min-w-0">
                              <h3 className="text-xl font-extrabold leading-snug text-ink-900">{g.title}</h3>
                              <p className="mt-1 text-sm text-ink-700">{g.why}</p>
                            </div>
                          </div>

                          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-ink-400">{labels.stepsLabel}</p>
                          <ol className="mt-3 space-y-3">
                            {g.steps.map((s, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral-500 text-xs font-bold text-white">
                                  {i + 1}
                                </span>
                                <p className="pt-0.5 text-sm leading-relaxed text-ink-900">{s}</p>
                              </li>
                            ))}
                          </ol>

                          {g.tips.length > 0 && (
                            <div className="mt-6 rounded-2xl bg-peach-50 p-4 ring-1 ring-peach-200">
                              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral-600">
                                <Lightbulb className="h-4 w-4" />
                                {labels.tips}
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {g.tips.map((tip, i) => (
                                  <li key={i} className="text-sm leading-relaxed text-ink-700">
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <Link
                            href={g.href}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                          >
                            {labels.open}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>

                        <div className="min-w-0 rounded-3xl bg-gradient-to-br from-primary-50 via-white to-peach-50 p-5">
                          <ScreenMock page={g.screen.page} blocks={g.screen.blocks} />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
