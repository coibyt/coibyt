import { getOwnedBusiness } from "@/lib/current-business";
import { getTranslations } from "next-intl/server";
import { BusinessImagesManager } from "@/components/business-images-manager";
import { BookingEmbedCard } from "@/components/booking-embed-card";

export default async function BusinessSettingsPage() {
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-ink-900">{t("settings")}</h1>
      <BusinessImagesManager
        logoUrl={business.logoUrl}
        coverUrl={business.coverUrl}
        businessName={business.name}
      />
      <BookingEmbedCard slug={business.slug} />
    </div>
  );
}
