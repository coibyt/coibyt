import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

// Link-preview robots of social apps. They must get the page in the language of the link
// they were given (an unprefixed link is Vietnamese), not the language of their own
// Accept-Language header — otherwise a shared Vietnamese link previews in English.
const PREVIEW_BOTS = /facebookexternalhit|facebot|meta-externalagent|zalo|whatsapp|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|skypeuripreview|viber|pinterest/i;

export default function middleware(req: NextRequest) {
  // Loyalty QRs used to open the salon dashboard with ?code=; the card now
  // has its own page that everyone (and the salon's staff) can use.
  const { pathname, searchParams } = req.nextUrl;
  const oldCardQr = pathname.match(/^(\/[a-z]{2,3})?\/business\/dashboard\/loyalty\/?$/);
  const code = searchParams.get("code");
  if (oldCardQr && code) {
    const url = req.nextUrl.clone();
    url.pathname = `${oldCardQr[1] ?? ""}/loyalty/${encodeURIComponent(code.trim().toUpperCase())}`;
    url.search = "";
    return NextResponse.redirect(url);
  }
  if (PREVIEW_BOTS.test(req.headers.get("user-agent") ?? "")) {
    const headers = new Headers(req.headers);
    headers.delete("accept-language");
    return intl(new NextRequest(req.url, { headers }));
  }
  return intl(req);
}

export const config = {
  // Skip API routes, Next internals, the chrome-less embed/site pages, the
  // /q/ short links printed in QR posters, and files with an extension.
  matcher: ["/((?!api|trpc|_next|_vercel|embed|site|q/|.*\\..*).*)"],
};
