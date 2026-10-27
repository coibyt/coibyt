import { auth } from "@/auth";
import { requireOwnerOnly, listOwnedBusinesses } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { MapPin } from "lucide-react";
import { AddBranchButton } from "@/components/branch-switcher";
import { BusinessImagesManager } from "@/components/business-images-manager";
import { BookingEmbedCard } from "@/components/booking-embed-card";
import { BankInfoCard } from "@/components/bank-info-card";
import { InvoiceInfoCard } from "@/components/invoice-info-card";
import { ContactLinksCard } from "@/components/contact-links-card";
import { PreferencesCard } from "@/components/preferences-card";
import { BusinessProfileCard } from "@/components/business-profile-card";
import { AccountSettingsCard } from "@/components/account-settings-card";
import { SettingsHero, SettingsNav, SettingsSection } from "@/components/settings-shell";
import { siteSerif } from "@/lib/site-fonts";
import { settingsStrings, type ChecklistId, type SettingsSectionId } from "@/lib/settings-strings";

export default async function BusinessSettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const S = settingsStrings(locale);
  const business = await prisma.business.findUniqueOrThrow({ where: { id: owned.businessId } });

  const session = await auth();
  const allBranches = session?.user ? await listOwnedBusinesses(session.user.id) : [];
  // The shared "all branches" booking page only exists for owners with 2+ branches.
  const ownedBranches = allBranches.filter((b) => b.status === "APPROVED");
  const [allCategories, ownCategoryLinks, currentUser, hours, services, staff] = await Promise.all([
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
    prisma.businessHours.count({ where: { businessId: business.id } }),
    prisma.service.count({ where: { businessId: business.id, active: true } }),
    prisma.staff.count({ where: { businessId: business.id, active: true } }),
  ]);

  const checks: [ChecklistId, boolean][] = [
    ["logo", !!business.logoUrl],
    ["cover", !!business.coverUrl],
    ["description", (business.description?.trim().length ?? 0) >= 80],
    ["location", !!business.addressLine && business.lat !== null && business.lng !== null],
    ["categories", ownCategoryLinks.length > 0],
    ["phone", !!business.phone],
    ["social", !!(business.website || business.facebookUrl || business.instagramUrl || business.tiktokUrl)],
    ["policy", !!business.cancellationPolicy?.trim()],
    ["bank", !!(business.bankAccountNumber && business.bankAccountName)],
    ["invoice", !!(business.invoiceCompanyName && business.invoiceTaxId)],
    ["hours", hours > 0],
    ["services", services > 0],
    ["staff", staff > 0],
  ];
  const sections: SettingsSectionId[] = ["profile", "contact", "booking", "payments", "website", "branches", ...(currentUser ? (["account"] as const) : [])];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  return (
    <div className={`${siteSerif.variable} space-y-6`}>
      <SettingsHero
        locale={locale}
        salon={{ name: business.name, city: business.city, logoUrl: business.logoUrl, coverUrl: business.coverUrl, status: business.status }}
        publicUrl={`${siteUrl}/b/${business.slug}`}
        checklist={checks.map(([id, done]) => ({ id, done }))}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div className="min-w-0 space-y-10 xl:order-1">
          <SettingsNav locale={locale} sections={sections} variant="bar" />

          <SettingsSection id="profile" locale={locale}>
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
            <BusinessImagesManager logoUrl={business.logoUrl} coverUrl={business.coverUrl} businessName={business.name} />
          </SettingsSection>

          <SettingsSection id="contact" locale={locale}>
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
                googlePlaceId: business.googlePlaceId,
                whatsapp: business.whatsapp,
              }}
            />
          </SettingsSection>

          <SettingsSection id="booking" locale={locale}>
            <PreferencesCard
              preferences={{
                defaultLocale: business.defaultLocale,
                defaultCurrency: business.defaultCurrency,
                cancellationWindowHours: business.cancellationWindowHours,
                cancellationPolicy: business.cancellationPolicy ?? "",
              }}
            />
          </SettingsSection>

          <SettingsSection id="payments" locale={locale}>
            <BankInfoCard
              bankInfo={{
                bankName: business.bankName,
                bankAccountNumber: business.bankAccountNumber,
                bankAccountName: business.bankAccountName,
                bankBic: business.bankBic,
              }}
            />
            <InvoiceInfoCard
              invoiceInfo={{
                invoiceCompanyName: business.invoiceCompanyName,
                invoiceCompanyAddress: business.invoiceCompanyAddress,
                invoiceTaxId: business.invoiceTaxId,
                invoiceVatPercent: business.invoiceVatPercent,
              }}
            />
          </SettingsSection>

          <SettingsSection id="website" locale={locale}>
            <BookingEmbedCard slug={business.slug} defaultLocale={business.defaultLocale} />
            {ownedBranches.length >= 2 && (
              <BookingEmbedCard variant="chain" slug={ownedBranches[0].slug} defaultLocale={business.defaultLocale} />
            )}
          </SettingsSection>

          <SettingsSection id="branches" locale={locale}>
            <div className="card">
              <p className="text-sm text-ink-400">{S.branchesHint}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {allBranches.map((b) => (
                  <li
                    key={b.id}
                    className={`flex items-center gap-3 rounded-2xl p-3 ring-1 ${b.id === business.id ? "bg-primary-100/40 ring-primary-200" : "bg-mist-50/50 ring-ink-100"}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-primary-600 shadow-sm">
                      {b.name.trim()[0]?.toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink-900">{b.name}</span>
                      <span className="flex items-center gap-1 truncate text-xs text-ink-400">
                        {b.city && <MapPin className="h-3 w-3" />}
                        {[b.city, S.status[b.status] ?? b.status].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    {b.id === business.id && (
                      <span className="shrink-0 rounded-full bg-[#1f182d] px-2.5 py-0.5 text-[10px] font-bold text-white">{S.thisBranch}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <AddBranchButton locale={locale} />
              </div>
            </div>
          </SettingsSection>

          {currentUser && (
            <SettingsSection id="account" locale={locale}>
              <AccountSettingsCard currentEmail={currentUser.email} pendingEmail={currentUser.pendingEmail} hasPassword={!!currentUser.password} />
            </SettingsSection>
          )}
        </div>

        <div className="hidden xl:order-2 xl:block">
          <SettingsNav locale={locale} sections={sections} variant="side" />
        </div>
      </div>
    </div>
  );
}
