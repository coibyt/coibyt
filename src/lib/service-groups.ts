import { prisma } from "@/lib/prisma";

/** Picks a Category's display name for the viewer's locale. Category only
 * stores vi/en (same as every other category-name call site in the app,
 * e.g. the homepage's "Duyệt theo danh mục") — every other locale falls
 * back to English. */
export function categoryDisplayName(category: { nameVi: string; nameEn: string }, locale: string) {
  return locale === "vi" ? category.nameVi : category.nameEn;
}

/** Service.categoryId → localized name, for the public-facing pages that
 * group services by category (a service tagged with one of the platform's
 * standard categories, e.g. "Nail & móng", instead of — or alongside — the
 * salon's own custom ServiceGroup). One query for all platform categories
 * (a small fixed list), reused as a lookup rather than joining per page. */
export async function categoryNameMap(locale: string): Promise<Map<string, string>> {
  const categories = await prisma.category.findMany({ select: { id: true, nameVi: true, nameEn: true } });
  return new Map(categories.map((c) => [c.id, categoryDisplayName(c, locale)]));
}
