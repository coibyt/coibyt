import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { AdminBusinessApprovalRow } from "@/components/admin-business-approval-row";

export default async function AdminPendingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("admin");

  const businesses = await prisma.business.findMany({
    where: { status: "PENDING" },
    include: { owner: { select: { name: true, email: true } }, categories: { include: { category: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
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
