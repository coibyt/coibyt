"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Eye, GraduationCap, PlayCircle, Scissors, Search, ShieldCheck, Sparkles, Store, User, Flower2, Globe } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CatalogueCourse } from "@/lib/academy";
import { coursePageStrings } from "@/lib/academy/course-page-strings";
import type { Audience } from "@/lib/academy/types";

const GOLD = "bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a]";

/** "1 giờ 28 phút" / "1 h 28 min". */
function longDuration(seconds: number, locale: string) {
  const m = Math.round(seconds / 60);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (locale === "vi") return h ? `${h} giờ ${r} phút` : `${r} phút`;
  return h ? `${h} h ${r} min` : `${r} min`;
}

const fold = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "d").toLowerCase();

type Lang = "all" | "vi" | "en";

/** The Academy front page as a course catalogue (owner, 2026-11-19): search,
 * a featured slider, the course groups and the courses in English. Every
 * card opens the course's own page (/academy/khoa-hoc/<slug>). */
export function AcademyCatalogue({ courses, locale, lessons, seconds }: { courses: CatalogueCourse[]; locale: string; lessons: number; seconds: number }) {
  const s = coursePageStrings(locale);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<Lang>("all");
  const track: Record<Audience, string> = useMemo(() => ({ pro: s.trackPro, owner: s.trackOwner, customer: s.trackCustomer }), [s]);

  const shown = useMemo(() => {
    const words = fold(q).split(/\s+/).filter(Boolean);
    return courses.filter((c) => {
      if (lang === "en" && !c.langs.includes("en")) return false;
      if (!words.length) return true;
      const hay = fold(`${c.title} ${c.headline} ${c.tagline} ${track[c.audience]}`);
      return words.every((w) => hay.includes(w));
    });
  }, [courses, q, lang, track]);

  const groups: { id: string; title: string; body: string; list: CatalogueCourse[]; enLink?: boolean }[] = [
    { id: "nghe", title: s.catPro, body: s.catProBody, list: shown.filter((c) => c.audience === "pro") },
    { id: "chu-salon", title: s.catOwner, body: s.catOwnerBody, list: shown.filter((c) => c.audience === "owner") },
    { id: "khach-hang", title: s.catCustomer, body: s.catCustomerBody, list: shown.filter((c) => c.audience === "customer") },
  ];
  // Courses in English: a separate shelf on the Vietnamese and Finnish pages; they open the English page.
  if (locale !== "en" && lang !== "vi") {
    groups.push({ id: "english", title: s.catEnglish, body: s.catEnglishBody, list: shown.filter((c) => c.langs.includes("en")), enLink: true });
  }

  const chips: [string, string, typeof Sparkles][] = [
    ["p-nail", "Nail", Sparkles],
    ["p-lash", locale === "vi" ? "Nối mi" : locale === "fi" ? "Ripset" : "Lashes", Eye],
    ["p-hair", locale === "vi" ? "Cắt tóc" : locale === "fi" ? "Hiukset" : "Hair", Scissors],
    ["p-spa", "Spa", Flower2],
    ["p-safety", locale === "vi" ? "Vệ sinh" : locale === "fi" ? "Hygienia" : "Hygiene", ShieldCheck],
  ];
  const slugOf = (id: string) => courses.find((c) => c.id === id)?.slug;

  // A shared /academy?tab=… link is about one learning tab: go straight to the learning path.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("tab")) document.getElementById("lo-trinh")?.scrollIntoView();
  }, []);

  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-[#b08a3e]/25 blur-3xl" />
        <div className="container pb-8 pt-7 sm:pb-10 sm:pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
              <GraduationCap className="h-8 w-8 shrink-0 text-[#e8d3a6] sm:h-11 sm:w-11" />
              {s.catHeroTitle}
            </h1>
            <p className="mt-3 text-sm text-white/75 sm:text-lg">{s.catHeroBody}</p>
            <label className="relative mx-auto mt-6 flex max-w-2xl items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-ink-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={s.catSearch}
                aria-label={s.catSearch}
                className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-[15px] text-ink-900 shadow-lg outline-none ring-2 ring-transparent placeholder:text-ink-400 focus:ring-[#e8d3a6]"
              />
            </label>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {chips.map(([id, label, Icon]) => {
                const slug = slugOf(id);
                return slug ? (
                  <Link key={id} href={`/academy/khoa-hoc/${slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                    <Icon className="h-4 w-4 text-[#e8d3a6]" />
                    {label}
                  </Link>
                ) : null;
              })}
              <a href="#chu-salon" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <Store className="h-4 w-4 text-[#e8d3a6]" />
                {s.trackOwner}
              </a>
              <a href="#khach-hang" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/20">
                <User className="h-4 w-4 text-[#e8d3a6]" />
                {s.trackCustomer}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="container pt-8">
        <Featured courses={courses} locale={locale} />

        {/* the academy in numbers (real counts) */}
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [String(courses.length), s.catStatsCourses],
            [String(lessons), s.catStatsLessons],
            [String(Math.round(seconds / 3600)), s.catStatsHours],
            ["100%", s.catStatsFree],
          ].map(([n, label]) => (
            <li key={label} className="rounded-2xl bg-white px-4 py-3 text-center shadow-card ring-1 ring-ink-100">
              <span className="block text-2xl font-extrabold tabular-nums text-primary-900">{n}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">{label}</span>
            </li>
          ))}
        </ul>

        {/* language filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <Globe className="h-4 w-4 text-ink-400" />
          {(
            [
              ["all", s.catAll],
              ["vi", s.catVi],
              ["en", s.catEn],
            ] as [Lang, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setLang(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${lang === k ? "bg-primary-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-primary-50"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {shown.length === 0 && <p className="mt-10 rounded-2xl bg-white p-6 text-center text-ink-500 ring-1 ring-ink-100">{s.catEmpty}</p>}

        <div className="space-y-12 pb-16 pt-6">
          {groups
            .filter((g) => g.list.length > 0 && !(lang === "en" && g.enLink))
            .map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">{g.title}</h2>
                <p className="mt-1 text-sm text-ink-400 sm:text-base">{g.body}</p>
                <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {g.list.map((c) => (
                    <li key={g.id + c.id}>
                      <CourseCardView c={c} locale={locale} trackName={track[c.audience]} english={!!g.enLink} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      </div>
    </>
  );
}

function CourseCardView({ c, locale, trackName, english }: { c: CatalogueCourse; locale: string; trackName: string; english: boolean }) {
  const s = coursePageStrings(english ? "en" : locale);
  const lang = english ? "en" : locale;
  const seconds = english ? c.secondsEn : c.seconds;
  return (
    <Link
      href={`/academy/khoa-hoc/${c.slug}`}
      locale={english ? "en" : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className="relative block aspect-[16/9] overflow-hidden">
        <Image src={c.image} alt={c.headline} fill sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[#1a1326]/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e8d3a6] backdrop-blur">{trackName}</span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-bold text-white backdrop-blur">
          <Clock className="h-3.5 w-3.5" />
          {longDuration(seconds, lang)}
        </span>
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <PlayCircle className="h-14 w-14 text-white drop-shadow-lg" />
        </span>
      </span>
      <span className="flex flex-1 flex-col p-4">
        <span className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink-900 sm:text-base">{english ? c.headlineEn : c.headline}</span>
        <span className="mt-1 text-xs font-semibold text-ink-400">{s.catBy}</span>
        <span className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-ink-500">
          <span className="inline-flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5 text-primary-600" />
            {s.lessons(c.live)}
          </span>
          {(english ? ["en"] : c.langs).map((l) => (
            <span key={l} className="rounded bg-mist-50 px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-ink-500 ring-1 ring-ink-100">
              {l}
            </span>
          ))}
        </span>
        {c.live < c.total && !english && <span className="mt-1.5 text-[11px] font-semibold text-[#b08a3e]">{s.catMore}</span>}
        <span className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-extrabold text-emerald-600">{s.free}</span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 group-hover:text-primary-900">
            {s.catView}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>
    </Link>
  );
}

/** Big rotating banner of the trade courses and the first owner course. */
function Featured({ courses, locale }: { courses: CatalogueCourse[]; locale: string }) {
  const s = coursePageStrings(locale);
  const slides = useMemo(() => {
    const order = ["p-nail", "p-lash", "p-hair", "p-spa", "o-start", "p-safety"];
    return order.map((id) => courses.find((c) => c.id === id)).filter((c): c is CatalogueCourse => !!c);
  }, [courses]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);
  if (!slides.length) return null;
  const go = (d: number) => setI((x) => (x + d + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-[#1a1326] shadow-[0_30px_70px_-30px_rgba(26,19,38,0.7)] ring-1 ring-[#e8d3a6]/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="relative aspect-[4/5] sm:aspect-[21/9]">
        {slides.map((c, k) => (
          <div key={c.id} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={k !== i}>
            <Image src={c.image} alt={c.headline} fill priority={k === 0} sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-[70%_center]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1326] via-[#1a1326]/50 to-transparent sm:bg-gradient-to-r sm:from-[#1a1326] sm:via-[#1a1326]/75 sm:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:inset-y-0 sm:left-0 sm:right-auto sm:flex sm:w-[55%] sm:flex-col sm:justify-center sm:p-10 lg:p-14">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#e8d3a6] ring-1 ring-[#e8d3a6]/30">
                <Sparkles className="h-3.5 w-3.5" />
                {c.title}
              </span>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">{c.headline}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-white/80 sm:text-base">{c.tagline}</p>
              <span className="mt-4 flex flex-wrap items-center gap-3">
                <Link href={`/academy/khoa-hoc/${c.slug}`} tabIndex={k === i ? 0 : -1} className={`inline-flex items-center gap-2 rounded-2xl ${GOLD} px-5 py-2.5 text-sm font-extrabold text-primary-900 shadow-card sm:text-base`}>
                  {s.catView}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-sm font-semibold text-white/75">
                  {s.lessons(c.live)} · {longDuration(c.seconds, locale)} · <span className="text-emerald-300">{s.free}</span>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => go(-1)} aria-label="Previous" className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Next" className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:flex">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute right-5 top-4 flex gap-1.5 sm:bottom-5 sm:top-auto">
        {slides.map((c, k) => (
          <button key={c.id} type="button" onClick={() => setI(k)} aria-label={c.title} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-[#e8d3a6]" : "w-2 bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}
