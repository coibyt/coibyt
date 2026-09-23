import { getOwnedBusiness } from "@/lib/current-business";
import { getTranslations } from "next-intl/server";
import { BusinessImagesManager } from "@/components/business-images-manager";
import { BookingEmbedCard } from "@/components/booking-embed-card";
import { BankInfoCard } from "@/components/bank-info-card";
import { ContactLinksCard } from "@/components/contact-links-card";
import { PreferencesCard } from "@/components/preferences-card";

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
      <ContactLinksCard
        contact={{
          phone: business.phone,
          email: business.email,
          website: business.website,
          facebookUrl: business.facebookUrl,
          instagramUrl: business.instagramUrl,
          tiktokUrl: business.tiktokUrl,
          whatsapp: business.whatsapp,
        }}
      />
      <PreferencesCard
        preferences={{
          defaultLocale: business.defaultLocale,
          defaultCurrency: business.defaultCurrency,
          cancellationWindowHours: business.cancellationWindowHours,
        }}
      />
      <BankInfoCard
        bankInfo={{
          bankName: business.bankName,
          bankAccountNumber: business.bankAccountNumber,
          bankAccountName: business.bankAccountName,
          bankBic: business.bankBic,
        }}
      />
      <BookingEmbedCard slug={business.slug} defaultLocale={business.defaultLocale} />
    </div>
  );
}
