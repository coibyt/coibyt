import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { CategoriesManager } from "@/components/categories-manager";

export default async function AdminCategoriesPage() {
  const t = await getTranslations("admin");
  const categories = await prisma.category.findMany({ orderBy: { nameVi: "asc" } });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("categories")}</h1>
      <CategoriesManager initialCategories={categories} />
    </div>
  );
}
