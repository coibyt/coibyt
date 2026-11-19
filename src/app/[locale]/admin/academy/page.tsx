import { prisma } from "@/lib/prisma";
import { liveLessons } from "@/lib/academy";
import { pick } from "@/lib/academy/types";

/** Admin › Học viện: how many people study, how often they come back and how
 * long they watch (owner, 2026-11-19). Data comes from /api/academy/track:
 * anonymous browsers, IPs stored with their last part removed. */
export const dynamic = "force-dynamic";

const TZ = "Europe/Helsinki";

export default async function AdminAcademyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const vi = locale === "vi";
  const L = (a: string, b: string) => (vi ? a : b);
  const now = Date.now();
  const d1 = new Date(now - 864e5);
  const d7 = new Date(now - 7 * 864e5);
  const d30 = new Date(now - 30 * 864e5);

  const [total, active1, active7, active30, new7, returning, sum, done, byLesson, doneByLesson, byTab, byDevice, visitors] = await Promise.all([
    prisma.academyVisitor.count(),
    prisma.academyVisitor.count({ where: { lastSeen: { gte: d1 } } }),
    prisma.academyVisitor.count({ where: { lastSeen: { gte: d7 } } }),
    prisma.academyVisitor.count({ where: { lastSeen: { gte: d30 } } }),
    prisma.academyVisitor.count({ where: { firstSeen: { gte: d7 } } }),
    prisma.academyVisitor.count({ where: { visitDays: { gte: 2 } } }),
    prisma.academyVisitor.aggregate({ _sum: { seconds: true } }),
    prisma.academyLessonView.count({ where: { completed: true } }),
    prisma.academyLessonView.groupBy({ by: ["slug"], _count: { _all: true }, _sum: { seconds: true, opens: true } }),
    prisma.academyLessonView.groupBy({ by: ["slug"], where: { completed: true }, _count: { _all: true } }),
    prisma.academyVisitor.groupBy({ by: ["tab"], _count: { _all: true } }),
    prisma.academyVisitor.groupBy({ by: ["device"], _count: { _all: true } }),
    prisma.academyVisitor.findMany({
      orderBy: { lastSeen: "desc" },
      take: 100,
      select: { id: true, ipMasked: true, device: true, locale: true, source: true, tab: true, visitDays: true, seconds: true, firstSeen: true, lastSeen: true, userId: true, _count: { select: { views: true } } },
    }),
  ]);
  const doneByVisitor = new Map(
    (
      await prisma.academyLessonView.groupBy({ by: ["visitorId"], where: { completed: true, visitorId: { in: visitors.map((v) => v.id) } }, _count: { _all: true } })
    ).map((r) => [r.visitorId, r._count._all])
  );

  const lessons = new Map(liveLessons().map((l) => [l.slug, l]));
  const trackOf = (course: string) => (course.startsWith("p-") ? L("Học nghề", "Trade") : course.startsWith("o-") ? L("Chủ salon", "Owner") : L("Khách hàng", "Customer"));
  const doneMap = new Map(doneByLesson.map((r) => [r.slug, r._count._all]));
  const lessonRows = byLesson
    .map((r) => {
      const l = lessons.get(r.slug);
      return {
        slug: r.slug,
        title: l ? pick(l.title, locale) : r.slug,
        track: l ? trackOf(l.course) : "",
        people: r._count._all,
        opens: r._sum.opens ?? 0,
        minutes: Math.round((r._sum.seconds ?? 0) / 60),
        done: doneMap.get(r.slug) ?? 0,
      };
    })
    .sort((a, b) => b.people - a.people);

  const hours = ((sum._sum.seconds ?? 0) / 3600).toFixed(1);
  const avgMin = total ? Math.round((sum._sum.seconds ?? 0) / 60 / total) : 0;
  const fmt = (d: Date) => new Intl.DateTimeFormat(vi ? "vi-VN" : "en-GB", { timeZone: TZ, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(d);
  const tabName = (t: string | null) => (t === "pro" ? L("Học nghề", "Trade") : t === "owner" ? L("Chủ salon", "Owner") : t === "customer" ? L("Khách hàng", "Customer") : L("Không chọn", "None"));
  const devName = (d: string) => (d === "mobile" ? L("Điện thoại", "Phone") : d === "tablet" ? L("Máy tính bảng", "Tablet") : L("Máy tính", "Computer"));

  const kpis: [string, string | number, string][] = [
    [L("Người học", "Learners"), total, L("tất cả từ trước đến nay", "all time")],
    [L("Hôm nay", "Last 24 h"), active1, L("có vào học", "active")],
    [L("7 ngày qua", "Last 7 days"), active7, L(`${new7} người mới`, `${new7} new`)],
    [L("30 ngày qua", "Last 30 days"), active30, L("có vào học", "active")],
    [L("Quay lại", "Returning"), returning, L("học từ 2 ngày trở lên", "on 2+ different days")],
    [L("Giờ xem video", "Hours watched"), hours, L(`TB ${avgMin} phút/người`, `avg ${avgMin} min/person`)],
    [L("Bài học xong", "Lessons finished"), done, L("xem gần hết video", "watched to the end")],
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{L("Học viện: người học", "Academy learners")}</h1>
        <p className="mt-1 text-sm text-ink-400">
          {L(
            "Mỗi dòng là một trình duyệt (điện thoại hoặc máy tính). IP chỉ lưu rút gọn (bỏ phần cuối) để đúng luật bảo vệ dữ liệu ở châu Âu. Số liệu bắt đầu từ ngày 19/11/2026.",
            "Each row is one browser (phone or computer). IPs are stored shortened (last part removed) to respect EU data-protection law. Data starts on 19 Nov 2026."
          )}
        </p>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map(([label, value, sub]) => (
          <div key={label} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{label}</p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums text-ink-900">{value}</p>
            <p className="mt-0.5 text-xs text-ink-400">{sub}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
          <h2 className="text-sm font-extrabold text-ink-900">{L("Vào từ tab nào", "Arrived on which tab")}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {byTab.sort((a, b) => b._count._all - a._count._all).map((r) => (
              <li key={r.tab ?? "none"} className="flex justify-between"><span>{tabName(r.tab)}</span><span className="font-bold tabular-nums">{r._count._all}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
          <h2 className="text-sm font-extrabold text-ink-900">{L("Thiết bị", "Devices")}</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {byDevice.sort((a, b) => b._count._all - a._count._all).map((r) => (
              <li key={r.device} className="flex justify-between"><span>{devName(r.device)}</span><span className="font-bold tabular-nums">{r._count._all}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
        <h2 className="text-base font-extrabold text-ink-900">{L("Theo bài học", "By lesson")}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-ink-400">
              <tr>
                <th className="py-2 pr-3">{L("Bài", "Lesson")}</th>
                <th className="py-2 pr-3">{L("Nhóm", "Track")}</th>
                <th className="py-2 pr-3 text-right">{L("Người xem", "People")}</th>
                <th className="py-2 pr-3 text-right">{L("Lượt mở", "Opens")}</th>
                <th className="py-2 pr-3 text-right">{L("Phút xem", "Minutes")}</th>
                <th className="py-2 text-right">{L("Học xong", "Finished")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {lessonRows.length === 0 && (
                <tr><td colSpan={6} className="py-4 text-center text-ink-400">{L("Chưa có dữ liệu.", "No data yet.")}</td></tr>
              )}
              {lessonRows.map((r) => (
                <tr key={r.slug}>
                  <td className="py-2 pr-3 font-semibold text-ink-900">{r.title}</td>
                  <td className="py-2 pr-3 text-ink-500">{r.track}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.people}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.opens}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{r.minutes}</td>
                  <td className="py-2 text-right tabular-nums">{r.done} <span className="text-ink-400">({r.people ? Math.round((r.done / r.people) * 100) : 0}%)</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
        <h2 className="text-base font-extrabold text-ink-900">{L("Người học gần đây (100 người)", "Recent learners (100)")}</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-ink-400">
              <tr>
                <th className="py-2 pr-3">IP</th>
                <th className="py-2 pr-3">{L("Thiết bị", "Device")}</th>
                <th className="py-2 pr-3">{L("Nguồn", "Source")}</th>
                <th className="py-2 pr-3">{L("Lần đầu", "First")}</th>
                <th className="py-2 pr-3">{L("Lần cuối", "Last")}</th>
                <th className="py-2 pr-3 text-right">{L("Số ngày học", "Days")}</th>
                <th className="py-2 pr-3 text-right">{L("Phút xem", "Minutes")}</th>
                <th className="py-2 text-right">{L("Bài (xong)", "Lessons (done)")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {visitors.length === 0 && (
                <tr><td colSpan={8} className="py-4 text-center text-ink-400">{L("Chưa có dữ liệu.", "No data yet.")}</td></tr>
              )}
              {visitors.map((v) => (
                <tr key={v.id}>
                  <td className="py-2 pr-3 font-mono text-xs text-ink-700">
                    {v.ipMasked}
                    {v.userId && <span className="ml-1 rounded bg-primary-50 px-1 text-[10px] font-bold text-primary-700">{L("đã đăng nhập", "signed in")}</span>}
                  </td>
                  <td className="py-2 pr-3">{devName(v.device)}{v.locale ? ` · ${v.locale}` : ""}</td>
                  <td className="py-2 pr-3 text-ink-500">{v.source ?? "—"}{v.tab ? ` · ${tabName(v.tab)}` : ""}</td>
                  <td className="py-2 pr-3 tabular-nums text-ink-500">{fmt(v.firstSeen)}</td>
                  <td className="py-2 pr-3 tabular-nums text-ink-500">{fmt(v.lastSeen)}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{v.visitDays}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">{Math.round(v.seconds / 60)}</td>
                  <td className="py-2 text-right tabular-nums">{v._count.views} ({doneByVisitor.get(v.id) ?? 0})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
