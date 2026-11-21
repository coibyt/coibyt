import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe,
  GraduationCap,
  Infinity as InfinityIcon,
  Lock,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { coursePageData, coursePageSlugs } from "@/lib/academy";
import { coursePageStrings } from "@/lib/academy/course-page-strings";
import { fmtDuration } from "@/lib/academy/progress";
import { pick, type Audience } from "@/lib/academy/types";
import { courseReviews } from "@/lib/academy/community";
import { accountStrings } from "@/lib/academy/account-strings";
import { AcademyAccountCta } from "@/components/academy/account-cta";
import { CourseReviews, FollowCourseButton } from "@/components/academy/course-community";
import { SITE, absoluteUrl, alternatesFor, faqJsonLd, jsonLd, localizedUrl, metaDescription } from "@/lib/seo";

type Params = Promise<{ locale: string; course: string }>;

/** Course pages are static; the learner ratings in them are refreshed every 10 minutes. */
export const revalidate = 600;

export function generateStaticParams() {
  return coursePageSlugs().map((course) => ({ course }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, course } = await params;
  const d = coursePageData(course, locale);
  if (!d) return {};
  const title = pick(d.seo.metaTitle, locale);
  const description = metaDescription(pick(d.seo.metaDescription, locale), 160);
  const path = `/academy/khoa-hoc/${d.seo.slug}`;
  const og = { url: absoluteUrl(d.og)!, width: 1200, height: 630, alt: pick(d.seo.headline, locale) };
  return {
    title: { absolute: title },
    description,
    keywords: d.seo.keywords,
    alternates: alternatesFor(path, locale),
    openGraph: { title, description, url: localizedUrl(locale, path), siteName: "VaraaAi", type: "website", images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
  };
}

/** "1 giờ 28 phút" / "1 h 28 min" / "1 h 28 min". */
function longDuration(seconds: number, locale: string) {
  const m = Math.round(seconds / 60);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (locale === "vi") return h ? `${h} giờ ${r} phút` : `${r} phút`;
  return h ? `${h} h ${r} min` : `${r} min`;
}

const isoDuration = (seconds: number) => `PT${Math.floor(seconds / 3600)}H${Math.floor((seconds % 3600) / 60)}M`;

const GOLD = "bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a]";

/** A course landing page (owner, 2026-11-19): banner, what you will learn,
 * the course introduction, the syllabus, who it is for and FAQ — written for
 * search engines and for people deciding whether to start. */
export default async function CoursePage({ params }: { params: Params }) {
  const { locale, course } = await params;
  const d = coursePageData(course, locale);
  if (!d) notFound();
  const s = coursePageStrings(locale);
  const as = accountStrings(locale);
  const seo = d.seo;
  const rated = await courseReviews(d.course.id);
  const { summary } = rated;
  const headline = pick(seo.headline, locale);
  const path = `/academy/khoa-hoc/${seo.slug}`;
  const trackName: Record<Audience, string> = { pro: s.trackPro, owner: s.trackOwner, customer: s.trackCustomer };
  const total = d.lessons.length;
  const time = longDuration(d.seconds, locale);
  const faq = seo.faq.map((f) => [pick(f.q, locale), pick(f.a, locale)] as const);
  const langLabel = d.langs.includes("en") ? (locale === "vi" ? "Tiếng Việt · English" : locale === "fi" ? "Vietnam · englanti" : "Vietnamese · English") : s.languageVi;

  // The course is narrated in Vietnamese; pages in other languages play the English recording when there is one.
  const courseLang = locale !== "vi" && d.langs.includes("en") ? "en" : "vi";
  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: pick(seo.metaTitle, locale),
    description: pick(seo.metaDescription, locale),
    url: localizedUrl(locale, path),
    image: [absoluteUrl(d.image)],
    inLanguage: courseLang,
    isAccessibleForFree: true,
    educationalLevel: pick(seo.level, locale),
    keywords: seo.keywords.join(", "),
    provider: { "@type": "Organization", name: "VaraaAi Academy", url: SITE, sameAs: SITE },
    offers: [{ "@type": "Offer", category: "Free", price: 0, priceCurrency: "EUR", availability: "https://schema.org/InStock", url: localizedUrl(locale, path) }],
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: isoDuration(d.seconds),
        inLanguage: courseLang,
      },
    ],
    syllabusSections: d.topics.map((t) => ({ "@type": "Syllabus", name: t.title, description: t.lessons.map((l) => l.title).join(" · ") })),
    teaches: seo.outcomes.map((o) => pick(o, locale)),
    // Real learner ratings only, and only once there are some.
    ...(summary.count > 0
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: summary.average, ratingCount: summary.count, bestRating: 5, worstRating: 1 },
          review: rated.reviews.slice(0, 3).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            datePublished: r.date,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
            ...(r.comment ? { reviewBody: r.comment } : {}),
          })),
        }
      : {}),
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: s.home, item: localizedUrl(locale, "") || SITE },
      { "@type": "ListItem", position: 2, name: s.academy, item: localizedUrl(locale, "/academy") },
      { "@type": "ListItem", position: 3, name: d.title, item: localizedUrl(locale, path) },
    ],
  };
  const videoLd = d.intro && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${s.introVideo}: ${headline}`,
    description: pick(seo.tagline, locale),
    thumbnailUrl: [absoluteUrl(d.intro.poster)],
    contentUrl: absoluteUrl(d.intro.src),
    uploadDate: `${d.intro.published}T08:00:00+02:00`,
    duration: `PT${Math.floor(d.intro.seconds / 60)}M${Math.round(d.intro.seconds % 60)}S`,
    inLanguage: "vi",
    publisher: { "@type": "Organization", name: "VaraaAi", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/icons/icon-512.png` } },
  };

  const facts: [typeof Clock, string, string][] = [
    [Clock, s.duration, time],
    [BookOpen, s.syllabus, s.syllabusValue(d.live, total)],
    [Globe, s.language, langLabel],
    [GraduationCap, s.level, pick(seo.level, locale)],
    [Smartphone, s.device, ""],
    [InfinityIcon, s.lifetime, ""],
    [Award, s.certificate, ""],
  ];

  const startHref = d.first ? `/academy/${d.first}` : "/academy";

  const sideCard = (
    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-20px_rgba(26,19,38,0.45)] ring-1 ring-ink-100">
      {d.intro ? (
        <video
          className="aspect-video w-full bg-black object-cover"
          controls
          preload="none"
          playsInline
          poster={d.intro.poster}
          aria-label={s.introVideo}
        >
          <source src={d.intro.src} type="video/mp4" />
          <track kind="subtitles" src={d.intro.captions} srcLang="vi" label="Tiếng Việt" />
        </video>
      ) : (
        <Link href={startHref} className="group relative block aspect-video overflow-hidden">
          <Image src={d.image} alt={headline} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <PlayCircle className="h-16 w-16 text-white drop-shadow-lg transition group-hover:scale-110" />
          </span>
        </Link>
      )}
      <div className="p-5 sm:p-6">
        <p className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-emerald-600">{s.free}</span>
        </p>
        <p className="mt-1 text-sm text-ink-500">{s.freeNote}</p>
        <Link
          href={startHref}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl ${GOLD} px-5 py-3.5 text-base font-extrabold text-primary-900 shadow-card transition hover:brightness-105`}
        >
          <PlayCircle className="h-5 w-5" />
          {s.start}
        </Link>
        <a
          href="#noi-dung"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-50 px-5 py-3 text-sm font-bold text-primary-800 ring-1 ring-primary-100 transition hover:bg-primary-100"
        >
          {s.continueSyllabus}
          <ChevronDown className="h-4 w-4" />
        </a>
        <FollowCourseButton courseId={d.course.id} locale={locale} className="mt-2" />
        <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
          {facts.map(([Icon, label, value]) => (
            <li key={label} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#b08a3e]" />
              <span>
                {value ? (
                  <>
                    {label}: <strong className="font-bold text-ink-900">{value}</strong>
                  </>
                ) : (
                  label
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="overflow-x-clip bg-mist-50/60">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(courseLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd(faq))} />
      {videoLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(videoLd)} />}

      {/* hero: the course banner behind a plum gradient */}
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <Image src={d.image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-right opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1a1326] via-[#1a1326]/90 to-[#1a1326]/30 lg:via-[#1a1326]/80 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#1a1326]/70 to-transparent" />
        <div className="container pb-10 pt-5 sm:pb-14 sm:pt-7 lg:pb-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">
              {s.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/academy" className="hover:text-white">
              {s.academy}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#e8d3a6]">{d.title}</span>
          </nav>
          <div className="mt-6 max-w-2xl lg:max-w-[min(58%,720px)]">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#e8d3a6] ring-1 ring-[#e8d3a6]/30">
              <Sparkles className="h-3.5 w-3.5" />
              {trackName[d.course.audience]} · {d.title}
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">{headline}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">{pick(seo.tagline, locale)}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              <li className="rounded-full bg-emerald-500/90 px-3 py-1 text-white">{s.free}</li>
              {summary.count > 0 && (
                <li>
                  <a href="#danh-gia" className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-[#e8d3a6]/40 hover:bg-white/15">
                    <Star className="h-4 w-4 fill-[#e8d3a6] text-[#e8d3a6]" />
                    <span className="text-[#e8d3a6]">{summary.average.toFixed(1)}</span>
                    <span className="text-white/70">({as.reviewsCount(summary.count)})</span>
                  </a>
                </li>
              )}
              <li className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <PlayCircle className="h-4 w-4 text-[#e8d3a6]" />
                {s.lessons(d.live)}
              </li>
              <li className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <Clock className="h-4 w-4 text-[#e8d3a6]" />
                {time}
              </li>
              <li className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <Globe className="h-4 w-4 text-[#e8d3a6]" />
                {langLabel}
              </li>
              <li className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                <Award className="h-4 w-4 text-[#e8d3a6]" />
                {s.certificate}
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3 lg:hidden">
              <Link href={startHref} className={`inline-flex items-center gap-2 rounded-2xl ${GOLD} px-6 py-3 font-extrabold text-primary-900 shadow-card`}>
                <PlayCircle className="h-5 w-5" />
                {s.start}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container grid gap-8 pb-20 pt-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        {/* side card: on phones right under the banner, on desktop sticky on the right */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:-mt-64">
          <div className="lg:sticky lg:top-24">{sideCard}</div>
        </aside>

        <div className="min-w-0 space-y-8 lg:col-start-1 lg:row-start-1">
          {/* what you will learn */}
          <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.learnTitle}</h2>
            <ul className="mt-5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {seo.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700 sm:text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                  {pick(o, locale)}
                </li>
              ))}
            </ul>
          </section>

          {/* introduction */}
          <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.aboutTitle}</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-700 sm:text-base">
              {seo.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-base font-medium text-ink-900 sm:text-lg" : undefined}>
                  {pick(p, locale)}
                </p>
              ))}
            </div>
          </section>

          {/* syllabus */}
          <section id="noi-dung" className="scroll-mt-24 rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.syllabusTitle}</h2>
              <p className="text-sm font-semibold text-ink-400">{s.syllabusMeta(d.topics.length > 1 ? d.topics.length : 1, total, time)}</p>
            </div>
            <div className="mt-5 space-y-3">
              {d.topics.map((t, ti) => (
                <details key={t.title + ti} open={ti < 2 || d.topics.length === 1} className="group overflow-hidden rounded-2xl ring-1 ring-ink-100">
                  <summary className="flex cursor-pointer list-none items-center gap-3 bg-mist-50 px-4 py-3.5 marker:hidden">
                    <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition group-open:rotate-180" />
                    <span className="min-w-0 flex-1 font-bold text-ink-900">
                      {d.topics.length > 1 && <span className="text-[#b08a3e]">{ti + 1}. </span>}
                      {t.title}
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-ink-400">{s.topicLessons(t.lessons.length)}</span>
                  </summary>
                  <ul className="divide-y divide-ink-100">
                    {t.lessons.map((l) => (
                      <li key={l.slug}>
                        {l.live ? (
                          <Link href={`/academy/${l.slug}`} className="flex items-center gap-3 px-4 py-3 transition hover:bg-primary-50/50">
                            <PlayCircle className="h-5 w-5 shrink-0 text-primary-600" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-ink-900 sm:text-[15px]">{l.title}</span>
                              {l.style && (
                                <span className="mt-0.5 inline-block text-xs font-semibold text-[#b08a3e]">{l.style === "theory" ? s.theory : s.practice}</span>
                              )}
                            </span>
                            <span className="shrink-0 text-xs font-semibold tabular-nums text-ink-400">{fmtDuration(l.seconds)}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-3 px-4 py-3 text-ink-400">
                            <Lock className="h-4 w-4 shrink-0" />
                            <span className="min-w-0 flex-1 text-sm">{l.title}</span>
                            <span className="shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-bold">{s.soon}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {/* who it is for */}
          <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.forWhoTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {seo.forWho.map((w, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl bg-mist-50 p-4 text-sm leading-relaxed text-ink-700 ring-1 ring-ink-100">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  {pick(w, locale)}
                </li>
              ))}
            </ul>
          </section>

          {/* about the academy (no invented credentials: who we are, how lessons are made) */}
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-5 text-white ring-1 ring-[#e8d3a6]/30 sm:p-7">
            <div className="flex items-start gap-4">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${GOLD} text-primary-900`}>
                <GraduationCap className="h-7 w-7" />
              </span>
              <div className="min-w-0">
                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">{s.aboutUsTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">{s.aboutUs}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.aboutUsPoints.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#e8d3a6]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* learner reviews (real ratings from learners who finished a lesson) */}
          <CourseReviews courseId={d.course.id} locale={locale} firstLesson={d.first} initial={rated} />

          {/* FAQ */}
          <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.faqTitle}</h2>
            <div className="mt-4 divide-y divide-ink-100">
              {faq.map(([q, a], i) => (
                <details key={i} className="group py-3.5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-bold text-ink-900 marker:hidden">
                    <h3 className="text-[15px] sm:text-base">{q}</h3>
                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-[15px]">{a}</p>
                </details>
              ))}
            </div>
            <p className="mt-5 flex flex-wrap gap-1.5 text-xs text-ink-400">
              <span className="font-bold">{s.keywords}:</span>
              {seo.keywords.map((k) => (
                <span key={k} className="rounded-full bg-mist-50 px-2 py-0.5 ring-1 ring-ink-100">
                  {k}
                </span>
              ))}
            </p>
          </section>

          {/* save progress to an account */}
          <AcademyAccountCta locale={locale} />

          {/* closing call to action */}
          <section className="flex flex-col items-start gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-[#e8d3a6] sm:flex-row sm:items-center sm:p-7">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-extrabold text-ink-900 sm:text-xl">{s.ctaTitle}</h2>
              <p className="mt-1 text-sm text-ink-500">{s.ctaBody}</p>
            </div>
            <Link href={startHref} className={`inline-flex shrink-0 items-center gap-2 rounded-2xl ${GOLD} px-6 py-3 font-extrabold text-primary-900 shadow-card`}>
              {s.start}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>

      {/* related courses */}
      {d.related.length > 0 && (
        <section className="border-t border-ink-100 bg-white py-12">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">{s.relatedTitle}</h2>
              <Link href="/academy" className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:text-primary-900">
                {s.allCourses}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {d.related.map((c) => (
                <li key={c.id}>
                  <Link href={`/academy/khoa-hoc/${c.slug}`} className="group block overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="relative block aspect-[16/9] overflow-hidden">
                      <Image src={c.image} alt={c.headline} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    </span>
                    <span className="block p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#b08a3e]">{trackName[c.audience]}</span>
                      <span className="mt-1 line-clamp-2 block font-extrabold text-ink-900">{c.name}</span>
                      <span className="mt-2 flex items-center justify-between text-xs font-semibold text-ink-400">
                        <span>
                          {s.lessons(c.live)} · {longDuration(c.seconds, locale)}
                        </span>
                        <span className="text-emerald-600">{s.free}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
