import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/academy/lesson-view";
import { lessonPageData } from "@/lib/academy";
import { SITE, absoluteUrl, alternatesFor, jsonLd, localizedUrl, metaDescription } from "@/lib/seo";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = lessonPageData(slug, locale);
  if (!data) return {};
  const { view, video } = data;
  const title = `${view.title} — VaraaAi`;
  const description = metaDescription(view.summary);
  const poster = absoluteUrl(video.poster)!;
  return {
    title,
    description,
    alternates: alternatesFor(`/academy/${slug}`, locale),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, `/academy/${slug}`),
      siteName: "VaraaAi",
      type: "video.other",
      images: [{ url: poster, width: 1280, height: 720 }],
      videos: [{ url: absoluteUrl(video.src)!, type: "video/mp4", width: 1280, height: 720 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [poster] },
  };
}

const isoDuration = (seconds: number) => `PT${Math.floor(seconds / 60)}M${Math.round(seconds % 60)}S`;

/** One Academy lesson: the video, its steps written out, a quick quiz and
 * what to watch next. */
export default async function AcademyLessonPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const data = lessonPageData(slug, locale);
  if (!data) notFound();
  const { view, video } = data;

  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: view.title,
    description: view.summary,
    thumbnailUrl: [absoluteUrl(video.poster)],
    contentUrl: absoluteUrl(video.src),
    uploadDate: `${video.published}T08:00:00+02:00`,
    duration: isoDuration(video.seconds),
    inLanguage: video.lang,
    isFamilyFriendly: true,
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icons/icon-512.png` } },
  };
  const howToLd =
    view.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: view.title,
          description: view.summary,
          inLanguage: locale,
          step: view.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(videoLd)} />
      {howToLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howToLd)} />}
      <LessonView lesson={view} locale={locale} />
    </>
  );
}
