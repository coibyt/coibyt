import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { businessApplicationSchema } from "@/lib/validations";
import { timezoneForCountry } from "@/lib/countries";
import { slugify } from "@/lib/slugify";
import { sendVerificationEmail } from "@/lib/email-verification";
import { approveBusiness } from "@/lib/approve-business";

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
      timezone: timezoneForCountry(data.country) ?? "Asia/Ho_Chi_Minh",
      status: "PENDING",
      categories: { create: [{ categoryId: data.categoryId }] },
    },
  });

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { role: "BUSINESS_OWNER" },
    select: { name: true, email: true, locale: true, emailVerified: true },
  });

  // A verified email (already true for Google sign-ins, which the adapter
  // marks verified on OAuth link) skips the manual-review step entirely —
  // an unverified one gets a link that does the same the moment it's clicked.
  if (user.emailVerified) {
    await approveBusiness(business.id);
  } else {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await sendVerificationEmail({
      email: user.email,
      name: user.name,
      locale: user.locale,
      siteUrl,
    });
  }

  return NextResponse.json({ business }, { status: 201 });
}
