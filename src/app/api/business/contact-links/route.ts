import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const urlOrEmpty = z.string().url().max(300).optional().or(z.literal(""));

const contactLinksSchema = z.object({
  phone: z.string().max(30).optional().or(z.literal("")),
  email: z.string().email().max(180).optional().or(z.literal("")),
  website: urlOrEmpty,
  facebookUrl: urlOrEmpty,
  instagramUrl: urlOrEmpty,
  tiktokUrl: urlOrEmpty,
  whatsapp: z.string().max(30).optional().or(z.literal("")),
});

export async function PUT(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = contactLinksSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const business = await prisma.business.update({
    where: { id: businessId },
    data: {
      phone: data.phone || null,
      email: data.email || null,
      website: data.website || null,
      facebookUrl: data.facebookUrl || null,
      instagramUrl: data.instagramUrl || null,
      tiktokUrl: data.tiktokUrl || null,
      whatsapp: data.whatsapp || null,
    },
    select: {
      phone: true,
      email: true,
      website: true,
      facebookUrl: true,
      instagramUrl: true,
      tiktokUrl: true,
      whatsapp: true,
    },
  });

  return NextResponse.json(business);
}
