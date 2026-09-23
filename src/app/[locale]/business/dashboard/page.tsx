import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { getTranslations } from "next-intl/server";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";
import { StatCard } from "@/components/stat-card";
import { CalendarCheck, Wallet, Star, TrendingUp } from "lucide-react";

export default async function DashboardOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  const now = new Date();

  const [bookingsToday, monthBookings, reviews, allBookings] = await Promise.all([
    prisma.booking.count({
      where: {
        businessId: business.id,
        startsAt: { gte: startOfDay(now), lte: endOfDay(now) },
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
    }),
    prisma.booking.findMany({
      where: {
        businessId: business.id,
        status: "COMPLETED",
        startsAt: { gte: startOfMonth(now), lte: endOfMonth(now) },
      },
      select: { priceCents: true, currency: true },
    }),
    prisma.review.aggregate({
      where: { businessId: business.id },
      _avg: { rating: true },
      _count: true,
    }),
    prisma.booking.groupBy({
      by: ["status"],
      where: { businessId: business.id },
      _count: true,
    }),
  ]);

  const revenueThisMonth = monthBookings.reduce((s, b) => s + b.priceCents, 0);
  const currency = monthBookings[0]?.currency ?? "VND";

  const total = allBookings.reduce((s, b) => s + b._count, 0);
  const completed = allBookings.find((b) => b.status === "COMPLETED")?._count ?? 0;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-ink-900">{t("overview")}</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label={t("statBookingsToday")} value={String(bookingsToday)} />
        <StatCard
          icon={Wallet}
          label={t("statRevenueMonth")}
          value={formatMoney(revenueThisMonth, currency, locale)}
        />
        <StatCard
          icon={Star}
          label={t("statAvgRating")}
          value={reviews._avg.rating ? reviews._avg.rating.toFixed(1) : "—"}
        />
        <StatCard icon={TrendingUp} label={t("statCompletionRate")} value={`${completionRate}%`} />
      </div>
    </div>
  );
}
