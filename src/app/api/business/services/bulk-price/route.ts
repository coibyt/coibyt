import { NextResponse } from "next/server";
import { z } from "zod";
import { requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { adjustPrice } from "@/lib/service-price";

const schema = z.object({
  ids: z.array(z.string().cuid()).min(1).max(500),
  // e.g. 10 = +10 %, -15 = −15 %
  percent: z.number().min(-90).max(300),
  round: z.boolean().default(true),
});

/** Raises or lowers the price of several services at once — and each staff
 * member's own price for them — by a percentage, optionally rounded. */
export async function POST(req: Request) {
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { ids, percent, round } = parsed.data;

  const services = await prisma.service.findMany({
    where: { id: { in: ids }, businessId: result.businessId },
    select: { id: true, priceCents: true, currency: true, staff: { select: { staffId: true, priceCentsOverride: true } } },
  });
  await prisma.$transaction(
    services.flatMap((s) => [
      prisma.service.update({ where: { id: s.id }, data: { priceCents: adjustPrice(s.priceCents, s.currency, percent, round) } }),
      ...s.staff
        .filter((x) => x.priceCentsOverride !== null)
        .map((x) =>
          prisma.staffService.update({
            where: { staffId_serviceId: { staffId: x.staffId, serviceId: s.id } },
            data: { priceCentsOverride: adjustPrice(x.priceCentsOverride!, s.currency, percent, round) },
          })
        ),
    ])
  );
  return NextResponse.json({ updated: services.length });
}
