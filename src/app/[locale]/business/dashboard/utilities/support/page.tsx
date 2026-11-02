import { getTranslations } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  ExternalLink,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  LifeBuoy,
  Megaphone,
  MessageCircle,
  MessagesSquare,
  PlusCircle,
  QrCode,
  Receipt,
  Smartphone,
  Sparkles,
  Star,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { fill } from "@/lib/shop-strings";
import { teamAccess } from "@/lib/team";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { STAFF_FAQ, STAFF_GROUPS, STAFF_GUIDES, staffSupportStrings, trs, type StaffGuideIcon, type StaffSupportTab } from "@/lib/staff-support";
import { SupportChat } from "@/components/support-chat";
import { SupportGuideSearch } from "@/components/support-guide-search";
import { OpenHashDetails } from "@/components/team/open-hash-details";
import { GuideArtView } from "@/components/team/guide-art";

const BASE = "/business/dashboard/utilities/support";

const ICONS: Record<StaffGuideIcon, LucideIcon> = {
  phone: Smartphone,
  calendar: CalendarDays,
  check: CheckCircle2,
  plus: PlusCircle,
  star: Star,
  receipt: Receipt,
  qr: QrCode,
  card: CreditCard,
  chat: MessagesSquare,
  megaphone: Megaphone,
  help: HelpCircle,
};

const TABS: { key: StaffSupportTab; icon: LucideIcon }[] = [
  { key: "guides", icon: BookOpen },
  { key: "chat", icon: MessageCircle },
  { key: "faq", icon: HelpCircle },
];

/** Tiện ích → Hỗ trợ: the staff support centre — guides for the work staff
 * actually do, the VaraaAi support chat (AI first, then a person) and an FAQ. */
export default async function StaffSupportPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const { tab: rawTab } = await searchParams;
  const team = await teamAccess();
  if (!team) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { access, userId } = team;
  const S = staffSupportStrings(locale);
  const sc = supportCenterStrings(locale);
  const t = await getTranslations("support");
  const tab: StaffSupportTab = TABS.some((x) => x.key === rawTab) ? (rawTab as StaffSupportTab) : "guides";

  // Only the guides for what this person can open.
  const canBookings = access.isOwner || access.permissions.bookings;
  const canLoyalty = canBookings || access.viewOnlyEverywhere;
  const guides = STAFF_GUIDES.filter((g) => !g.needs || (g.needs === "bookings" ? canBookings : canLoyalty));

  const [unreadReplies, lessons] = await Promise.all([
    prisma.supportMessage.count({ where: { fromAdmin: true, readAt: null, thread: { ownerId: userId } } }),
    prisma.staffTraining.count({ where: { businessId: team.businessId, published: true } }),
  ]);
  const ownerId = access.business.ownerId;

  const searchable = guides.map((g) => ({
    id: g.id,
    title: trs(g.title, locale),
    why: trs(g.why, locale),
    body: [...g.steps.map((x) => x.text), ...(g.tip ? [g.tip] : [])].map((x) => trs(x, locale)).join(" "),
  }));

  const shortcuts: { key: string; icon: LucideIcon; title: string; text: string; href: string; badge?: number }[] = [
    { key: "chat", icon: MessageCircle, title: S.cardChat[0], text: S.cardChat[1], href: `${BASE}?tab=chat`, badge: unreadReplies },
    { key: "guides", icon: BookOpen, title: S.cardGuides[0], text: fill(S.cardGuides[1], { n: guides.length }), href: `${BASE}?tab=guides` },
    ...(ownerId !== userId
      ? [{ key: "owner", icon: UserRound, title: S.cardOwner[0], text: S.cardOwner[1], href: `/business/dashboard/utilities/chat?to=${ownerId}` }]
      : []),
    { key: "training", icon: GraduationCap, title: S.cardTraining[0], text: lessons ? `${S.cardTraining[1]} · ${lessons}` : S.cardTraining[1], href: "/business/dashboard/utilities/training" },
  ];

  return (
    <div className="space-y-6">
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
            <SupportGuideSearch
              guides={searchable}
              placeholder={S.searchPh}
              noResults={S.noResults}
              askChat={S.askChat}
              guideHref={tab === "guides" ? "#guide-" : `${BASE}?tab=guides#guide-`}
              chatHref={`${BASE}?tab=chat`}
            />
          </div>
        </div>
      </section>

      {/* Shortcuts */}
      <div className={`grid grid-cols-2 gap-3 ${shortcuts.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
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
          const badge = x.key === "chat" ? unreadReplies : 0;
          return (
            <Link
              key={x.key}
              href={`${BASE}?tab=${x.key}`}
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
        <div className="space-y-10">
          <OpenHashDetails />
          {/* The path: four chapters, in order. */}
          <section className="rounded-[2rem] border border-[#ecd9ad] bg-gradient-to-br from-[#fffaf0] to-[#f6ead2] p-5 sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8a6a2c]">{S.pathTitle}</p>
            <p className="mt-1 text-sm text-[#6b5221]">{S.pathSub}</p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {STAFF_GROUPS.filter((group) => guides.some((g) => g.group === group.id)).map((group, i) => (
                <li key={group.id}>
                  <a
                    href={`#group-${group.id}`}
                    className="group flex h-full items-center gap-3 rounded-2xl bg-white/80 p-3 ring-1 ring-[#ecd9ad] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_14px_30px_-24px_rgba(31,24,45,0.7)]"
                  >
                    <span className="font-serif text-3xl italic leading-none text-[#c99a3f]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink-900">{trs(group.title, locale)}</span>
                      <span className="block text-[11px] text-ink-400">{fill(S.guidesN, { n: guides.filter((g) => g.group === group.id).length })}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </section>

          {STAFF_GROUPS.filter((group) => guides.some((g) => g.group === group.id)).map((group, gi) => {
            const list = guides.filter((g) => g.group === group.id);
            return (
              <section key={group.id} id={`group-${group.id}`} className="scroll-mt-24">
                <div className="mb-4 flex items-end gap-4">
                  <span className="font-serif text-5xl italic leading-none text-[#e8d3a6]">{String(gi + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 border-b border-ink-100 pb-1.5 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b08a3e]">
                      {S.chapter} {gi + 1}
                    </p>
                    <h2 className="font-serif text-2xl text-ink-900">{trs(group.title, locale)}</h2>
                    <p className="text-xs text-ink-400">{trs(group.body, locale)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {list.map((g) => {
                    const Icon = ICONS[g.icon];
                    return (
                      <details
                        key={g.id}
                        id={`guide-${g.id}`}
                        className="group scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white transition open:border-[#ecd9ad] open:shadow-[0_30px_60px_-45px_rgba(31,24,45,0.8)] hover:border-primary-200"
                      >
                        <summary className="flex cursor-pointer list-none items-center gap-4 p-4 sm:p-5">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-100/60 text-primary-600 transition group-open:bg-gradient-to-br group-open:from-[#1f182d] group-open:to-[#624f89] group-open:text-[#e8d3a6]">
                            <Icon className="h-6 w-6" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-base font-bold text-ink-900">{trs(g.title, locale)}</span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-ink-400">{trs(g.why, locale)}</span>
                            <span className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-bold">
                              <span className="rounded-full bg-mist-50 px-2 py-0.5 text-ink-500">{fill(S.steps, { n: g.steps.length })}</span>
                              <span className="rounded-full bg-[#f6efe1] px-2 py-0.5 text-[#8a6a2c]">{fill(S.minutes, { n: g.minutes })}</span>
                            </span>
                          </span>
                          <span className="hidden shrink-0 items-center gap-1 rounded-full bg-[#1f182d] px-3 py-1.5 text-[11px] font-bold text-white group-open:hidden sm:flex">
                            {S.openGuide}
                          </span>
                          <ChevronDown className="h-5 w-5 shrink-0 text-ink-300 transition group-open:rotate-180" />
                        </summary>

                        <div className="border-t border-ink-100 bg-gradient-to-b from-[#fbf9fd] to-white px-4 pb-5 pt-5 sm:px-6">
                          <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-[15px] before:top-4 before:w-px before:bg-gradient-to-b before:from-[#d9b25c] before:to-[#e2d9ee]">
                            {g.steps.map((step, i) => (
                              <li key={i} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-x-3">
                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#d9b25c] to-[#b9852d] text-xs font-extrabold text-white shadow-md shadow-[#b9852d]/30 ring-4 ring-white">
                                  {i + 1}
                                </span>
                                <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
                                  <div className="pt-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08a3e]">{fill(S.stepLabel, { n: i + 1 })}</p>
                                    <p className="mt-1 text-sm leading-relaxed text-ink-700">{trs(step.text, locale)}</p>
                                  </div>
                                  <GuideArtView art={step.art} locale={locale} />
                                </div>
                              </li>
                            ))}
                          </ol>
                          {g.tip && (
                            <p className="mt-6 flex gap-2.5 rounded-2xl bg-[#1f182d] px-4 py-3.5 text-xs leading-relaxed text-white/85">
                              <Lightbulb className="mt-px h-4 w-4 shrink-0 text-[#e8d3a6]" />
                              <span>
                                <span className="font-bold text-[#e8d3a6]">{S.tip}: </span>
                                {trs(g.tip, locale)}
                              </span>
                            </p>
                          )}
                          <Link
                            href={g.href}
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#b9852d]/25 transition hover:brightness-105"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            {S.openPage}
                          </Link>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {tab === "chat" && (
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0 space-y-2">
            <p className="text-sm text-ink-400">{S.chatIntro}</p>
            <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white p-2 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)]">
              <SupportChat
                endpoint="/api/support/messages"
                humanEndpoint="/api/support/human"
                mine="OWNER"
                locale={locale}
                suggestions={S.suggestions}
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
            {ownerId !== userId && (
              <Link
                href={`/business/dashboard/utilities/chat?to=${ownerId}`}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)]"
              >
                <MessagesSquare className="h-4 w-4" />
                {S.messageOwner}
              </Link>
            )}
          </aside>
        </div>
      )}

      {tab === "faq" && (
        <div className="space-y-3">
          {STAFF_FAQ.map((f) => (
            <details key={f.q.vi} className="group rounded-3xl border border-ink-100 bg-white p-5 open:border-[#ecd9ad] open:bg-gradient-to-br open:from-white open:to-[#fffaf0]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink-900">
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 shrink-0 text-[#b08a3e]" />
                  {trs(f.q, locale)}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-ink-300 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 pl-8 text-sm leading-relaxed text-ink-700">{trs(f.a, locale)}</p>
              <Link href={f.href} className="ml-8 mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:underline">
                {S.openPage}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </details>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[#1f182d] p-5 text-white">
            <p className="font-serif text-lg">{S.faqMore}</p>
            <Link href={`${BASE}?tab=chat`} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-5 py-2.5 text-sm font-bold">
              <MessageCircle className="h-4 w-4" />
              {S.faqAsk}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
