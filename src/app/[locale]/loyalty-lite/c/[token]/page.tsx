import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Camera, Gift } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { siteSerif } from "@/lib/site-fonts";
import { currentLiteSalon, liteQrDataUrl } from "@/lib/loyalty-lite";
import { liteStrings } from "@/lib/loyalty-lite-strings";
import { LiteMemberCard } from "@/components/loyalty-lite/member-card";
import { LiteOwnerPanel } from "@/components/loyalty-lite/owner-panel";

export const metadata: Metadata = { robots: { index: false } };

/** A Loyalty Lite card (its QR opens this page): the customer sees their
 * stamps; the salon's own signed-in device also gets the stamp button. */
export default async function LiteCardPage({ params }: { params: Promise<{ locale: string; token: string }> }) {
  const { locale, token } = await params;
  if (!/^[A-Za-z0-9]{4,16}$/.test(token)) notFound();
  const code = token.toUpperCase();
  const card = await prisma.liteCard.findUnique({ where: { token: code }, include: { liteSalon: true } });
  // Moved to a full VaraaAi salon on upgrade: same token, the full card page.
  if (!card || card.liteSalon.upgradedBusinessId) {
    const moved = await prisma.loyaltyCard.findUnique({ where: { token: code }, select: { id: true } });
    if (moved) {
      redirect({ href: `/loyalty/${code}`, locale });
      return null;
    }
  }
  if (!card) notFound();
  const salon = card.liteSalon;
  const t = liteStrings(salon.locale);
  const N = salon.stampsRequired;
  const full = card.stamps >= N;
  const viewer = await currentLiteSalon();
  const isOwner = viewer?.id === salon.id;
  const qr = await liteQrDataUrl(card.token, salon.locale);

  return (
    <div className={`${siteSerif.variable} min-h-screen bg-gradient-to-b from-[#fbe3ef] via-[#fdf2f8] to-white pb-16 pt-8`}>
      <div className="container max-w-md space-y-5">
        <LiteMemberCard
          salonName={salon.salonName}
          customerName={card.customerName}
          token={card.token}
          stamps={card.stamps}
          required={N}
          reward={salon.rewardText}
          qr={qr}
          labels={{ member: t.cardMember, code: t.cardCode, reward: t.cardReward, progress: t.cardProgress.replace("{n}", String(Math.min(card.stamps, N))).replace("{total}", String(N)) }}
        />

        {isOwner && <LiteOwnerPanel cardId={card.id} full={full} t={t} required={N} reward={salon.rewardText} />}

        <div className={`rounded-[1.75rem] p-5 ${full ? "bg-gradient-to-br from-[#fff5fa] to-[#fbe3ef] ring-1 ring-[#f3c4dd]" : "bg-white ring-1 ring-[#f3c4dd]"}`}>
          <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
            <Gift className="h-4 w-4 text-[#c42d7f]" />
            {full ? t.cardReady : t.cardLeft.replace("{n}", String(N - card.stamps))}
          </p>
          <p className="mt-2 flex items-start gap-2 text-sm text-ink-500">
            <Camera className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" />
            {t.cardShow}
          </p>
          <p className="mt-1 pl-6 text-xs text-ink-400">{t.cardSave}</p>
        </div>

        {!isOwner && (
          <Link href="/loyalty-lite" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-400 hover:text-ink-700">
            {t.promo}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
