import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOnly, getOwnedBusiness } from "@/lib/current-business";
import { LoyaltyManager } from "@/components/loyalty-manager";

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

  const owned = await requireOwnerOnly();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const t = await getTranslations("dashboard");
  const business = await getOwnedBusiness();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">{t("loyalty.nav")}</h1>
        <p className="mt-1 text-sm text-ink-400">{t("loyalty.subtitle")}</p>
      </div>
      <LoyaltyManager
        locale={locale}
        defaultCurrency={business?.defaultCurrency ?? "VND"}
        initialCode={code ?? ""}
      />
    </div>
  );
}
