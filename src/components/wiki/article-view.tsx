import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, GraduationCap, ListOrdered, PlayCircle, ShieldAlert } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fmtDuration } from "@/lib/academy/progress";
import { courseSeoById } from "@/lib/academy/course-pages";
import { pick } from "@/lib/academy/types";
import { articleVideo, categorySlug, neighbours, pairedArticle, readMinutes, relatedArticles, wikiCategory, wikiPath } from "@/lib/wiki";
import { wikiDate, wikiStrings } from "@/lib/wiki/strings";
import type { WikiArticle } from "@/lib/wiki/types";
import { ArticleCard, Block, Figure, GOLD, SERIF, StyleChip, rich } from "@/components/wiki/parts";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={`${SERIF} mb-4 mt-12 scroll-mt-24 text-[1.6rem] font-bold leading-tight text-ink-900 sm:mt-14 sm:text-[2rem]`}>
      <span className="mb-3.5 block h-[3px] w-10 rounded-full bg-gradient-to-r from-[#b08a3e] to-[#e8d3a6]" aria-hidden />
      {children}
    </h2>
  );
}

/** One wiki article: the written lesson with its video, steps and FAQ. No client code. */
export function ArticleView({ article }: { article: WikiArticle }) {
  const lang = article.locale;
  const s = wikiStrings(lang);
  const category = wikiCategory(article.category);
  const media = articleVideo(article);
  const lesson = media?.lesson ?? null;
  const video = media?.video ?? null;
  const pair = pairedArticle(article);
  const { prev, next } = neighbours(article);
  const related = relatedArticles(article, 3);
  const coursePage = lesson ? courseSeoById(lesson.course)?.slug : null;
  const howTo = article.howTo;
  const howToId = howTo?.id ?? "cac-buoc";
  const notice = lesson?.notice ? pick(lesson.notice, lang) : null;
  const isCraft = ["nail", "lash", "hair", "spa", "safety"].includes(article.category);

  // Table of contents in reading order: the sections, with the steps where they sit.
  const toc: { id: string; title: string }[] = [];
  const stepsAfter = howTo ? (howTo.after && article.sections.some((x) => x.id === howTo.after) ? howTo.after : article.sections[article.sections.length - 1]?.id) : null;
  for (const sec of article.sections) {
    toc.push({ id: sec.id, title: sec.title });
    if (howTo && stepsAfter === sec.id) toc.push({ id: howToId, title: howTo.title });
  }
  if (howTo && !stepsAfter) toc.push({ id: howToId, title: howTo.title });
  if (article.faq.length) toc.push({ id: "faq", title: s.faq });

  const tocList = (
    <ol className="space-y-2.5 text-[15px] leading-snug">
      {toc.map((t, i) => (
        <li key={t.id} className="flex gap-2.5">
          <span className="w-5 shrink-0 text-right font-bold tabular-nums text-[#b08a3e]">{i + 1}</span>
          <a href={`#${t.id}`} className="font-semibold text-ink-700 hover:text-primary-600">
            {t.title}
          </a>
        </li>
      ))}
    </ol>
  );

  const steps = howTo && (
    <section>
      <H2 id={howToId}>{howTo.title}</H2>
      {howTo.lead && <p className="my-5">{rich(howTo.lead)}</p>}
      {howTo.supplies && howTo.supplies.length > 0 && (
        <div className="my-6 rounded-2xl bg-white p-5 ring-1 ring-ink-100">
          <p className="font-extrabold text-ink-900">{s.supplies}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-2">
            {howTo.supplies.map((x, i) => (
              <li key={i} className="flex gap-2.5">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#b08a3e]" aria-hidden />
                <span>{rich(x)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ol className="mt-7">
        {howTo.steps.map((st, i) => (
          <li key={i} id={`${howToId}-${i + 1}`} className="relative scroll-mt-24 pb-9 pl-[3.4rem] last:pb-2 sm:pl-16">
            {/* the line that joins one step to the next */}
            {i < howTo.steps.length - 1 && <span className="absolute bottom-0 left-[1.2rem] top-12 w-px bg-[#e8d3a6] sm:left-[1.45rem]" aria-hidden />}
            <span className={`${SERIF} absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full ${GOLD} text-lg font-bold text-primary-900 shadow-card sm:h-12 sm:w-12 sm:text-xl`} aria-hidden>
              {i + 1}
            </span>
            <h3 className="pt-1.5 text-lg font-extrabold leading-snug text-ink-900 sm:pt-2 sm:text-xl">
              <span className="sr-only">
                {s.step} {i + 1}:{" "}
              </span>
              {st.name}
            </h3>
            <p className="mt-2">{rich(st.text)}</p>
            {st.image && <Figure image={st.image} />}
          </li>
        ))}
      </ol>
    </section>
  );

  return (
    <article className="overflow-x-clip">
      {/* heading band */}
      <header className="relative isolate bg-[#1a1326] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_90%_at_90%_0%,rgba(176,138,62,0.2),transparent_70%)]" />
        <div className="container pb-[5.5rem] pt-5 sm:pb-32 sm:pt-7">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs font-semibold text-white/60 sm:text-sm">
            <Link href="/" className="hover:text-white">
              {s.home}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href="/wiki" className="hover:text-white">
              {s.wiki}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
            <Link href={`/wiki/${categorySlug(category, lang)}`} className="text-[#e8d3a6] hover:text-white">
              {pick(category.name, lang)}
            </Link>
          </nav>
          <div className="mx-auto mt-8 max-w-3xl lg:mx-0 lg:max-w-4xl">
            <StyleChip style={lesson?.style ?? null} s={s} />
            <h1 className={`${SERIF} mt-3 text-[2rem] font-bold leading-[1.16] sm:text-5xl sm:leading-[1.12]`}>{article.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{article.excerpt}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-white/70 sm:text-sm">
              <li className="inline-flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-[#e8d3a6]" aria-hidden />
                {s.byName}
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#e8d3a6]" aria-hidden />
                {s.updated} <time dateTime={article.updated}>{wikiDate(article.updated, lang)}</time>
              </li>
              <li className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#e8d3a6]" aria-hidden />
                {s.minutes(readMinutes(article))}
              </li>
              {video && (
                <li className="inline-flex items-center gap-1.5">
                  <PlayCircle className="h-4 w-4 text-[#e8d3a6]" aria-hidden />
                  {s.videoMinutes(fmtDuration(video.seconds))}
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>

      <div className="container grid gap-x-12 pb-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="mx-auto w-full min-w-0 max-w-3xl text-[17px] leading-[1.75] lg:mx-0">
          {/* the picture overlaps the band above */}
          <div className="relative z-10 -mt-16 sm:-mt-24">
            <Image
              src={article.hero.src}
              alt={article.hero.alt}
              width={article.hero.w ?? 1200}
              height={article.hero.h ?? 675}
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="h-auto w-full rounded-3xl bg-primary-50 shadow-[0_30px_70px_-28px_rgba(26,19,38,0.65)] ring-1 ring-[#e8d3a6]/60"
            />
            {article.hero.caption && <p className="mt-2.5 px-1 text-center text-[13px] leading-relaxed text-ink-400">{article.hero.caption}</p>}
          </div>

          {article.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "mt-8 text-lg font-medium leading-[1.7] text-ink-900 sm:text-xl sm:leading-[1.65]" : "my-5"}>
              {rich(p)}
            </p>
          ))}

          {/* the short version */}
          <section aria-labelledby="tom-tat" className="my-8 rounded-3xl bg-white p-5 shadow-card ring-1 ring-[#e8d3a6] sm:p-7">
            <h2 id="tom-tat" className={`${SERIF} text-xl font-bold text-ink-900 sm:text-2xl`}>
              {s.takeaways}
            </h2>
            <ul className="mt-4 space-y-3 text-[15.5px] leading-relaxed sm:text-base">
              {article.takeaways.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${GOLD}`}>
                    <Check className="h-3.5 w-3.5 text-primary-900" aria-hidden />
                  </span>
                  <span>{rich(t)}</span>
                </li>
              ))}
            </ul>
          </section>

          {notice && (
            <aside className="my-7 flex gap-3.5 rounded-2xl bg-berry-50 p-4 ring-1 ring-berry-100 sm:p-5">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-berry-500" aria-hidden />
              <p className="min-w-0 text-[15px] leading-relaxed sm:text-base">
                <strong className="font-extrabold text-ink-900">{s.notice}: </strong>
                {notice}
              </p>
            </aside>
          )}

          {/* the lesson video: never plays by itself, loads only when pressed */}
          {video && lesson && (
            <section aria-labelledby="video" className="my-8 overflow-hidden rounded-3xl bg-[#1a1326] text-white shadow-[0_24px_60px_-24px_rgba(26,19,38,0.6)] ring-1 ring-[#e8d3a6]/40">
              <div className={video.portrait ? "mx-auto max-w-[320px] pt-5" : ""}>
                <video
                  className={`w-full bg-black ${video.portrait ? "aspect-[9/16] rounded-2xl object-cover" : "aspect-video"}`}
                  controls
                  preload="none"
                  playsInline
                  poster={video.portrait?.poster ?? video.poster}
                  aria-label={pick(lesson.title, lang)}
                >
                  <source src={video.src} type="video/mp4" />
                  <track kind="subtitles" src={video.captions} srcLang={video.lang} label={video.lang === "vi" ? "Tiếng Việt" : video.lang === "fi" ? "Suomi" : "English"} />
                </video>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 p-4 sm:p-5">
                <div className="min-w-0 flex-1 basis-60">
                  <h2 id="video" className="text-[15px] font-extrabold leading-snug sm:text-base">
                    {s.videoTitle}: {pick(lesson.title, lang)}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">
                    {fmtDuration(video.seconds)} · {s.videoLang(video.lang)}
                  </p>
                </div>
                <Link href={`/academy/${lesson.slug}`} className={`inline-flex shrink-0 items-center gap-2 rounded-xl ${GOLD} px-4 py-2.5 text-sm font-extrabold text-primary-900 transition hover:brightness-105`}>
                  <GraduationCap className="h-4 w-4" aria-hidden />
                  {s.lessonCta}
                </Link>
              </div>
            </section>
          )}

          {/* table of contents on phones; on desktop it sits in the side column */}
          {toc.length > 1 && (
            <details className="group my-8 rounded-2xl bg-white ring-1 ring-ink-100 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 p-4 font-extrabold text-ink-900 marker:hidden [&::-webkit-details-marker]:hidden">
                <ListOrdered className="h-5 w-5 text-[#b08a3e]" aria-hidden />
                <span className="flex-1">{s.toc}</span>
                <ChevronDown className="h-4 w-4 text-ink-400 transition group-open:rotate-180" aria-hidden />
              </summary>
              <nav aria-label={s.toc} className="border-t border-ink-100 p-4">
                {tocList}
              </nav>
            </details>
          )}

          {!stepsAfter && steps}
          {article.sections.map((sec) => (
            <div key={sec.id}>
              <section>
                <H2 id={sec.id}>{sec.title}</H2>
                {sec.blocks.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </section>
              {stepsAfter === sec.id && steps}
            </div>
          ))}

          {/* questions people ask */}
          {article.faq.length > 0 && (
            <section>
              <H2 id="faq">{s.faq}</H2>
              <div className="divide-y divide-ink-100 rounded-2xl bg-white px-5 ring-1 ring-ink-100">
                {article.faq.map((f, i) => (
                  <details key={i} className="group py-4" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-3 marker:hidden [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-extrabold leading-snug text-ink-900 sm:text-[17px]">{f.q}</h3>
                      <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-ink-400 transition group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="mt-2.5 text-[15.5px] leading-relaxed sm:text-base">{rich(f.a)}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* the other half of a craft topic */}
          {pair && (
            <Link href={wikiPath(pair)} className="group mt-10 flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-[#e8d3a6] transition hover:shadow-card sm:p-5">
              <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-xl bg-primary-50 sm:w-32">
                <Image src={pair.hero.src} alt={pair.hero.alt} fill sizes="128px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-xs font-bold text-[#8a6a2a]">{lesson?.style === "theory" ? s.pairPractice : s.pairTheory}</span>
                <span className="mt-1 block text-base font-extrabold leading-snug text-ink-900 group-hover:text-primary-600 sm:text-[17px]">{pair.title}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary-500" aria-hidden />
            </Link>
          )}

          {/* sources behind the rules the lesson states */}
          {lesson?.sources && lesson.sources.length > 0 && (
            <section className="mt-10 text-[15px]">
              <h2 className="font-extrabold text-ink-900">{s.sources}</h2>
              <ul className="mt-2 space-y-1.5">
                {lesson.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline decoration-[#c9a25a] underline-offset-[3px] hover:text-primary-800">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isCraft && <p className="mt-8 border-l-2 border-[#e8d3a6] pl-4 text-sm leading-relaxed text-ink-400">{s.disclaimer}</p>}

          {/* back to the lesson, and the product */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {lesson && (
              <div className="flex flex-col items-start rounded-3xl bg-white p-5 shadow-card ring-1 ring-[#e8d3a6] sm:p-6">
                <h2 className={`${SERIF} text-xl font-bold text-ink-900`}>{s.lessonCtaTitle}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-400">{s.lessonCtaBody}</p>
                <Link href={`/academy/${lesson.slug}`} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-700">
                  <PlayCircle className="h-4 w-4" aria-hidden />
                  {s.lessonCta}
                </Link>
                {coursePage && (
                  <Link href={`/academy/khoa-hoc/${coursePage}`} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-800">
                    {s.courseCta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
              </div>
            )}
            <div className="flex flex-col items-start rounded-3xl bg-gradient-to-br from-[#2a1f3d] via-primary-900 to-[#150f20] p-5 text-white ring-1 ring-[#e8d3a6]/30 sm:p-6">
              <h2 className={`${SERIF} text-xl font-bold`}>{article.category === "booking" ? s.bookTitle : s.tryTitle}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{article.category === "booking" ? s.bookBody : s.tryBody}</p>
              <Link href={article.category === "booking" ? "/search" : "/business"} className={`mt-4 inline-flex items-center gap-2 rounded-2xl ${GOLD} px-5 py-3 text-sm font-extrabold text-primary-900 transition hover:brightness-105`}>
                {article.category === "booking" ? s.bookCta : s.tryCta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <p className="mt-8 flex flex-wrap gap-1.5 text-xs text-ink-400">
            <span className="font-bold">{s.keywords}:</span>
            {[article.keyword, ...article.keywords].map((k) => (
              <span key={k} className="rounded-full bg-white px-2 py-0.5 ring-1 ring-ink-100">
                {k}
              </span>
            ))}
          </p>
        </div>

        {/* side column on desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5 pt-10">
            {toc.length > 1 && (
              <nav aria-label={s.toc} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink-100">
                <p className={`${SERIF} mb-4 text-lg font-bold text-ink-900`}>{s.toc}</p>
                {tocList}
              </nav>
            )}
            {lesson && (
              <Link href={`/academy/${lesson.slug}`} className="group block overflow-hidden rounded-3xl bg-[#1a1326] text-white ring-1 ring-[#e8d3a6]/40">
                <span className="relative block aspect-video">
                  <Image src={video?.poster ?? article.hero.src} alt="" fill sizes="320px" className="object-cover opacity-90 transition group-hover:opacity-100" />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <PlayCircle className="h-12 w-12 drop-shadow-lg" aria-hidden />
                  </span>
                </span>
                <span className="block p-4">
                  <span className="block text-sm font-extrabold">{s.lessonCtaTitle}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-white/65">{s.lessonCtaBody}</span>
                </span>
              </Link>
            )}
          </div>
        </aside>
      </div>

      {/* previous and next in the chapter */}
      {(prev || next) && (
        <nav aria-label={s.inChapter} className="container mt-8 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={wikiPath(prev)} className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-100 transition hover:ring-[#e8d3a6]">
              <ArrowLeft className="h-5 w-5 shrink-0 text-primary-500" aria-hidden />
              <span className="min-w-0">
                <span className="block text-xs font-bold text-ink-400">{s.prev}</span>
                <span className="mt-0.5 line-clamp-2 block text-[15px] font-extrabold leading-snug text-ink-900 group-hover:text-primary-600">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link href={wikiPath(next)} className="group flex items-center justify-end gap-3 rounded-2xl bg-white p-4 text-right ring-1 ring-ink-100 transition hover:ring-[#e8d3a6]">
              <span className="min-w-0">
                <span className="block text-xs font-bold text-ink-400">{s.next}</span>
                <span className="mt-0.5 line-clamp-2 block text-[15px] font-extrabold leading-snug text-ink-900 group-hover:text-primary-600">{next.title}</span>
              </span>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary-500" aria-hidden />
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="container pb-20 pt-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className={`${SERIF} text-2xl font-bold text-ink-900 sm:text-[2rem]`}>{s.related}</h2>
            <Link href={`/wiki/${categorySlug(category, lang)}`} className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-800">
              {pick(category.name, lang)}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug} className="last:sm:hidden last:lg:block">
                <ArticleCard a={a} s={s} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
