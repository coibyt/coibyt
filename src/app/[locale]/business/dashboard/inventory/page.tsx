import { redirect } from "@/i18n/navigation";
import { siteSerif } from "@/lib/site-fonts";
import { inventoryContext } from "@/lib/inventory";
import { loadInventory } from "@/lib/inventory-data";
import { inventoryStrings } from "@/lib/inventory-strings";
import { InventoryManager, type Tab } from "@/components/inventory/inventory-manager";

/** Salon stock: scan supplies in and out, see each branch's count and
 * cupboards, and what to buy (src/lib/inventory.ts). */
export default async function InventoryPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { locale } = await params;
  // The low-stock email links straight to the shopping list.
  const { tab } = await searchParams;
  const ctx = await inventoryContext();
  if (!ctx) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  return (
    <div className={siteSerif.variable}>
      <InventoryManager
        S={inventoryStrings(locale)}
        locale={locale}
        initial={await loadInventory(ctx)}
        branchName={ctx.access.business.name}
        canWrite={ctx.canWrite}
        isOwner={ctx.isOwner}
        initialTab={(["stock", "buy", "history", "places", "report"] as const).find((t) => t === tab) as Tab | undefined}
      />
    </div>
  );
}
