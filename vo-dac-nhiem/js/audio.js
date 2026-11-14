// Giọng thầy + hiệu ứng âm thanh.
// Chỉ MỘT phần tử <audio> cho mọi lời thoại: câu mới luôn cắt câu cũ → không bao giờ chồng tiếng.
// Mọi lời gọi say() đều kết thúc (hết câu, lỗi, hoặc quá giờ) → không bao giờ treo.

let manifest = {};
let base = "";
let el = null;
let token = 0;
let ctx = null;
let amb = null;
let unlockedFlag = false;
const listeners = new Set();
const settings = { voice: true, sfx: true, ambient: true, rate: 1 };

let lang = "vi";
let textOf = () => "";
// m: danh sách giọng thu sẵn; opts.lang, opts.text(key): để đọc bằng giọng của máy khi ngôn ngữ chưa có giọng thu sẵn
export function setup(m, b, opts = {}) { manifest = m; base = b; lang = opts.lang || "vi"; textOf = opts.text || (() => ""); }
// Giọng đọc của máy (Web Speech API) cho ngôn ngữ chưa có giọng thầy thu sẵn
const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
const BCP = { zh: "zh-CN", ar: "ar-SA", fa: "fa-IR", pt: "pt-PT", en: "en-GB", es: "es-ES", fr: "fr-FR", de: "de-DE", sv: "sv-SE", nl: "nl-NL", da: "da-DK", fi: "fi-FI", el: "el-GR", ko: "ko-KR", ja: "ja-JP", ru: "ru-RU", uk: "uk-UA", tr: "tr-TR", it: "it-IT", pl: "pl-PL", th: "th-TH", id: "id-ID", vi: "vi-VN", kk: "kk-KZ", uz: "uz-UZ", mn: "mn-MN", my: "my-MM", so: "so-SO", mg: "mg-MG", tk: "tk-TM" };
function deviceVoice() {
  if (!synth) return null;
  const vs = synth.getVoices();
  const want = (BCP[lang] || lang).toLowerCase();
  // ưu tiên giọng nam nếu tên giọng cho biết
  const match = vs.filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith(lang));
  return match.find((v) => v.lang.toLowerCase() === want && /male|man|nam|муж/i.test(v.name) && !/female/i.test(v.name))
    || match.find((v) => v.lang.toLowerCase() === want) || match[0] || null;
}
export const deviceTTS = () => !!(synth && deviceVoice());
export function configure(s) {
  Object.assign(settings, s);
  if (!settings.voice) stop();
  ambient(settings.ambient);
}
export const isUnlocked = () => unlockedFlag;
export const onSpeak = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = (v, key) => listeners.forEach((fn) => { try { fn(v, key); } catch { /* bỏ qua */ } });
export const rate = () => settings.rate || 1;
// vị trí đang phát của câu thoại (giây) — để video khớp khẩu hình bám theo giọng
export const time = () => (el ? el.currentTime || 0 : 0);
const estimate = (key) => Math.max(1200, (textOf(key) || "").length * (/^(zh|ja|ko)$/.test(lang) ? 190 : 62));
export const durationOf = (key) => manifest[key]?.d || (textOf(key) ? estimate(key) : 0);
export const has = (key) => !!manifest[key] || !!(textOf(key) && deviceVoice());

// Gọi trong sự kiện chạm đầu tiên của người dùng.
export function unlock() {
  if (unlockedFlag) return;
  unlockedFlag = true;
  el = new Audio();
  el.preload = "auto";
  el.setAttribute("playsinline", "");
  // một đoạn im lặng cực ngắn để "mở khoá" phần tử audio trên iOS
  el.src = `${base}../../sfx/silence.mp3`;
  el.play().catch(() => {});
  // "mở khoá" giọng của máy trên điện thoại (cần một lần nói trong cú chạm đầu tiên)
  try { if (synth) { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; synth.speak(u); } } catch { /* bỏ qua */ }
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
  } catch { ctx = null; }
  ambient(settings.ambient);
}

export function stop() {
  token++;
  if (el) { try { el.pause(); } catch { /* bỏ qua */ } }
  try { if (synth && (synth.speaking || synth.pending)) synth.cancel(); } catch { /* bỏ qua */ }
  emit(false);
  duck(false);
}

/**
 * Thầy nói câu `key`. onTime(t, dur) gọi liên tục để chạy phụ đề.
 * Trả về Promise<boolean>: true nếu nói hết câu.
 */
export function say(key, onTime) {
  stop();
  const my = ++token;
  const item = manifest[key];
  if (!item && el && settings.voice && textOf(key) && deviceVoice()) return speakDevice(my, key, onTime);
  if (!item || !el || !settings.voice) {
    // không có giọng: vẫn cho phụ đề chạy theo thời lượng ước tính
    return fakeSpeak(my, item ? item.d : textOf(key) ? estimate(key) : 2500, onTime, !!item && !settings.voice);
  }
  return new Promise((resolve) => {
    let done = false, raf = 0;
    const dur = item.d / 1000;
    const finish = (ok) => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      clearTimeout(guard);
      el.onended = el.onerror = null;
      if (my === token) { emit(false); duck(false); }
      if (onTime && ok) onTime(dur, dur);
      resolve(ok && my === token);
    };
    const tick = () => {
      if (done || my !== token) return finish(false);
      if (onTime) onTime(el.currentTime || 0, dur);
      raf = requestAnimationFrame(tick);
    };
    // chốt an toàn: quá thời lượng + 4 giây thì coi như xong
    const guard = setTimeout(() => finish(true), item.d / rate() + 4000);
    el.onended = () => finish(true);
    el.onerror = () => finish(false);
    el.src = `${base}${item.f}`;
    el.currentTime = 0;
    el.playbackRate = rate();
    emit(true, key);
    duck(true);
    el.play().then(() => { raf = requestAnimationFrame(tick); }).catch(() => finish(false));
  });
}

// Đọc bằng giọng của máy: phụ đề chạy theo thời lượng ước tính; kết thúc khi máy đọc xong (có chốt an toàn).
function speakDevice(my, key, onTime) {
  return new Promise((resolve) => {
    const text = textOf(key);
    const est = estimate(key) / rate();
    const u = new SpeechSynthesisUtterance(text);
    const v = deviceVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = rate(); u.pitch = 0.9;
    let done = false, raf = 0, t0 = 0;
    const finish = (ok) => {
      if (done) return;
      done = true; cancelAnimationFrame(raf); clearTimeout(guard);
      if (my === token) { emit(false); duck(false); }
      if (onTime && ok) onTime(est / 1000, est / 1000);
      resolve(ok && my === token);
    };
    const tick = () => {
      if (done || my !== token) return finish(false);
      if (onTime && t0) onTime(Math.min((performance.now() - t0) / 1000, est / 1000 * 0.98), est / 1000);
      raf = requestAnimationFrame(tick);
    };
    const guard = setTimeout(() => finish(true), est * 2 + 5000);
    u.onstart = () => { t0 = performance.now(); };
    u.onend = () => finish(true);
    u.onerror = () => finish(false);
    emit(true, key); duck(true);
    t0 = performance.now();
    raf = requestAnimationFrame(tick);
    synth.speak(u);
  });
}

function fakeSpeak(my, ms, onTime, silent) {
  return new Promise((resolve) => {
    const t0 = performance.now();
    const dur = ms / 1000;
    const step = () => {
      if (my !== token) return resolve(false);
      const t = (performance.now() - t0) / 1000;
      if (onTime) onTime(Math.min(t, dur), dur);
      if (t >= dur) return resolve(true);
      requestAnimationFrame(step);
    };
    if (silent || ms) requestAnimationFrame(step); else resolve(true);
  });
}

// Nói lần lượt nhiều câu; dừng nếu bị cắt ngang.
export async function sayAll(keys, onEach) {
  for (const k of keys) {
    if (onEach) onEach(k);
    if (!(await say(k))) return false;
  }
  return true;
}

export function prefetch(keys) {
  keys.forEach((k) => { const it = manifest[k]; if (it) fetch(`${base}${it.f}`).catch(() => {}); });
}

// ---------- hiệu ứng (tổng hợp bằng WebAudio, không cần file) ----------
export function sfx(kind) {
  if (!ctx || !settings.sfx) return;
  const t = ctx.currentTime;
  const tone = (f, at, len, type = "sine", vol = 0.18, f2) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t + at);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + at + len);
    g.gain.setValueAtTime(0.0001, t + at);
    g.gain.exponentialRampToValueAtTime(vol, t + at + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + at + len);
    o.connect(g).connect(ctx.destination);
    o.start(t + at); o.stop(t + at + len + 0.05);
  };
  if (kind === "tap") tone(520, 0, 0.07, "triangle", 0.08);
  if (kind === "ok") { tone(660, 0, 0.12, "triangle", 0.14); tone(990, 0.09, 0.22, "triangle", 0.14); }
  if (kind === "bad") tone(220, 0, 0.28, "sawtooth", 0.07, 140);
  if (kind === "tick") tone(1200, 0, 0.04, "square", 0.04);
  if (kind === "go") { tone(440, 0, 0.12, "square", 0.08); tone(880, 0.12, 0.25, "square", 0.08); }
  if (kind === "win") [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.35, "triangle", 0.13));
  if (kind === "drum") {
    tone(90, 0, 0.35, "sine", 0.35, 45);
    tone(140, 0.18, 0.3, "sine", 0.22, 60);
  }
}

// Gió rừng nhẹ (nhiễu nâu lọc thấp), tự hạ nhỏ khi thầy nói.
function ambient(on) {
  if (!ctx) return;
  if (on && !amb) {
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.2; }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
    const g = ctx.createGain(); g.gain.value = 0;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lg = ctx.createGain(); lg.gain.value = 180;
    lfo.connect(lg).connect(lp.frequency);
    src.connect(lp).connect(g).connect(ctx.destination);
    src.start(); lfo.start();
    g.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
    amb = { src, g, lfo };
  } else if (!on && amb) {
    const a = amb; amb = null;
    a.g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    setTimeout(() => { try { a.src.stop(); a.lfo.stop(); } catch { /* bỏ qua */ } }, 600);
  }
}
function duck(on) {
  if (!amb || !ctx) return;
  amb.g.gain.cancelScheduledValues(ctx.currentTime);
  amb.g.gain.linearRampToValueAtTime(on ? 0.018 : 0.05, ctx.currentTime + 0.4);
}
