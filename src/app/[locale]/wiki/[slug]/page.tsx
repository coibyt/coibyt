import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pick } from "@/lib/academy/types";
import { SITE, absoluteUrl, faqJsonLd, jsonLd, localizedUrl, metaDescription } from "@/lib/seo";
import { articleAlternates, articleVideo, categoryArticles, categorySlug, contentLocale, findArticle, findCategory, sectionAlternates, wikiCategory, wikiPath } from "@/lib/wiki";
import { wikiStrings } from "@/lib/wiki/strings";
import { ArticleView } from "@/components/wiki/article-view";
import { CategoryView } from "@/components/wiki/category-view";
import { plain } from "@/components/wiki/parts";

type Params = Promise<{ locale: string; slug: string }>;

const PUBLISHER = { "@type": "Organization", name: "VaraaAi", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icons/icon-512.png` } };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = contentLocale(locale);

  const category = findCategory(locale, slug);
  if (category) {
    const title = `${pick(category.metaTitle, lang)} | VaraaAi Wiki`;
    const description = metaDescription(pick(category.intro, lang), 158);
    const image = { url: absoluteUrl(category.image)!, width: 1600, height: 900, alt: pick(category.title, lang) };
    return {
      title: { absolute: title },
      description,
      alternates: sectionAlternates(locale, (l) => `/wiki/${pick(category.slug, l)}`),
      openGraph: { title, description, url: localizedUrl(lang, `/wiki/${categorySlug(category, locale)}`), siteName: "VaraaAi", type: "website", images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image.url] },
    };
  }

  const article = findArticle(locale, slug);
  if (!article) return {};
  const media = articleVideo(article);
  // Link previews use the lesson's title card (a JPEG, which every app shows); the article's own picture is WebP.
  const og = media ? { url: absoluteUrl(media.video.poster)!, width: 1280, height: 720, alt: article.hero.alt } : { url: absoluteUrl(article.hero.src)!, width: article.hero.w ?? 1200, height: article.hero.h ?? 675, alt: article.hero.alt };
  const url = localizedUrl(article.locale, wikiPath(article));
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    keywords: [article.keyword, ...article.keywords],
    alternates: articleAlternates(article),
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url,
      siteName: "VaraaAi",
      type: "article",
      publishedTime: `${article.published}T08:00:00+02:00`,
      modifiedTime: `${article.updated}T08:00:00+02:00`,
      section: pick(wikiCategory(article.category).name, article.locale),
      tags: article.keywords,
      images: [og],
    },
    twitter: { card: "summary_large_image", title: article.metaTitle, description: article.metaDescription, images: [og.url] },
  };
}

const isoDuration = (seconds: number) => `PT${Math.floor(seconds / 60)}M${Math.round(seconds % 60)}S`;

/** /wiki/<slug>: a chapter (category) page or one article. Chapter slugs are few and fixed, so they are looked up first. */
export default async function WikiSlugPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const lang = contentLocale(locale);
  const s = wikiStrings(lang);
  const home = { "@type": "ListItem", position: 1, name: s.home, item: localizedUrl(lang, "") || SITE };
  const hub = { "@type": "ListItem", position: 2, name: s.wiki, item: localizedUrl(lang, "/wiki") };

  const category = findCategory(locale, slug);
  if (category) {
    const articles = categoryArticles(locale, category.id);
    if (!articles.length) notFound();
    const url = localizedUrl(lang, `/wiki/${categorySlug(category, locale)}`);
    const pageLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: pick(category.title, lang),
      description: pick(category.intro, lang),
      url,
      inLanguage: lang,
      image: absoluteUrl(category.image),
      isPartOf: { "@type": "WebSite", name: "VaraaAi", url: SITE },
      publisher: PUBLISHER,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: articles.length,
        itemListElement: articles.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.title, url: localizedUrl(lang, wikiPath(a)) })),
      },
    };
    const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [home, hub, { "@type": "ListItem", position: 3, name: pick(category.name, lang), item: url }] };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageLd)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
        <CategoryView category={category} locale={locale} />
      </>
    );
  }

  const article = findArticle(locale, slug);
  if (!article) notFound();
  const cat = wikiCategory(article.category);
  const url = localizedUrl(article.locale, wikiPath(article));
  const media = articleVideo(article);
  const images = [article.hero, ...article.sections.flatMap((x) => x.blocks.flatMap((b) => ("img" in b ? [b.img] : []))), ...(article.howTo?.steps.flatMap((st) => (st.image ? [st.image] : [])) ?? [])];

  const videoLd = media && {
    "@type": "VideoObject",
    name: pick(media.lesson.title, article.locale),
    description: pick(media.lesson.summary, article.locale),
    thumbnailUrl: [absoluteUrl(media.video.poster)],
    contentUrl: absoluteUrl(media.video.src),
    uploadDate: `${media.video.published}T08:00:00+02:00`,
    duration: isoDuration(media.video.seconds),
    inLanguage: media.video.lang,
    isFamilyFriendly: true,
    publisher: PUBLISHER,
  };
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: images.slice(0, 6).map((i) => absoluteUrl(i.src)),
    datePublished: `${article.published}T08:00:00+02:00`,
    dateModified: `${article.updated}T08:00:00+02:00`,
    inLanguage: article.locale,
    articleSection: pick(cat.name, article.locale),
    keywords: [article.keyword, ...article.keywords].join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: "VaraaAi Academy", url: localizedUrl(article.locale, "/academy") },
    publisher: PUBLISHER,
    ...(videoLd ? { video: videoLd } : {}),
    // The lesson page of the Academy teaches the same thing as a video with a quiz.
    ...(media ? { isBasedOn: localizedUrl(article.locale, `/academy/${media.lesson.slug}`) } : {}),
  };
  const howToLd = article.howTo && {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: article.howTo.title,
    description: article.metaDescription,
    inLanguage: article.locale,
    image: absoluteUrl(article.hero.src),
    ...(article.howTo.supplies?.length ? { supply: article.howTo.supplies.map((x) => ({ "@type": "HowToSupply", name: plain(x) })) } : {}),
    step: article.howTo.steps.map((st, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: st.name,
      text: plain(st.text),
      url: `${url}#${article.howTo!.id ?? "cac-buoc"}-${i + 1}`,
      ...(st.image ? { image: absoluteUrl(st.image.src) } : {}),
    })),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      home,
      hub,
      { "@type": "ListItem", position: 3, name: pick(cat.name, article.locale), item: localizedUrl(article.locale, `/wiki/${categorySlug(cat, article.locale)}`) },
      { "@type": "ListItem", position: 4, name: article.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleLd)} />
      {videoLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ "@context": "https://schema.org", ...videoLd })} />}
      {howToLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(howToLd)} />}
      {article.faq.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(article.faq.map((f) => [f.q, plain(f.a)] as const)))} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
      <ArticleView article={article} />
    </>
  );
}
