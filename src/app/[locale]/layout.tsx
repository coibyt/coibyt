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
import "../globals.css";

// Be Vietnam Pro is purpose-built for Vietnamese diacritics while still
// reading as a clean, modern geometric sans in English — the closest
// available match to timma.fi's "Sofia Pro" that also fully supports our
// primary-language content.
const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
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
      <body className="flex min-h-screen flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
