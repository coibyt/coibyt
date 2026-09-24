import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { Business } from "@prisma/client";

export type StaffSection = "services" | "bookings" | "customers" | "hours" | "reviews";

export interface StaffPermissions {
  services: boolean;
  bookings: boolean;
  customers: boolean;
  hours: boolean;
  reviews: boolean;
}

const OWNER_PERMISSIONS: StaffPermissions = {
  services: true,
  bookings: true,
  customers: true,
  hours: true,
  reviews: true,
};

export interface BusinessAccess {
  business: Business;
  isOwner: boolean;
  staffId?: string;
  permissions: StaffPermissions;
  /** Separate from `permissions.bookings` — a staff member can see the
   * bookings calendar without seeing customers' phone/email on each booking
   * unless this is also granted. */
  canViewCustomerContactInfo: boolean;
}

/** Resolves the signed-in user to the business they can act on — either as
 * the owner, or as an active staff member with their own login. Staff
 * management and Settings are intentionally never granted here: those stay
 * gated behind `isOwner` at each call site regardless of the permission
 * flags, since they touch credentials, payout details and the staff roster
 * itself. */
export async function getBusinessAccess(): Promise<BusinessAccess | null> {
  const session = await auth();
  if (!session?.user) return null;

  const owned = await prisma.business.findUnique({ where: { ownerId: session.user.id } });
  if (owned) {
    return {
      business: owned,
      isOwner: true,
      permissions: OWNER_PERMISSIONS,
      canViewCustomerContactInfo: true,
    };
  }

  const staff = await prisma.staff.findFirst({
    where: { userId: session.user.id, active: true },
    include: { business: true },
  });
  if (!staff) return null;

  return {
    business: staff.business,
    isOwner: false,
    staffId: staff.id,
    permissions: {
      services: staff.canViewServices,
      bookings: staff.canViewBookings,
      customers: staff.canViewCustomers,
      hours: staff.canViewHours,
      reviews: staff.canViewReviews,
    },
    canViewCustomerContactInfo: staff.canViewCustomerContactInfo,
  };
}

/** Returns the signed-in user's own Business row (as owner or permitted
 * staff), or null. Used to gate every business-dashboard page and API route
 * behind real access — see `getBusinessAccess` for what "access" means. */
export async function getOwnedBusiness() {
  return (await getBusinessAccess())?.business ?? null;
}

/** Same, but throws a 404-worthy null for API routes that require it. */
export async function requireOwnedBusinessId(): Promise<string | null> {
  const business = await getOwnedBusiness();
  return business?.id ?? null;
}

/** For pages/routes that must stay owner-only no matter what a staff
 * member's permission flags say — Settings and Staff management. */
export async function requireOwnerOnly(): Promise<{ businessId: string } | null> {
  const access = await getBusinessAccess();
  if (!access?.isOwner) return null;
  return { businessId: access.business.id };
}

/** For a "view-only" dashboard section a staff member's permissions might
 * or might not cover (services, bookings, customers, hours, reviews). The
 * owner always passes. */
export async function requireSectionBusinessId(
  section: StaffSection
): Promise<string | null> {
  const access = await getBusinessAccess();
  if (!access) return null;
  if (access.isOwner) return access.business.id;
  return access.permissions[section] ? access.business.id : null;
}

/** For actions that should stay blocked until the business is actually
 * live — e.g. posting services — not just ownership. A business reaches
 * APPROVED either via admin review or automatically once its owner
 * verifies their email (see /api/auth/verify-email), so this is really
 * "has the owner verified their email (or been approved) yet". */
export async function requireApprovedOwnedBusinessId(): Promise<
  { businessId: string } | { error: "FORBIDDEN" | "NOT_APPROVED" }
> {
  const business = await getOwnedBusiness();
  if (!business) return { error: "FORBIDDEN" };
  if (business.status !== "APPROVED") return { error: "NOT_APPROVED" };
  return { businessId: business.id };
}
