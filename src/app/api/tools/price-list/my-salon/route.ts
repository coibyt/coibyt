import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { listOwnedBusinesses } from "@/lib/current-business";
import { categoryName } from "@/lib/category-names";
import { isValidLocale } from "@/i18n/is-valid-locale";

const ZERO_DECIMAL = new Set(["VND", "KHR", "JPY", "KRW", "IDR", "HUF"]);

/** The signed-in owner's salons with their services, grouped the way the
 * salon's own booking page groups them — for "Import services from my
 * salon" in the price-list tool. */
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const owned = await listOwnedBusinesses(session.user.id);
  if (owned.length === 0) return NextResponse.json({ salons: [] });

  const salons = await Promise.all(
    owned.map(async (b) => {
      const [groups, services, logo, hours] = await Promise.all([
        prisma.serviceGroup.findMany({ where: { businessId: b.id }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }),
        prisma.service.findMany({
          where: { businessId: b.id, active: true },
          orderBy: { createdAt: "asc" },
          include: { category: true },
        }),
        prisma.businessImage.findUnique({ where: { businessId_kind: { businessId: b.id, kind: "LOGO" } } }),
        prisma.businessHours.findMany({ where: { businessId: b.id }, select: { weekday: true, openMinute: true, closeMinute: true } }),
      ]);
      const lang = isValidLocale(b.defaultLocale) ? b.defaultLocale : "vi";
      const toItem = (s: (typeof services)[number]) => ({
        name: s.name,
        description: s.description?.slice(0, 300) ?? "",
        price: ZERO_DECIMAL.has(s.currency) ? s.priceCents : s.priceCents / 100,
        durationMin: s.durationMin,
      });
      const categories: { name: string; services: ReturnType<typeof toItem>[] }[] = [];
      const used = new Set<string>();
      for (const g of groups) {
        const items = services.filter((s) => s.groupId === g.id);
        if (items.length) {
          categories.push({ name: g.name, services: items.map(toItem) });
          items.forEach((s) => used.add(s.id));
        }
      }
      const byCat = new Map<string, typeof services>();
      for (const s of services) {
        if (used.has(s.id)) continue;
        const key = s.category ? categoryName(lang, s.category) : "";
        byCat.set(key, [...(byCat.get(key) ?? []), s]);
      }
      for (const [name, items] of byCat) categories.push({ name: name || b.name, services: items.map(toItem) });

      return {
        id: b.id,
        slug: b.slug,
        name: b.name,
        approved: b.status === "APPROVED",
        language: lang,
        currency: services[0]?.currency ?? b.defaultCurrency,
        address: [b.addressLine, b.city].filter(Boolean).join(", "),
        phone: b.phone ?? "",
        // Inline, so the editor can draw it without a cross-origin fetch.
        logo: logo && logo.data.length <= 2_500_000 ? `data:${logo.mimeType};base64,${Buffer.from(logo.data).toString("base64")}` : null,
        categories,
        // Raw opening hours, for the QR poster's "opening hours" line.
        hours,
      };
    })
  );
  return NextResponse.json({ salons });
}
