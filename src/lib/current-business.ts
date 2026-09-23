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
