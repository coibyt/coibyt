"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Search, ShoppingBag, X } from "lucide-react";
import { discountPct, fill, shopStrings } from "@/lib/shop-strings";
import { ShopProductCard, type ShopProduct } from "@/components/shop-product-card";

type Sort = "featured" | "newest" | "priceAsc" | "priceDesc" | "rating";
const SALE = "__sale";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

function Grid({ items, slug, locale, eager = 0 }: { items: ShopProduct[]; slug: string; locale: string; eager?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
      {items.map((p, i) => (
        <ShopProductCard key={p.id} product={p} slug={slug} locale={locale} priority={i < eager} />
      ))}
    </div>
  );
}

/** The shop's catalogue: search, category chips, sorting, then the featured
 * picks and every group in the salon's own order. */
export function ProductShop({
  products,
  groups,
  slug,
  locale,
}: {
  products: ShopProduct[];
  groups: { id: string; name: string }[];
  slug: string;
  locale: string;
}) {
  const S = shopStrings(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("featured");

  const liveGroups = groups.filter((g) => products.some((p) => p.groupId === g.id));
  const groupIds = new Set(liveGroups.map((g) => g.id));
  const ungrouped = products.filter((p) => !p.groupId || !groupIds.has(p.groupId));
  const saleCount = products.filter((p) => discountPct(p.priceCents, p.compareAtCents) > 0).length;

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    const list = products.filter((p) => {
      if (category === SALE && discountPct(p.priceCents, p.compareAtCents) === 0) return false;
      if (category && category !== SALE && p.groupId !== category) return false;
      if (q && !`${p.name} ${p.brand ?? ""}`.toLocaleLowerCase().includes(q)) return false;
      return true;
    });
    // Sold-out products always sink to the end.
    const byStock = (a: ShopProduct, b: ShopProduct) => Number(a.soldOut) - Number(b.soldOut);
    const sorters: Record<Sort, (a: ShopProduct, b: ShopProduct) => number> = {
      featured: (a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder,
      newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
      priceAsc: (a, b) => a.priceCents - b.priceCents,
      priceDesc: (a, b) => b.priceCents - a.priceCents,
      rating: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.reviewCount - a.reviewCount,
    };
    return [...list].sort((a, b) => byStock(a, b) || sorters[sort](a, b));
  }, [products, query, category, sort]);

  const browsing = !query.trim() && !category && sort === "featured";
  const featured = products.filter((p) => p.featured && !p.soldOut).slice(0, 4);
  const bySort = (items: ShopProduct[]) => [...items].sort((a, b) => Number(a.soldOut) - Number(b.soldOut) || a.sortOrder - b.sortOrder);

  if (products.length === 0) {
    return (
      <div className="container py-24 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lp-surface ring-1 ring-lp-line">
          <ShoppingBag className="h-8 w-8 text-lp-gold" strokeWidth={1.4} />
        </span>
        <h2 className="mt-6 font-serif text-3xl text-lp-ink">{S.emptyTitle}</h2>
        <p className="mt-3 text-lp-muted">{S.emptyText}</p>
      </div>
    );
  }

  const chip = (key: string | null, label: string, count: number) => (
    <button
      key={key ?? "all"}
      type="button"
      onClick={() => setCategory(key)}
      className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
        category === key
          ? "bg-lp-ink text-lp-bg shadow-[0_8px_20px_-10px_rgba(0,0,0,0.5)]"
          : "bg-lp-card text-lp-muted ring-1 ring-lp-line hover:text-lp-ink hover:ring-lp-gold/60"
      }`}
    >
      {label}
      <span className={`text-xs ${category === key ? "opacity-70" : "text-lp-gold"}`}>{count}</span>
    </button>
  );

  return (
    <div className="pb-24">
      <div className="sticky top-16 z-30 border-b border-lp-line/80 bg-lp-bg/90 backdrop-blur-xl">
        <div className="container flex flex-col gap-3 py-3 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-center gap-2">
            <label className="relative flex-1 lg:max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lp-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={S.search}
                className="h-11 w-full rounded-full border-0 bg-lp-card pl-11 pr-4 text-sm text-lp-ink ring-1 ring-lp-line placeholder:text-lp-muted/80 focus:outline-none focus:ring-2 focus:ring-lp-accent/60"
              />
            </label>
            <label className="relative shrink-0">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-lp-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label={S.sortLabel}
                className="h-11 w-[8.5rem] cursor-pointer appearance-none truncate rounded-full border-0 bg-lp-card pl-10 pr-4 text-sm font-medium sm:w-auto sm:pr-5 text-lp-ink ring-1 ring-lp-line focus:outline-none focus:ring-2 focus:ring-lp-accent/60"
              >
                <option value="featured">{S.sortFeatured}</option>
                <option value="newest">{S.sortNewest}</option>
                <option value="priceAsc">{S.sortPriceAsc}</option>
                <option value="priceDesc">{S.sortPriceDesc}</option>
                <option value="rating">{S.sortRating}</option>
              </select>
            </label>
          </div>
          {(liveGroups.length > 0 || saleCount > 0) && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 lg:pb-0">
              {chip(null, S.all, products.length)}
              {saleCount > 0 && chip(SALE, S.onSale, saleCount)}
              {liveGroups.map((g) => chip(g.id, g.name, products.filter((p) => p.groupId === g.id).length))}
            </div>
          )}
        </div>
      </div>

      <div className="container pt-12">
        {browsing ? (
          <div className="space-y-20">
            {featured.length > 0 && products.length > featured.length && (
              <section>
                <Eyebrow>{S.featuredEyebrow}</Eyebrow>
                <h2 className="mb-8 mt-3 font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{S.featuredTitle}</h2>
                <Grid items={featured} slug={slug} locale={locale} eager={4} />
              </section>
            )}
            {liveGroups.map((g) => (
              <section key={g.id}>
                <div className="mb-8 flex items-end justify-between gap-4 border-b border-lp-line pb-4">
                  <h2 className="font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{g.name}</h2>
                  <span className="text-sm text-lp-muted">{fill(S.results, { n: products.filter((p) => p.groupId === g.id).length })}</span>
                </div>
                <Grid items={bySort(products.filter((p) => p.groupId === g.id))} slug={slug} locale={locale} />
              </section>
            ))}
            {ungrouped.length > 0 && (
              <section>
                {liveGroups.length > 0 && (
                  <div className="mb-8 border-b border-lp-line pb-4">
                    <h2 className="font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{S.otherProducts}</h2>
                  </div>
                )}
                <Grid items={bySort(ungrouped)} slug={slug} locale={locale} eager={featured.length ? 0 : 4} />
              </section>
            )}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <p className="mb-8 text-sm text-lp-muted">{fill(S.results, { n: filtered.length })}</p>
            <Grid items={filtered} slug={slug} locale={locale} eager={4} />
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-lp-ink">{S.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(null);
                setSort("featured");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-lp-line bg-lp-card px-5 py-2.5 text-sm font-medium text-lp-ink hover:border-lp-gold"
            >
              <X className="h-4 w-4" />
              {S.clearFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
