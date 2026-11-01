import { redirect } from "@/i18n/navigation";
import { getBusinessAccess } from "@/lib/current-business";
import { affiliateDashboard } from "@/lib/affiliate-stats";
import { siteSerif } from "@/lib/site-fonts";
import { AffiliateStudio } from "@/components/affiliate-studio";
import { ReadOnlyBanner } from "@/components/read-only-banner";
import { profileChecklist } from "@/lib/profile-completeness";
import { ProfileLock } from "@/components/profile-lock";

export default async function AffiliatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access || !(access.isOwner || access.viewOnlyEverywhere)) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;
  const profile = await profileChecklist(business.id);
  if (!profile.unlocked) {
    return <ProfileLock locale={locale} feature="marketing" isOwner={access.isOwner} pct={profile.pct} checklist={profile.checklist} />;
  }
  const data = await affiliateDashboard(business.id, "all");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  return (
    <div className={`${siteSerif.variable} space-y-4`}>
      {!access.isOwner && <ReadOnlyBanner locale={locale} />}
      <AffiliateStudio
        initial={data}
        initialPeriod="all"
        locale={locale}
        currency={business.defaultCurrency}
        // No locale prefix: customers opening the link get their own language.
        linkBase={`${siteUrl}/b/${business.slug}`}
        salonName={business.name}
        isOwner={access.isOwner}
      />
    </div>
  );
}
