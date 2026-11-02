import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { liteCardUrl } from "@/lib/loyalty-lite";

/** Admin: one Loyalty Lite salon — its program, staff logins and every
 * customer card with the customer's email. */
export default async function AdminLoyaltyLiteSalonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const salon = await prisma.liteSalon.findUnique({
    where: { id },
    include: {
      staff: { orderBy: { createdAt: "asc" }, select: { id: true, name: true, email: true, active: true, lastSeenAt: true, createdAt: true } },
      cards: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!salon) notFound();

  const date = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const dateTime = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const withEmail = salon.cards.filter((c) => c.customerEmail).length;
  const stamps = salon.cards.reduce((n, c) => n + c.totalStamps, 0);
  const rewards = salon.cards.reduce((n, c) => n + c.rewardsUsed, 0);
  const csv = (kind: "customers" | "staff") => `/api/admin/loyalty-lite/${salon.id}/export?kind=${kind}`;

  return (
    <div className="space-y-6">
      <Link href="/admin/loyalty-lite" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" /> Tất cả salon
      </Link>

      <section className="rounded-[2rem] bg-[#1f182d] p-6 text-white">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e8d3a6]">Thẻ tích điểm miễn phí</p>
        <h1 className="mt-2 font-serif text-3xl">{salon.salonName}</h1>
        <p className="mt-1 text-sm text-white/70">
          {salon.ownerName ? `${salon.ownerName} · ` : ""}
          <a href={`mailto:${salon.email}`} className="underline">
            {salon.email}
          </a>
          {" · "}
          {salon.passwordHash ? "đã đặt mật khẩu" : "đăng nhập bằng link"}
          {" · ngôn ngữ "}
          {salon.locale}
        </p>
        <p className="mt-1 text-sm text-white/70">
          Đủ {salon.stampsRequired} dấu → {salon.rewardText} · đăng ký {date.format(salon.createdAt)} · hoạt động gần nhất {salon.lastSeenAt ? dateTime.format(salon.lastSeenAt) : "—"}
        </p>
        {salon.upgradedBusinessId && <p className="mt-2 inline-block rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">Đã nâng cấp lên VaraaAi đầy đủ</p>}
        <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            ["Khách hàng", salon.cards.length],
            ["Có email", withEmail],
            ["Nhân viên", salon.staff.length],
            ["Tổng dấu", stamps],
            ["Ưu đãi đã đổi", rewards],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10">
              <dt className="text-[11px] text-white/55">{k}</dt>
              <dd className="text-xl font-bold">{Number(v).toLocaleString("vi-VN")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-3xl border border-ink-100 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 px-5 py-4">
          <p className="font-bold text-ink-900">Nhân viên ({salon.staff.length})</p>
          {salon.staff.length > 0 && (
            <a href={csv("staff")} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-primary-600 ring-1 ring-ink-100 hover:bg-mist-50">
              <Download className="h-3.5 w-3.5" /> Tải CSV
            </a>
          )}
        </div>
        {salon.staff.length === 0 ? (
          <p className="px-5 py-6 text-sm text-ink-400">Chưa có tài khoản nhân viên.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-5 py-2.5">Tên</th>
                  <th className="px-5 py-2.5">Email</th>
                  <th className="px-5 py-2.5">Trạng thái</th>
                  <th className="px-5 py-2.5">Tạo ngày</th>
                  <th className="px-5 py-2.5">Đăng nhập gần nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {salon.staff.map((s) => (
                  <tr key={s.id}>
                    <td className="px-5 py-2.5 font-semibold text-ink-900">{s.name}</td>
                    <td className="px-5 py-2.5">
                      <a href={`mailto:${s.email}`} className="text-primary-600 hover:underline">
                        {s.email}
                      </a>
                    </td>
                    <td className="px-5 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${s.active ? "bg-emerald-50 text-emerald-700" : "bg-mist-50 text-ink-400"}`}>{s.active ? "Hoạt động" : "Tạm khoá"}</span>
                    </td>
                    <td className="px-5 py-2.5 text-ink-500">{date.format(s.createdAt)}</td>
                    <td className="px-5 py-2.5 text-ink-500">{s.lastSeenAt ? dateTime.format(s.lastSeenAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-ink-100 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 px-5 py-4">
          <p className="font-bold text-ink-900">Khách hàng ({salon.cards.length.toLocaleString("vi-VN")})</p>
          {salon.cards.length > 0 && (
            <a href={csv("customers")} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-primary-600 ring-1 ring-ink-100 hover:bg-mist-50">
              <Download className="h-3.5 w-3.5" /> Tải CSV
            </a>
          )}
        </div>
        {salon.cards.length === 0 ? (
          <p className="px-5 py-6 text-sm text-ink-400">Chưa cấp thẻ nào.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-5 py-2.5">Khách hàng</th>
                  <th className="px-5 py-2.5">Email</th>
                  <th className="px-5 py-2.5">Mã thẻ</th>
                  <th className="px-5 py-2.5 text-right">Dấu hiện có</th>
                  <th className="px-5 py-2.5 text-right">Tổng dấu</th>
                  <th className="px-5 py-2.5 text-right">Ưu đãi</th>
                  <th className="px-5 py-2.5">Cấp ngày</th>
                  <th className="px-5 py-2.5">Lần đóng dấu cuối</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {salon.cards.map((c) => (
                  <tr key={c.id}>
                    <td className="px-5 py-2.5 font-semibold text-ink-900">{c.customerName}</td>
                    <td className="px-5 py-2.5">
                      {c.customerEmail ? (
                        <a href={`mailto:${c.customerEmail}`} className="text-primary-600 hover:underline">
                          {c.customerEmail}
                        </a>
                      ) : (
                        <span className="text-ink-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-2.5">
                      <a href={liteCardUrl(c.token, salon.locale)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-xs text-ink-700 hover:underline">
                        {c.token} <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums">
                      {Math.min(c.stamps, salon.stampsRequired)}/{salon.stampsRequired}
                    </td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{c.totalStamps}</td>
                    <td className="px-5 py-2.5 text-right tabular-nums">{c.rewardsUsed}</td>
                    <td className="px-5 py-2.5 text-ink-500">{date.format(c.createdAt)}</td>
                    <td className="px-5 py-2.5 text-ink-500">{c.lastStampAt ? dateTime.format(c.lastStampAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
