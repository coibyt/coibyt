import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkWebsite,
  checkSocialLink,
  checkGooglePlace,
  generateAiSummary,
  suggestSeoKeywords,
  type SocialLinkStatus,
  type WebsiteCheckResult,
} from "@/lib/salon-check";

const schema = z.object({
  name: z.string().min(1).max(150),
  address: z.string().min(1).max(300),
  category: z.string().max(80).optional(),
  website: z.string().max(300).optional(),
  facebookUrl: z.string().max(300).optional(),
  instagramUrl: z.string().max(300).optional(),
  facebookFollowers: z.coerce.number().int().min(0).max(100_000_000).optional(),
  instagramFollowers: z.coerce.number().int().min(0).max(100_000_000).optional(),
  googleStatus: z.enum(["yes", "no", "unsure"]),
  locale: z.string().max(10).optional(),
});

function socialReachabilityScore(status: SocialLinkStatus | "missing") {
  switch (status) {
    case "ok":
      return 85;
    case "unreachable":
      return 40;
    case "unverified":
      return 65;
    case "missing":
    default:
      return 0;
  }
}

/** Self-reported, never verified — follower counts people type into a form
 * can't be checked, so this only ever nudges the score, never the main
 * driver of the "missing/unreachable" findings. */
function followerCountScore(followers: number) {
  if (followers >= 1000) return 90;
  if (followers >= 300) return 78;
  if (followers >= 50) return 62;
  return 45;
}

function selfReportedGoogleScore(status: "yes" | "no" | "unsure") {
  return status === "yes" ? 90 : status === "unsure" ? 50 : 15;
}

function websiteScoreOf(w: WebsiteCheckResult) {
  if (!w.provided) return 0;
  if (!w.reachable) return 10;
  const passed = [w.https, w.mobileFriendly, w.hasOpenGraph, w.hasBookingLink, w.hasPricing, w.hasHours, w.hasContact].filter(
    Boolean
  ).length;
  return Math.min(100, 30 + 10 * passed);
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const {
    name,
    address,
    category,
    website,
    facebookUrl,
    instagramUrl,
    facebookFollowers,
    instagramFollowers,
    googleStatus,
    locale,
  } = parsed.data;

  const websiteResult: WebsiteCheckResult = website
    ? await checkWebsite(website)
    : {
        provided: false,
        reachable: false,
        https: false,
        mobileFriendly: false,
        hasOpenGraph: false,
        hasBookingLink: false,
        hasPricing: false,
        hasHours: false,
        hasContact: false,
        extractedFacebookUrl: null,
        extractedInstagramUrl: null,
      };

  const resolvedFacebookUrl = facebookUrl || websiteResult.extractedFacebookUrl;
  const resolvedInstagramUrl = instagramUrl || websiteResult.extractedInstagramUrl;

  const [facebookStatus, instagramStatus, googlePlace] = await Promise.all([
    resolvedFacebookUrl ? checkSocialLink(resolvedFacebookUrl) : Promise.resolve(null),
    resolvedInstagramUrl ? checkSocialLink(resolvedInstagramUrl) : Promise.resolve(null),
    checkGooglePlace(name, address),
  ]);

  const website_ = { ...websiteResult, score: websiteScoreOf(websiteResult) };

  // Google: real Places data when configured and the call succeeded,
  // otherwise fall back to what the visitor told us themselves.
  const google =
    googlePlace !== null
      ? {
          real: true as const,
          found: googlePlace.found,
          rating: googlePlace.rating,
          reviewCount: googlePlace.reviewCount,
          photoCount: googlePlace.photoCount,
          score: !googlePlace.found
            ? 15
            : Math.min(
                100,
                40 +
                  (googlePlace.rating === null ? 0 : googlePlace.rating >= 4.5 ? 30 : googlePlace.rating >= 4.0 ? 20 : googlePlace.rating >= 3.5 ? 10 : 0) +
                  (googlePlace.reviewCount === null ? 0 : googlePlace.reviewCount >= 100 ? 20 : googlePlace.reviewCount >= 20 ? 10 : 0) +
                  (googlePlace.photoCount === null ? 0 : googlePlace.photoCount >= 20 ? 10 : googlePlace.photoCount >= 5 ? 5 : 0)
              ),
        }
      : { real: false as const, status: googleStatus, score: selfReportedGoogleScore(googleStatus) };

  function socialChannel(status: SocialLinkStatus | null, url: string | null, followers?: number) {
    const resolvedStatus = (status ?? "missing") as SocialLinkStatus | "missing";
    const score = followers !== undefined ? followerCountScore(followers) : socialReachabilityScore(resolvedStatus);
    return { url, status: resolvedStatus, followers: followers ?? null, score };
  }
  const facebook = socialChannel(facebookStatus, resolvedFacebookUrl, facebookFollowers);
  const instagram = socialChannel(instagramStatus, resolvedInstagramUrl, instagramFollowers);

  const overallScore = Math.round((website_.score + google.score + facebook.score + instagram.score) / 4);

  const seoKeywords = category ? suggestSeoKeywords(category, address, locale || "vi") : [];

  // Plain-English fact list for the AI prompt only — never shown to the
  // visitor directly, and never the source of truth for the itemized
  // checklist (which stays template-based for accuracy).
  const goodPoints: string[] = [];
  const badPoints: string[] = [];
  if (!website_.provided) badPoints.push("no website");
  else if (!website_.reachable) badPoints.push("website unreachable");
  else {
    (website_.hasBookingLink ? goodPoints : badPoints).push("online booking mention on website");
    (website_.hasHours ? goodPoints : badPoints).push("opening hours on website");
    (website_.hasContact ? goodPoints : badPoints).push("contact info on website");
    (website_.hasPricing ? goodPoints : badPoints).push("pricing shown on website");
  }
  if (google.real) {
    if (google.found) goodPoints.push(`Google Business Profile with ${google.rating ?? "?"} stars, ${google.reviewCount ?? "?"} reviews`);
    else badPoints.push("no Google Business Profile found");
  } else if (googleStatus === "no") badPoints.push("no Google Business Profile (self-reported)");
  if (facebook.status === "missing") badPoints.push("no Facebook page found");
  if (instagram.status === "missing") badPoints.push("no Instagram page found");

  const aiSummary = await generateAiSummary({
    name,
    locale: locale || "vi",
    overallScore,
    channelScores: { website: website_.score, google: google.score, facebook: facebook.score, instagram: instagram.score },
    goodPoints,
    badPoints,
  });

  return NextResponse.json({
    name,
    address,
    overallScore,
    aiSummary,
    website: website_,
    google,
    facebook,
    instagram,
    seoKeywords,
  });
}
