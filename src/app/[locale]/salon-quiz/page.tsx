import type { Metadata } from "next";
import { siteSerif } from "@/lib/site-fonts";
import { salonQuizStrings } from "@/lib/salon-quiz-strings";
import { QUIZ_SCREENS } from "@/lib/salon-quiz";
import { SITE, alternatesFor, jsonLd, localizedUrl } from "@/lib/seo";
import { SalonQuiz } from "@/components/salon-quiz/quiz";

type Params = Promise<{ locale: string }>;

const PATH = "/salon-quiz";
/** The link preview (1200x630), drawn per language into public/quiz. */
const shareImage = (locale: string) => ({ url: `/quiz/share-${locale === "vi" || locale === "fi" ? locale : "en"}.jpg`, width: 1200, height: 630, alt: "VaraaAi" });

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const { meta } = salonQuizStrings(locale);
  const image = shareImage(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: alternatesFor(PATH, locale),
    openGraph: { title: meta.title, description: meta.description, url: localizedUrl(locale, PATH), siteName: "VaraaAi", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image.url] },
  };
}

/** The salon quiz: the landing page for ads aimed at salon owners. Twelve
 * questions, then a plan that leads to the free sign-up (/business/apply).
 * It covers the whole screen, site header included, so nothing pulls the
 * visitor away mid-quiz. */
export default async function SalonQuizPage({ params }: { params: Params }) {
  const { locale } = await params;
  const t = salonQuizStrings(locale);
  const questions = QUIZ_SCREENS.filter((s) => s.kind !== "info" && s.kind !== "text").length;

  const data = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: t.meta.title,
    description: t.meta.description,
    url: localizedUrl(locale, PATH),
    inLanguage: locale,
    isAccessibleForFree: true,
    numberOfQuestions: questions,
    timeRequired: "PT2M",
    audience: { "@type": "BusinessAudience", audienceType: "Salon owners" },
    image: `${SITE}${shareImage(locale).url}`,
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE },
  };

  return (
    <div className={siteSerif.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />
      <SalonQuiz locale={locale} t={t} />
    </div>
  );
}
