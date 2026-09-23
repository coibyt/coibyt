import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { businessApplicationSchema } from "@/lib/validations";
import { slugify } from "@/lib/slugify";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const existing = await prisma.business.findUnique({
    where: { ownerId: session.user.id },
  });
  if (existing) {
    return NextResponse.json({ error: "ALREADY_APPLIED" }, { status: 409 });
  }

  const body = await req.json();
  const parsed = businessApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const baseSlug = slugify(data.name) || "business";
  let slug = baseSlug;
  let n = 1;
  while (await prisma.business.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++n}`;
  }

  const business = await prisma.business.create({
    data: {
      ownerId: session.user.id,
      slug,
      name: data.name,
      description: data.description,
      addressLine: data.addressLine,
      city: data.city,
      phone: data.phone,
      lat: data.lat,
      lng: data.lng,
      country: data.country,
      status: "PENDING",
      categories: { create: [{ categoryId: data.categoryId }] },
    },
  });

  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: "BUSINESS_OWNER" },
  });

  return NextResponse.json({ business }, { status: 201 });
}
