/** One audio element for the whole app: background playback, lock-screen controls (Media Session),
 *  resume, chapters, speed, sleep timer, and counting the minutes actually listened. */
import { useSyncExternalStore } from "react";
import { audioUrl, coverUrl, cueAt } from "./data";
import { cachedBlob } from "./offline";
import { progressStore, settingsStore, todayKey } from "./store";
import type { DayData } from "./types";

export interface PlayerState {
  day: DayData | null;
  playing: boolean;
  waiting: boolean;
  time: number;
  duration: number;
  rate: number;
  chapter: number; // index into day.chapters
  cue: number; // index into day.cues
  sleepAt: number | null; // epoch ms
  sleepPart: boolean; // stop at the end of the current part
  offline: boolean; // playing from the downloaded copy
  error: string | null;
}

const audio = typeof Audio !== "undefined" ? new Audio() : (null as unknown as HTMLAudioElement);
if (audio) {
  audio.preload = "metadata";
  (audio as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
}

let state: PlayerState = {
  day: null, playing: false, waiting: false, time: 0, duration: 0, rate: settingsStore.get().speed,
  chapter: 0, cue: -1, sleepAt: null, sleepPart: false, offline: false, error: null,
};
const listeners = new Set<() => void>();
function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const usePlayer = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
export const getPlayer = () => state;

/* ----------------------------------------------------------- listening stats */
let lastTick = 0;
let pendingSec = 0;
function flushStats() {
  const day = state.day;
  if (!day || pendingSec <= 0) return;
  const add = pendingSec;
  pendingSec = 0;
  const key = todayKey();
  progressStore.set((p) => ({
    ...p,
    listened: { ...p.listened, [key]: (p.listened[key] ?? 0) + add },
    lessonHeard: { ...p.lessonHeard, [day.date]: (p.lessonHeard[day.date] ?? 0) + add },
  }));
}
function savePosition() {
  const day = state.day;
  if (!day || !audio) return;
  const t = audio.currentTime;
  progressStore.set((p) => ({ ...p, positions: { ...p.positions, [day.date]: t }, lastLesson: day.date }));
}

/* ---------------------------------------------------------------- events */
let lastSave = 0;
function onTime() {
  const day = state.day;
  if (!day) return;
  const t = audio.currentTime;
  const now = performance.now();
  if (!audio.paused && lastTick) pendingSec += Math.min((now - lastTick) / 1000, 2);
  lastTick = audio.paused ? 0 : now;
  if (now - lastSave > 5000) {
    lastSave = now;
    savePosition();
    flushStats();
  }
  const cue = cueAt(day.cues, t);
  let chapter = day.chapters.findIndex((c) => t >= c.start && t < c.end);
  if (chapter < 0) chapter = day.chapters.length - 1;
  // sleep timer
  if (state.sleepAt && Date.now() >= state.sleepAt) {
    fadeOutAndPause();
  } else if (state.sleepAt && state.sleepAt - Date.now() < 10000) {
    audio.volume = Math.max(0.05, (state.sleepAt - Date.now()) / 10000);
  }
  if (state.sleepPart && chapter !== state.chapter) {
    set({ sleepPart: false });
    pause();
    audio.currentTime = day.chapters[chapter].start;
  }
  if (cue !== state.cue || chapter !== state.chapter || Math.abs(t - state.time) > 0.24) {
    set({ time: t, cue, chapter });
  }
}

function fadeOutAndPause() {
  set({ sleepAt: null });
  pause();
  audio.volume = 1;
}

if (audio) {
  audio.addEventListener("timeupdate", onTime);
  audio.addEventListener("play", () => {
    lastTick = performance.now();
    set({ playing: true, error: null });
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
  });
  audio.addEventListener("pause", () => {
    onTime();
    lastTick = 0;
    savePosition();
    flushStats();
    set({ playing: false });
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
  });
  audio.addEventListener("waiting", () => set({ waiting: true }));
  audio.addEventListener("playing", () => set({ waiting: false }));
  audio.addEventListener("canplay", () => set({ waiting: false }));
  audio.addEventListener("durationchange", () => {
    set({ duration: audio.duration || state.day?.duration || 0 });
    updatePositionState();
  });
  audio.addEventListener("ratechange", updatePositionState);
  audio.addEventListener("seeked", updatePositionState);
  audio.addEventListener("ended", () => {
    flushStats();
    set({ playing: false });
  });
  audio.addEventListener("error", () => {
    if (audio.src) set({ error: "Không phát được audio. Kiểm tra kết nối mạng hoặc tải bài về máy.", playing: false, waiting: false });
  });
  addEventListener("pagehide", () => {
    savePosition();
    flushStats();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      savePosition();
      flushStats();
    }
  });
}

/* --------------------------------------------------------------- actions */
let objectUrl: string | null = null;
let loadToken = 0;

export async function load(day: DayData, autoplay = false, at?: number) {
  if (state.day?.date === day.date && audio.src) {
    if (at !== undefined) seek(at);
    if (autoplay) await play();
    return;
  }
  const token = ++loadToken;
  savePosition();
  flushStats();
  audio.pause();
  const url = audioUrl(day);
  const blob = await cachedBlob(url);
  if (token !== loadToken) return;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = blob ? URL.createObjectURL(blob) : null;
  audio.src = objectUrl ?? url;
  audio.playbackRate = state.rate;
  const resume = at ?? progressStore.get().positions[day.date] ?? 0;
  set({ day, time: resume, duration: day.duration, cue: cueAt(day.cues, resume), chapter: 0, offline: !!blob, error: null });
  progressStore.set((p) => ({ ...p, lastLesson: day.date }));
  setMediaMetadata(day);
  const apply = () => {
    if (resume > 0 && resume < day.duration - 5) audio.currentTime = resume;
  };
  if (audio.readyState >= 1) apply();
  else audio.addEventListener("loadedmetadata", apply, { once: true });
  const sleepDefault = settingsStore.get().sleepDefault;
  if (autoplay && sleepDefault > 0 && !state.sleepAt) setSleep(sleepDefault);
  if (autoplay) await play();
}

/** Switch to the downloaded copy as soon as a download finishes (keeps the position). */
export async function switchToOffline(day: DayData) {
  if (state.day?.date !== day.date || state.offline) return;
  const blob = await cachedBlob(audioUrl(day));
  if (!blob) return;
  const t = audio.currentTime;
  const wasPlaying = !audio.paused;
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrl = URL.createObjectURL(blob);
  audio.src = objectUrl;
  audio.playbackRate = state.rate;
  audio.addEventListener("loadedmetadata", () => {
    audio.currentTime = t;
    if (wasPlaying) void audio.play();
  }, { once: true });
  set({ offline: true });
}

export async function play() {
  if (!audio.src) return;
  try {
    stopSnippet();
    await audio.play();
  } catch (e) {
    if ((e as Error).name !== "AbortError") set({ error: "Trình duyệt chặn tự phát. Hãy chạm nút phát." });
  }
}
export function pause() {
  audio.pause();
}
export function toggle() {
  if (audio.paused) void play();
  else pause();
}
export function seek(t: number) {
  const d = state.day?.duration ?? audio.duration;
  audio.currentTime = Math.max(0, Math.min(t, (d || 0) - 0.5));
  onTime();
}
export const skip = (sec: number) => seek(audio.currentTime + sec);

export function gotoChapter(i: number) {
  const ch = state.day?.chapters[i];
  if (ch) seek(ch.start + 0.01);
}
export function nextChapter() {
  gotoChapter(Math.min(state.chapter + 1, (state.day?.chapters.length ?? 1) - 1));
}
export function prevChapter() {
  const ch = state.day?.chapters[state.chapter];
  if (ch && audio.currentTime - ch.start > 5) gotoChapter(state.chapter);
  else gotoChapter(Math.max(0, state.chapter - 1));
}

export function setRate(r: number) {
  audio.playbackRate = r;
  set({ rate: r });
  settingsStore.set((s) => ({ ...s, speed: r }));
}

/** minutes > 0: stop after that long · "part": stop at the end of the current part · 0: off */
export function setSleep(v: number | "part") {
  audio.volume = 1;
  if (v === "part") set({ sleepPart: true, sleepAt: null });
  else set({ sleepPart: false, sleepAt: v > 0 ? Date.now() + v * 60000 : null });
}
setInterval(() => {
  if (state.sleepAt && audio && !audio.paused) onTime();
  else if (state.sleepAt) set({}); // refresh countdown
}, 1000);

/* ---------------------------------------------------------- tap to hear */
const snippet = typeof Audio !== "undefined" ? new Audio() : (null as unknown as HTMLAudioElement);
let snippetEnd = 0;
let snippetRaf = 0;
export function stopSnippet() {
  if (!snippet) return;
  snippet.pause();
  cancelAnimationFrame(snippetRaf);
}
export async function playSnippet(day: DayData, range: [number, number]) {
  if (!snippet) return;
  pause();
  const src = state.day?.date === day.date && audio.src ? audio.src : objectUrlFor(day) ?? audioUrl(day);
  if (snippet.src !== src) snippet.src = src;
  snippetEnd = range[1];
  const start = () => {
    snippet.currentTime = range[0];
    void snippet.play();
    const tick = () => {
      if (snippet.currentTime >= snippetEnd - 0.02) {
        snippet.pause();
        return;
      }
      snippetRaf = requestAnimationFrame(tick);
    };
    snippetRaf = requestAnimationFrame(tick);
  };
  if (snippet.readyState >= 1) start();
  else snippet.addEventListener("loadedmetadata", start, { once: true });
}
function objectUrlFor(day: DayData) {
  return state.day?.date === day.date ? objectUrl : null;
}

/* ---------------------------------------------------------- media session */
function setMediaMetadata(day: DayData) {
  if (!("mediaSession" in navigator)) return;
  const art = coverUrl(day.date, day.cover);
  navigator.mediaSession.metadata = new MediaMetadata({
    title: `Ngày ${day.day_number} · ${day.topic.vi}`,
    artist: "Nghe Tiếng Anh Mỗi Ngày",
    album: day.topic.en,
    artwork: [
      { src: art, sizes: "512x512", type: "image/jpeg" },
      { src: art, sizes: "1024x1024", type: "image/jpeg" },
    ],
  });
  const ms = navigator.mediaSession;
  const h = (a: MediaSessionAction, fn: MediaSessionActionHandler) => {
    try {
      ms.setActionHandler(a, fn);
    } catch {
      /* unsupported action */
    }
  };
  h("play", () => void play());
  h("pause", () => pause());
  h("seekbackward", (d) => skip(-(d.seekOffset ?? 15)));
  h("seekforward", (d) => skip(d.seekOffset ?? 30));
  h("previoustrack", () => prevChapter());
  h("nexttrack", () => nextChapter());
  h("seekto", (d) => d.seekTime !== undefined && seek(d.seekTime));
}
function updatePositionState() {
  if (!("mediaSession" in navigator) || !audio.duration || !isFinite(audio.duration)) return;
  try {
    navigator.mediaSession.setPositionState({
      duration: audio.duration, playbackRate: audio.playbackRate, position: Math.min(audio.currentTime, audio.duration),
    });
  } catch {
    /* ignore */
  }
}
