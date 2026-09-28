import { auth } from "@/auth";
import { requireOwnerOnly, listOwnedBusinesses } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { AddBranchButton } from "@/components/branch-switcher";
import { BusinessImagesManager } from "@/components/business-images-manager";
import { BookingEmbedCard } from "@/components/booking-embed-card";
import { BankInfoCard } from "@/components/bank-info-card";
import { ContactLinksCard } from "@/components/contact-links-card";
import { PreferencesCard } from "@/components/preferences-card";
import { BusinessProfileCard } from "@/components/business-profile-card";
import { AccountSettingsCard } from "@/components/account-settings-card";

export default async function BusinessSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOnly();
  const t = await getTranslations("business");
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const business = await prisma.business.findUniqueOrThrow({ where: { id: owned.businessId } });

  const session = await auth();
  // The shared "all branches" booking page only exists for owners with 2+ branches.
  const ownedBranches = session?.user
    ? (await listOwnedBusinesses(session.user.id)).filter((b) => b.status === "APPROVED")
    : [];
  const [allCategories, ownCategoryLinks, currentUser] = await Promise.all([
    prisma.category.findMany({ select: { id: true, nameVi: true, nameEn: true } }),
    prisma.businessCategory.findMany({
      where: { businessId: business.id },
      select: { categoryId: true },
    }),
    session?.user
      ? prisma.user.findUnique({
          where: { id: session.user.id },
          select: { email: true, pendingEmail: true, password: true },
        })
      : null,
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-ink-900">{t("settings")}</h1>
        <AddBranchButton locale={locale} />
      </div>
      <BusinessProfileCard
        name={business.name}
        description={business.description}
        addressLine={business.addressLine}
        city={business.city}
        lat={business.lat}
        lng={business.lng}
        country={business.country}
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
          introVideoUrl: business.introVideoUrl,
          googleMapsUrl: business.googleMapsUrl,
          whatsapp: business.whatsapp,
        }}
      />
      <PreferencesCard
        preferences={{
          defaultLocale: business.defaultLocale,
          defaultCurrency: business.defaultCurrency,
          cancellationWindowHours: business.cancellationWindowHours,
          cancellationPolicy: business.cancellationPolicy ?? "",
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
      {ownedBranches.length >= 2 && (
        <BookingEmbedCard
          variant="chain"
          slug={ownedBranches[0].slug}
          defaultLocale={business.defaultLocale}
        />
      )}
      {currentUser && (
        <AccountSettingsCard
          currentEmail={currentUser.email}
          pendingEmail={currentUser.pendingEmail}
          hasPassword={!!currentUser.password}
        />
      )}
    </div>
  );
}
