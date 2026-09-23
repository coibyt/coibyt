import { getOwnedBusiness } from "@/lib/current-business";
import { getTranslations } from "next-intl/server";
import { BusinessImagesManager } from "@/components/business-images-manager";

export default async function BusinessSettingsPage() {
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("settings")}</h1>
      <BusinessImagesManager
        logoUrl={business.logoUrl}
        coverUrl={business.coverUrl}
        businessName={business.name}
      />
    </div>
  );
}
