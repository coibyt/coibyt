import { ArrowUpRight, CreditCard, Crown, Search, Stamp, Store, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";

const DAY = 24 * 60 * 60 * 1000;

/** Admin: the salons trying Loyalty Lite (/loyalty-lite) — how many, their
 * customers' cards and staff logins, and who has upgraded. */
export default async function AdminLoyaltyLitePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const search = q.trim();
  const since30 = new Date(Date.now() - 30 * DAY);

  const [salonCount, cardCount, cardsWithEmail, staffCount, stamps30, upgraded, newSalons30, salons] = await Promise.all([
    prisma.liteSalon.count(),
    prisma.liteCard.count(),
    prisma.liteCard.count({ where: { customerEmail: { not: null } } }),
    prisma.liteStaff.count(),
    prisma.liteCardEvent.count({ where: { kind: "STAMP", createdAt: { gte: since30 } } }),
    prisma.liteSalon.count({ where: { upgradedBusinessId: { not: null } } }),
    prisma.liteSalon.count({ where: { createdAt: { gte: since30 } } }),
    prisma.liteSalon.findMany({
      where: search ? { OR: [{ salonName: { contains: search } }, { email: { contains: search } }, { ownerName: { contains: search } }] } : undefined,
      select: {
        id: true,
        salonName: true,
        ownerName: true,
        email: true,
        locale: true,
        createdAt: true,
        lastSeenAt: true,
        emailVerifiedAt: true,
        upgradedBusinessId: true,
        _count: { select: { cards: true, staff: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    }),
  ]);
  const stampsBySalon = new Map(
    (
      await prisma.liteCard.groupBy({
        by: ["liteSalonId"],
        where: { liteSalonId: { in: salons.map((s) => s.id) } },
        _sum: { totalStamps: true, rewardsUsed: true },
      })
    ).map((r) => [r.liteSalonId, r._sum]),
  );

  const date = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const stats = [
    { icon: Store, label: "Salon đăng ký", value: salonCount, sub: `+${newSalons30} trong 30 ngày` },
    { icon: CreditCard, label: "Thẻ khách hàng", value: cardCount, sub: `${cardsWithEmail} thẻ có email` },
    { icon: Users, label: "Tài khoản nhân viên", value: staffCount, sub: "đăng nhập quẹt thẻ" },
    { icon: Stamp, label: "Dấu 30 ngày qua", value: stamps30, sub: "lượt đóng dấu" },
    { icon: Crown, label: "Đã nâng cấp", value: upgraded, sub: "lên VaraaAi đầy đủ" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Thẻ tích điểm miễn phí</h1>
        <p className="mt-1 text-sm text-ink-400">Các salon đăng ký dùng thử tại /loyalty-lite — khách hàng, nhân viên và email của họ.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border border-ink-100 bg-white p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
              <s.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 text-2xl font-bold text-ink-900">{s.value.toLocaleString("vi-VN")}</p>
            <p className="text-xs font-semibold text-ink-700">{s.label}</p>
            <p className="text-[11px] text-ink-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <form className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
        <input name="q" defaultValue={search} placeholder="Tìm theo tên salon, email, tên chủ" className="input pl-10" />
      </form>

      <div className="overflow-x-auto rounded-3xl border border-ink-100 bg-white">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-mist-50/70 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
            <tr>
              <th className="px-4 py-3">Salon</th>
              <th className="px-4 py-3">Chủ salon</th>
              <th className="px-4 py-3 text-right">Khách hàng</th>
              <th className="px-4 py-3 text-right">Nhân viên</th>
              <th className="px-4 py-3 text-right">Tổng dấu</th>
              <th className="px-4 py-3">Đăng ký</th>
              <th className="px-4 py-3">Hoạt động gần nhất</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {salons.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-ink-400">
                  Chưa có salon nào.
                </td>
              </tr>
            )}
            {salons.map((s) => {
              const sums = stampsBySalon.get(s.id);
              return (
                <tr key={s.id} className="hover:bg-mist-50/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/loyalty-lite/${s.id}`} className="font-bold text-ink-900 hover:underline">
                      {s.salonName}
                    </Link>
                    <span className="ml-2 rounded-full bg-mist-50 px-1.5 text-[10px] font-bold uppercase text-ink-400">{s.locale}</span>
                    {s.upgradedBusinessId && <span className="ml-1 rounded-full bg-emerald-50 px-1.5 text-[10px] font-bold text-emerald-700">Đã nâng cấp</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block text-ink-900">{s.ownerName || "—"}</span>
                    <a href={`mailto:${s.email}`} className="text-xs text-primary-600 hover:underline">
                      {s.email}
                    </a>
                    {!s.emailVerifiedAt && <span className="ml-1 text-[10px] text-amber-600">(chưa mở link email)</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{s._count.cards.toLocaleString("vi-VN")}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{s._count.staff}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{(sums?.totalStamps ?? 0).toLocaleString("vi-VN")}</td>
                  <td className="px-4 py-3 text-ink-500">{date.format(s.createdAt)}</td>
                  <td className="px-4 py-3 text-ink-500">{s.lastSeenAt ? date.format(s.lastSeenAt) : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/loyalty-lite/${s.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-primary-600">
                      Chi tiết <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
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
