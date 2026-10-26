import type { Metadata } from "next";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess } from "@/lib/current-business";
import { ensureReferralCode, inviteUrl, settleReferrals } from "@/lib/loyalty-referral";
import { loyaltyCardStrings, firstName } from "@/lib/loyalty-card-strings";
import { siteSerif } from "@/lib/site-fonts";
import { routing } from "@/i18n/routing";
import { LoyaltyMemberCard, type MemberCardData } from "@/components/loyalty-member-card";

type Params = Promise<{ locale: string; token: string }>;

// A customer's own card: never in search results.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  return { title: loyaltyCardStrings(locale).memberCard, robots: { index: false, follow: false } };
}

/** What a loyalty QR opens: the member card with the customer's name, their
 * tickets, the invite-a-friend link and history. Anyone holding the QR sees
 * it; the salon's own staff also get an "Add 1 ticket" button. */
export default async function LoyaltyCardPage({ params }: { params: Params }) {
  const { locale, token } = await params;
  const S = loyaltyCardStrings(locale);

  const found = await prisma.loyaltyCard.findUnique({
    where: { token: decodeURIComponent(token).trim().toUpperCase() },
    select: { id: true },
  });
  if (!found) {
    return (
      <div className="container max-w-md py-24 text-center">
        <h1 className="text-xl font-bold text-ink-900">{S.notFoundTitle}</h1>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:underline">
          VaraaAi
        </Link>
      </div>
    );
  }

  // Friends' visits may have earned bonus tickets since the last look.
  await settleReferrals({ cardId: found.id });
  const card = (await prisma.loyaltyCard.findUnique({
    where: { id: found.id },
    include: {
      business: {
        select: { id: true, name: true, slug: true, logoUrl: true, city: true, phone: true, loyaltyProgram: true },
      },
      scans: { select: { createdAt: true }, orderBy: { createdAt: "desc" }, take: 30 },
      rewards: { select: { createdAt: true }, orderBy: { createdAt: "desc" }, take: 30 },
      referrals: { select: { friendName: true, status: true, createdAt: true, rewardedAt: true }, orderBy: { createdAt: "desc" } },
    },
  }))!;
  const code = await ensureReferralCode(card);

  const [session, access] = await Promise.all([auth(), getBusinessAccess()]);
  const isStaff =
    !!access && access.business.id === card.businessId && (access.isOwner || access.permissions.bookings);

  const program = card.business.loyaltyProgram;
  const history: MemberCardData["history"] = [
    ...card.scans.map((s) => ({ kind: "visit" as const, at: s.createdAt.toISOString() })),
    ...card.referrals
      .filter((r) => r.status === "REWARDED" && r.rewardedAt)
      .map((r) => ({ kind: "bonus" as const, at: r.rewardedAt!.toISOString() })),
    ...card.rewards.map((r) => ({ kind: "reward" as const, at: r.createdAt.toISOString() })),
  ]
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 30);

  const data: MemberCardData = {
    token: card.token,
    customerName: card.customerName,
    points: card.points,
    rewardReady: card.rewardReady,
    rewardsEarned: card.rewardsEarned,
    inviteUrl: inviteUrl(code, locale === routing.defaultLocale ? "" : `/${locale}`),
    program: program ? { pointsRequired: program.pointsRequired, discountPercent: program.discountPercent } : null,
    business: {
      name: card.business.name,
      slug: card.business.slug,
      logoUrl: card.business.logoUrl,
      city: card.business.city,
      phone: card.business.phone,
    },
    // First names only — this page is open to whoever holds the QR.
    friends: card.referrals.map((r) => ({ name: firstName(r.friendName), rewarded: r.status === "REWARDED" })),
    history,
  };

  return (
    <div className={siteSerif.variable}>
      <LoyaltyMemberCard data={data} locale={locale} isStaff={isStaff} signedIn={!!session?.user} />
    </div>
  );
}
