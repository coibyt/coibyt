import type { Metadata } from "next";
import { Captions, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import { AcademyHub } from "@/components/academy/academy-hub";
import { bridgeCards, courseCards, liveLessons } from "@/lib/academy";
import { academyStrings } from "@/lib/academy/strings";
import { ogImage } from "@/lib/og-image";
import { SITE, alternatesFor, jsonLd, localizedUrl } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const s = academyStrings(locale);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: alternatesFor("/academy", locale),
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: localizedUrl(locale, "/academy"), siteName: "VaraaAi", type: "website", images: [ogImage(locale)] },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription },
  };
}

/** VaraaAi Academy: narrated video lessons for customers and salon owners,
 * with progress, points, badges and a certificate kept in the browser. */
export default async function AcademyPage({ params }: { params: Params }) {
  const { locale } = await params;
  const s = academyStrings(locale);
  const courses = courseCards(locale);
  const live = liveLessons();
  const statIcons = [PlayCircle, Captions, Sparkles];

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: s.metaTitle,
    itemListElement: live.map((l, i) => ({ "@type": "ListItem", position: i + 1, url: localizedUrl(locale, `/academy/${l.slug}`) })),
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE },
  };

  return (
    <div className="overflow-x-clip bg-mist-50/60">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(list)} />
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-[#b08a3e]/25 blur-3xl" />
        <div className="container flex flex-col items-center pb-24 pt-12 text-center sm:pb-28 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#e8d3a6] ring-1 ring-[#e8d3a6]/30">
            <GraduationCap className="h-4 w-4" />
            {s.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-[2rem] font-extrabold leading-[1.12] tracking-tight sm:text-6xl">
            {s.heroTitle}{" "}
            <span className="bg-gradient-to-r from-[#f0d9a0] to-[#c9a25a] bg-clip-text text-transparent">{s.heroAccent}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{s.heroBody}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {s.heroStats(live.length).map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <li key={stat} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                  <Icon className="h-3.5 w-3.5 text-[#e8d3a6]" />
                  {stat}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <AcademyHub courses={courses} bridge={bridgeCards(locale)} locale={locale} />
    </div>
  );
}
