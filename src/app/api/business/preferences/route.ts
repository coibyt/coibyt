import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { routing } from "@/i18n/routing";

const preferencesSchema = z.object({
  defaultLocale: z.enum([...routing.locales] as [string, ...string[]]),
  defaultCurrency: z.enum(["VND", "USD", "EUR"]),
  cancellationWindowHours: z.coerce.number().int().min(0).max(168),
});

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const businessId = owned.businessId;

  const parsed = preferencesSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const business = await prisma.business.update({
    where: { id: businessId },
    data: parsed.data,
    select: { defaultLocale: true, defaultCurrency: true, cancellationWindowHours: true },
  });

  return NextResponse.json(business);
}
