import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const bankInfoSchema = z.object({
  bankName: z.string().max(120).optional().or(z.literal("")),
  bankAccountNumber: z.string().max(60).optional().or(z.literal("")),
  bankAccountName: z.string().max(120).optional().or(z.literal("")),
  bankBic: z.string().max(30).optional().or(z.literal("")),
});

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const businessId = owned.businessId;

  const body = await req.json();
  const parsed = bankInfoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      bankName: data.bankName || null,
      bankAccountNumber: data.bankAccountNumber || null,
      bankAccountName: data.bankAccountName || null,
      bankBic: data.bankBic || null,
    },
    select: { bankName: true, bankAccountNumber: true, bankAccountName: true, bankBic: true },
  });

  return NextResponse.json(business);
}
