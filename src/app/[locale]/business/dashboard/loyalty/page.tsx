import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { getBusinessAccess } from "@/lib/current-business";
import { LoyaltyManager } from "@/components/loyalty-manager";
import { ReadOnlyBanner } from "@/components/read-only-banner";
import { settleReferrals } from "@/lib/loyalty-referral";

export default async function LoyaltyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ code?: string }>;
}) {
  const { locale } = await params;
  const { code } = await searchParams;

  const session = await auth();
  if (!session?.user) {
    // Scanned from a phone camera while signed out: come back here after
    // signing in, with the code still filled in.
    const back = `/business/dashboard/loyalty${code ? `?code=${encodeURIComponent(code)}` : ""}`;
    redirect({ href: `/auth/sign-in?callbackUrl=${encodeURIComponent(back)}`, locale });
    return null;
  }

  // The owner, and staff who work with bookings: they scan cards and issue
  // new ones; only the owner sets up the program itself.
  const access = await getBusinessAccess();
  if (!access || !(access.isOwner || access.permissions.bookings || access.viewOnlyEverywhere)) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const canUse = access.isOwner || access.permissions.bookings;
  const t = await getTranslations("dashboard");
  const business = access.business;
  // Friends' visits since the last look earn their inviters bonus tickets.
  if (business) await settleReferrals({ businessId: business.id });

  return (
    <div className="space-y-6">
      {!canUse && <ReadOnlyBanner locale={locale} />}
      <div>
        <h1 className="text-xl font-bold text-ink-900">{t("loyalty.nav")}</h1>
        <p className="mt-1 text-sm text-ink-400">{t("loyalty.subtitle")}</p>
      </div>
      <LoyaltyManager
        locale={locale}
        defaultCurrency={business?.defaultCurrency ?? "VND"}
        timeZone={business?.timezone ?? "Europe/Helsinki"}
        initialCode={code ?? ""}
        canEditProgram={access.isOwner}
      />
    </div>
  );
}
