import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { ACTIVE_BUSINESS_COOKIE } from "@/lib/current-business";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { businessApplicationSchema, businessApplicationWithAccountSchema } from "@/lib/validations";
import { timezoneForCountry } from "@/lib/countries";
import { slugify } from "@/lib/slugify";
import { sendVerificationEmail } from "@/lib/email-verification";
import { approveBusiness } from "@/lib/approve-business";
import { awardSignupBonusIfFirstBusiness, checkAndAwardReferralBonus } from "@/lib/vara-points";
import type { z } from "zod";

export async function POST(req: Request) {
  const session = await auth();
  const body = await req.json();

  let ownerId: string;
  let ownerName: string;
  let ownerEmail: string;
  let ownerLocale: string;
  let ownerEmailVerified: Date | null;
  let businessInput: z.infer<typeof businessApplicationSchema>;

  if (session?.user) {
    // An owner whose salon is already live may add further branches; one
    // still waiting for approval/verification can't pile up more applications.
    const existing = await prisma.business.findMany({
      where: { ownerId: session.user.id },
      select: { status: true },
    });
    if (existing.some((b) => b.status !== "APPROVED")) {
      return NextResponse.json({ error: "ALREADY_APPLIED" }, { status: 409 });
    }

    const parsed = businessApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    businessInput = parsed.data;

    const user = await prisma.user.findUniqueOrThrow({ where: { id: session.user.id } });
    ownerId = user.id;
    ownerName = user.name;
    ownerEmail = user.email;
    ownerLocale = user.locale;
    ownerEmailVerified = user.emailVerified;
  } else {
    // A visitor with no account yet can apply directly — the extra
    // name/email/password fields create their user row in this same
    // request, so the business application also doubles as sign-up. That
    // account becomes both the business owner and (once email-verified) an
    // ordinary customer account.
    const parsed = businessApplicationWithAccountSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const { ownerName: newOwnerName, email, password, ...rest } = parsed.data;
    businessInput = rest;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: { name: newOwnerName, email, phone: rest.phone, password: hashed },
    });
    ownerId = newUser.id;
    ownerName = newUser.name;
    ownerEmail = newUser.email;
    ownerLocale = newUser.locale;
    ownerEmailVerified = newUser.emailVerified;
  }

  const baseSlug = slugify(businessInput.name) || "business";
  let slug = baseSlug;
  let n = 1;
  while (await prisma.business.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++n}`;
  }

  // The same `?aff=` cookie feeds two separate referral programs sharing one
  // code space: the admin-run PlatformAffiliate commission program, and an
  // owner's own vara-points link (see PlatformAffiliateCookieSetter and
  // src/lib/vara-points.ts). A code only ever matches one or the other.
  const platformAffCode = (await cookies()).get("varaaai_platform_aff")?.value;
  const [platformAffiliate, referringOwner] = platformAffCode
    ? await Promise.all([
        prisma.platformAffiliate.findFirst({ where: { code: platformAffCode, active: true } }),
        prisma.user.findUnique({ where: { referralCode: platformAffCode } }),
      ])
    : [null, null];
  // An owner can't earn their own referral bonus by applying for a second
  // branch through their own link.
  const referredByOwnerId = referringOwner && referringOwner.id !== ownerId ? referringOwner.id : undefined;

  const business = await prisma.business.create({
    data: {
      ownerId,
      slug,
      name: businessInput.name,
      description: businessInput.description,
      addressLine: businessInput.addressLine,
      city: businessInput.city,
      phone: businessInput.phone,
      lat: businessInput.lat,
      lng: businessInput.lng,
      country: businessInput.country,
      referredByAffiliateId: platformAffiliate?.id,
      referredByOwnerId,
      timezone: timezoneForCountry(businessInput.country) ?? "Asia/Ho_Chi_Minh",
      status: "PENDING",
      categories: { create: [{ categoryId: businessInput.categoryId }] },
    },
  });

  await prisma.user.update({ where: { id: ownerId }, data: { role: "BUSINESS_OWNER" } });
  await awardSignupBonusIfFirstBusiness(ownerId);
  await checkAndAwardReferralBonus(business.id);

  // A verified email (already true for Google sign-ins, which the adapter
  // marks verified on OAuth link) skips the manual-review step entirely —
  // an unverified one (always the case for a brand-new guest signup) gets a
  // link that does the same the moment it's clicked.
  if (ownerEmailVerified) {
    await approveBusiness(business.id);
  } else {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
    await sendVerificationEmail({
      email: ownerEmail,
      name: ownerName,
      locale: ownerLocale,
      siteUrl,
    });
  }

  // Land the owner on the branch they just created.
  (await cookies()).set(ACTIVE_BUSINESS_COOKIE, business.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.json({ business }, { status: 201 });
}
