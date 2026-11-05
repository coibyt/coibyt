import { redirect } from "@/i18n/navigation";
import { siteSerif } from "@/lib/site-fonts";
import { inventoryContext } from "@/lib/inventory";
import { loadInventory } from "@/lib/inventory-data";
import { inventoryStrings } from "@/lib/inventory-strings";
import { InventoryManager } from "@/components/inventory/inventory-manager";

/** Salon stock: scan supplies in and out, see each branch's count and
 * cupboards, and what to buy (src/lib/inventory.ts). */
export default async function InventoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
      />
    </div>
  );
}
