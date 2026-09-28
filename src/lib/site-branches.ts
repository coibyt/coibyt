import { prisma } from "@/lib/prisma";

/** Every approved branch under the same owner, oldest first — used for the
 * footer's location cards and the booking page's branch picker on a salon's
 * public site (mirrors the multi-branch dashboard switcher). */
export async function getSiteBranches(ownerId: string) {
  return prisma.business.findMany({
    where: { ownerId, status: "APPROVED" },
    orderBy: { createdAt: "asc" },
    select: {
      slug: true,
      name: true,
      addressLine: true,
      city: true,
      phone: true,
      email: true,
      googleMapsUrl: true,
      logoUrl: true,
    },
  });
}
