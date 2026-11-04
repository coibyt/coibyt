import { NextResponse } from "next/server";
import { verifyOwnEmail } from "@/lib/salon-own-email";

/** The link in the verification email: no sign-in needed, the token is the proof. */
export async function GET(req: Request) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  const b = await verifyOwnEmail(new URL(req.url).searchParams.get("t") ?? "");
  const prefix = b && b.defaultLocale !== "vi" ? `/${b.defaultLocale}` : "";
  return NextResponse.redirect(`${site}${prefix}/business/dashboard/marketing?ownEmail=${b ? "ok" : "invalid"}`);
}
