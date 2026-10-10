import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, format } from "date-fns";
import { AdminBusinessActions } from "@/components/admin-business-actions";
import { AdminBusinessAnalyticsFilter } from "@/components/admin-business-analytics-filter";
import { formatMoney } from "@/lib/money";

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "bg-sage-50 text-sage-500",
  PENDING: "bg-coral-50 text-coral-600",
  REJECTED: "bg-berry-50 text-berry-500",
  SUSPENDED: "bg-mist-100 text-ink-400",
};

type Preset = "day" | "week" | "month" | "custom";

/** Admin analytics are allowed anywhere within the last year — a custom
 * range is clamped into that window even if the query string is tampered
 * with. */
function resolveRange(preset: Preset, from: string | undefined, to: string | undefined) {
  const now = new Date();
  const oneYearAgo = subDays(now, 365);

  if (preset === "custom" && from && to) {
    const f = new Date(`${from}T00:00:00`);
    const t = new Date(`${to}T23:59:59.999`);
    return {
      gte: f < oneYearAgo ? oneYearAgo : f,
      lte: t > now ? now : t,
    };
  }
  if (preset === "week") {
    return { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) };
  }
  if (preset === "month") {
    return { gte: startOfMonth(now), lte: endOfMonth(now) };
  }
  return { gte: startOfDay(now), lte: endOfDay(now) };
}

export default async function AdminAllBusinessesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ preset?: string; from?: string; to?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations("admin");

  const preset: Preset =
    sp.preset === "week" || sp.preset === "month" || sp.preset === "custom" ? sp.preset : "day";
  const range = resolveRange(preset, sp.from, sp.to);

  const businesses = await prisma.business.findMany({
    include: { owner: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  const businessIds = businesses.map((b) => b.id);

  const [viewCounts, bookingCounts, revenueSums] = await Promise.all([
    prisma.businessPageView.groupBy({
      by: ["businessId"],
      where: { businessId: { in: businessIds }, createdAt: { gte: range.gte, lte: range.lte } },
      _count: true,
    }),
    prisma.booking.groupBy({
      by: ["businessId"],
      where: { businessId: { in: businessIds }, startsAt: { gte: range.gte, lte: range.lte } },
      _count: true,
    }),
    prisma.booking.groupBy({
      by: ["businessId", "currency"],
      where: {
        businessId: { in: businessIds },
        status: "COMPLETED",
        startsAt: { gte: range.gte, lte: range.lte },
      },
      _sum: { priceCents: true },
    }),
  ]);

  const viewsByBusiness = new Map(viewCounts.map((v) => [v.businessId, v._count]));
  const bookingsByBusiness = new Map(bookingCounts.map((b) => [b.businessId, b._count]));
  const revenueByBusiness = new Map<string, { currency: string; cents: number }[]>();
  for (const r of revenueSums) {
    const list = revenueByBusiness.get(r.businessId) ?? [];
    list.push({ currency: r.currency, cents: r._sum.priceCents ?? 0 });
    revenueByBusiness.set(r.businessId, list);
  }

  const today = format(new Date(), "yyyy-MM-dd");
  const oneYearAgoStr = format(subDays(new Date(), 365), "yyyy-MM-dd");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-ink-900">{t("allBusinesses")}</h1>
        <AdminBusinessAnalyticsFilter
          locale={locale}
          preset={preset}
          from={sp.from ?? oneYearAgoStr}
          to={sp.to ?? today}
          minDate={oneYearAgoStr}
          maxDate={today}
        />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full min-w-[960px] text-sm">
          <thead className="bg-mist-50 text-left text-xs uppercase text-ink-400">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Chủ sở hữu</th>
              <th className="px-4 py-3">Thành phố</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">{t("businessAnalytics.views")}</th>
              <th className="px-4 py-3">{t("businessAnalytics.bookings")}</th>
              <th className="px-4 py-3">{t("businessAnalytics.revenue")}</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => {
              const views = viewsByBusiness.get(b.id) ?? 0;
              const bookings = bookingsByBusiness.get(b.id) ?? 0;
              const revenue = revenueByBusiness.get(b.id) ?? [];
              return (
                <tr key={b.id} className="border-t border-ink-100">
                  <td className="px-4 py-3 font-medium text-ink-900">{b.name}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {b.owner.name} <span className="text-ink-400">({b.owner.email})</span>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{b.city ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{views}</td>
                  <td className="px-4 py-3 text-ink-700">{bookings}</td>
                  <td className="px-4 py-3 text-ink-700">
                    {revenue.length === 0
                      ? formatMoney(0, "VND", locale)
                      : revenue.map((r) => formatMoney(r.cents, r.currency, locale)).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <AdminBusinessActions id={b.id} name={b.name} status={b.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
