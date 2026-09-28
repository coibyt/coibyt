import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { AdminSupportInbox } from "@/components/admin-support-inbox";
import { AdminTrainingManager } from "@/components/admin-training-manager";
import { AdminAnnouncementManager } from "@/components/admin-announcement-manager";

type Tab = "inbox" | "training" | "announcements";

const TABS: { key: Tab; label: string }[] = [
  { key: "inbox", label: "Hộp thư hỗ trợ" },
  { key: "training", label: "Đào tạo" },
  { key: "announcements", label: "Thông báo" },
];

export default async function AdminSupportPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab: rawTab } = await searchParams;
  const tab: Tab = rawTab === "training" || rawTab === "announcements" ? rawTab : "inbox";

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-ink-900">Hỗ trợ chủ salon</h1>

      <div className="flex flex-wrap gap-2">
        {TABS.map((x) => (
          <Link
            key={x.key}
            href={`/admin/support?tab=${x.key}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === x.key ? "bg-ink-900 text-white" : "bg-mist-50 text-ink-700 hover:bg-mist-100"
            }`}
          >
            {x.label}
          </Link>
        ))}
      </div>

      {tab === "inbox" && <AdminSupportInbox />}

      {tab === "training" && (
        <AdminTrainingManager
          trainings={(
            await prisma.trainingResource.findMany({
              orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
            })
          ).map((t) => ({ id: t.id, title: t.title, description: t.description, url: t.url }))}
        />
      )}

      {tab === "announcements" && (
        <AdminAnnouncementManager
          announcements={(
            await prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
          ).map((a) => ({
            id: a.id,
            title: a.title,
            body: a.body,
            createdAt: a.createdAt.toISOString(),
          }))}
        />
      )}
    </div>
  );
}
