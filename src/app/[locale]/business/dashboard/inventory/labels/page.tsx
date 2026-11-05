import QRCode from "qrcode";
import { redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { ITEM_PREFIX, LOCATION_PREFIX, inventoryContext } from "@/lib/inventory";
import { inventoryStrings } from "@/lib/inventory-strings";
import { PrintButton } from "@/components/inventory/print-button";

/** QR labels to print and stick on: the branch's cupboards (kind=places), or
 * the items that have no barcode of their own (kind=items). Printing shows
 * only the labels. */
export default async function InventoryLabelsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  const { locale } = await params;
  const { kind } = await searchParams;
  const ctx = await inventoryContext();
  if (!ctx) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const S = inventoryStrings(locale);
  const places = kind !== "items";

  const rows = places
    ? (await prisma.inventoryLocation.findMany({ where: { businessId: ctx.businessId }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] })).map((l) => ({
        id: l.id,
        title: l.name,
        sub: ctx.access.business.name,
        text: `${LOCATION_PREFIX}${l.code}`,
      }))
    : (await prisma.inventoryItem.findMany({ where: { ownerId: ctx.ownerId, active: true, barcode: null }, orderBy: { name: "asc" } })).map((i) => ({
        id: i.id,
        title: i.name,
        sub: i.brand ?? "",
        text: `${ITEM_PREFIX}${i.code}`,
      }));
  const labels = await Promise.all(rows.map(async (r) => ({ ...r, svg: await QRCode.toString(r.text, { type: "svg", margin: 1, errorCorrectionLevel: "M" }) })));

  return (
    <div>
      {/* Only the labels on paper. */}
      <style>{`@media print { body * { visibility: hidden !important; } #inv-labels, #inv-labels * { visibility: visible !important; } #inv-labels { position: absolute; inset: 0 auto auto 0; width: 100%; } .no-print { display: none !important; } @page { margin: 10mm; } }`}</style>
      <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-ink-900">{places ? S.printPlaceLabels : S.printItemLabels}</h1>
        <PrintButton label={S.printNow} />
      </div>
      <div id="inv-labels" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {labels.map((l) => (
          <div key={l.id} className="break-inside-avoid rounded-2xl border-2 border-dashed border-ink-200 bg-white p-3 text-center">
            <div className="mx-auto w-32 [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: l.svg }} />
            <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-tight text-ink-900">{l.title}</p>
            {l.sub && <p className="truncate text-[11px] text-ink-500">{l.sub}</p>}
            <p className="mt-0.5 font-mono text-[10px] tracking-wider text-ink-400">{l.text}</p>
          </div>
        ))}
      </div>
      {labels.length === 0 && <p className="text-sm text-ink-400">{places ? S.placesSub : S.noMatch}</p>}
    </div>
  );
}
