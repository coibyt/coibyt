import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Returns the signed-in user's own Business row, or null. Used to gate
 * every business-dashboard page and API route behind real ownership. */
export async function getOwnedBusiness() {
  const session = await auth();
  if (!session?.user) return null;
  return prisma.business.findUnique({ where: { ownerId: session.user.id } });
}

/** Same, but throws a 404-worthy null for API routes that require it. */
export async function requireOwnedBusinessId(): Promise<string | null> {
  const business = await getOwnedBusiness();
  return business?.id ?? null;
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
