import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { Download, Users, Radio } from "lucide-react";
import { fromZonedTime } from "date-fns-tz";
import { AdminBusinessApprovalRow } from "@/components/admin-business-approval-row";
import { StatCard } from "@/components/stat-card";
import { AdminAppLinkCard } from "@/components/admin-app-link-card";
import { routing } from "@/i18n/routing";

// Traffic stats are platform-wide (every business, every timezone), so
// "today" needs one fixed reference point rather than each visitor's own
// clock — Vietnam time, since that's this schema's own default timezone.
const PLATFORM_TZ = "Asia/Ho_Chi_Minh";
const ONLINE_WINDOW_MS = 5 * 60 * 1000;

export default async function AdminPendingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("admin");

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: PLATFORM_TZ });
  const startOfTodayUtc = fromZonedTime(todayStr, PLATFORM_TZ);
  const onlineSince = new Date(Date.now() - ONLINE_WINDOW_MS);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [businesses, pwaInstallsTotal, pwaInstalls7d, visitorsTodayGroups, visitorsOnlineGroups, toolEvents] = await Promise.all([
    prisma.business.findMany({
      where: { status: "PENDING" },
      include: { owner: { select: { name: true, email: true } }, categories: { include: { category: true } } },
      orderBy: { createdAt: "asc" },
    }),
    prisma.pwaInstall.count(),
    prisma.pwaInstall.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.siteVisit.groupBy({ by: ["visitorId"], where: { createdAt: { gte: startOfTodayUtc } } }),
    prisma.siteVisit.groupBy({ by: ["visitorId"], where: { createdAt: { gte: onlineSince } } }),
    prisma.toolEvent.groupBy({ by: ["tool", "event"], where: { createdAt: { gte: thirtyDaysAgo } }, _count: true }),
  ]);
  const toolCount = (tool: string, event: string) => toolEvents.find((e) => e.tool === tool && e.event === event)?._count ?? 0;
  const vi = locale === "vi";

  // Each language's own name, in the admin's language ("Tiếng Anh", …).
  const names = new Intl.DisplayNames([locale], { type: "language" });
  const languages = routing.locales.map((code): [string, string] => {
    const name = names.of(code) ?? code;
    return [code, `${name.charAt(0).toLocaleUpperCase(locale)}${name.slice(1)}`];
  });

  return (
    <div>
      <AdminAppLinkCard
        locale={locale}
        defaultLocale={routing.defaultLocale}
        languages={languages}
        installsTotal={pwaInstallsTotal}
        installs7d={pwaInstalls7d}
      />
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={Radio}
          label={locale === "vi" ? "Đang xem trang web" : "Viewing right now"}
          value={String(visitorsOnlineGroups.length)}
        />
        <StatCard
          icon={Users}
          label={locale === "vi" ? "Khách truy cập hôm nay" : "Visitors today"}
          value={String(visitorsTodayGroups.length)}
        />
        <StatCard
          icon={Download}
          label={locale === "vi" ? "Tổng lượt cài đặt app" : "Total app installs"}
          value={String(pwaInstallsTotal)}
        />
        <StatCard
          icon={Download}
          label={locale === "vi" ? "Cài đặt 7 ngày qua" : "Installs in last 7 days"}
          value={String(pwaInstalls7d)}
        />
      </div>
      {(
        [
          ["price_list", vi ? "Công cụ bảng giá miễn phí — 30 ngày qua" : "Free price-list tool — last 30 days", true],
          ["qr_poster", vi ? "Công cụ poster QR miễn phí — 30 ngày qua" : "Free QR poster tool — last 30 days", false],
        ] as const
      ).map(([tool, title, extra]) => (
        <div key={tool} className="mb-4 rounded-2xl border border-ink-100 bg-white p-4 last-of-type:mb-8">
          <h2 className="mb-3 text-sm font-bold text-ink-900">{title}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
            {(
              [
                ["open", vi ? "Lượt mở" : "Opened"],
                ["download_pdf", vi ? "Tải PDF" : "PDF downloads"],
                ["download_png", vi ? "Tải PNG" : "PNG downloads"],
                ["cta_click", vi ? "Bấm đăng ký" : "Sign-up clicks"],
                ...(extra
                  ? ([
                      ["translate", vi ? "Dịch AI" : "AI translations"],
                      ["import", vi ? "Nhập từ salon" : "Salon imports"],
                    ] as const)
                  : []),
              ] as const
            ).map(([ev, label]) => (
              <div key={ev} className="rounded-xl bg-mist-50 px-3 py-2">
                <p className="text-lg font-bold text-ink-900">{toolCount(tool, ev)}</p>
                <p className="text-xs text-ink-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("pendingBusinesses")}</h1>
      {businesses.length === 0 ? (
        <p className="text-sm text-ink-400">{t("noPending")}</p>
      ) : (
        <div className="space-y-3">
          {businesses.map((b) => (
            <AdminBusinessApprovalRow
              key={b.id}
              business={{
                id: b.id,
                name: b.name,
                description: b.description,
                city: b.city,
                phone: b.phone,
                ownerName: b.owner.name,
                ownerEmail: b.owner.email,
                category: b.categories[0]
                  ? locale === "vi"
                    ? b.categories[0].category.nameVi
                    : b.categories[0].category.nameEn
                  : null,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
