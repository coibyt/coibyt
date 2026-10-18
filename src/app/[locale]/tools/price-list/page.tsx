import type { Metadata } from "next";
import { CheckCircle2, Languages, QrCode, FileDown, Palette } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { priceListStrings } from "@/lib/price-list/i18n";
import { PRICE_LIST_FONTS_HREF } from "@/lib/price-list/fonts";
import { PriceListEditor } from "@/components/price-list/editor";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const PATH = "/tools/price-list";
const url = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}${PATH}`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const { seo } = priceListStrings(locale);
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url(locale),
      languages: { ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])), "x-default": url(routing.defaultLocale) },
    },
    openGraph: { title: seo.title, description: seo.description, url: url(locale), siteName: "VaraaAi", type: "website" },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

const FEATURE_ICONS = [Languages, QrCode, FileDown, Palette];

export default async function PriceListToolPage({ params }: { params: Params }) {
  const { locale } = await params;
  const { ui, seo } = priceListStrings(locale);
  const session = await auth();
  const owned = session?.user
    ? await prisma.business.findMany({ where: { ownerId: session.user.id }, select: { status: true } })
    : [];
  const ownsSalon = owned.length > 0;
  const canHideFooter = owned.some((b) => b.status === "APPROVED");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.h1,
    description: seo.description,
    url: url(locale),
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE },
  };

  return (
    <div className="bg-mist-50">
      {/* The same font families the PDF embeds, loaded per script on demand. */}
      <link rel="stylesheet" href={PRICE_LIST_FONTS_HREF} precedence="default" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <section className="relative overflow-hidden bg-primary-800">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-coral-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-primary-400/30 blur-3xl" />
        <div className="container relative py-10 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-peach-200">VaraaAi · {ui.sDesign}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{seo.h1}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-100 sm:text-base">{seo.intro}</p>
          <ul className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
            {seo.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? CheckCircle2;
              return (
                <li key={f} className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white ring-1 ring-white/10">
                  <Icon className="h-4 w-4 shrink-0 text-peach-200" />
                  {f}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <div className="container py-6 sm:py-8">
        <PriceListEditor locale={locale} ui={ui} isLoggedIn={!!session?.user} ownsSalon={ownsSalon} canHideFooter={canHideFooter} />
      </div>

      <section className="container pb-14">
        <div className="grid gap-4 rounded-[28px] border border-ink-100 bg-white p-6 sm:grid-cols-3 sm:p-8">
          {seo.steps.map((s, i) => (
            <div key={s} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">{i + 1}</span>
              <p className="pt-1.5 text-sm leading-relaxed text-ink-700">{s}</p>
            </div>
          ))}
        </div>
        {!ownsSalon && (
          <div className="mt-6 flex flex-col items-start gap-4 rounded-[28px] bg-peach-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-lg font-extrabold text-ink-900">{ui.ctaTitle}</p>
              <p className="mt-1 max-w-2xl text-sm text-ink-700">{ui.ctaBody}</p>
            </div>
            <Link href="/business/apply" className="btn-accent shrink-0 !px-6 !py-3">
              {ui.ctaButton}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
