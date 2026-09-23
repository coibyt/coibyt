import { NextIntlClientProvider } from "next-intl";
import { SessionProvider } from "@/components/session-provider";
import { loadEmbedLocale } from "@/i18n/embed-messages";

/** Wraps the booking widget in the providers it needs (next-intl for its
 * translations, NextAuth for the sign-in check) — the same ones [locale]/layout.tsx
 * sets up site-wide, minus the navbar/footer this route intentionally skips. */
export async function EmbedProviders({
  requestedLocale,
  children,
}: {
  requestedLocale: string | undefined;
  children: React.ReactNode;
}) {
  const { locale, messages } = await loadEmbedLocale(requestedLocale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionProvider>{children}</SessionProvider>
    </NextIntlClientProvider>
  );
}
