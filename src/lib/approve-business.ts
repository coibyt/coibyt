import { prisma } from "@/lib/prisma";
import { sendMail, businessReadyEmail } from "@/lib/mailer";
import { geocodeAddress } from "@/lib/geocode";

const COUNTRY_NAMES: Record<string, string> = {
  VN: "Vietnam",
  FI: "Finland",
  PL: "Poland",
  DE: "Germany",
  KH: "Cambodia",
  TH: "Thailand",
};

/** Flips a business to APPROVED and runs the side effects that go with it —
 * shared between the admin's manual approve action and automatic approval
 * once the owner verifies their email, so both paths behave identically. */
export async function approveBusiness(businessId: string) {
  const business = await prisma.business.update({
    where: { id: businessId },
    data: { status: "APPROVED", approvedAt: new Date() },
    include: { owner: { select: { name: true, email: true, locale: true } } },
  });

  // Best-effort — a missing/unresolvable address just means the business
  // won't show up on the map yet, it doesn't block approval either way.
  // Only reached when the owner skipped the apply form's address-autocomplete
  // suggestions, since picking one already sets lat/lng directly.
  if (business.lat === null && business.addressLine && business.city) {
    const countryName = COUNTRY_NAMES[business.country] ?? "Vietnam";
    const coords = await geocodeAddress(business.addressLine, business.city, countryName);
    if (coords) {
      await prisma.business.update({
        where: { id: businessId },
        data: { lat: coords.lat, lng: coords.lng },
      });
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  const email = businessReadyEmail({
    ownerName: business.owner.name,
    businessName: business.name,
    dashboardUrl: `${siteUrl}/business/dashboard`,
    guideUrl: `${siteUrl}/help/getting-started`,
    locale: business.owner.locale,
  });
  await sendMail({ to: business.owner.email, ...email });

  return business;
}
