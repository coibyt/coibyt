import type { StaffIncomeReport } from "@prisma/client";
import { z } from "zod";
import { getBusinessAccess, type BusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Staff income reports (Doanh thu): a staff member reports what they
 * collected for a booking, the owner checks and approves it. */

export const MAX_INCOME_PHOTOS = 6;
export const INCOME_PHOTO_MAX_BYTES = 6 * 1024 * 1024;
export const INCOME_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

/** Bookings that can be reported: the visit is booked in or done. */
export const REPORTABLE_STATUSES = ["CONFIRMED", "COMPLETED"];

const cents = z.number().int().min(0).max(100_000_000);
const code = z.string().trim().max(40).optional().default("");

export const incomeReportSchema = z
  .object({
    bookingId: z.string().min(1).max(40),
    cashCents: cents.default(0),
    bankCents: cents.default(0),
    giftCard1Cents: cents.default(0),
    giftCard1Code: code,
    giftCard2Cents: cents.default(0),
    giftCard2Code: code,
    note: z.string().trim().max(500).optional().default(""),
  })
  .refine((d) => d.cashCents + d.bankCents + d.giftCard1Cents + d.giftCard2Cents > 0, { message: "EMPTY" });

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
    include: { photos: { select: { id: true }, orderBy: { createdAt: "asc" } } },
  });
}

export function reportJson(r: StaffIncomeReport & { photos: { id: string }[] }) {
  return {
    id: r.id,
    bookingId: r.bookingId,
    staffId: r.staffId,
    staffName: r.staffName,
    customerName: r.customerName,
    serviceName: r.serviceName,
    serviceAt: r.serviceAt.toISOString(),
    expectedCents: r.expectedCents,
    currency: r.currency,
    cashCents: r.cashCents,
    bankCents: r.bankCents,
    giftCard1Cents: r.giftCard1Cents,
    giftCard1Code: r.giftCard1Code,
    giftCard2Cents: r.giftCard2Cents,
    giftCard2Code: r.giftCard2Code,
    totalCents: r.totalCents,
    note: r.note,
    status: r.status as "PENDING" | "APPROVED" | "REJECTED",
    approvedAt: r.approvedAt?.toISOString() ?? null,
    ownerNote: r.ownerNote,
    rejectedAt: r.rejectedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    photos: r.photos.map((p) => `/api/business/income-photo/${p.id}`),
    photoIds: r.photos.map((p) => p.id),
  };
}

export type IncomeReportJson = ReturnType<typeof reportJson>;
