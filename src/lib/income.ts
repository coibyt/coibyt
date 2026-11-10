import type { StaffIncomeReport } from "@prisma/client";
import { z } from "zod";
import { getBusinessAccess, type BusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { incomeTotal, pickAmounts, type IncomeAmounts } from "@/lib/income-math";

/** Staff income reports (Doanh thu): a staff member reports what they
 * collected for a booking, the owner checks and approves it. */

export const MAX_INCOME_PHOTOS = 6;
export const INCOME_PHOTO_MAX_BYTES = 6 * 1024 * 1024;
export const INCOME_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
/** The owner's documents for a correction: photos or a PDF, a little bigger. */
export const MAX_OWNER_DOCS = 6;
export const OWNER_DOC_MAX_BYTES = 10 * 1024 * 1024;
export const OWNER_DOC_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

/** Bookings that can be reported: the visit is booked in or done. */
export const REPORTABLE_STATUSES = ["CONFIRMED", "COMPLETED"];

const cents = z.number().int().min(0).max(100_000_000);
const code = z.string().trim().max(40).optional().default("");
const percent = z.number().int().min(0).max(100).default(0);

export { GIFT_DISCOUNTS, giftNet } from "@/lib/income-math";

export const incomeReportSchema = z
  .object({
    // One of the two: a booking, or a personal time block that can earn money.
    bookingId: z.string().min(1).max(40).optional(),
    timeOffId: z.string().min(1).max(40).optional(),
    cashCents: cents.default(0),
    bankCents: cents.default(0),
    // Paid online in advance (Timma, Booksalon…) and the channel.
    onlineCents: cents.default(0),
    onlineSource: code,
    giftCard1Cents: cents.default(0),
    giftCard1Code: code,
    giftCard1Percent: percent,
    giftCard2Cents: cents.default(0),
    giftCard2Code: code,
    giftCard2Percent: percent,
    tipCents: cents.default(0),
    note: z.string().trim().max(500).optional().default(""),
    // Owner correcting someone else's report: the reason the staff member sees.
    ownerEditNote: z.string().trim().max(1000).optional(),
  })
  .refine((d) => !!d.bookingId !== !!d.timeOffId, { message: "TARGET" })
  .refine((d) => d.cashCents + d.bankCents + d.onlineCents + d.giftCard1Cents + d.giftCard2Cents + d.tipCents > 0, { message: "EMPTY" });

/** The stored amounts for what was entered: codes tidied, total worked out. */
export function amountsFrom(d: z.infer<typeof incomeReportSchema>): IncomeAmounts {
  const a = {
    cashCents: d.cashCents,
    bankCents: d.bankCents,
    onlineCents: d.onlineCents,
    onlineSource: d.onlineCents > 0 && d.onlineSource ? d.onlineSource.slice(0, 40) : null,
    giftCard1Cents: d.giftCard1Cents,
    giftCard1Code: d.giftCard1Cents > 0 && d.giftCard1Code ? d.giftCard1Code.toUpperCase() : null,
    giftCard1Percent: d.giftCard1Cents > 0 ? d.giftCard1Percent : 0,
    giftCard2Cents: d.giftCard2Cents,
    giftCard2Code: d.giftCard2Cents > 0 && d.giftCard2Code ? d.giftCard2Code.toUpperCase() : null,
    giftCard2Percent: d.giftCard2Cents > 0 ? d.giftCard2Percent : 0,
    tipCents: d.tipCents,
  };
  return { ...a, totalCents: incomeTotal(a) };
}

/** Same numbers (the codes and channel name don't count as a change). */
export function sameAmounts(a: IncomeAmounts, b: IncomeAmounts) {
  return (
    a.cashCents === b.cashCents &&
    a.bankCents === b.bankCents &&
    a.onlineCents === b.onlineCents &&
    a.giftCard1Cents === b.giftCard1Cents &&
    a.giftCard1Percent === b.giftCard1Percent &&
    a.giftCard2Cents === b.giftCard2Cents &&
    a.giftCard2Percent === b.giftCard2Percent &&
    a.tipCents === b.tipCents
  );
}

/** The owner, or a staff member with their own login. */
export async function incomeAccess(): Promise<BusinessAccess | null> {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.staffId)) return null;
  return access;
}

/** Owners report for any booking; staff only for their own. */
export function canReport(access: BusinessAccess, booking: { businessId: string; staffId: string | null }) {
  if (booking.businessId !== access.business.id) return false;
  return access.isOwner || (!!access.staffId && booking.staffId === access.staffId);
}

/** Who may see a report: the owner, or the staff member it belongs to. */
export function canSee(access: BusinessAccess, report: { businessId: string; staffId: string | null }) {
  if (report.businessId !== access.business.id) return false;
  return access.isOwner || (!!access.staffId && report.staffId === access.staffId);
}

export async function reportWithPhotos(id: string) {
  return prisma.staffIncomeReport.findUnique({
    where: { id },
    include: { photos: { select: PHOTO_SELECT, orderBy: { createdAt: "asc" } } },
  });
}

export const PHOTO_SELECT = { id: true, byOwner: true, mimeType: true, fileName: true } as const;

type PhotoRow = { id: string; byOwner: boolean; mimeType: string; fileName: string | null };

export function reportJson(r: StaffIncomeReport & { photos: PhotoRow[] }) {
  const staffPhotos = r.photos.filter((p) => !p.byOwner);
  const original = r.staffOriginal as unknown as IncomeAmounts | null;
  return {
    id: r.id,
    bookingId: r.bookingId,
    timeOffId: r.timeOffId,
    staffId: r.staffId,
    staffName: r.staffName,
    customerName: r.customerName,
    serviceName: r.serviceName,
    serviceAt: r.serviceAt.toISOString(),
    expectedCents: r.expectedCents,
    currency: r.currency,
    cashCents: r.cashCents,
    bankCents: r.bankCents,
    onlineCents: r.onlineCents,
    onlineSource: r.onlineSource,
    giftCard1Cents: r.giftCard1Cents,
    giftCard1Code: r.giftCard1Code,
    giftCard2Cents: r.giftCard2Cents,
    giftCard2Code: r.giftCard2Code,
    giftCard1Percent: r.giftCard1Percent,
    giftCard2Percent: r.giftCard2Percent,
    tipCents: r.tipCents,
    totalCents: r.totalCents,
    note: r.note,
    status: r.status as "PENDING" | "APPROVED" | "REJECTED",
    approvedAt: r.approvedAt?.toISOString() ?? null,
    ownerNote: r.ownerNote,
    rejectedAt: r.rejectedAt?.toISOString() ?? null,
    reportedById: r.reportedById,
    // The staff member's own numbers when the owner corrected them.
    staffOriginal: original ? pickAmounts(original) : null,
    ownerEditNote: r.ownerEditNote,
    ownerEditedAt: r.ownerEditedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    photos: staffPhotos.map((p) => `/api/business/income-photo/${p.id}`),
    photoIds: staffPhotos.map((p) => p.id),
    ownerDocs: r.photos
      .filter((p) => p.byOwner)
      .map((p) => ({ id: p.id, url: `/api/business/income-photo/${p.id}`, pdf: p.mimeType === "application/pdf", name: p.fileName })),
  };
}

export type IncomeReportJson = ReturnType<typeof reportJson>;
