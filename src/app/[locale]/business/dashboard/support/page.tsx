import { getTranslations } from "next-intl/server";
import { redirect, Link } from "@/i18n/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireOwnerOnly } from "@/lib/current-business";
import { TrainingCard } from "@/components/training-card";
import { SupportChat } from "@/components/support-chat";
import { MarkAnnouncementsSeen } from "@/components/mark-announcements-seen";

type Tab = "training" | "chat" | "announcements";

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

  const tab: Tab = rawTab === "chat" || rawTab === "announcements" ? rawTab : "training";

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { announcementsSeenAt: true },
  });
  const [unreadAnnouncements, unreadReplies] = await Promise.all([
    prisma.announcement.count({
      where: user?.announcementsSeenAt ? { createdAt: { gt: user.announcementsSeenAt } } : {},
    }),
    prisma.supportMessage.count({
      where: { fromAdmin: true, readAt: null, thread: { ownerId: userId } },
    }),
  ]);

  const tabs: { key: Tab; label: string; badge: number }[] = [
    { key: "training", label: t("tabTraining"), badge: 0 },
    { key: "chat", label: t("tabChat"), badge: unreadReplies },
    { key: "announcements", label: t("tabAnnouncements"), badge: unreadAnnouncements },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-ink-900">{t("title")}</h1>

      <div className="flex flex-wrap gap-2">
        {tabs.map((x) => (
          <Link
            key={x.key}
            href={`/business/dashboard/support?tab=${x.key}`}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === x.key ? "bg-ink-900 text-white" : "bg-mist-50 text-ink-700 hover:bg-mist-100"
            }`}
          >
            {x.label}
            {x.badge > 0 && (
              <span className="rounded-full bg-berry-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                {x.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {tab === "training" && <TrainingTab t={t} />}

      {tab === "chat" && (
        <div className="space-y-2">
          <p className="text-sm text-ink-400">{t("chatIntro")}</p>
          <SupportChat
            endpoint="/api/support/messages"
            mine="OWNER"
            locale={locale}
            labels={{
              placeholder: t("chatPlaceholder"),
              send: t("send"),
              empty: t("chatEmpty"),
              error: t("chatError"),
              otherName: t("adminName"),
            }}
          />
        </div>
      )}

      {tab === "announcements" && <AnnouncementsTab t={t} locale={locale} hasUnread={unreadAnnouncements > 0} />}
    </div>
  );
}

async function TrainingTab({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  const trainings = await prisma.trainingResource.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  if (trainings.length === 0) return <p className="text-sm text-ink-400">{t("noTraining")}</p>;
  return (
    <div className="space-y-4">
      {trainings.map((r) => (
        <TrainingCard
          key={r.id}
          title={r.title}
          description={r.description}
          url={r.url}
          watchLabel={t("watchVideo")}
          openLabel={t("openLink")}
        />
      ))}
    </div>
  );
}

async function AnnouncementsTab({
  t,
  locale,
  hasUnread,
}: {
  t: Awaited<ReturnType<typeof getTranslations>>;
  locale: string;
  hasUnread: boolean;
}) {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return (
    <div className="space-y-4">
      <MarkAnnouncementsSeen hasUnread={hasUnread} />
      {announcements.length === 0 ? (
        <p className="text-sm text-ink-400">{t("noAnnouncements")}</p>
      ) : (
        announcements.map((a) => (
          <div key={a.id} className="card space-y-1 p-5">
            <p className="font-semibold text-ink-900">{a.title}</p>
            <p className="text-xs text-ink-400">
              {a.createdAt.toLocaleDateString(locale, { dateStyle: "medium" })}
            </p>
            <p className="whitespace-pre-line pt-1 text-sm text-ink-700">{a.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
