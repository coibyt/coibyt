import { Coins, Mail, Search, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { EMAIL_QUOTA_WINDOW_MS, getDefaultEmailDailyLimit } from "@/lib/email-daily-limit";
import { AdminVaraManager, type AdminVaraOwner } from "@/components/admin-vara-manager";

/** Admin: salon owners' Vara points (add / take by hand) and how many
 * marketing emails each salon may send per day. */
export default async function AdminVaraPointsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const search = q.trim();
  const since = new Date(Date.now() - EMAIL_QUOTA_WINDOW_MS);

  const [owners, totalPoints, ownerCount, defaultLimit, sentToday] = await Promise.all([
    prisma.user.findMany({
      where: {
        businesses: { some: {} },
        ...(search
          ? { OR: [{ name: { contains: search } }, { email: { contains: search } }, { businesses: { some: { name: { contains: search } } } }] }
          : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        varaPoints: true,
        businesses: {
          select: { id: true, name: true, city: true, emailDailyLimit: true, ownEmailAllowed: true, marketingEmail: true, marketingEmailVerifiedAt: true },
          orderBy: { createdAt: "asc" },
        },
        varaPointTransactions: { select: { id: true, amount: true, reason: true, note: true, createdAt: true }, orderBy: { createdAt: "desc" }, take: 6 },
      },
      orderBy: { varaPoints: "desc" },
      take: 300,
    }),
    prisma.user.aggregate({ where: { businesses: { some: {} } }, _sum: { varaPoints: true } }),
    prisma.user.count({ where: { businesses: { some: {} } } }),
    getDefaultEmailDailyLimit(),
    prisma.emailCampaignDelivery.groupBy({ by: ["businessId"], where: { createdAt: { gte: since } }, _count: { _all: true } }),
  ]);
  const sentBy = new Map(sentToday.map((r) => [r.businessId, r._count._all]));
  const emailsToday = sentToday.reduce((a, r) => a + r._count._all, 0);

  const rows: AdminVaraOwner[] = owners.map((o) => ({
    id: o.id,
    name: o.name,
    email: o.email,
    varaPoints: o.varaPoints,
    businesses: o.businesses.map(({ marketingEmailVerifiedAt, ...b }) => ({ ...b, marketingEmailVerified: !!marketingEmailVerifiedAt, sentToday: sentBy.get(b.id) ?? 0 })),
    history: o.varaPointTransactions.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
  }));

  const stats = [
    { icon: Users, label: "Chủ salon", value: ownerCount.toLocaleString("vi-VN") },
    { icon: Coins, label: "Tổng điểm Vara đang có", value: (totalPoints._sum.varaPoints ?? 0).toLocaleString("vi-VN") },
    { icon: Mail, label: "Email marketing 24h qua", value: emailsToday.toLocaleString("vi-VN") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Điểm Vara & giới hạn email</h1>
        <p className="mt-1 text-sm text-ink-400">Cộng hoặc trừ điểm Vara của chủ salon, và đặt số email marketing mỗi salon được gửi trong một ngày.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-ink-100 bg-white p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
              <s.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-2xl font-bold text-ink-900">{s.value}</p>
            <p className="text-xs font-semibold text-ink-700">{s.label}</p>
          </div>
        ))}
      </div>

      <form className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input name="q" defaultValue={search} placeholder="Tìm theo tên chủ, email, tên salon" className="input pl-10" />
      </form>

      <AdminVaraManager owners={rows} defaultLimit={defaultLimit} />
    </div>
  );
}
