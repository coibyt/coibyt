"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Loader2, Maximize2, Minimize2, Play, X } from "lucide-react";
import { teamStrings } from "@/lib/team-strings";

export const BABELISA_URL = "https://babelisa.com/";
const ART = "https://babelisa.com/assets";

/** Tiện ích → Babelisa: the language-learning island game, played inside
 * VaraaAi (embedded) or opened on its own site. The game only loads once
 * someone taps Play, so the page opens fast and the game's sound may start. */
export function TeamGame({ locale }: { locale: string }) {
  const S = teamStrings(locale);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [full, setFull] = useState(false);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  function play() {
    setPlaying(true);
    requestAnimationFrame(() => stage.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function toggleFull() {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
    } else if (stage.current?.requestFullscreen) {
      await stage.current.requestFullscreen().catch(() => setFull((v) => !v));
    } else {
      // iPhone Safari has no element fullscreen: fill the window instead.
      setFull((v) => !v);
    }
  }

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#0f2a3a] text-white shadow-[0_30px_60px_-35px_rgba(15,42,58,0.9)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ART}/bg/bg_beach.webp`} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1d2a]/95 via-[#0b1d2a]/70 to-[#0b1d2a]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d2a]/80 via-transparent to-transparent sm:hidden" />
        <div className="relative grid items-end gap-4 p-6 sm:grid-cols-[1.15fr_1fr] sm:p-10">
          <div className="max-w-xl pb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#ffd98a]">{S.gameEyebrow}</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.6rem]">{S.gameTitle}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{S.gameSub}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {S.gameChips.map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/20 backdrop-blur">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={play}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffd98a] to-[#f2a93b] px-6 py-3 text-sm font-extrabold text-[#2a1a05] shadow-[0_14px_30px_-12px_rgba(242,169,59,0.9)] transition hover:-translate-y-0.5"
              >
                <Play className="h-4 w-4 fill-current" />
                {S.playHere}
              </button>
              <a
                href={BABELISA_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
              >
                <ExternalLink className="h-4 w-4" />
                {S.openSite}
              </a>
            </div>
          </div>
          {/* The cast: Lisa, Leo and Pablo the macaw. */}
          <div className="pointer-events-none relative hidden h-72 sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ART}/char/leo_wave.webp`} alt="" className="absolute bottom-0 left-0 h-60 drop-shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ART}/char/lisa_wave.webp`} alt="" className="absolute bottom-0 right-6 h-72 drop-shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${ART}/char/pablo_wave.webp`} alt="" className="absolute right-[42%] top-0 h-28 drop-shadow-xl" />
          </div>
        </div>
      </section>

      {/* The game */}
      <div
        ref={stage}
        className={
          full
            ? "fixed inset-0 z-[120] flex flex-col bg-black"
            : "scroll-mt-4 overflow-hidden rounded-[2rem] bg-[#0b1d2a] shadow-[0_30px_60px_-35px_rgba(11,29,42,0.9)] ring-1 ring-black/10"
        }
      >
        <div className="flex items-center justify-between gap-2 bg-[#0b1d2a] px-4 py-2.5 text-white">
          <p className="flex min-w-0 items-center gap-2 text-sm font-bold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://babelisa.com/favicon.svg" alt="" className="h-6 w-6 shrink-0 rounded-md" />
            <span className="truncate">Babelisa</span>
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            {playing && (
              <button
                type="button"
                onClick={toggleFull}
                className="flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-bold hover:bg-white/20"
                aria-label={full ? S.exitFullscreen : S.fullscreen}
              >
                {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                <span className="hidden sm:inline">{full ? S.exitFullscreen : S.fullscreen}</span>
              </button>
            )}
            <a href={BABELISA_URL} target="_blank" rel="noopener" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label={S.openSite}>
              <ExternalLink className="h-4 w-4" />
            </a>
            {full && (
              <button type="button" onClick={toggleFull} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label={S.close}>
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className={`relative mx-auto w-full ${full ? "min-h-0 flex-1" : "h-[calc(100dvh-170px)] min-h-[520px] sm:h-[760px] sm:max-w-[440px]"}`}>
          {playing ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/80">
                  <Loader2 className="h-8 w-8 animate-spin text-[#ffd98a]" />
                  <p className="text-sm font-semibold">{S.gameLoading}</p>
                </div>
              )}
              <iframe
                src={BABELISA_URL}
                title="Babelisa"
                onLoad={() => setLoaded(true)}
                allow="autoplay; fullscreen; microphone"
                allowFullScreen
                className={`h-full w-full border-0 bg-transparent transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              />
            </>
          ) : (
            <button type="button" onClick={play} className="group absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ART}/bg/bg_jungle.webp`} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ART}/char/pablo_wave.webp`} alt="" className="absolute left-1/2 top-[16%] h-32 -translate-x-1/2 drop-shadow-2xl" />
              <span className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 px-6 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ffd98a] to-[#f2a93b] text-[#2a1a05] shadow-[0_0_0_10px_rgba(255,217,138,0.25)] transition group-hover:scale-110">
                  <Play className="ml-1 h-9 w-9 fill-current" />
                </span>
                <span className="font-serif text-2xl text-white">{S.playHere}</span>
                <span className="max-w-xs text-xs text-white/75">{S.gameNote}</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
