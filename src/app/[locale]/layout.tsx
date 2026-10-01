import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Be_Vietnam_Pro } from "next/font/google";
import { routing } from "@/i18n/routing";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { SessionProvider } from "@/components/session-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LocaleAutoDetect } from "@/components/locale-auto-detect";
import "../globals.css";

const GOOGLE_TAG_ID = "GT-PL3VR4KX";
const META_PIXEL_ID = "7997185890363074";

// Be Vietnam Pro is purpose-built for Vietnamese diacritics while still
// reading as a clean, modern geometric sans in English — the closest
// available match to timma.fi's "Sofia Pro" that also fully supports our
// primary-language content.
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("title"), description: t("description") };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// The navbar reads the session on every page (sign in/up vs. account menu),
// so no page under this layout has a meaningful "static" version shared by
// every visitor. Without this, Next's build-time prerendering can bake in
// whatever `auth()` resolved to at BUILD time (typically "signed out") as
// permanent static HTML — silently showing every real visitor a stale,
// wrong session state. Force per-request rendering everywhere instead.
export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={sans.variable}>
      <head>
        {/* Google tag (gtag.js) for Google Ads. Left out of the /embed pages on purpose —
            those render inside salons' own websites. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_TAG_ID}');`,
          }}
        />
        {/* Meta Pixel for Facebook/Instagram Ads — same /embed exclusion
            reasoning as the Google tag above. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <LocaleAutoDetect />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
