import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { BookingStatusBadge } from "@/components/booking-status-badge";

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "bg-sage-50 text-sage-500",
  PENDING: "bg-coral-50 text-coral-600",
  REJECTED: "bg-berry-50 text-berry-500",
  SUSPENDED: "bg-mist-100 text-ink-400",
};

export default async function AdminAllBusinessesPage() {
  const t = await getTranslations("admin");
  const businesses = await prisma.business.findMany({
    include: { owner: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("allBusinesses")}</h1>
      <div className="overflow-x-auto rounded-2xl border border-ink-100">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-mist-50 text-left text-xs uppercase text-ink-400">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Chủ sở hữu</th>
              <th className="px-4 py-3">Thành phố</th>
              <th className="px-4 py-3">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
