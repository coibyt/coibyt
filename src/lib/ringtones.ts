/**
 * The booking-alarm ringtone library: 100 ringtones (plus the original "classic" bell) that are
 * synthesised in the browser with the Web Audio API, so there are no audio files to host or license.
 * Every ringtone is generated from a fixed seed, so a given id always sounds the same.
 *
 * Used by the admin page (to listen and choose) and by the booking alarm (to ring).
 * This file is safe to import on the server: nothing runs until `playRingtoneOnce` is called in a browser.
 */

export type CategoryId = "classic" | "doorbell" | "bell" | "marimba" | "harp" | "phone" | "digital" | "jingle" | "soft" | "siren" | "arcade";

type Partial = [mult: number, gain: number];
type Note = { f: number; t: number; d: number; g: number; wave: OscillatorType; partials: Partial[]; sweepTo?: number };

export type Ringtone = {
  id: string;
  category: CategoryId;
  /** 1-based number inside its category. */
  n: number;
  name: { vi: string; en: string };
  notes: Note[];
  /** Length of one ring, in seconds. */
  length: number;
  /** Vibration pattern (ms) used with it on phones. */
  vibrate: number[];
};

export const CATEGORIES: { id: CategoryId; vi: string; en: string; hint: { vi: string; en: string } }[] = [
  { id: "classic", vi: "Mặc định", en: "Default", hint: { vi: "Chuông đôi hiện đang dùng", en: "The bell used today" } },
  { id: "doorbell", vi: "Chuông cửa", en: "Doorbell", hint: { vi: "Ding-dong quen thuộc", en: "The familiar ding-dong" } },
  { id: "bell", vi: "Chuông ngân", en: "Ringing bell", hint: { vi: "Tiếng chuông vang dài", en: "Long, resonant bell" } },
  { id: "marimba", vi: "Marimba", en: "Marimba", hint: { vi: "Gõ gỗ vui tai", en: "Cheerful wooden taps" } },
  { id: "harp", vi: "Đàn hạc", en: "Harp", hint: { vi: "Rải nốt nhẹ nhàng", en: "Gentle arpeggios" } },
  { id: "phone", vi: "Điện thoại cổ", en: "Classic phone", hint: { vi: "Reng reng như điện thoại bàn", en: "Old desk-phone trill" } },
  { id: "digital", vi: "Báo thức số", en: "Digital alarm", hint: { vi: "Bíp bíp rõ ràng, dễ nghe giữa ồn", en: "Clear beeps, easy to hear in noise" } },
  { id: "jingle", vi: "Giai điệu vui", en: "Happy jingle", hint: { vi: "Một đoạn nhạc ngắn tươi vui", en: "A short, upbeat tune" } },
  { id: "soft", vi: "Nhẹ nhàng", en: "Soft chime", hint: { vi: "Êm tai, hợp không gian spa", en: "Calm, suits a spa" } },
  { id: "siren", vi: "Khẩn cấp", en: "Urgent", hint: { vi: "Còi vút lên, khó bỏ lỡ", en: "Rising siren, hard to miss" } },
  { id: "arcade", vi: "Trò chơi", en: "Arcade", hint: { vi: "Âm thanh game vui nhộn", en: "Playful game sounds" } },
];

// ── tiny seeded random generator, so every ringtone is always the same
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const pick = <T,>(r: () => number, list: readonly T[]) => list[Math.floor(r() * list.length)];

const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21];
const MAJOR = [0, 2, 4, 5, 7, 9, 11, 12];
const ROOTS = [60, 62, 64, 65, 67, 69, 58, 63, 66, 68]; // 10 different keys

const SINE: Partial[] = [[1, 1]];
const BRIGHT: Partial[] = [[1, 0.9], [2.01, 0.35], [3.02, 0.15]];
const BELL: Partial[] = [[1, 0.8], [2.76, 0.45], [5.4, 0.25], [8.93, 0.1]];
const WOOD: Partial[] = [[1, 0.9], [4, 0.3]];
const note = (f: number, t: number, d: number, g: number, wave: OscillatorType, partials: Partial[], sweepTo?: number): Note => ({ f, t, d, g, wave, partials, sweepTo });

type Built = { notes: Note[]; vibrate: number[] };

const BUILD: Record<Exclude<CategoryId, "classic">, (i: number, r: () => number) => Built> = {
  doorbell(i, r) {
    const root = ROOTS[i] + 12;
    const shapes = [[0, -5], [0, -4], [0, -7], [4, 0], [7, 0, -5], [0, 4, 7], [5, 0], [0, -3, -7], [7, 4, 0], [0, 5]];
    const shape = shapes[(i + Math.floor(r() * 3)) % shapes.length];
    const gap = 0.38 + r() * 0.2;
    const notes = shape.map((s, k) => note(midi(root + s), k * gap, 0.95, 0.9, "triangle", BRIGHT));
    return { notes, vibrate: [450, 150, 450, 150, 700] };
  },
  bell(i, r) {
    const root = ROOTS[i] + 12;
    const count = 2 + (i % 3);
    const gap = 0.55 + r() * 0.35;
    const notes = Array.from({ length: count }, (_, k) => note(midi(root + pick(r, PENTA.slice(0, 6))), k * gap, 1.5, 0.55, "sine", BELL));
    return { notes, vibrate: [600, 200, 600, 200, 900] };
  },
  marimba(i, r) {
    const root = ROOTS[i] + 12;
    const count = 5 + (i % 4);
    const gap = 0.11 + r() * 0.08;
    const notes = Array.from({ length: count }, (_, k) => note(midi(root + pick(r, PENTA)), k * gap, 0.28, 0.95, "sine", WOOD));
    return { notes, vibrate: [120, 80, 120, 80, 120, 80, 400] };
  },
  harp(i, r) {
    const root = ROOTS[i] + 12;
    const up = i % 2 === 0;
    const steps = [0, 2, 4, 7, 9, 12].map((s) => root + s);
    const seq = up ? steps : [...steps].reverse();
    const gap = 0.09 + r() * 0.05;
    const notes = seq.map((m, k) => note(midi(m), k * gap, 0.9, 0.8, "triangle", [[1, 0.9], [2, 0.25]]));
    return { notes, vibrate: [300, 100, 300, 100, 600] };
  },
  phone(i, r) {
    const lo = [440, 480, 520, 400, 350, 420, 460, 500, 380, 450][i];
    const hi = lo * (1.15 + r() * 0.2);
    const notes: Note[] = [];
    let t = 0;
    for (let burst = 0; burst < 2; burst++) {
      for (let k = 0; k < 16; k++) notes.push(note(k % 2 ? hi : lo, t + k * 0.05, 0.05, 0.5, "square", SINE));
      t += 0.9;
    }
    return { notes, vibrate: [800, 300, 800, 300, 800] };
  },
  digital(i, r) {
    const f = [1200, 1000, 1400, 880, 1600, 1100, 1300, 960, 1500, 1050][i];
    const waves: OscillatorType[] = ["square", "sawtooth", "triangle"];
    const wave = waves[i % 3];
    const beeps = 3 + (i % 3);
    const len = 0.09 + r() * 0.05;
    const gap = len + 0.07;
    const notes = Array.from({ length: beeps }, (_, k) => note(f, k * gap, len, 0.5, wave, SINE));
    if (i % 2) notes.push(note(f * 1.25, beeps * gap + 0.1, 0.3, 0.5, wave, SINE));
    return { notes, vibrate: [200, 100, 200, 100, 200, 100, 600] };
  },
  jingle(i, r) {
    const root = ROOTS[i] + 12;
    const count = 6 + (i % 3);
    const beat = 0.17 + r() * 0.08;
    let t = 0;
    const notes: Note[] = [];
    for (let k = 0; k < count; k++) {
      const long = k === count - 1;
      notes.push(note(midi(root + pick(r, MAJOR)), t, long ? 0.7 : 0.32, 0.85, "triangle", BRIGHT));
      t += long ? beat * 2 : beat * (r() > 0.7 ? 1.5 : 1);
    }
    return { notes, vibrate: [250, 100, 250, 100, 250, 100, 500] };
  },
  soft(i, r) {
    const root = ROOTS[i];
    const chords = [[0, 4, 7], [0, 3, 7], [0, 5, 9], [0, 4, 9], [2, 7, 11]];
    const notes: Note[] = [];
    const parts = 2;
    for (let c = 0; c < parts; c++) {
      const chord = chords[(i + c * 2) % chords.length];
      chord.forEach((s, k) => notes.push(note(midi(root + 12 + s), c * 0.8 + k * 0.04, 1.6, 0.45, "sine", [[1, 0.9], [2, 0.2]])));
    }
    void r;
    return { notes, vibrate: [500, 300, 500] };
  },
  siren(i, r) {
    const base = [600, 700, 800, 500, 900, 650, 750, 550, 850, 720][i];
    const wave: OscillatorType = i % 2 ? "sawtooth" : "square";
    const sweeps = 3 + (i % 2);
    const dur = 0.4 + r() * 0.2;
    const notes = Array.from({ length: sweeps }, (_, k) =>
      k % 2 === 0 ? note(base, k * dur, dur, 0.45, wave, SINE, base * 1.8) : note(base * 1.8, k * dur, dur, 0.45, wave, SINE, base),
    );
    return { notes, vibrate: [900, 200, 900, 200, 900, 200, 900] };
  },
  arcade(i, r) {
    const root = ROOTS[i] + 12;
    const kinds = [[0, 4, 7, 12], [0, 7, 12, 19], [0, 2, 4, 7, 9, 12], [12, 7, 4, 0, 4, 7, 12], [0, 12, 0, 12, 19]];
    const seq = kinds[i % kinds.length];
    const gap = 0.065 + r() * 0.03;
    const notes = seq.map((s, k) => note(midi(root + s), k * gap, gap * 1.1, 0.5, i % 2 ? "square" : "triangle", SINE));
    notes.push(note(midi(root + seq[seq.length - 1] + 12), seq.length * gap, 0.35, 0.5, i % 2 ? "square" : "triangle", SINE));
    return { notes, vibrate: [100, 60, 100, 60, 100, 60, 100, 60, 400] };
  },
};

const CLASSIC: Ringtone = {
  id: "classic", category: "classic", n: 1, name: { vi: "Chuông đôi (mặc định)", en: "Double bell (default)" },
  notes: [1046.5, 783.99, 1046.5, 1318.5].map((f, k) => note(f, k * 0.32, 0.6, 0.9, "triangle", BRIGHT)),
  length: 1.9, vibrate: [500, 150, 500, 150, 900],
};

function build(): Ringtone[] {
  const out: Ringtone[] = [CLASSIC];
  CATEGORIES.filter((c) => c.id !== "classic").forEach((cat, ci) => {
    for (let i = 0; i < 10; i++) {
      const r = rng((ci + 1) * 1009 + i * 7919);
      const b = BUILD[cat.id as Exclude<CategoryId, "classic">](i, r);
      const length = Math.max(...b.notes.map((n) => n.t + n.d)) + 0.25;
      out.push({
        id: `${cat.id}-${String(i + 1).padStart(2, "0")}`, category: cat.id, n: i + 1,
        name: { vi: `${cat.vi} ${i + 1}`, en: `${cat.en} ${i + 1}` }, notes: b.notes, length, vibrate: b.vibrate,
      });
    }
  });
  return out;
}

/** All ringtones: the default one first, then 10 in each of the 10 categories (100 in total). */
export const RINGTONES: Ringtone[] = build();
export const DEFAULT_RINGTONE = "classic";
export const ringtoneById = (id: string | null | undefined): Ringtone => RINGTONES.find((r) => r.id === id) ?? CLASSIC;
export const isRingtoneId = (id: unknown): id is string => typeof id === "string" && RINGTONES.some((r) => r.id === id);

/**
 * Plays one ring of a ringtone through a loud compressor and returns how long it lasts (ms).
 * `ctx` must be a running AudioContext (browsers only allow sound after a tap).
 */
export function playRingtoneOnce(ctx: AudioContext, id: string, volume = 1): number {
  const tone = ringtoneById(id);
  const out = ctx.createDynamicsCompressor();
  out.threshold.value = -10;
  out.ratio.value = 4;
  const master = ctx.createGain();
  master.gain.value = Math.min(1, Math.max(0.05, volume));
  out.connect(master).connect(ctx.destination);
  const start = ctx.currentTime + 0.02;
  for (const n of tone.notes) {
    for (const [mult, pg] of n.partials) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = n.wave;
      const at = start + n.t;
      osc.frequency.setValueAtTime(n.f * mult, at);
      if (n.sweepTo) osc.frequency.linearRampToValueAtTime(n.sweepTo * mult, at + n.d);
      const peak = Math.max(0.001, n.g * pg);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(peak, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + n.d);
      osc.connect(gain).connect(out);
      osc.start(at);
      osc.stop(at + n.d + 0.05);
    }
  }
  return Math.round(tone.length * 1000);
}
