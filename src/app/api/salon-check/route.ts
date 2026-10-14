import { NextResponse } from "next/server";
import { z } from "zod";
import { checkWebsite, checkSocialLink, type SocialLinkStatus } from "@/lib/salon-check";

const schema = z.object({
  name: z.string().min(1).max(150),
  address: z.string().min(1).max(300),
  website: z.string().max(300).optional(),
  facebookUrl: z.string().max(300).optional(),
  instagramUrl: z.string().max(300).optional(),
  googleStatus: z.enum(["yes", "no", "unsure"]),
});

function socialScore(status: SocialLinkStatus | "missing") {
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

function googleScore(status: "yes" | "no" | "unsure") {
  return status === "yes" ? 90 : status === "unsure" ? 50 : 15;
}

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { name, address, website, facebookUrl, instagramUrl, googleStatus } = parsed.data;

  const websiteResult = website
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

  const websiteScore = !websiteResult.provided
    ? 0
    : !websiteResult.reachable
      ? 10
      : 30 +
        10 *
          [
            websiteResult.https,
            websiteResult.mobileFriendly,
            websiteResult.hasOpenGraph,
            websiteResult.hasBookingLink,
            websiteResult.hasPricing,
            websiteResult.hasHours,
            websiteResult.hasContact,
          ].filter(Boolean).length;

  const resolvedFacebookUrl = facebookUrl || websiteResult.extractedFacebookUrl;
  const resolvedInstagramUrl = instagramUrl || websiteResult.extractedInstagramUrl;

  const [facebookStatus, instagramStatus] = await Promise.all([
    resolvedFacebookUrl ? checkSocialLink(resolvedFacebookUrl) : Promise.resolve(null),
    resolvedInstagramUrl ? checkSocialLink(resolvedInstagramUrl) : Promise.resolve(null),
  ]);

  const website_ = { ...websiteResult, score: Math.min(websiteScore, 100) };
  const google = { status: googleStatus, score: googleScore(googleStatus) };
  const facebook = {
    url: resolvedFacebookUrl,
    status: (facebookStatus ?? "missing") as SocialLinkStatus | "missing",
    score: socialScore(facebookStatus ?? "missing"),
  };
  const instagram = {
    url: resolvedInstagramUrl,
    status: (instagramStatus ?? "missing") as SocialLinkStatus | "missing",
    score: socialScore(instagramStatus ?? "missing"),
  };

  const overallScore = Math.round((website_.score + google.score + facebook.score + instagram.score) / 4);

  return NextResponse.json({
    name,
    address,
    overallScore,
    website: website_,
    google,
    facebook,
    instagram,
  });
}
