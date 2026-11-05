import { Eye, MousePointerClick, TrendingUp, UserPlus } from "lucide-react";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { format, subDays } from "date-fns";
import { prisma } from "@/lib/prisma";

const TZ = "Europe/Helsinki";
const DAYS = 14;

/** Views, unique visitors and the views → visitors → sign-ups funnel of one window. */
async function windowStats(since: Date | null) {
  const where = since ? { gte: since } : undefined;
  const [views, visitorGroups, signups] = await Promise.all([
    prisma.toolEvent.count({ where: { tool: "loyalty_lite", event: "open", createdAt: where } }),
    prisma.toolEvent.groupBy({ by: ["visitorId"], where: { tool: "loyalty_lite", event: "open", visitorId: { not: null }, createdAt: where } }),
    prisma.liteSalon.count({ where: { createdAt: where } }),
  ]);
  return { views, visitors: visitorGroups.length, signups };
}

/** Admin: who comes to /loyalty-lite and how many of them sign up — today,
 * the last 7 and 30 days, all time, and the last two weeks day by day.
 * Days are Helsinki days. Visitors are counted since the page started
 * counting (ToolEvent "loyalty_lite"), sign-ups since the start. */
export async function LiteAdminTraffic() {
  const now = new Date();
  const todayStart = fromZonedTime(format(toZonedTime(now, TZ), "yyyy-MM-dd") + "T00:00:00", TZ);
  const chartStart = subDays(todayStart, DAYS - 1);

  const [today, week, month, all, closes30, events, salons] = await Promise.all([
    windowStats(todayStart),
    windowStats(subDays(todayStart, 6)),
    windowStats(subDays(todayStart, 29)),
    windowStats(null),
    prisma.toolEvent.count({ where: { tool: "loyalty_lite", event: "popup_close", createdAt: { gte: subDays(todayStart, 29) } } }),
    prisma.toolEvent.findMany({ where: { tool: "loyalty_lite", event: "open", createdAt: { gte: chartStart } }, select: { createdAt: true, visitorId: true } }),
    prisma.liteSalon.findMany({ where: { createdAt: { gte: chartStart } }, select: { createdAt: true } }),
  ]);

  // Day by day: unique visitors and sign-ups.
  const dayKey = (d: Date) => format(toZonedTime(d, TZ), "yyyy-MM-dd");
  const days = Array.from({ length: DAYS }, (_, i) => dayKey(subDays(now, DAYS - 1 - i)));
  const visitorsBy = new Map<string, Set<string>>();
  for (const e of events) {
    const k = dayKey(e.createdAt);
    if (!visitorsBy.has(k)) visitorsBy.set(k, new Set());
    visitorsBy.get(k)!.add(e.visitorId ?? `anon-${e.createdAt.getTime()}`);
  }
  const signupsBy = new Map<string, number>();
  for (const s of salons) signupsBy.set(dayKey(s.createdAt), (signupsBy.get(dayKey(s.createdAt)) ?? 0) + 1);
  const chart = days.map((d) => ({ day: d, visitors: visitorsBy.get(d)?.size ?? 0, signups: signupsBy.get(d) ?? 0 }));
  const peak = Math.max(1, ...chart.map((c) => c.visitors), ...chart.map((c) => c.signups));

  const rate = (s: { visitors: number; signups: number }) => (s.visitors ? `${((s.signups / s.visitors) * 100).toFixed(1).replace(".0", "")}%` : "—");
  const n = (v: number) => v.toLocaleString("vi-VN");
  const periods = [
    { label: "Hôm nay", s: today },
    { label: "7 ngày qua", s: week },
    { label: "30 ngày qua", s: month },
    { label: "Từ trước tới nay", s: all },
  ];

  return (
    <section className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#8e1d6d] px-5 py-4 text-white">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Trang varaaai.com/loyalty-lite</p>
          <p className="text-lg font-bold">Người truy cập và đăng ký</p>
        </div>
        <a href="/loyalty-lite" target="_blank" className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold ring-1 ring-white/30 hover:bg-white/30">
          Mở trang ↗
        </a>
      </div>

      <div className="grid grid-cols-2 gap-px bg-ink-100 lg:grid-cols-4">
        {periods.map(({ label, s }) => (
          <div key={label} className="bg-white p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">{label}</p>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tabular-nums text-ink-900">{n(s.visitors)}</span>
              <span className="text-xs font-semibold text-ink-500">người truy cập</span>
            </p>
            <dl className="mt-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-1.5 text-ink-500">
                  <Eye className="h-3.5 w-3.5" /> Lượt xem
                </dt>
                <dd className="font-bold tabular-nums text-ink-900">{n(s.views)}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-1.5 text-ink-500">
                  <UserPlus className="h-3.5 w-3.5" /> Đăng ký mới
                </dt>
                <dd className="font-bold tabular-nums text-[#a3155f]">{n(s.signups)}</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="flex items-center gap-1.5 text-ink-500">
                  <TrendingUp className="h-3.5 w-3.5" /> Tỷ lệ đăng ký
                </dt>
                <dd className="font-bold tabular-nums text-emerald-700">{rate(s)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-bold text-ink-900">14 ngày qua</p>
          <p className="flex items-center gap-3 text-[11px] font-semibold text-ink-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#f3c4dd]" /> Người truy cập
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#a3155f]" /> Đăng ký
            </span>
          </p>
        </div>
        <div className="mt-4 flex h-40 items-end gap-1 sm:gap-2">
          {chart.map((c) => (
            <div key={c.day} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1" title={`${c.day}: ${c.visitors} người truy cập, ${c.signups} đăng ký`}>
              <span className="text-[10px] font-bold tabular-nums text-ink-500">{c.visitors || ""}</span>
              <div className="flex w-full flex-1 items-end justify-center gap-0.5">
                <div className="w-1/2 max-w-4 rounded-t bg-[#f3c4dd]" style={{ height: `${(c.visitors / peak) * 100}%` }} />
                <div className="w-1/2 max-w-4 rounded-t bg-[#a3155f]" style={{ height: `${(c.signups / peak) * 100}%` }} />
              </div>
              <span className="text-[9px] text-ink-400">{c.day.slice(8)}/{c.day.slice(5, 7)}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-ink-400">
          <MousePointerClick className="h-3.5 w-3.5" />
          30 ngày qua: {n(closes30)} lần khách đóng bảng đăng ký để xem trang trước. Người truy cập được đếm từ ngày 06/11/2026; số đăng ký tính từ đầu.
        </p>
      </div>
    </section>
  );
}
