import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const invoiceInfoSchema = z.object({
  invoiceCompanyName: z.string().max(160).optional().or(z.literal("")),
  invoiceCompanyAddress: z.string().max(400).optional().or(z.literal("")),
  invoiceTaxId: z.string().max(60).optional().or(z.literal("")),
  invoiceVatPercent: z.number().min(0).max(100),
});

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const businessId = owned.businessId;

  const parsed = invoiceInfoSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      invoiceCompanyName: data.invoiceCompanyName || null,
      invoiceCompanyAddress: data.invoiceCompanyAddress || null,
      invoiceTaxId: data.invoiceTaxId || null,
      invoiceVatPercent: data.invoiceVatPercent,
    },
    select: {
      invoiceCompanyName: true,
      invoiceCompanyAddress: true,
      invoiceTaxId: true,
      invoiceVatPercent: true,
    },
  });

  return NextResponse.json(business);
}
