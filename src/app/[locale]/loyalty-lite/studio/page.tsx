import type { Metadata } from "next";
import { redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { siteSerif } from "@/lib/site-fonts";
import { currentLiteSession, LITE_MAX_CARDS, liteCardUrl } from "@/lib/loyalty-lite";
import { liteStrings } from "@/lib/loyalty-lite-strings";
import { LiteStudio } from "@/components/loyalty-lite/studio";

export const metadata: Metadata = { robots: { index: false } };

/** The salon's Loyalty Lite dashboard; signed in by the cookie its emailed link set. */
export default async function LoyaltyLiteStudioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await currentLiteSession();
  if (!session) {
    redirect({ href: "/loyalty-lite", locale });
    return null;
  }
  const { salon } = session;
  const [cards, stamps30] = await Promise.all([
    prisma.liteCard.findMany({ where: { liteSalonId: salon.id }, orderBy: [{ lastStampAt: "desc" }, { createdAt: "desc" }] }),
    prisma.liteCardEvent.count({ where: { kind: "STAMP", card: { liteSalonId: salon.id }, createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } }),
  ]);
  const t = liteStrings(salon.locale);

  return (
    // The loyalty card's pink, like /loyalty-lite.
    <div className={`${siteSerif.variable} bg-gradient-to-b from-[#fdf2f8] via-[#fff7fb] to-white`}>
    <div className="container max-w-6xl py-8 sm:py-10">
      <LiteStudio
        locale={salon.locale}
        t={t}
        cardBase={liteCardUrl("", salon.locale)}
        maxCards={LITE_MAX_CARDS}
        stamps30={stamps30}
        role={session.role}
        staffName={session.staff?.name ?? null}
        account={{ ownerName: salon.ownerName ?? "", hasPassword: !!salon.passwordHash }}
        initial={{
          salonName: salon.salonName,
          email: salon.email,
          stampsRequired: salon.stampsRequired,
          rewardText: salon.rewardText,
          upgraded: !!salon.upgradedBusinessId,
          cards: cards.map((c) => ({
            id: c.id,
            token: c.token,
            customerName: c.customerName,
            customerEmail: c.customerEmail,
            stamps: c.stamps,
            totalStamps: c.totalStamps,
            rewardsUsed: c.rewardsUsed,
            lastStampAt: c.lastStampAt?.toISOString() ?? null,
            createdAt: c.createdAt.toISOString(),
          })),
        }}
      />
    </div>
    </div>
  );
}
