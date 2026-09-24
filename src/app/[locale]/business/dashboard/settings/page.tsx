import { auth } from "@/auth";
import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { BusinessImagesManager } from "@/components/business-images-manager";
import { BookingEmbedCard } from "@/components/booking-embed-card";
import { BankInfoCard } from "@/components/bank-info-card";
import { ContactLinksCard } from "@/components/contact-links-card";
import { PreferencesCard } from "@/components/preferences-card";
import { BusinessProfileCard } from "@/components/business-profile-card";
import { AccountSettingsCard } from "@/components/account-settings-card";

export default async function BusinessSettingsPage() {
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

  const session = await auth();
  const [allCategories, ownCategoryLinks, currentUser] = await Promise.all([
    prisma.category.findMany({ select: { id: true, nameVi: true, nameEn: true } }),
    prisma.businessCategory.findMany({
      where: { businessId: business.id },
      select: { categoryId: true },
    }),
    session?.user
      ? prisma.user.findUnique({
          where: { id: session.user.id },
          select: { email: true, password: true },
        })
      : null,
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-ink-900">{t("settings")}</h1>
      <BusinessProfileCard
        name={business.name}
        addressLine={business.addressLine}
        city={business.city}
        lat={business.lat}
        lng={business.lng}
        categories={allCategories}
        selectedCategoryIds={ownCategoryLinks.map((l) => l.categoryId)}
      />
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
          youtubeUrl: business.youtubeUrl,
          googleMapsUrl: business.googleMapsUrl,
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
      {currentUser && (
        <AccountSettingsCard currentEmail={currentUser.email} hasPassword={!!currentUser.password} />
      )}
    </div>
  );
}
