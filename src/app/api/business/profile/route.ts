import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const profileSchema = z.object({
  name: z.string().min(2).max(120),
  addressLine: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  country: z.string().length(2).optional(),
  categoryIds: z.array(z.string().cuid()).min(1).max(10),
});

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const businessId = owned.businessId;

  const parsed = profileSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  await prisma.$transaction([
    prisma.business.update({
      where: { id: businessId },
      data: {
        name: data.name,
        addressLine: data.addressLine,
        city: data.city,
        lat: data.lat,
        lng: data.lng,
        country: data.country,
      },
    }),
    prisma.businessCategory.deleteMany({ where: { businessId } }),
    prisma.businessCategory.createMany({
      data: data.categoryIds.map((categoryId) => ({ businessId, categoryId })),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
