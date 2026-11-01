import { prisma } from "@/lib/prisma";
import type { ChecklistId } from "@/lib/settings-strings";

/** Loyalty cards and marketing switch on once the salon profile is at least
 * this complete — the same % the owner sees on the settings page. */
export const PROFILE_UNLOCK_PCT = 85;

/** The settings page's "how complete is the profile" checklist. */
export async function profileChecklist(businessId: string) {
  const [business, categories, hours, services, staff] = await Promise.all([
    prisma.business.findUniqueOrThrow({
      where: { id: businessId },
      select: {
        logoUrl: true,
        coverUrl: true,
        description: true,
        addressLine: true,
        lat: true,
        lng: true,
        phone: true,
        website: true,
        facebookUrl: true,
        instagramUrl: true,
        tiktokUrl: true,
        cancellationPolicy: true,
        bankAccountNumber: true,
        bankAccountName: true,
        invoiceCompanyName: true,
        invoiceTaxId: true,
      },
    }),
    prisma.businessCategory.count({ where: { businessId } }),
    prisma.businessHours.count({ where: { businessId } }),
    prisma.service.count({ where: { businessId, active: true } }),
    prisma.staff.count({ where: { businessId, active: true } }),
  ]);
  const b = business;
  const checks: [ChecklistId, boolean][] = [
    ["logo", !!b.logoUrl],
    ["cover", !!b.coverUrl],
    ["description", (b.description?.trim().length ?? 0) >= 80],
    ["location", !!b.addressLine && b.lat !== null && b.lng !== null],
    ["categories", categories > 0],
    ["phone", !!b.phone],
    ["social", !!(b.website || b.facebookUrl || b.instagramUrl || b.tiktokUrl)],
    ["policy", !!b.cancellationPolicy?.trim()],
    ["bank", !!(b.bankAccountNumber && b.bankAccountName)],
    ["invoice", !!(b.invoiceCompanyName && b.invoiceTaxId)],
    ["hours", hours > 0],
    ["services", services > 0],
    ["staff", staff > 0],
  ];
  const checklist = checks.map(([id, done]) => ({ id, done }));
  const pct = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100);
  return { checklist, pct, unlocked: pct >= PROFILE_UNLOCK_PCT };
}

/** For the loyalty and marketing APIs: a 403 body when still locked. */
export async function profileLockedError(businessId: string) {
  const { pct, unlocked } = await profileChecklist(businessId);
  return unlocked ? null : { error: "PROFILE_INCOMPLETE", pct, required: PROFILE_UNLOCK_PCT };
}
