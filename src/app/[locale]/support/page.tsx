import type { Metadata } from "next";
import { CheckCircle2, Sparkles, Clock } from "lucide-react";
import { auth } from "@/auth";
import { routing } from "@/i18n/routing";
import { supportAiEnabled } from "@/lib/support";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { SupportCenter } from "@/components/support-center";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const url = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}/support`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = supportCenterStrings(locale);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: url(locale) },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: url(locale), siteName: "VaraaAi", type: "website" },
  };
}

// The AI switch and the visitor's session change per request.
export const dynamic = "force-dynamic";

/** Public help centre: anyone — salon owner, customer or a visitor without
 * an account — can chat with the VaraaAi team here; when the admin has it on,
 * the AI assistant answers first. This is the link the admin shares. */
export default async function SupportCenterPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = supportCenterStrings(locale);
  const [session, aiOn] = await Promise.all([auth(), supportAiEnabled()]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary-50 via-peach-50/60 to-transparent" />
      <div className="container max-w-3xl py-10 sm:py-14">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">{t.eyebrow}</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">{t.title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-400 sm:text-base">{t.intro}</p>
          <div
            className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              aiOn ? "bg-primary-100 text-primary-700" : "bg-mist-100 text-ink-700"
            }`}
          >
            {aiOn ? <Sparkles className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
            {aiOn ? t.aiOnBadge : t.aiOffBadge}
          </div>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-ink-700">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <SupportCenter locale={locale} signedIn={!!session?.user} t={t} />
      </div>
    </div>
  );
}
