import { ArrowUpRight, GraduationCap, LifeBuoy, Megaphone, MessagesSquare, Sparkles } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { fill } from "@/lib/shop-strings";
import { teamAccess, teamCounts, teamMembers } from "@/lib/team";
import { teamStrings } from "@/lib/team-strings";
import { PersonAvatar } from "@/components/team/team-ui";

const BASE = "/business/dashboard/utilities";

/** The team hub's front page: what's new in chat, notices and training. */
export default async function UtilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await teamAccess();
  if (!t) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const S = teamStrings(locale);
  const [members, counts, latest, lessons] = await Promise.all([
    teamMembers(t.businessId),
    teamCounts(t.userId, t.businessId, t.isOwner),
    prisma.staffAnnouncement.findFirst({
      where: { businessId: t.businessId },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      select: { id: true, title: true, priority: true, createdAt: true },
    }),
    prisma.staffTraining.findMany({
      where: { businessId: t.businessId, published: true },
      select: { id: true, progress: { where: { completedAt: { not: null } }, select: { userId: true } } },
    }),
  ]);
  const staffIds = members.filter((m) => !m.isOwner).map((m) => m.userId);
  const done = t.isOwner
    ? lessons.reduce((n, l) => n + l.progress.filter((p) => staffIds.includes(p.userId)).length, 0)
    : lessons.filter((l) => l.progress.some((p) => p.userId === t.userId)).length;
  const total = t.isOwner ? lessons.length * staffIds.length : lessons.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const cards = [
    {
      href: `${BASE}/chat`,
      icon: MessagesSquare,
      title: S.tabChat,
      sub: S.chatCardSub,
      tone: "from-[#624f89] to-[#1f182d]",
      metric: counts.chat ? fill(S.unreadN, { n: counts.chat }) : S.allRead,
      hot: counts.chat > 0,
    },
    {
      href: `${BASE}/announcements`,
      icon: Megaphone,
      title: S.tabNotices,
      sub: S.noticesCardSub,
      tone: "from-[#e2c27d] to-[#a8792b]",
      metric: t.isOwner ? (latest ? latest.title : S.noNotices) : counts.announcements ? fill(S.unreadN, { n: counts.announcements }) : latest ? S.allRead : S.noNotices,
      hot: counts.announcements > 0,
    },
    {
      href: `${BASE}/training`,
      icon: GraduationCap,
      title: S.tabTraining,
      sub: S.trainingCardSub,
      tone: "from-[#e47e97] to-[#a31f3f]",
      metric: lessons.length === 0 ? S.noLessons : t.isOwner ? fill(S.lessonsN, { n: lessons.length }) : fill(S.lessonsDone, { done, total }),
      hot: counts.training > 0,
      progress: lessons.length > 0 && total > 0 ? pct : null,
    },
    {
      href: `${BASE}/support`,
      icon: LifeBuoy,
      title: S.tabSupport,
      sub: S.supportCardSub,
      tone: "from-[#1aa3ab] to-[#013a3e]",
      metric: counts.support ? fill(S.unreadN, { n: counts.support }) : S.supportReady,
      hot: counts.support > 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] px-6 py-8 text-white sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full bg-[#624f89]/55 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#c99a3f]/25 blur-3xl" />
        <svg className="pointer-events-none absolute right-6 top-6 h-24 w-24 text-[#e8d3a6]/10 sm:h-32 sm:w-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="36" />
          <circle cx="50" cy="50" r="24" />
        </svg>
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-[#e8d3a6]">
            <Sparkles className="h-4 w-4" />
            {S.hubEyebrow}
          </p>
          <h1 className="mt-3 max-w-xl font-serif text-3xl leading-tight sm:text-[2.6rem]">{S.hubTitle}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">{S.hubSub}</p>
          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {members.slice(0, 6).map((m) => (
                <PersonAvatar key={m.userId} id={m.userId} name={m.name} url={m.avatarUrl} size={36} className="ring-2 ring-[#1f182d]" />
              ))}
            </div>
            <p className="text-xs font-semibold text-white/70">{fill(S.teamN, { n: members.length })}</p>
          </div>
        </div>
      </section>

      {/* The three rooms */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-[0_18px_50px_-34px_rgba(31,24,45,0.5)] ring-1 ring-ink-100 transition hover:-translate-y-1 hover:shadow-[0_26px_60px_-30px_rgba(31,24,45,0.55)]"
          >
            <div className="flex items-start justify-between">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${c.tone} text-white shadow-lg`}>
                <c.icon className="h-5 w-5" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mist-50 text-ink-400 transition group-hover:bg-[#1f182d] group-hover:text-[#e8d3a6]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h2 className="mt-5 font-serif text-2xl text-ink-900">{c.title}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-400">{c.sub}</p>
            <div className="mt-auto pt-5">
              {c.progress !== undefined && c.progress !== null && (
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#e2c27d] to-[#a8792b]" style={{ width: `${c.progress}%` }} />
                </div>
              )}
              <p className={`flex items-center gap-2 truncate text-xs font-bold ${c.hot ? "text-berry-600" : "text-ink-700"}`}>
                {c.hot && <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-berry-500" />}
                <span className="truncate">{c.metric}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* The team */}
      <section className="rounded-[1.75rem] bg-white p-5 ring-1 ring-ink-100">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-400">{S.teamTitle}</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((m) => {
            const me = m.userId === t.userId;
            const inner = (
              <>
                <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={44} owner={m.isOwner} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-ink-900">{me ? `${m.name} (${S.you})` : m.name}</span>
                  <span className={`block truncate text-[11px] ${m.isOwner ? "font-bold text-[#a8792b]" : "text-ink-400"}`}>{m.isOwner ? S.owner : (m.title ?? "")}</span>
                </span>
              </>
            );
            return (
              <li key={m.userId}>
                {me ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-[#fbfaf8] p-2.5">{inner}</div>
                ) : (
                  <Link href={`${BASE}/chat?to=${m.userId}`} className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-[#fbfaf8]">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
