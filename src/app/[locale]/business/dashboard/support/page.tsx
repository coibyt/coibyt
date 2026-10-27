import { getTranslations } from "next-intl/server";
import { redirect, Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  ChevronDown,
  Clock,
  ExternalLink,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  PlayCircle,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireOwnerOnly } from "@/lib/current-business";
import { TrainingCard } from "@/components/training-card";
import { SupportChat } from "@/components/support-chat";
import { SupportGuideSearch } from "@/components/support-guide-search";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { MarkAnnouncementsSeen } from "@/components/mark-announcements-seen";
import { GROUPS, GUIDES, tr } from "@/lib/help/guides";
import { GUIDE_ICONS } from "@/lib/help/guide-icons";
import { fill } from "@/lib/shop-strings";
import { siteSerif } from "@/lib/site-fonts";
import { supportPageStrings, type SupportTab } from "@/lib/support-page-strings";

const TABS: { key: SupportTab; icon: LucideIcon }[] = [
  { key: "guides", icon: BookOpen },
  { key: "chat", icon: MessageCircle },
  { key: "training", icon: PlayCircle },
  { key: "announcements", icon: BellRing },
  { key: "faq", icon: HelpCircle },
];

export default async function SupportPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const { tab: rawTab } = await searchParams;
  const owned = await requireOwnerOnly();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const session = await auth();
  const userId = session!.user!.id;
  const t = await getTranslations("support");
  const sc = supportCenterStrings(locale);
  const S = supportPageStrings(locale);

  const tab: SupportTab = TABS.some((x) => x.key === rawTab) ? (rawTab as SupportTab) : "guides";

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { announcementsSeenAt: true },
  });
  const [unreadAnnouncements, unreadReplies, trainingCount] = await Promise.all([
    prisma.announcement.count({
      where: user?.announcementsSeenAt ? { createdAt: { gt: user.announcementsSeenAt } } : {},
    }),
    prisma.supportMessage.count({
      where: { fromAdmin: true, readAt: null, thread: { ownerId: userId } },
    }),
    prisma.trainingResource.count(),
  ]);
  const badges: Partial<Record<SupportTab, number>> = { chat: unreadReplies, announcements: unreadAnnouncements };

  const guides = GUIDES.map((g) => ({
    id: g.id,
    title: tr(g.title, locale),
    why: tr(g.why, locale),
    body: [...g.steps, ...(g.tips ?? [])].map((x) => tr(x, locale)).join(" "),
  }));

  const shortcuts: { key: SupportTab | "help"; icon: LucideIcon; title: string; text: string; href: string; badge?: number }[] = [
    { key: "chat", icon: MessageCircle, title: S.cards.chat[0], text: S.cards.chat[1], href: "/business/dashboard/support?tab=chat", badge: unreadReplies },
    { key: "help", icon: BookOpen, title: S.cards.guides[0], text: fill(S.cards.guides[1], { n: GUIDES.length }), href: "/help/getting-started" },
    { key: "training", icon: PlayCircle, title: S.cards.training[0], text: fill(S.cards.training[1], { n: trainingCount }), href: "/business/dashboard/support?tab=training" },
    { key: "announcements", icon: BellRing, title: S.cards.announcements[0], text: S.cards.announcements[1], href: "/business/dashboard/support?tab=announcements", badge: unreadAnnouncements },
  ];

  return (
    <div className={`${siteSerif.variable} space-y-6`}>
      {/* Hero */}
      <section className="relative rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
          <div className="absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
            <LifeBuoy className="h-4 w-4" />
            {S.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
          <div className="mt-6">
            <SupportGuideSearch guides={guides} placeholder={S.searchPh} noResults={S.noResults} askChat={S.askChat} />
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {shortcuts.map((x) => (
          <Link
            key={x.key}
            href={x.href}
            className="group relative flex flex-col rounded-3xl border border-ink-100 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#d9b25c] hover:shadow-[0_18px_40px_-30px_rgba(31,24,45,0.7)] sm:p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
              <x.icon className="h-5 w-5" />
            </span>
            {!!x.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-[#c2378f] px-2 py-0.5 text-[10px] font-bold text-white">{fill(S.newBadge, { n: x.badge })}</span>
            )}
            <p className="mt-3 text-sm font-bold text-ink-900">{x.title}</p>
            <p className="mt-0.5 text-xs leading-snug text-ink-400">{x.text}</p>
            <ArrowRight className="mt-3 h-4 w-4 text-ink-300 transition group-hover:translate-x-0.5 group-hover:text-[#b08a3e]" />
          </Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((x) => {
          const on = tab === x.key;
          const badge = badges[x.key] ?? 0;
          return (
            <Link
              key={x.key}
              href={`/business/dashboard/support?tab=${x.key}`}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
              }`}
            >
              <x.icon className={`h-4 w-4 ${on ? "text-[#e8d3a6]" : "text-ink-400"}`} />
              {S.tabs[x.key]}
              {badge > 0 && <span className="rounded-full bg-[#c2378f] px-1.5 text-[10px] font-bold leading-4 text-white">{badge}</span>}
            </Link>
          );
        })}
      </div>

      {tab === "guides" && (
        <div className="space-y-8">
          {GROUPS.map((group) => {
            const list = GUIDES.filter((g) => g.group === group.id);
            if (!list.length) return null;
            return (
              <section key={group.id}>
                <div className="mb-3">
                  <h2 className="text-lg font-bold text-ink-900">{tr(group.title, locale)}</h2>
                  <p className="text-xs text-ink-400">{tr(group.body, locale)}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {list.map((g) => {
                    const Icon = GUIDE_ICONS[g.icon];
                    return (
                      <article key={g.id} className="flex flex-col rounded-3xl border border-ink-100 bg-white p-5 transition hover:border-primary-200">
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-100/60 text-primary-600">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-ink-900">{tr(g.title, locale)}</p>
                            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-400">{tr(g.why, locale)}</p>
                          </div>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-4 text-xs font-semibold">
                          <Link href={`/help/getting-started#${g.id}`} className="flex items-center gap-1 text-[#8a6a2b] hover:underline">
                            <BookOpen className="h-3.5 w-3.5" />
                            {S.readGuide}
                          </Link>
                          <Link href={g.href} className="flex items-center gap-1 text-primary-600 hover:underline">
                            <ExternalLink className="h-3.5 w-3.5" />
                            {S.openPage}
                          </Link>
                          <span className="ml-auto text-ink-300">{fill(S.steps, { n: g.steps.length })}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
          <Link href="/help/getting-started" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)]">
            <BookOpen className="h-4 w-4" />
            {S.allGuides}
          </Link>
        </div>
      )}

      {tab === "chat" && (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-2">
            <p className="text-sm text-ink-400">{t("chatIntro")}</p>
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white p-2 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)]">
              <SupportChat
                endpoint="/api/support/messages"
                humanEndpoint="/api/support/human"
                mine="OWNER"
                locale={locale}
                suggestions={sc.suggestions}
                heightClass="h-[34rem]"
                labels={{
                  placeholder: t("chatPlaceholder"),
                  send: t("send"),
                  empty: t("chatEmpty"),
                  error: t("chatError"),
                  otherName: t("adminName"),
                  aiName: sc.aiName,
                  aiTyping: sc.aiTyping,
                  talkToHuman: sc.talkToHuman,
                }}
              />
            </div>
          </div>
          <aside className="space-y-3">
            {S.chatSide.map(([title, text], i) => {
              const Icon = [Sparkles, UserRound, Clock][i];
              return (
                <div key={title} className="flex gap-3 rounded-3xl border border-ink-100 bg-white p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{title}</p>
                    <p className="mt-0.5 text-xs text-ink-400">{text}</p>
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      )}

      {tab === "training" && <TrainingTab t={t} />}

      {tab === "announcements" && <AnnouncementsTab t={t} locale={locale} hasUnread={unreadAnnouncements > 0} seenAt={user?.announcementsSeenAt ?? null} newLabel={S.latest} />}

      {tab === "faq" && (
        <div className="space-y-3">
          {S.faq.map((f) => (
            <details key={f.q} className="group rounded-3xl border border-ink-100 bg-white p-5 open:border-[#ecd9ad] open:bg-gradient-to-br open:from-white open:to-[#fffaf0]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-900">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-[#b08a3e]" />
                  {f.q}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink-300 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 pl-8 text-sm leading-relaxed text-ink-700">{f.a}</p>
              <Link href={f.href} className="mt-2 ml-8 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline">
                {S.openPage}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </details>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#1f182d] p-5 text-white">
            <p className="font-serif text-lg">{S.faqMore}</p>
            <Link href="/business/dashboard/support?tab=chat" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-5 py-2.5 text-sm font-bold">
              <MessageCircle className="h-4 w-4" />
              {S.faqAsk}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

async function TrainingTab({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  const trainings = await prisma.trainingResource.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  if (trainings.length === 0) {
    return <p className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-10 text-center text-sm text-ink-400">{t("noTraining")}</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 [&_.card]:h-full [&_.card]:rounded-3xl [&_.card]:p-6">
      {trainings.map((r) => (
        <TrainingCard key={r.id} title={r.title} description={r.description} url={r.url} watchLabel={t("watchVideo")} openLabel={t("openLink")} />
      ))}
    </div>
  );
}

async function AnnouncementsTab({
  t,
  locale,
  hasUnread,
  seenAt,
  newLabel,
}: {
  t: Awaited<ReturnType<typeof getTranslations>>;
  locale: string;
  hasUnread: boolean;
  seenAt: Date | null;
  newLabel: string;
}) {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return (
    <div>
      <MarkAnnouncementsSeen hasUnread={hasUnread} />
      {announcements.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-10 text-center text-sm text-ink-400">{t("noAnnouncements")}</p>
      ) : (
        <ol className="relative space-y-4 border-l-2 border-ink-100 pl-6">
          {announcements.map((a) => {
            const fresh = !seenAt || a.createdAt > seenAt;
            return (
              <li key={a.id} className="relative rounded-3xl border border-ink-100 bg-white p-5">
                <span className={`absolute -left-[33px] top-6 h-4 w-4 rounded-full ring-4 ring-[#f6f4f9] ${fresh ? "bg-[#c2378f]" : "bg-ink-200"}`} />
                <p className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
                  {a.createdAt.toLocaleDateString(locale, { dateStyle: "long" })}
                  {fresh && <span className="rounded-full bg-[#c2378f] px-2 py-0.5 text-[10px] font-bold text-white">{newLabel}</span>}
                </p>
                <p className="mt-1 text-base font-bold text-ink-900">{a.title}</p>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-700">{a.body}</p>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
